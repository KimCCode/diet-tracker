import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { URL } from './index';
const EditPage = () => {
  const { logID, entryID } = useParams();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(`/log/${logID}`);
  }
  const [newEntryName, setNewEntryName] = useState('');
  const [newCalories, setNewCalories] = useState(0);
  const handleEdit = (e) => {
    e.preventDefault();
    const newEntry = {entryName: newEntryName, calories: newCalories};
    fetch(`${URL}/api/entry/${logID}/${entryID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newEntry)
    })
    .then(() => {
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
            value={newEntryName}
            className="edit-input-field"
            onChange={e => setNewEntryName(e.target.value)}
          />
        <label htmlFor="editCalories">New Calories Amount:</label>
          <input
            type="number"
            required
            name="editCalories"
            value={newCalories}
            className="edit-input-field"
            onChange={e => setNewCalories(e.target.value)}
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
