import './App.css';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FoldEventSelection from './components/pages/EventSelection.tsx';
import FoldLogin from './components/pages/Auth/Login.tsx';
import FoldRegister from './components/pages/Auth/Register.tsx';
import FoldDashboard from './components/pages/Dashboard.tsx';
import FoldTuto from './components/pages/Create/Tuto.tsx';
import FoldForm from './components/pages/Create/Form.tsx';

function App() {
  return (
    <div className="App h-[100vh] w-full">
      <Suspense>
        <Router>
          <Routes>
            {/* AUTH */}
              <Route element={<FoldLogin />} path="/"></Route>
              <Route element={<FoldRegister />} path="/register"></Route>

              <Route element={<FoldEventSelection />} path="event-selection"></Route>
              <Route element={<FoldDashboard />} path="dashboard"></Route>

              {/* CREATION */}
              <Route element={<FoldTuto />} path="create-event"></Route>
              <Route element={<FoldForm />} path="form-create"></Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
