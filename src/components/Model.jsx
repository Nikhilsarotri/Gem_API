import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
    try {
  
      const result = await model.generateContent(prompt);
  
      if (result && result.response && result.response.text) {
        console.log("result",result)
        return result?.response?.text()
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error generating content:', err);
      throw err; //
    }
  };