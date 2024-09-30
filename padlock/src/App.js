import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importing custom CSS for any additional styling

function App() {
  const [password, setPassword] = useState(''); // State to hold the password

  // Function to handle password generation API call
  const generatePassword = async () => {
    try {
      console.log("Calling API...");
      const response = await axios.post('http://localhost:8000/password'); // Replace <domain> with your API domain
      setPassword(response.data.password); // Assuming API returns { password: 'generatedPassword' }
      console.log('Password generated:', response.data.password);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="App-header flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        {/* Label for password */}
        <div className="password-label text-white" style={{ fontSize: '16px' }}>
          Your Password: 
          {/* Display password in an input box */}
          <input 
            type="text" 
            value={password} 
            readOnly 
            className="password-input" 
            style={{ fontSize: '16px' }} 
            placeholder="************" 
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
        <div className="spacer" />

        {/* Generate password button */}
        <button 
          className="generate-btn mt-4 font-bold py-2 px-4 rounded"
          onClick={generatePassword}
          style={{ fontSize: '12px' }} 
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
