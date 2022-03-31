
import React, { useState, useEffect } from 'react';
import './index.css';
import Song from './components/song';

const axios = require('axios');

function App() {

  const [access_token, set_access_token] = useState(null);
  const [search, set_search] = useState('');
  const [tracks, set_tracks] = useState([]);

  const LoginButton = () => {

    let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    let scope = 'playlist-modify-private';
    let redirect_uri = 'http://localhost:3000';

    let spotify_url = 'https://accounts.spotify.com/authorize';
        spotify_url += '?response_type=token';
        spotify_url += '&client_id=' + encodeURIComponent(client_id);
        spotify_url += '&scope=' + encodeURIComponent(scope);
        spotify_url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    return (
      <a href={spotify_url} className="login">
        Login Spotify
      </a>
    );
  }

  const Form = () => {
    return (
      <div className="search-bar">
        <input value={search} onChange={e => set_search(e.target.value)} placeholder="Search" />
        <button onClick={() => {handleClick()}} className="button-login">Search</button>
      </div>
    );
  }

  function handleClick() {
    try {
      let url = 'https://api.spotify.com/v1/search?q='+search+'&type=track,artist';
      axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
      })
      .then(res => {
        set_tracks(res.data.tracks.items);
      })
    } catch (err) {
      console.error(err);
    } finally {
      console.log(tracks);
    }
  }

  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  useEffect(() => {
    let params = getHashParams()
    let token = params.access_token;
    set_access_token(token);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Playlist</h1>
      </header>  

      {(!access_token) && (
        <LoginButton/>
      )}

      {(access_token) && (
        <Form/>
      )}

      <div>
        {tracks.map((item) => {
          return (
            <Song key={item.id} 
            image={item.album.images[1].url} 
            title={item.name} 
            album={item.album.name} 
            artist={item.album.artists[0].name}/>
          );
        })}
      </div>

    </div>
  );
}

export default App;