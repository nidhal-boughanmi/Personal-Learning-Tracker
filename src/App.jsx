import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import SkillDashboard from './components/SkillDashboard/SkillDashboard';
import StudyTimer from './components/StudyTimer/StudyTimer';
import Statistics from './components/Statistics/Statistics';
import DailyGoals from './components/DailyGoals/DailyGoals';
import Settings from './components/Settings/Settings';
import FlashcardQuiz from './components/Flashcards/FlashcardQuiz';
import { FiBook, FiClock, FiBarChart2, FiTarget, FiSettings, FiZap } from 'react-icons/fi';

const TABS = {
  DASHBOARD: 'dashboard',
  TIMER: 'timer',
  QUIZ: 'quiz',
  STATISTICS: 'statistics',
  GOALS: 'goals',
  SETTINGS: 'settings',
};

function App() {
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [quizSkillId, setQuizSkillId] = useState(null);

  const tabs = [
    { id: TABS.DASHBOARD, label: 'Dashboard', icon: FiBook },
    { id: TABS.TIMER, label: 'Timer', icon: FiClock },
    { id: TABS.QUIZ, label: 'Quiz', icon: FiZap },
    { id: TABS.STATISTICS, label: 'Statistics', icon: FiBarChart2 },
    { id: TABS.GOALS, label: 'Goals', icon: FiTarget },
    { id: TABS.SETTINGS, label: 'Settings', icon: FiSettings },
  ];

  const handleStartQuiz = (skillId = null) => {
    setQuizSkillId(skillId);
    setActiveTab(TABS.QUIZ);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return <SkillDashboard onStartQuiz={handleStartQuiz} />;
      case TABS.TIMER:
        return <StudyTimer />;
      case TABS.QUIZ:
        return <FlashcardQuiz skillId={quizSkillId} />;
      case TABS.STATISTICS:
        return <Statistics />;
      case TABS.GOALS:
        return <DailyGoals />;
      case TABS.SETTINGS:
        return <Settings />;
      default:
        return <SkillDashboard onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen pb-24 md:pb-8">
        {/* Header */}
        <header className="glass sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiBook className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    DevSkillTracker
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">
                    Track your learning journey
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/30'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200/50 dark:border-slate-700/50 z-50">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${activeTab === tab.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400'
                    }`}
                >
                  <Icon size={22} />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="w-1 h-1 bg-primary-600 rounded-full mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </AppProvider>
  );
}

export default App;
