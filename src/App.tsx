import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { TopNavigation } from './components/TopNavigation';

// Import Views
import { LandingPage } from './views/LandingPage';
import { Auth } from './views/Auth';
import { Overview } from './views/Overview';
import { MedicationManagerView } from './views/MedicationManagerView';
import { PrescriptionOCR } from './views/PrescriptionOCR';
import { Reminders } from './views/Reminders';
import { Adherence } from './views/Adherence';
import { Caregiver } from './views/Caregiver';
import { MedicalAI } from './views/MedicalAI';
import { GeneralChat } from './views/GeneralChat';
import { Notifications } from './views/Notifications';
import { Settings } from './views/Settings';

const MainAppContent: React.FC = () => {
  const { currentPath, user } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Sync default view when user switches role
  useEffect(() => {
    if (user?.role === 'caregiver') {
      setActiveTab('caregiver-overview');
    } else {
      setActiveTab('overview');
    }
  }, [user]);

  // Basic Routing
  if (currentPath === 'landing') {
    return <LandingPage />;
  }

  if (currentPath === 'login') {
    return <Auth initialMode="login" />;
  }

  if (currentPath === 'signup') {
    return <Auth initialMode="signup" />;
  }

  // Dashboard sub-page router
  const renderDashboardView = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'caregiver-overview':
        return <Caregiver />;
      case 'medications':
        return <MedicationManagerView />;
      case 'ocr':
        return <PrescriptionOCR />;
      case 'reminders':
        return <Reminders />;
      case 'adherence':
        return <Adherence />;
      case 'caregiver':
        return <Caregiver />;
      case 'medical-ai':
        return <MedicalAI />;
      case 'general-chat':
        return <GeneralChat />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return user?.role === 'caregiver' ? <Caregiver /> : <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-brand-navy">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main panel */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <TopNavigation onTabChange={setActiveTab} />

        {/* Scrollable View Area */}
        <main className="flex-1 p-6 sm:p-8 w-full max-w-7xl mx-auto overflow-y-auto">
          {renderDashboardView()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainAppContent />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
