import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  Package,
  Clock,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Layers,
  Save,
  MessageSquare,
  Send
} from 'lucide-react';
import missions from '../data/missions';
import { createSession, saveSession } from '../data/store';
import { bloomLevels } from '../utils/bloom';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';

// Standard zero-cost classroom scrap kit
const commonScrapMaterials = [
  'Plastic ruler', 'Rubber bands', 'Scrap paper', 'Empty plastic bottles',
  'Paper clips', 'Coins', 'Pencils / Pens', 'Textbooks', 'Cardboard', 'Thread / String'
];

export default function MissionBuilder() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [topic, setTopic] = useState('Sound Waves & Vibration Pitch');
  const [subject, setSubject] = useState('Physics');
  const [grade, setGrade] = useState('7');
  const [classSize, setClassSize] = useState(40);
  const [selectedMaterials, setSelectedMaterials] = useState([
    'Plastic ruler', 'Rubber bands', 'Empty plastic bottles', 'Cardboard'
  ]);
  const [customMaterial, setCustomMaterial] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMission, setGeneratedMission] = useState(null);
  const [showParentModal, setShowParentModal] = useState(false);
  const [noticeSent, setNoticeSent] = useState(false);

  const toggleMaterial = (mat) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const addCustomMaterial = () => {
    if (customMaterial.trim() && !selectedMaterials.includes(customMaterial.trim())) {
      setSelectedMaterials([...selectedMaterials, customMaterial.trim()]);
      setCustomMaterial('');
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const id = 'custom-' + Date.now();
      const generated = {
        id,
        subject,
        grade,
        topic,
        title: `The Soundstage Crisis: ${topic}`,
        scenario: `You are acoustic engineers designing a concert auditorium. Performers are complaining that some notes are deafening while others are completely silent. Your team must prove how vibrating length and tension alter frequency and pitch using everyday desk objects.`,
        goal: `Construct a dual-pitch resonator on a school desk using ${selectedMaterials.slice(0, 3).join(', ')}. Calibrate how shortening vibrating length changes pitch from bass to treble.`,
        materials: selectedMaterials.length > 0 ? selectedMaterials : ['Plastic ruler', 'Rubber bands', 'Desk'],
        duration: 15,
        groupSize: 4,
        steps: [
          'Form student squads of 4 at each desk cluster.',
          'Hold 20cm of the plastic ruler firmly over the desk edge and flick it. Listen to the low frequency thrum.',
          'Slide the ruler inwards so only 8cm protrudes over the edge. Flick with equal force. Note the sharp, high-pitched buzz.',
          'Stretch a rubber band across an open plastic bottle or book. Pluck while pulling tighter vs slacker.',
          'Each squad logs the relationship: shorter vibrating length / higher tension = faster frequency & higher pitch.',
          'Squads solve the auditorium problem: should high-frequency baffles be long or short?'
        ],
        simulation: 'friction',
        assessment: {
          observe: [
            'Systematically changed ruler protrusion length',
            'Correlated pitch audio changes with vibration speed',
            'Collaborated as a team to formulate rule of frequency'
          ],
          reflect: [
            'Why did the 8cm ruler vibrate visibly faster than the 20cm ruler?',
            'How do guitar strings or violin strings use this exact same physical principle?',
            'If you were trapped in a mine, how could you tap a pipe to send a high-pitch warning signal?'
          ],
          bloom: {
            remember: 'What physical movement generates sound waves?',
            understand: 'Explain why shortening the ruler changed the sound from low to high.',
            apply: 'How would you adjust a loose guitar string that is playing flat?',
            analyze: 'Compare the vibration speed of the loose rubber band vs the stretched rubber band.',
            evaluate: 'A student claims heavier rulers vibrate faster. Do you agree or disagree based on your test?',
            create: 'Design a 3-note musical chime instrument using only desk objects.'
          }
        }
      };

      missions.unshift(generated);
      setGeneratedMission(generated);
      setIsGenerating(false);
    }, 600);
  };

  const handleLaunchSession = () => {
    if (!generatedMission) return;
    const session = createSession(generatedMission.id, 'Educator', `Grade ${grade}`);
    saveSession(session);
    navigate(`/session/${session.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
          <Wand2 className="w-4 h-4 text-amber-500" />
          <span>Curriculum to Application Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          AI Mission Generator
        </h1>
        <p className="text-stone-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Input any state syllabus or NCERT textbook topic. Our experiential learning engine designs a 15-minute hands-on challenge with zero-cost classroom scrap and Bloom's Taxonomy rubrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form: Parameters */}
        <div className="md:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-500" />
              1. Pedagogical Scope
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Subject
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Physics', 'Biology', 'Chemistry', 'Mathematics', 'Geography', 'EVS'].map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubject(sub)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      subject === sub
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Textbook Chapter or Concept
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Heat Conduction, Density & Buoyancy, Cell Membrane"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Target Grade
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Class Size
                </label>
                <input
                  type="number"
                  value={classSize}
                  onChange={(e) => setClassSize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Zero Cost Materials Selection */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-stone-500" />
                2. Available Zero-Cost Scrap Materials
              </h2>
              <span className="text-[11px] text-stone-400 font-mono">
                {selectedMaterials.length} Selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {commonScrapMaterials.map((mat) => {
                const active = selectedMaterials.includes(mat);
                return (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => toggleMaterial(mat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      active
                        ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {active ? '✓ ' : '+ '} {mat}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add other classroom item (e.g. chalk, thread)..."
                value={customMaterial}
                onChange={(e) => setCustomMaterial(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomMaterial()}
                className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <button
                type="button"
                onClick={addCustomMaterial}
                className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-200 border border-stone-200"
              >
                Add
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm mt-4"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {isGenerating ? 'Synthesizing 15-Minute Mission...' : 'Generate Real-World Mission'}
            </button>
          </div>
        </div>

        {/* Right Output: Generated Plan */}
        <div className="md:col-span-6">
          {generatedMission ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Generated Ready-to-Teach Mission
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    {generatedMission.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowParentModal(true)}
                  className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  {noticeSent ? '✓ Sent to Parents' : 'Notify Parents'}
                </button>
              </div>

              {/* Real World Scenario */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Classroom Immersion Hook (Read Aloud)
                </span>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{generatedMission.scenario}"
                </p>
              </div>

              {/* Mission Goal */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  Tactile Objective:
                </div>
                <p className="text-xs text-amber-800">
                  {generatedMission.goal}
                </p>
              </div>

              {/* 4-Step Rapid Instructions */}
              <div>
                <h4 className="text-xs font-semibold text-stone-900 mb-2">
                  15-Minute Micro-Activity Workflow:
                </h4>
                <ol className="space-y-1.5">
                  {generatedMission.steps.map((st, i) => (
                    <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Bloom's taxonomy snapshot */}
              <div>
                <h4 className="text-xs font-semibold text-stone-900 mb-2">
                  Bloom's Taxonomy Rubric:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">Apply</span>
                    <p className="text-[11px] text-stone-700 mt-0.5">{generatedMission.assessment.bloom.apply}</p>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] font-bold text-purple-600 uppercase block">Create</span>
                    <p className="text-[11px] text-stone-700 mt-0.5">{generatedMission.assessment.bloom.create}</p>
                  </div>
                </div>
              </div>

              {/* Launch Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLaunchSession}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  Launch Live Classroom Session
                </button>
                <button
                  onClick={() => setShowParentModal(true)}
                  className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp Parents
                </button>
                <button
                  onClick={() => navigate('/library')}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors border border-stone-200"
                >
                  View in Library
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-100/60 rounded-2xl border-2 border-dashed border-stone-300 p-10 text-center flex flex-col items-center justify-center min-h-[380px]">
              <Sparkles className="w-10 h-10 text-stone-400 mb-3" />
              <h3 className="font-semibold text-stone-700 text-sm">
                No Mission Generated Yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                Choose a topic on the left and click "Generate Real-World Mission" to transform textbook theory into practical classroom magic.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Parent Notice Broadcast Modal */}
      {showParentModal && generatedMission && (
        <ParentNoticeModal
          mission={generatedMission}
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
