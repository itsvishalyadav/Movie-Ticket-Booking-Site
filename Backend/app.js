const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const nodemailer = require("nodemailer");
app.use(express.urlencoded({extended : true}));
const Theatre = require("./models/theatre.js");
const Screen = require("./models/screens.js");
const Show = require("./models/shows.js");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const Movie = require("./models/movie.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
const mongoUrl = 'mongodb+srv://agrawalpiyush415:8qcLCV3QMsbOHa7D@cluster0.zdgl421.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
async function main(){
    await mongoose.connect(mongoUrl);
}
main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

const sessionOptions = {
    secret : "mysecretkey",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agrawalpiyush415@gmail.com',
    pass: 'mdxu kkiv emsw gznd'
  }
});

const sendVerificationCode = async (email , verificationCode) => {
  const info = await transporter.sendMail({
    from: 'agrawalpiyush415@gmail.com',
    to: email,
    subject: "Hello",
    text: `${verificationCode}`, // plain‑text body
  });

  console.log("Message sent:", info.messageId);
};


app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,       // allow cookies to be sent
}));


app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  User.authenticate()
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function getISTDayRangeFromFormattedDate(dateStr, year) {
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  // Split "Thu, Jul 10" => ["Thu", "Jul", "10"]
  const [, monthStr, dayStr] = dateStr.split(/[\s,]+/);
  const monthIndex = monthMap[monthStr];
  const day = parseInt(dayStr, 10);

  // Adjust for IST
  const startUTC = new Date(Date.UTC(year, monthIndex, day, -5, -30));
  const endUTC = new Date(Date.UTC(year, monthIndex, day + 1, -5, -30));

  return {
    startUnix: Math.floor(startUTC.getTime() / 1000),
    endUnix: Math.floor(endUTC.getTime() / 1000) - 1
  };
}

function convertToUnix(showDate, showTime) {
  // Combine date and time into ISO-like string
  const dateTimeStr = `${showDate}T${showTime}:00`;  // Adds seconds

  // Create Date object
  const date = new Date(dateTimeStr);

  // Get Unix timestamp in seconds
  return Math.floor(date.getTime() / 1000);
}

const shows = {};

async function loadShow(showId){
    const show = await Show.findById(showId);
    shows[showId] = {
        bookedSeats : show.bookedSeats,
        locks : {},
        userLocks : {}
    }

    return shows[showId];
}

setInterval(() => {
  const now = Date.now();
  for (const showId in shows) {
    const show = shows[showId];
    for (const seat in show.locks) {
      if (show.locks[seat].expiresAt < now) {
        const locker = show.locks[seat].locker;
        show.userLocks[locker] = show.userLocks[locker].filter(s => s !== +seat);
        delete show.locks[seat];
      }
    }
  }
}, 60000);


