import React, { useState } from "react";
import { generateContent } from "./Model";

const Getresponse = () => {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isListening, setIsListening] = useState(false); 
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleGeneratedText = async () => {
    try {
      if (!input || input.trim() === "") {
        throw new Error("Please enter a valid text prompt.");
      }
  
    
      const result = await generateContent(input.toString());
      setGeneratedText(result);
    } catch (err) {
      console.error("Failed to generate content:", err.message);
    }
  };



  



  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

      const beepSound = new Audio("/beepon.mp3"); 
      beepSound.play().catch((err) => console.error("Beep sound error:", err))
      setIsListening((prevState) => !prevState);
      
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);  
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition stopped.");
    };
  };





  



  return (
    <div className="h-full mt-5 p-5">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-6">
        Hi This is Gen-Ai
      </h1>
  
      {/* Input Section */}
      <div className="relative w-full md:w-3/4 mx-auto">
        {/* Textarea */}
        <textarea
          className="text-black w-full p-4 pr-20 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Ask me what you want..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGeneratedText();
          }}
          onChange={handleInput}
        ></textarea>
  
        {/* Mic Button */}
        <button
  id="mic-button"
  onClick={handleSpeechToText}
  className={`absolute right-20 mr-10 bottom-6 p-3 rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 h-[40px] w-[40px] flex justify-center items-center shadow-lg hover:scale-110 transition-all duration-200 ease-in-out transform ${isListening ? "animate-pulse" : ""}`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"  // Adjusted size
    height="20" // Adjusted size
  >
    <path d="M12 1C9.8 1 8 2.8 8 5V11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11V5C16 2.8 14.2 1 12 1Z" />
    <path d="M12 15V22" />
    <path d="M8 18C8 19.1 8.9 20 10 20H14C15.1 20 16 19.1 16 18" />
  </svg>
</button>



        {/* Send Button */}
        <button
          className="absolute right-4 bottom-6 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 h-10 px-6 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          onClick={handleGeneratedText}
        >
          Send
        </button>
      </div>
  
      {/* Response Section */}
      {generatedText && (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Response:
          </h2>
          <div className="text-gray-700 leading-relaxed">
            {generatedText.split("\n").map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}  

export default Getresponse;
