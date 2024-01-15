export const environment = {
  baseURL: 'https://api.spotify.com/v1',
  clientId: '1e2ebb58c1e349d1a776117b1ff97fe9',
  authURL: 'https://accounts.spotify.com/authorize',
  redirectURL: 'https://thortful-challange-ljd4.vercel.app/auth/callback',
  scopes: [
    'user-read-recently-played',
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
