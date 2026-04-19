import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/booking">Book Ride</Link>
      <Link to="/myrides">My Rides</Link>
    </nav>
  );
};

export default Navbar;