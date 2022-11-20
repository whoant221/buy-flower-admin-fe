import BasicLayout from "./app/layout/basic/BasicLayout.jsx";
import { routes } from './app/routes'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((e, i) => {
            const Page = e.component
            return <Route key={i} path={e.path} element={<Page />} />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
