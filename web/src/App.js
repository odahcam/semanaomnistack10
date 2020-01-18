import React, { useEffect, useState } from 'react';

import './App.css';
import './Sidebar.css';
import './Main.css';

import api from './services/api';
import parseStringAsArray from './utils/parseStringAsArray'

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

// Componente: bloco isolado de HTML, CSS e JS, o qual não interfere no resto da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (imutabilidade)

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {

    async function loadDevs(params) {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
        </aside>
      <main>

        <ul>
          {devs.map(dev => <DevItem key={dev._id} dev={dev} />)}
        </ul>

      </main>
    </div>
  );
}

export default App;