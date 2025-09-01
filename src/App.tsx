import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import ErrorBoundary from './components/analytics/ErrorBoundary';

// 懒加载页面组件
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const DocsPage = React.lazy(() => import('./pages/DocsPage'));
const CommunityPage = React.lazy(() => import('./pages/CommunityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DownloadsPage = React.lazy(() => import('./pages/DownloadsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <GoogleAnalytics debug={import.meta.env.DEV} />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/downloads" element={<DownloadsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App
