import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { token, removeToken } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Kim's Diet Tracker</Link>
      {token === '' && <Link to="/">Register</Link>}
      {token !== '' && <Link to={`/dashboard/${token}`}>Dashboard</Link>}
      <Link to="/login">Login</Link>
      {token !== '' && <Link to="/" onClick={removeToken}>Logout</Link>}
    </nav>
  );
}
 
export default Navbar;
