
import { useMemo, useState } from "react";
import "./tecnicos.css";

const tecnicosIniciais = [
  {
    id: 1,
    nome: "Carlos Silva",
    especialidade: "Mecânica industrial",
    chamados: 1,
    status: "Disponível",
  },
  {
    id: 2,
    nome: "Juliana Santos",
    especialidade: "Elétrica industrial",
    chamados: 1,
    status: "Em andamento",
  },
];

const formularioInicial = {
  nome: "",
  especialidade: "",
  status: "Disponível",
};

function Tecnicos() {
  const [tecnicos, setTecnicos] = useState(tecnicosIniciais);
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(null);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);

  const disponiveis = tecnicos.filter(
    (tecnico) => tecnico.status === "Disponível"
  ).length;

  const emAndamento = tecnicos.filter(
    (tecnico) => tecnico.status === "Em andamento"
  ).length;

  const tecnicosFiltrados = useMemo(() => {
    const termo = busca
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return tecnicos.filter((tecnico) =>
      `${tecnico.nome} ${tecnico.especialidade} ${tecnico.status}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(termo)
    );
  }, [tecnicos, busca]);

  function abrirNovo() {
    setFormulario(formularioInicial);
    setTecnicoSelecionado(null);
    setModal("novo");
  }

  function abrirEdicao(tecnico) {
    setTecnicoSelecionado(tecnico);
    setFormulario({
      nome: tecnico.nome,
      especialidade: tecnico.especialidade,
      status: tecnico.status,
    });
    setModal("editar");
  }

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function salvarTecnico(event) {
    event.preventDefault();

    const nome = formulario.nome.trim();
    const especialidade = formulario.especialidade.trim();

    if (!nome || !especialidade) return;

    if (modal === "editar" && tecnicoSelecionado) {
      setTecnicos((atuais) =>
        atuais.map((tecnico) =>
          tecnico.id === tecnicoSelecionado.id
            ? { ...tecnico, nome, especialidade, status: formulario.status }
            : tecnico
        )
      );
    } else {
      setTecnicos((atuais) => [
        ...atuais,
        {
          id: Math.max(0, ...atuais.map((tecnico) => tecnico.id)) + 1,
          nome,
          especialidade,
          chamados: 0,
          status: formulario.status,
        },
      ]);
    }

    fecharModal();
  }

  function solicitarRemocao(tecnico) {
    setTecnicoSelecionado(tecnico);
    setModal("remover");
  }

  function removerTecnico() {
    if (!tecnicoSelecionado) return;

    setTecnicos((atuais) =>
      atuais.filter((tecnico) => tecnico.id !== tecnicoSelecionado.id)
    );

    fecharModal();
  }

  function fecharModal() {
    setModal(null);
    setTecnicoSelecionado(null);
    setFormulario(formularioInicial);
  }

  return (
    <main className="pagina-tecnicos">
      <header className="cabecalho-tecnicos">
        <div className="titulo-area">
          <span className="sobretitulo">GESTÃO DE MANUTENÇÃO</span>
          <h1>TÉCNICOS</h1>
          <p>Gerenciamento da equipe de manutenção</p>
        </div>

        <div className="equipe-tag">
          <span className="equipe-ponto" />
          Equipe técnica
        </div>
      </header>

      <section className="painel-tecnicos" aria-label="Resumo da equipe">
        <article className="indicador-tecnico">
          <div className="indicador-icone">♙</div>
          <div className="indicador-texto">
            <span>Total de técnicos</span>
            <strong>{String(tecnicos.length).padStart(2, "0")}</strong>
            <small>Equipe cadastrada</small>
          </div>
        </article>

        <article className="indicador-tecnico">
          <div className="indicador-icone icone-verde">✓</div>
          <div className="indicador-texto">
            <span>Disponíveis</span>
            <strong>{String(disponiveis).padStart(2, "0")}</strong>
            <small>Prontos para atendimento</small>
          </div>
        </article>

        <article className="indicador-tecnico">
          <div className="indicador-icone icone-laranja">↻</div>
          <div className="indicador-texto">
            <span>Em andamento</span>
            <strong>{String(emAndamento).padStart(2, "0")}</strong>
            <small>Em atividade</small>
          </div>
        </article>
      </section>

      <section className="area-lista-tecnicos">
        <div className="lista-cabecalho">
          <div>
            <h2>Equipe técnica</h2>
            <p>Consulte e gerencie os profissionais cadastrados.</p>
          </div>

          <button className="botao-novo-tecnico" onClick={abrirNovo}>
            <span aria-hidden="true">＋</span>
            Novo técnico
          </button>
        </div>

        <div className="controles-tecnicos">
          <label className="busca-tecnicos">
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.2" />
              <path d="m15.5 15.5 4.2 4.2" />
            </svg>

            <input
              type="search"
              placeholder="Buscar por nome, especialidade ou status..."
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              aria-label="Buscar técnico"
            />

            {busca && (
              <button
                type="button"
                className="limpar-busca"
                onClick={() => setBusca("")}
                aria-label="Limpar pesquisa"
              >
                ×
              </button>
            )}
          </label>

          <span className="contador-tecnicos">
            {tecnicosFiltrados.length}{" "}
            {tecnicosFiltrados.length === 1 ? "profissional" : "profissionais"}
          </span>
        </div>

        <div className="lista-tecnicos">
          {tecnicosFiltrados.map((tecnico) => (
            <article className="card-tecnico" key={tecnico.id}>
              <div className="card-tecnico-conteudo">
                <div className="tecnico-identificacao">
                  <div className="avatar-tecnico" aria-hidden="true">
                    {tecnico.nome
                      .trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((parte) => parte[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="tecnico-nome-area">
                    <h3>{tecnico.nome}</h3>
                    <span className="tecnico-id">
                      Técnico #{String(tecnico.id).padStart(3, "0")}
                    </span>
                  </div>
                </div>

                <span
                  className={`status-tecnico ${
                    tecnico.status === "Disponível"
                      ? "status-disponivel"
                      : "status-andamento"
                  }`}
                >
                  <span className="status-ponto" />
                  {tecnico.status}
                </span>

                <div className="detalhes-tecnico">
                  <div className="detalhe-linha">
                    <span className="detalhe-rotulo">Especialidade</span>
                    <span className="detalhe-valor">
                      {tecnico.especialidade}
                    </span>
                  </div>

                  <div className="detalhe-linha">
                    <span className="detalhe-rotulo">Chamados atribuídos</span>
                    <span className="contador-chamados">
                      {String(tecnico.chamados).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <button
                  className="link-chamados"
                  onClick={() => {
                    setTecnicoSelecionado(tecnico);
                    setModal("chamados");
                  }}
                >
                  Ver chamados atribuídos <span aria-hidden="true">↗</span>
                </button>
              </div>

              <footer className="card-acoes-tecnico">
                <button
                  className="acao-editar"
                  onClick={() => abrirEdicao(tecnico)}
                >
                  <span aria-hidden="true">✎</span>
                  Editar
                </button>

                <button
                  className="acao-remover"
                  onClick={() => solicitarRemocao(tecnico)}
                >
                  <span aria-hidden="true">×</span>
                  Remover
                </button>
              </footer>
            </article>
          ))}

          {tecnicosFiltrados.length === 0 && (
            <div className="sem-resultados-tecnicos">
              <span aria-hidden="true">⌕</span>
              <h3>Nenhum técnico encontrado</h3>
              <p>Tente outro nome ou especialidade.</p>
              {busca && (
                <button
                  className="botao-secundario-tecnico"
                  onClick={() => setBusca("")}
                >
                  Limpar pesquisa
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {modal && (
        <div
          className="fundo-modal-tecnicos"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) fecharModal();
          }}
        >
          {modal === "novo" || modal === "editar" ? (
            <form className="modal-tecnicos" onSubmit={salvarTecnico}>
              <div className="modal-cabecalho-tecnicos">
                <div className="modal-icone-tecnico">♙</div>
                <button
                  type="button"
                  className="fechar-modal-tecnico"
                  onClick={fecharModal}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <h2>
                {modal === "novo" ? "Novo técnico" : "Editar técnico"}
              </h2>
              <p className="modal-descricao-tecnico">
                {modal === "novo"
                  ? "Preencha os dados para adicionar um profissional à equipe."
                  : "Atualize as informações do profissional."}
              </p>

              <label>
                Nome completo
                <input
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  placeholder="Ex.: Carlos Silva"
                  required
                  autoFocus
                />
              </label>

              <label>
                Especialidade
                <input
                  name="especialidade"
                  value={formulario.especialidade}
                  onChange={atualizarCampo}
                  placeholder="Ex.: Mecânica industrial"
                  required
                />
              </label>

              <label>
                Status profissional
                <select
                  name="status"
                  value={formulario.status}
                  onChange={atualizarCampo}
                >
                  <option>Disponível</option>
                  <option>Em andamento</option>
                </select>
              </label>

              <div className="acoes-modal-tecnicos">
                <button
                  type="button"
                  className="botao-secundario-tecnico"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="botao-novo-tecnico">
                  {modal === "novo" ? "Cadastrar técnico" : "Salvar alterações"}
                </button>
              </div>
            </form>
          ) : modal === "remover" ? (
            <section className="modal-tecnicos modal-confirmacao">
              <div className="modal-cabecalho-tecnicos">
                <div className="modal-icone-tecnico icone-remover">!</div>
                <button
                  type="button"
                  className="fechar-modal-tecnico"
                  onClick={fecharModal}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <h2>Remover técnico?</h2>
              <p className="modal-descricao-tecnico">
                Deseja remover <strong>{tecnicoSelecionado?.nome}</strong> da
                equipe? Essa ação remove o profissional da lista atual.
              </p>

              <div className="acoes-modal-tecnicos">
                <button
                  className="botao-secundario-tecnico"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
                <button
                  className="botao-confirmar-remocao"
                  onClick={removerTecnico}
                >
                  Remover técnico
                </button>
              </div>
            </section>
          ) : (
            <section className="modal-tecnicos">
              <div className="modal-cabecalho-tecnicos">
                <div className="modal-icone-tecnico">▤</div>
                <button
                  type="button"
                  className="fechar-modal-tecnico"
                  onClick={fecharModal}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <h2>Chamados atribuídos</h2>
              <p className="modal-descricao-tecnico">
                Profissional: <strong>{tecnicoSelecionado?.nome}</strong>
              </p>

              <div className="resumo-chamados-tecnico">
                <span>Total de chamados registrados</span>
                <strong>
                  {String(tecnicoSelecionado?.chamados ?? 0).padStart(2, "0")}
                </strong>
              </div>

              <p className="aviso-chamados-tecnico">
                Este resumo mostra a quantidade cadastrada para o técnico. A
                listagem individual dos chamados depende da integração com os
                registros de manutenção.
              </p>

              <div className="acoes-modal-tecnicos">
                <button
                  className="botao-novo-tecnico"
                  onClick={fecharModal}
                >
                  Fechar
                </button>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default Tecnicos;
