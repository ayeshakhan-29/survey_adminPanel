/* eslint-disable */
import React, { useState } from 'react';

function WelcomeNote() {
  const [showWelcomeNote, setShowWelcomeNote] = useState(true);

  const handleEnable = () => {
    setShowWelcomeNote(true);
  };

  const handleDisable = () => {
    setShowWelcomeNote(false);
  };

  return (
    <div>
      <h1 className='text-black'>Welcome Note</h1>
      <div>
        <button onClick={handleEnable}>Enable Welcome Note</button>
        <button onClick={handleDisable}>Disable Welcome Note</button>
      </div>
      {showWelcomeNote && (
        <div className="welcome-note">
          <h2>Welcome to our website!</h2>
          <p className='text-sky-400'>Thank you for visiting our site. We're glad you're here.</p>
        </div>
      )}
    </div>
  );
}

export default WelcomeNote;
