import React, { useState } from 'react';
import './chamados.css';

const Chamados = () => {
  const [busca, setBusca] = useState('');
  
  // Lista de chamados de exemplo
  const chamadosIniciais = [
    {
      id: '001',
      equipamento: 'Prensa Hidráulica 03',
      problema: 'Máquina não está ligando',
      tipo: 'Manutenção corretiva',
      tecnico: 'Carlos Silva',
      status: 'Em andamento',
      prioridade: 'Crítico'
    },
    {
      id: '002',
      equipamento: 'Esteira Industrial 05',
      problema: 'Ruído durante o funcionamento',
      tipo: 'Manutenção preventiva',
      tecnico: 'A definir',
      status: 'Agendado',
      prioridade: 'Médio'
    },
    {
      id: '003',
      equipamento: 'Motor Industrial 07',
      problema: 'Aquecimento fora do normal',
      tipo: 'Manutenção corretiva',
      tecnico: 'Juliana Santos',
      status: 'Em aberto',
      prioridade: 'Baixo'
    }
  ];

  // Filtro de busca por equipamento ou ID
  const chamadosFiltrados = chamadosIniciais.filter(item => 
    item.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
    item.id.includes(busca) ||
    item.problema.toLowerCase().includes(busca.toLowerCase())
  );

  const getPriorityClass = (prioridade) => {
    switch (prioridade.toLowerCase()) {
      case 'crítico': case 'critico': return 'priority-badge--critical';
      case 'médio': case 'medio': return 'priority-badge--medium';
      case 'baixo': return 'priority-badge--low';
      default: return 'priority-badge--low';
    }
  };

  return (
    <div className="chamados-container">
      <div className="chamados-header-section">
        <h1 className="page-title">CHAMADOS DE MANUTENÇÃO</h1>
        
        {/* Barra de Pesquisa e Botão Novo Chamado */}
        <div className="chamados-actions-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar chamado por ID, equipamento ou problema..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="btn-novo-chamado" onClick={() => alert('Abrir modal de novo chamado!')}>
            + NOVO CHAMADO
          </button>
        </div>
      </div>

      {/* Grid de Cards de Chamados */}
      <div className="chamados-grid">
        {chamadosFiltrados.length > 0 ? (
          chamadosFiltrados.map((item) => (
            <div key={item.id} className="chamado-card">
              <div className="card-top-row">
                <span className="chamado-id">Chamado #{item.id}</span>
                <span className={`priority-badge ${getPriorityClass(item.prioridade)}`}>
                  <span className="dot"></span> {item.prioridade}
                </span>
              </div>

              <div className="card-body">
                <div className="info-group">
                  <p><strong>Equipamento:</strong> {item.equipamento}</p>
                  <p><strong>Problema:</strong> {item.problema}</p>
                </div>

                <div className="info-divider"></div>

                <div className="info-details">
                  <p><strong>Tipo:</strong> {item.tipo}</p>
                  <p><strong>Técnico:</strong> <span className={item.tecnico === 'A definir' ? 'text-pending' : ''}>{item.tecnico}</span></p>
                  <p><strong>Status:</strong> <span className="status-highlight">{item.status}</span></p>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn-detalhes" onClick={() => alert(`Visualizando detalhes do Chamado #${item.id}`)}>
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum chamado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Chamados;