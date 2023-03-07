import AuthContextProvider from 'context/AuthContext';
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from "./pages/Routes"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />

        <ToastContainer />

      </AuthContextProvider>
    </>
  );
}

export default App;
