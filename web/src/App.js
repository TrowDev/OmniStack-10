import React, { useState,useEffect } from 'react';

import './global.scss';
import './App.scss';
import './Sidebar.scss';
import './Main.scss';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Conceitos principais do React:
// Componente: Bloco isolado de HTML, CSS e JS, que não interfere no restante da aplicação.
// Propriedade: Informações que um componente pai passa para o componente filho.
// Estado: Informações mantidas pelo componente (Imutabilidade) .

function App() {

    const [devs, setDevs] = useState([]);

    useEffect(()=>{
        async function loadDevs(){
            const response = await api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    },[]);

    async function handleAddDev(data){
        
        const response = await api.post('/devs',data);

        setDevs([... devs, response.data]);

    }

    return (
        <div id="app">
            <aside>
               <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev}/>
                    ))}

                </ul>
            </main>
        </div>
    );
}

export default App;
