import { useState } from "react";
import {NAGATIVE, NEUTRAL, POSITIVE} from "../App.tsx";
import './MoodPopup.css'

type MoodPopupProps = {
  callback: (mood: string) => void;
  close: () => void;
}
const MoodPopup = ({callback, close}: MoodPopupProps) => {
  const [selectedMood, setSelectedMood] = useState("");

  function selectMood(mood: string) {

    console.log('---', `mood`, mood);
    setSelectedMood(mood);
    callback(mood);
    close()
  }

  const getMoodMessage = (mood: string) => {
    switch (mood) {
      case POSITIVE:
        return "Wow!! Good to know that you are happy 😄";
      case NAGATIVE:
        return "Don’t let setbacks bring you down – remember to cheer up and keep moving forward.";
      case NEUTRAL:
      default:
        return "Good! Stay relaxed. 😌";
    }
  };

  const moods = [
    { title: POSITIVE, text: "Happy", image: "/src/assets/happy.png" },
    { title: NAGATIVE, text: "Sad", image: "/src/assets/sad.png" },
    { title: NEUTRAL, text: "Relaxed", image: "/src/assets/relaxed.png" },
  ];

  return (
      <>
        <div className="MoodPopup-Overlay">
          <div className="MoodPopup-Card">
            <h2 className="MoodPopup-Title">How are you feeling today?</h2>
            <div className="MoodPopup-FlexBox">
              {moods.map((mood, idx) => (
                  <div
                      key={idx}
                      onClick={() => selectMood(mood.title)}
                      style={{ cursor: "pointer" }}
                  >
                    <div className="MoodPopup-Card--image">
                      <img src={mood.image} alt={mood.title} />
                    </div>
                    <p className="MoodPopup-Card--Image-Text">{mood.text}</p>
                  </div>
              ))}
            </div>
            <div className="Mood-Feedback">
              <p className="Mood-Feedback--Text">
                {selectedMood && getMoodMessage(selectedMood)}
              </p>
              <button
                  className="Mood-Feedback--Button"
                  onClick={() => selectMood(NEUTRAL)}
              >
                See all news
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default MoodPopup;
