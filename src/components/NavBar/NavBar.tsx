import {Link} from 'react-router-dom';

import style from './NavBar.module.css';

const Navbar = () =>{
  return(
    <nav className={style.navbar}>
      <div className={style.container}>
        <Link className={style.navbarBrand} to='/register'>Registrarse</Link>
        <div className={style.navbarNav}>
          <ul className={style.navbarNavList}>
            <li className={style.navbarItem}><Link className={style.navbarLink} to='/posts'>Posts</Link></li>
            <li className={style.navbarItem}><Link className={style.navbarLink} to='/users'>Usuarios</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;