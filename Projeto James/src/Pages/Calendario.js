import React from 'react';
import '../CompGeral/Layout/forma.css';

function Calendario() {
  const diasDoMes = Array.from({ length: 30 }, (_, index) => index + 1);

  // Obter ensalamentos do armazenamento local
  const ensalamentos = JSON.parse(localStorage.getItem('Ensalamentos')) || [];

  return (
    <div className="calendarioContainer">
      <h2 className='label-calendario'>Novembro 2023</h2>
      <table className="calendario">
        <thead>
          <tr className="semana">
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sáb</th>
          </tr>
        </thead>
        <tbody>
          {chunkArray(diasDoMes, 7).map((semana, index) => (
            <tr key={index} className="dias">
              {semana.map((dia, diaIndex) => (
                <td key={diaIndex}>
                  {dia}
                  <ul>
                    {ensalamentos
                      .filter((ensalamento) => ensalamento.diaDaSemana === getDiaSemana(diaIndex))
                      .map((ensalamento) => (
                        <li key={ensalamento.id}>
                          <strong>Horário:</strong> {ensalamento.horario} - {' '}
                          <strong>Professor:</strong> {ensalamento.professor} - {' '}
                          <strong>Sala:</strong> {ensalamento.sala}
                        </li>
                      ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getDiaSemana(index) {
  const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return diasSemana[index];
}

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default Calendario;
