/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Firebase';

import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const Responses = () => {
  const [allResponses, setAllResponses] = useState([]);

  useEffect(() => {
    // Fetch responses from the database for all users
    getResponses();
  }, []);

  const getResponses = async () => {
    const responseRef = collection(db, 'responses');
    const querySnapshot = await getDocs(responseRef);
    const allData = querySnapshot.docs.map((doc) => doc.data());
    setAllResponses(allData);
  };

  const handleDeleteResponse = async (userId) => {
    try {
      const responseRef = doc(db, 'responses', userId);
      await deleteDoc(responseRef);
      // Remove the deleted response from the displayed responses
      setAllResponses((responses) => responses.filter((response) => response.userId !== userId));
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All User Survey Responses</h1>
      {allResponses.length > 0 ? (
        allResponses.map((userResponse, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-xl font-bold">User Info</h2>
            <p><strong>Name:</strong> {userResponse.userName}</p>
            <p><strong>Email:</strong> {userResponse.userEmail}</p>
            <h2 className="text-xl font-bold">Survey Responses</h2>
            {userResponse.responses.map((response, i) => (
              <div key={i} className="mt-2">
                <p><strong>Question:</strong> {response.question}</p>
                <p><strong>Response:</strong> {response.response}</p>
              </div>
            ))}
            <button
              onClick={() => handleDeleteResponse(userResponse.userId)}
              className="bg-red-500 text-black font-bold py-2 px-4 rounded mt-4 hover:bg-red-700"
            >
              Delete Response
            </button>
          </div>
        ))
      ) : (
        <p>No survey responses found for any user.</p>
      )}
    </div>
  );
};

export default Responses;
