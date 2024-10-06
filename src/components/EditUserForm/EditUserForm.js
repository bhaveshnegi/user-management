import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for editing an existing user
function EditUserForm({ user, onUpdate, onClose }) {
  // State for managing form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: "",
    website: "",
  });

  // Load user's current data into the form when the component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        address: user.address,
        company: user.company?.name || "",
        website: user.website || "",
      });
    }
  }, [user]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a PUT request to update user data
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      .then(response => {
        onUpdate(response.data);  // Update parent component with new user data
        onClose();  // Close the modal after submission
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>  {/* Close button */}
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Username (Non-editable):</label>
            <input type="text" value={formData.username} readOnly />
          </div>

          <div>
            <label>Street:</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={e => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
              required
            />
          </div>

          <div>
            <label>City:</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={e => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
              required
            />
          </div>

          <div>
            <label>Company Name (Optional):</label>
            <input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label>Website (Optional):</label>
            <input
              type="text"
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
