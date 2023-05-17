import React, { useEffect, useState } from "react";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const accessToken = getCookieValue("access_token");
        if (accessToken) {
          const response = await fetch("https://34.30.143.245/user/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error("Failed to fetch user data:", response.status);
          }
        } else {
          console.error("Access token not found in cookies.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getProfileData();
  }, []);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  return (
    <div>
      <h1 className="dashboard-title">User Profile</h1>
      {userData ? (
        <div className="user-data-box">
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <style jsx>{`
        .user-data-box {
          width: 50%;
          margin: auto;
          box-sizing: border-box;
          border: 1px solid #ccc;
          padding: 20px;
          margin-bottom: 2rem;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          background: #fffffe;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-top: 1rem;
        }

        .dashboard-title {
          text-align: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
