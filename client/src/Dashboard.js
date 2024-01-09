import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from './index';
import { format } from 'date-fns';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from './AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);

  const fetchData = () => {
    fetch(`${URL}/api/log`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      setLogs(data.logsOwned);
      console.log('successfully fetched data');
    })
    .catch(() => {
      navigate('/login');
      console.log('unable to fetch data');
    })
  }

  const handleCardClick = (logID) => {
    navigate(`/log/${logID}`)
  }

  const handleCardDelete = (e, logID) => {
    e.stopPropagation();
    fetch(`${URL}/api/log/${logID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error()
      }
      fetchData();
      console.log('Log deleted!');
    })
    .catch(() => {
      navigate('/login');
      console.log('Unable to delete log')
    });
  }

  const handleDefaultCardClick = () => {
    fetch(`${URL}/api/log`, {
      method: 'POST',
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        fetchData();
        console.log('New log added');
      })
      .catch(() => {
        console.log('Unable to create new log');
      });
  }
  useEffect(() => {
    fetchData()
  }, [])
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

export default Dashboard;
