import React, { useState, useEffect } from 'react';

function Ensalamento() {
  const [ensalamentos, setEnsalamentos] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedDesafio, setSelectedDesafio] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [selectDia, setDiaDaSemana] = useState('');
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
      selectedProfessor.trim() !== '' &&
      selectedPeriodo.trim() !== '' &&
      selectedCurso.trim() !== '' &&
      selectedSala.trim() !== '' &&
      selectedDesafio.trim() !== '' &&
      horaInicial.trim() !== '' &&
      horaFinal.trim() !== '' &&
      selectDia.trim() !== ''
    ) {
      const novoEnsalamento = {
        id: editingIndex !== null ? ensalamentos[editingIndex].id : new Date().getTime(),
        professor: selectedProfessor,
        periodo: selectedPeriodo,
        curso: selectedCurso,
        sala: selectedSala,
        desafio: selectedDesafio,
        horario: `${horaInicial} - ${horaFinal}`,
        dia: selectDia,
        diaDaSemana: selectDia, // Adiciona a propriedade diaDaSemana
      };

      if (editingIndex !== null) {
        // Editing existing ensalamento
        const updatedEnsalamentos = ensalamentos.map((ensalamento, index) =>
          index === editingIndex ? novoEnsalamento : ensalamento
        );
        setEnsalamentos(updatedEnsalamentos);
        localStorage.setItem('Ensalamentos', JSON.stringify(updatedEnsalamentos));
        setEditingIndex(null);
      } else {
        // Adding new ensalamento
        setEnsalamentos((prevEnsalamentos) => {
          const newEnsalamentos = [...prevEnsalamentos, novoEnsalamento];
          localStorage.setItem('Ensalamentos', JSON.stringify(newEnsalamentos));
          return newEnsalamentos;
        });
      }

      // Limpar os estados após adicionar/editar
      setSelectedProfessor('');
      setSelectedPeriodo('');
      setSelectedCurso('');
      setSelectedSala('');
      setSelectedDesafio('');
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
    setSelectedProfessor(ensalamentoToEdit.professor);
    setSelectedPeriodo(ensalamentoToEdit.periodo);
    setSelectedCurso(ensalamentoToEdit.curso);
    setSelectedSala(ensalamentoToEdit.sala);
    setSelectedDesafio(ensalamentoToEdit.desafio);
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
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
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
        <select className='home-container' id="periodo" value={selectedPeriodo} onChange={(e) => setSelectedPeriodo(e.target.value)}>
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
        <select className='home-container' id="curso" value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
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
        <select className='home-container' id="sala" value={selectedSala} onChange={(e) => setSelectedSala(e.target.value)}>
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
        <select className='home-container' id="desafio" value={selectedDesafio} onChange={(e) => setSelectedDesafio(e.target.value)}>
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
        <select className='home-container' id="dia" value={selectDia} onChange={(e) => setDiaDaSemana(e.target.value)}>
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
