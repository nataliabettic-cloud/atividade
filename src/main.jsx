import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Chamados from './chamados.jsx'
import Equipamentos from './equipamentos.jsx'
import Tecnicos from './tecnicos.jsx'
import Manutencao from './manutencao.jsx'
import Historico from './historico.jsx'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
    {
    path: "/chamados",
    element: <Chamados />,
  },
      {
    path: "/equipamentos",
    element: <Equipamentos />,
  },
    {
  path: "/tecnicos",
    element: <Tecnicos />,
    },
  {
  path: "/manutencao",
    element: <Manutencao />,
  },
  {
  path: "/historico",
    element: <Historico />,
  },

]);

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
)
