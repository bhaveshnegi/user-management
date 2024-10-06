import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import axios from "axios";
import CreateUserForm from "../CreateUserForm/CreateUserForm";  
import EditUserForm from "../EditUserForm/EditUserForm"; 
import Modal from "react-modal"; 
import './Home.css'

Modal.setAppElement('#root'); 

function Home() {
  const [users, setUsers] = useState([]);      
  const [loading, setLoading] = useState(true); // New loading state
  const [editingUser, setEditingUser] = useState(null);  
  const [isCreating, setIsCreating] = useState(false);  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Start loading when the component mounts
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data);
        setLoading(false); // Stop loading once data is fetched
      })  
      .catch(error => {
        console.log(error);
        setLoading(false); // Stop loading if there's an error
      });        
  }, []);

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id))) 
      .catch(error => console.log(error));   
  };

  const editUser = (user) => {
    setEditingUser(user);  
  };

  const handleCreate = (newUser) => {
    setUsers([...users, newUser]);  
    setIsCreating(false); 
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);  
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <h1>User Management</h1>
      <button onClick={() => setIsCreating(true)}>Create New User</button>  

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by user name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  
          className="search-input"
        />
      </div>

      {/* Modal for creating a new user */}
      <Modal 
        isOpen={isCreating} 
        onRequestClose={() => setIsCreating(false)} 
        contentLabel="Create User Modal"
      >
        <h2>Create User</h2>
        <CreateUserForm onCreate={handleCreate} />
        <button onClick={() => setIsCreating(false)}>Close</button>
      </Modal>

      {/* Show loading spinner if data is still being fetched */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
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
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>  
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => editUser(user)}>Edit</button>  
                  <button onClick={() => deleteUser(user.id)}>Delete</button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <EditUserForm
          user={editingUser}                
          onUpdate={handleUpdate}            
          onClose={() => setEditingUser(null)}  
        />
      )}
    </div>
  );
}

export default Home;
