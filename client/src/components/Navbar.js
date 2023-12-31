import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Get started</Link>
    </nav>
  );
}
 
export default Navbar;
