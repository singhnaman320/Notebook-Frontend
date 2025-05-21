import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/notes" /> : <Navigate to="/login" />}
        />
        <Route
          path="/notes"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/notes" /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/notes" /> : <Register setUser={setUser} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
