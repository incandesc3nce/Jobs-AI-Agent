import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    } else {
      // Redirect to login if no token is found
      navigate("/job-search");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  if (!token) {
    // This will briefly show before navigation or if navigation fails
    return <p>Loading or redirecting...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p style={{ wordBreak: "break-all" }}>
        <strong>Token:</strong> {token}
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
