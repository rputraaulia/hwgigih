import React from 'react';

const Song = ({image, title, artist, album, Selecthandler, select, uri}) => {

    return <table className="Song">
        <tr>
            <td className='img'><img src={image} alt="album-cover" className="image-album" /></td>
            <td className='detail-song'>
                <p>{title} </p>
                <p>{artist} </p>
                <p>{album}</p>
                <button onClick={() => {Selecthandler(uri)}}>{select ? 'Deselect' : 'Select'}</button>
            </td>
            <td></td>
        </tr>
    </table>
}

export default Song;