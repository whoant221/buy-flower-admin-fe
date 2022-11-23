import { routes } from './app/routes'
import './App.scss'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Routes>
            {routes.map((e, i) => {
                const Page = e.component
                return <Route key={i} path={e.path} element={<Page/>}/>
            })}
        </Routes>);
}

export default App;
