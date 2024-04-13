import axios from 'axios';

// IGDB API url and key
export const AWS_PROXY_URL = 'https://ngdxb8kod9.execute-api.us-west-2.amazonaws.com/production/v4/games';
export const HEROKU_PROXY_URL = 'https://stormy-beyond-55916-854e0e178c38.herokuapp.com/https://api.igdb.com/v4/games';

// Client ID and Client Secret
// Need to populate these when you set up the application
export const CLIENT_ID = 'bb9r6fsk7ipj2yume0w6u9qp8svh6r';
const CLIENT_SECRET = 'oabqw3aywuh0ebv2oar5vgufbpt1yx';

export const AWS_PROXY_KEY = '1YB8UPISe43kLoBjL0GVC57O86anz8I74LE6PuAK';

export async function getTwitchAccessToken() {
  const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`);
  console.log(response);
  localStorage.setItem('twitchToken', response.data.access_token);
}
