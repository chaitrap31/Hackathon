import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  PlaySquare,
  ClipboardCheck,
  Settings,
  Users,
  Package,
  Target,
  RefreshCcw,
  CheckCircle2,
  Circle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Info,
} from "lucide-react";

export default function Concept2Reality() {
  const [activeTab, setActiveTab] = useState("setup");

  // Shared State
  const [setupData, setSetupData] = useState({
    subject: "Science",
    topic: "Friction and Surface Resistance",
    classSize: 40,
    materials: "Textbooks, Erasers, Scratch paper, Cloth masks",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* App Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-300" />
            <h1 className="text-xl font-bold tracking-wide">
              Concept2Reality{" "}
              <span className="font-light text-indigo-200">
                | Teacher Dashboard
              </span>
            </h1>
          </div>
          <div className="text-sm font-medium bg-indigo-700 px-3 py-1 rounded-full border border-indigo-500">
            Hackathon MVP
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto">
          <TabButton
            icon={<Settings size={18} />}
            label="1. Setup"
            isActive={activeTab === "setup"}
            onClick={() => setActiveTab("setup")}
          />
          <TabButton
            icon={<PlaySquare size={18} />}
            label="2. Activity & Sim"
            isActive={activeTab === "activity"}
            onClick={() => setActiveTab("activity")}
          />
          <TabButton
            icon={<ClipboardCheck size={18} />}
            label="3. Assessment"
            isActive={activeTab === "assessment"}
            onClick={() => setActiveTab("assessment")}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "setup" && (
          <SetupTab
            data={setupData}
            setData={setSetupData}
            next={() => setActiveTab("activity")}
          />
        )}
        {activeTab === "activity" && <ActivityTab />}
        {activeTab === "assessment" && <AssessmentTab />}
      </main>
    </div>
  );
}

// --- TAB COMPONENTS ---

