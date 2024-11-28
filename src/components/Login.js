import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';


function Login({ handleCloseModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
       
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        alert(error.message);
      });
  };


  return (
    <div className="form-container">
      <label>Email :</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password :</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" onClick={logIn}>Log in</button>
    </div>
  );
}

export default Login;
