// npm modules
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// components
import NavBar from "./components/NavBar/NavBar";

// styling
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
