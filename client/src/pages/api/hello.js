// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

// Assuming your backend server is running on the same host as Next.js, just on a different port
const API = axios.create({ baseURL: 'http://localhost:5000' });

export default async function handler(req, res) {
  const { method, query, body } = req;
  console.log(`Received ${method} request:`, { query, body });

  try {
    let response;
    switch (method) {
      case 'GET':
        response = await API.get('/users');
        break;
      case 'POST':
        response = await API.post('/users', body);
        break;
      case 'PUT':
        if (!query.id) {
          return res.status(400).json({ error: 'User ID is required for update' });
        }
        console.log(`Updating user with ID: ${query.id}`);
        response = await API.put(`/users/${query.id}`, body);
        break;
      case 'DELETE':
        if (!query.id) {
          return res.status(400).json({ error: 'User ID is required for deletion' });
        }
        response = await API.delete(`/users/${query.id}`);
        break;
      default:
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
    console.log('API response:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API error:', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}

// Update these functions to use the Next.js API route
export const fetchUsers = () => axios.get('/api/hello');
export const createUser = (userData) => axios.post('/api/hello', userData);
export const updateUser = (id, userData) => axios.put(`/api/hello?id=${id}`, userData);
export const deleteUser = (id) => axios.delete(`/api/hello?id=${id}`);
