
import { useState } from "react";
import NavBar from "./components/NavBar";
import "./equipamentos.css";

const equipamentosIniciais = [
  {
    codigo: "EQ-001",
    nome: "Prensa Hidráulica 03",
    setor: "Produção",
    status: "Em manutenção",
    ultimaManutencao: "10/10/2026",
  },
  {
    codigo: "EQ-002",
    nome: "Esteira Industrial 05",
    setor: "Embalagem",
    status: "Em operação",
    ultimaManutencao: "08/10/2026",
  },
  {
    codigo: "EQ-003",
    nome: "Motor Industrial 07",
    setor: "Manutenção",
    status: "Em operação",
    ultimaManutencao: "05/10/2026",
  },
];

function App() {
  const [equipamentos, setEquipamentos] = useState(equipamentosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  const [formulario, setFormulario] = useState({
    nome: "",
    setor: "",
    status: "Em operação",
    ultimaManutencao: "",
  });

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function cadastrarEquipamento(event) {
    event.preventDefault();

    const proximoNumero =
      Math.max(
        0,
        ...equipamentos.map((item) =>
          Number(item.codigo.replace("EQ-", ""))
        )
      ) + 1;

    const novaData = formulario.ultimaManutencao
      ? formulario.ultimaManutencao.split("-").reverse().join("/")
      : "Não informada";

    const novoEquipamento = {
      ...formulario,
      nome: formulario.nome.trim(),
      setor: formulario.setor.trim(),
      codigo: `EQ-${String(proximoNumero).padStart(3, "0")}`,
      ultimaManutencao: novaData,
    };

    setEquipamentos((atuais) => [...atuais, novoEquipamento]);

    setFormulario({
      nome: "",
      setor: "",
      status: "Em operação",
      ultimaManutencao: "",
    });

    setModalAberto(false);
  }

  function fecharModais() {
    setModalAberto(false);
    setEquipamentoSelecionado(null);
  }

  return (
    <>
      <NavBar />
      <main className="pagina">
      <h1>EQUIPAMENTOS</h1>

      <div className="acoes">
        <button
          className="botao-novo"
          onClick={() => setModalAberto(true)}
        >
          + NOVO EQUIPAMENTO
        </button>
      </div>

      <section className="lista-equipamentos">
        {equipamentos.map((equipamento) => (
          <article
            className="equipamento-card"
            key={equipamento.codigo}
          >
            <div className="nome-equipamento">
              <span aria-hidden="true">⚙</span>
              {equipamento.nome}
            </div>

            <p>
              <span>Código:</span> {equipamento.codigo}
            </p>

            <div className="informacoes">
              <p>
                <span>Setor:</span> {equipamento.setor}
              </p>

              <p
                className={`status-equipamento status-${equipamento.status
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-")}`}
              >
                <span>Status:</span>
                {equipamento.status}
              </p>

              <p>
                <span>Última manutenção:</span>
                {equipamento.ultimaManutencao}
              </p>
            </div>

            <button
              className="botao-detalhes"
              onClick={() => setEquipamentoSelecionado(equipamento)}
            >
              Ver detalhes
            </button>
          </article>
        ))}
      </section>

      {modalAberto && (
        <div className="fundo-modal" onMouseDown={(event) => {
          if (event.target === event.currentTarget) fecharModais();
        }}>
          <form className="modal" onSubmit={cadastrarEquipamento}>
            <h2>Novo equipamento</h2>

            <label>
              Nome do equipamento
              <input
                name="nome"
                value={formulario.nome}
                onChange={atualizarCampo}
                placeholder="Ex.: Prensa Hidráulica 03"
                required
              />
            </label>

            <label>
              Setor
              <input
                name="setor"
                value={formulario.setor}
                onChange={atualizarCampo}
                placeholder="Ex.: Produção"
                required
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formulario.status}
                onChange={atualizarCampo}
              >
                <option>Em operação</option>
                <option>Em manutenção</option>
                <option>Inativo</option>
              </select>
            </label>

            <label>
              Última manutenção
              <input
                type="date"
                name="ultimaManutencao"
                value={formulario.ultimaManutencao}
                onChange={atualizarCampo}
              />
            </label>

            <div className="modal-acoes">
              <button
                type="button"
                className="botao-cancelar"
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>

              <button type="submit" className="botao-novo">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      )}

      {equipamentoSelecionado && (
        <div className="fundo-modal" onMouseDown={(event) => {
          if (event.target === event.currentTarget) fecharModais();
        }}>
          <section className="modal">
            <h2>Detalhes do equipamento</h2>

            <p>
              <strong>Nome:</strong>{" "}
              {equipamentoSelecionado.nome}
            </p>

            <p>
              <strong>Código:</strong>{" "}
              {equipamentoSelecionado.codigo}
            </p>

            <p>
              <strong>Setor:</strong>{" "}
              {equipamentoSelecionado.setor}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {equipamentoSelecionado.status}
            </p>

            <p>
              <strong>Última manutenção:</strong>{" "}
              {equipamentoSelecionado.ultimaManutencao}
            </p>

            <button
              className="botao-novo fechar"
              onClick={() => setEquipamentoSelecionado(null)}
            >
              Fechar
            </button>
          </section>
        </div>
      )}
    </main>
    </>
  );
}

export default App;
