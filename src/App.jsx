
import { useState } from "react";
import {
  Ticket,
  TriangleAlert,
  CalendarDays,
  Settings,
} from "lucide-react";
import "./App.css";
import NavBar from "./components/NavBar";

const chamados = [
  {
    numero: 1024,
    equipamento: "Prensa 03",
    problema: "Falha no motor",
    prioridade: "Alta",
    status: "Em análise",
  },
  {
    numero: 1023,
    equipamento: "Motor 07",
    problema: "Superaquecimento",
    prioridade: "Crítica",
    status: "Aberto",
  },
  {
    numero: 1022,
    equipamento: "Esteira 05",
    problema: "Ruído",
    prioridade: "Média",
    status: "Em execução",
  },
];

const menuItems = [
  "Dashboard",
  "Chamados",
  "Equipamentos",
  "Técnicos",
  "Preventiva",
  "Histórico",
  "Configurações",
];

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState("Dashboard");

  const indicadores = [
    {
      titulo: "Chamados abertos",
      valor: 24,
      classe: "card-orange",
      Icone: Ticket,
    },
    {
      titulo: "Chamados críticos",
      valor: 8,
      classe: "card-pink",
      Icone: TriangleAlert,
    },
    {
      titulo: "Preventivas pendentes",
      valor: 5,
      classe: "card-light-pink",
      Icone: CalendarDays,
    },
    {
      titulo: "Equipamentos ativos",
      valor: 42,
      classe: "card-muted-pink",
      Icone: Settings,
    },
  ];

  return (
    <div className="app">
      <header className="top-header">
        MANUTENÇÃO INDUSTRIAL
      </header>

      <NavBar />

      <main className="dashboard">
        <h1>{paginaAtiva.toUpperCase()}</h1>

        {paginaAtiva === "Dashboard" ? (
          <>
            <section className="stats-grid">
              {indicadores.map(
                ({ titulo, valor, classe, Icone }) => (
                  <article
                    className={`stat-card ${classe}`}
                    key={titulo}
                  >
                    <Icone
                      className="stat-icon"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <p>{titulo}</p>
                    <strong>{valor}</strong>
                  </article>
                )
              )}
            </section>

            <section className="table-wrapper">
              <div className="table-background" />

              <div className="table-scroll">
                <table>
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
                    {chamados.map((chamado) => (
                      <tr key={chamado.numero}>
                        <td>{chamado.numero}</td>
                        <td>{chamado.equipamento}</td>
                        <td>{chamado.problema}</td>
                        <td>
                          <span
                            className={`priority priority-${chamado.prioridade
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")}`}
                          />
                          {chamado.prioridade}
                        </td>
                        <td>{chamado.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="placeholder">
            <Settings size={42} />
            <h2>{paginaAtiva}</h2>
            <p>
              Área de {paginaAtiva.toLowerCase()}.
              O conteúdo desta página poderá ser desenvolvido
              aqui.
            </p>
            <button
              className="back-button"
              onClick={() => setPaginaAtiva("Dashboard")}
            >
              Voltar ao Dashboard
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
