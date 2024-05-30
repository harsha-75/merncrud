import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router,Route,Routes,Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
          <Router>
            <ToastContainer/>
                <Routes>
                      <Route path='/signin' element={<SignIn/>}/>
                      <Route path='/signup' element={<SignUp/>}/>
                      <Route path='/todo' element={<TodoList/>}/>
                      <Route path='*' element={<Navigate to='/signin' />} />
                </Routes>
          </Router>
  );
}

export default App;
