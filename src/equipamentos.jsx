import React, { useState } from 'react';
import './equipamentos.css';

const Equipamentos = () => {
  const [busca, setSearch] = useState('');

  const equipamentosIniciais = [
    {
      id: 'EQ-001',
      nome: 'Prensa Hidráulica 03',
      setor: 'Produção',
      status: 'Em manutenção',
      ultimaManutencao: '10/10/2026',
      icone: '⚙️'
    },
    {
      id: 'EQ-002',
      nome: 'Esteira Industrial 05',
      setor: 'Embalagem',
      status: 'Em operação',
      ultimaManutencao: '08/10/2026',
      icone: '⚙️'
    },
    {
      id: 'EQ-003',
      nome: 'Motor Industrial 07',
      setor: 'Manutenção',
      status: 'Em operação',
      ultimaManutencao: '05/10/2026',
      icone: '⚙️'
    }
  ];

  const equipamentosFiltrados = equipamentosIniciais.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.id.toLowerCase().includes(busca.toLowerCase()) ||
    item.setor.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'em operação' ? 'status-active' : 'status-maintenance';
  };

  return (
    <div className="equipamentos-container">
      <div className="equipamentos-header-section">
        <h1 className="page-title">EQUIPAMENTOS</h1>
        
        <div className="equipamentos-actions-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar por nome, código ou setor..." 
              value={busca}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="btn-novo-equipamento" onClick={() => alert('Abrir modal de novo equipamento!')}>
            + NOVO EQUIPAMENTO
          </button>
        </div>
      </div>

      <div className="equipamentos-grid">
        {equipamentosFiltrados.length > 0 ? (
          equipamentosFiltrados.map((eq) => (
            <div key={eq.id} className="equipamento-card">
              <div className="card-top-row">
                <div className="eq-title-wrapper">
                  <span className="eq-icon">{eq.icone}</span>
                  <div>
                    <h3 className="eq-name">{eq.nome}</h3>
                    <span className="eq-code">Código: {eq.id}</span>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="info-divider"></div>
                <div className="info-details">
                  <p><strong>Setor:</strong> {eq.setor}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status-badge ${getStatusClass(eq.status)}`}>
                      {eq.status}
                    </span>
                  </p>
                  <p><strong>Última manutenção:</strong> {eq.ultimaManutencao}</p>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn-detalhes" onClick={() => alert(`Visualizando detalhes do equipamento ${eq.id}`)}>
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum equipamento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Equipamentos;