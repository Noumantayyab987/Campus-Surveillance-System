import React, { useState } from 'react';

const AddCameraModal = ({ showModal, setShowModal, handleAddCamera }) => {
  const [ip, setIp] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCamera(ip, password);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Camera</h3>
            <form onSubmit={handleSubmit}>
              <label>
                IP Address:
                <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} required />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <button type="submit">Add Camera</button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }
        .modal {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h3 {
          margin-top: 0;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 10px;
        }
        input {
          padding: 10px;
          border-radius: 5px;
          border: none;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          margin-left: 10px;
        }
        button[type='submit'] {
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: #3498db;
          color: #fff;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
          margin-top: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AddCameraModal;
