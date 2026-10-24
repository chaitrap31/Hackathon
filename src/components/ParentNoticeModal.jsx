import { useState } from 'react';
import {
  MessageSquare,
  X,
  Share2,
  Copy,
  Printer,
  Check,
  Send,
  Package,
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

export default function ParentNoticeModal({ mission, onClose, onSent }) {
  const { lang: currentGlobalLang, t } = useLanguage();
  const [msgLang, setMsgLang] = useState(currentGlobalLang || 'en');
  const [copied, setCopied] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState(
    mission?.materials || ['Plastic ruler', 'Eraser', 'Scrap paper']
  );
  const [teacherName, setTeacherName] = useState('Science Teacher');
  const [className, setClassName] = useState('Grade 7-B');
  const [activityDate, setActivityDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const langPack = translations[msgLang] || translations.en;
  const p = langPack.parentNotice;

  const toggleMaterial = (m) => {
    if (selectedMaterials.includes(m)) {
      setSelectedMaterials(selectedMaterials.filter((item) => item !== m));
    } else {
      setSelectedMaterials([...selectedMaterials, m]);
    }
  };

  // Build the message text in the selected language
  const formattedDate = new Date(activityDate).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  let messageBody = '';
  if (msgLang === 'kn') {
    messageBody = `📢 *ಶಾಲಾ ಪೂರ್ವಸಿದ್ಧತಾ ಪ್ರಕಟಣೆ - ಪ್ರಾಯೋಗಿಕ ಕಲಿಕಾ ಮಿಷನ್* 🔬\n\n` +
      `ನಮಸ್ಕಾರ ಪೋಷಕರೇ, \n` +
      `ನಾಳೆ (${formattedDate}) ${className} ತರಗತಿಯ ವಿಜ್ಞಾನ ಅವಧಿಯಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಕಂಠಪಾಠದ ಬದಲು ನೈಜ ಪ್ರಾಯೋಗಿಕ ಅನುಭವ ನೀಡಲು *"${mission?.title || mission?.topic}"* ಚಟುವಟಿಕೆಯನ್ನು ನಡೆಸುತ್ತಿದ್ದೇವೆ.\n\n` +
      `📦 *ದಯವಿಟ್ಟು ನಾಳೆ ಮಗುವಿನೊಂದಿಗೆ ಈ ಕೆಳಗಿನ ಮನೆಯಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸರಳ ವಸ್ತುಗಳನ್ನು ಕಳುಹಿಸಿಕೊಡಿ:*\n` +
      selectedMaterials.map((m, i) => `   ${i + 1}. ${m}`).join('\n') +
      `\n\n💡 *ಗಮನಿಸಿ:* ಇವು ಸಂಪೂರ್ಣ ಶೂನ್ಯ-ವೆಚ್ಚದ ಗೃಹ ವಸ್ತುಗಳು. ಯಾವುದೇ ಹೊಸ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಬೆಂಬಲಕ್ಕೆ ಧನ್ಯವಾದಗಳು!\n\n` +
      `— ${teacherName}, ವಿಜ್ಞಾನ ವಿಭಾಗ`;
  } else if (msgLang === 'hi') {
    messageBody = `📢 *स्कूल गतिविधि पूर्व-सूचना - प्रायोगिक विज्ञान मिशन* 🔬\n\n` +
      `आदरणीय अभिभावक, \n` +
      `कल (${formattedDate}) ${className} की विज्ञान कक्षा में बच्चों को रटने की जगह व्यावहारिक समझ देने हेतु *"${mission?.title || mission?.topic}"* गतिविधि कराई जा रही है।\n\n` +
      `📦 *कृपया कल अपने बच्चे के साथ घर पर उपलब्ध ये सामान्य सामग्री भिजवाएं:*\n` +
      selectedMaterials.map((m, i) => `   ${i + 1}. ${m}`).join('\n') +
      `\n\n💡 *विशेष नोट:* ये घर में उपलब्ध शून्य-लागत की वस्तुएं हैं। कोई भी नई सामग्री खरीदने की आवश्यकता नहीं है। प्रायोगिक शिक्षा में सहयोग के लिए धन्यवाद!\n\n` +
      `— ${teacherName}, विज्ञान शिक्षक`;
  } else {
    messageBody = `📢 *Classroom Activity Notice - Practical Science Mission* 🔬\n\n` +
      `Dear Parents,\n` +
      `Tomorrow (${formattedDate}) in ${className} Science class, we are conducting a hands-on experiential mission on *"${mission?.title || mission?.topic}"* to move beyond textbook memorization.\n\n` +
      `📦 *Please send these zero-cost household items with your child tomorrow:*\n` +
      selectedMaterials.map((m, i) => `   ${i + 1}. ${m}`).join('\n') +
      `\n\n💡 *Note:* These are ₹0 everyday scrap items from home. No purchases needed! Thank you for supporting practical learning.\n\n` +
      `— ${teacherName}, Science Dept`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(messageBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageBody)}`;
    window.open(url, '_blank');
    if (onSent) onSent();
  };

  const handlePrint = () => {
    window.print();
    if (onSent) onSent();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {p.modalTitle}
              </h3>
              <p className="text-[11px] text-stone-500">
                {p.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Language Selector for the Notice */}
          <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {p.selectLang}
            </span>
            <div className="flex gap-1.5">
              {[
                { code: 'en', label: 'English' },
                { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                { code: 'hi', label: 'हिंदी (Hindi)' }
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setMsgLang(l.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    msgLang === l.code
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Details Customizer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 font-medium mb-1">Class / Cohort</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-medium mb-1">Teacher / Department</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-medium mb-1">Activity Date</label>
              <input
                type="date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Materials checklist */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Select Materials to Request from Parents:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(mission?.materials || ['Plastic ruler', 'Eraser', 'Scrap paper']).map((mat, i) => {
                const active = selectedMaterials.includes(mat);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleMaterial(mat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                        : 'bg-stone-50 text-stone-500 border-stone-200 opacity-60 line-through'
                    }`}
                  >
                    {active ? '✓ ' : '+ '} {mat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-stone-700">
                {p.previewHeading}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Ready for Parent WhatsApp Group
              </span>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 font-sans text-xs text-stone-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-48 overflow-y-auto">
              {messageBody}
            </div>
          </div>

          {/* Reassurance Callout */}
          <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Cost Principle:</strong> Parents are never asked to spend money. Sending messages the night before ensures high student participation even in low-resource schools.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? p.copied : p.copyText}
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              {p.printSlip}
            </button>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            {p.shareWhatsApp}
          </button>
        </div>
      </div>
    </div>
  );
}
