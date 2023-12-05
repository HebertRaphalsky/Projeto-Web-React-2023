import React, { useState, useEffect } from 'react';
import '../CompGeral/Layout/forma.css';

function CadastroSala() {
  const [andarSala, setAndarSala] = useState('');
  const [numeroSala, setNumeroSala] = useState('');
  const [Predio, setPredio] = useState('');
  const [numeroCadeiras, setNumeroCadeiras] = useState('');
  const [Salas, setSalas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedSalas = JSON.parse(localStorage.getItem('Salas')) || [];
    setSalas(storedSalas);
  }, []);

  const adicionarSala = () => {
    if (andarSala.trim() !== '' && numeroSala.trim() !== '' && Predio.trim() !== '' && numeroCadeiras.trim() !== '') {
      const NovaSala = {
        andarSala: andarSala,
        numeroSala: numeroSala,
        Predio: Predio,
        numeroCadeiras: numeroCadeiras,
      };

      if (editingIndex !== null) {
        // Editing existing sala
        const updatedSalas = Salas.map((sala, index) =>
          index === editingIndex ? NovaSala : sala
        );
        setSalas(updatedSalas);
        localStorage.setItem('Salas', JSON.stringify(updatedSalas));
        setEditingIndex(null);
      } else {
        // Adding new sala
        setSalas((prevSalas) => {
          const newSalas = [...prevSalas, NovaSala];
          localStorage.setItem('Salas', JSON.stringify(newSalas));
          return newSalas;
        });
      }

      setAndarSala('');
      setNumeroSala('');
      setPredio('');
      setNumeroCadeiras('');
    }
  };

  const excluirSala = (index) => {
    const NovaSala = [...Salas];
    NovaSala.splice(index, 1);
    setSalas(NovaSala);
    localStorage.setItem('Salas', JSON.stringify(NovaSala));
  };

  const editarSala = (index) => {
    const salaToEdit = Salas[index];
    setEditingIndex(index);
    setAndarSala(salaToEdit.andarSala);
    setNumeroSala(salaToEdit.numeroSala);
    setPredio(salaToEdit.Predio);
    setNumeroCadeiras(salaToEdit.numeroCadeiras);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h2>{editingIndex !== null ? 'Editar Sala' : 'Adicionar Sala'}</h2>
        <input type="text" id="andarSala" placeholder="Andar da Sala" value={andarSala} onChange={(e) => setAndarSala(e.target.value)} />
        <input type="text" id="numeroSala" placeholder="Número da Sala" value={numeroSala} onChange={(e) => setNumeroSala(e.target.value)} />
        <input type="text" id="Predio" placeholder="Prédio" value={Predio} onChange={(e) => setPredio(e.target.value)} />
        <input type="text" id="numeroCadeiras" placeholder="Número de Cadeiras" value={numeroCadeiras} onChange={(e) => setNumeroCadeiras(e.target.value)} />

        <button onClick={adicionarSala}>
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Salas</h2>
        <table id="tabelaPessoas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Andar</th>
              <th>Número de Cadeiras</th>
              <th>Prédio</th>
              <th>Número de Cadeiras</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="corpoTabela">
            {Salas.map((Sala, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Sala.andarSala}</td>
                <td>{Sala.numeroCadeiras}</td>
                <td>{Sala.Predio}</td>
                <td>{Sala.numeroCadeiras}</td>
                <td>
                  <button className="editar-btn" onClick={() => editarSala(index)}>
                    Editar
                  </button>
                  <button className="excluir-btn" onClick={() => excluirSala(index)}>
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

export default CadastroSala;
