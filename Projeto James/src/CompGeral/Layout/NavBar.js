import React from 'react';
import { Link } from 'react-router-dom';
import { BsCalendar } from 'react-icons/bs';
import logo from '../../imagens/logo.png';
import Container from './Container';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <Container>
        <Link to="/">
          <img className='logo' src={logo} alt='logo' />
        </Link>
        <ul className={styles.lista}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/cursos">Cadastro Cursos</Link></li>
          <li className={styles.item}><Link to="/Periodos">Cadastro Periodos</Link></li>
          <li className={styles.item}><Link to="/Professores">Cadastro Professores</Link></li>
          <li className={styles.item}><Link to="/Salas">Cadastro Salas</Link></li>
          <li className={styles.item}><Link to="/Materia">Cadastro Desafio</Link></li>
          <li className={styles.item}>
            <Link to="/Calendario">
              <BsCalendar className={styles.icon} />
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
