
import React, { useState } from 'react';
import './manutencao.css';

const Manutencao = () => {
  const [preventivas, setPreventivas] = useState([
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

  const [modalAberto, setModalAberto] = useState(false);

  const [equipamento, setEquipamento] = useState('');
  const [data, setData] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [status, setStatus] = useState('Agendada');

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'agendada' ? 'status-scheduled' : 'status-pending';
  };

  const adicionarPreventiva = (e) => {
    e.preventDefault();

    const [ano, mes, dia] = data.split('-');

    const novaPreventiva = {
      id: String(Date.now()),
      equipamento,
      data: `${dia}/${mes}/${ano}`,
      tecnico: tecnico.trim() || 'A definir',
      status
    };

    setPreventivas((anterior) => [...anterior, novaPreventiva]);

    setEquipamento('');
    setData('');
    setTecnico('');
    setStatus('Agendada');
    setModalAberto(false);
  };

  return (
    <div className="preventiva-container">
      <div className="preventiva-header-section">
        <h1 className="page-title">MANUTENÇÃO PREVENTIVA</h1>

        <div className="preventiva-actions-bar">
          <button className="btn-agendar" onClick={() => setModalAberto(true)}>
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

      {modalAberto && (
        <div
          onClick={() => setModalAberto(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#4e3041',
              padding: '24px',
              borderRadius: '12px',
              width: '350px',
              maxWidth: '90%'
            }}
          >
            <h2 style={{ color: '#f7a8b8', textAlign: 'center' }}>
              Novo chamado
            </h2>

            <form onSubmit={adicionarPreventiva}>
              <label style={{ color: '#fff' }}>Equipamento</label>
              <input
                type="text"
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}
                placeholder="Nome do equipamento"
                required
                style={{ display: 'block', width: '100%', boxSizing: 'border-box', margin: '8px 0 16px', padding: '10px' }}
              />

              <label style={{ color: '#fff' }}>Data da manutenção</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                style={{ display: 'block', width: '100%', boxSizing: 'border-box', margin: '8px 0 16px', padding: '10px' }}
              />

              <label style={{ color: '#fff' }}>Técnico</label>
              <input
                type="text"
                value={tecnico}
                onChange={(e) => setTecnico(e.target.value)}
                placeholder="Nome do técnico"
                style={{ display: 'block', width: '100%', boxSizing: 'border-box', margin: '8px 0 16px', padding: '10px' }}
              />

              <label style={{ color: '#fff' }}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ display: 'block', width: '100%', boxSizing: 'border-box', margin: '8px 0 20px', padding: '10px' }}
              >
                <option value="Agendada">Agendada</option>
                <option value="Pendente">Pendente</option>
              </select>

              <button type="submit" className="btn-agendar">
                Salvar chamado
              </button>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                style={{ marginLeft: '10px', padding: '12px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manutencao;
