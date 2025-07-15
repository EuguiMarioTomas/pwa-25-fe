import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import styles from './PostsPage.module.css';
import button from '../../../components/Button/Button.module.css';

type Post ={
  _id: string;
  title: string;
  content: string;
  author:{
    name: string;
    email: string;
  };
  likes:{
    name: string;
    email: string;
  }[];
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      try{
        const res = await axios.get('http://localhost:5000/posts/getPosts');
        console.log('Posts obtenidos:', res.data);
        setPosts(res.data.data);
      }catch(error){
        console.error('Error al obtener posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    const userId = localStorage.getItem('userId');
    if(!userId) {
      console.error('Debes registrarte para dar me gusta a un post');
      return;
    }
    try{
      await axios.patch(`http://localhost:5000/posts/${postId}/like`, {userId});

      const res = await axios.get('http://localhost:5000/posts/getPosts');
      setPosts(res.data.data);
    }catch(error){
      console.error('Error al dar me gusta al post:', error);
    }
  };
  const handleDislike = async(postId: string)=>{
    const userId = localStorage.getItem('userId');
    if(!userId) {
      console.error('Debes registrarte para quitar me gusta a un post');
      return;
    }try{
      await axios.patch(`http://localhost:5000/posts/${postId}/unlike`, {userId});

      const res = await axios.get('http://localhost:5000/posts/getPosts');
      setPosts(res.data.data);
    }catch(error){
      console.error('Error al quitar me gusta al post:', error);
    }
  };
  
  return(
    <div className={styles.container}>
      <h1>Posts</h1>

      <div className={styles.crearPost}>
        <Link to='/posts/createPost' className={button.btn}>Crear Post</Link>
      </div>

      <div className={styles.postsInfo}>
        {posts.map((post)=>(
          <div key={post._id}>

            <div className={styles.postCard}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardText}>{post.content.slice(0,100)}</p>
              <p className={styles.cardAuthor}>Autor: {post.author.name}{' '}({post.author.email})</p>
              <p className={styles.cardLikes}>Likes: {post.likes.length}</p>

              <div className={styles.cardButtons}>
                <Link to={`/posts/editPost/${post._id}`} className={button.btn}>Editar Post</Link>
                <button className={button.btn} onClick={() => handleLike(post._id)}>Me Gusta</button>
                <button className={button.btn} onClick={()=> handleDislike(post._id)}>No me Gusta</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;