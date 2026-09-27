import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

const chat = ai.chats.create({
  model: "gemini-3.8-flash",
});

export async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    console.log("GEMINI RESPONSE:", response);
    return response.text;
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
console.log("API KEY EXISTS:", !!apiKey);
console.log("API KEY:", apiKey);

  return response.text;
}