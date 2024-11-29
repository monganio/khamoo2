import './App.css';
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddPost from './components/AddPost';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUsername(user.displayName || 'Unknown User');
      } else {
        setUser(null);
        setUsername('');
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
    const modal = document.querySelector('.auth-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
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


  const handleAddPostSuccess = () => {
    setShowAddPost(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };


  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">KHA M🐽APP</h1>
        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" />
              <span>{username}</span> {/* แสดงชื่อผู้ใช้ */}
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


      <PostList user={user} />


      {user && (
        <>
          <button className="add-post-button" onClick={() => setShowAddPost(true)}>+</button>
          {showAddPost && (
            <div className="add-post-modal">
              <div className="add-post-content">
                <button className="close-button" onClick={() => setShowAddPost(false)}>X</button>
                <AddPost user={user} onSuccess={handleAddPostSuccess} />
              </div>
            </div>
          )}
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </>
      )}


      {showSuccessPopup && (
        <div className="success-popup">
          <p>Post added successfully!</p>
        </div>
      )}
    </div>
  );
}


export default App;
