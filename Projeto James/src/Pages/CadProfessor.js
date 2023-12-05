import React, { useState, useEffect } from 'react';
import '../CompGeral/Layout/forma.css';

function CadastroProfessor() {
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [numeroMatricula, setNumeroMatricula] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [Professores, setProfessores] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);
  }, []);

  const adicionarProfessor = () => {
    if (nomeProfessor.trim() !== '' && numeroMatricula.trim() !== '' && numeroTelefone.trim() !== '') {
      const novoProfessor = {
        nomeProfessor: nomeProfessor,
        numeroMatricula: numeroMatricula,
        numeroTelefone: numeroTelefone,
      };

      if (editingIndex !== null) {
        // Editing existing professor
        const updatedProfessores = Professores.map((professor, index) =>
          index === editingIndex ? novoProfessor : professor
        );
        setProfessores(updatedProfessores);
        localStorage.setItem('Professores', JSON.stringify(updatedProfessores));
        setEditingIndex(null);
      } else {
        // Adding new professor
        setProfessores((prevProfessor) => {
          const newProfessores = [...prevProfessor, novoProfessor];
          localStorage.setItem('Professores', JSON.stringify(newProfessores));
          return newProfessores;
        });
      }

      setNomeProfessor('');
      setNumeroMatricula('');
      setNumeroTelefone('');
    }
  };

  const excluirProfessor = (index) => {
    const novoProfessor = [...Professores];
    novoProfessor.splice(index, 1);
    setProfessores(novoProfessor);
    localStorage.setItem('Professores', JSON.stringify(novoProfessor));
  };

  const editarProfessor = (index) => {
    const professorToEdit = Professores[index];
    setEditingIndex(index);
    setNomeProfessor(professorToEdit.nomeProfessor);
    setNumeroMatricula(professorToEdit.numeroMatricula);
    setNumeroTelefone(professorToEdit.numeroTelefone);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h2>{editingIndex !== null ? 'Editar Professor' : 'Adicionar Professor'}</h2>
        <div>
          <input
            type="text"
            id="nomeProfessor"
            placeholder="Nome do professor"
            value={nomeProfessor}
            onChange={(e) => setNomeProfessor(e.target.value)}
          />
          <input
            type="text"
            id="numeroMatricula"
            placeholder="Número da Matrícula"
            value={numeroMatricula}
            onChange={(e) => setNumeroMatricula(e.target.value)}
          />
          <input
            type="text"
            id="numeroTelefone"
            placeholder="Número de Telefone"
            value={numeroTelefone}
            onChange={(e) => setNumeroTelefone(e.target.value)}
          />
        </div>
        <button onClick={adicionarProfessor}>
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Professores</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Professor</th>
              <th>Número da Matrícula</th>
              <th>Número de Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="corpoTabela">
            {Professores.map((professor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{professor.nomeProfessor}</td>
                <td>{professor.numeroMatricula}</td>
                <td>{professor.numeroTelefone}</td>
                <td>
                  <button className="editar-btn" onClick={() => editarProfessor(index)}>
                    Editar
                  </button>
                  <button className="excluir-btn" onClick={() => excluirProfessor(index)}>
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

export default CadastroProfessor;
