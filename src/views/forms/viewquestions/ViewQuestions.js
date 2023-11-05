/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import "./ViewQuestions.css"

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [updatedOptions, setUpdatedOptions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getAllDocuments = async () => {
    const collectionRef = collection(db, 'questions');

    try {
      const querySnapshot = await getDocs(collectionRef);
      const documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch questions on component load
    getAllDocuments().then((documents) => {
      setQuestions(documents);
    });
  }, []);

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);

    setUpdatedQuestion(questionToEdit.data.text);
    setUpdatedOptions(questionToEdit.data.options);
    setEditingId(id);
    setEditMode(true);
  };

  const handleSaveQuestion = async () => {
    try {
      const questionRef = doc(db, 'questions', editingId);
      const newQuestionData = {
        text: updatedQuestion,
        options: updatedOptions,
      };

      await updateDoc(questionRef, newQuestionData);

      // Refresh the questions to reflect the update
      const updatedQuestions = questions.map((q) => {
        if (q.id === editingId) {
          return {
            id: q.id,
            data: newQuestionData,
          };
        }
        return q;
      });

      setQuestions(updatedQuestions);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const questionRef = doc(db, 'questions', questionId);
      await deleteDoc(questionRef);

      // Refresh the questions to reflect the deletion
      const updatedQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="questions-container">
      <h1>Questions</h1>
      {questions?.map((question, index) => (
        <div
          key={index}
          className={`question ${index % 2 === 0 ? 'light-gray' : 'white'}`}
        >
          <h3 className="question-text">{question.data.text}</h3>
          <ul>
          {question?.data?.options?.map((option, optionIndex) => (       
          <li key={optionIndex}>{option}</li>
          ))}
          </ul>
          {editMode && editingId === question.id ? (
            <div >
              <div className='updated-container'>
              <input
                type="text"
                placeholder="Updated Question Text"
                value={updatedQuestion}
                onChange={(e) => setUpdatedQuestion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Updated Options (comma-separated)"
                value={updatedOptions.join(',')}
                onChange={(e) => setUpdatedOptions(e.target.value.split(','))}
              />
              </div>
              <div className='button-row'>
              <button className='save-button' onClick={handleSaveQuestion}>Save</button>
              </div>
            </div>
          ) : (
            <div className="button-row">
              <button className="edit-button" onClick={() => handleEditQuestion(question.id)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteQuestion(question.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewQuestions;