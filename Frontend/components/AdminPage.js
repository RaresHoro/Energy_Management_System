import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBox from "./ChatBox.js";
import AdminChat from './AdminChat.js';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState(''); // To hold the password input
  const [userId, setUserId] = useState(null); // To keep track of the user being edited
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [deviceUserId, setDeviceUserId] = useState(1); // Default user ID or prompt for it

  useEffect(() => {
    // Redirect if not admin
    const username = localStorage.getItem('username');
    if (username !== 'admin') {
      navigate('/client'); // Redirect to client page
    } else {
      fetchUsers();
      fetchDevices();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8080/api/user');
    setUsers(response.data);
  };

  const fetchDevices = async () => {
    const response = await axios.get('http://localhost:8081/api/device');
    setDevices(response.data);
  };

  const createUser = async () => {
    const response = await axios.post('http://localhost:8080/api/user', {
      name: userName,
      password: userPassword, // Use the password input
      role: 'client', // default role as 'client'
    });
    setUsers([...users, response.data]);
    setUserName(''); // Clear input field
    setUserPassword(''); // Clear password input field
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/user/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setUserId(user.id);
    setUserName(user.name);
    setUserPassword(''); // Clear password input for editing
  };

  const updateUser = async () => {
    if (userId) {
      const response = await axios.put(`http://localhost:8080/api/user/${userId}`, {
        name: userName,
        password: userPassword || 'updatedPassword', // Use the new password or a default one
        role: 'client', // or whatever role you want to set
      });
      setUsers(users.map(user => (user.id === userId ? response.data : user)));
      setUserId(null); // Clear selected user
      setUserName(''); // Clear input field
      setUserPassword(''); // Clear password input field
    }
  };

  const createDevice = async () => {
    const response = await axios.post('http://localhost:8081/api/device', {
      name: deviceName,
      type: deviceType,
      userId: deviceUserId, // Set the userId appropriately
    });
    setDevices([...devices, response.data]);
    setDeviceName(''); // Clear input field
    setDeviceType(''); // Clear input field
  };

  const deleteDevice = async (id) => {
    await axios.delete(`http://localhost:8081/api/device/${id}`);
    setDevices(devices.filter(device => device.id !== id));
  };

  const updateDevice = async () => {
    if (selectedDeviceId) {
      const response = await axios.put(`http://localhost:8081/api/device/${selectedDeviceId}`, {
        name: deviceName,
        type: deviceType,
        userId: deviceUserId, // Set the userId appropriately
      });
      setDevices(devices.map(device => (device.id === selectedDeviceId ? response.data : device)));
      setSelectedDeviceId(null);
      setDeviceName('');
      setDeviceType('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5 text-center">Admin Page</h2> {/* Increased bottom margin here */}
  
      <div className="row">
        <div className="col-md-6">
          <h3>Create User</h3>
          <div className="card p-3 mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            {/* Add empty space to match the number of fields in Create Device */}
            <div className="mb-2" style={{ height: '38px', backgroundColor: 'white' }}></div>
            <button className="btn btn-primary" onClick={createUser}>
              Create User
            </button>
          </div>
  
          <h3>Manage Users</h3>
          <ul className="list-group mb-4">
            {users.map((user) => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                {user.name}
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editUser(user)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          {userId && (
            <div className="card p-3 mb-4">
              <h4>Edit User</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="New Password (leave blank if not changing)"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={updateUser}>
                Update User
              </button>
            </div>
          )}
        </div>
  
        <div className="col-md-6">
          <h3>Create Device</h3>
          <div className="card p-3 mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Device Type"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="User ID"
              value={deviceUserId}
              onChange={(e) => setDeviceUserId(e.target.value)}
            />
            <button className="btn btn-primary" onClick={createDevice}>
              Create Device
            </button>
          </div>
  
          <h3>Manage Devices</h3>
          <ul className="list-group mb-4">
            {devices.map((device) => (
              <li key={device.id} className="list-group-item d-flex justify-content-between align-items-center">
                {device.name} ({device.type}) - User ID: {device.userId}
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      setSelectedDeviceId(device.id);
                      setDeviceName(device.name);
                      setDeviceType(device.type);
                      setDeviceUserId(device.userId);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteDevice(device.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          {selectedDeviceId && (
            <div className="card p-3 mb-4">
              <h4>Edit Device</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Device Type"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="User ID"
                value={deviceUserId}
                onChange={(e) => setDeviceUserId(e.target.value)}
              />
              <button className="btn btn-primary" onClick={updateDevice}>
                Update Device
              </button>
            </div>
          )}
        </div>
      </div>
    {/* ChatBox Section */}
    <div className="mt-5">
        <h2 className="text-center my-4">Chat with Clients</h2>
        <AdminChat/>
      </div>
    </div>
  );
  
};

export default AdminPage;
