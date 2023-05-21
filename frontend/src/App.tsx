import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatInterface from "./components/ChatInterface"; // your ChatInterface component
import "./styles/tailwind.css";
import "./styles/pulse.css";
import "./styles/transitions.css";
import "./App.css";
import backgroundPic from "./assets/ruralbg.jpg";

type Topic = "science" | "history" | "math" | "literature";

const suggestedTexts = {
  science: [
    "Explain the theory of evolution.",
    "What is photosynthesis and why is it important?",
    "Describe the structure of a cell.",
    "Explain how vaccines work.",
    "What are the laws of thermodynamics?",
    "Describe the structure and properties of water.",
  ],
  history: [
    "Describe the impact of World War II.",
    "Who was Martin Luther King Jr. and what did he contribute to society?",
    "Discuss the significance of the French Revolution.",
    "How did the Industrial Revolution change society?",
    "What was the Cold War and how did it shape international relations?",
    "Discuss the significance of the Civil Rights Movement in the United States.",
  ],
  math: [
    "Explain Pythagoras' theorem.",
    "Describe the quadratic formula and when to use it.",
    "What are logarithms and how are they used?",
    "Explain the concept of derivatives in calculus.",
    "Describe the different types of graphs in algebra.",
    "Discuss the principles of probability.",
  ],
  literature: [
    "Describe the main themes in Shakespeare's 'Macbeth'.",
    "Discuss symbolism in 'To Kill a Mockingbird'.",
    "Explain the significance of the title in 'Pride and Prejudice'.",
    "Who are the main characters in 'Moby Dick' and what do they represent?",
    "Describe the narrative style used in 'Catch-22'.",
    "What is the central conflict in '1984' by George Orwell?",
  ],
};

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [selectedTopicSuggestions, setSelectedTopicSuggestions] = useState<
    string[]
  >([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [showChat, setShowChat] = useState(false);

  const handleButtonClick = (topic: Topic) => {
    setSelectedTopicSuggestions(suggestedTexts[topic]);
    setSelectedTopic(topic);
    setShowChat(true);
  };

  const handleToggleViewChat = () => {
    //accessed by the searchFilter component
    //console.log("activeSearch from Home.tsx", activeSearch);
    setShowChat(!showChat);
    //setResumeData(null);
  };
  return (
    <div className="transition-wrapper backdrop-blur-sm">
      {!visible && <div className="transition-background-entry"></div>}
      <div className={`transition-content ${visible ? "visible" : ""}`}></div>
      {/* <div>
        <ThreeScene />
      </div> */}
      <div
        className="min-h-screen flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundPic})`,
        }}
      >
        {showChat ? (
          <ChatInterface
            suggestedTexts={selectedTopicSuggestions}
            selectedTopic={selectedTopic}
            toggleChat={handleToggleViewChat}
          />
        ) : (
          <div className="bg-gray-900 p-8 bg-opacity-75 rounded-lg shadow-md w-full max-w-2xl mx-auto border-2 border-gray-700 mt-4">
            <h2 className="text-3xl font-semibold mb-20 mt-12 text-center text-white">
              Select a Topic
            </h2>

            <div>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <button
                  className="w-full h-48 flex items-center justify-center opacity-80 hover:opacity-90 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-md hover:from-green-600 text-xl hover:to-blue-600 transition-all"
                  onClick={() => handleButtonClick("science")}
                >
                  Science
                </button>
                <button
                  className="w-full h-48 flex items-center justify-center opacity-80 hover:opacity-90 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg shadow-md hover:from-yellow-600 hover:to-red-600 text-xl transition-all"
                  onClick={() => handleButtonClick("history")}
                >
                  History
                </button>
                <button
                  className="w-full h-48 flex items-center justify-center opacity-80 hover:opacity-90 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 text-xl transition-all"
                  onClick={() => handleButtonClick("math")}
                >
                  Math
                </button>
                <button
                  className="w-full h-48 flex items-center justify-center opacity-80 hover:opacity-90 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-md hover:from-pink-600 hover:to-red-600 text-xl transition-all"
                  onClick={() => handleButtonClick("literature")}
                >
                  Literature
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
