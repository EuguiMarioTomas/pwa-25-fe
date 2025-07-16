import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from '../pages/Users/RegisterPage/RegisterPage';
import UsersPage from '../pages/Users/Users/UsersPage';
import PostsPage from '../pages/Posts/Posts/PostsPage';
import CreatePostPage from '../pages/Posts/CreatePost/CreatePostPage';
import EditPostPage from '../pages/Posts/EditPosts/EditPostPage';

import Navbar from '../components/NavBar/NavBar';

function Router(){
    return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<RegisterPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/createPost' element={<CreatePostPage />} />
        <Route path='/posts/editPost/:id' element={<EditPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;