function SetupTab({ data, setData, next }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Generate Real-World Mission
          </h2>
          <p className="text-slate-500 mt-1">
            Turn your textbook concept into a 15-minute classroom activity using
            zero-cost materials.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={data.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Textbook Topic
            </label>
            <input
              type="text"
              name="topic"
              value={data.topic}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-semibold text-indigo-700 bg-indigo-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                <Users size={16} className="mr-1" /> Class Size
              </label>
              <input
                type="number"
                name="classSize"
                value={data.classSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                <Package size={16} className="mr-1" /> Available Materials
              </label>
              <input
                type="text"
                name="materials"
                value={data.materials}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Paper, pens, desks"
              />
            </div>
          </div>
        </div>

        <button
          onClick={next}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors shadow-sm"
        >
          <Lightbulb className="mr-2 h-5 w-5" />
          Generate Activity & Simulation
        </button>
      </div>
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Left Column: Mission Brief */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-indigo-400" /> Mission
              Brief
            </h3>
            <span className="bg-slate-700 text-xs px-2 py-1 rounded-md text-slate-300">
              15 mins
            </span>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-indigo-600 mb-2">
              The Warehouse Crisis
            </h4>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              <strong>Scenario to read to class:</strong> "You are engineers at
              an Amazon warehouse. A conveyor belt is broken, and we need to
              slide fragile packages down a ramp to the loading zone. If it
              slides too fast, it breaks. If it stops too early, it backs up the
              line."
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4 rounded-r-md">
              <h5 className="text-xs font-bold text-amber-800 uppercase mb-1">
                The Goal
              </h5>
              <p className="text-sm text-amber-900">
                Slide an eraser (package) down a tilted textbook (ramp) so it
                lands exactly in the target zone on the desk. Test 3 different
                surface materials.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2 text-slate-400" /> Teacher
            Instructions
          </h4>
          <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 marker:text-indigo-400">
            <li>Divide students into groups of 4.</li>
            <li>Have them tilt one textbook as a ramp.</li>
            <li>
              Ask them to lay down 3 surfaces at the bottom: Glossy book cover,
              rough scratch paper, and a cloth mask/handkerchief.
            </li>
            <li>Observe while they test the friction of each material.</li>
          </ul>
        </div>
      </div>

      {/* Right Column: Simulation */}
      <div className="lg:col-span-7">
        <FrictionSimulation />
      </div>
    </div>
  );
}

function AssessmentTab() {
  const [groups, setGroups] = useState([
    { id: 1, name: "Group 1 (Front Left)", tested: false, explained: false },
    { id: 2, name: "Group 2 (Front Right)", tested: false, explained: false },
    { id: 3, name: "Group 3 (Back Left)", tested: false, explained: false },
    { id: 4, name: "Group 4 (Back Right)", tested: false, explained: false },
  ]);

  const toggleCheck = (id, field) => {
    setGroups(
      groups.map((g) => (g.id === id ? { ...g, [field]: !g[field] } : g)),
    );
  };

  const totalChecks = groups.reduce(
    (acc, g) => acc + (g.tested ? 1 : 0) + (g.explained ? 1 : 0),
    0,
  );
  const maxChecks = groups.length * 2;
  const scorePercentage = Math.round((totalChecks / maxChecks) * 100);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Real-Time Observation Grid
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Walk the room and tap to assess application.
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center min-w-[140px]">
            <div className="text-3xl font-black text-indigo-600">
              {scorePercentage}%
            </div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
              Class Application
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>

        {/* Grid List */}
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="font-semibold text-slate-700 flex items-center">
                <Users size={18} className="mr-2 text-slate-400" />
                {group.name}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <button
                  onClick={() => toggleCheck(group.id, "tested")}
                  className={`flex items-center text-sm font-medium transition-colors ${group.tested ? "text-green-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {group.tested ? (
                    <CheckCircle2 className="mr-2 w-5 h-5" />
                  ) : (
                    <Circle className="mr-2 w-5 h-5" />
                  )}
                  Tested Multiple Surfaces
                </button>
                <button
                  onClick={() => toggleCheck(group.id, "explained")}
                  className={`flex items-center text-sm font-medium transition-colors ${group.explained ? "text-green-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {group.explained ? (
                    <CheckCircle2 className="mr-2 w-5 h-5" />
                  ) : (
                    <Circle className="mr-2 w-5 h-5" />
                  )}
                  Explained the "Why"
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors flex items-center mx-auto">
          <TrendingUp className="w-4 h-4 mr-2" /> Save Session & Generate Report
        </button>
      </div>
    </div>
  );
}

// --- SIMULATION COMPONENT ---

