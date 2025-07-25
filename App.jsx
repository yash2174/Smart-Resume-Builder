import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleExportPDF = async () => {
    const payload = {
      name,
      email,
      phone,
      linkedin,
      summary,
      education,
      skills,
    };

    try {
      const res = await fetch("http://localhost:5000/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "resume.pdf";
      link.click();
    } catch (err) {
      console.error("PDF Error:", err);
    }
  };

  const handleAISuggestion = async () => {
    const payload = {
      name,
      summary,
      education: [
        {
          degree: education, // simple format for now
          institute: "Your Institute",
          year: "Your Year",
        },
      ],
      skills,
    };

    try {
      const res = await fetch("http://localhost:5000/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (err) {
      console.error("AI Error:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Smart Resume Builder
        </h1>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded w-full"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="p-3 border rounded w-full"
          />
        </div>

        <textarea
          placeholder="Professional Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="mt-4 w-full p-3 border rounded"
        />

        <textarea
          placeholder="Education (e.g., B.Tech in CSE, XYZ University, 2026)"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="mt-4 w-full p-3 border rounded"
        />

        <textarea
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-4 w-full p-3 border rounded"
        />

        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={handleExportPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export PDF
          </button>
          <button
            onClick={handleAISuggestion}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Get AI Suggestions
          </button>
        </div>

        {/* AI Suggestions Display */}
        {suggestion && (
          <div className="mt-6 p-4 bg-yellow-100 rounded border border-yellow-300">
            <h3 className="font-semibold text-yellow-800">AI Suggestions:</h3>
            <p className="text-yellow-700 whitespace-pre-wrap">{suggestion}</p>
          </div>
        )}

        {/* Live Preview */}
        <div
          id="resume-preview"
          className="mt-10 border border-gray-300 p-6 bg-gray-50 rounded-md"
        >
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mb-2">
            {email} | {phone} | {linkedin}
          </p>

          <section className="mb-4">
            <h3 className="text-lg font-semibold text-blue-600">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-semibold text-blue-600">Education</h3>
            <p className="text-gray-700 whitespace-pre-line">{education}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-blue-600">Skills</h3>
            <ul className="list-disc list-inside text-gray-700">
              {skills.split(",").map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}



