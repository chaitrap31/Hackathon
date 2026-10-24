import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  Users,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Target,
  MessageCircle,
  ChevronRight,
  Download,
  Printer,
  Award,
  Star,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import missions from '../data/missions';
import { getSessions, saveSession } from '../data/store';
import { bloomLevels, calculateBloomScore } from '../utils/bloom';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';
import FrictionSim from '../components/sims/FrictionSim';
import PhotosynthesisSim from '../components/sims/PhotosynthesisSim';
import CircuitSim from '../components/sims/CircuitSim';
import WaterCycleSim from '../components/sims/WaterCycleSim';
import AcidBaseSim from '../components/sims/AcidBaseSim';

const simMap = {
  friction: FrictionSim,
  photosynthesis: PhotosynthesisSim,
  circuits: CircuitSim,
  watercycle: WaterCycleSim,
  acidbase: AcidBaseSim,
};

const tabs = [
  { id: 'brief', label: 'Mission Brief', icon: BookOpen },
  { id: 'simulate', label: 'Simulation', icon: PlayCircle },
  { id: 'assess', label: 'Assessment', icon: ClipboardCheck },
  { id: 'report', label: 'Report', icon: BarChart3 },
];

export default function Session() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('brief');
  const [showParentNotice, setShowParentNotice] = useState(false);

  useEffect(() => {
    const all = getSessions();
    const found = all.find((s) => s.id === sessionId);
    if (found) setSession(found);
  }, [sessionId]);

  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Session not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-sm text-stone-900 underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const mission = missions.find((m) => m.id === session.missionId);
  if (!mission) return null;

  const updateSession = (updates) => {
    const updated = { ...session, ...updates };
    setSession(updated);
    saveSession(updated);
  };

  const SimComponent = simMap[mission.simulation];

  return (
    <div className="space-y-6">
      {/* Back + Title + Parent Notice Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t.common.back}
        </button>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => setShowParentNotice(true)}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            {t.parentNotice.btnLabel}
          </button>
          <div className="text-right">
            <div className="text-sm font-semibold text-stone-900">{mission.title}</div>
            <div className="text-xs text-stone-400">{session.className || 'Classroom Session'}</div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-1 flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'brief' && <BriefTab mission={mission} onNotify={() => setShowParentNotice(true)} />}
      {activeTab === 'simulate' && SimComponent && <SimComponent mission={mission} />}
      {activeTab === 'simulate' && !SimComponent && (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <PlayCircle className="w-8 h-8 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500">Simulation coming soon for this mission</p>
        </div>
      )}
      {activeTab === 'assess' && (
        <AssessTab mission={mission} session={session} updateSession={updateSession} />
      )}
      {activeTab === 'report' && (
        <ReportTab mission={mission} session={session} updateSession={updateSession} />
      )}

      {/* Parent Notice Broadcast Modal */}
      {showParentNotice && (
        <ParentNoticeModal
          mission={mission}
          onClose={() => setShowParentNotice(false)}
          onSent={() => setShowParentNotice(false)}
        />
      )}
    </div>
  );
}

