import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import style from '../CreatePost/CreatePostPage.module.css'
import button from '../../../components/Button/Button.module.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const userId = localStorage.getItem('userId');
      if(!userId) {
        alert('Usuario no autenticado');
        return;
      }
      const res = await axios.post('http://localhost:5000/posts/createPost', {title, content, authorId: userId,});
      console.log('Post creado exitosamente:', res.data);
      navigate('/posts');
    }catch(error){
      console.error('Error al crear el post:', error);
    }
  };
  return(
    <div className='container'>
      <h1>Crear Nuevo Post</h1>
      <form onSubmit={handleSubmit} className={style.formCreatePost}>
        <div>
          <label htmlFor='title' className={style.title}>Titulo</label>
          <input type='text' id='title' className={style.formControl} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='content' className={style.formLabel}>Contenido</label>
          <textarea id='content' className={style.formControl} rows={5} value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type='submit' className={button.btn}>Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;