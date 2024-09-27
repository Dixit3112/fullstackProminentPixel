import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import ErrorBoundary from './errorBoundary/index.jsx'
// import { Provider } from 'react-redux'
// import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
// <ErrorBoundary> 
// </ErrorBoundary> 
// <Provider store={store}>
// </Provider>
