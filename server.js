import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pdf from "html-pdf"
import dotenv from "dotenv";;
import OpenAI from "openai";
import ejs from "ejs";
import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});


// ====== PDF Resume Generator Route ======
app.post('/generate-pdf', (req, res) => {
  const data = req.body;

  // Render EJS with form data
  ejs.renderFile(path.join(__dirname, 'templates', 'resume.ejs'), { data }, (err, html) => {
    if (err) {
      console.error('Render Error:', err);
      return res.status(500).send('Error rendering PDF');
    }

    // Convert HTML to PDF
    pdf.create(html).toStream((err, stream) => {
      if (err) {
        console.error('PDF Error:', err);
        return res.status(500).send('Error generating PDF');
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      stream.pipe(res);
    });
  });
});

// ====== AI Suggestion Endpoint ======
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Load from .env
});

app.post("/api/suggestions", async (req, res) => {
  const { name, summary, education, skills } = req.body;

  const prompt = `Based on the following details, generate smart suggestions to improve the resume:
  Name: ${name}
  Summary: ${summary}
  Education: ${education.map(
    (e) => `${e.degree} from ${e.institute} in ${e.year}`
  ).join(", ")}
  Skills: ${skills}`;

  try {
    const aiRes = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = aiRes.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (err) {
    console.error("AI Suggestion Error:", err.message);
    res.status(500).send("Error generating suggestion");
  }
});

// ====== Start Server ======
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
