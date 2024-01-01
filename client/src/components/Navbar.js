import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/">Home</Link>
    </nav>
  );
}
 
export default Navbar;
