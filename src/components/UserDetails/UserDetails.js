import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import axios from "axios";
import "./UserDetails.css"

// Component to display user details
function UserDetails() {
  const { id } = useParams();  // Get the user ID from the URL parameters
  const [user, setUser] = useState(null);  // State to hold user data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to hold error messages

  // Fetch user data based on the ID from the URL
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);  // Update user state with fetched data
        setLoading(false);        // Update loading status
      })
      .catch(error => {
        setError("Failed to fetch user data.");  // Set error message if API call fails
        setLoading(false);                        // Update loading status
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;  // Display loading message
  if (error) return <div>{error}</div>;        // Display error message

  return (
    <div>
      <h1>User Details</h1>
      {user && (  // Check if user data is available
        <div>
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}`}</p>
          <p><strong>Company:</strong> {user.company?.name}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
