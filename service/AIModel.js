import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_STRAPI_AI_MODEL_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIchatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "Title: full stack developer , Depends on job title give me summery for my resume within 4-5 lines in JSON format with field  experience Level and Summery with Experience level for Fresher, Mid-Level, Experience"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"job_title\": \"Full Stack Developer\",\n  \"summaries\": {\n    \"Fresher\": {\n      \"experience_level\": \"Fresher\",\n      \"summary\": \"Highly motivated and eager to learn Full Stack Developer seeking entry-level position. Proficient in HTML, CSS, JavaScript and eager to expand knowledge in backend technologies. Strong problem-solving skills and a passion for creating user-friendly web applications.\"\n    },\n    \"Mid-Level\": {\n      \"experience_level\": \"Mid-Level\",\n      \"summary\": \"Experienced Full Stack Developer with 3+ years of experience in building robust web applications. Skilled in both front-end and back-end development, proficient in languages like React, Node.js, and SQL. Proven ability to work independently and collaborate effectively in agile teams.\"\n    },\n    \"Experienced\": {\n      \"experience_level\": \"Experienced\",\n      \"summary\": \"Seasoned Full Stack Developer with 5+ years of experience in designing, developing, and deploying complex web applications. Expertise in modern frameworks like React, Angular, and Node.js. Strong leadership skills and a proven track record of delivering high-quality software solutions.\"\n    }\n  }\n}\n``` \n"},
      ],
    },
  ],
});
