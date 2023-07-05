const BASE_URL = 'https://a89a-75-164-36-59.ngrok-free.app';

import axios from 'axios';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSlackMessages = async (query) => {
  const endpoint = `/searchSlack?searchQuery=${query}`;
  return getData(endpoint);
};

export const createSlackThread = async ({
  text,
  conversationId,
  user,
  thread_ts,
}) => {
  const endpoint = '/createThread';
  return postData(endpoint, { text, conversationId, user, thread_ts });
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
