import React from 'react';
import './Dashbord.css';

const Dashbord = () => {
  const stats = [
    { title: 'Chamados abertos', value: 24, icon: '🎟️', type: 'open' },
    { title: 'Chamados críticos', value: 8, icon: '⚠️', type: 'critical' },
    { title: 'Preventivas pendentes', value: 5, icon: '📅', type: 'pending' },
    { title: 'Equipamentos ativos', value: 42, icon: '⚙️', type: 'active' }
  ];

  const tableData = [
    { id: '1024', equipamento: 'Prensa 03', problema: 'Falha no motor', prioridade: 'Alta', status: 'Em análise' },
    { id: '1023', equipamento: 'Motor 07', problema: 'Superaquecimento', prioridade: 'Crítica', status: 'Aberto' },
    { id: '1022', equipamento: 'Esteira 05', problema: 'Ruído', prioridade: 'Média', status: 'Em execução' }
  ];

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'crítica': case 'critica': return 'priority-critical';
      case 'alta': return 'priority-high';
      case 'média': case 'media': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  return (
    <div className="layout-container" style={{ minHeight: 'auto' }}>
      {/* Conteúdo Principal do Dashboard (Sem o menu duplicado) */}
      <main className="dashboard-content">
        <h1 className="page-title">DASHBOARD</h1>

        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-card--${stat.type}`}>
              <div className="card-header">
                <span className="card-emoji-icon">{stat.icon}</span>
              </div>
              <h2 className="card-title">{stat.title}</h2>
              <span className="card-value">{stat.value}</span>
            </div>
          ))}
        </section>

        <section className="table-container-wrapper">
          <div className="table-card">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>EQUIPAMENTO</th>
                  <th>PROBLEMA</th>
                  <th>PRIORIDADE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td className="row-id">{row.id}</td>
                    <td>{row.equipamento}</td>
                    <td>{row.problema}</td>
                    <td>
                      <div className="priority-badge">
                        <span className={`priority-dot ${getPriorityClass(row.prioridade)}`}></span>
                        {row.prioridade}
                      </div>
                    </td>
                    <td>
                      <span className="status-tag">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashbord;