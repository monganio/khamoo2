import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Auth.css';


function SignUp({ handleCloseModal }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;


       
        return updateProfile(user, {
          displayName: username,
        }).then(() => {


          return setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email,
          });
        });
      })
      .then(() => {
        console.log('User signed up and username saved');
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error signing up:', error);
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
      <label>Username :</label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password :</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" onClick={signUp}>Sign up</button>
    </div>
  );
}

export default SignUp;