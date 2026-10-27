import React, { useState } from 'react';
import './historico.css';

const Historico = () => {
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [periodo, setPeriodo] = useState('30dias');

  const dadosHistorico = [
    { id: '001', equipamento: 'Prensa Hidráulica 03', tipo: 'Corretiva', data: '10/10/2026', status: 'Concluído' },
    { id: '002', equipamento: 'Esteira Industrial 05', tipo: 'Preventiva', data: '08/10/2026', status: 'Concluído' },
    { id: '003', equipamento: 'Motor Industrial 07', tipo: 'Corretiva', data: '05/10/2026', status: 'Concluído' },
    { id: '004', equipamento: 'Compresor de Ar 02', tipo: 'Preventiva', data: '28/09/2026', status: 'Concluído' },
    { id: '005', equipamento: 'Robô de Solda 01', tipo: 'Corretiva', data: '15/09/2026', status: 'Concluído' }
  ];

  // Filtros aplicados
  const historicoFiltrado = dadosHistorico.filter(item => {
    const atendeBusca = item.equipamento.toLowerCase().includes(busca.toLowerCase()) || item.id.includes(busca);
    const atendeStatus = statusFiltro === 'todos' || item.status.toLowerCase() === statusFiltro.toLowerCase();
    return atendeBusca && atendeStatus;
  });

  return (
    <div className="historico-container">
      {/* Título Principal */}
      <h1 className="page-title">HISTÓRICO DE MANUTENÇÕES</h1>

      {/* Cards de Resumo de Estatísticas no Topo */}
      <div className="historico-stats-grid">
        <div className="stat-card-hist">
          <div className="stat-icon-wrapper icon-gear">⚙️</div>
          <div className="stat-info">
            <span className="stat-label">Equipamentos Totais</span>
            <span className="stat-number">124</span>
          </div>
        </div>

        <div className="stat-card-hist">
          <div className="stat-icon-wrapper icon-wrench">🔧</div>
          <div className="stat-info">
            <span className="stat-label">Manutenções Pendentes</span>
            <span className="stat-number">12</span>
          </div>
        </div>

        <div className="stat-card-hist highlight-alert">
          <div className="stat-icon-wrapper icon-alert">⚠️</div>
          <div className="stat-info">
            <span className="stat-label">Último Alerta</span>
            <span className="stat-text-val">Motor 07 (Ontem)</span>
          </div>
        </div>
      </div>

      {/* Controles: Filtros, Pesquisa e Ação */}
      <div className="historico-controls-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar equipamento por nome ou ID..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select 
            className="custom-select" 
            value={statusFiltro} 
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="concluído">Concluído</option>
            <option value="pendente">Pendente</option>
          </select>

          <select 
            className="custom-select" 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="30dias">Últimos 30 Dias</option>
            <option value="60dias">Últimos 60 Dias</option>
            <option value="ano">Este Ano</option>
          </select>
        </div>

        <button className="btn-nova-manutencao" onClick={() => alert('Abrir formulário de Nova Manutenção')}>
          + NOVA MANUTENÇÃO
        </button>
      </div>

      {/* Conteúdo Principal: Tabela + Mini Gráfico do Lado */}
      <div className="historico-content-layout">
        {/* Tabela de Histórico */}
        <div className="table-card-wrapper">
          <table className="custom-table-hist">
            <thead>
              <tr>
                <th>Nº</th>
                <th>EQUIPAMENTO</th>
                <th>TIPO</th>
                <th>DATA</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {historicoFiltrado.length > 0 ? (
                historicoFiltrado.map((row) => (
                  <tr key={row.id}>
                    <td className="row-id">#{row.id}</td>
                    <td className="row-equip">{row.equipamento}</td>
                    <td>
                      <span className={`type-tag ${row.tipo.toLowerCase() === 'corretiva' ? 'type-corrective' : 'type-preventive'}`}>
                        {row.tipo}
                      </span>
                    </td>
                    <td>{row.data}</td>
                    <td>
                      <span className="status-done-badge">
                        {row.status} <span className="check-icon">✓</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">Nenhum registro de manutenção encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mini Gráfico Visual do Lado Direito */}
        <div className="chart-card">
          <h3 className="chart-title">Manutenções por mês</h3>
          <div className="chart-bars-wrapper">
            <div className="chart-bar-item">
              <div className="bar-fill" style={{ height: '85%' }}></div>
              <span className="bar-label">Jun</span>
            </div>
            <div className="chart-bar-item">
              <div className="bar-fill" style={{ height: '45%' }}></div>
              <span className="bar-label">Jul</span>
            </div>
            <div className="chart-bar-item">
              <div className="bar-fill" style={{ height: '60%' }}></div>
              <span className="bar-label">Ago</span>
            </div>
            <div className="chart-bar-item">
              <div className="bar-fill" style={{ height: '75%' }}></div>
              <span className="bar-label">Set</span>
            </div>
            <div className="chart-bar-item">
              <div className="bar-fill active-bar" style={{ height: '95%' }}></div>
              <span className="bar-label">Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historico;