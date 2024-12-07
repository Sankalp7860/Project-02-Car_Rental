import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCarPage from "./pages/AddCarPage";
import CarListPage from "./pages/CarListPage";
import RentCarPage from "./pages/RentCarPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./components/Logout";
import Footer1 from "./components/Footer1";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/add-car" element={<AddCarPage />} />
          <Route path="/cars" element={<CarListPage />} />
          <Route path="/rent-car" element={<RentCarPage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
      <Footer1 />
    </Router>
  );
}

export default App;
