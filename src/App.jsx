import React, { useState } from 'react';
import Dashbord from './Dashbord';
import Chamados from './chamados';
import Equipamentos from './equipamentos';
import Tecnicos from './tecnicos';
import Manutencao from './manutencao';
import Historico from './historico';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('dashboard');

  return (
    <div>
      {/* Menu Superior Unificado */}
      <header className="main-header">
        <div className="header-top">
          <span className="system-title">MANUTENÇÃO INDUSTRIAL</span>
        </div>
        <nav className="main-nav">
          <button 
            onClick={() => setPaginaAtiva('dashboard')} 
            className={`nav-item ${paginaAtiva === 'dashboard' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => setPaginaAtiva('chamados')} 
            className={`nav-item ${paginaAtiva === 'chamados' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Chamados
          </button>

          <button 
            onClick={() => setPaginaAtiva('equipamentos')} 
            className={`nav-item ${paginaAtiva === 'equipamentos' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Equipamentos
          </button>

          <button 
            onClick={() => setPaginaAtiva('tecnicos')} 
            className={`nav-item ${paginaAtiva === 'tecnicos' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Técnicos
          </button>

          <button 
            onClick={() => setPaginaAtiva('preventiva')} 
            className={`nav-item ${paginaAtiva === 'preventiva' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Preventiva
          </button>

          <button 
            onClick={() => setPaginaAtiva('historico')} 
            className={`nav-item ${paginaAtiva === 'historico' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            Histórico
          </button>
        </nav>
      </header>

      {/* Renderização Dinâmica das Telas */}
      <main>
        {paginaAtiva === 'dashboard' && <Dashbord />}
        {paginaAtiva === 'chamados' && <Chamados />}
        {paginaAtiva === 'equipamentos' && <Equipamentos />}
        {paginaAtiva === 'tecnicos' && <Tecnicos />}
        {paginaAtiva === 'preventiva' && <Manutencao />}
        {paginaAtiva === 'historico' && <Historico />}
      </main>
    </div>
  );
}

export default App;