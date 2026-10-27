
import React, { useState } from 'react';
import './chamados.css';

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

const formularioInicial = {
  equipamento: '',
  problema: '',
  tipo: 'Manutenção corretiva',
  tecnico: '',
  status: 'Em aberto',
  prioridade: 'Médio'
};

const Chamados = () => {
  const [busca, setBusca] = useState('');
  const [chamados, setChamados] = useState(chamadosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoChamado, setNovoChamado] = useState(formularioInicial);

  const chamadosFiltrados = chamados.filter(item =>
    item.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
    item.id.includes(busca) ||
    item.problema.toLowerCase().includes(busca.toLowerCase())
  );

  const getPriorityClass = (prioridade) => {
    switch (prioridade.toLowerCase()) {
      case 'crítico':
      case 'critico':
        return 'priority-badge--critical';
      case 'médio':
      case 'medio':
        return 'priority-badge--medium';
      case 'baixo':
        return 'priority-badge--low';
      default:
        return 'priority-badge--low';
    }
  };

  const atualizarCampo = (e) => {
    const { name, value } = e.target;

    setNovoChamado(anterior => ({
      ...anterior,
      [name]: value
    }));
  };

  const salvarChamado = (e) => {
    e.preventDefault();

    const maiorId = Math.max(
      0,
      ...chamados.map(item => Number(item.id))
    );

    const chamado = {
      ...novoChamado,
      equipamento: novoChamado.equipamento.trim(),
      problema: novoChamado.problema.trim(),
      tecnico: novoChamado.tecnico.trim() || 'A definir',
      id: String(maiorId + 1).padStart(3, '0')
    };

    setChamados(anterior => [chamado, ...anterior]);
    setBusca('');
    setNovoChamado(formularioInicial);
    setModalAberto(false);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoChamado(formularioInicial);
  };

  return (
    <div className="chamados-container">
      <div className="chamados-header-section">
        <h1 className="page-title">CHAMADOS DE MANUTENÇÃO</h1>

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

          <button
            className="btn-novo-chamado"
            onClick={() => setModalAberto(true)}
          >
            + NOVO CHAMADO
          </button>
        </div>
      </div>

      <div className="chamados-grid">
        {chamadosFiltrados.length > 0 ? (
          chamadosFiltrados.map((item) => (
            <div key={item.id} className="chamado-card">
              <div className="card-top-row">
                <span className="chamado-id">
                  Chamado #{item.id}
                </span>

                <span className={`priority-badge ${getPriorityClass(item.prioridade)}`}>
                  <span className="dot"></span> {item.prioridade}
                </span>
              </div>

              <div className="card-body">
                <div className="info-group">
                  <p>
                    <strong>Equipamento:</strong> {item.equipamento}
                  </p>
                  <p>
                    <strong>Problema:</strong> {item.problema}
                  </p>
                </div>

                <div className="info-divider"></div>

                <div className="info-details">
                  <p>
                    <strong>Tipo:</strong> {item.tipo}
                  </p>
                  <p>
                    <strong>Técnico:</strong>{' '}
                    <span className={item.tecnico === 'A definir' ? 'text-pending' : ''}>
                      {item.tecnico}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="status-highlight">
                      {item.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="btn-detalhes"
                  onClick={() => alert(`Visualizando detalhes do Chamado #${item.id}`)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum chamado encontrado.</p>
        )}
      </div>

      {modalAberto && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) fecharModal();
          }}
        >
          <div className="modal-chamado">
            <div className="modal-chamado-header">
              <h2>Novo chamado</h2>

              <button
                type="button"
                className="modal-fechar"
                onClick={fecharModal}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarChamado}>
              <div className="modal-campos">
                <label>
                  Equipamento *
                  <input
                    name="equipamento"
                    value={novoChamado.equipamento}
                    onChange={atualizarCampo}
                    placeholder="Ex.: Prensa Hidráulica 03"
                    required
                  />
                </label>

                <label>
                  Problema *
                  <textarea
                    name="problema"
                    value={novoChamado.problema}
                    onChange={atualizarCampo}
                    placeholder="Descreva o problema..."
                    rows={3}
                    required
                  />
                </label>

                <label>
                  Prioridade
                  <select
                    name="prioridade"
                    value={novoChamado.prioridade}
                    onChange={atualizarCampo}
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Crítico">Crítico</option>
                  </select>
                </label>

                <label>
                  Tipo de manutenção
                  <select
                    name="tipo"
                    value={novoChamado.tipo}
                    onChange={atualizarCampo}
                  >
                    <option value="Manutenção corretiva">
                      Manutenção corretiva
                    </option>
                    <option value="Manutenção preventiva">
                      Manutenção preventiva
                    </option>
                    <option value="Manutenção preditiva">
                      Manutenção preditiva
                    </option>
                  </select>
                </label>

                <label>
                  Técnico responsável
                  <input
                    name="tecnico"
                    value={novoChamado.tecnico}
                    onChange={atualizarCampo}
                    placeholder="Nome do técnico"
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={novoChamado.status}
                    onChange={atualizarCampo}
                  >
                    <option value="Em aberto">Em aberto</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </label>
              </div>

              <div className="modal-botoes">
                <button
                  type="button"
                  className="btn-cancelar-modal"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn-salvar-modal">
                  Salvar chamado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chamados;
