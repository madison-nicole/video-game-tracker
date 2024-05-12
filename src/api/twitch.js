import axios from 'axios';

const TWITCH_CLIENT_ID = 'vdc8zk32y8t1shw13l3upxufjhjdqd';
const TWITCH_CLIENT_SECRET = 'usfmwfr26y8p0opracqci6kkegkw85';

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_TOP_GAMES_URL = 'https://api.twitch.tv/helix/games/top?first=100';

export async function getAccessToken() {
  const response = await axios.post(`${TWITCH_OAUTH_URL}?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`);
  return response.data.access_token;
}

export async function getTrendingGames() {
  const token = localStorage.getItem('twitchToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Client-Id': TWITCH_CLIENT_ID,
  };
  const response = await axios.get(TWITCH_TOP_GAMES_URL, { headers });

  // Filter non games and size images
  const games = response.data.data.filter((game) => game.igdb_id !== '').map((game) => {
    const imageUrl = game.box_art_url;
    const sizedUrl = imageUrl.replace('{width}', 1000).replace('{height}', 1300);
    return { ...game, box_art_url: sizedUrl };
  });
  return games;
}
