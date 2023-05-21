import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/tailwind.css";
import axios from "axios";

interface ChatInterfaceProps {
  suggestedTexts: string[];
  selectedTopic: string;
  toggleChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  suggestedTexts,
  selectedTopic,
  toggleChat,
}) => {
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //this function will send a request to the backend with the user's prompt/mess
  //handles both suggestion and user interaction
  const handleSendMessage = async () => {
    console.log("sending message");
    setIsLoading(true); // set loading state
    //setChatLog([...chatLog, message]);
    setChatLog([...chatLog, message, "Please wait..."]);
    try {
      const response = await axios.post("http://localhost:8000/ask-gpt", {
        question: message,
        topic: selectedTopic,
      });
      console.log("response from the fast api server", response);
      // Assuming the response from server is the AI response,
      // you can add it to your chat log like this:
      let modelRes = "Ans: " + response.data.response;
      //setChatLog((oldChatLog) => [...oldChatLog, modelRes]);
      setChatLog((oldChatLog) => [
        ...oldChatLog.slice(0, -1),
        response.data.response,
      ]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false); // reset loading state
    setMessage("");
  };

  const handleSendSugPrompt = async (prompt: string) => {
    console.log("sending prompt");
    setIsLoading(true); // set loading state
    prompt = "Q: " + prompt;
    //setChatLog([...chatLog, prompt]);
    setChatLog([...chatLog, prompt, "Please wait..."]);
    try {
      //setChatLog([...chatLog, sugPrompt]);
      const response = await axios.post("http://localhost:8000/ask-gpt", {
        question: prompt,
        topic: selectedTopic,
      });
      console.log("response from the fast api server", response);
      // Assuming the response from server is the AI response,
      // you can add it to your chat log like this:
      let modelRes = "Ans: " + response.data.response;
      //setChatLog((oldChatLog) => [...oldChatLog, response.data.response]);
      //setChatLog((oldChatLog) => [...oldChatLog, modelRes]);
      setChatLog((oldChatLog) => [...oldChatLog.slice(0, -1), modelRes]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false); // reset loading state
    //setSugPrompt("");
  };

  return (
    <div
      // className="flex h-full p-8 justify-center items-center bg-gray-900 bg-opacity-75 overflow-y-auto"
      style={{
        width: "70%",
      }}
      className="flex justify-center items-center  bg-opacity-75 overflow-y-auto"
    >
      {/* Container */}
      <div className="flex w-3/4 h-4/5 bg-white p-8 rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar for suggested texts */}
        <div className="w-1/2 bg-blue-200 p-4 overflow-y-auto">
          <h2 className="font-bold text-xl mb-4 text-black">
            Suggested Topics:
          </h2>
          <ul>
            {suggestedTexts.map((text, index) => (
              <li key={index} className="mb-2">
                <button
                  className="text-left w-full text-white bg-blue-500 hover:bg-blue-700 rounded p-2"
                  onClick={() => {
                    //handleSuggestedTextClick(text);
                    //setSugPrompt(text);
                    //setChatLog([...chatLog, sugPrompt]);
                    handleSendSugPrompt(text);
                  }}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Main chat area */}
        <div className="flex flex-col w-3/4 bg-gray-100">
          <div className="mb-4 flex justify-start">
            <button
              onClick={toggleChat}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-4 mt-2 rounded mb-4 justify-left "
            >
              Back
            </button>
          </div>
          <h2 className="font-bold text-xl mb-4">Ask Away</h2>
          <div className="h-72 flex-grow bg-gray-100 p-4 overflow-y-auto">
            <ul>
              {chatLog.map((entry, index) => (
                <li key={index} className="mb-2">
                  <div className="bg-blue-200 rounded p-2">{entry}</div>
                </li>
              ))}
            </ul>
          </div>
          {/* Chat input area */}
          <div className="p-4 bg-gray-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
