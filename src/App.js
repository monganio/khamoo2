import './App.css';
import PostList from './components/PostList';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddPost from './components/AddPost';

function App() {
  return (
    <div className="App">
      <h1>kha m🐽app</h1>
      <SignUp />
      <Login />
      <AddPost />
      <PostList />
    </div>
  );
}

export default App;
