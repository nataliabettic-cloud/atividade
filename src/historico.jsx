
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Truck,
  History,
  AlertTriangle,
  FileText,
  Settings,
  Wrench,
  Search,
  CheckCircle,
  Clock,
  Plus,
  X,
  CalendarDays,
} from "lucide-react";
import "./App.css";

const dadosIniciais = [
  {
    id: 1,
    equipamento: "Prensa Hidráulica 03",
    tipo: "Corretiva",
    data: "2026-10-10",
    status: "Concluído",
  },
  {
    id: 2,
    equipamento: "Esteira Industrial 05",
    tipo: "Preventiva",
    data: "2026-10-08",
    status: "Concluído",
  },
  {
    id: 3,
    equipamento: "Motor Industrial 07",
    tipo: "Corretiva",
    data: "2026-10-05",
    status: "Concluído",
  },
  {
    id: 4,
    equipamento: "Prensa Hidráulica 03",
    tipo: "Preventiva",
    data: "2026-10-25",
    status: "Pendente",
  },
  {
    id: 5,
    equipamento: "Esteira Industrial 05",
    tipo: "Preventiva",
    data: "2026-10-28",
    status: "Pendente",
  },
];

const menu = [
  { nome: "Dashboard", Icone: LayoutDashboard },
  { nome: "Equipamentos", Icone: Truck },
  { nome: "Histórico", Icone: History },
  { nome: "Alertas", Icone: AlertTriangle },
  { nome: "Relatórios", Icone: FileText },
];

const meses = [
  { nome: "Jan", valor: 8 },
  { nome: "Fev", valor: 4 },
  { nome: "Mar", valor: 3 },
  { nome: "Abr", valor: 6 },
  { nome: "Mai", valor: 2 },
  { nome: "Jun", valor: 5 },
];

