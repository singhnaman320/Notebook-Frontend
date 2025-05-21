import axios from 'axios';

const API_URL = 'https://notebook-backend-s42x.onrender.com/api/users';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

export { register, login, logout };
