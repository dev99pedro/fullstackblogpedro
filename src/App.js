import logo from './logo.svg';
import './App.css';
import Register from './components/RegisterLogin/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/RegisterLogin/Login';
import Main from './components/Main/Main';
import PostPage from './components/PostPage/PostPage';
import Navbar from './components/Navbar/Navbar';
import UserPage from './components/UserPage/UserPage';
import { ContextProvider } from './Context/Context';
import CreatePost from './components/CreatePost/CreatePost';
function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/userpage/:username" element={<UserPage></UserPage>}></Route>
          <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
          <Route path="/createpost" element={<CreatePost></CreatePost>}></Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>

  );
}

export default App;
