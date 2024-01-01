import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Kim's Diet Tracker</Link>
      <Link to="/">Home</Link>
    </nav>
  );
}
 
export default Navbar;
