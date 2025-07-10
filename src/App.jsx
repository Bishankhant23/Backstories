import './App.css'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import  Authroute, { authRoutesArray }  from './routes/authRoutes.jsx'
import PrivateRoutes, { privateRoutesArray } from './routes/privateRoutes.jsx'

function App() {

  return <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Navigate to="/login" />} />
        <Route element={<Authroute/>}>
          {authRoutesArray?.map(({path,Component},index) => {
             return <Route key={index} path={path} element={<Component/>}></Route>
          })}
        </Route>

        <Route element={<PrivateRoutes/>}> 
           {privateRoutesArray?.map(({path,Component},index) => {
             return <Route key={index} path={path} element={<Component/>}></Route>
          })}
        </Route>
      </Routes>


  </BrowserRouter>
}

export default App
