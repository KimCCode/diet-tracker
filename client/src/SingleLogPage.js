import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { URL } from './index';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from './AuthContext';

const SingleLogPage = () => {
  const { logID } = useParams();
  const { token } = useAuth();
  const defaultState = {entryName: '', calories: 0};
  const [data, setData] = useState(defaultState);
  const [entries, setEntries] = useState([]);

  const fetchEntries = () => {
    fetch(`${URL}/api/entry/${logID}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    })
    .then(res => { 
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      setEntries(data.entries);
      console.log('successfully fetched entries');
    })
    .catch(() => console.log('unable to fetch entries'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/entry/${logID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    })
    .then(res => { 
      if (!res.ok) {
        throw new Error();
      }
      return res.json()
    })
    .then(data => {
      setData(defaultState);
      setEntries([...entries, data.entry]);
      console.log('New entry added to log');
    })
    .catch(() => {
      console.log('Unable to add entry to log');
    });
  }

  const handleDelete = (logID, entryID) => {
    fetch(`${URL}/api/entry/${logID}/${entryID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      setEntries(entries.filter((entry) => entry._id !== entryID));
      console.log('Deleted entry from log');
    })
    .catch(() => {
      console.log('Unable to delete entry from log')
    })
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <section className="log-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={data.entryName}
          className="input-field"
          placeholder="eg. Beef Burger"
          onChange={(e) => setData({...data, entryName: e.target.value})}
        />
        <input 
          type="number"
          required
          value={data.calories}
          className="input-field"
          onChange={(e) => setData({...data, calories: e.target.value})}
        />
        <button type="submit" className="submit-btn">submit</button>
      </form>
      <div className="tasks-container">
        <div className="table-title">
          <span>Item</span>
          <span>Calories</span>
        </div>
        <div className="entries">
          {entries.map((entry) => (
            <div className="single-task" key={entry._id}>
              <span className="entryNameLength">{entry.entryName}</span>
              <span className="caloriesLength">{entry.calories}</span>
              <div className="icons">
                <div className="delete-icon">
                  <span onClick={() => handleDelete(entry.logID, entry._id)}><i className="fas fa-trash-alt" /></span>
                </div>
                <div className="edit-icon">
                  <Link to={`/entry/${entry.logID}/${entry._id}`}><i className="fas fa-edit" /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SingleLogPage;
