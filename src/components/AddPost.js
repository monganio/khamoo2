import React, { useState } from 'react';
import { db, auth } from '../firebase';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addPost = () => {
    if (auth.currentUser) {
      db.collection('posts').add({
        title,
        content,
        userId: auth.currentUser.uid,
      });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}

export default AddPost;