function FrictionSimulation() {
  const [surface, setSurface] = useState("rough");
  const [isPlaying, setIsPlaying] = useState(false);
  const [blockPos, setBlockPos] = useState(0); // 0 to 100 percentage

  const requestRef = useRef();
  const positionRef = useRef(0);
  const velocityRef = useRef(0);

  // Physics constraints
  // v0 = initial speed from ramp.
  // friction applies deceleration every frame.
  const surfaces = {
    glossy: {
      name: "Glossy Cover",
      friction: 0.035,
      color: "bg-blue-100",
      text: "Low Friction",
    },
    rough: {
      name: "Rough Paper",
      friction: 0.062,
      color: "bg-orange-100",
      text: "Medium Friction",
    },
    cloth: {
      name: "Cloth Mask",
      friction: 0.15,
      color: "bg-stone-300",
      text: "High Friction",
    },
  };

  const v0 = 2.5; // Initial velocity unit per frame
  const targetMin = 45;
  const targetMax = 65;

  const animate = () => {
    if (velocityRef.current > 0) {
      velocityRef.current -= surfaces[surface].friction;
      if (velocityRef.current < 0) velocityRef.current = 0; // stop completely

      positionRef.current += velocityRef.current;
      setBlockPos(positionRef.current);

      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  };

  const startSimulation = () => {
    // Reset positions
    cancelAnimationFrame(requestRef.current);
    positionRef.current = 0;
    velocityRef.current = v0;
    setBlockPos(0);
    setIsPlaying(true);

    // Start loop
    requestRef.current = requestAnimationFrame(animate);
  };

  const resetSimulation = () => {
    cancelAnimationFrame(requestRef.current);
    positionRef.current = 0;
    setBlockPos(0);
    setIsPlaying(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Determine outcome for feedback UI
  let outcome = null;
  if (!isPlaying && blockPos > 0) {
    if (blockPos < targetMin)
      outcome = {
        msg: "Stopped early! Too much friction.",
        color: "text-stone-600",
      };
    else if (blockPos > targetMax)
      outcome = {
        msg: "Flew past the target! Too little friction.",
        color: "text-blue-600",
      };
    else
      outcome = {
        msg: "Perfect landing! Right amount of friction.",
        color: "text-green-600",
      };
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center">
          <PlaySquare className="w-5 h-5 mr-2 text-indigo-500" /> Digital Twin
          Simulation
        </h3>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-center">
        {/* Environment Visualizer */}
        <div className="relative w-full h-48 bg-white border-2 border-slate-200 rounded-xl overflow-hidden mb-6 shadow-inner">
          {/* Sky/Wall background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white h-1/2"></div>

          {/* Surface Track */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/2 transition-colors duration-500 ${surfaces[surface].color} border-t-4 border-slate-300`}
          >
            {/* Pattern overlay for visual effect */}
            {surface === "rough" && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              ></div>
            )}
            {surface === "cloth" && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
                  backgroundPosition: "0 0, 10px 10px",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            )}
          </div>

          {/* Ramp Visual (Static on the left) */}
          <div className="absolute left-0 bottom-1/2 transform translate-y-[2px]">
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="0,0 80,60 0,60" fill="#94a3b8" />
            </svg>
          </div>

          {/* Target Zone */}
          <div
            className="absolute bottom-0 h-1/2 bg-green-400/30 border-l-2 border-r-2 border-green-500/50 flex flex-col justify-end pb-2 items-center"
            style={{
              left: `${targetMin}%`,
              width: `${targetMax - targetMin}%`,
            }}
          >
            <Target className="w-6 h-6 text-green-700 opacity-50 mb-1" />
            <span className="text-[10px] font-bold text-green-800 uppercase tracking-widest opacity-70">
              Target
            </span>
          </div>

          {/* Sliding Block (Eraser) */}
          <div
            className="absolute bottom-1/2 w-10 h-8 bg-pink-500 rounded shadow-md border border-pink-700 flex items-center justify-center transform -translate-y-0.5 z-10"
            style={{ left: `calc(80px + ${blockPos} * 0.7%)` }} // Offset by ramp width, scale to remaining area
          >
            <span className="text-[10px] text-white font-bold opacity-80">
              ERASER
            </span>
          </div>
        </div>

        {/* Feedback Area */}
        <div className="h-8 flex justify-center items-center mb-4">
          {outcome ? (
            <p
              className={`font-bold animate-in zoom-in duration-300 ${outcome.color}`}
            >
              {outcome.msg}
            </p>
          ) : (
            <p className="text-slate-400 text-sm">
              Select a surface and release the package.
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {Object.entries(surfaces).map(([key, data]) => (
              <button
                key={key}
                disabled={isPlaying}
                onClick={() => {
                  setSurface(key);
                  resetSimulation();
                }}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${surface === key ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"} ${isPlaying ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="font-semibold text-slate-800 text-sm">
                  {data.name}
                </span>
                <span className="text-xs text-slate-500 mt-1">{data.text}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={startSimulation}
              disabled={isPlaying}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center"
            >
              <PlaySquare className="mr-2 w-5 h-5" /> Release Package
            </button>
            <button
              onClick={resetSimulation}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-4 rounded-lg transition-colors"
              title="Reset Position"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
        isActive
          ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
          : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
      }`}
    >
      <span
        className={`mr-2 ${isActive ? "text-indigo-600" : "text-slate-400"}`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
