import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  Package,
  BookOpen,
  PlayCircle,
  ClipboardList,
  Target,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  Send
} from 'lucide-react';
import missions from '../data/missions';
import { createSession, saveSession } from '../data/store';
import { bloomLevels } from '../utils/bloom';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';

export default function MissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const mission = missions.find((m) => m.id === id);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('Grade 7-B');
  const [showParentModal, setShowParentModal] = useState(false);
  const [noticeSent, setNoticeSent] = useState(false);

  if (!mission) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Mission not found</p>
        <button
          onClick={() => navigate('/library')}
          className="mt-4 text-sm text-stone-900 underline"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const startMission = () => {
    const session = createSession(mission.id, teacherName, className);
    saveSession(session);
    navigate(`/session/${session.id}`);
  };

  const subjectColors = {
    Physics: 'bg-blue-50 text-blue-700',
    Biology: 'bg-emerald-50 text-emerald-700',
    Chemistry: 'bg-purple-50 text-purple-700',
    Geography: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {t.common.back}
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                subjectColors[mission.subject] || 'bg-stone-100 text-stone-700'
              }`}
            >
              {mission.subject} · {t.common.grade} {mission.grade}
            </span>
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> {mission.duration} {t.common.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {t.common.groupsOf} {mission.groupSize}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">{mission.title}</h1>
          <p className="text-sm text-stone-500 mb-4">{mission.topic}</p>

          {/* Scenario */}
          <div className="bg-stone-50 rounded-xl p-5 mb-6 border border-stone-200/80">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Real-World Narrative Setup (Read to Class)
            </h3>
            <p className="text-stone-700 leading-relaxed italic">"{mission.scenario}"</p>
          </div>

          {/* Goal */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-900 mb-1">Mission Objective</h3>
                <p className="text-sm text-amber-800">{mission.goal}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Materials with Parent Reminder trigger */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-stone-400" /> ₹0 Materials Needed
                </h3>
                <button
                  type="button"
                  onClick={() => setShowParentModal(true)}
                  className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3 text-emerald-600" />
                  {noticeSent ? '✓ Sent Notice' : 'Notify Parents'}
                </button>
              </div>

              <ul className="space-y-1.5 bg-stone-50/60 p-4 rounded-xl border border-stone-200">
                {mission.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {mat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-stone-400" /> Activity Steps (15 Mins)
              </h3>
              <ol className="space-y-1.5">
                {(showAllSteps ? mission.steps : mission.steps.slice(0, 3)).map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="w-5 h-5 bg-stone-100 rounded-full flex items-center justify-center text-xs font-semibold text-stone-500 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              {mission.steps.length > 3 && (
                <button
                  onClick={() => setShowAllSteps(!showAllSteps)}
                  className="mt-2 text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
                >
                  {showAllSteps ? (
                    <>
                      Show less <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Show all {mission.steps.length} steps <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bloom's Taxonomy Preview */}
        <div className="border-t border-stone-100 p-6 sm:p-8 bg-stone-50/50">
          <h3 className="text-sm font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-400" /> Assessment Questions — Bloom's Taxonomy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bloomLevels.map((level) => {
              const question = mission.assessment.bloom[level.key];
              if (!question) return null;
              return (
                <div
                  key={level.key}
                  className="rounded-lg p-3 border"
                  style={{ backgroundColor: level.bgColor, borderColor: level.color + '33' }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{level.icon}</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: level.color }}
                    >
                      {level.label}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{question}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Session & Parent Notification Actions */}
        <div className="border-t border-stone-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Start Classroom Session</h3>
              <p className="text-xs text-stone-500">Launch observation grid and live digital simulation</p>
            </div>
            <button
              type="button"
              onClick={() => setShowParentModal(true)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              {t.parentNotice.btnLabel}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder="Educator Name (e.g. Ms. Anita)"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent font-medium"
            />
            <input
              type="text"
              placeholder="Class / Section (e.g. Grade 7-B)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent font-medium"
            />
          </div>

          <button
            onClick={startMission}
            className="w-full sm:w-auto bg-stone-900 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <PlayCircle className="w-4 h-4 text-amber-400" />
            {t.common.launchSession}
          </button>
        </div>
      </div>

      {/* Parent Notice Broadcast Modal */}
      {showParentModal && (
        <ParentNoticeModal
          mission={mission}
          onClose={() => setShowParentModal(false)}
          onSent={() => {
            setNoticeSent(true);
            setShowParentModal(false);
          }}
        />
      )}
    </div>
  );
}
