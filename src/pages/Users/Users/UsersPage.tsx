import { useEffect, useState } from "react";
import axios from "axios";

import styles from './UsersPage.module.css';
import button from '../../../components/Button/Button.module.css';

type User ={
  _id: string;
  name: string;
  lastName: string;
  email: string;
  isActive: boolean;
};

const UsersPage = () =>{
  const [users, setUserts] = useState<User[]>([]);

  const fetchUsers = async () =>{
    try{
      const res = await axios.get('http://localhost:5000/users/getUsers');
      setUserts(res.data.data);
    }catch(error){
      console.error('Error al obtener usuarios:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUser = async (userId: string, isActive: boolean) => {
    try{
      if(isActive){
      await axios.delete(`http://localhost:5000/users/${userId}`);
      }else{
        await axios.patch(`http://localhost:5000/users/${userId}/activate`);
      }
      fetchUsers();
    }catch(error){
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  return(
    <div className='container'>
      <h1>Usuarios</h1>
      <div className={styles.usersInfo}>
        {users.map((user)=>(
          <div key={user._id} className={styles.usersCard}>
            <h2 className={styles.cardTitle}>{user.name} {user.lastName}</h2>
            <p className={styles.cardText}><strong>Email:</strong> {user.email}</p>
            <p className={styles.cardText}><strong>Estado:</strong> {user.isActive ? 'Activo' : 'Inactivo'}</p>
            <div className={styles.cardFooter}>
              <button className={button.btn} onClick={() => handleToggleUser(user._id, user.isActive)}>
                {user.isActive ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;