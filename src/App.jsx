// import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

// import 'smart-webcomponents-react/source/styles/smart.default.css';
// import "./scss/global.scss"

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
