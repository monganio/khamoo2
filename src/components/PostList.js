import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment, collection, onSnapshot } from 'firebase/firestore';
import './PostList.css';

function PostList({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (postId) => {
    if (user) {
      try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          likes: increment(1),
        });
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <img
              src="https://via.placeholder.com/50" // รูปโปรไฟล์ที่แทนที่ (ควรเปลี่ยนเป็นรูปของผู้ใช้)
              alt="User Avatar"
              className="post-avatar"
            />
            <div className="post-username">{post.username || 'Unknown User'}</div> {/* ควรเปลี่ยนเป็นชื่อผู้ใช้จริง */}
          </div>
          <div className="post-content">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
          <div className="post-actions">
            <button className="like-button" onClick={() => handleLike(post.id)}>
              ❤️ {post.likes || 0}
            </button>
            <div className="comment-info">
              💬 {post.comments || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
