import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// # Nome do Projeto

// Meu Projeto Incrível

// ## Descrição

// Uma aplicação web construída com React e Vite, integrada ao Firebase para criar, editar e visualizar posts.

// ## Pré-requisitos

// - Node.js (v14.0.0 ou superior)
// - npm (v6.0.0 ou superior)

// ## Tecnologias Utilizadas

// - React
// - Vite
// - Firebase (Firestore, Auth)

// ## Configuração

// 1. Clone o repositório: `git clone https://github.com/seu-usuario/meu-projeto.git`
// 2. Instale as dependências: `npm install`
// 3. Configure o Firebase: Adicione suas credenciais no arquivo `.env`.

// ## Estrutura de Diretórios

// - `/src`: Código-fonte da aplicação.
// - `/public`: Arquivos públicos.

// ## Como Rodar o Projeto

// 1. Inicie o servidor de desenvolvimento: `npm run dev`
// 2. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)

// ## Funcionalidades

// - Criação de Posts
// - Edição de Posts
// - Visualização de Posts
// - Autenticação de Usuários

// ## Exemplos de Código

// ### Criar um Post

```jsx
const createPost = async (postData) => {
  // Lógica para criar um post no Firebase
  // ...
};
