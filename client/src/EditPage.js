import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { URL } from './index';
import { useAuth } from "./AuthContext";
const EditPage = () => {
  const { logID, entryID } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(`/log/${logID}`);
  }
  const [data, setData] = useState({ entryName: '', calories: 0});

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/entry/${logID}/${entryID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      console.log('Updated entry');
    })
    .catch(() => {
      console.log('Unable to edit entry');
    })
  }

  return (
    <div className="log-section">
      <form className="edit-task-form" onSubmit={handleEdit}>
        <label htmlFor="editName">New Name:</label>
          <input
            type="text"
            required
            name="editName"
            value={data.entryName}
            className="edit-input-field"
            onChange={e => setData({ ...data, entryName: e.target.value })}
          />
        <label htmlFor="editCalories">New Calories Amount:</label>
          <input
            type="number"
            required
            name="editCalories"
            value={data.calories}
            className="edit-input-field"
            onChange={e => setData({ ...data, calories: e.target.value })}
          />
        <button className="submit-edit-btn">Confirm changes</button>
      </form>
      <div className="back-button-containe">
        <button className="back-button" onClick={navigateBack}>Back</button>
      </div>
    </div>
  );
}
 
export default EditPage;
