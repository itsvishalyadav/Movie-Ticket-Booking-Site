function getISTUnixTimestamp(year, monthIndex, day, hourIST, minuteIST = 0) {
  // monthIndex is 0-based
  const date = new Date(Date.UTC(year, monthIndex, day, hourIST - 5, minuteIST - 30));
  return Math.floor(date.getTime() / 1000);
}
module.exports.theatreData = [
  {
    name: "PVR Phoenix Marketcity",
    city: "Mumbai",
    location: "Kurla West",
  },
  {
    name: "INOX Forum Nehru Place",
    city: "Delhi",
    location: "Nehru Place",
  },
  {
    name: "PVR Orion Mall",
    city: "Bengaluru",
    location: "Rajajinagar",
    
  },
  {
    name: "Cinepolis Seasons Mall",
    city: "Pune",
    location: "Magarpatta City",
    
  },
  {
    name: "INOX South City",
    city: "Kolkata",
    location: "Prince Anwar Shah Road",
    
  },
  {
    name: "PVR Ambience Mall",
    city: "Gurugram",
    location: "DLF Phase 3",
    
  },
  {
    name: "PVR Elante Mall",
    city: "Chandigarh",
    location: "Industrial Area Phase 1",
    
  },
  {
    name: "PVR Lulu Mall",
    city: "Kochi",
    location: "Edappally",
    
  },
  {
    name: "INOX GVK One",
    city: "Hyderabad",
    location: "Banjara Hills",
    
  },
  {
    name: "Sathyam Cinemas",
    city: "Chennai",
    location: "Royapettah",
   
  },
  {
    name: "INOX City Centre",
    city: "Jaipur",
    location: "MI Road",
    
  },
  {
    name: "PVR DB City Mall",
    city: "Bhopal",
    location: "MP Nagar",
    
  },
  {
    name: "Cinepolis One Mall",
    city: "Ahmedabad",
    location: "SG Highway",
    
  },
  {
    name: "INOX Crystal Palm",
    city: "Lucknow",
    location: "Hazratganj",
    
  },
  {
    name: "PVR Treasure Island Mall",
    city: "Indore",
    location: "MG Road",
    
  },
  {
    name: "INOX Bund Garden",
    city: "Pune",
    location: "Bund Garden Road",
    
  },
  {
    name: "PVR Amanora Mall",
    city: "Pune",
    location: "Hadapsar",
    
  },
  {
    name: "PVR MBD Neopolis Mall",
    city: "Ludhiana",
    location: "Ferozepur Road",
    
  },
  {
    name: "INOX R City Mall",
    city: "Mumbai",
    location: "Ghatkopar West",
    
  },
  {
    name: "PVR Select Citywalk",
    city: "Delhi",
    location: "Saket",
    
  }
];


