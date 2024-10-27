// client/src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/pages/api/hello';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user', age: '' });
    const [editingUser, setEditingUser] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div>
            <h2>User List (Total: {users.length})</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
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
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>{user.age}</td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        className="form-control mb-2"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    {editingUser ? 'Update User' : 'Add User'}
                </button>
                {editingUser && (
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditingUser(null)}>
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
};

export default UserList;
