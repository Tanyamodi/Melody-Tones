import './App.css';
import { useRef, useState } from 'react';

function App() {

  const [currentMusicDetails, setcurrentMusicDetails] = useState({
    songName: 'Te Amo',
    songArtist: 'Pritam',
    songSrc: './Assets/songs/te amo.mp3',
    songAvatar: './Assets/Images/mimage1.jpg'
  })
  //useStates variable
  const [audioProgress, setaudioProgress] = useState(0);
  const [IsAudioPlaying, setIsAudioPlaying] = useState(false)
  const [musicIndex, setmusicIndex] = useState(0);
  const [musicTotalLength, setmusicTotalLength] = useState('04 : 46');
  const [musicCurrentTime, setmusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setvideoIndex] = useState(0)

  const currentAudio = useRef()

  const handleMusicProgressBar = (e) => {
    // setaudioProgress(e.target.value);
    setaudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  //change Avatar Class
  let avatarClass = ['objectFitCover', 'objectFitContain', 'none']
  const [avatarClassIndex, setavatarClassIndex] = useState(0)
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setavatarClassIndex(0)
    }
    else {
      setavatarClassIndex(avatarClassIndex + 1)
    }
  }

  //Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }
    else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }

  const musicAPI = [
    {
      songName: 'Te Amo',
      songArtist: 'Pritam',
      songSrc: './Assets/songs/te amo.mp3',
      songAvatar: './Assets/Images/mimage1.jpg'
    },
    {
      songName: 'Adore You',
      songArtist: 'Prabh Gill',
      songSrc: './Assets/songs/adore you.mp3',
      songAvatar: './Assets/Images/mimage2.jpg'
    },
    {
      songName: 'Bade Ache Lagte Hai',
      songArtist: 'Amit Kumar',
      songSrc: './Assets/songs/bade ache lagte hai.mp3',
      songAvatar: './Assets/Images/mimage3.jpg'
    },
    {
      songName: 'Hass Hass',
      songArtist: 'Diljit Dosanjh',
      songSrc: './Assets/songs/hass hass.mp3',
      songAvatar: './Assets/Images/mimage4.jpg'
    },
    {
      songName: 'Ishq',
      songArtist: 'Amir ameer',
      songSrc: './Assets/songs/ishq likhu.mp3',
      songAvatar: './Assets/Images/mimage5.jpg'
    },
    {
      songName: 'Meri Jaan',
      songArtist: 'Neeti Mohan',
      songSrc: './Assets/songs/meri jaan.mp3',
      songAvatar: './Assets/Images/mimage6.jpg'
    },
    {
      songName: 'To The Stars',
      songArtist: 'Prophec',
      songSrc: './Assets/songs/to the stars.mp3',
      songAvatar: './Assets/Images/mimage7.jpg'
    }
  ]

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
    else {
      let setNumber = musicIndex + 1;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
    else {
      let setNumber = musicIndex - 1;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setcurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);

  }

  const handleAudioUpdate = () => {
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setmusicTotalLength(musicTotalLength0);

    //Input Music Current Time


    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setmusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setaudioProgress(isNaN(progress) ? 0 : progress)
  }

  const vidArray = ['./Assets/Videos/video6.mp4', './Assets/Videos/video4.mp4',
    './Assets/Videos/video3.mp4', './Assets/Videos/video2.mp4', './Assets/Videos/video1.mp4', './Assets/Videos/video5.mp4']

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setvideoIndex(0);
    }
    else {
      setvideoIndex(videoIndex + 1);
    }
  }

  return (
    <>
      <div className='container'>
        <audio src='./Assets/songs/te amo.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
        <video src={vidArray[videoIndex]} autoPlay muted loop
          className='backgroundVideo'></video>
        <div className='blackScreen'></div>
        <div className='music-container'>
          <p className='musicPlayer'>Music Player</p>
          <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
          <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
          <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'></img>
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLength">{musicTotalLength}</p>
          </div>

          <input type="range" name="musicProgressBar" className="musicProgressBar"
            value={audioProgress} onChange={handleMusicProgressBar} />
          <div className="musicControllers">
            <i className='fa-solid fa-backward musicControllers' onClick={handlePrevSong}> </i>
            <i className={`fa-solid ${IsAudioPlaying ? 'fa-pause-circle' : 'fa-play-circle'} playBtn`} onClick={handleAudioPlay}></i>
            <i className='fa-solid fa-forward musicControllers' onClick={handleNextSong}></i>
          </div>
          <div className='footer'>
            Created by Tanya Modi
          </div>
        </div>
        <div className='changeBackBtn' onClick={handleChangeBackground}>
          Change Background
        </div>

      </div >

    </>
  );
}

export default App;
