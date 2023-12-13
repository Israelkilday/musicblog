import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// -----

// const rootElement = document.getElementById("root")!;

// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     rootElement
//   );
// } else {
//   console.error('Elemento com id "root" não encontrado.');
// }

// -------

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
    console.error('Elemento com id "root" não encontrado.');
}

// ------

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )



