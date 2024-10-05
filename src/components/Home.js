import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import axios from "axios";
import CreateUserForm from "./CreateUserForm";  // Import CreateUserForm component
import EditUserForm from "./EditUserForm";  // Import EditUserForm component

// Home component to display users and handle CRUD operations
function Home() {
  const [users, setUsers] = useState([]);      // State to store list of users
  const [editingUser, setEditingUser] = useState(null);  // State to store user being edited

  // Fetch users from the API on component mount
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))  // Update users state with fetched data
      .catch(error => console.log(error));        // Log error if API call fails
  }, []);

  // Function to handle user deletion
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id))) // Update users state
      .catch(error => console.log(error));   // Log error if API call fails
  };

  // Function to handle user editing
  const editUser = (user) => {
    setEditingUser(user);  // Set the user to be edited
  };

  // Function to handle the addition of a new user
  const handleCreate = (newUser) => {
    setUsers([...users, newUser]);  // Add new user to the state
  };

  // Function to handle user updates after editing
  const handleUpdate = (updatedUser) => {
    // Update the user in the list with the new data
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);  // Close the edit modal
  };

  return (
    <div>
      <h1>User Management</h1>
      <CreateUserForm onCreate={handleCreate} />  {/* Render CreateUserForm for adding new users */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>  {/* Link to user details page */}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>  {/* Edit button */}
                <button onClick={() => deleteUser(user.id)}>Delete</button>  {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render EditUserForm modal if editingUser is set */}
      {editingUser && (
        <EditUserForm
          user={editingUser}                // Pass the user being edited
          onUpdate={handleUpdate}            // Function to call after user update
          onClose={() => setEditingUser(null)}  // Close modal function
        />
      )}
    </div>
  );
}

export default Home;
