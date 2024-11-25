import './App.css';
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(''); // เพิ่มสถานะสำหรับเก็บ username
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        // ดึงข้อมูล username จาก Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        } else {
          setUsername('Unknown User');
        }
      } else {
        setUser(null);
        setUsername(''); // ล้างข้อมูล username เมื่อผู้ใช้ล็อกเอาต์
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  const handleToggleAuthForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">KHA M🐽APP</h1>
        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" />
              <span>{username}</span> {/* แสดง username ที่ดึงมา */}
            </div>
          ) : (
            <button onClick={handleLoginClick}>Log in / Sign Up</button>
          )}
        </div>
      </header>

      {showModal && (
        <div className="auth-modal">
          <div className="auth-content">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            {isLogin ? (
              <div>
                <Login handleCloseModal={handleCloseModal} />
                <p>Don’t have a Kha Moo account? <span onClick={handleToggleAuthForm} className="toggle-link">Sign up</span></p>
              </div>
            ) : (
              <div>
                <SignUp handleCloseModal={handleCloseModal} />
                <p>Already have an account? <span onClick={handleToggleAuthForm} className="toggle-link">Log in</span></p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-button">🔍</button>
      </div>

      <PostList user={user} />

      {user && (
        <>
          <button className="add-post-button">+</button>
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
