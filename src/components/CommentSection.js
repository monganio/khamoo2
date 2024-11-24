import React, { useState } from 'react';
import { db, auth } from '../firebase';

function CommentSection({ postId }) {
  const [comment, setComment] = useState('');

  const addComment = () => {
    if (auth.currentUser) {
      db.collection('posts').doc(postId).collection('comments').add({
        text: comment,
        userId: auth.currentUser.uid,
      });
      setComment('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={addComment}>Comment</button>
    </div>
  );
}

export default CommentSection;