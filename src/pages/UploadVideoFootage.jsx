import React, { useState } from 'react';



const UploadVideoFootage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reIdentifyInProgress, setReIdentifyInProgress] = useState(false);
  const [accuracyLevel, setAccuracyLevel] = useState('low');
  const [displayMessage, setDisplayMessage] = useState('');

  const handleVideoUpload = (e) => {
    const newVideos = [...videos];
    newVideos.push(e.target.files[0]);
    setVideos(newVideos);
    setSelectedVideo(e.target.files[0]);
  };

  const handlePictureUpload = (e) => {
    const newPictures = [...pictures];
    for (let i = 0; i < e.target.files.length; i++) {
      newPictures.push(e.target.files[i]);
    }
    setPictures(newPictures);
    setSelectedImage(e.target.files[0]);
  };

  const handleVideoSelection = (index) => {
    setSelectedVideo(videos[index]);
  };

  const handleVideoDeletion = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
    setSelectedVideo(newVideos[0]);
  };

  const handleVideoView = (video) => {
    const overlay = document.createElement("div");
    overlay.classList.add("video-overlay");
  
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(video);
    videoElement.controls = true;
    overlay.appendChild(videoElement);
  
    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  
    document.body.appendChild(overlay);
  };
  

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const handleReIdentifyStart = async () => {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      alert('You need to be logged in to use this feature');
      return;
    }
    setReIdentifyInProgress(true);
    setDisplayMessage('Your task is being processed. Your task is in queue. After completion, the video will be sent to your Email address');
  
    // Create form data with video file and target image
    const formData = new FormData();
    formData.append('video', selectedVideo, selectedVideo.name);
  
    for (let i = 0; i < pictures.length; i++) {
      formData.append('target_image', selectedImage, pictures[i].name);
    }
  
    // Send POST request to API endpoint
    try {
      const apiUrl = `https://34.30.143.245/video-reid/upload?accuracy=${accuracyLevel}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      setDisplayMessage(`Your task is being processed. Your task is in queue. After completion, the video will be sent to your Email address. Queue Number: ${data.queue_number}, Email: ${data.email}`);

      setReIdentifyInProgress(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAccuracyLevelChange = (e) => setAccuracyLevel(e.target.value);
  
  

  return (
    <div className="container">
      <div className="videos-box">
        <div className="videos-upload">
            <h3>Upload Video Footage</h3>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
        </div>

        {videos.length > 0 && (
          <div className="videos-list">
            {videos.map((video, index) => (
             <div key={index} className={`video-item ${selectedVideo === video ? 'selected' : ''}`}>
             <video src={URL.createObjectURL(video)} onClick={() => handleVideoSelection(index)} />
             {selectedVideo === video && (
               <div className="video-item-buttons">
                 <button onClick={() => handleVideoDeletion(index)}>Delete</button>
                 <button onClick={() => handleVideoView(video)}>View</button>
               </div>
             )}
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
                <img src={URL.createObjectURL(picture)} className="uploaded-image" alt='target images' />

              </div>
            ))}
          </div>
        )}

        {pictures.length > 0 && (
          <div className="reidentify-button">
            <button onClick={handleReIdentifyStart} disabled={reIdentifyInProgress}>
              {reIdentifyInProgress ? 'Re-identification in progress' : 'Start Re-identify'}
            </button>
          </div>
        )}
        <div className="accuracy-box">
    <h3>Accuracy</h3>
    <select name="accuracy" id="accuracy" onChange={handleAccuracyLevelChange}>
      <option value="low">Low (default)</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    {displayMessage && <p className="message">{displayMessage}</p>}

  </div>
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
          width: 30px;
          height: 50px;
        }
        


        input[type="file"] {
            font-size: 1.2rem;
            margin-top: 1rem;
            padding: 0.8rem 1.5rem;
            border-radius: 0.4rem;
            color: #1e88e5;
            transition: all 0.3s ease-in-out;
            background: rgba( 74, 144, 226, 0 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 14px );
            -webkit-backdrop-filter: blur( 14px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
          }
          
          input[type="file"]:hover {
            cursor: pointer;
            
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
            color: black;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

          }
          .message{
            color:blue;
          }
          .videos-upload,
          .pictures-upload{
            color: #1e88e5;
          }
          
          
          

      .videos-box,
      .pictures-box {
          border: 1px solid #32287f;
          margin-bottom: 20px;
          width: 100%;
          box-sizing: border-box;
          padding: 20px;
          backdrop-filter: blur(15px);
          border-radius: 10px;
          margin-top: 2%;
          margin-left: 2%;
          margin-right: 2%;
          background: #fffffe;
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }

          

        .videos-box {
          max-width: 800px;
          margin-right: 20px;
        }
        .videos-list, .pictures-list {
          display: flex;
          flex-wrap: wrap;
          padding: 10px;
          gap: 10px;
        }

        .videos-list {
          display: flex;
          flex-wrap: wrap;
        }
        .video-item, .picture-item {
          width: calc(33.33% - 10px);
          position: relative;
        }
        .accuracy-box {
          border: 2px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          background-color: #f5f5f5;
          color: #1e88e5;
          margin-top: 20px;
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }
        .accuracy-box label {
          font-size: 18px;
          margin-right: 10px;
        }
        
        .accuracy-box select {
          font-size: 18px;
          padding: 5px;
          border-radius: 5px;
          border: none;
          background-color: #fff;
          color: #1e88e5;
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }

        .video-item {
          width: calc(25% - 10px);
          margin-right: 10px;
          margin-bottom: 10px;
          position: relative;
        }

        .video-item video {
          width: 100%;
          cursor: pointer;
          
        }

        .video-item-buttons {
          display: flex;
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .video-item-buttons button {
          background-color: #4e8cff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          margin-right: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .video-item-buttons button:hover {
          background-color: #3466c2;
        }

        .video-item.selected {
          border: 3px solid #4e8cff;
        }

        .pictures-box {
          max-width: 800px;
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
          width: 100%;
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

        .accuracy-box {

          padding: 10px;
          margin-bottom: 20px;
          background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }
        
        .accuracy-box h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        
        .accuracy-box select {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          font-size: 16px;
          margin-top: 5px;
          margin-bottom: 5px;
          background-color: white;
          color: #1e88e5;
          background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }
        
        .accuracy-box select:focus {
          outline: none;
          border-color: #2196F3;
          box-shadow: 0 0 8px 0 rgba(33, 150, 243, 0.4);
          background: linear-gradient(to bottom right, #1b1443, #241a61, #1b1443);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
        }
        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .video-overlay video {
          max-width: 80%;
          max-height: 80%;
        }
        
        
        
      `}</style>
</div>
  );
};

export default UploadVideoFootage;
