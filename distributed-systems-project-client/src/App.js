import logo from "./logo.svg";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./components/Register";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Profile />} path="/profile" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
