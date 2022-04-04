import React, { useState, useEffect } from 'react';
import './index.js';
import Song from './components/song';

const axios = require('axios');

function App() {

  const [accessToken, setAccessToken] = useState(null);
  const [search, set_search] = useState('');
  const [tracks, set_tracks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combineTrack, setCombineTrack] = useState([]);
  
  var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  var scope = 'playlist-modify-private';
  var redirect_uri = 'http://localhost:3000';

  var state = "Spotify-React"

  localStorage.setItem("TOKEN", state)

  var spotify_url = 'https://accounts.spotify.com/authorize';
      spotify_url += '?response_type=token';
      spotify_url += '&client_id=' + encodeURIComponent(client_id);
      spotify_url += '&scope=' + encodeURIComponent(scope);
      spotify_url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      spotify_url += '&state' + encodeURIComponent(state);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const Accesstoken = queryString.get("access_token");
    setAccessToken(Accesstoken);
  }, []);

  useEffect(() => {
    const handleCombineTrack = tracks.map((track) => ({
      ...track,
      select : selected.find((data) => data === track.uri),
    }));
    setCombineTrack(handleCombineTrack);
  }, [tracks, selected]);

  const getTracks = async () => {
    await axios
    .get(
      `https://api.spotify.com/v1/search?q=${search}&type=track&access_token=${accessToken}`
    )
    .then((res) => {
      set_tracks(res.data.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const Selecthandler = (uri) => {
    const onSelected = selected.find((track) => track === uri);
    onSelected ?
    setSelected(selected.filter((track) => track !== uri))
    : setSelected ([...selected, uri]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify</h1>
      </header>
      {(!accessToken) && (
        <a href={spotify_url} className="login">Login Spotify</a>
      )}

      {(accessToken) && (
        <div className="search-bar">
          <input value={search} onChange={e => set_search(e.target.value)} placeholder="Search" />
          <button onClick={getTracks} className="button-login">Search</button>
        </div>
      )}  
      <div>
        {combineTrack.map((track) => {
          const { name, album, select, uri} = track;
          return (
            <Song key={uri} 
            image={album.images[1].url} 
            title={name} 
            album={album.name} 
            artist={album.artists[0].name}
            Selecthandler={Selecthandler}
            uri={uri}
            select={select}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;