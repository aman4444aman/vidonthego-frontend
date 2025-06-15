import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import NarrationControls from '../components/NarrationControls';
import SummaryPopup from '../components/SummaryPopup';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'react-h5-audio-player/lib/styles.css';
import './Playback.css';

function Playback({ videoUrl, mode, setMode }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [narrationStyle, setNarrationStyle] = useState('neutral');
  const [voiceType, setVoiceType] = useState('male');
  const [isVoiceOn, setIsVoiceOn] = useState(false);

  const chapters = [
    { title: 'Intro Scene', time: 0, emotion: 'Calm', summary: 'In the beginning, we meet the characters and establish the peaceful setting.' },
    { title: 'Conflict Begins', time: 45, emotion: 'Tense', summary: 'An unexpected event disrupts the calm and sets the story in motion.' },
    { title: 'Climax', time: 120, emotion: 'Dramatic', summary: 'The most intense moment where the characters face their biggest challenge.' },
    { title: 'Resolution', time: 180, emotion: 'Hopeful', summary: 'The conflict resolves and the story concludes on a thoughtful note.' },
  ];

  const audioSources = {
    narrated: 'narrated-audio.mp3',
    podcast: 'podcast-audio.mp3',
  };

  const commands = [
    {
      command: 'play',
      callback: () => {
        const video = document.querySelector('video');
        if (video) video.play();
      },
    },
    {
      command: 'pause',
      callback: () => {
        const video = document.querySelector('video');
        if (video) video.pause();
      },
    },
    {
      command: 'replay chapter *',
      callback: (chapterName) => {
        const match = chapters.find(c => c.title.toLowerCase().includes(chapterName.toLowerCase()));
        if (match) {
          const video = document.querySelector('video');
          if (video) video.currentTime = match.time;
        }
      },
    },
  ];

  const { transcript, listening } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (mode === 'original' && isVoiceOn) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }

    return () => SpeechRecognition.stopListening();
  }, [mode, isVoiceOn]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const jumpToChapter = (time) => {
    const video = document.querySelector('video');
    if (video) video.currentTime = time;
  };

  return (
    <div className="playback-container">
      <NarrationControls
        mode={mode}
        setMode={setMode}
        narrationStyle={narrationStyle}
        setNarrationStyle={setNarrationStyle}
        voiceType={voiceType}
        setVoiceType={setVoiceType}
      />

      {mode === 'original' && (
        <>
          <video controls className="playback-video">
            <source src={videoUrl} type="video/mp4" />
          </video>

          <div className="voice-toggle-container">
            <button
              className={`voice-toggle ${isVoiceOn ? 'active' : ''}`}
              onClick={() => setIsVoiceOn(prev => !prev)}
            >
              {isVoiceOn ? 'Listening' : 'Start Voice'}
            </button>

            <div className="voice-status">
              {listening ? 'Mic is On' : 'Mic is Off'}
            </div>

            <div className="voice-transcript">"{transcript}"</div>
          </div>
        </>
      )}

      {mode === 'narrated' && (
        <>
          <AudioPlayer
            src={audioSources[mode]}
            autoPlay={false}
            controls
            style={{ marginTop: '1rem' }}
          />
          <div className="chapter-list">
            {chapters.map((chapter, index) => (
              <button key={index} onClick={() => jumpToChapter(chapter.time)}>
                {chapter.title}
              </button>
            ))}
          </div>
        </>
      )}

      {mode === 'podcast' && (
        <>
          <h2 className="podcast-heading">Podcast Summary</h2>
          <AudioPlayer
            src={audioSources[mode]}
            autoPlay={false}
            controls
            style={{ marginTop: '1rem' }}
          />
          <div className="podcast-episodes">
            {chapters.map((chapter, index) => (
              <div key={index} className="episode-block">
                <p className="episode-summary">{chapter.summary}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedChapter && (
        <SummaryPopup chapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
      )}
    </div>
  );
}

export default Playback;
