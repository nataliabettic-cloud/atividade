const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const filtrados = chamados.filter((chamado) =>
  [
    chamado.id,
    chamado.equipamento,
    chamado.problema,
    chamado.tecnico,
    chamado.prioridade,
    chamado.status,
  ]
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .includes(normalizar(busca))
);
