import React, { useState } from 'react';
import './manutencao.css';

const Manutencao = () => {
  const [preventivas] = useState([
    {
      id: '1',
      equipamento: 'Prensa Hidráulica 03',
      data: '20/10/2026',
      tecnico: 'Carlos Silva',
      status: 'Agendada'
    },
    {
      id: '2',
      equipamento: 'Esteira Industrial 05',
      data: '22/10/2026',
      tecnico: 'A definir',
      status: 'Agendada'
    },
    {
      id: '3',
      equipamento: 'Motor Industrial 07',
      data: '25/10/2026',
      tecnico: 'Juliana Santos',
      status: 'Pendente'
    }
  ]);

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'agendada' ? 'status-scheduled' : 'status-pending';
  };

  return (
    <div className="preventiva-container">
      <div className="preventiva-header-section">
        <h1 className="page-title">MANUTENÇÃO PREVENTIVA</h1>

        <div className="preventiva-actions-bar">
          <button className="btn-agendar" onClick={() => alert('Abrir modal de agendamento de manutenção!')}>
            + AGENDAR MANUTENÇÃO
          </button>
        </div>

        <h2 className="section-subtitle">Próximas manutenções</h2>
      </div>

      <div className="preventiva-grid">
        {preventivas.map((item) => (
          <div key={item.id} className="preventiva-card">
            <div className="card-top">
              <h3 className="equipamento-name">{item.equipamento}</h3>
            </div>

            <div className="card-body">
              <p><strong>Data:</strong> {item.data}</p>
              <p>
                <strong>Técnico:</strong>{' '}
                <span className={item.tecnico === 'A definir' ? 'text-pending' : ''}>
                  {item.tecnico}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manutencao;