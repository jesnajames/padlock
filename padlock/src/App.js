import React, { useState } from 'react';
import './App.css';
import { Snackbar, Button } from '@mui/material';

function App() {
  const [password, setPassword] = useState('');
  const [plaintext, setPlainText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const adjectives = [
    "Brave", "Curious", "Dynamic", "Loyal", "Friendly", 
    "Gentle", "Happy", "Thrifty", "Joyful", "Kind", 
    "Lively", "Majestic", "Nimble", "Mindful", "Patient", 
    "Quirky", "Radiant", "Steady", "Trusty", "Upbeat", 
    "Vibrant", "Wise", "Zesty", "Playful", "Graceful",
    "Generous", "Creative", "Ambitious", "Busy", "Calm", 
    "Courageous", "Elegant", "Calm", "Honest", "Imaginative", 
    "Motivated", "Jovial", "Persistent", "Polite", "Roving", 
    "Sincere", "Thoughtful", "Valiant", "Warm", "Adventurous", 
    "Daring", "Gifted", "Spirited", "Luminous", "Flying",
  ];

  const nouns = [
    "Penguin", "Nomad", "Wizard", "Otter", "Wolf", 
    "Bear", "Tiger", "Dragon", "Eagle", "Hawk", 
    "Dolphin", "Cheetah", "Panther", "Phoenix", "Falcon", 
    "Elephant", "Lion", "Raven", "Mouse", "Whale", 
    "Sparrow", "Owl", "Badger", "Lynx", "Raccoon", 
    "Koala", "Chimp", "Panda", "Shark", "Leopard", 
    "Parrot", "Cobra", "Swan", "Explorer", "Gazelle", 
    "Moose", "Bison", "Crane", "Squirrel", "Giraffe", 
    "Llama", "Zebra", "Ostrich", "Antelope", "Rabbit", 
    "Hippo", "Soldier", "Guardian", "Jaguar"
  ];

  const crypt_mapper = {
    "a": "@", 
    "e": "3", 
    "i": "!", 
    "l": "1",
    "o": "0", 
    "s": "$",
    "x": "*",
    "z": "2",
    "B": "8",
    "E": "3",
    "H": "#", 
    "S": "$", 
    "Z": "2",
  };

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8 && password.length <= 20,
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password)
    };
  
    return validations;
  };

  // Function to generate a secure password
  const generatePassword = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    let plaintext_password = randomAdjective + randomNoun;
    console.log('Plaintext Password:', plaintext_password);

    let secure_password = '';
    for (let char of plaintext_password) {
      secure_password += crypt_mapper[char] || char;
    }

    console.log('Secure Password:', secure_password);
    setPlainText(plaintext_password);
    setPassword(secure_password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setSnackbarOpen(true); // Open the snackbar when password is copied
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="App-header flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white font-bold">Padlock: Password Generator</h1>
        <p className="text-white">Generate secure and memorable passwords</p>
      </div>

      <div className="text-center center-container">
        <div className="password-label text-white mt-4" style={{ fontSize: '16px' }}>
          Your Password: 
          <input 
            type="text" 
            value={password} 
            onChange={handlePasswordChange}
            className="password-input" 
            style={{ fontSize: '16px' }} 
            placeholder="************" 
            title={`Pro tip: Think ${plaintext}`}
          />
          <button className="copy-btn" onClick={copyToClipboard}>
            <img 
              src="/clipboard-3-xxl.png" 
              alt="Copy to Clipboard" 
              className="h-6 w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
              width={5}
              height={24}
            />
          </button>
        </div>

        {/* Spacer for vertical alignment */}
        <div className="spacer" style={{ height: '40' }} />

        {/* Generate password button */}
        <button 
          className="generate-btn mt-4 font-bold py-2 px-4 rounded"
          onClick={generatePassword}
          style={{ fontSize: '12px' }} 
        >
          Generate Password
        </button>

        {/* Fixed height spacer for checklist */}
        <div className="checklist-spacer" style={{ height: password ? '0' : '105px' }} />

        {/* Password checklist */}
        {password && (
          <div className="password-checklist" style={{ color: 'white', fontSize: '12px', marginTop: '10px' }}>
            <>
              <div>
                <input type="checkbox" checked={validatePassword(password).length} readOnly />
                Length between 8-20 characters
              </div>
              <div>
                <input type="checkbox" checked={validatePassword(password).hasLowerCase} readOnly />
                At least one lowercase letter
              </div>
              <div>
                <input type="checkbox" checked={validatePassword(password).hasUpperCase} readOnly />
                At least one uppercase letter
              </div>
              <div>
                <input type="checkbox" checked={validatePassword(password).hasSpecialChar} readOnly />
                At least one special character
              </div>
              <div>
                <input type="checkbox" checked={validatePassword(password).hasNumber} readOnly />
                At least one number
              </div>
            </>
          </div>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Copied to clipboard!"
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            X
          </Button>
        }
        autoHideDuration={800}
      />
    </div>
  );
}

export default App;
