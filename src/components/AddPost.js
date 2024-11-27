import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function AddPost({ user, onSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    if (title && content) {
      try {
        await addDoc(collection(db, 'posts'), {
          title: title,
          content: content,
          username: user.displayName || 'Unknown User',
          uid: user.uid,
          createdAt: Timestamp.now(),
          likes: 0,
          comments: 0,
        });
        setTitle('');
        setContent('');
        console.log('Post added successfully');
        onSuccess(); // เรียกใช้งานฟังก์ชันเมื่อโพสต์สำเร็จ
      } catch (error) {
        console.error('Error adding post:', error);
        alert('Failed to add post. Please try again.');
      }
    } else {
      alert('Title and content are required');
    }
  };

  return (
    <div className="form-container">
      <label>Topic :</label>
      <input
        type="text"
        placeholder="Topic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Content :</label>
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="auth-button" onClick={handleAddPost}>Post</button>
    </div>
  );
}

export default AddPost;
