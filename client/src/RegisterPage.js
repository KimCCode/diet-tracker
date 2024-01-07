import { useState } from "react";
import { URL } from "./index";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
// Issue: User needs to log in again if uses the 'back' history button. How do I keep the user logged in?
const RegisterPage = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      saveToken(data.token);
      navigate(`/dashboard`);
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
        <label>Email</label>
        <input type="email" required className="edit-input-field" value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" required className="edit-input-field" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
        <button type="submit" className="submit-edit-btn">Create account</button>
      </form>
    </section>
  );
}

export default RegisterPage;