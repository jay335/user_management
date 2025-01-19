// src/components/UserForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8001/api/users/${id}`).then((response) => {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
        return;
      } else {
        setPasswordError('');
    }
    const userData = { name, email, password };
    if (id) {
      axios.put(`http://localhost:8001/api/users/${id}`, userData).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/users');
        }, 3000);
      });
    } else {
      axios.post('http://localhost:8001/api/users', userData).then(() => {
        setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate('/users');
          }, 3000);
      });
    }
  };

  return (
    <div>
      <h1>Create New User</h1>
      {showSuccess && (
        <div className="success-popup">
          <p>User {id ? 'Updated' : 'Created'} successfully!</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <button type="submit" className="create-button">{id ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
