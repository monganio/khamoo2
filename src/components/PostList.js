import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment, collection, onSnapshot, deleteDoc, addDoc, orderBy, query } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import './PostList.css';
import './Auth.css';


function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isCommenting, setIsCommenting] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState({});
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(postsQuery, async (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
 
      const commentsPromises = postsData.map(async (post) => {
        const commentsSnapshot = await getDocs(collection(db, 'posts', post.id, 'comments'));
        return {
          postId: post.id,
          comments: commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        };
      });
 
      const commentsArray = await Promise.all(commentsPromises);
      const commentsData = {};
      commentsArray.forEach(({ postId, comments }) => {
        commentsData[postId] = comments;
      });
      setComments(commentsData);
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
    } else {
      alert('You need to be logged in to like a post.');
    }
  };


  const handleEdit = (post) => {
    setIsEditing(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };


  const handleSaveEdit = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        title: editTitle,
        content: editContent,
      });
      setIsEditing(null);
      console.log('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  const handleDelete = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleComment = async (postId) => {
    if (user) {
      if (commentContent.trim()) {
        try {
          const postRef = collection(db, 'posts', postId, 'comments');
          await addDoc(postRef, {
            content: commentContent,
            username: user.displayName || 'Unknown User',
            createdAt: new Date(),
          });


          setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), { content: commentContent, username: user.displayName || 'Unknown User' }],
          }));


          setCommentContent('');
          setIsCommenting(null);
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
    } else {
      alert('You need to be logged in to comment.');
    }
  };


  return (
    <div className="post-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">🔍</button>
      </div>
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card">
          {isEditing === post.id ? (
            <div className="form-container">
              <label>Topic :</label>
              <input
                type="text"
                placeholder="Topic"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label>Content :</label>
              <textarea
                placeholder="Content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button className="auth-button" onClick={() => handleSaveEdit(post.id)}>Save</button>
              <button className="auth-button" onClick={() => setIsEditing(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <div className="post-header">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                  className="post-avatar"
                />
                <span className="post-username">{post.username}</span>
              </div>
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="post-actions">
                <button className="like-button" onClick={() => handleLike(post.id)} disabled={!user}>
                  ❤️ {post.likes || 0}
                </button>
                <div className={`comment-info ${!user ? 'disabled' : ''}`} onClick={() => user && setIsCommenting(post.id)}>
                  💬 {comments[post.id] ? comments[post.id].length : 0}
                </div>
                {user && user.uid === post.uid && (
                  <div className="edit-delete-buttons">
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                )}
              </div>
             
              {comments[post.id] && (
                <div className="comments-section">
                  {comments[post.id].map((comment, index) => (
                    <div key={index} className="comment">
                      <strong>{comment.username}:</strong> {comment.content}
                    </div>
                  ))}
                </div>
              )}


              {isCommenting === post.id && user && (
                <div className="form-container">
                  <label>Comment :</label>
                  <textarea
                    placeholder="Write your comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                  <button className="auth-button" onClick={() => handleComment(post.id)}>Submit</button>
                  <button className="auth-button" onClick={() => setIsCommenting(null)}>Cancel</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export default PostList;
