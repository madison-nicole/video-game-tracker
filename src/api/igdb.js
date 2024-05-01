import axios from 'axios';

// IGDB URLs
export const IGDB_GAMES_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/games';
export const IGDB_COVERS_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/covers';
export const IGDB_DATES_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/release_dates';

// IGDB API key
const API_KEY = 'o228NXPSSC2PvDrXAM3Xw5bYz6oOnFAN7XR4UTti';

// IGDB API header
export const IGDB_HEADERS = { 'x-api-key': API_KEY };

/**
 * Generic function that sends a query to the IGDB /games endpoint and returns the results
 *
 * @param {string} query - IGDB API query, as described here https://api-docs.igdb.com/#reference
 * @returns an array of IGDB game objects
 */
export async function fetchGamesIGDB(query) {
  const response = await axios.post(IGDB_GAMES_URL, query, {
    headers: IGDB_HEADERS,
  });
  const games = response.data;
  return games;
}

/**
 * Fetch the game cover url from a cover id.
 * @param {string} coverId
 * @returns formatted cover url
 */
export async function fetchGameCoverUrl(coverId) {
  const query = `fields url; where id = ${coverId};`;

  // Fetch cover art for the game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });

  const cover = response.data[0];
  const coverUrl = `https://${cover.url.replace('thumb', 'cover_big')}`;
  return coverUrl;
}

/**
 * Fetch the release year from a release year id
 * @param {string} releaseYearId
 * @returns release year (YYYY)
 */
export async function fetchGameReleaseYear(releaseYearId) {
  const query = `fields y; where id = ${releaseYearId};`;

  const response = await axios.post(IGDB_DATES_URL, query, {
    headers: IGDB_HEADERS,
  });

  return response.data.y;
}

/**
 * Fetches covers from an array of games
 * @returns a map of cover id to cover url
 */
export async function fetchGameCovers(games) {
  // Build cover query
  const coverIds = games.map((game) => {
    return game.cover;
  }).filter(Boolean);

  const query = `fields url; where id=(${coverIds.toString()}); limit 100;`;

  // Fetch cover art for each game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });

  return new Map(response.data.map((cover) => [cover.id, cover.url]));
}

/**
 * Fetches release years from an array of games
 * @returns a map of release year id to year (YYYY)
 */
export async function fetchGameReleaseYears(games) {
  const yearIds = games.map((game) => {
    return game.release_dates?.[0];
  });

  const query = `fields y; where id=(${yearIds.toString()}); limit 100;`;

  const response = await axios.post(IGDB_DATES_URL, query, {
    headers: IGDB_HEADERS,
  });

  return new Map(response.data.map((year) => [year.id, year.y]));
}