function BriefTab({ mission, onNotify }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Scenario */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="bg-stone-900 text-white px-6 py-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> Mission Brief
          </h3>
          <span className="text-xs text-stone-400">{mission.duration} minutes</span>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-lg font-bold text-stone-900 mb-2">{mission.title}</h4>
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-stone-400 uppercase mb-1">
                Read to class:
              </p>
              <p className="text-stone-700 leading-relaxed italic text-sm">"{mission.scenario}"</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-800 uppercase mb-1">Goal</p>
                <p className="text-sm text-amber-900">{mission.goal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions + Materials */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h4 className="text-sm font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-stone-400" /> Step-by-Step
          </h4>
          <ol className="space-y-3">
            {mission.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-xs font-bold text-stone-500 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-stone-600 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-stone-900">Materials (Zero-Cost)</h4>
            <button
              type="button"
              onClick={onNotify}
              className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Send Parent Reminder
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mission.materials.map((mat, i) => (
              <span
                key={i}
                className="bg-stone-50 text-stone-600 px-3 py-1.5 rounded-lg text-xs border border-stone-200"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessTab({ mission, session, updateSession }) {
  const [groups, setGroups] = useState(
    session.groups && session.groups.length > 0
      ? session.groups
      : Array.from({ length: 4 }, (_, i) => ({
          id: i + 1,
          name: `Group ${i + 1}`,
          observations: mission.assessment.observe.map(() => false),
          bloomResponses: {},
          points: 0,
          notes: '',
        })),
  );

  useEffect(() => {
    updateSession({ groups });
  }, [groups]);

  const addGroup = () => {
    const newId = groups.length + 1;
    setGroups([
      ...groups,
      {
        id: newId,
        name: `Group ${newId}`,
        observations: mission.assessment.observe.map(() => false),
        bloomResponses: {},
        points: 0,
        notes: '',
      },
    ]);
  };

  const removeGroup = (id) => {
    if (groups.length <= 1) return;
    setGroups(groups.filter((g) => g.id !== id));
  };

  const toggleObservation = (groupId, obsIndex) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        const obs = [...g.observations];
        obs[obsIndex] = !obs[obsIndex];
        return { ...g, observations: obs };
      }),
    );
  };

  const setBloomResponse = (groupId, bloomKey, status) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          bloomResponses: { ...g.bloomResponses, [bloomKey]: status },
        };
      }),
    );
  };

  const addPoints = (groupId, pts) => {
    setGroups(
      groups.map((g) => (g.id === groupId ? { ...g, points: Math.max(0, g.points + pts) } : g)),
    );
  };

  const totalChecks = groups.reduce(
    (acc, g) => acc + (g.observations ? g.observations.filter(Boolean).length : 0),
    0,
  );
  const maxChecks = groups.length * mission.assessment.observe.length;
  const overallPercent = maxChecks > 0 ? Math.round((totalChecks / maxChecks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Observation Grid</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Walk the room — tap to assess each group's application
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-stone-900">{overallPercent}%</div>
            <div className="text-xs text-stone-400">Class Progress</div>
          </div>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: `${overallPercent}%`,
              backgroundColor:
                overallPercent > 75 ? '#10b981' : overallPercent > 40 ? '#f59e0b' : '#94a3b8',
            }}
          />
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-stone-100">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={group.name}
                  onChange={(e) =>
                    setGroups(
                      groups.map((g) =>
                        g.id === group.id ? { ...g, name: e.target.value } : g,
                      ),
                    )
                  }
                  className="font-medium text-stone-900 bg-transparent border-none outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                {/* Points */}
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-700">{group.points}</span>
                  <button
                    onClick={() => addPoints(group.id, 1)}
                    className="w-5 h-5 bg-amber-200 rounded text-amber-800 text-xs font-bold hover:bg-amber-300 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => addPoints(group.id, -1)}
                    className="w-5 h-5 bg-stone-200 rounded text-stone-600 text-xs font-bold hover:bg-stone-300 transition-colors"
                  >
                    −
                  </button>
                </div>
                <button
                  onClick={() => removeGroup(group.id)}
                  className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Observation Checklist */}
              <div>
                <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Observation Checklist
                </h5>
                <div className="space-y-2">
                  {mission.assessment.observe.map((obs, i) => (
                    <button
                      key={i}
                      onClick={() => toggleObservation(group.id, i)}
                      className={`flex items-center gap-2.5 w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                        group.observations && group.observations[i]
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-stone-500 hover:bg-stone-50'
                      }`}
                    >
                      {group.observations && group.observations[i] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                      )}
                      {obs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bloom's Questions */}
              <div>
                <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Bloom's Taxonomy Responses
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {bloomLevels.map((level) => {
                    const question = mission.assessment.bloom[level.key];
                    if (!question) return null;
                    const status = (group.bloomResponses && group.bloomResponses[level.key]) || 'not-asked';
                    return (
                      <button
                        key={level.key}
                        onClick={() => {
                          const next =
                            status === 'not-asked'
                              ? 'completed'
                              : status === 'completed'
                              ? 'partial'
                              : status === 'partial'
                              ? 'not-asked'
                              : 'completed';
                          setBloomResponse(group.id, level.key, next);
                        }}
                        className="text-left p-2.5 rounded-lg border transition-all"
                        style={{
                          backgroundColor:
                            status === 'completed'
                              ? level.bgColor
                              : status === 'partial'
                              ? '#fffbeb'
                              : '#fafafa',
                          borderColor:
                            status === 'completed'
                              ? level.color + '44'
                              : status === 'partial'
                              ? '#fbbf2444'
                              : '#e7e5e4',
                        }}
                        title={question}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold" style={{ color: level.color }}>
                            {level.icon} {level.label}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                              status === 'completed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : status === 'partial'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-stone-100 text-stone-400'
                            }`}
                          >
                            {status === 'completed' ? '✓' : status === 'partial' ? '~' : '—'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-snug">
                          {question}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addGroup}
        className="w-full bg-stone-50 border border-dashed border-stone-300 text-stone-500 py-3 rounded-xl text-sm font-medium hover:bg-stone-100 hover:text-stone-700 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Group
      </button>
    </div>
  );
}

function ReportTab({ mission, session, updateSession }) {
  const groups = session.groups || [];

  const getGroupScore = (group) => {
    const obsArr = group.observations || [];
    const obsScore =
      obsArr.filter(Boolean).length / Math.max(obsArr.length, 1);
    const bloomScore = calculateBloomScore(group.bloomResponses || {}) / 100;
    return Math.round(((obsScore + bloomScore) / 2) * 100);
  };

  const overallScore =
    groups.length > 0
      ? Math.round(groups.reduce((acc, g) => acc + getGroupScore(g), 0) / groups.length)
      : 0;

  const leaderboard = [...groups].sort((a, b) => {
    const scoreA = getGroupScore(a) + (a.points || 0);
    const scoreB = getGroupScore(b) + (b.points || 0);
    return scoreB - scoreA;
  });

  const markComplete = () => {
    updateSession({ completed: true });
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4" id="session-report">
      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Session Report</h2>
            <p className="text-sm text-stone-500 mt-0.5">
              {mission.title} · {session.className || 'Classroom'} ·{' '}
              {new Date(session.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${
                overallScore > 75
                  ? 'text-emerald-600'
                  : overallScore > 40
                  ? 'text-amber-600'
                  : 'text-stone-400'
              }`}
            >
              {overallScore}%
            </div>
            <div className="text-xs text-stone-400 mt-0.5">Overall Application</div>
          </div>
        </div>

        {/* Score breakdown ring */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-stone-50 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-stone-900">{groups.length}</div>
            <div className="text-xs text-stone-500">Groups Assessed</div>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-stone-900">
              {groups.reduce((a, g) => a + (g.observations ? g.observations.filter(Boolean).length : 0), 0)}/
              {groups.reduce((a, g) => a + (g.observations ? g.observations.length : 0), 0)}
            </div>
            <div className="text-xs text-stone-500">Observations Met</div>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-stone-900">
              {groups.reduce(
                (a, g) =>
                  a + Object.values(g.bloomResponses || {}).filter((s) => s === 'completed').length,
                0,
              )}
            </div>
            <div className="text-xs text-stone-500">Bloom's Completed</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 print:hidden">
          <button
            onClick={printReport}
            className="bg-stone-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
          {!session.completed && (
            <button
              onClick={markComplete}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Complete
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100">
            <h3 className="font-semibold text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Group Leaderboard
            </h3>
          </div>
          <div>
            {leaderboard.map((group, rank) => {
              const score = getGroupScore(group);
              return (
                <div
                  key={group.id}
                  className="flex items-center justify-between px-6 py-3 border-b border-stone-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        rank === 0
                          ? 'bg-amber-100 text-amber-700'
                          : rank === 1
                          ? 'bg-stone-200 text-stone-600'
                          : rank === 2
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {rank + 1}
                    </span>
                    <span className="font-medium text-stone-900 text-sm">{group.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star className="w-3.5 h-3.5" />
                      <span className="text-sm font-semibold">{group.points || 0} pts</span>
                    </div>
                    <div className="w-24 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${score}%`,
                          backgroundColor:
                            score > 75 ? '#10b981' : score > 40 ? '#f59e0b' : '#94a3b8',
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-stone-700 w-10 text-right">
                      {score}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reflection Questions */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-stone-400" /> Reflection Questions for Class
        </h3>
        <div className="space-y-3">
          {mission.assessment.reflect.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-stone-50 rounded-lg p-3"
            >
              <span className="w-5 h-5 bg-stone-200 rounded-full flex items-center justify-center text-xs font-bold text-stone-600 shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-stone-700">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Notes */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 print:hidden">
        <h3 className="font-semibold text-stone-900 mb-3">Teacher Notes</h3>
        <textarea
          value={session.notes || ''}
          onChange={(e) => updateSession({ notes: e.target.value })}
          placeholder="Add your observations, feedback, or notes for this session..."
          className="w-full h-32 bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
