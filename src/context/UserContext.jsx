import React, { createContext } from "react";
import { run } from "../gemini";
import { useState } from "react";

export const dataContext = createContext();

const UserContext = ({ children }) => {

  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [gemresponse, setgemResponse] = useState(false);

  function speak(text) {

  let utterance = new SpeechSynthesisUtterance(text);

  utterance.volume = 1;
  utterance.rate = 2.6;
  utterance.pitch = 1;
  utterance.lang = "en-GB";

  utterance.onend = () => {
    setSpeaking(false);
  };

  speechSynthesis.speak(utterance);
}

  async function aiResponse(prompt) {

    try {

      let text = await run(prompt);

      let newText = text
        .replaceAll("**", "")
        .replaceAll("*", "")
        .replaceAll("google", "Pari Bindal")
        .replaceAll("Google", "Pari Bindal");
        let words = newText.split(/\s+/);

      if (words.length > 50) {
            newText = words.slice(0, 50).join(" ") + "...";
          }

      setPrompt(newText);

      speak(newText);

      setgemResponse(true);

    } catch (error) {

      console.log("Gemini Error:", error);

      speak("Sorry, I am having trouble connecting right now.");

      setSpeaking(false);
    }
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new speechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (e) => {

    let currentIndex = e.resultIndex;

    let transcript =
      e.results[currentIndex][0].transcript;

    setPrompt(transcript);

    takeCommand(transcript.toLowerCase());
  };


  function takeCommand(command) {
    console.log("COMMAND:", command);
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank");
      speak("Opening YouTube");
      setPrompt("Opening YouTube");
    }else{
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    gemresponse,
    setgemResponse
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;