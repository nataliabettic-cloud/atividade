
import { useState } from "react";
import "./App.css";

const manutencoesIniciais = [
  {
    id: 1,
    equipamento: "Prensa Hidráulica 03",
    data: "2026-10-20",
    tecnico: "Carlos Silva",
    status: "Agendada",
  },
  {
    id: 2,
    equipamento: "Esteira Industrial 05",
    data: "2026-10-22",
    tecnico: "A definir",
    status: "Agendada",
  },
  {
    id: 3,
    equipamento: "Motor Industrial 07",
    data: "2026-10-25",
    tecnico: "Juliana Santos",
    status: "Pendente",
  },
];

function App() {
  const [manutencoes, setManutencoes] = useState(
    manutencoesIniciais
  );
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [formulario, setFormulario] = useState({
    equipamento: "",
    data: "",
    tecnico: "",
    status: "Agendada",
  });

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function agendarManutencao(event) {
    event.preventDefault();

    const novaManutencao = {
      id: Date.now(),
      ...formulario,
      tecnico: formulario.tecnico.trim() || "A definir",
    };

    setManutencoes((anterior) =>
      [...anterior, novaManutencao].sort(
        (a, b) => a.data.localeCompare(b.data)
      )
    );

    setFormulario({
      equipamento: "",
      data: "",
      tecnico: "",
      status: "Agendada",
    });

    setMostrarFormulario(false);
  }

  function formatarData(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>MANUTENÇÃO PREVENTIVA</h1>
      </header>

      <div className="acoes">
        <button
          className="botao-agendar"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          + AGENDAR MANUTENÇÃO
        </button>
      </div>

      {mostrarFormulario && (
        <form
          className="formulario"
          onSubmit={agendarManutencao}
        >
          <h2>Nova manutenção</h2>

          <label>
            Equipamento
            <input
              name="equipamento"
              value={formulario.equipamento}
              onChange={atualizarCampo}
              placeholder="Ex.: Prensa Hidráulica 01"
              required
            />
          </label>

          <label>
            Data da manutenção
            <input
              type="date"
              name="data"
              value={formulario.data}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Técnico responsável
            <input
              name="tecnico"
              value={formulario.tecnico}
              onChange={atualizarCampo}
              placeholder="Nome do técnico"
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formulario.status}
              onChange={atualizarCampo}
            >
              <option value="Agendada">Agendada</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluída">Concluída</option>
            </select>
          </label>

          <div className="botoes-formulario">
            <button type="submit" className="botao-agendar">
              Salvar manutenção
            </button>

            <button
              type="button"
              className="botao-cancelar"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <section className="secao-manutencoes">
        <h2>Próximas manutenções</h2>

        <div className="lista-manutencoes">
          {manutencoes.map((manutencao) => (
            <article className="cartao" key={manutencao.id}>
              <h3>{manutencao.equipamento}</h3>

              <div className="detalhes">
                <p>
                  <span>Data:</span>{" "}
                  {formatarData(manutencao.data)}
                </p>

                <p>
                  <span>Técnico:</span> {manutencao.tecnico}
                </p>

                <p>
                  <span>Status:</span> {manutencao.status}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
