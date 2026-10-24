import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import MissionDetail from './pages/MissionDetail';
import Session from './pages/Session';
import History from './pages/History';
import MissionBuilder from './pages/MissionBuilder';
import MaterialsKit from './pages/MaterialsKit';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/builder" element={<MissionBuilder />} />
            <Route path="/materials" element={<MaterialsKit />} />
            <Route path="/history" element={<History />} />
            <Route path="/mission/:id" element={<MissionDetail />} />
            <Route path="/session/:sessionId" element={<Session />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
