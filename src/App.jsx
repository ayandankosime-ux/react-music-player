import { useState } from 'react';
import './App.css'

function App() {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(2);
  const [ songs, setSongs ] = useState([{
    name: 'To Deep for the Intro',
    artist: 'J. Cole',
    audio: 'songs/Too Deep for the Intro(MP3_160K).mp3',
    img: 'images/image-1.jpg'
  }, {
    name: 'The Cut Off',
    artist: 'J. Cole', 
    audio: 'songs/The Cut Off(MP3_160K) (1).mp3',
    img: 'images/image-2.jpeg'
  }, {
    name: 'TOO COOL',
    artist: 'Dear Silas',
    audio: 'songs/TOO COOL (Clean Version)(MP3_160K).mp3',
    img: 'images/image-3.jpeg'
  }]);

  const currentSong = songs[currentIndex];

  function handlePreviousBtn() {

    console.log(currentIndex);
    setCurrentIndex((count) => {
      if (count < 0) {
        return count = 2;

      } else if (count > 0) {
        return count -= 1;
      }
      
    });
  }
  

  function handlePlayBtn() {
    const song = document.getElementById('song');

    if (!isPlaying) {
      song.play();
      setIsPlaying(true);

    } else { 
      song.pause();
      setIsPlaying(false);
    }
  }
  

  return (
    <>
      <div className="app-container">
        <div className="image-container">
          <img src={currentSong.img} alt="album-art" />
        </div>
        <div className="info-container">
          <h3 className="song-name">{currentSong.name}</h3>
          <p className="artist-name">{currentSong.artist}</p>
        </div>
          <input className='progress-bar' type="range" />
        <div className="controls-container">
          <button className="btn btn-previous" onClick={handlePreviousBtn}>⏪</button>
          <button className="btn btn-play"onClick={handlePlayBtn}>▶️</button>
          <button className='btn btn-next'>⏩</button>
          <audio id='song' src={currentSong.audio} ></audio>
        </div>
      </div>
    </>
  )
}

export default App
