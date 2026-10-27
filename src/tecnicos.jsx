
import React, { useState } from 'react';
import './tecnicos.css';

const Tecnicos = () => {
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const [tecnicos, setTecnicos] = useState([
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
  ]);

  const [novoTecnico, setNovoTecnico] = useState({
    nome: '',
    especialidade: '',
    chamadosAtribuidos: '00',
    status: 'Disponível'
  });

  const tecnicosFiltrados = tecnicos.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.especialidade.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'disponível'
      ? 'status-available'
      : 'status-busy';
  };

  const salvarTecnico = (e) => {
    e.preventDefault();

    const proximoId = Math.max(
      0,
      ...tecnicos.map(tec => Number(tec.id))
    ) + 1;

    const tecnico = {
      ...novoTecnico,
      id: String(proximoId),
      nome: novoTecnico.nome.trim(),
      especialidade: novoTecnico.especialidade.trim()
    };

    setTecnicos(anterior => [...anterior, tecnico]);

    setNovoTecnico({
      nome: '',
      especialidade: '',
      chamadosAtribuidos: '00',
      status: 'Disponível'
    });

    setBusca('');
    setModalAberto(false);
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
            <span className="stat-box-value">
              {String(tecnicos.length).padStart(2, '0')}
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-box-title">Disponíveis</span>
            <span className="stat-box-value">
              {String(tecnicos.filter(
                tec => tec.status === 'Disponível'
              ).length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Botão Novo Técnico e Busca */}
        <div className="tecnicos-actions-bar">
          <button
            className="btn-novo-tecnico"
            onClick={() => setModalAberto(true)}
          >
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
                <p>
                  <strong>Especialidade:</strong> {tec.especialidade}
                </p>

                <p>
                  <strong>Chamados atribuídos:</strong> {tec.chamadosAtribuidos}
                </p>

                <div className="status-row-card">
                  <span className={`status-badge ${getStatusClass(tec.status)}`}>
                    {tec.status}
                  </span>
                </div>

                <div className="link-action">
                  <button
                    className="text-link"
                    onClick={() => alert(`Ver chamados de ${tec.nome}`)}
                  >
                    [ Ver chamados ]
                  </button>
                </div>
              </div>

              <div className="card-footer-actions">
                <button
                  className="btn-action-link"
                  onClick={() => alert(`Editar ${tec.nome}`)}
                >
                  [ Editar ]
                </button>

                <button
                  className="btn-action-link danger"
                  onClick={() => alert(`Remover ${tec.nome}`)}
                >
                  [ Remover ]
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum técnico encontrado.</p>
        )}
      </div>

      {/* Cadastro de novo técnico */}
      {modalAberto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(20, 8, 16, 0.78)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalAberto(false);
            }
          }}
        >
          <div
            style={{
              background: '#4e3041',
              border: '2px solid rgba(242, 194, 203, 0.3)',
              borderRadius: '18px',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              color: '#f7d6de',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ color: '#f7a8b8', margin: 0 }}>
                Novo técnico
              </h2>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f2c2cb',
                  fontSize: '28px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarTecnico}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  Nome completo *
                  <input
                    type="text"
                    required
                    placeholder="Ex.: Carlos Silva"
                    value={novoTecnico.nome}
                    onChange={(e) => setNovoTecnico({
                      ...novoTecnico,
                      nome: e.target.value
                    })}
                    style={{
                      padding: '12px',
                      background: '#3b2231',
                      border: '1px solid rgba(242, 194, 203, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  Especialidade *
                  <input
                    type="text"
                    required
                    placeholder="Ex.: Mecânica industrial"
                    value={novoTecnico.especialidade}
                    onChange={(e) => setNovoTecnico({
                      ...novoTecnico,
                      especialidade: e.target.value
                    })}
                    style={{
                      padding: '12px',
                      background: '#3b2231',
                      border: '1px solid rgba(242, 194, 203, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  Status
                  <select
                    value={novoTecnico.status}
                    onChange={(e) => setNovoTecnico({
                      ...novoTecnico,
                      status: e.target.value
                    })}
                    style={{
                      padding: '12px',
                      background: '#3b2231',
                      border: '1px solid rgba(242, 194, 203, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Em andamento">Em andamento</option>
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  Chamados atribuídos
                  <input
                    type="number"
                    min="0"
                    value={Number(novoTecnico.chamadosAtribuidos)}
                    onChange={(e) => setNovoTecnico({
                      ...novoTecnico,
                      chamadosAtribuidos: String(
                        Math.max(0, Number(e.target.value) || 0)
                      ).padStart(2, '0')
                    })}
                    style={{
                      padding: '12px',
                      background: '#3b2231',
                      border: '1px solid rgba(242, 194, 203, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </label>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  marginTop: '24px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  style={{
                    padding: '11px 18px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(242, 194, 203, 0.4)',
                    color: '#f2c2cb',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-novo-tecnico"
                >
                  Salvar técnico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tecnicos;
