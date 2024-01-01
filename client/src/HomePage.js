import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from './index';
import { format } from 'date-fns';
import '@fortawesome/fontawesome-free/css/all.min.css';

function HomePage() {
  const navigate = useNavigate();
  const [numLogs, setNumLogs] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleCardClick = (logID) => {
    navigate(`/entry/${logID}`)
  }
  const handleCardDelete = (e, logID) => {
    e.stopPropagation();
    fetch(`${URL}/api/log/${logID}`, {method: 'DELETE'})
    .then(() => {
      setNumLogs(numLogs - 1);
      console.log('Log deleted!');
    });
  }
  const handleDefaultCardClick = () => {
    fetch(`${URL}/api/log`, {method: 'POST'})
      .then(() => {
        setNumLogs(numLogs + 1);
        console.log('New log added')
      })
      .catch(() => {
        console.log('Unable to create new log');
      });
  }

  useEffect(() => {
    fetch(`${URL}/api/log`)
    .then(res => { 
      return res.json();
    })
    .then(data => {
      setLogs(data.logsOwned);
    })
  }, [numLogs]);

  return (
    <div className="content">
      <div className="default-card log-card" onClick={handleDefaultCardClick}>
        +
      </div>
      {logs.map((log) => (
          <div className="log-card" key={log._id} onClick={() => handleCardClick(log._id)}>
            <div className="log-date">
              <span> { format(new Date(log.createdAt), 'dd/MM/yyyy') }</span>
            </div>
            <div className="log-info">
              <span className="calories-container">Calories: { log.calories }</span>
              <span className="numEntries-container">Entries: { log.numEntries }</span>
            </div>
            <button className="trash-icon-container" onClick={(e) => handleCardDelete(e, log._id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