io.on("connection" , (socket) => {
    console.log('a user connected');
    socket.on("joinShow" , async (showId) => {
        socket.join(showId);
        let show = shows[showId];
        if(!show){
            show = await loadShow(showId);
        }
        console.log(show);
        socket.emit("seatData" , {bookedSeats : show.bookedSeats});
    });

    socket.on("lockSeat" , ({showId , seatNumber}) => {
        const locker = socket.id;
        const show = shows[showId];

        if(show.bookedSeats.includes(seatNumber)){
            return socket.emit("lockFailed" , "seat is already booked");
        }

        if(show.locks[seatNumber]){
            return socket.emit("lockFailed" , "seat is held by someone");
        }

        if(!show.userLocks[locker]){
            show.userLocks[locker] = [];
        }

        if(show.userLocks[locker].length >= 5){
            return socket.emit("lockFailed" , "max 5 seats can be locked at a time");
        }

        show.locks[seatNumber] = {locker , expiresAt : Date.now() + 5*60*1000};
        show.userLocks[locker].push(seatNumber);
        socket.emit("lockSuccess" , seatNumber);

    })

    socket.on("unlockSeat" , ({showId , seatNumber}) => {
        const locker = socket.id;
        const show = shows[showId];

        if(show.locks[seatNumber].locker === locker){
            delete show.locks[seatNumber];
            show.userLocks[locker] = show.userLocks[locker].filter(s => s!==seatNumber);
        }
    })

    socket.on("confirmSeats" , async({showId , seatNumbers , userId}) => {
        const locker = socket.id;
        const show = shows[showId];
        const heldSeats = show.userLocks[locker] || [];
        if(!seatNumbers.every(s => heldSeats.includes(s))){
            return socket.emit("confirmFailed" , "seats are not locked by you");
        }

        seatNumbers.forEach(seat => {
            show.bookedSeats.push(seat);
            delete show.locks[seat];
        });
        show.userLocks[locker] = [];

        let currShow = await Show.findById(showId);
        currShow.bookedSeats = [...currShow.bookedSeats , ...seatNumbers];
        await currShow.save();
        let newBooking = new Booking({show : showId , user : userId , seats : seatNumbers , time : Math.floor(Date.now() / 1000)});
        await newBooking.save();
        io.to(showId).emit('seatsBooked', seatNumbers);
    });

    socket.on("cancelSeats" , async({seats , booking}) => {
        const currShow = await Show.findById(booking.show._id);
        if (!currShow) return; 

        
        const updatedBookedSeats = currShow.bookedSeats.filter(seat => !seats.includes(seat));
        currShow.bookedSeats = updatedBookedSeats;
        await currShow.save();

        
        const currBooking = await Booking.findById(booking._id);
        if (currBooking) {
            if (currBooking.seats.length === seats.length) {
                await Booking.findByIdAndDelete(booking._id);
            } else {
                currBooking.seats = currBooking.seats.filter(seat => !seats.includes(seat));
                await currBooking.save();
            }
        }

       
        if (shows[booking.show._id]) {
            shows[booking.show._id].bookedSeats = updatedBookedSeats;
        }

        io.to(booking.show._id).emit("seatsCancelled", seats);
        const newBookings = await Booking.find({ user: booking.user }).populate({
            path: 'show',
            populate: { path: 'theatre' },
        });
        socket.emit("bookingSeatsCancelled", newBookings.reverse());


    })
});



app.get("/api/movies", async (req, res) => {
    const movies = await Movie.find({} ,"_id title");
    res.json(movies);
});


// { title, poster, ratings, genres, length }


app.get("/api/movies/upcoming", async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const movies = await Movie.find(
        {releaseDate : {$gt : currentDate}} , 
        "title poster ratings genres length"
    )

    res.json(movies);
  } catch (err) {
    console.error("Error fetching upcoming movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/api/movies/:city/nowplaying" , async (req ,res) => {
    const currentUnix = Math.floor(Date.now() / 1000); // current UNIX time
        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
        const targetCity = req.params.city; // <-- change as needed

        const movies = await Show.aggregate([
        // Lookup theatre to check city
        {
            $lookup: {
            from: "theatres",
            localField: "theatre",
            foreignField: "_id",
            as: "theatreDetails"
            }
        },
        { $unwind: "$theatreDetails" },

        // Filter by theatre city
        {
            $match: {
            "theatreDetails.city": targetCity
            }
        },

        // Filter shows by startTime > now
        {
            $match: {
            startTime: { $gt: currentUnix }
            }
        },

        // Lookup movie details
        {
            $lookup: {
            from: "movies",
            localField: "movie",
            foreignField: "_id",
            as: "movieDetails"
            }
        },
        { $unwind: "$movieDetails" },

        // Filter movie by releaseDate < today
        {
            $match: {
            "movieDetails.releaseDate": { $lte: today }
            }
        },

        // Group by movie to make them unique
        {
            $group: {
            _id: "$movie",
            show: { $first: "$$ROOT" }
            }
        },

        // Replace root to flatten the document
        {
            $replaceRoot: { newRoot: "$show" }
        },

        // Project only the fields you want
        {
            $project: {
                _id: "$movieDetails._id",
                title: "$movieDetails.title",
                poster: "$movieDetails.poster",
                genres: "$movieDetails.genres",
                ratings: "$movieDetails.ratings",
                length : "$movieDetails.length"
            }
            
        }
    ]);


    res.json(movies);
})


app.get("/api/movies/:city/trending", async (req, res) => {
  const city = req.params.city;
const currentUnix = Math.floor(Date.now() / 1000); // current UNIX time
    const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  try {
    const trending = await Show.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movieDetails"
        }
      },
      { $unwind: "$movieDetails" },

      {
        $lookup: {
          from: "theatres",
          localField: "theatre",
          foreignField: "_id",
          as: "theatreDetails"
        }
      },
      { $unwind: "$theatreDetails" },

      {
        $match: {
          "theatreDetails.city": city,
          startTime: { $gte: currentUnix },
          "movieDetails.releaseDate": { $lte: today },
        }
      },

      {
        $group: {
          _id: "$movie",
          trendingShow: { $first: "$$ROOT" }
        }
      },

      { $replaceRoot: { newRoot: "$trendingShow" } },

      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },
      {
            $project: {
                _id: "$movieDetails._id",
                title: "$movieDetails.title",
                poster: "$movieDetails.poster",
                genres: "$movieDetails.genres",
                ratings: "$movieDetails.ratings",
                length : "$movieDetails.length"
            }
            
        }
    ]);

    res.json(trending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});


