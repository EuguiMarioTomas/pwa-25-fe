import { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

import style from './EditPostPage.module.css';
import button from '../../../components/Button/Button.module.css';

const EditPostPage = () =>{
  const {id} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () =>{
      try{
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
      }catch(error){
        console.error('Error al obtener el post:', error);
      }
    };
    fetchPost();
  },[id]);

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    try{
      await axios.put(`http://localhost:5000/posts/${id}`, {title, content});
      navigate('/posts');
    }catch(error){
      console.error('Error al actualizar el post:', error);
    }
  };

  return(
    <div className='container'>
      <h1>Editar Post</h1>
      <form onSubmit = {handleSubmit} className={style.formEditPost}>
        <div>
          <label htmlFor='title' className={style.title}>Titulo</label>
          <input id='title' className={style.formControl} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='content' className={style.formLabel}>Contenido</label>
          <textarea id='content' className={style.formControl} rows={5} value={content} onChange={(e)=> setContent(e.target.value)} required />
        </div>
        <button type='submit' className={button.btn}>Actualizar Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;
