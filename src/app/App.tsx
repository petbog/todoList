import './styles/index.scss'
import { Header } from '../modules/Header';
import { MainPage } from '../pages/MainPage';




function App() {

  return (
    <div className="App">
      <Header />
      <div className="content-page">
        <div className="page-wrapper">
          <MainPage />
        </div>
      </div>
    </div>
  );
}

export default App;