// ✅ POPULAR SHOWS
app.get("/api/movies/:city/popular", async (req, res) => {
  const city = req.params.city;
    const currentUnix = Math.floor(Date.now() / 1000); // current UNIX time
        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  try {
    const popular = await Show.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movieDetails"
        }
      },
      { $unwind: "$movieDetails" },

      {
        $lookup: {
          from: "theatres",
          localField: "theatre",
          foreignField: "_id",
          as: "theatreDetails"
        }
      },
      { $unwind: "$theatreDetails" },

      {
        $match: {
          "theatreDetails.city": city,
          startTime: { $gte: currentUnix },
          "movieDetails.releaseDate": { $lte: today },
          $or: [
            { "movieDetails.ratings": { $gte: 8 } },
            { "movieDetails.popularity": { $gte: 800 } }
          ]
        }
      },

      {
        $group: {
          _id: "$movie",
          popularShow: { $first: "$$ROOT" }
        }
      },

      { $replaceRoot: { newRoot: "$popularShow" } },

      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },
      {
            $project: {
                _id: "$movieDetails._id",
                title: "$movieDetails.title",
                poster: "$movieDetails.poster",
                genres: "$movieDetails.genres",
                ratings: "$movieDetails.ratings",
                length : "$movieDetails.length",
                bgImage : "$movieDetails.bgImage"
            }
            
        }
    ]);

    res.json(popular);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching popular shows" });
  }
});


app.get("/api/movies/:city/toprated", async (req, res) => {
  const city = req.params.city;
  const currentUnix = Math.floor(Date.now() / 1000);
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  try {
    const topRated = await Show.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movieDetails"
        }
      },
      { $unwind: "$movieDetails" },

      {
        $lookup: {
          from: "theatres",
          localField: "theatre",
          foreignField: "_id",
          as: "theatreDetails"
        }
      },
      { $unwind: "$theatreDetails" },

      {
        $match: {
          "theatreDetails.city": city,
          startTime: { $gte: currentUnix },
          "movieDetails.releaseDate": { $lte: today },
          "movieDetails.ratings": { $gte: 8.5 } // adjust threshold if needed
        }
      },

      {
        $group: {
          _id: "$movie",
          topRatedShow: { $first: "$$ROOT" }
        }
      },

      { $replaceRoot: { newRoot: "$topRatedShow" } },

      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },

      {
            $project: {
                _id: "$movieDetails._id",
                title: "$movieDetails.title",
                poster: "$movieDetails.poster",
                genres: "$movieDetails.genres",
                ratings: "$movieDetails.ratings",
                length : "$movieDetails.length"
            }
            
        }
      
    ]);

    res.json(topRated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching top rated shows" });
  }
});


app.get("/api/movies/:title" , async (req , res) => {
    const {title} = req.params;
    const movie = await Movie.find({title});
    res.json(movie);
})

