import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () =>{
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    try{
      const response = await axios.post('/users',{
        userName,
        email,
        password
      })
      const user = response.data

      localStorage.setItem('user', JSON.stringify({
        id:user._id,
        userName: user.userName,
        email: user.email,
        role: user.role
      }))
      navigate('/posts')
    }catch(error){
      console.error('Error en el registro:', error)
      alert('Registro fallido. Verifica los datos.')
    }
  }
  return(
    <div className='container mt-5'>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div className='mb-3'>
          <label htmlFor='userName' className='form-label'>Nombre de Usuario</label>
          <input type='text' className='form-control' id='userName' required value={userName} onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className='form-control' id='email' required value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Contraseña</label>
          <input type='password' className='form-control' id='password' required value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button type='submit' className='btn btn-primary'>Registrarse</button>
      </form>
    </div>
  )
}

export default Register