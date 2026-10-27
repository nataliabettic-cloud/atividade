import React, { useState } from 'react';
import './tecnicos.css';

const Tecnicos = () => {
  const [busca, setBusca] = useState('');

  const tecnicosIniciais = [
    {
      id: '1',
      nome: 'Carlos Silva',
      especialidade: 'Mecânica industrial',
      chamadosAtribuidos: '01',
      status: 'Disponível'
    },
    {
      id: '2',
      nome: 'Juliana Santos',
      especialidade: 'Elétrica industrial',
      chamadosAtribuidos: '01',
      status: 'Em andamento'
    }
  ];

  const tecnicosFiltrados = tecnicosIniciais.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.especialidade.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'disponível' ? 'status-available' : 'status-busy';
  };

  return (
    <div className="tecnicos-container">
      <div className="tecnicos-header-section">
        <div>
          <h1 className="page-title">TÉCNICOS</h1>
          <p className="page-subtitle">Gerenciamento da equipe de manutenção</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-box-title">Total de técnicos</span>
            <span className="stat-box-value">02</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-title">Disponíveis</span>
            <span className="stat-box-value">01</span>
          </div>
        </div>

        {/* Botão Novo Técnico e Busca */}
        <div className="tecnicos-actions-bar">
          <button className="btn-novo-tecnico" onClick={() => alert('Abrir modal de novo técnico!')}>
            + NOVO TÉCNICO
          </button>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar técnico..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Grid de Técnicos */}
      <div className="tecnicos-grid">
        {tecnicosFiltrados.length > 0 ? (
          tecnicosFiltrados.map((tec) => (
            <div key={tec.id} className="tecnico-card">
              <div className="card-top">
                <h3 className="tecnico-name">{tec.nome}</h3>
              </div>

              <div className="card-body">
                <p><strong>Especialidade:</strong> {tec.especialidade}</p>
                <p><strong>Chamados atribuídos:</strong> {tec.chamadosAtribuidos}</p>
                
                <div className="status-row-card">
                  <span className={`status-badge ${getStatusClass(tec.status)}`}>
                    {tec.status}
                  </span>
                </div>

                <div className="link-action">
                  <button className="text-link" onClick={() => alert(`Ver chamados de ${tec.nome}`)}>
                    [ Ver chamados ]
                  </button>
                </div>
              </div>

              <div className="card-footer-actions">
                <button className="btn-action-link" onClick={() => alert(`Editar ${tec.nome}`)}>[ Editar ]</button>
                <button className="btn-action-link danger" onClick={() => alert(`Remover ${tec.nome}`)}>[ Remover ]</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum técnico encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Tecnicos;