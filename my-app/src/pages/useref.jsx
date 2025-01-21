import React, { useRef, useState } from 'react';

const Form = () => {
  // ref variables
  const nameRef = useRef('');
  const emailRef = useRef('');
  const messageRef = useRef('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    console.log('Submitted data:', { name, email, message });

    
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
    setSubmitted(true);
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Name</label>
          <input type="text" ref={nameRef} className="input" />
        </div>

        <div className="form-group">
          <label className="label">Email</label>
          <input type="text" ref={emailRef} className="input" />
        </div>

        <div className="form-group">
          <label className="label">Message</label>
          <textarea ref={messageRef} className="textarea" />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
        {submitted && <p className="success-message">Form submitted successfully!</p>}
      </form>

      <style jsx>{`
        .form-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Form and input field styling */
        .form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          color: #555;
          margin-bottom: 8px;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }

        .input:focus,
        .textarea:focus {
          border-color: #4caf50;
          outline: none;
        }

        .submit-btn {
          padding: 12px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .success-message {
          margin-top: 20px;
          padding: 10px;
          background-color: #e8f5e9;
          border: 1px solid #4caf50;
          border-radius: 4px;
          color: #4caf50;
        }
      `}</style>
    </div>
  );
};

export default Form;
