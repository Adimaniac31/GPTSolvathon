import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title: title,
      content: content,
    };

    try {
      await axios.post('/saveData', articleData);
      alert("Article saved successfully!");
    } catch (error) {
      console.error("There was an error saving the article!", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-light">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark">Create a New Article</h1>

        <FormInput
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
        />

        <FormInput
          id="content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter article content"
          type="textarea"
          rows="5"
        />

        <SubmitButton text="Save Article" />
      </form>
    </div>
  );
};

export default ArticleForm;
