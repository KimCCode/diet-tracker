import './App.css';
import { useNavigate } from 'react-router';
import { URL } from './index';

function HomePage() {
  const navigate = useNavigate();
  const handleCardClick = () => {
    fetch(`${URL}/api/log`, {method: 'POST'})
      .then(res => {
        return res.json();
      })
      .then(data => {
        navigate(`/log/${data.logID}`);
      })
      .catch(() => {
        console.log('Unable to create log');
      });
  }

  return (
    <section>
      <div className="card" onClick={handleCardClick}>
        +
      </div>
    </section>
  );
}

export default HomePage;
