import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => {
  return Cookies.get('authToken');
};

export const login = async (userData) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/api/auth/signup/', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSpace = async (spaceData) => {
  const token = getToken()
  try {
    const response = await api.post('/api/spaces/create/', spaceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSpace = async (spaceId, spaceData) => {
  const token = getToken()
  try {
    const response = await api.put(`/api/spaces/${spaceId}`, spaceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSpace = async (spaceId) => {
  const token = getToken()
  try {
    const response = await api.delete(`/api/spaces/${spaceId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSpaces = async () => {
  try {
    const token = getToken()
    console.log(token)
    const response = await api.get('/api/spaces/all/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTasksInSpace = async (spaceId) => {
  const token = getToken();
  try {
    const response = await api.get(`/api/tasks/${spaceId}/all/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTaskInSpace = async (spaceId, taskData) => {
  const token = getToken();
  try {
    const response = await api.post(`/api/tasks/${spaceId}/create/`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markTaskAsDone = async (taskId) => {
  const token = getToken();
  try {
    const response = await api.put(`/api/tasks/${taskId}/mark-as-done`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskInSpace = async (taskId, taskData) => {
  const token = getToken();
  try {
    const response = await api.put(`/api/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskInSpace = async (taskId) => {
  const token = getToken();
  try {
    const response = await api.delete(`/api/tasks/${taskId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
