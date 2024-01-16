# ThortfulChallange

### How to run
> [!IMPORTANT]  
> The app relies on Spotify Web Api. The environment configuration already has working credentials, if you dont want to set up your own app just `jump to step 3`


---
Step 1 - To run it locally and access their API is needed to create an account at [Spotify Web Api](https://developer.spotify.com/). 
Generally you can access the developer section with your usual spotify account. Once you log in, access  [Spotify Web Api Documentation](https://developer.spotify.com/documentation/web-api) to setting up an authorized application and
get your `clientId` and registering the `redirectURL`


<details>
  <summary>Your app dasboard shoud like this</summary>
<p align="center" >
 <img src='https://github.com/Rrothschild18/thortful-challange/assets/39390678/eff5a30f-3965-41af-99ad-1212516dc19f'>
</p>
</details>


Step 2 - Set up your `environment.development.ts` file

```ts
//Example of environment.development.ts

export const environment = {
  baseURL: 'https://api.spotify.com/v1',  
  clientId: YOUR_CLIENT_ID  // Generated from Spotify
  authURL: 'https://accounts.spotify.com/authorize',
  redirectURL: YOUR_REDIRECT_URL, // Example for this project 'http://localhost:4200/auth/callback' previously registered at Spotify API Dashboard
  scopes: [ // Required API scopes
    'user-read-recently-played', 
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
```
Step 3 - run `git clone` inside your desired projects path then `npm i` inside the `cloned project folder`

Sep 4 - run `ng serve --configuration development`


### Features

`Home Page` => The main page of the application where it combines your all time listened artists, recommendations based at your favorited artists and a section of all favorite artists.

`ArtistOverview` => A router outlet responsable to display few informations of the selected artist.

`ArtistView` => A single page where full informations about the artists can be seen

`SearchBar` => A input where user can search for his favorite artist and then be redirected to it view page.

### Cool insigths from WakaTime

![image](https://github.com/Rrothschild18/thortful-challange/assets/39390678/761e44f7-e864-4dd7-8ce5-98cfbe390764)

[Full Wakatime report](https://wakatime.com/@a39ff5ab-74f7-4901-a557-16cdd312074f/projects/qtehduwucw?start=2024-01-08&end=2024-01-14) 


