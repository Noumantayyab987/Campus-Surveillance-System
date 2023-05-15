import React, { useState, useEffect } from "react";

const Dashboard = () => {

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the Authorization Bearer token from the cookie
    const cookies = document.cookie.split("; ");
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith("Authorization=")
    );
    const token = authCookie ? authCookie.split("=")[1] : null; // check for undefined authCookie

    // Fetch user data from the API
    fetch("https://34.30.143.245/user/me", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
        setError("Unauthorized: You do not have permission to access this resource.");
      });
  }, []);

  

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Personal Dashboard</h2>

      {error && <p>{error}</p>}

      <div className="user-data-box">
        {userData && (
          <>
            {userData && <p>Your ID is: {userData.id}</p>}
            <p>Name: {userData.name}</p>

            <p>Email: {userData.email}</p>
          </>
        )}
      </div>

  



      
      <style jsx>{`
        .user-data-box {
          width: 50%;
          margin: auto;
          box-sizing: border-box;
          border: 1px solid #ccc;
          padding: 20px;
          margin-bottom: 2rem;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          background: rgba( 74, 144, 226, 0 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 14px );
          -webkit-backdrop-filter: blur( 14px );
          border-radius: 10px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
          margin-top:1rem;
        }

        .user-count {
          text-align: center;
        }

        .log-file-section {
          text-align: center;
        }
        .dashboard-title{
          text-align: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
