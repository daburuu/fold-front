import './App.css';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./utils/firebase.js";

import FoldEventSelection from './components/pages/EventSelection.tsx';
import FoldLogin from './components/pages/Auth/Login.tsx';
import FoldRegister from './components/pages/Auth/Register.tsx';
import FoldDashboard from './components/pages/Dashboard.tsx';
import FoldTuto from './components/pages/Create/Tuto.tsx';
import FoldForm from './components/pages/Create/Form.tsx';
import FoldInvitations from './components/pages/Manage/Invitations.tsx';
const FoldScanLogin = lazy(() => import('./components/pages/Scan/Login.tsx'));
const FoldScanTicket = lazy(() => import('./components/pages/Scan/ScanTicket.tsx'));

function App() {
  return (
    <div className="App h-screen w-full overflow-hidden">
      <Suspense fallback={<></>}>
        <Router>
          <Routes>
            {/* AUTH */}
            <Route element={<FoldLogin />} path="/" exact={true}></Route>
            <Route element={<FoldRegister />} path="/register" exact={true}></Route>

            {/* DASHBOARD */}
            <Route element={<FoldEventSelection />} path="event-selection"></Route>
            <Route element={<FoldDashboard />} path="dashboard"></Route>
            <Route element={<FoldInvitations />} path="invitations"></Route>

            {/* CREATION */}
            <Route element={<FoldTuto />} path="create-event"></Route>
            <Route element={<FoldForm />} path="form-create"></Route>

            {/* SCAN */}
            <Route element={<FoldScanLogin />} path="/scan-login"></Route>
            <Route element={<FoldScanTicket />} path="/scan-ticket"></Route>

          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
