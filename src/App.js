import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import { Main } from './common/Router';
import Const from "./common/Const";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Route path="/" component={Main}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
