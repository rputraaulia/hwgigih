import './App.css';
import Data from './data/data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Playlist</h1>
      </header>
      <div className="Song-playlist">
        <img src={Data.album.images[1].url} className="image-album"/>
        <p className='title'>Title : {Data.name}</p>
        <p className='album'>album : {Data.album.name}</p>
        <p className='artist'>Artist : {Data.album.artists[0].name}</p>
        <button>Select</button>
      </div>
    </div>
  );
}

export default App;