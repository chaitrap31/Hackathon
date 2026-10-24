import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History as HistoryIcon,
  Search,
  Calendar,
  Users,
  Award,
  ArrowRight,
  Trash2,
  FileSpreadsheet,
  PlusCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import missions from '../data/missions';
import { getSessions, deleteSession, saveSession, createSession } from '../data/store';
import { calculateBloomScore } from '../utils/bloom';
import { useLanguage } from '../context/LanguageContext';

export default function History() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const loadSessions = () => {
    let list = getSessions();
    if (list.length === 0) {
      const demo1 = createSession('friction', 'Ms. Anita Sharma', 'Grade 7-B');
      demo1.id = 'demo-friction-session';
      demo1.createdAt = new Date(Date.now() - 86400000 * 2).toISOString();
      demo1.completed = true;
      demo1.groups = [
        {
          id: 1,
          name: 'Team Apollo (Front Left)',
          observations: [true, true, true],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed', analyze: 'completed', evaluate: 'partial', create: 'not-asked' },
          points: 12,
          notes: 'Noticed cloth mask increased friction the most.'
        },
        {
          id: 2,
          name: 'Team Falcon (Back Right)',
          observations: [true, true, false],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed', analyze: 'partial', evaluate: 'not-asked', create: 'not-asked' },
          points: 9,
          notes: 'Tested rough paper vs plastic cover.'
        },
        {
          id: 3,
          name: 'Team Newton (Middle Row)',
          observations: [true, true, true],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed', analyze: 'completed', evaluate: 'completed', create: 'partial' },
          points: 15,
          notes: 'Hypothesized how wet surfaces would reduce friction.'
        },
        {
          id: 4,
          name: 'Team Curie (Front Right)',
          observations: [true, false, true],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'partial', analyze: 'not-asked', evaluate: 'not-asked', create: 'not-asked' },
          points: 7,
          notes: 'Needs additional practice measuring slide distances.'
        }
      ];
      demo1.notes = 'Excellent classroom energy! 85% of students grasped that surface texture dictates friction without rote formula drill.';
      saveSession(demo1);

      const demo2 = createSession('circuits', 'Mr. Rajesh Kumar', 'Grade 8-C');
      demo2.id = 'demo-circuit-session';
      demo2.createdAt = new Date(Date.now() - 86400000 * 5).toISOString();
      demo2.completed = true;
      demo2.groups = [
        {
          id: 1,
          name: 'Tesla Squad',
          observations: [true, true, true],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed', analyze: 'completed', evaluate: 'completed', create: 'completed' },
          points: 18,
          notes: 'Successfully wired parallel circuit using aluminium foil strips.'
        },
        {
          id: 2,
          name: 'Edison Engineers',
          observations: [true, true, true],
          bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed', analyze: 'completed', evaluate: 'partial', create: 'not-asked' },
          points: 14,
          notes: 'Discovered why removing one series bulb causes entire blackout.'
        }
      ];
      demo2.notes = 'Demonstrated parallel circuit redundancy in municipal emergency lighting.';
      saveSession(demo2);

      list = [demo1, demo2];
    }
    setSessions(list);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this classroom session record?')) {
      deleteSession(id);
      loadSessions();
    }
  };

  const handleSeedMore = () => {
    const fresh = createSession('photosynthesis', 'Teacher Demo', 'Grade 6-A');
    fresh.createdAt = new Date().toISOString();
    fresh.groups = [
      {
        id: 1,
        name: 'Botany Team Alpha',
        observations: [true, true, true],
        bloomResponses: { remember: 'completed', understand: 'completed', apply: 'completed' },
        points: 10
      },
      {
        id: 2,
        name: 'Mars Terraforming Team',
        observations: [true, true, false],
        bloomResponses: { remember: 'completed', understand: 'completed', apply: 'partial' },
        points: 8
      }
    ];
    saveSession(fresh);
    loadSessions();
  };

  const filtered = sessions.filter((s) => {
    const mission = missions.find((m) => m.id === s.missionId);
    const matchesSearch =
      (s.className || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.teacherName || '').toLowerCase().includes(search.toLowerCase()) ||
      (mission?.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (mission?.topic || '').toLowerCase().includes(search.toLowerCase());
    const matchesSubject = filterSubject === 'all' || mission?.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2.5">
            <HistoryIcon className="w-6 h-6 text-stone-700" />
            {t.nav.history}
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Empirical observation records, Bloom's rubrics, and group application tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSeedMore}
            className="bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Seed Sample Session
          </button>
          <button
            onClick={() => navigate('/library')}
            className="bg-stone-900 text-white hover:bg-stone-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Live Session
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by class name, educator, or curriculum topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all shadow-xs"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Physics', 'Biology', 'Chemistry', 'Geography'].map((sub) => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filterSubject === sub
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {sub === 'all' ? 'All Disciplines' : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filtered.map((session) => {
          const mission = missions.find((m) => m.id === session.missionId);
          const groups = session.groups || [];
          const totalChecks = groups.reduce(
            (acc, g) => acc + (g.observations ? g.observations.filter(Boolean).length : 0),
            0
          );
          const maxChecks = groups.length * (mission?.assessment?.observe?.length || 3);
          const scorePercent = maxChecks > 0 ? Math.round((totalChecks / maxChecks) * 100) : 0;

          return (
            <div
              key={session.id}
              onClick={() => navigate(`/session/${session.id}`)}
              className="bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    {mission?.subject || 'Science'}
                  </span>
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {mission?.title || 'Classroom Mission'}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      session.completed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {session.completed ? 'Report Finalized' : 'Active In-Progress'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {session.className || 'General Cohort'}
                  </span>
                  {session.teacherName && (
                    <span>Educator: {session.teacherName}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {new Date(session.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {groups.length} Student Teams Evaluated
                  </span>
                </div>
              </div>

              {/* Progress & Controls */}
              <div className="flex items-center gap-5 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                <div className="text-right">
                  <div className="text-lg font-bold text-stone-900 font-mono">
                    {scorePercent}%
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Hands-On Mastery
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(session.id, e)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <HistoryIcon className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-stone-700">No session records match your filter</h3>
            <p className="text-xs text-stone-400 mt-1">Start a new classroom mission from the library</p>
          </div>
        )}
      </div>
    </div>
  );
}
