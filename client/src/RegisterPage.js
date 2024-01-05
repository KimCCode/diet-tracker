import { useState } from "react";
import { URL } from "./index";
import { useAuth } from "./AuthContext";

const RegisterPage = () => {
  const { setToken } = useAuth();
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
      return res.json()
    }).then((data) => {
      console.log(data);
      setToken(data.token);
    }).catch(() => {
      console.log('Unable to fetch token');
    })
  }
  return (
    <form onSubmit={ handleSubmit } className="edit-task-form">
      <label>Username</label>
      <input type="text" className="edit-input-field" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
      <label>Email</label>
      <input type="email" className="edit-input-field" value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
      <label>Password</label>
      <input type="password" className="edit-input-field" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
      <button type="submit" className="submit-edit-btn">Create account</button>
    </form>
  );
}

export default RegisterPage;