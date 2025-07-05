import "./App.css";
import { Routes , Route , useParams} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/User/Login";
import MoviePage from "./pages/Movie/MoviePage";

function App(){
  return (
    <Routes>
      <Route path="/home" element={<HomePage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/movie/:title" element={<MoviePage/>}></Route>
    </Routes>
  );
}

export default App;