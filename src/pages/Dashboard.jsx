import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket,
  BookOpen,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Plus,
  Wand2,
  PackageCheck,
  CheckCircle2,
  Award,
  PlayCircle,
  HelpCircle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import missions from '../data/missions';
import { getSessions, saveSession, createSession } from '../data/store';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [sessions, setSessions] = useState([]);
  const [noticeMission, setNoticeMission] = useState(null);

  useEffect(() => {
    let list = getSessions();
    if (list.length === 0) {
      const demo1 = createSession('friction', 'Ms. Anita Sharma', 'Grade 7-B');
      demo1.id = 'demo-friction-session';
      demo1.createdAt = new Date(Date.now() - 86400000 * 2).toISOString();
      demo1.completed = true;
      demo1.groups = [
        { id: 1, name: 'Team Apollo', observations: [true, true, true], bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed' }, points: 12 },
        { id: 2, name: 'Team Falcon', observations: [true, true, false], bloomResponses: { remember: 'completed', understand: 'completed', apply: 'partial' }, points: 9 }
      ];
      saveSession(demo1);
      list = [demo1];
    }
    setSessions(list);
  }, []);

  const recentSessions = sessions.slice(0, 3);
  const featuredMissions = missions.slice(0, 4);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 sm:p-12 shadow-xl border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-stone-800/80 border border-stone-700/80 rounded-full px-3 py-1 text-xs text-amber-400 font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.tag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {t.hero.title1}
            <br />
            <span className="text-amber-400 font-serif italic font-normal">{t.hero.title2}</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base mb-8 leading-relaxed max-w-2xl">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/library')}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              {t.hero.startBtn}
            </button>
            <button
              onClick={() => navigate('/builder')}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-stone-700 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-amber-400" />
              {t.hero.generateBtn}
            </button>
            <button
              onClick={() => setNoticeMission(missions[0])}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl text-xs font-semibold transition-all border border-emerald-600 flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              {t.parentNotice.btnLabel}
            </button>
            <button
              onClick={() => navigate('/materials')}
              className="bg-stone-900/60 hover:bg-stone-800 text-stone-300 px-4 py-3 rounded-xl text-xs font-medium transition-all border border-stone-800 flex items-center gap-1.5"
            >
              <PackageCheck className="w-4 h-4 text-emerald-400" />
              {t.hero.kitBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">{t.pillars.timeTitle}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">{t.pillars.timeDesc}</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 mb-4">
            <PackageCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">{t.pillars.costTitle}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">{t.pillars.costDesc}</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">{t.pillars.bloomTitle}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">{t.pillars.bloomDesc}</p>
        </div>
      </section>

      {/* Ready-to-Teach Missions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              {t.dashboard.curatedMissions}
            </h2>
            <p className="text-xs text-stone-500">
              {t.dashboard.curatedSubtitle}
            </p>
          </div>
          <Link
            to="/library"
            className="text-xs font-semibold text-stone-900 hover:text-stone-600 flex items-center gap-1 transition-colors group"
          >
            {t.dashboard.viewAll} ({missions.length}) <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onNotify={(e) => {
                e.stopPropagation();
                setNoticeMission(mission);
              }}
            />
          ))}
        </div>
      </section>

      {/* Classroom Walkthrough Flow */}
      <section className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">
            {t.dashboard.workflowTag}
          </span>
          <h2 className="text-xl font-bold text-stone-900">
            {t.dashboard.howItWorks}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.dashboard.step1Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.dashboard.step1Desc}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.dashboard.step2Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.dashboard.step2Desc}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.dashboard.step3Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.dashboard.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              {t.dashboard.recentSessions}
            </h2>
            <Link
              to="/history"
              className="text-xs font-semibold text-stone-900 hover:text-stone-600 flex items-center gap-1 transition-colors"
            >
              {t.dashboard.allSessions} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentSessions.map((session) => {
              const mission = missions.find((m) => m.id === session.missionId);
              return (
                <div
                  key={session.id}
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 cursor-pointer transition-all flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
                      <PlayCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">
                        {mission?.title || 'Classroom Mission'}
                      </div>
                      <div className="text-xs text-stone-400">
                        {session.className || 'Cohort'} · {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        session.completed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {session.completed ? 'Completed' : 'In Progress'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Parent Prep Reminder Broadcast Modal */}
      {noticeMission && (
        <ParentNoticeModal
          mission={noticeMission}
          onClose={() => setNoticeMission(null)}
          onSent={() => setNoticeMission(null)}
        />
      )}
    </div>
  );
}

function MissionCard({ mission, onNotify }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const subjectColors = {
    Physics: 'bg-blue-50 text-blue-700 border-blue-200',
    Biology: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Chemistry: 'bg-purple-50 text-purple-700 border-purple-200',
    Geography: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div
      onClick={() => navigate(`/mission/${mission.id}`)}
      className="bg-white rounded-2xl border border-stone-200 p-5 cursor-pointer hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
              subjectColors[mission.subject] || 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            {mission.subject}
          </span>
          <span className="text-[11px] text-stone-400 font-mono">{t.common.grade} {mission.grade}</span>
        </div>

        <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
          {mission.title}
        </h3>
        <p className="text-xs text-stone-500 font-medium mb-3">{mission.topic}</p>

        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
          {mission.scenario}
        </p>
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
        <button
          type="button"
          onClick={onNotify}
          className="text-[11px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors"
          title="Send WhatsApp notice to parents"
        >
          <MessageSquare className="w-3 h-3 text-emerald-600" />
          Parents
        </button>
        <span className="flex items-center gap-1 text-stone-700 font-medium group-hover:translate-x-0.5 transition-transform">
          {t.dashboard.teach} <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
