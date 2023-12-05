import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'; 
import Cadcursos from './Pages/CadCursos'
import CadDesafio from './Pages/CadDesafio';
import CadPeriodo from './Pages/CadPeriodo';
import CadProfessor from './Pages/CadProfessor';
import CadSala from './Pages/CadSala';
import Container from './CompGeral/Layout/Container';
import NavBar from './CompGeral/Layout/NavBar';
import Calendario from './Pages/Calendario';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
      <Container customClass='min-height'>
        <Route exact path="/" component={Home} />
        <Route path="/cursos" component={Cadcursos} />
        <Route path="/Periodos" component={CadPeriodo} />
        <Route path="/Professores" component={CadProfessor} />
        <Route path="/Salas" component={CadSala} />
        <Route path="/Materia" component={CadDesafio} />
        <Route path="/Calendario" component={Calendario} />

        </Container>
      </Switch>

    </Router>

  );
}

export default App;
