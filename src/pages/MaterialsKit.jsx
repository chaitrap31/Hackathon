import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Sparkles,
  ArrowRight,
  BookOpen,
  DollarSign,
  CheckCircle2,
  Search,
  Zap,
  Info,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ParentNoticeModal from '../components/ParentNoticeModal';

const zeroCostHacks = [
  {
    item: 'Turmeric Powder & Water',
    expensiveAlternative: 'Chemical pH Strips / Universal Litmus Paper (₹400+)',
    physicsBioPrinciple: 'Curcumin natural alkaline deprotonation',
    textbookChapters: ['Acids, Bases & Salts', 'Organic Indicators', 'Chemical Reactions'],
    grades: 'Grades 7–10',
    howToUse: 'Dissolve half a teaspoon of cooking turmeric in 3 tablespoons of water. Apply drops to soap, lemon juice, or vinegar. Turns instant red in base; remains yellow in acid.',
    tag: 'Chemistry',
    rawMaterials: ['Turmeric powder', 'Water', 'Small plastic cup', 'Spoon']
  },
  {
    item: 'Plastic Ruler & Table Edge',
    expensiveAlternative: 'Audio Tuning Forks & Frequency Generators (₹1,200+)',
    physicsBioPrinciple: 'Oscillation frequency, pitch & acoustic standing waves',
    textbookChapters: ['Sound Waves', 'Frequency & Amplitude', 'Vibrating Objects'],
    grades: 'Grades 6–9',
    howToUse: 'Hold 20cm of the ruler over desk edge and twang it (low pitch rumble). Slide to 6cm protrusion and twang with equal force (high pitch buzz). Students visibly see vibration frequency inversely proportional to length.',
    tag: 'Physics',
    rawMaterials: ['30cm plastic ruler', 'Desk']
  },
  {
    item: 'Aluminium Kitchen Foil & AA Cell',
    expensiveAlternative: 'Insulated Copper Wires & Solder Kits (₹650+)',
    physicsBioPrinciple: 'Metallic electron conduction & resistance loops',
    textbookChapters: ['Electricity & Circuits', 'Conductors vs Insulators', 'Series & Parallel'],
    grades: 'Grades 6–10',
    howToUse: 'Fold foil into 1cm thick ribbons to create zero-cost flat wiring. Connect AA cell terminals to miniature flashlight bulb. Foil is easily cut with scissors and taped with cellotape.',
    tag: 'Physics',
    rawMaterials: ['Aluminium foil sheet', 'AA pencil cell', 'Cellotape']
  },
  {
    item: 'Clear Ziplock Pouch & Sunlight Window',
    expensiveAlternative: 'Condensation Cloud Chambers & Distillation Flasks (₹2,500+)',
    physicsBioPrinciple: 'Thermodynamic evaporation, adiabatic condensation & gravity precipitation',
    textbookChapters: ['Water Cycle', 'States of Matter', 'Meteorology & Rainfall'],
    grades: 'Grades 5–8',
    howToUse: 'Add 3 spoons of water into a transparent bag, seal airtight, and tape to sunny window pane. In 15 minutes, radiant heat creates micro-clouds on the plastic that gather into droplets and drip.',
    tag: 'Geography',
    rawMaterials: ['Transparent ziplock pouch', 'Water', 'Cellotape']
  },
  {
    item: 'Empty Plastic Bottle & Rubber Balloon',
    expensiveAlternative: 'Glass Bell Jar Anatomical Lung Apparatus (₹1,800+)',
    physicsBioPrinciple: 'Boyle\'s Law pressure differentials & respiratory mechanics',
    textbookChapters: ['Respiration in Organisms', 'Human Anatomy', 'Fluid Pressure'],
    grades: 'Grades 6–9',
    howToUse: 'Cut bottom off plastic bottle. Secure a cut balloon membrane across the bottom as the diaphragm. Insert second balloon via neck inside. Pulling bottom membrane inflates internal balloon automatically.',
    tag: 'Biology',
    rawMaterials: ['Empty 500ml water bottle', '2 rubber balloons', 'Rubber band']
  },
  {
    item: 'Textbook, Eraser & Handkerchief',
    expensiveAlternative: 'Friction Sled Force Dynamometer (₹900+)',
    physicsBioPrinciple: 'Microscopic surface asperities & sliding friction coefficients',
    textbookChapters: ['Friction & Drag', 'Newton\'s Laws', 'Surfaces & Wear'],
    grades: 'Grades 6–8',
    howToUse: 'Tilt one textbook as a standard ramp. Release an eraser onto glossy paper, rough card, and cloth handkerchief. Measure slide stopping distances with student thumb-spans.',
    tag: 'Physics',
    rawMaterials: ['Textbook', 'Eraser', 'Handkerchief / Cloth scrap']
  }
];

export default function MaterialsKit() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [noticeMission, setNoticeMission] = useState(null);

  const filtered = zeroCostHacks.filter((h) => {
    const matchesSearch =
      h.item.toLowerCase().includes(search.toLowerCase()) ||
      h.expensiveAlternative.toLowerCase().includes(search.toLowerCase()) ||
      h.textbookChapters.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || h.tag === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Package className="w-4 h-4 text-emerald-600" />
            <span>Frugal Science & Classroom Ingenuity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t.nav.materials}
          </h1>
          <p className="text-stone-500 text-sm mt-1 max-w-2xl">
            How any resource-constrained school can substitute costly laboratory apparatus with everyday desk items for hands-on conceptual discovery.
          </p>
        </div>

        <button
          onClick={() => navigate('/builder')}
          className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Generate Activity with These
        </button>
      </div>

      {/* Search & Tags */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search zero-cost apparatus, principles, or syllabus topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all shadow-xs"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'Physics', 'Biology', 'Chemistry', 'Geography'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filter === t
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {t === 'all' ? 'All Disciplines' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between hover:border-stone-300 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 uppercase tracking-wider">
                    {item.tag} · {item.grades}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">
                    {item.item}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ₹0 Cost
                  </span>
                </div>
              </div>

              {/* Lab Equipment Replaced */}
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 text-xs">
                <span className="text-rose-900 font-semibold block mb-0.5">
                  Replaces Costly Lab Apparatus:
                </span>
                <span className="text-rose-800 line-through">
                  {item.expensiveAlternative}
                </span>
              </div>

              {/* How to use */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-1">
                <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-stone-500" />
                  Classroom Execution:
                </span>
                <p>{item.howToUse}</p>
              </div>

              {/* Textbook Chapters */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Applicable Textbook Concepts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.textbookChapters.map((ch, i) => (
                    <span
                      key={i}
                      className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setNoticeMission({
                    title: item.item,
                    topic: item.textbookChapters[0],
                    materials: item.rawMaterials || [item.item]
                  });
                }}
                className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                Ask Parents to Send
              </button>
              <button
                onClick={() => navigate('/builder')}
                className="text-xs font-semibold text-stone-900 hover:text-stone-600 flex items-center gap-1 group transition-colors"
              >
                Create Mission <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
