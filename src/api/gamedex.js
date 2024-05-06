import axios from 'axios';

// API url
export const GAMEDEX_URL = 'http://localhost:9090/api';

export async function getGames() {
  const response = await axios.get(`${GAMEDEX_URL}/posts`);
  return response.data;
}

export async function getGame(id) {
  const response = await axios.get(`${GAMEDEX_URL}/posts/${id}`);
  return response.data;
}

export async function addGame(fields) {
  await axios.post(`${GAMEDEX_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } });
}

export async function updateGame(id, fields) {
  const response = await axios.put(`${GAMEDEX_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } });
  return response.data;
}

export async function deleteGame(id) {
  await axios.delete(`${GAMEDEX_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } });
}

/**
 * Sign in user
 * @param {object} fields - username or email, passowrd
 * @returns token and user data if successful
 */
export async function signin(fields) {
  const response = await axios.post(`${GAMEDEX_URL}/signin`, fields);
  return { token: response.data.token, user: response.data.user };
}

/**
 * Sign up user
 * @param {object} fields - username, email, password
 * @returns token if successful
 */
export async function signup(fields) {
  const response = await axios.post(`${GAMEDEX_URL}/signup`, fields);
  return response.data.token;
}

/**
 * Check if username is taken
 * @param {string} username
 * @returns true if username is taken, false if not
 */
export async function isUsernameTaken(username) {
  try {
    await axios.get(`${GAMEDEX_URL}/users/${username}`);
    return true;
  } catch (error) {
    return false;
  }
}
