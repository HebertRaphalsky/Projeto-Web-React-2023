import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function CadDesafio() {
  const [nomeDesafio, setNomeDesafio] = useState('');
  const [periodoSelecionado, setperiodoSelecionado] = useState('');
  const [ProfessorSelecionado, setProfessorSelecionado] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [desafios, setDesafios] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [editarindex, seteditarindex] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedDesafios = JSON.parse(localStorage.getItem('Desafios')) || [];
    setDesafios(storedDesafios);

    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);

    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const notifyProfessorAlreadySelected = () => {
    showNotification('danger', 'Este professor já está relacionado a outro desafio.');
  };

  const adicionarDesafio = () => {
    const professorJaSelecionado = desafios.some(
      (desafio) => desafio.professor === ProfessorSelecionado
    );

    if (
      nomeDesafio.trim() !== '' &&
      periodoSelecionado.trim() !== '' &&
      ProfessorSelecionado.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== '' &&
      !professorJaSelecionado
    ) {
      const novoDesafio = {
        nomeDesafio: nomeDesafio,
        periodo: periodoSelecionado,
        professor: ProfessorSelecionado,
        dataInicio: dataInicio,
        dataFim: dataFim,
      };

      if (editarindex !== null) {
        const updatedDesafios = desafios.map((desafio, index) =>
          index === editarindex ? novoDesafio : desafio
        );
        setDesafios(updatedDesafios);
        localStorage.setItem('Desafios', JSON.stringify(updatedDesafios));
        seteditarindex(null);
      } else {
        setDesafios((prevDesafios) => {
          const newDesafios = [...prevDesafios, novoDesafio];
          localStorage.setItem('Desafios', JSON.stringify(newDesafios));
          return newDesafios;
        });
      }

      setNomeDesafio('');
      setperiodoSelecionado('');
      setProfessorSelecionado('');
      setDataInicio('');
      setDataFim('');
    } else if (professorJaSelecionado) {
      notifyProfessorAlreadySelected();
    }
  };

  const excluirDesafio = (index) => {
    const novoDesafio = [...desafios];
    novoDesafio.splice(index, 1);
    setDesafios(novoDesafio);
    localStorage.setItem('Desafios', JSON.stringify(novoDesafio));
  };

  const editarDesafio = (index) => {
    const desafioToEdit = desafios[index];
    seteditarindex(index);
    setNomeDesafio(desafioToEdit.nomeDesafio);
    setperiodoSelecionado(desafioToEdit.periodo);
    setProfessorSelecionado(desafioToEdit.professor);
    setDataInicio(desafioToEdit.dataInicio);
    setDataFim(desafioToEdit.dataFim);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <input 
          type="text"
          id="nomeDesafio"
          placeholder="Nome da Matéria" 
          value={nomeDesafio} onChange={(e) => setNomeDesafio(e.target.value)}
        />
        <select 
          id="periodo" 
          value={periodoSelecionado} 
          onChange={(e) => setperiodoSelecionado(e.target.value)}
        >
          <option value="" disabled>
            Selecione um período
          </option>
          {periodos.map((periodo, index) => (
            <option key={index} value={periodo.numeroPeriodo}>
              {periodo.numeroPeriodo}
            </option>
          ))}
        </select>
        <div>
          <label>Data de Início:</label>
          <label className='label-2'>Data de Fim:</label>
        </div>
        <input 
          type="date" 
          id="dataIncio" 
          placeholder="Data Inicio" 
          value={dataInicio} 
          onChange={(e) => setDataInicio(e.target.value)} 
        />
        <input 
          type="date" 
          id="dataFim" 
          placeholder="Data Fim" 
          value={dataFim} 
          onChange={(e) => setDataFim(e.target.value)} 
        />
        <select 
          id="professor"
          value={ProfessorSelecionado} 
          onChange={(e) => setProfessorSelecionado(e.target.value)}
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
        <button onClick={adicionarDesafio}>{editarindex !== null ? 'Salvar Edição' : 'Adicionar'}</button>
      </div>
      <div className="table-container">
        <h2>Lista de Desafios</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Matéria</th>
              <th>Período</th>
              <th>Professor</th>
              <th>Data Inicio</th>
              <th>Data Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="corpoTabela">
            {desafios.map((desafio, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{desafio.nomeDesafio}</td>
                <td>{desafio.periodo}</td>
                <td>{desafio.professor}</td>
                <td>{desafio.dataInicio}</td>
                <td>{desafio.dataFim}</td>

                <td>
                 
                  <button className="excluir-btn" onClick={() => excluirDesafio(desafio.id)}>Excluir</button>
               
                  <button className="editar-btn" onClick={() => editarDesafio(desafio.id)}>Editar</button>
                  
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default CadDesafio;
