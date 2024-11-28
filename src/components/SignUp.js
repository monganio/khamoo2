import React, { useState } from 'react';
<<<<<<< HEAD
import { auth, db } from '../firebase';
=======
import { auth, db } from '../firebase'; // นำเข้าจาก firebase.js
>>>>>>> 1f55c05825ad3b6cce29a3de2663cfa9d018855b
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Auth.css';

<<<<<<< HEAD

=======
>>>>>>> 1f55c05825ad3b6cce29a3de2663cfa9d018855b
function SignUp({ handleCloseModal }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

<<<<<<< HEAD

       
        return updateProfile(user, {
          displayName: username,
        }).then(() => {


=======
        // อัปเดต displayName ของผู้ใช้
        return updateProfile(user, {
          displayName: username,
        }).then(() => {
          // บันทึกชื่อผู้ใช้ลงใน Firestore
>>>>>>> 1f55c05825ad3b6cce29a3de2663cfa9d018855b
          return setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email,
          });
        });
      })
      .then(() => {
        console.log('User signed up and username saved');
<<<<<<< HEAD
        handleCloseModal();
=======
        handleCloseModal(); // ปิดหน้าต่างโมดอลหลังจากสมัครสมาชิกสำเร็จ
>>>>>>> 1f55c05825ad3b6cce29a3de2663cfa9d018855b
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
