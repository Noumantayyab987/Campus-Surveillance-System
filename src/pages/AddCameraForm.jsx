import React, { useState } from 'react';
import axios from 'axios';

const AddCameraForm = ({ onCameraAdded }) => {
  const [ip, setIp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://${ip}/api/check_status`, {
        auth: { username, password },
      });
      onCameraAdded({ ip, username, password });
    } catch (error) {
      alert('Unable to add camera. Please check your camera details.');
    }
  };

  return (
    <div className="add-camera-form">
      <h3>Add Camera</h3>
      <form onSubmit={handleFormSubmit}>
        <label>IP Address:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />

        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Add Camera</button>
      </form>
    </div>
  );
};

export default AddCameraForm;
