import React, { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  en: {
    langName: 'English',
    badge: 'K-12 MVP',
    nav: {
      dashboard: 'Dashboard',
      library: 'Mission Library',
      builder: 'AI Generator',
      materials: 'Zero-Cost Kit',
      history: 'Assessments',
      buildMission: 'Build Mission',
    },
    hero: {
      tag: 'K-12 Hackathon Solution · Moving from Rote to Application',
      title1: 'Stop memorizing definitions.',
      title2: 'Start applying science.',
      desc: 'ApplyIt empowers teachers to convert textbook concepts into 15-minute hands-on missions using ₹0 classroom scrap, digital twins, and Bloom\'s Taxonomy rubrics.',
      startBtn: 'Launch Ready Mission',
      generateBtn: 'Generate from Topic',
      kitBtn: 'Zero-Cost Kit',
    },
    pillars: {
      timeTitle: '15-Minute Classroom Fit',
      timeDesc: 'Designed for standard 45-minute school periods. Zero lab prep, quick tactile activity, instant wrap-up.',
      costTitle: 'Zero-Cost Scrap Kit',
      costDesc: 'Uses everyday items: erasers, rulers, water bottles, foil, and turmeric. No expensive lab budget needed.',
      bloomTitle: "Bloom's Taxonomy Rubrics",
      bloomDesc: 'Assess deep understanding beyond rote memory. Evaluates application, analytical thinking, and problem solving.',
    },
    parentNotice: {
      btnLabel: 'Notify Parents (WhatsApp)',
      modalTitle: 'Parent Prep Reminder Broadcast',
      modalSubtitle: 'Send a night-before message so students bring ₹0 scrap items tomorrow',
      selectLang: 'Message Language:',
      shareWhatsApp: 'Send via WhatsApp',
      copyText: 'Copy Message Text',
      printSlip: 'Print Circular Slip',
      copied: 'Copied to Clipboard!',
      materialsNoticeTitle: 'Materials Needed from Home (Zero-Cost):',
      reminderSentBadge: 'Parent Notice Dispatched',
      previewHeading: 'Message Preview:',
      dearParents: 'Dear Parents, tomorrow in Science class, we are conducting a hands-on activity on',
      request: 'Kindly send these simple household items with your child tomorrow:',
      note: 'Note: These are zero-cost daily household items. No special purchases required! Thank you for supporting practical learning.',
    },
    dashboard: {
      curatedMissions: 'Curated Curriculum Missions',
      curatedSubtitle: 'Each mission includes a real-world scenario, 15-minute activity, digital twin, and assessment rubric',
      viewAll: 'View All',
      howItWorks: 'How ApplyIt Works in a Busy Classroom',
      workflowTag: 'Teacher Workflow in 3 Simple Steps',
      step1Title: 'Hook & Narrative Setup (2 mins)',
      step1Desc: 'Teacher reads the crisis scenario. Students form teams of 4 with a clear tactile objective.',
      step2Title: 'Hands-on Investigation (10 mins)',
      step2Desc: 'Using zero-cost desk scrap, students test physical parameters and compare with digital twin simulations.',
      step3Title: 'Tap-to-Assess Observation (3 mins)',
      step3Desc: 'Teacher walks the aisles and taps the observation grid to record Bloom\'s application.',
      recentSessions: 'Recent Classroom Sessions',
      allSessions: 'All Sessions',
      mins: 'm',
      teach: 'Teach',
    },
    common: {
      physics: 'Physics',
      biology: 'Biology',
      chemistry: 'Chemistry',
      geography: 'Geography',
      grade: 'Grade',
      duration: 'min',
      groupsOf: 'Groups of',
      launchSession: 'Launch Session',
      back: 'Back',
    }
  },
  kn: {
    langName: 'ಕನ್ನಡ',
    badge: 'ಕೆ-12 ಪರಿಹಾರ',
    nav: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      library: 'ಮಿಷನ್ ಲೈಬ್ರರಿ',
      builder: 'AI ಜನರೇಟರ್',
      materials: 'ಉಚಿತ ಸಾಮಗ್ರಿ ಕಿಟ್',
      history: 'ಮೌಲ್ಯಮಾಪನ',
      buildMission: 'ಹೊಸ ಮಿಷನ್',
    },
    hero: {
      tag: 'ಕೆ-12 ಹ್ಯಾಕಥಾನ್ ಪರಿಹಾರ · ಕಂಠಪಾಠದಿಂದ ನೈಜ ಅನ್ವಯಿಕ ಕಲಿಕೆಯತ್ತ',
      title1: 'ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಕಂಠಪಾಠ ಮಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ.',
      title2: 'ವಿಜ್ಞಾನವನ್ನು ಪ್ರಯೋಗಿಸಲು ಪ್ರಾರಂಭಿಸಿ.',
      desc: 'ಅಪ್ಲೈಇಟ್ (ApplyIt) ಶಿಕ್ಷಕರಿಗೆ ಪಠ್ಯಪುಸ್ತಕದ ಸಿದ್ಧಾಂತಗಳನ್ನು ₹0 ವೆಚ್ಚದ ವಸ್ತುಗಳು, ಡಿಜಿಟಲ್ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಮತ್ತು ಬ್ಲೂಮ್ಸ್ ಟ್ಯಾಕ್ಸಾನಮಿ ಮೂಲಕ 15 ನಿಮಿಷಗಳ ಪ್ರಾಯೋಗಿಕ ಮಿಷನ್‌ಗಳನ್ನಾಗಿ ಪರಿವರ್ತಿಸಲು ಶಕ್ತಿ ನೀಡುತ್ತದೆ.',
      startBtn: 'ಸಿದ್ಧ ಮಿಷನ್ ಪ್ರಾರಂಭಿಸಿ',
      generateBtn: 'ಪಾಠದಿಂದ ರಚಿಸಿ',
      kitBtn: 'ಉಚಿತ ಕಿಟ್ ನೋಡಿ',
    },
    pillars: {
      timeTitle: '15-ನಿಮಿಷದ ತರಗತಿ ಹೊಂದಾಣಿಕೆ',
      timeDesc: '45 ನಿಮಿಷಗಳ ಶಾಲಾ ಅವಧಿಗೆ ಸೂಕ್ತವಾಗಿದೆ. ಪ್ರಯೋಗಾಲಯದ ಅಗತ್ಯವಿಲ್ಲ, ವೇಗದ ಚಟುವಟಿಕೆ ಮತ್ತು ತಕ್ಷಣದ ಸಾರಾಂಶ.',
      costTitle: 'ಶೂನ್ಯ-ವೆಚ್ಚದ ಮನೆ ಸಾಮಗ್ರಿಗಳು',
      costDesc: 'ದೈನಂದಿನ ವಸ್ತುಗಳನ್ನು ಬಳಸುತ್ತದೆ: ರಬ್ಬರ್, ಅಳತೆಗೋಲು, ಬಾಟಲಿ, ಅರಿಶಿನ. ದುಬಾರಿ ಲ್ಯಾಬ್ ಬಜೆಟ್ ಅಗತ್ಯವಿಲ್ಲ.',
      bloomTitle: 'ಬ್ಲೂಮ್ಸ್ ಟ್ಯಾಕ್ಸಾನಮಿ ಮೌಲ್ಯಮಾಪನ',
      bloomDesc: 'ಕೇವಲ ಪರೀಕ್ಷಾ ಅಂಕಗಳ ಬದಲು ವಿದ್ಯಾರ್ಥಿಗಳ ಅನ್ವಯಿಕ ತಿಳುವಳಿಕೆ ಮತ್ತು ನೈಜ ಸಮಸ್ಯೆ ಪರಿಹಾರ ಸಾಮರ್ಥ್ಯವನ್ನು ಅಳೆಯಿರಿ.',
    },
    parentNotice: {
      btnLabel: 'ಪೋಷಕರಿಗೆ ಸಂದೇಶ (WhatsApp)',
      modalTitle: 'ಪೋಷಕರ ಸಾಮಗ್ರಿ ಪೂರ್ವ ಸಿದ್ಧತಾ ಸೂಚನೆ',
      modalSubtitle: 'ನಾಳೆಯ ಚಟುವಟಿಕೆಗೆ ₹0 ವೆಚ್ಚದ ಸಾಮಗ್ರಿ ತರಲು ಪೋಷಕರಿಗೆ ಮುಂಚಿತವಾಗಿ ಸಂದೇಶ ಕಳುಹಿಸಿ',
      selectLang: 'ಸಂದೇಶದ ಭಾಷೆ:',
      shareWhatsApp: 'WhatsApp ಮೂಲಕ ಕಳುಹಿಸಿ',
      copyText: 'ಸಂದೇಶ ನಕಲಿಸಿ (Copy)',
      printSlip: 'ಮುದ್ರಿತ ಸ್ಲಿಪ್ (Print)',
      copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
      materialsNoticeTitle: 'ಮನೆಯಿಂದ ತರಬೇಕಾದ ಸರಳ ಸಾಮಗ್ರಿಗಳು (ಉಚಿತ):',
      reminderSentBadge: 'ಪೋಷಕರಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ',
      previewHeading: 'ಸಂದೇಶದ ಮುನ್ನೋಟ:',
      dearParents: 'ಆತ್ಮೀಯ ಪೋಷಕರೇ, ನಾಳೆ ವಿಜ್ಞಾನ ತರಗತಿಯಲ್ಲಿ ನಾವು ಈ ವಿಷಯದ ಮೇಲೆ ಪ್ರಾಯೋಗಿಕ ಚಟುವಟಿಕೆ ನಡೆಸುತ್ತಿದ್ದೇವೆ:',
      request: 'ದಯವಿಟ್ಟು ನಾಳೆ ನಿಮ್ಮ ಮಗುವಿನೊಂದಿಗೆ ಈ ಕೆಳಗಿನ ಸರಳ ಮನೆ ಸಾಮಗ್ರಿಗಳನ್ನು ಕಳುಹಿಸಿಕೊಡಿ:',
      note: 'ಸೂಚನೆ: ಇವು ಸಂಪೂರ್ಣ ಉಚಿತ ದೈನಂದಿನ ಗೃಹ ವಸ್ತುಗಳು. ಯಾವುದೇ ಹೊಸ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ! ಮಕ್ಕಳ ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಗೆ ಬೆಂಬಲ ನೀಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.',
    },
    dashboard: {
      curatedMissions: 'ಪಠ್ಯಕ್ರಮ ಆಧಾರಿತ ಸಿದ್ಧ ಮಿಷನ್‌ಗಳು',
      curatedSubtitle: 'ಪ್ರತಿ ಮಿಷನ್‌ನಲ್ಲಿ ನೈಜ ಜಗತ್ತಿನ ಸನ್ನಿವೇಶ, 15 ನಿಮಿಷಗಳ ಚಟುವಟಿಕೆ, ಡಿಜಿಟಲ್ ಸಿಮ್ಯುಲೇಟರ್ ಮತ್ತು ಮೌಲ್ಯಮಾಪನವಿದೆ',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
      howItWorks: 'ತರಗತಿಯಲ್ಲಿ ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      workflowTag: '3 ಸರಳ ಹಂತಗಳಲ್ಲಿ ಶಿಕ್ಷಕರ ಕಾರ್ಯವಿಧಾನ',
      step1Title: 'ಕಥೆ ಮತ್ತು ಸನ್ನಿವೇಶ (2 ನಿಮಿಷ)',
      step1Desc: 'ಶಿಕ್ಷಕರು ನೈಜ ಸಮಸ್ಯೆ ಸನ್ನಿವೇಶವನ್ನು ಓದುತ್ತಾರೆ. ವಿದ್ಯಾರ್ಥಿಗಳು 4 ಜನರ ತಂಡಗಳಾಗಿ ವಿಂಗಡಿಸಲ್ಪಡುತ್ತಾರೆ.',
      step2Title: 'ಪ್ರಾಯೋಗಿಕ ಸಂಶೋಧನೆ (10 ನಿಮಿಷ)',
      step2Desc: 'ಶೂನ್ಯ ವೆಚ್ಚದ ವಸ್ತುಗಳನ್ನು ಬಳಸಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ರಯೋಗಿಸುತ್ತಾರೆ ಮತ್ತು ಡಿಜಿಟಲ್ ಸಿಮ್ಯುಲೇಶನ್ ಜೊತೆ ಹೋಲಿಸುತ್ತಾರೆ.',
      step3Title: 'ವೀಕ್ಷಣಾ ಮೌಲ್ಯಮಾಪನ (3 ನಿಮಿಷ)',
      step3Desc: 'ಶಿಕ್ಷಕರು ತರಗತಿಯಲ್ಲಿ ನಡೆದಾಡುತ್ತಾ ಟ್ಯಾಪ್ ಮಾಡಿ ಬ್ಲೂಮ್ಸ್ ಮಟ್ಟದ ತಿಳುವಳಿಕೆಯನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ.',
      recentSessions: 'ಇತ್ತೀಚಿನ ತರಗತಿ ಅವಧಿಗಳು',
      allSessions: 'ಎಲ್ಲಾ ಅವಧಿಗಳು',
      mins: 'ನಿ',
      teach: 'ಬೋಧಿಸಿ',
    },
    common: {
      physics: 'ಭೌತಶಾಸ್ತ್ರ',
      biology: 'ಜೀವಶಾಸ್ತ್ರ',
      chemistry: 'ರಸಾಯನಶಾಸ್ತ್ರ',
      geography: 'ಭೂಗೋಳಶಾಸ್ತ್ರ',
      grade: 'ತರಗತಿ',
      duration: 'ನಿಮಿಷ',
      groupsOf: 'ತಂಡಗಳು:',
      launchSession: 'ತರಗತಿ ಪ್ರಾರಂಭಿಸಿ',
      back: 'ಹಿಂದಕ್ಕೆ',
    }
  },
  hi: {
    langName: 'हिंदी',
    badge: 'K-12 समाधान',
    nav: {
      dashboard: 'डैशबोर्ड',
      library: 'मिशन लाइब्रेरी',
      builder: 'AI जनरेटर',
      materials: 'ज़ीरो-कॉस्ट किट',
      history: 'मूल्यांकन',
      buildMission: 'नया मिशन',
    },
    hero: {
      tag: 'K-12 हैकथॉन समाधान · रटने से वास्तविक अनुप्रयोग की ओर',
      title1: 'परिभाषाओं को रटना बंद करें।',
      title2: 'विज्ञान को प्रयोग में लाना शुरू करें।',
      desc: 'ApplyIt शिक्षकों को ₹0 लागत की घरेलू सामग्री, डिजिटल सिमुलेटर और ब्लूम्स टैक्सोनॉमी रूब्रिक्स के साथ 15-मिनट के व्यावहारिक मिशनों में बदलने की शक्ति देता है।',
      startBtn: 'तैयार मिशन शुरू करें',
      generateBtn: 'पाठ से जनरेट करें',
      kitBtn: 'ज़ीरो-कॉस्ट किट',
    },
    pillars: {
      timeTitle: '15-मिनट की कक्षा में सटीक फिट',
      timeDesc: 'मानक 45-मिनट के स्कूल पीरियड के लिए डिज़ाइन किया गया। बिना लैब तैयारी, तुरंत व्यावहारिक गतिविधि और समीक्षा।',
      costTitle: 'शून्य-लागत घरेलू सामग्री',
      costDesc: 'दैनिक वस्तुओं का उपयोग: रबर, स्केल, खाली बोतलें, पन्नी, और हल्दी। महंगे लैब बजट की कोई ज़रूरत नहीं।',
      bloomTitle: 'ब्लूम्स टैक्सोनॉमी मूल्यांकन',
      bloomDesc: 'रटने की परीक्षा से आगे बढ़कर अवधारणा की वास्तविक समझ, अनुप्रयोग और समस्या समाधान क्षमता को मापें।',
    },
    parentNotice: {
      btnLabel: 'अभिभावकों को संदेश (WhatsApp)',
      modalTitle: 'अभिभावक सामग्री पूर्व-तैयारी सूचना',
      modalSubtitle: 'कल की गतिविधि के लिए ₹0 घरेलू सामग्री लाने हेतु एक दिन पहले संदेश भेजें',
      selectLang: 'संदेश की भाषा:',
      shareWhatsApp: 'WhatsApp द्वारा भेजें',
      copyText: 'संदेश कॉपी करें (Copy)',
      printSlip: 'प्रिंट नोटिस स्लिप',
      copied: 'कॉपी हो गया!',
      materialsNoticeTitle: 'घर से लाने योग्य सामान्य सामग्री (शून्य लागत):',
      reminderSentBadge: 'अभिभावक सूचना भेजी गई',
      previewHeading: 'संदेश का पूर्वावलोकन:',
      dearParents: 'आदरणीय अभिभावक, कल विज्ञान कक्षा में हम इस विषय पर एक व्यावहारिक गतिविधि कर रहे हैं:',
      request: 'कृपया कल अपने बच्चे के साथ घर से ये सामान्य वस्तुएं भिजवाने में सहयोग करें:',
      note: 'नोट: ये पूरी तरह से घर में उपलब्ध शून्य-लागत वस्तुएं हैं। कोई भी नई वस्तु खरीदने की आवश्यकता नहीं है! प्रयोगात्मक शिक्षा में सहयोग के लिए धन्यवाद।',
    },
    dashboard: {
      curatedMissions: 'पाठ्यक्रम आधारित तैयार मिशन',
      curatedSubtitle: 'प्रत्येक मिशन में वास्तविक जीवन परिदृश्य, 15-मिनट गतिविधि, डिजिटल सिमुलेटर और मूल्यांकन शामिल है',
      viewAll: 'सभी देखें',
      howItWorks: 'व्यस्त कक्षा में यह कैसे काम करता है',
      workflowTag: '3 आसान चरणों में शिक्षक वर्कफ़्लो',
      step1Title: 'कहानी और परिदृश्य (2 मिनट)',
      step1Desc: 'शिक्षक वास्तविक समस्या परिदृश्य सुनाते हैं। छात्र 4-4 के समूहों में लक्ष्य तय करते हैं।',
      step2Title: 'हाथों से व्यावहारिक प्रयोग (10 मिनट)',
      step2Desc: 'शून्य-लागत सामग्री से छात्र भौतिक प्रयोग करते हैं और डिजिटल ट्विन स्क्रीन से तुलना करते हैं।',
      step3Title: 'टैप-टू-असेस अवलोकन (3 मिनट)',
      step3Desc: 'शिक्षक घूमते हुए ऐप में टैप करके ब्लूम्स स्तर के अनुप्रयोग का मूल्यांकन दर्ज करते हैं।',
      recentSessions: 'हालिया कक्षा सत्र',
      allSessions: 'सभी सत्र',
      mins: 'मि.',
      teach: 'पढ़ाएं',
    },
    common: {
      physics: 'भौतिकी',
      biology: 'जीव विज्ञान',
      chemistry: 'रसायन विज्ञान',
      geography: 'भूगोल',
      grade: 'कक्षा',
      duration: 'मिनट',
      groupsOf: 'समूह:',
      launchSession: 'सत्र शुरू करें',
      back: 'वापस',
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('c2r_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      try {
        localStorage.setItem('c2r_lang', newLang);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
