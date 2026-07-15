// src/App.tsx
// Router utama aplikasi Aruna — menggantikan Next.js App Router

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CamouflageProvider } from './context/CamouflageContext';
import AppContent from './AppContent';

// Pages — level 1
import HomePage          from './pages/HomePage';
import AboutPage         from './pages/AboutPage';
import AuditPage         from './pages/AuditPage';
import ChatPage          from './pages/ChatPage';
import DashboardPage     from './pages/DashboardPage';
import DirectoryPage     from './pages/DirectoryPage';
import EducationPage     from './pages/EducationPage';
import InformationPage   from './pages/InformationPage';
import LivePositionPage  from './pages/LivePositionPage';
import NotesPage         from './pages/NotesPage';
import PeriodPage        from './pages/PeriodPage';
import RelaxPage         from './pages/RelaxPage';
import SettingsPage      from './pages/SettingsPage';
import NotFoundPage      from './pages/NotFoundPage';
import GalleryPage       from './pages/GalleryPage';

// Pages — education sub-routes
import GlossaryPage      from './pages/education/GlossaryPage';
import QuizPage          from './pages/education/QuizPage';
import SimulationPage    from './pages/education/SimulationPage';
import LawPage           from './pages/education/LawPage';
import ScrollToTop       from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CamouflageProvider>
        <AppContent>
          <Routes>
            <Route path="/"                     element={<HomePage />} />
            <Route path="/about"                element={<AboutPage />} />
            <Route path="/audit"                element={<AuditPage />} />
            <Route path="/chat"                 element={<ChatPage />} />
            <Route path="/dashboard"            element={<DashboardPage />} />
            <Route path="/directory"            element={<DirectoryPage />} />
            <Route path="/education"            element={<EducationPage />} />
            <Route path="/education/glossary"   element={<GlossaryPage />} />
            <Route path="/education/quiz"       element={<QuizPage />} />
            <Route path="/education/simulation" element={<SimulationPage />} />
            <Route path="/education/law"        element={<LawPage />} />
            <Route path="/information"          element={<InformationPage />} />
            <Route path="/live-position"        element={<LivePositionPage />} />
            <Route path="/notes"                element={<NotesPage />} />
            <Route path="/period"               element={<PeriodPage />} />
            <Route path="/relax"                element={<RelaxPage />} />
            <Route path="/settings"             element={<SettingsPage />} />
            <Route path="/gallery"              element={<GalleryPage />} />
            <Route path="*"                     element={<NotFoundPage />} />
          </Routes>
        </AppContent>
      </CamouflageProvider>
    </BrowserRouter>
  );
}
