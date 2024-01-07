import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { URL } from "./index";

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      saveToken(data.token);
    
      navigate(`/dashboard/${data.token}`);
      console.log('Token saved');
    }).catch(() => {
      console.log('Unable to fetch token');
    })
  }
  return (
    <section className="log-section">
      <form onSubmit={ handleSubmit } className="edit-task-form">
        <label>Username</label>
        <input type="text" required className="edit-input-field" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
        <label>Password</label>
        <input type="password" required className="edit-input-field" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
        <button type="submit" className="submit-edit-btn">Create account</button>
      </form>
    </section>
  );
}
 
export default Login;