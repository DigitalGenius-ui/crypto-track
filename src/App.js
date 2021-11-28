import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Coins from './pages/Coins';
import Homepage from './pages/Homepage';

function App() {
  const darkTheme = createTheme({
    palette: {
      primary:{
        main: "#fff"
      },
      type: 'dark',
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
          <Header />
            <Routes>
               <Route path="/" element={<Homepage/>}/>
               <Route path="/coin/:id" element={<Coins/>}/>
            </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
