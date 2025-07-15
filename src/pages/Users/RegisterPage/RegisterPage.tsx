import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import axios from 'axios'

import styles from './RegisterForm.module.css';
import button from '../../../components/Button/Button.module.css'

type RegisterFormInput ={
  name: string;
  email: string;
  lastName: string;
};

const registerValidationSchema = Joi.object<RegisterFormInput>({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'El nombre de usuario es obligatorio',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
    'string.max': 'El nombre de usuario no puede tener más de 30 caracteres',
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'El apellido es obligatoria',
    'string.min': 'El apellido debe tener al menos 3 caracteres',
    'string.max': 'El apellido no puede tener más de 30 caracteres',
  }),
  email: Joi.string().email({tlds:{allow: false}}).required().messages({
    'string.empty': 'El correo electrónico es obligatorio',
    'string.email': 'El formato del correo electrónico debe ser válido',
  }),
});

const RegisterForm = () =>{
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInput>({
    resolver: joiResolver(registerValidationSchema)
  });
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormInput) => {    
    try {
      const res = await axios.post('http://localhost:5000/users/createUser', data);
      localStorage.setItem('userId', res.data.data._id); 
      localStorage.setItem('userName', data.name);
      localStorage.setItem('lastName', data.lastName);
      localStorage.setItem('userEmail', data.email);
      console.log('Registro exitoso:', res.data);
      navigate('/posts'); 
    }catch(error){
      console.error('Error al registrar:', error);
    }
  };
  return(
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input {...register('name')} placeholder="Nombre de usuario" className={styles.textInput}/>
          {errors.name && <span>{errors.name.message}</span>}

          <input {...register('lastName')} placeholder="Apellido" className={styles.textInput}/>
          {errors.lastName && <span>{errors.lastName.message}</span>}

          <input {...register('email')} placeholder="Correo electrónico" type='email' className={styles.textInput}/>
          {errors.email && <span>{errors.email.message}</span>}


          <button type="submit" className={button.btn}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;