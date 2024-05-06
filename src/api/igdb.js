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
export async function fetchGames(query) {
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
  const query = 'fields url;';

  // Fetch cover art for the game
  const response = await axios.post(`${IGDB_COVERS_URL}/${coverId}`, query, {
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
  const query = 'fields y;';

  const response = await axios.post(`${IGDB_DATES_URL}/${releaseYearId}`, query, {
    headers: IGDB_HEADERS,
  });

  return response.data.y;
}

/**
 * Fetches covers from an array of games
 * @returns an object with cover id keys mappign to cover url values
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

  const covers = {};
  response.data.forEach((cover) => {
    covers[cover.id] = cover.url;
  });
  return covers;
}

/**
 * Fetches release years from an array of games
 * @returns an object with release year id keys maping to year (YYYY) values
 */
export async function fetchGameReleaseYears(games) {
  const yearIds = games.map((game) => {
    return game.release_dates?.[0];
  });

  const query = `fields y; where id=(${yearIds.toString()}); limit 100;`;

  const response = await axios.post(IGDB_DATES_URL, query, {
    headers: IGDB_HEADERS,
  });

  const years = {};
  response.data.forEach((year) => {
    years[year.id] = year.url;
  });
  return years;
}
