import React, { useState, useEffect } from 'react';

function CadastroPeriodo() {
  const [numeroPeriodo, setNumeroPeriodo] = useState('');
  const [semestreAno, setSemestreAno] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [turno, setTurno] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [isTurnoVisible, setIsTurnoVisible] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);

    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    setCursos(storedCursos);
  }, []);

  useEffect(() => {
    localStorage.setItem('periodos', JSON.stringify(periodos));
  }, [periodos]);

  const adicionarPeriodo = () => {
    if (
      numeroPeriodo.trim() !== '' &&
      semestreAno.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== '' &&
      selectedCurso.trim() !== '' &&
      turno.length > 0
    ) {
      const novoPeriodo = {
        id: new Date().getTime(),
        numeroPeriodo: numeroPeriodo,
        semestreAno: semestreAno,
        curso: selectedCurso,
        dataInicio: dataInicio,
        dataFim: dataFim,
        turno: turno,
      };

      if (editingIndex !== null) {
        // Editing existing period
        const updatedPeriodos = periodos.map((periodo, index) =>
          index === editingIndex ? novoPeriodo : periodo
        );
        setPeriodos(updatedPeriodos);
        localStorage.setItem('periodos', JSON.stringify(updatedPeriodos));
        setEditingIndex(null);
      } else {
        // Adding new period
        setPeriodos([...periodos, novoPeriodo]);
      }

      setNumeroPeriodo('');
      setSemestreAno('');
      setSelectedCurso('');
      setDataInicio('');
      setDataFim('');
      setTurno([]);
      setIsTurnoVisible(false);
    }
  };

  const toggleTurnoVisibility = () => {
    setIsTurnoVisible(!isTurnoVisible);
  };

  const excluirPeriodo = (id) => {
    const novosPeriodos = periodos.filter((periodo) => periodo.id !== id);
    setPeriodos(novosPeriodos);
    localStorage.setItem('periodos', JSON.stringify(novosPeriodos));
  };

  const editarPeriodo = (index) => {
    const periodoToEdit = periodos[index];
    setEditingIndex(index);
    setNumeroPeriodo(periodoToEdit.numeroPeriodo);
    setSemestreAno(periodoToEdit.semestreAno);
    setSelectedCurso(periodoToEdit.curso);
    setDataInicio(periodoToEdit.dataInicio);
    setDataFim(periodoToEdit.dataFim);
    setTurno(periodoToEdit.turno);
    setIsTurnoVisible(true);
  };

  return (
    <div>
      <div className="form-container">
        <h2>{editingIndex !== null ? 'Editar Período' : 'Adicionar Período'}</h2>
        <div>
          <input
            className='input'
            type="number"
            value={numeroPeriodo}
            onChange={(e) => setNumeroPeriodo(e.target.value)}
            placeholder="Número do Período"
          />
          <input
            type="text"
            value={semestreAno}
            onChange={(e) => setSemestreAno(e.target.value)}
            placeholder="Semestre/Ano do Período"
          />
        </div>
        <div>
          <label>Data de Início:</label>
          <label className='label-2'>Data de Fim:</label>
        </div>
        <input
          className='periodo-container'
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />

        <input
          className='periodo-container'
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />

        <select
          className='home-container'
          id="curso"
          value={selectedCurso}
          onChange={(e) => setSelectedCurso(e.target.value)}
        >
          <option value="" disabled>
            Selecione um curso
          </option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso.nome}>
              {curso.nome}
            </option>
          ))}
        </select>

        <button onClick={toggleTurnoVisibility}>
          {isTurnoVisible ? 'Esconder Turno' : 'Selecionar Turno'}
        </button>
        {isTurnoVisible && (
          <div>
            <select
              className="dropdown"
              multiple
              value={turno}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                setTurno(selectedOptions);
              }}
            >
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
            </select>
          </div>
        )}
        <button onClick={adicionarPeriodo}>
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Períodos</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número do Período</th>
              <th>Semestre/Ano</th>
              <th>Data de Início</th>
              <th>Data de Fim</th>
              <th>Curso</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {periodos.map((periodo, index) => (
              <tr key={index}>
                <td>{periodo.id}</td>
                <td>{periodo.numeroPeriodo}</td>
                <td>{periodo.semestreAno}</td>
                <td>{periodo.dataInicio}</td>
                <td>{periodo.dataFim}</td>
                <td>{periodo.curso}</td>
                <td>{periodo.turno.join(', ')}</td>
                <td>
                  <button className='editar-btn' onClick={() => editarPeriodo(index)}>
                    Editar
                  </button>
                  <button className='excluir-btn' onClick={() => excluirPeriodo(periodo.id)}>
                    Excluir
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

export default CadastroPeriodo;
