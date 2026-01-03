
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAdCopy = async (productName: string, targetAudience: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a catchy, short social media ad caption for a product named "${productName}" targeting "${targetAudience}". Include 3 relevant hashtags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["caption", "hashtags"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating ad copy:", error);
    return { 
      caption: "Default catchy caption for " + productName, 
      hashtags: ["trending", "viral", productName.toLowerCase().replace(/\s/g, "")] 
    };
  }
};

export const getMonetizationInsights = async (earnings: number, views: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence optimization tip for a creator who earned $${earnings} from ${views} views this month. Focus on increasing RPM.`,
    });
    return response.text;
  } catch (error) {
    return "Keep posting consistent content to build your audience!";
  }
};
