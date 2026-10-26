import { useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import "./chamados.css";

const chamadosIniciais = [
  {
    id: 1001,
    equipamento: "Prensa 03",
    problema: "Falha no motor principal",
    prioridade: "Crítico",
    tecnico: "Carlos Silva",
    status: "Em análise",
    setor: "Produção A",
    data: "12/10/2026",
  },
  {
    id: 1002,
    equipamento: "Esteira 05",
    problema: "Ruído excessivo no rolo",
    prioridade: "Médio",
    tecnico: "Juliana Santos",
    status: "Em execução",
    setor: "Logística",
    data: "11/10/2026",
  },
  {
    id: 1003,
    equipamento: "Motor 07",
    problema: "Superaquecimento no painel",
    prioridade: "Baixo",
    tecnico: "Gabriel Costa",
    status: "Concluído",
    setor: "Manutenção",
    data: "09/10/2026",
  },
];

const normalizar = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const obterClassePrioridade = (prioridade) => {
  const valor = normalizar(prioridade);

  if (valor.includes("crit")) return "prioridade-critico";
  if (valor.includes("medio") || valor.includes("média") || valor.includes("media")) return "prioridade-medio";
  return "prioridade-baixo";
};

function Chamados() {
  const [chamados, setChamados] = useState(chamadosIniciais);
  const [busca, setBusca] = useState("");
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoChamado, setNovoChamado] = useState({
    equipamento: "",
    problema: "",
    prioridade: "Médio",
    tecnico: "",
    status: "Aberto",
    setor: "",
  });

  const filtrados = useMemo(() => {
    const termo = normalizar(busca);

    return chamados.filter((chamado) =>
      [
        chamado.id,
        chamado.equipamento,
        chamado.problema,
        chamado.tecnico,
        chamado.prioridade,
        chamado.status,
        chamado.setor,
      ]
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(termo)
    );
  }, [chamados, busca]);

  function abrirDetalhes(chamado) {
    setChamadoSelecionado(chamado);
  }

  function fecharDetalhes() {
    setChamadoSelecionado(null);
  }

  function abrirNovoChamado() {
    setNovoChamado({
      equipamento: "",
      problema: "",
      prioridade: "Médio",
      tecnico: "",
      status: "Aberto",
      setor: "",
    });
    setMostrarFormulario(true);
  }

  function fecharFormulario() {
    setMostrarFormulario(false);
  }

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setNovoChamado((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function salvarChamado(evento) {
    evento.preventDefault();

    const equipamento = novoChamado.equipamento.trim();
    const problema = novoChamado.problema.trim();
    const tecnico = novoChamado.tecnico.trim();
    const setor = novoChamado.setor.trim();

    if (!equipamento || !problema || !tecnico || !setor) return;

    const novoItem = {
      id: Date.now(),
      equipamento,
      problema,
      prioridade: novoChamado.prioridade,
      tecnico,
      status: novoChamado.status,
      setor,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    setChamados((atuais) => [novoItem, ...atuais]);
    fecharFormulario();
  }

  return (
    <>
      <NavBar />
      <main className="pagina">
      <h1>CHAMADOS</h1>

      <div className="barra-acoes">
        <label className="pesquisa" aria-label="Buscar chamado">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Buscar..."
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </label>

        <button className="botao-novo" type="button" onClick={abrirNovoChamado}>
          Novo chamado
        </button>
      </div>

      <section className="lista-chamados" aria-label="Lista de chamados">
        {filtrados.length > 0 ? (
          filtrados.map((chamado) => (
            <article key={chamado.id} className="chamado-card">
              <div className="chamado-topo">
                <strong>#{chamado.id}</strong>
                <span className={`prioridade ${obterClassePrioridade(chamado.prioridade)}`}>
                  <i aria-hidden="true" />
                  {chamado.prioridade}
                </span>
              </div>

              <div className="dados-principais">
                <p>
                  <span>Equipamento:</span> {chamado.equipamento}
                </p>
                <p>
                  <span>Problema:</span> {chamado.problema}
                </p>
                <p>
                  <span>Técnico:</span> {chamado.tecnico}
                </p>
              </div>

              <div className="dados-secundarios">
                <p>
                  <span>Status:</span> {chamado.status}
                </p>
                <p>
                  <span>Setor:</span> {chamado.setor}
                </p>
                <p>
                  <span>Data:</span> {chamado.data}
                </p>
              </div>

              <button
                className="botao-detalhes"
                type="button"
                onClick={() => abrirDetalhes(chamado)}
              >
                Detalhes
              </button>
            </article>
          ))
        ) : (
          <p className="sem-resultados">Nenhum chamado encontrado.</p>
        )}
      </section>

      {mostrarFormulario && (
        <div className="fundo-modal" aria-modal="true" role="dialog">
          <div className="modal">
            <h2>Novo chamado</h2>
            <form onSubmit={salvarChamado}>
              <label>
                Equipamento
                <input
                  name="equipamento"
                  value={novoChamado.equipamento}
                  onChange={atualizarCampo}
                  placeholder="Digite o equipamento"
                />
              </label>

              <label>
                Problema
                <textarea
                  name="problema"
                  value={novoChamado.problema}
                  onChange={atualizarCampo}
                  placeholder="Descreva o problema"
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
                Técnico
                <input
                  name="tecnico"
                  value={novoChamado.tecnico}
                  onChange={atualizarCampo}
                  placeholder="Nome do técnico"
                />
              </label>

              <label>
                Setor
                <input
                  name="setor"
                  value={novoChamado.setor}
                  onChange={atualizarCampo}
                  placeholder="Informe o setor"
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={novoChamado.status}
                  onChange={atualizarCampo}
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Em execução">Em execução</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </label>

              <div className="modal-acoes">
                <button className="botao-cancelar" type="button" onClick={fecharFormulario}>
                  Cancelar
                </button>
                <button className="botao-novo" type="submit">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {chamadoSelecionado && (
        <div className="fundo-modal" aria-modal="true" role="dialog">
          <div className="modal">
            <h2>Detalhes do chamado #{chamadoSelecionado.id}</h2>
            <p>
              <strong>Equipamento:</strong> {chamadoSelecionado.equipamento}
            </p>
            <p>
              <strong>Problema:</strong> {chamadoSelecionado.problema}
            </p>
            <p>
              <strong>Prioridade:</strong> {chamadoSelecionado.prioridade}
            </p>
            <p>
              <strong>Técnico:</strong> {chamadoSelecionado.tecnico}
            </p>
            <p>
              <strong>Status:</strong> {chamadoSelecionado.status}
            </p>
            <p>
              <strong>Setor:</strong> {chamadoSelecionado.setor}
            </p>
            <p>
              <strong>Data:</strong> {chamadoSelecionado.data}
            </p>

            <div className="modal-acoes fechar-detalhes">
              <button className="botao-cancelar" type="button" onClick={fecharDetalhes}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}

export default Chamados;