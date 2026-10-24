import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Lightbulb,
  LayoutDashboard,
  BookOpen,
  History,
  Menu,
  X,
  ChevronRight,
  Wand2,
  PackageCheck,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, changeLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: t.nav.dashboard, icon: LayoutDashboard },
    { path: '/library', label: t.nav.library, icon: BookOpen },
    { path: '/builder', label: t.nav.builder, icon: Wand2, highlight: true },
    { path: '/materials', label: t.nav.materials, icon: PackageCheck },
    { path: '/history', label: t.nav.history, icon: History },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans antialiased text-stone-800">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center group-hover:bg-stone-800 transition-colors shadow-xs">
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold text-stone-900 tracking-tight">
                  Apply<span className="text-amber-500 font-black">It</span>
                </span>
                <span className="ml-2 text-[10px] font-mono uppercase bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200/80 font-semibold tracking-wide hidden sm:inline-block">
                  {t.badge}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-stone-900 text-white shadow-xs'
                        : item.highlight
                        ? 'text-amber-900 bg-amber-50/80 hover:bg-amber-100 border border-amber-200/60'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher & Quick Action */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher (English | ಕನ್ನಡ | हिंदी) */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-xs">
                <Globe className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-1 hidden sm:block" />
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    lang === 'en'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Switch to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('kn')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    lang === 'kn'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('hi')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    lang === 'hi'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="हिंदी में बदलें"
                >
                  हिंदी
                </button>
              </div>

              {/* Build Mission Quick Link */}
              <Link
                to="/builder"
                className="hidden md:flex bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs items-center gap-1.5 transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                {t.nav.buildMission}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {children}
      </main>

      {/* Classy Footer */}
      <footer className="border-t border-stone-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 tracking-tight">ApplyIt</span>
            <span>—</span>
            <span>{t.hero.tag}</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>English · ಕನ್ನಡ · हिंदी</span>
            <span>•</span>
            <span className="font-mono text-[11px] text-stone-500">Client-First Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
