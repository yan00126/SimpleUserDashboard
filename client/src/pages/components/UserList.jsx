"use client"

import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/pages/api/hello';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user', age: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!newUser.name.trim()) validationErrors.name = 'Name is required';
        if (!newUser.email.trim()) validationErrors.email = 'Email is required';
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.email)) validationErrors.email = 'Invalid email format';
        if (!newUser.password) validationErrors.password = 'Password is required';
        else if (newUser.password.length < 6) validationErrors.password = 'Password must be at least 6 characters long';
        if (!newUser.age) validationErrors.age = 'Age is required';
        else if (newUser.age < 0) validationErrors.age = 'Age must be a positive number';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (editingUser) {
                await updateUser(editingUser._id, newUser);
            } else {
                await createUser(newUser);
            }
            fetchUserList();
            setNewUser({ name: '', email: '', password: '', role: 'user', age: '' });
            setEditingUser(null);
        } catch (error) {
            console.error('Error saving user:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser(user);
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            fetchUserList();
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* User List Section */}
                <div className="col-md-8 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-secondary text-white">
                            <h4>User List (Total: {users.length})</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Age</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.age}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className={`card-header ${editingUser ? 'bg-warning' : 'bg-info'} text-white`}>
                            <h4>{editingUser ? 'Edit User' : 'Add New User'}</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="font-weight-bold">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                    {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="font-weight-bold">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="font-weight-bold">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                    />
                                    {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="role" className="font-weight-bold">Role</label>
                                    <select
                                        id="role"
                                        className="form-control"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <div className="text-danger mt-1">{errors.role}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="age" className="font-weight-bold">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        className="form-control"
                                        placeholder="Age"
                                        value={newUser.age}
                                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                                        required
                                    />
                                    {errors.age && <div className="text-danger mt-1">{errors.age}</div>}
                                </div>
                                <button type="submit" className={`btn ${editingUser ? 'btn-warning' : 'btn-info'} w-100 mb-2`}>
                                    {editingUser ? 'Update User' : 'Add User'}
                                </button>
                                {editingUser && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100"
                                        onClick={() => setEditingUser(null)}
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
