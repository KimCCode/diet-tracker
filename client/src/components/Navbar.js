import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { token, removeToken } = useAuth();

  return (
    <nav className="navbar">
      <div className="left-link">
        <p className="logo">Kim's Diet Tracker</p>
      </div>
      <div className="right-links">
        {token === '' && <Link to="/">Register</Link>}
        {token !== '' && <Link to={`/dashboard`}>Dashboard</Link>}
        <Link to="/login">Login</Link>
        {token !== '' && <Link to="/" onClick={removeToken}>Logout</Link>}
      </div>
    </nav>
  );
}
 
export default Navbar;
