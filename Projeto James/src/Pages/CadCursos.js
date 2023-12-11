import React, { useState, useEffect } from 'react';
import '../CompGeral/Layout/forma.css';

const CadastroCurso = () => {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [nomeCoordenador, setNomeCoordenador] = useState('');
  const [cursos, setCursos] = useState([]);
  const [dataFim, setDataFim] = useState('');
  const [editarId, seteditarId] = useState(null);

  useEffect(() => {
    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    setCursos(storedCursos);
  }, []);

  const adicionarCurso = () => {
    if (nome.trim() !== '' && dataInicio && nomeCoordenador.trim() !== '' && dataFim.trim() !== '') {
      const newCurso = {
        id: editarId || new Date().getTime(),
        nome: nome,
        dataInicio: dataInicio,
        dataFim: dataFim,
        nomeCoordenador: nomeCoordenador,
      };

      if (editarId) {
        const updatedCursos = cursos.map((curso) => (curso.id === editarId ? newCurso : curso));
        setCursos(updatedCursos);
        localStorage.setItem('cursos', JSON.stringify(updatedCursos));
        seteditarId(null);
      } else {
        setCursos((prevCursos) => [...prevCursos, newCurso]);
        localStorage.setItem('cursos', JSON.stringify([...cursos, newCurso]));
      }

      setNome('');
      setDataInicio('');
      setDataFim('');
      setNomeCoordenador('');
    }
  };

  const editarCurso = (id) => {
    const cursoToEdit = cursos.find((curso) => curso.id === id);
    seteditarId(id);
    setNome(cursoToEdit.nome);
    setDataInicio(cursoToEdit.dataInicio);
    setDataFim(cursoToEdit.dataFim);
    setNomeCoordenador(cursoToEdit.nomeCoordenador);
  };

  const excluirCurso = (id) => {
    const updatedCursos = cursos.filter((curso) => curso.id !== id);
    setCursos(updatedCursos);
    localStorage.setItem('cursos', JSON.stringify(updatedCursos));
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h2>Adicionar Cursos</h2>
        <div>
          <input
            type="text"
            id="nomeCurso"
            placeholder="Nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            id="nomeCoordenador"
            placeholder="Nome do Coordenador do curso"
            value={nomeCoordenador}
            onChange={(e) => setNomeCoordenador(e.target.value)}
          />
          <div>
            <label>Data Inicial:</label>
            <label className='label-2'>Data Final</label>
          </div>
          <input
            
            type="date"
            id="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input
            type="date"
            id="dataFim"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
          <button onClick={adicionarCurso}>{editarId ? 'Salvar Edição' : 'Adicionar'}</button>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Cursos</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Curso</th>
              <th>Nome do Coordenador do Curso</th>
              <th>Data de Início do Curso</th>
              <th>Data de Fim do Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="corpoTabela">
            {cursos.map((curso, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{curso.nome}</td>
                <td>{curso.nomeCoordenador}</td>
                <td>{curso.dataInicio}</td>
                <td>{curso.dataFim}</td>
                <td>
                 
                  <button className="excluir-btn" onClick={() => excluirCurso(curso.id)}>Excluir</button>
               
                  <button className="editar-btn" onClick={() => editarCurso(curso.id)}>Editar</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CadastroCurso;
