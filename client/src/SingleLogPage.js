import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URL } from './index';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SingleLogPage = () => {
  const { logID } = useParams();
  const [entryName, setEntry] = useState('');
  const [calories, setCalories] = useState(0);
  const [entries, setEntries] = useState([]);
  const [numEntries, setNumEntries] = useState(0);

  const handleSubmit = (e) => {
    const entry = { entryName, calories }
    e.preventDefault();
    fetch(`${URL}/api/entry/${logID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(entry)
    })
    .then(() => { 
      setNumEntries(numEntries + 1);
      console.log('New entry added to log');
    })
    .catch(() => {
      console.log('Unable to add entry to log');
    });
  }

  const handleDelete = (logID, entryID) => {
    fetch(`${URL}/api/entry/${logID}/${entryID}`, {method: 'DELETE'})
    .then(() => {
      setNumEntries(numEntries - 1);
      console.log('Deleted entry from log');
    })
    .catch(() => {
      console.log('Unable to delete entry from log')
    })
  }

  useEffect(() => {
    fetch(`${URL}/api/entry/${logID}`)
    .then(res => { 
      return res.json();
    })
    .then(data => {
      setEntries(data);
    })
  }, [logID, numEntries]);

  return (
    <section className="log-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={entryName}
          className="input-field"
          placeholder="eg. Beef Burger"
          onChange={(e) => setEntry(e.target.value)}
        />
        <input 
          type="number"
          required
          value={calories}
          className="input-field"
          onChange={(e) => setCalories(e.target.value)}
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