const SCREEN_ID = "685fe75921d47fef0559885b";
module.exports.showData = 

 [

  // Mumbai: PVR Phoenix Marketcity
  // {
  //   movie: "Ballerina", // Inception
  //   theatre: '685fe949cb20bea3388628df',
  //   screen: SCREEN_ID,
  //   startTime: 1688100000,
  //   endTime: 1688109000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628df',
  //   screen: SCREEN_ID,
  //   startTime: 1688112000,
  //   endTime: 1688123000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // Godfather
  //   theatre: '685fe949cb20bea3388628df',
  //   screen: SCREEN_ID,
  //   startTime: 1688125000,
  //   endTime: 1688135400,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628df',
  //   screen: SCREEN_ID,
  //   startTime: 1688137000,
  //   endTime: 1688145000,
  //   availableSeats: 100
  // },

  // // Mumbai: INOX R City Mall
  // {
  //   movie: '685fccd25165c983929efd0f', // The Dark Knight
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688101000,
  //   endTime: 1688110000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688113000,
  //   endTime: 1688124000,
  //   availableSeats: 140
  // },
  // {
  //   movie: '685fccd25165c983929efd14', // Gladiator
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688126000,
  //   endTime: 1688136000,
  //   availableSeats: 95
  // },
  // {
  //   movie: '685fccd25165c983929efd1d', // The Avengers
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688138000,
  //   endTime: 1688146200,
  //   availableSeats: 110
  // },

  // Delhi: INOX Forum Nehru Place
  {
    movie: 'Ballerina', // Interstellar
    theatre: '685fe949cb20bea3388628e0',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 21 , 9),
    bookedSeats : [45 , 66 , 87 , 96 , 93 , 65 , 45 , 74 , 88],
  },
  {
    movie: 'Ballerina', // The Matrix
    theatre: '685fe949cb20bea3388628e0',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 21 , 12),
    bookedSeats : [20 , 12 , 45 , 46 , 47 , 48 , 49 , 90]
  },
  {
    movie: 'Ballerina', // Forrest Gump
    theatre: '685fe949cb20bea3388628e0',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 22 , 15),
    bookedSeats : [11 , 22 , 23 , 24 , 25 , 22 , 22]
  },
  {
    movie: 'Ballerina', // Pulp Fiction
    theatre: '685fe949cb20bea3388628e0',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 22 , 21),
    bookedSeats : [12 , 23 , 34 , 45 , 56 , 56 , 78]
  },

  // Delhi: PVR Select Citywalk
  {
    movie: 'Ballerina', // Shawshank Redemption
    theatre: '685fe949cb20bea3388628f2',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 21 , 21),
    bookedSeats : [33 , 44 , 55 , 56 , 67 , 78 , 89]
  },
  {
    movie: 'Ballerina', // Avatar
    theatre: '685fe949cb20bea3388628f2',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 21 , 21),
    bookedSeats : [7 , 46 , 34 , 57 , 35 , 39 , 37 , 67 , 55]
  },
  {
    movie: 'Ballerina', // Lion King
    theatre: '685fe949cb20bea3388628f2',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 22 , 21),
    bookedSeats : [2 , 5 , 66 , 77 , 88 , 99 , 34 , 56 , 78]
  },
  {
    movie: 'Ballerina', // Fight Club
    theatre: '685fe949cb20bea3388628f2',
    screen: SCREEN_ID,
    startTime: getISTUnixTimestamp(2025, 6 , 22 , 20),
    bookedSeats : [1 , 5 , 9 , 11 , 15 , 21 , 27 , 35]
  },

  // Bengaluru: PVR Orion Mall
  //   {
  //   movie: '', // Inception
  //   theatre: '685fe949cb20bea3388628e1',
  //   screen: SCREEN_ID,
  //   startTime: 1688104000,
  //   endTime: 1688113000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628e1',
  //   screen: SCREEN_ID,
  //   startTime: 1688115000,
  //   endTime: 1688126000,
  //   availableSeats: 140
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // Godfather
  //   theatre: '685fe949cb20bea3388628e1',
  //   screen: SCREEN_ID,
  //   startTime: 1688128000,
  //   endTime: 1688137200,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // The Matrix
  //   theatre: '685fe949cb20bea3388628e1',
  //   screen: SCREEN_ID,
  //   startTime: 1688139000,
  //   endTime: 1688146200,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd0f', // Dark Knight
  //   theatre: '685fe949cb20bea3388628e2',
  //   screen: SCREEN_ID,
  //   startTime: 1688105000,
  //   endTime: 1688114000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628e2',
  //   screen: SCREEN_ID,
  //   startTime: 1688116000,
  //   endTime: 1688127000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628e2',
  //   screen: SCREEN_ID,
  //   startTime: 1688129000,
  //   endTime: 1688137000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd22', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628e2',
  //   screen: SCREEN_ID,
  //   startTime: 1688139000,
  //   endTime: 1688146200,
  //   availableSeats: 100
  // },

  // // Pune: INOX Bund Garden
  // {
  //   movie: '685fccd25165c983929efd10', // Interstellar
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688106000,
  //   endTime: 1688117000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688119000,
  //   endTime: 1688130000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // Godfather
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688132000,
  //   endTime: 1688141400,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd1a', // Avatar
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688143000,
  //   endTime: 1688152200,
  //   availableSeats: 105
  // },

  // // Pune: PVR Amanora Mall
  // {
  //   movie: '685fccd25165c983929efd11', // Shawshank
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688107000,
  //   endTime: 1688116000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd14', // Gladiator
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688121000,
  //   endTime: 1688128000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688130000,
  //   endTime: 1688139000,
  //   availableSeats: 95
  // },
  // {
  //   movie: '685fccd25165c983929efd18', // Forrest Gump
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688141000,
  //   endTime: 1688150000,
  //   availableSeats: 100
  // },

  // // Kolkata: INOX South City
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628e3',
  //   screen: SCREEN_ID,
  //   startTime: 1688108000,
  //   endTime: 1688117000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628e3',
  //   screen: SCREEN_ID,
  //   startTime: 1688119000,
  //   endTime: 1688130000,
  //   availableSeats: 140
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // Godfather
  //   theatre: '685fe949cb20bea3388628e3',
  //   screen: SCREEN_ID,
  //   startTime: 1688132000,
  //   endTime: 1688141400,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628e3',
  //   screen: SCREEN_ID,
  //   startTime: 1688143000,
  //   endTime: 1688151000,
  //   availableSeats: 100
  // },

  // // Gurugram: PVR Ambience Mall
  // {
  //   movie: '685fccd25165c983929efd0f', // Dark Knight
  //   theatre: '685fe949cb20bea3388628e4',
  //   screen: SCREEN_ID,
  //   startTime: 1688109000,
  //   endTime: 1688118000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628e4',
  //   screen: SCREEN_ID,
  //   startTime: 1688120000,
  //   endTime: 1688131000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628e4',
  //   screen: SCREEN_ID,
  //   startTime: 1688133000,
  //   endTime: 1688142000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd1a', // Avatar
  //   theatre: '685fe949cb20bea3388628e4',
  //   screen: SCREEN_ID,
  //   startTime: 1688144000,
  //   endTime: 1688153000,
  //   availableSeats: 100
  // },
  
  // // Chandigarh: PVR Elante Mall
  // {
  //   movie: '685fccd25165c983929efd10', // Interstellar
  //   theatre: '685fe949cb20bea3388628e5',
  //   screen: SCREEN_ID,
  //   startTime: 1688105000,
  //   endTime: 1688116000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd14', // Gladiator
  //   theatre: '685fe949cb20bea3388628e5',
  //   screen: SCREEN_ID,
  //   startTime: 1688118000,
  //   endTime: 1688128000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd18', // Forrest Gump
  //   theatre: '685fe949cb20bea3388628e5',
  //   screen: SCREEN_ID,
  //   startTime: 1688130000,
  //   endTime: 1688139000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd1d', // Avengers
  //   theatre: '685fe949cb20bea3388628e5',
  //   screen: SCREEN_ID,
  //   startTime: 1688141000,
  //   endTime: 1688150000,
  //   availableSeats: 115
  // },

  // // Kochi: PVR Lulu Mall
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628e6',
  //   screen: SCREEN_ID,
  //   startTime: 1688106000,
  //   endTime: 1688115000,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628e6',
  //   screen: SCREEN_ID,
  //   startTime: 1688117000,
  //   endTime: 1688128000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628e6',
  //   screen: SCREEN_ID,
  //   startTime: 1688130000,
  //   endTime: 1688139000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628e6',
  //   screen: SCREEN_ID,
  //   startTime: 1688141000,
  //   endTime: 1688150000,
  //   availableSeats: 100
  // },

  // // Hyderabad: INOX GVK One
  // {
  //   movie: '685fccd25165c983929efd0f', // Dark Knight
  //   theatre: '685fe949cb20bea3388628e7',
  //   screen: SCREEN_ID,
  //   startTime: 1688107000,
  //   endTime: 1688116000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628e7',
  //   screen: SCREEN_ID,
  //   startTime: 1688118000,
  //   endTime: 1688129000,
  //   availableSeats: 140
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // Godfather
  //   theatre: '685fe949cb20bea3388628e7',
  //   screen: SCREEN_ID,
  //   startTime: 1688131000,
  //   endTime: 1688140400,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd1a', // Avatar
  //   theatre: '685fe949cb20bea3388628e7',
  //   screen: SCREEN_ID,
  //   startTime: 1688142000,
  //   endTime: 1688151000,
  //   availableSeats: 105
  // },

  // // Chennai: Sathyam Cinemas
  // {
  //   movie: '685fccd25165c983929efd11', // Shawshank
  //   theatre: '685fe949cb20bea3388628e8',
  //   screen: SCREEN_ID,
  //   startTime: 1688108000,
  //   endTime: 1688117000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd14', // Gladiator
  //   theatre: '685fe949cb20bea3388628e8',
  //   screen: SCREEN_ID,
  //   startTime: 1688119000,
  //   endTime: 1688129000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628e8',
  //   screen: SCREEN_ID,
  //   startTime: 1688131000,
  //   endTime: 1688139000,
  //   availableSeats: 100
  // },
  // {
  //   movie: '685fccd25165c983929efd18', // Forrest Gump
  //   theatre: '685fe949cb20bea3388628e8',
  //   screen: SCREEN_ID,
  //   startTime: 1688141000,
  //   endTime: 1688150000,
  //   availableSeats: 105
  // },

  // // Jaipur: INOX City Centre
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628e9',
  //   screen: SCREEN_ID,
  //   startTime: 1688109000,
  //   endTime: 1688118000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628e9',
  //   screen: SCREEN_ID,
  //   startTime: 1688120000,
  //   endTime: 1688131000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628e9',
  //   screen: SCREEN_ID,
  //   startTime: 1688133000,
  //   endTime: 1688142000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628e9',
  //   screen: SCREEN_ID,
  //   startTime: 1688144000,
  //   endTime: 1688153000,
  //   availableSeats: 100
  // },
  // {
  //   movie: '685fccd25165c983929efd0f', // The Dark Knight
  //   theatre: '685fe949cb20bea3388628ea',
  //   screen: SCREEN_ID,
  //   startTime: 1688110000,
  //   endTime: 1688119000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd14', // Gladiator
  //   theatre: '685fe949cb20bea3388628ea',
  //   screen: SCREEN_ID,
  //   startTime: 1688121000,
  //   endTime: 1688131000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628ea',
  //   screen: SCREEN_ID,
  //   startTime: 1688133000,
  //   endTime: 1688142000,
  //   availableSeats: 100
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628ea',
  //   screen: SCREEN_ID,
  //   startTime: 1688144000,
  //   endTime: 1688153000,
  //   availableSeats: 110
  // },

  // // Ahmedabad: Cinepolis One Mall
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628eb',
  //   screen: SCREEN_ID,
  //   startTime: 1688111000,
  //   endTime: 1688120000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd11', // Shawshank Redemption
  //   theatre: '685fe949cb20bea3388628eb',
  //   screen: SCREEN_ID,
  //   startTime: 1688122000,
  //   endTime: 1688131000,
  //   availableSeats: 140
  // },
  // {
  //   movie: '685fccd25165c983929efd15', // The Godfather
  //   theatre: '685fe949cb20bea3388628eb',
  //   screen: SCREEN_ID,
  //   startTime: 1688133000,
  //   endTime: 1688142000,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd1a', // Avatar
  //   theatre: '685fe949cb20bea3388628eb',
  //   screen: SCREEN_ID,
  //   startTime: 1688144000,
  //   endTime: 1688153000,
  //   availableSeats: 105
  // },

  // // Lucknow: INOX Crystal Palm
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628ec',
  //   screen: SCREEN_ID,
  //   startTime: 1688112000,
  //   endTime: 1688121000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Avengers Endgame
  //   theatre: '685fe949cb20bea3388628ec',
  //   screen: SCREEN_ID,
  //   startTime: 1688123000,
  //   endTime: 1688134000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // The Matrix
  //   theatre: '685fe949cb20bea3388628ec',
  //   screen: SCREEN_ID,
  //   startTime: 1688135000,
  //   endTime: 1688144000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd18', // Forrest Gump
  //   theatre: '685fe949cb20bea3388628ec',
  //   screen: SCREEN_ID,
  //   startTime: 1688146000,
  //   endTime: 1688155000,
  //   availableSeats: 110
  // },

  // // Indore: PVR Treasure Island Mall
  // {
  //   movie: '685fccd25165c983929efd0f', // The Dark Knight
  //   theatre: '685fe949cb20bea3388628ed',
  //   screen: SCREEN_ID,
  //   startTime: 1688113000,
  //   endTime: 1688122000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628ed',
  //   screen: SCREEN_ID,
  //   startTime: 1688124000,
  //   endTime: 1688135000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628ed',
  //   screen: SCREEN_ID,
  //   startTime: 1688136000,
  //   endTime: 1688144000,
  //   availableSeats: 100
  // },
  // {
  //   movie: '685fccd25165c983929efd1c', // Fight Club
  //   theatre: '685fe949cb20bea3388628ed',
  //   screen: SCREEN_ID,
  //   startTime: 1688147000,
  //   endTime: 1688155000,
  //   availableSeats: 110
  // },

  // // Pune: INOX Bund Garden
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688114000,
  //   endTime: 1688123000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688125000,
  //   endTime: 1688136000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688137000,
  //   endTime: 1688146000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628ee',
  //   screen: SCREEN_ID,
  //   startTime: 1688148000,
  //   endTime: 1688157000,
  //   availableSeats: 110
  // },
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688115000,
  //   endTime: 1688124000,
  //   availableSeats: 120
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Avengers: Endgame
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688126000,
  //   endTime: 1688137000,
  //   availableSeats: 130
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // The Matrix
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688138000,
  //   endTime: 1688147000,
  //   availableSeats: 100
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628ef',
  //   screen: SCREEN_ID,
  //   startTime: 1688149000,
  //   endTime: 1688158000,
  //   availableSeats: 110
  // },

  // // Ludhiana: PVR MBD Neopolis Mall
  // {
  //   movie: '685fccd25165c983929efd0f', // The Dark Knight
  //   theatre: '685fe949cb20bea3388628f0',
  //   screen: SCREEN_ID,
  //   startTime: 1688116000,
  //   endTime: 1688125000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628f0',
  //   screen: SCREEN_ID,
  //   startTime: 1688127000,
  //   endTime: 1688138000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628f0',
  //   screen: SCREEN_ID,
  //   startTime: 1688139000,
  //   endTime: 1688148000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd1c', // Fight Club
  //   theatre: '685fe949cb20bea3388628f0',
  //   screen: SCREEN_ID,
  //   startTime: 1688150000,
  //   endTime: 1688159000,
  //   availableSeats: 110
  // },

  // // Mumbai: INOX R City Mall
  // {
  //   movie: '685fccd25165c983929efd0e', // Inception
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688117000,
  //   endTime: 1688126000,
  //   availableSeats: 115
  // },
  // {
  //   movie: '685fccd25165c983929efd12', // Endgame
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688128000,
  //   endTime: 1688139000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd16', // Matrix
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688140000,
  //   endTime: 1688149000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd19', // Pulp Fiction
  //   theatre: '685fe949cb20bea3388628f1',
  //   screen: SCREEN_ID,
  //   startTime: 1688151000,
  //   endTime: 1688160000,
  //   availableSeats: 110
  // },

  // // Delhi: PVR Select Citywalk
  // {
  //   movie: '685fccd25165c983929efd0f', // The Dark Knight
  //   theatre: '685fe949cb20bea3388628f2',
  //   screen: SCREEN_ID,
  //   startTime: 1688118000,
  //   endTime: 1688127000,
  //   availableSeats: 125
  // },
  // {
  //   movie: '685fccd25165c983929efd13', // Titanic
  //   theatre: '685fe949cb20bea3388628f2',
  //   screen: SCREEN_ID,
  //   startTime: 1688129000,
  //   endTime: 1688140000,
  //   availableSeats: 135
  // },
  // {
  //   movie: '685fccd25165c983929efd17', // Jurassic Park
  //   theatre: '685fe949cb20bea3388628f2',
  //   screen: SCREEN_ID,
  //   startTime: 1688141000,
  //   endTime: 1688150000,
  //   availableSeats: 105
  // },
  // {
  //   movie: '685fccd25165c983929efd1c', // Fight Club
  //   theatre: '685fe949cb20bea3388628f2',
  //   screen: SCREEN_ID,
  //   startTime: 1688152000,
  //   endTime: 1688161000,
  //   availableSeats: 110
  // }

];


