const BASE_URL = 'https://7fb4-75-164-36-59.ngrok-free.app';

import axios from 'axios';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getSlackMessages = async (query) => {
  const endpoint = `/slack?query=${query}`;
  return getData(endpoint);
};

export const createSlackThread = async (text) => {
  const endpoint = '/createThread';
  return postData(endpoint, { text });
};

// Function to make GET requests
async function getData(endpoint) {
  try {
    const response = await client.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error in GET ${endpoint}: `, error);
    throw error;
  }
}

// Function to make POST requests
async function postData(endpoint, body) {
  try {
    const response = await client.post(endpoint, body);
    return response.data;
  } catch (error) {
    console.error(`Error in POST ${endpoint}: `, error);
    throw error;
  }
}
