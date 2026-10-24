import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Users, BookOpen, ArrowRight, MessageSquare } from 'lucide-react';
import missions from '../data/missions';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';

export default function Library() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [noticeMission, setNoticeMission] = useState(null);

  const subjects = ['all', ...new Set(missions.map((m) => m.subject))];

  const filtered = missions.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.topic.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || m.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjectColors = {
    Physics: 'bg-blue-50 text-blue-700 border-blue-200',
    Biology: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Chemistry: 'bg-purple-50 text-purple-700 border-purple-200',
    Geography: 'bg-amber-50 text-amber-700 border-amber-200',
    Mathematics: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">{t.nav.library}</h1>
          <p className="text-stone-500 text-sm mt-1">
            Choose a real-world curriculum mission to bring your classroom to life
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search missions, scientific laws, concepts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all shadow-xs"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subjectFilter === s
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((mission) => (
          <div
            key={mission.id}
            onClick={() => navigate(`/mission/${mission.id}`)}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer hover:border-stone-300 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
                    subjectColors[mission.subject] ||
                    'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {mission.subject}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {t.common.grade} {mission.grade}
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1.5 group-hover:text-amber-600 transition-colors">
                {mission.title}
              </h3>
              <p className="text-xs font-semibold text-stone-500 mb-2">{mission.topic}</p>
              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                {mission.scenario}
              </p>

              <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {mission.duration}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {t.common.groupsOf} {mission.groupSize}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNoticeMission(mission);
                    }}
                    className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                    title="Send WhatsApp notice to parents"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    Notify Parents
                  </button>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 text-sm">No missions found matching your criteria</p>
        </div>
      )}

      {/* Parent Notice Broadcast Modal */}
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
