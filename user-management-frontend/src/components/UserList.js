// src/components/UserList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

const deleteUser = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
        axios.delete(`http://localhost:8001/api/users/${id}`)
        .then((response) => {
            setUsers(users.filter(user => user.id !== id));
            alert(response.data.message);
        })
        .catch((error) => {
            console.error('There was an error deleting the user!', error);
            alert('Failed to delete user.');
        });
    }
  };

  
  return (
    <div>
      <h1>All Users</h1>

      {/* "Create New User" Button */}
      <Link to="/users/create" className="create-user-button-link">
        <button className="create-user-button">
          Create New User
        </button>
      </Link>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>{new Date(user.updated_at).toLocaleString()}</td>
                <td>
                <div className="action-buttons">
                  <Link to={`/users/${user.id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  <button 
                    onClick={() => deleteUser(user.id)} 
                    className="delete">
                    Delete
                  </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
