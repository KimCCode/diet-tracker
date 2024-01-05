import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Kim's Diet Tracker</Link>
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
 
export default Navbar;
