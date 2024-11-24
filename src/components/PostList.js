import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc, increment, collection, onSnapshot } from 'firebase/firestore';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  const handleLike = async (postId) => {
    if (auth.currentUser) {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button className="like-button" onClick={() => handleLike(post.id)}>
            Like ({post.likes || 0})
          </button>
          <div className="comment-form">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
