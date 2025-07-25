import React, { useState } from "react";
import axios from "axios";

const AIHelper = ({ type }) => {
  const [inputText, setInputText] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const getSuggestion = async () => {
    const res = await axios.post("http://localhost:5000/api/ai/suggestion", {
      type,
      inputText,
    });
    setSuggestion(res.data.suggestion);
  };

  return (
    <div className="my-6">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder={`Enter your ${type} here...`}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        onClick={getSuggestion}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get AI Suggestion
      </button>
      {suggestion && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded">
          <h3 className="font-semibold">AI Suggested {type}:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AIHelper;
