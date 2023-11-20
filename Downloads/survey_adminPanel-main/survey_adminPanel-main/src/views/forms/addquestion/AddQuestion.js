/* eslint-disable */
import React, { useState } from 'react';
import {  addDoc, collection, doc, getDocs, setDoc  } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase'; // Import your Firebase initialization
import './AddQuestion.css';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState('');

  const handleAddOption = () => {
    setOptions([...options, optionInput]);
    setOptionInput('');
  };

  const handleAddQuestion = async () => {
    try {
      const questionsCollection = collection(db, 'questions');
      const newQuestion = {
        text: question,
        options: options,
      };
      await addDoc(questionsCollection, newQuestion);

      setQuestion('');
      setOptions([]);
      setOptionInput('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="question-form">
      <h2>Add a Question</h2>
      <label>
        Question Text:
        <input
          type="text"
          className="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>
      <ul className="question-options">
        {options.map((option, index) => (
          <li key={index} className="question-option">
            {option}
          </li>
        ))}
      </ul>
      <label>
        Option Text:
        <input
          type="text"
          className="option-input"
          value={optionInput}
          onChange={(e) => setOptionInput(e.target.value)}
        />
      </label>
      <div className="button-container">
        <button className="add-option-button" onClick={handleAddOption}>
          Add Option
        </button>
        <div className="button-space"></div>
        <button className="add-question-button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;