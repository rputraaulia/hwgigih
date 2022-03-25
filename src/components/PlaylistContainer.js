import PlaylistItem from './PlaylistItem';

import Data from '.data/data.js';

const { album, name: songName, artists } = Data;

function PlaylistContainer() {
  return (
    <div className="playlist-container">
      <PlaylistItem
        image={album?.images[0]?.url}
        songName={songName}
        albumName={album?.name}
        artists={artists}
      />
    </div>
  );
}

export default PlaylistContainer;
