import React, { useState } from 'react';


const AddLiveCameras = () => {
  const [cameras, setCameras] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [selectedCamera] = useState(null);
  const [setStatus] = useState('');
  const [reIdentifyInProgress, setReIdentifyInProgress] = useState(false);

  const handleCameraAddition = () => {
    const ip = prompt('Please enter the IP address of the camera:');
    const username = prompt('Please enter the username:');
    const password = prompt('Please enter the password:');
    const newCamera = { ip, username, password, status: 'Offline' };
    setCameras([...cameras, newCamera]);
  };


  
  
  const handleCameraView = () => {
    if (selectedCamera) {
      if (selectedCamera.status === 'Online') {
        // Show camera view
        console.log('Camera is online. Show camera view.');
      } else {
        // Show error message for offline camera
        setStatus('Offline');
        console.log('Camera is offline. Show error message.');
      }
    } else {
      // Show error message for no selected camera
      console.log('No camera selected. Show error message.');
    }
  };
  
  
  

  

  const handleCameraDeletion = (index) => {
    const newCameras = [...cameras];
    newCameras.splice(index, 1);
    setCameras(newCameras);
  };

  const handlePictureUpload = (e) => {
    const newPictures = [...pictures];
    for (let i = 0; i < e.target.files.length; i++) {
      newPictures.push(e.target.files[i]);
    }
    setPictures(newPictures);
  };

  const handleReIdentifyStart = async () => {
    setReIdentifyInProgress(true);
    // Call API to start re-identification process
    // Once process is complete, setReIdentifyInProgress(false);
  };


  

  return (
    <div className="container">
      <div className="cameras-box">
        <div className="cameras-add">
          <h3>Add Live Cameras</h3>
          <button onClick={handleCameraAddition}>Add Camera</button>
        </div>

        {cameras.length > 0 && (
          <div className="cameras-list">
            {cameras.map((camera, index) => (
  <div key={index} className={`camera-item ${camera.status === 'Online' ? 'online' : 'offline'}`}>
    <div className="camera-details">
      <div className="camera-ip">{camera.ip}</div>
      <div className="camera-status">{camera.status}</div>
    </div>
    <div className="camera-buttons">
      <button onClick={handleCameraView}>View</button>
      <button onClick={() => handleCameraDeletion(index)}>Delete</button>
    </div>
  </div>
))}



          </div>
        )}
      </div>
      <div className="pictures-box">
        <div className="pictures-upload">
          <h3>Upload Images</h3>
          <input type="file" accept="image/*" multiple onChange={handlePictureUpload} />
        </div>

        {pictures.length > 0 && (
      <div className="pictures-list">
        {pictures.map((picture, index) => (
          <div key={index} className="picture-item">
            <img src={URL.createObjectURL(picture)} className="uploaded-image" alt='target iamge'/>

          </div>
        ))}
        <div className="picture-buttons">
          <button onClick={handleReIdentifyStart} disabled={reIdentifyInProgress}>
            {reIdentifyInProgress ? 'Re-identification in progress' : 'Re-Identify'}
          </button>
        </div>
      </div>
    )}
  </div>
  




      <style jsx>{`
      .dashboard-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
      }
      .uploaded-image {
        width: 100px;
        height: 100px;
      }
      

      input[type="file"] {
        font-size: 1.2rem;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 0.4rem;
            background: linear-gradient(to bottom right, #4a386b, #241a61, #4a386b);
            color: #1e88e5;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
          margin-top:1rem;
      }
      .camera-item{
        color:blue;

      }
      
      input[type="file"]:hover {
        cursor: pointer;
        
        color: white ;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
        color: black ;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      }
      
      input[type="file"]::-webkit-file-upload-button {
        font-size: 1.2rem;
        padding: 0.3rem 0.5rem;
        border: none;
        border-radius: 0.4rem;
        background: linear-gradient(to bottom right, #4a386b, #241a61, #4a386b);
        color: #1e88e5;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
          
      }
      
      input[type="file"]::-webkit-file-upload-button:hover {
        cursor: pointer;
        background-color: white;
        color: black ;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      }
      
      .cameras-box,
      .pictures-box {
        border: 1px solid #32287f;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
        background: rgba( 74, 144, 226, 0 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 14px );
        -webkit-backdrop-filter: blur( 14px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      
      .cameras-box {
        max-width: 800px;
          margin-right: 20px;
      }
      display: flex;
          flex-wrap: wrap;
          padding: 10px;
          gap: 10px;
      
      .cameras-add h3,
      .pictures-upload h3 {
        margin-top: 0px;
        margin-bottom: 5px;
      }
      
      .camera-item {
        align-items: center;
        background-color: #f6f6f6;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px;
        background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
        background: rgba( 74, 144, 226, 0 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 14px );
        -webkit-backdrop-filter: blur( 14px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        margin-top:1rem;
      }
      
      .camera-item.selected {
        background-color: #e0e0e0;
        
      }
      
      .camera-item .camera-details {
        flex: 1;
        
      }
      
      .camera-item .camera-buttons {
        display: flex;
      }
      
      .camera-item .camera-buttons button {
        margin-left: 10px;
        color: #1e88e5;
        
        
      }
      .pictures-box {
        background-color: #f7f7f7;
        max-width: 800px;
        background: rgba( 74, 144, 226, 0 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 14px );
            -webkit-backdrop-filter: blur( 14px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      .pictures-box h3,
      .cameras-box {
        color:#1e88e5;
      }
      .pictures-list {
        display: flex;
        flex-wrap: wrap;
      }
      .picture-item {
        width: calc(25% - 10px);
          margin-right: 10px;
          margin-bottom: 10px;
      }
      
      .picture-item img {
        max-width: 100%;
      }
      
      .reidentify-button {
        margin-top: 20px;
      }
      button {
        margin-top: 10px;
        font-size: 1.2rem;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 0.4rem;
        background: linear-gradient(to bottom right, #4a386b, #241a61, #4a386b);
        color: #1e88e5;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        transition: all 0.3s ease-in-out;
        background: rgba( 74, 144, 226, 0 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 14px );
            -webkit-backdrop-filter: blur( 14px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      
      button:hover {
        cursor: pointer;
        background-color: white;
        color: black ;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      }
      
      button:active {
        transform: translateY(1px);
      }
      .reidentify-button button {
        background-color: #4e8cff;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .reidentify-button button:hover {
        background-color: #3466c2;
      }
      
      
      
      
      `}</style>
    </div>
);
};

export default AddLiveCameras;    