import { useState } from "react";

const MoodPopup = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const getMoodMessage = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "Wow!! Good to know that you are happy 😄";
      case "Sad":
        return "Ohh no, you are unhappy 😢";
      case "Irritated":
        return "Why are you irritated? 😠";
      case "Tired":
        return "Have a coffee, it will make you feel better. 😴";
      case "Relaxed":
        return "Good! Stay relaxed. 😌";
      default:
        return ""; 
    }
  };

  const moods = [
    { title: "Happy", image: "/src/assets/happy.jpeg" },
    { title: "Sad", image: "/src/assets/irritated.jpg" },
    { title: "Irritated", image: "/src/assets/irritated.jpg" },
    { title: "Tired", image: "/src/assets/irritated.jpg" },
    { title: "Relaxed", image: "/src/assets/irritated.jpg" },
  ];

  return (
    <>
      <div className="MoodPopup-Card" style={{ backgroundColor: "#d60a58" }}>
        <h2 className="MoodPopup-Title">How are you feeling today?</h2>
        <div className="MoodPopup-FlexBox">
          {moods.map((mood, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMood(mood.title)}
              style={{ cursor: "pointer" }}
            >
              <div className="MoodPopup-Card--image">
                <img src={mood.image} alt={mood.title} />
              </div>
              <p className="MoodPopup-Card--Image-Text">{mood.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="Mood-Feedback">
        <p className="Mood-Feedback--Text">{selectedMood && getMoodMessage(selectedMood)}</p>
        <button
          className="Mood-Feedback--Button"
          onClick={() => {
            if (selectedMood) {
              window.location.href = `${window.location.pathname}?mood=${encodeURIComponent(selectedMood)}`;
            } else {
              alert("Please select a mood first!");
            }
          }}
        >
          Let me know your Mood!!
        </button>
      </div>
    </>
  );
};

export default MoodPopup;
