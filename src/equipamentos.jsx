
import React, { useState } from 'react';
import './equipamentos.css';

const Equipamentos = () => {
  const [busca, setSearch] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const [equipamentos, setEquipamentos] = useState([
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
  ]);

  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: '',
    setor: '',
    status: 'Em operação',
    ultimaManutencao: ''
  });

  const equipamentosFiltrados = equipamentos.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.id.toLowerCase().includes(busca.toLowerCase()) ||
    item.setor.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'em operação'
      ? 'status-active'
      : 'status-maintenance';
  };

  const atualizarCampo = (e) => {
    setNovoEquipamento({
      ...novoEquipamento,
      [e.target.name]: e.target.value
    });
  };

  const salvarEquipamento = (e) => {
    e.preventDefault();

    const proximoNumero = Math.max(
      0,
      ...equipamentos.map(eq => Number(eq.id.replace('EQ-', '')))
    ) + 1;

    const dataFormatada = novoEquipamento.ultimaManutencao
      ? novoEquipamento.ultimaManutencao.split('-').reverse().join('/')
      : 'Não realizada';

    const equipamento = {
      id: `EQ-${String(proximoNumero).padStart(3, '0')}`,
      nome: novoEquipamento.nome.trim(),
      setor: novoEquipamento.setor.trim(),
      status: novoEquipamento.status,
      ultimaManutencao: dataFormatada,
      icone: '⚙️'
    };

    setEquipamentos([equipamento, ...equipamentos]);
    setSearch('');
    setNovoEquipamento({
      nome: '',
      setor: '',
      status: 'Em operação',
      ultimaManutencao: ''
    });
    setModalAberto(false);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoEquipamento({
      nome: '',
      setor: '',
      status: 'Em operação',
      ultimaManutencao: ''
    });
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

          <button
            className="btn-novo-equipamento"
            onClick={() => setModalAberto(true)}
          >
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
                  <p>
                    <strong>Última manutenção:</strong> {eq.ultimaManutencao}
                  </p>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="btn-detalhes"
                  onClick={() => alert(`Visualizando detalhes do equipamento ${eq.id}`)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum equipamento encontrado.</p>
        )}
      </div>

      {modalAberto && (
        <div
          className="modal-equipamento-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) fecharModal();
          }}
        >
          <div className="modal-equipamento">
            <div className="modal-equipamento-header">
              <h2>Novo equipamento</h2>
              <button
                type="button"
                className="modal-equipamento-fechar"
                onClick={fecharModal}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarEquipamento}>
              <div className="modal-equipamento-campos">
                <label>
                  Nome do equipamento *
                  <input
                    type="text"
                    name="nome"
                    value={novoEquipamento.nome}
                    onChange={atualizarCampo}
                    placeholder="Ex.: Prensa Hidráulica 03"
                    required
                  />
                </label>

                <label>
                  Setor *
                  <input
                    type="text"
                    name="setor"
                    value={novoEquipamento.setor}
                    onChange={atualizarCampo}
                    placeholder="Ex.: Produção"
                    required
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={novoEquipamento.status}
                    onChange={atualizarCampo}
                  >
                    <option value="Em operação">Em operação</option>
                    <option value="Em manutenção">Em manutenção</option>
                  </select>
                </label>

                <label>
                  Última manutenção
                  <input
                    type="date"
                    name="ultimaManutencao"
                    value={novoEquipamento.ultimaManutencao}
                    onChange={atualizarCampo}
                  />
                </label>
              </div>

              <div className="modal-equipamento-botoes">
                <button
                  type="button"
                  className="btn-cancelar-equipamento"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-salvar-equipamento"
                >
                  Salvar equipamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipamentos;
