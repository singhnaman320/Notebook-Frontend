import axios from 'axios';

const API_URL = 'https://notebook-backend-s42x.onrender.com/api/notes';

const createConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getNotes = async (token) => {
  try {
    const response = await axios.get(API_URL, createConfig(token));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch notes';
  }
};

const createNote = async (noteData, token) => {
  try {
    const response = await axios.post(API_URL, noteData, createConfig(token));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create note';
  }
};

const updateNote = async (id, noteData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, noteData, createConfig(token));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update note';
  }
};

const deleteNote = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, createConfig(token));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete note';
  }
};

export { getNotes, createNote, updateNote, deleteNote };
