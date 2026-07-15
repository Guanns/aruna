import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CamouflageProvider } from './context/CamouflageContext';
import AppContent from './AppContent';
// Pages — level 1
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AuditPage from './pages/AuditPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import DirectoryPage from './pages/DirectoryPage';
import EducationPage from './pages/EducationPage';
import InformationPage from './pages/InformationPage';
import LivePositionPage from './pages/LivePositionPage';
import NotesPage from './pages/NotesPage';
import PeriodPage from './pages/PeriodPage';
import RelaxPage from './pages/RelaxPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import GalleryPage from './pages/GalleryPage';
// Pages — education sub-routes
import GlossaryPage from './pages/education/GlossaryPage';
import QuizPage from './pages/education/QuizPage';
import SimulationPage from './pages/education/SimulationPage';
import LawPage from './pages/education/LawPage';
import ScrollToTop from './components/ScrollToTop';
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(ScrollToTop, {}), _jsx(CamouflageProvider, { children: _jsx(AppContent, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/audit", element: _jsx(AuditPage, {}) }), _jsx(Route, { path: "/chat", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/directory", element: _jsx(DirectoryPage, {}) }), _jsx(Route, { path: "/education", element: _jsx(EducationPage, {}) }), _jsx(Route, { path: "/education/glossary", element: _jsx(GlossaryPage, {}) }), _jsx(Route, { path: "/education/quiz", element: _jsx(QuizPage, {}) }), _jsx(Route, { path: "/education/simulation", element: _jsx(SimulationPage, {}) }), _jsx(Route, { path: "/education/law", element: _jsx(LawPage, {}) }), _jsx(Route, { path: "/information", element: _jsx(InformationPage, {}) }), _jsx(Route, { path: "/live-position", element: _jsx(LivePositionPage, {}) }), _jsx(Route, { path: "/notes", element: _jsx(NotesPage, {}) }), _jsx(Route, { path: "/period", element: _jsx(PeriodPage, {}) }), _jsx(Route, { path: "/relax", element: _jsx(RelaxPage, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(GalleryPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) })] }));
}
