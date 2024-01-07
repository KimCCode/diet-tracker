import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { token, removeToken } = useAuth();

  return (
    <nav className="navbar">
      <div classname="left-link">
        <Link to="/" className="logo">Kim's Diet Tracker</Link>
      </div>
      <div className="right-links">
        {token === '' && <Link to="/">Register</Link>}
        {token !== '' && <Link to={`/dashboard/${token}`}>Dashboard</Link>}
        <Link to="/login">Login</Link>
        {token !== '' && <Link to="/" onClick={removeToken}>Logout</Link>}
      </div>
    </nav>
  );
}
 
export default Navbar;
