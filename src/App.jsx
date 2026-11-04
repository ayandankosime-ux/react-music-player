import { useState, useEffect, useRef } from 'react';
import { songs } from './data/songs';
import formatTime from './utils/formatTime';
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [duration, setDuration] = useState(0);
  const [playTime, setPlayTime] = useState('0:00');

  
  const audioRef = useRef(null);
  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

  }, [isPlaying, currentIndex]);

  function handlePlayBtn() {
    setIsPlaying(prev => !prev);
  }

  function handlePreviousBtn() {
    if (currentIndex === 0) {
      return setCurrentIndex(songs.length - 1);
    };

    setCurrentIndex(count => count -= 1);
    setIsPlaying(true);
    
  }

  function handleNextBtn() {
    if (currentIndex === songs.length - 1) {
      return setCurrentIndex(0);

    };

    setCurrentIndex(count => count += 1);
    setIsPlaying(true);
  }

  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  function handleTimeUpdate(event) {
    setPlayTime(audioRef.current.currentTime);
  }

  function handleProgressBarInput(event) {
    const sliderInput = event.target.value;
    audioRef.current.currentTime = sliderInput;
    setPlayTime(String(sliderInput));
    
  }

  ;

  return (
    <>
      <div className="app-container">
      {/* Artwork Section */}
      <div className="artwork-container">
        <img src={currentSong.img} alt={`${currentSong.name} cover`} />
      </div>

      {/* Song Info */}
      <div className="info-container">
        <h3 className="song-name">{currentSong.name}</h3>
        <p className="artist-name">{currentSong.artist}</p>
      </div>

      {/* Progress Bar & Time Stamps */}
      <div className="progress-container">
        <input
          className="progress-bar" 
          id='progressBar' 
          type="range"  
          min='0' 
          max={duration}
          value={playTime}
          onInput={handleProgressBarInput} 
         />
        <div className="time-stamps">
          <span>{!playTime ? '0: 00' : formatTime(playTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="controls-container">
        {/* Previous Button */}
        <button 
          className="btn btn-previous" 
          onClick={handlePreviousBtn} 
          aria-label="Previous Track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button 
          className="btn btn-play" 
          onClick={handlePlayBtn} 
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            /* Pause Icon */
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            /* Play Icon */
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next Button */}
        <button 
          className="btn btn-next" 
          onClick={handleNextBtn} 
          aria-label="Next Track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
    </>
  )
}

export default App

