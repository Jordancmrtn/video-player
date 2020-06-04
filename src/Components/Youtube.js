import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './Youtube.css';

export default function Youtube(){

  const [historic, sethistoric] = useState ([])
  let historicDelete = [...historic]

  // Change the url with the onChange methode.
  const [url, setUrl] = useState('');
  const[button, setButton] = useState(true);
  const[sound, setSound] = useState(true);
  const[progress, setProgress] = useState(0);
  const [urlSubmitted, setUrSubmitted] = useState('');


  //Set the URL with the url given
  let handleUrl = (event) => {
    setUrl(event.target.value)
  }

  //Push into the historic array the url of the video
  let handleUrlSubmitted = (event) => {
    event.preventDefault()
    setUrSubmitted(url)
    historic.push(url)
  }

  //Increases the volume
  let [volume, setVolume] = useState(0.5)
  let handleVolumeUp = () =>{
    setVolume(volume += 0.1)
  }

  //Reduce the volume
  let handleVolumeDown = () =>{
    setVolume(volume -= 0.1)
  }

  //Played or Paused the video and change text on the button
  let [play, setPlay] = useState(false)
  let handlePlay = () =>{
    setPlay(!play)
    setButton(!button)
  }

  //Muted the sound and change text on the button
  let [muted, setMuted] = useState(false)
  let handleMuted = () =>{
    setMuted(!muted)
    setSound(!sound)
  }

  //Clear the historic 
  let handleClearHistoric = () => {
    historicDelete.splice(0, historicDelete.length)
    sethistoric(historicDelete)
  }

  //Recap the video advance
  let handleProgress = (data) =>{
    setProgress(data.played.toFixed(4)*100)
  }


  return(
    <>
    <div className="container">
      <div className="playerButton">
        <h1>MUSIC PLAYER</h1>
        <p>Put the Youtube URL of your favorite music !</p>
        <div className="inputButton">
        <input className="input" type="text" onChange={handleUrl} />
        <button id="buttonSend" onClick={handleUrlSubmitted}>Send</button>
        </div>
        <div className="containerVideo">
          <ReactPlayer
          className = "player"
          url= {urlSubmitted} 
          volume= {volume} 
          playing= {play} 
          muted= {muted}
          onProgress={handleProgress}
          config={{
            youtube: {
              playerVars: { showinfo: 1}
            }
          }}
          />
        </div>
        <div className = "progressBar">
          <div className = "progress" style ={{width: progress + "%"}}></div>
         </div>

        <div className="buttons">
          <button onClick={handlePlay}> {button ? 'Play' : 'Pause'} </button>
          <button onClick={handleVolumeUp}> + </button>
          <button onClick={handleVolumeDown}> - </button>
          <button onClick={handleMuted}> {sound ? 'Sound Off' : 'Sound On'} </button>
        </div>
      </div>
      <div className="historic">
        <h1>Historic</h1>
        <button onClick={handleClearHistoric} id="clearHistoric"> Clear historic </button>
        {historic.map(element => {
          return (
            <ReactPlayer
            className= "miniPlayer"
            url= {element}
            youtubeConfig={{ playerVars: { showinfo: 1 } }}
            />
          )
        })}
      </div>
    </div>
    </>
  )
}
