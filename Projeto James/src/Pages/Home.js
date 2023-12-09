import React, { useState, useEffect } from 'react';

function Ensalamento() {
  const [ensalamentos, setEnsalamentos] = useState([]);
  const [professorSelecionado, setprofessorSelecionado] = useState('');
  const [periodoSelecionado, setperiodoSelecionado] = useState('');
  const [cursoSelecionado, setcursoSelecionado] = useState('');
  const [salaSelecionado, setsalaSelecionado] = useState('');
  const [desafioSelecionado, setdesafioSelecionado] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [selecionaDia, setDiaDaSemana] = useState('');
  const [professores, setProfessores] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [desafios, setDesafios] = useState([]);
  const [salas, setSalas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedEnsalamentos = JSON.parse(localStorage.getItem('Ensalamentos')) || [];
    setEnsalamentos(storedEnsalamentos);

    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);

    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);

    const storedDesafios = JSON.parse(localStorage.getItem('Desafios')) || [];
    setDesafios(storedDesafios);

    const storedSalas = JSON.parse(localStorage.getItem('Salas')) || [];
    setSalas(storedSalas);

    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    setCursos(storedCursos);
  }, []);

  const adicionarEnsalamento = () => {
    if (
      professorSelecionado.trim() !== '' &&
      periodoSelecionado.trim() !== '' &&
      cursoSelecionado.trim() !== '' &&
      salaSelecionado.trim() !== '' &&
      desafioSelecionado.trim() !== '' &&
      horaInicial.trim() !== '' &&
      horaFinal.trim() !== '' &&
      selecionaDia.trim() !== ''
    ) {
      const novoEnsalamento = {
        id: editingIndex !== null ? ensalamentos[editingIndex].id : new Date().getTime(),
        professor: professorSelecionado,
        periodo: periodoSelecionado,
        curso: cursoSelecionado,
        sala: salaSelecionado,
        desafio: desafioSelecionado,
        horario: `${horaInicial} - ${horaFinal}`,
        dia: selecionaDia,
        diaDaSemana: selecionaDia, 
      };

      if (editingIndex !== null) {
        const updatedEnsalamentos = ensalamentos.map((ensalamento, index) =>
          index === editingIndex ? novoEnsalamento : ensalamento
        );
        setEnsalamentos(updatedEnsalamentos);
        localStorage.setItem('Ensalamentos', JSON.stringify(updatedEnsalamentos));
        setEditingIndex(null);
      } else {
        setEnsalamentos((prevEnsalamentos) => {
          const newEnsalamentos = [...prevEnsalamentos, novoEnsalamento];
          localStorage.setItem('Ensalamentos', JSON.stringify(newEnsalamentos));
          return newEnsalamentos;
        });
      }

      setprofessorSelecionado('');
      setperiodoSelecionado('');
      setcursoSelecionado('');
      setsalaSelecionado('');
      setdesafioSelecionado('');
      setHoraInicial('');
      setHoraFinal('');
      setDiaDaSemana('');
    }
  };

  const excluirEnsalamento = (id) => {
    const novoEnsalamento = ensalamentos.filter((ensalamento) => ensalamento.id !== id);
    setEnsalamentos(novoEnsalamento);
    localStorage.setItem('Ensalamentos', JSON.stringify(novoEnsalamento));
  };

  const editarEnsalamento = (index) => {
    const ensalamentoToEdit = ensalamentos[index];
    setEditingIndex(index);
    setprofessorSelecionado(ensalamentoToEdit.professor);
    setperiodoSelecionado(ensalamentoToEdit.periodo);
    setcursoSelecionado(ensalamentoToEdit.curso);
    setsalaSelecionado(ensalamentoToEdit.sala);
    setdesafioSelecionado(ensalamentoToEdit.desafio);
    const [horaInicio, horaFim] = ensalamentoToEdit.horario.split(' - ');
    setHoraInicial(horaInicio);
    setHoraFinal(horaFim);
    setDiaDaSemana(ensalamentoToEdit.dia);
  };

  return (
    <div>
      <div className="form-container">
        <h2>Selecione o Professor</h2>
        <select
          className='home-container'
          id="nomeSelectProfessor"
          value={professorSelecionado}
          onChange={(e) => setprofessorSelecionado(e.target.value)}
        >
          <option value="" disabled>
            Selecione um professor
          </option>
          {professores.map((professor, index) => (
            <option key={index} value={professor.nomeProfessor}>
              {professor.nomeProfessor}
            </option>
          ))}
        </select>

        <h2>Cadastro de Período</h2>
        <select className='home-container' id="periodo" value={periodoSelecionado} onChange={(e) => setperiodoSelecionado(e.target.value)}>
          <option value="" disabled>
            Selecione um período
          </option>
          {periodos.map((periodo, index) => (
            <option key={index} value={periodo.numeroPeriodo}>
              {periodo.numeroPeriodo}
            </option>
          ))}
        </select>

        <h2>Cadastro de Curso</h2>
        <select className='home-container' id="curso" value={cursoSelecionado} onChange={(e) => setcursoSelecionado(e.target.value)}>
          <option value="" disabled>
            Selecione um curso
          </option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso.nome}>
              {curso.nome}
            </option>
          ))}
        </select>

        <h2>Cadastro de Sala</h2>
        <select className='home-container' id="sala" value={salaSelecionado} onChange={(e) => setsalaSelecionado(e.target.value)}>
          <option value="" disabled>
            Selecione uma sala
          </option>
          {salas.map((sala, index) => (
            <option key={index} value={sala.numeroSala}>
              {sala.numeroSala}
            </option>
          ))}
        </select>

        <h2>Cadastro de Desafio</h2>
        <select className='home-container' id="desafio" value={desafioSelecionado} onChange={(e) => setdesafioSelecionado(e.target.value)}>
          <option value="" disabled>
            Selecione um desafio
          </option>
          {desafios.map((desafio, index) => (
            <option key={index} value={desafio.nomeDesafio}>
              {desafio.nomeDesafio}
            </option>
          ))}
        </select>

        <h2>Cadastro dia</h2>
        <select className='home-container' id="dia" value={selecionaDia} onChange={(e) => setDiaDaSemana(e.target.value)}>
          <option value="" disabled>
            Selecione o dia
          </option>
          <option value="domingo">Domingo</option>
          <option value="segunda-feira">Segunda-feira</option>
          <option value="terça-feira">Terça-feira</option>
          <option value="quarta-feira">Quarta-feira</option>
          <option value="quinta-feira">Quinta-feira</option>
          <option value="sexta-feira">Sexta-feira</option>
          <option value="sábado">Sábado</option>
        </select>

        <div>
          <label>Horário Inicial:</label>
          <label className='label-3'>Horário Final:</label>
          <input
            type="time"
            id="horaInicio"
            value={horaInicial}
            onChange={(e) => setHoraInicial(e.target.value)}
          />
          <input type="time" id="horaFim" value={horaFinal} onChange={(e) => setHoraFinal(e.target.value)} />
        </div>

        <button onClick={adicionarEnsalamento}>
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Ensalamentos</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Professor</th>
              <th>Período</th>
              <th>Curso</th>
              <th>Sala</th>
              <th>Desafio</th>
              <th>Horário</th>
              <th>Dia da semana</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ensalamentos.map((ensalamento) => (
              <tr key={ensalamento.id}>
                <td>{ensalamento.id}</td>
                <td>{ensalamento.professor}</td>
                <td>{ensalamento.periodo}</td>
                <td>{ensalamento.curso}</td>
                <td>{ensalamento.sala}</td>
                <td>{ensalamento.desafio}</td>
                <td>{ensalamento.horario}</td>
                <td>{ensalamento.dia}</td>
                <td>
                  <button className="excluir-btn" onClick={() => excluirEnsalamento(ensalamento.id)}>
                    Excluir
                  </button>
                  <button className="editar-btn" onClick={() => editarEnsalamento(ensalamentos.indexOf(ensalamento))}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ensalamento;
