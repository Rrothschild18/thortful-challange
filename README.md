# ThortfulChallange

### How to run
Step 1 - The app relies on Spotify Web Api, to run it locally is needed to create an account at [Spotify Web Api](https://developer.spotify.com/). Generally you can access with your normal spotify account.
Once you log in, access  [Spotify Web Api Documentation](https://developer.spotify.com/documentation/web-api) to create an authorized application. 

Step 2 - Set up your `envoirement.development.ts` file 

```ts
export const environment = {
  baseURL: 'https://api.spotify.com/v1', // 
  clientId: YOUR_CLIENT_ID  // Generated from Spotify
  authURL: 'https://accounts.spotify.com/authorize',
  redirectURL: YOUR_REDIRECT_URL, // Example 'http://localhost:4200/auth/callback' previosly registered at Spotify API Dashboard
  scopes: [ // Required API scopes
    'user-read-recently-played', 
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
```
Step 3 - run `npm i` inside the cloned project folder

Sep 4 - run `ng serve --configuration development`
