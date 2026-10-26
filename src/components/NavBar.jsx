import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/chamados", label: "Chamados" },
  { to: "/equipamentos", label: "Equipamentos" },
  { to: "/tecnicos", label: "Técnicos" },
  { to: "/manutencao", label: "Manutenção" },
  { to: "/historico", label: "Histórico" },
];

export default function NavBar() {
  return (
    <header style={{ background: "#d58b9e", color: "#fff" }}>
      <nav
        style={{
          minHeight: "32px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "10px 12px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
        aria-label="Menu principal"
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              color: isActive ? "#171116" : "#fff",
              textDecoration: "none",
              fontFamily: "Georgia, sans-serif",
              fontSize: "16px",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
