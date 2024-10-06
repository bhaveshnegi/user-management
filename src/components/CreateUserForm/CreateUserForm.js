import React, { useState } from "react";
import axios from "axios";
import "./CreateUserForm.css"

// Component for creating a new user with validation
function CreateUserForm({ onCreate }) {
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

  // State for tracking errors and submission status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Address validation
    if (formData.address.street === "" || formData.address.city === "") {
      newErrors.address = "Street and City are required.";
    }

    // Optional Company Name validation
    if (formData.company && formData.company.length < 3) {
      newErrors.company = "Company name must be at least 3 characters long.";
    }

    // Optional Website validation
    const urlRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    if (formData.website && !urlRegex.test(formData.website)) {
      newErrors.website = "Please enter a valid URL.";
    }

    // Set errors state and return if the form is valid
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    // Disable the submit button during submission
    setIsSubmitting(true);

    // Simulate a POST request
    axios.post("https://jsonplaceholder.typicode.com/users", formData)
      .then(response => {
        onCreate(response.data);  // Update parent component with new user data

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          username: "",
          address: { street: "", city: "" },
          company: "",
          website: "",
        });

        // Reset submission and error state
        setIsSubmitting(false);
        setErrors({});
      })
      .catch(error => {
        console.error("Error submitting form", error);
        setIsSubmitting(false);
      });
  };

  // Handle auto-filling of the username
  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      username: `USER-${name}`  // Auto-fill username based on name input
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          required
          disabled={isSubmitting}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          required
          disabled={isSubmitting}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div>
        <label>Username (Auto-filled):</label>
        <input type="text" value={formData.username} readOnly />
      </div>

      <div>
        <label>Street:</label>
        <input
          type="text"
          value={formData.address.street}
          onChange={e => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>City:</label>
        <input
          type="text"
          value={formData.address.city}
          onChange={e => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
          required
          disabled={isSubmitting}
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      <div>
        <label>Company Name (Optional):</label>
        <input
          type="text"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          disabled={isSubmitting}
        />
        {errors.company && <p className="error">{errors.company}</p>}
      </div>

      <div>
        <label>Website (Optional):</label>
        <input
          type="text"
          value={formData.website}
          onChange={e => setFormData({ ...formData, website: e.target.value })}
          disabled={isSubmitting}
        />
        {errors.website && <p className="error">{errors.website}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating User..." : "Create User"}
      </button>
    </form>
  );
}

export default CreateUserForm;
