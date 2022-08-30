import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup.jsx";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Notification from "./components/Notification.jsx";
import Loading from "./components/Loading.jsx";
import Profile from "./components/user/Profile.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Profile />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