function App() {
  const [registros, setRegistros] = useState(dadosIniciais);
  const [pagina, setPagina] = useState("Histórico");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [periodo, setPeriodo] = useState("30");
  const [modalAberto, setModalAberto] = useState(false);

  const [novo, setNovo] = useState({
    equipamento: "",
    tipo: "Preventiva",
    data: "",
    status: "Pendente",
  });

  const filtrados = useMemo(() => {
    const hoje = new Date("2026-10-23T12:00:00");

    return registros.filter((item) => {
      const correspondeBusca = item.equipamento
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeStatus =
        filtroStatus === "Todos" || item.status === filtroStatus;

      const dataItem = new Date(`${item.data}T12:00:00`);
      const dias = (hoje - dataItem) / (1000 * 60 * 60 * 24);

      const correspondePeriodo =
        periodo === "Todos" ||
        (periodo === "30" && dias >= 0 && dias <= 30) ||
        (periodo === "7" && dias >= 0 && dias <= 7) ||
        (periodo === "futuras" && dias < 0);

      return (
        correspondeBusca &&
        correspondeStatus &&
        correspondePeriodo
      );
    });
  }, [registros, busca, filtroStatus, periodo]);

  function salvarManutencao(event) {
    event.preventDefault();

    setRegistros((anteriores) => [
      {
        ...novo,
        id: Date.now(),
      },
      ...anteriores,
    ]);

    setNovo({
      equipamento: "",
      tipo: "Preventiva",
      data: "",
      status: "Pendente",
    });

    setModalAberto(false);
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const pendentes = registros.filter(
    (item) => item.status === "Pendente"
  ).length;

  const totalEquipamentos = new Set(
    registros.map((item) => item.equipamento)
  ).size;

  const ultimaManutencao = [...registros].sort(
    (a, b) => b.data.localeCompare(a.data)
  )[0];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="marca">
          <Settings size={39} strokeWidth={1.8} />
        </div>

        <nav className="menu">
          {menu.map(({ nome, Icone }) => (
            <button
              key={nome}
              className={`menu-item ${pagina === nome ? "ativo" : ""}`}
              onClick={() => setPagina(nome)}
            >
              <Icone size={43} strokeWidth={1.7} />
              <span>{nome}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="conteudo">
        <section className="indicadores">
          <article className="indicador">
            <Settings className="indicador-icone" size={42} />
            <div>
              <p>Equipamentos Totais:</p>
              <strong>{totalEquipamentos + 121}</strong>
            </div>
          </article>

          <article className="indicador">
            <Wrench className="indicador-icone" size={42} />
            <div>
              <p>Manutenções Pendentes:</p>
              <strong>{pendentes + 10}</strong>
            </div>
          </article>

          <article className="indicador">
            <AlertTriangle className="indicador-icone" size={42} />
            <div>
              <p>Último Alerta:</p>
              <strong>
                {ultimaManutencao?.equipamento.replace(
                  "Industrial ",
                  ""
                ) || "Nenhum alerta"}
              </strong>
            </div>
          </article>
        </section>

        <header className="titulo-pagina">
          <h1>{pagina === "Histórico" ? "HISTÓRICO DE MANUTENÇÕES" : pagina.toUpperCase()}</h1>
        </header>

        {pagina === "Histórico" ? (
          <>
            <section className="barra-filtros">
              <label className="campo-busca">
                <input
                  placeholder="Buscar equipamento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <Search size={16} />
              </label>

              <label className="campo-busca campo-status">
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  aria-label="Filtrar por status"
                >
                  <option value="Todos">Filtrar por status...</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                </select>
                <Search size={16} />
              </label>
            </section>

            <section className="linha-acoes">
              <label className="seletor-periodo">
                <CalendarDays size={14} />
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  aria-label="Selecionar período"
                >
                  <option value="30">Período: Últimos 30 Dias</option>
                  <option value="7">Período: Últimos 7 Dias</option>
                  <option value="futuras">Manutenções Futuras</option>
                  <option value="Todos">Todos os períodos</option>
                </select>
              </label>

              <button
                className="botao-nova"
                onClick={() => setModalAberto(true)}
              >
                <Plus size={15} />
                NOVA MANUTENÇÃO
              </button>
            </section>

            <section className="area-historico">
              <div className="tabela-wrapper">
                <table>
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
                    {filtrados.map((item, index) => (
                      <tr key={item.id}>
                        <td>{String(index + 1).padStart(3, "0")}</td>
                        <td>{item.equipamento}</td>
                        <td>{item.tipo}</td>
                        <td>{formatarData(item.data)}</td>
                        <td>
                          <span
                            className={`status status-${item.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {item.status}
                            {item.status === "Concluído" ? (
                              <CheckCircle size={13} />
                            ) : (
                              <Clock size={13} />
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {filtrados.length === 0 && (
                      <tr>
                        <td colSpan="5" className="sem-resultados">
                          Nenhuma manutenção encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <aside className="grafico">
                <p>Manutenções por mês</p>

                <div className="grafico-corpo">
                  {[0, 3, 6, 9].map((linha) => (
                    <div
                      key={linha}
                      className="linha-grafico"
                      style={{ bottom: `${linha * 10}%` }}
                    />
                  ))}

                  {meses.map((mes) => (
                    <div className="coluna-grafico" key={mes.nome}>
                      <div
                        className="barra"
                        style={{ height: `${mes.valor * 10}%` }}
                        title={`${mes.valor} manutenções`}
                      />
                      <span>{mes.nome}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </>
        ) : (
          <section className="pagina-alternativa">
            <div className="painel-alternativo">
              <h2>{pagina}</h2>
              {pagina === "Dashboard" && (
                <p>Visão geral das manutenções e dos equipamentos.</p>
              )}
              {pagina === "Equipamentos" && (
                <p>Equipamentos cadastrados: {totalEquipamentos + 121}</p>
              )}
              {pagina === "Alertas" && (
                <p>Manutenções pendentes: {pendentes + 10}</p>
              )}
              {pagina === "Relatórios" && (
                <p>Consulte o histórico e os indicadores de manutenção.</p>
              )}
              <button
                className="botao-nova"
                onClick={() => {
                  setPagina("Histórico");
                }}
              >
                Ver histórico
              </button>
            </div>
          </section>
        )}
      </main>

      {modalAberto && (
        <div
          className="modal-fundo"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModalAberto(false);
          }}
        >
          <form className="modal" onSubmit={salvarManutencao}>
            <div className="modal-titulo">
              <h2>Nova manutenção</h2>
              <button
                type="button"
                className="fechar-modal"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <label>
              Equipamento
              <input
                required
                value={novo.equipamento}
                onChange={(e) =>
                  setNovo({ ...novo, equipamento: e.target.value })
                }
                placeholder="Nome do equipamento"
              />
            </label>

            <label>
              Tipo de manutenção
              <select
                value={novo.tipo}
                onChange={(e) =>
                  setNovo({ ...novo, tipo: e.target.value })
                }
              >
                <option>Preventiva</option>
                <option>Corretiva</option>
                <option>Preditiva</option>
              </select>
            </label>

            <label>
              Data
              <input
                required
                type="date"
                value={novo.data}
                onChange={(e) =>
                  setNovo({ ...novo, data: e.target.value })
                }
              />
            </label>

            <label>
              Status
              <select
                value={novo.status}
                onChange={(e) =>
                  setNovo({ ...novo, status: e.target.value })
                }
              >
                <option>Pendente</option>
                <option>Em andamento</option>
                <option>Concluído</option>
              </select>
            </label>

            <button className="botao-nova" type="submit">
              Salvar manutenção
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