app.get("/api/theatres/:city" , async (req , res) => {
    const {city} = req.params;
    let theatres = await Theatre.find({city});
    theatres = theatres.map(theatre => theatre.name);
    res.json(theatres);
})

app.get("/api/shows/:city/:title/:date", async (req, res) => {
  const { city, title, date } = req.params;
  const range = getISTDayRangeFromFormattedDate(date, 2025);

  const shows = await Show.find({
    startTime: { $gte: range.startUnix, $lte: range.endUnix },
  })
    .populate({
      path: "theatre",
      match: { city },
    })
    .populate({
      path: "movie",
      match: { title },
    });

  const validShows = shows.filter(
    (show) => show.theatre && show.movie
  );

  function groupShowsByTheatre(shows) {
    const theatreMap = new Map();

    for (const show of shows) {
      const name = show.theatre.name;
      if (!theatreMap.has(name)) {
        theatreMap.set(name, []);
      }
      theatreMap.get(name).push({
        time: show.startTime,
        showId: show._id,
      });
    }

    return Array.from(theatreMap, ([name, timings]) => ({
      name,
      timings,
    }));
  }

  res.json(groupShowsByTheatre(validShows));
});


app.post("/api/shows" , async (req , res) => {
    let {city , title , theatre , showTime , showDate} = req.body;
    const currTheatre = await Theatre.findOne({city , name : theatre});
    let startTime = convertToUnix(showDate , showTime);
    let newShow = new Show({movie : title._id , theatre : currTheatre , startTime})
    await newShow.save();
    res.json("show saved");
});

app.get("/api/bookings/:user" , async (req , res) => {
    let {user} = req.params;
    const bookings = await Booking.find({ user })
    .populate({
        path: "show",
        populate: [
            { path: "theatre" }, // populate full theatre
            { path: "movie", select: "title" } // only select title from movie
        ]
    });
    res.json(bookings.reverse());
})

app.post("/api/verify" , async(req , res) => {
    const {email , verificationCode} = req.body;
    console.log(req.body);
    const user = await User.findOne({email : email});
    if(user.verificationCode == verificationCode){
        user.isVerified = true;
        await user.save();
        req.login(user , (err) => {
            if(err){
                return res.status(409).json({message : err.message});
            }
            res.status(200).json({message : "registered successfully" , user});
        });
    }
    else{
        res.status(409).json({message : "wrong verification code"});
    }
});

app.post("/api/signup" , async (req , res) => {
    let {name , email , username , password} = req.body;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    let user = await User.findOne({email : email});
    if(user && !user.isVerified){
        sendVerificationCode(user.email , user.verificationCode);
        res.status(200).json({message : "verification code sent"});
    }
    else{
        try{
            const newUser = new User({name , username , email , verificationCode});
            let registeredUser = await User.register(newUser , password);
            sendVerificationCode(registeredUser.email , registeredUser.verificationCode);
            res.status(200).json({message : "verification code sent"})
        }
        catch(e){
            res.status(409).json({message : e.message});
        }
    }
})

app.post("/api/login" , async (req , res ,next) => {
    let currUser = await User.findOne({email : req.body.email});
    if(currUser) req.body.username = currUser.username;
    if(currUser && !currUser.isVerified){
        return res.status(500).json({ message: 'Invalid email or password' });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!user) return res.status(401).json({message : 'Invalid email or password'});

        req.login(user, (err) => {
        if (err) return res.status(500).json({ message: 'Login failed' });
        res.status(200).json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
})

app.get("/api/isLoggedIn" , (req , res) => {
    console.log(req.user);
    if(req.isAuthenticated()){
        return res.status(200).json({message : "authenticated" , user : req.user});
    }
    res.status(400).json({message : "not authenticated"});
})

app.get("/api/signout" , (req , res) => {
    req.logout((err) => {
        if(err){
            return res.status(400).json({message : "logout failed"});
        }
        res.status(200).json({message : "logged out"});
    });
})



server.listen(8080 , () => {
    console.log("server started");
});

