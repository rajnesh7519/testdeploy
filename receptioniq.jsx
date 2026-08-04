import React, { useState, useMemo } from "react";
import {
  Stethoscope, MapPin, Phone, Mail, Clock, MessageCircle, X, Send,
  Building2, ShieldAlert, CalendarCheck, UserPlus, ChevronRight,
  Globe, Type, Eye, CheckCircle2, Ban, Download, ArrowLeft, LayoutDashboard,
  Sparkles, Bot, Navigation, Users, Megaphone, Plus, Trash2, Circle,
  ExternalLink, LayoutGrid, BadgeCheck, PhoneCall
} from "lucide-react";

/* ----------------------------- design tokens ----------------------------- */
const FONT_DISPLAY = "'Manrope', 'Noto Sans Devanagari', system-ui, sans-serif";
const FONT_BODY = "'Inter', 'Noto Sans Devanagari', system-ui, sans-serif";
const glass = (opacity = 0.72) => ({
  backgroundColor: `rgba(255,255,255,${opacity})`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
});
const brandGrad = "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)";

/* --------------------------------- i18n ----------------------------------- */
const STR = {
  en: {
    brand: "ReceptionIQ", tagline: "One Smart Receptionist. Multiple Hospitals.",
    heroSub: "AI-powered hospital receptionist that helps patients instantly find information, book appointments, and navigate hospitals — without waiting on hold.",
    heroKicker: "AI-powered · Multi-hospital network",
    chooseHospital: "Choose Hospital", chatWithAI: "Chat with AI",
    hospitalsTitle: "Choose Your Hospital", hospitalsSub: "Each hospital runs its own portal — own doctors, schedules, and knowledge base.",
    openPortal: "Open Hospital Portal", adminLogin: "Hospital Staff — Admin CMS",
    back: "All hospitals", emergencyLabel: "Emergency", callNow: "Call now",
    contact: "Contact", hours: "Hours", departments: "Departments & Services",
    location: "Location & Directions", getDirections: "Get directions", opensNewTab: "Opens in a new tab",
    doctorsTitle: "Our Doctors", doctorsCount: "specialists listed",
    doctorsEmpty: "No doctors have been added for this hospital yet.",
    doctorsEmptySub: "Verified doctor profiles will appear here once a hospital administrator adds them through the CMS.",
    openAdmin: "Open Admin CMS (demo)", bookTitle: "Book an Appointment",
    selectDept: "1. Select department", selectDoctor: "2. Select doctor",
    selectDate: "3. Select date", selectSlot: "4. Select an available time",
    noDoctorDept: "No doctors listed in this department yet. Add one from the Admin CMS to try booking.",
    pickDeptFirst: "Pick a department to see available doctors.",
    scheduleNotPublished: "This doctor's OPD schedule hasn't been published yet. Please call reception to book directly.",
    available: "Available", booked: "Booked", unavailable: "Unavailable",
    patientName: "Full name", patientPhone: "Phone number", confirmBooking: "Confirm appointment",
    bookingConfirmed: "Appointment confirmed", downloadSlip: "Download appointment slip",
    blueprintTitle: "Find Your Way Inside", blueprintSub: "General wayfinding — every hospital wing links back to these anchor points.",
    announcementsTitle: "Announcements", announcementsEmpty: "No announcements published yet.",
    chatTitle: "ReceptionIQ Assistant", chatDisclaimer: "Administrative assistance only — not medical advice.",
    chatPlaceholder: "Ask about hours, doctors, directions…", chatChooseFirst: "Choose a hospital first so I can look up the right information.",
    adminTitle: "Admin CMS", adminSub: "Demo mode — no login required. Changes apply to this browser session only.",
    adminOverview: "Overview", adminDoctors: "Doctors", adminAnnouncements: "Announcements",
    addDoctor: "Add a doctor", docName: "Doctor's name", docQual: "Title / specialization",
    docDept: "Department", docExp: "Years of experience (optional)", docFee: "Consultation fee, NPR (optional)",
    docDays: "Available days", docStart: "Start time", docEnd: "End time", docSlot: "Slot length (minutes)",
    saveDoctor: "Add to directory", publishAnnouncement: "Publish announcement",
    annTitleField: "Title", annBody: "Details", publish: "Publish",
    sessionStats: "This session", apptsBooked: "Appointments booked", aiMessages: "AI messages exchanged",
    doctorsAdded: "Doctors in directory", noHospitalSelected: "Select a hospital above to manage its content.",
    selectHospitalLabel: "Managing hospital",
    disclaimerBanner: "ReceptionIQ provides administrative assistance only and does not provide medical advice.",
    fontSize: "Text size", contrast: "High contrast", language: "नेपाली",
    remove: "Remove", currentDirectory: "Current directory",
  },
  np: {
    brand: "ReceptionIQ", tagline: "एउटै स्मार्ट रिसेप्सनिस्ट। धेरै अस्पताल।",
    heroSub: "AI सहायताले बिरामीहरूलाई तुरुन्तै जानकारी फेला पार्न, अपोइन्टमेन्ट बुक गर्न, र अस्पताल भित्र बाटो पत्ता लगाउन मद्दत गर्छ — फोनमा कुर्नु नपरी।",
    heroKicker: "AI-संचालित · बहु-अस्पताल नेटवर्क",
    chooseHospital: "अस्पताल छान्नुहोस्", chatWithAI: "AI सँग कुरा गर्नुहोस्",
    hospitalsTitle: "आफ्नो अस्पताल छान्नुहोस्", hospitalsSub: "प्रत्येक अस्पतालको आफ्नै पोर्टल हुन्छ — आफ्नै डाक्टर, तालिका, र ज्ञान आधार।",
    openPortal: "अस्पताल पोर्टल खोल्नुहोस्", adminLogin: "अस्पताल स्टाफ — एडमिन CMS",
    back: "सबै अस्पताल", emergencyLabel: "आपतकालीन", callNow: "अहिले फोन गर्नुहोस्",
    contact: "सम्पर्क", hours: "समय", departments: "विभाग र सेवाहरू",
    location: "स्थान र दिशा", getDirections: "बाटो हेर्नुहोस्", opensNewTab: "नयाँ ट्याबमा खुल्छ",
    doctorsTitle: "हाम्रा डाक्टरहरू", doctorsCount: "विशेषज्ञ सूचीकृत",
    doctorsEmpty: "यस अस्पतालका लागि अझै कुनै डाक्टर थपिएको छैन।",
    doctorsEmptySub: "अस्पताल प्रशासकले CMS मार्फत थपेपछि प्रमाणित डाक्टर प्रोफाइलहरू यहाँ देखा पर्नेछन्।",
    openAdmin: "एडमिन CMS खोल्नुहोस् (डेमो)", bookTitle: "अपोइन्टमेन्ट बुक गर्नुहोस्",
    selectDept: "१. विभाग छान्नुहोस्", selectDoctor: "२. डाक्टर छान्नुहोस्",
    selectDate: "३. मिति छान्नुहोस्", selectSlot: "४. उपलब्ध समय छान्नुहोस्",
    noDoctorDept: "यस विभागमा अझै कुनै डाक्टर छैन। बुकिङ हेर्न एडमिन CMS बाट एक थप्नुहोस्।",
    pickDeptFirst: "उपलब्ध डाक्टरहरू हेर्न विभाग छान्नुहोस्।",
    scheduleNotPublished: "यस डाक्टरको ओपीडी तालिका अझै प्रकाशित छैन। कृपया सिधै बुक गर्न रिसेप्सनमा फोन गर्नुहोस्।",
    available: "उपलब्ध", booked: "बुक भइसक्यो", unavailable: "उपलब्ध छैन",
    patientName: "पूरा नाम", patientPhone: "फोन नम्बर", confirmBooking: "अपोइन्टमेन्ट पक्का गर्नुहोस्",
    bookingConfirmed: "अपोइन्टमेन्ट पक्का भयो", downloadSlip: "अपोइन्टमेन्ट स्लिप डाउनलोड गर्नुहोस्",
    blueprintTitle: "भित्र बाटो पत्ता लगाउनुहोस्", blueprintSub: "सामान्य दिशा निर्देशन — हरेक विंग यी मुख्य बिन्दुहरूसँग जोडिन्छ।",
    announcementsTitle: "सूचनाहरू", announcementsEmpty: "अझै कुनै सूचना प्रकाशित छैन।",
    chatTitle: "ReceptionIQ सहायक", chatDisclaimer: "प्रशासनिक सहायता मात्र — मेडिकल सल्लाह होइन।",
    chatPlaceholder: "समय, डाक्टर, दिशाको बारे सोध्नुहोस्…", chatChooseFirst: "सही जानकारी खोज्न पहिले अस्पताल छान्नुहोस्।",
    adminTitle: "एडमिन CMS", adminSub: "डेमो मोड — लगइन आवश्यक छैन। परिवर्तनहरू यही ब्राउजर सत्रमा मात्र लागू हुन्छन्।",
    adminOverview: "अवलोकन", adminDoctors: "डाक्टरहरू", adminAnnouncements: "सूचनाहरू",
    addDoctor: "डाक्टर थप्नुहोस्", docName: "डाक्टरको नाम", docQual: "पद / विशेषज्ञता",
    docDept: "विभाग", docExp: "अनुभवका वर्षहरू (वैकल्पिक)", docFee: "परामर्श शुल्क, रु. (वैकल्पिक)",
    docDays: "उपलब्ध दिनहरू", docStart: "सुरु समय", docEnd: "अन्त्य समय", docSlot: "स्लट लम्बाइ (मिनेट)",
    saveDoctor: "डाइरेक्टरीमा थप्नुहोस्", publishAnnouncement: "सूचना प्रकाशित गर्नुहोस्",
    annTitleField: "शीर्षक", annBody: "विवरण", publish: "प्रकाशित गर्नुहोस्",
    sessionStats: "यो सत्र", apptsBooked: "बुक भएका अपोइन्टमेन्ट", aiMessages: "AI सन्देशहरू",
    doctorsAdded: "डाइरेक्टरीमा डाक्टरहरू", noHospitalSelected: "सामग्री व्यवस्थापन गर्न माथिबाट अस्पताल छान्नुहोस्।",
    selectHospitalLabel: "व्यवस्थापन गरिँदै",
    disclaimerBanner: "ReceptionIQ ले प्रशासनिक सहायता मात्र दिन्छ र मेडिकल सल्लाह दिँदैन।",
    fontSize: "अक्षर साइज", contrast: "उच्च कन्ट्रास्ट", language: "English",
    remove: "हटाउनुहोस्", currentDirectory: "हालको डाइरेक्टरी",
  },
};

/* ----------------------------- hospital data ------------------------------ */
/* Contact, hours, department and doctor details are sourced from each
   hospital's official website / staff listing. No specialties, fees,
   experience or schedules are fabricated — fields the source didn't
   provide are left unset rather than guessed. */
const HOSPITALS_BASE = {
  "ktm-ent": {
    id: "ktm-ent",
    name: "Kathmandu ENT Hospital",
    tagline: "Ear, Nose, Throat & Neck Specialty Hospital",
    logo: "https://ktmenthospital.com.np/wp-content/uploads/2024/02/cropped-WhatsApp-Image-2024-02-01-at-6.50.47-PM-270x270.jpeg",
    description: "A dedicated ENT, hearing and throat-care hospital in central Kathmandu, offering specialist consultations, in-house diagnostics and a round-the-clock emergency line for ear, nose and throat concerns.",
    address: "Adwait Marg, Purano Buspark, Bagbazar, Kathmandu",
    phones: ["01-5915554", "01-5326730", "01-5345554", "01-5916730"],
    mobile: "+977-9714509717",
    email: "info@ktmenthospital.com.np",
    hours: [
      { days: "Sunday – Friday", time: "7:00 AM – 8:00 PM" },
      { days: "Saturday", time: "7:00 AM – 7:00 PM" },
    ],
    emergency: "24-hour ENT Emergency",
    emergencyPhone: "01-5915554",
    departments: ["Ear, Nose, Throat & Neck Clinic", "Speech & Hearing Clinic", "Vertigo & Tinnitus Clinic",
      "General Health Clinic", "Headache & Neuro Clinic", "Ortho & Spine Clinic", "Thyroid & Diabetes Clinic",
      "Chest & Respiratory Clinic", "Radiology – USG / X-Ray", "Physiotherapy Clinic", "Hearing Aid Clinic",
      "Pathology", "24-hr Pharmacy", "Allergy & Asthma Clinic", "Anesthesiology & Critical Care"],
    directionsUrl: "https://mapy.com/en/turisticka?source=osm&id=1128887989&x=85.3184414&y=27.7033226&z=17",
    directionsProvider: "Mapy.com",
    doctors: [
      { id: "dr-prakash-b-thapa", name: "Assoc. Prof. Dr. Prakash B. Thapa", qualification: "Senior Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-sailesh-acharya", name: "Dr. Sailesh Acharya", qualification: "Senior Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-tridip-b-pantha", name: "Prof. Dr. Tridip B. Pantha", qualification: "Senior Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-rishikesh-thakur", name: "Assoc. Prof. Dr. Rishikesh Thakur", qualification: "Senior Consultant ENT, Head & Neck Cancer Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-sailendra-bk-pokhrel", name: "Dr. Sailendra B.K. Pokhrel", qualification: "Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-deepa-adhikari", name: "Asst. Prof. Dr. Deepa Adhikari", qualification: "Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-jummy-rajkarnikar", name: "Dr. Jummy Rajkarnikar", qualification: "Consultant ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-sachita-regmi", name: "Dr. Sachita Regmi", qualification: "Registrar ENT, Head & Neck Surgeon", department: "Ear, Nose, Throat & Neck Clinic" },
      { id: "dr-suresh-p-nepal", name: "Assoc. Prof. Dr. Suresh P. Nepal", qualification: "Senior Consultant General Practitioner", department: "General Health Clinic" },
      { id: "dr-prashant-adhikari", name: "Dr. Prashant Adhikari", qualification: "Senior Consultant Orthopedic & Spine Surgeon", department: "Ortho & Spine Clinic" },
      { id: "dr-hemav-rajbhandari", name: "Dr. Hemav Rajbhandari", qualification: "Senior Consultant Neurosurgeon", department: "Headache & Neuro Clinic" },
      { id: "dr-dipak-malla", name: "Dr. Dipak Malla", qualification: "Senior Consultant Endocrinologist", department: "Thyroid & Diabetes Clinic" },
      { id: "dr-man-bahadur-chand", name: "Prof. Dr. Man Bahadur Chand", qualification: "Senior Consultant Anesthesiologist", department: "Anesthesiology & Critical Care" },
      { id: "dr-sujita-manandhar", name: "Prof. Dr. Sujita Manandhar", qualification: "Senior Consultant Anesthesiologist & Intensivist", department: "Anesthesiology & Critical Care" },
      { id: "dr-ramila-devkota", name: "Dr. Ramila Devkota", qualification: "Senior Consultant Radiologist", department: "Radiology – USG / X-Ray" },
      { id: "dr-bandita-paul-karki", name: "Dr. Bandita Paul Karki", qualification: "Registrar, Department of Radiology", department: "Radiology – USG / X-Ray" },
      { id: "dilli-raj-paudel", name: "Dilli Raj Paudel", qualification: "Consultant Audiologist & Speech Language Pathologist", department: "Speech & Hearing Clinic" },
      { id: "maya-lama-bomjan", name: "Maya Lama Bomjan", qualification: "Consultant Audiologist & Speech Language Pathologist", department: "Speech & Hearing Clinic" },
      { id: "anjali-sah", name: "Anjali Sah", qualification: "Consultant Audiologist & Speech Language Pathologist", department: "Speech & Hearing Clinic" },
    ],
  },
  "mmth": {
    id: "mmth",
    name: "Manmohan Memorial Medical College & Teaching Hospital",
    tagline: "Hospital for All",
    logo: "https://mmth.edu.np/wp-content/uploads/2025/08/mmth_logo_hospital.png",
    description: "A teaching hospital in Swoyambhu affiliated with Manmohan Memorial Medical College, combining general and super-specialist care with a 24/7 emergency department, blood bank and dialysis service.",
    address: "Swoyambhu-15, Kathmandu, Nepal",
    phones: ["+977-01-5970594"],
    mobile: "98512-85555 (Ambulance)",
    email: "info@mmth.edu.np",
    hours: [
      { days: "Sunday – Friday (OPD)", time: "8:00 AM – 6:00 PM" },
      { days: "Saturday", time: "Emergency services only" },
    ],
    emergency: "24/7 Emergency & 30-bed Trauma Center",
    emergencyPhone: "+977-01-5970594",
    departments: ["General Surgery", "Orthopaedics & Trauma", "Emergency & Trauma (24/7)", "Pharmacy (24/7)",
      "Physiotherapy", "IVF", "Endocrinology", "Neurosurgery", "Neuromedicine", "Pulmonology",
      "Lab / Pathology", "Radiology", "ICU / NICU", "Hemo-Dialysis", "Oxygen Services",
      "Cardiovascular & CTVS Surgery", "Obstetrics & Gynecology", "Hospital Administration"],
    directionsUrl: "https://www.waze.com/live-map/directions/np/bagmati-province/kathmandu/manmohan-memorial-medical-college-and-teaching-hospital?to=place.ChIJ1U5sdvMZ6zkRxw5zS2cOy54",
    directionsProvider: "Waze",
    doctors: [
      { id: "dr-ram-chandra-subedi", name: "Dr. Ram Chandra Subedi", qualification: "Consultant – Neurologist", department: "Neuromedicine" },
      { id: "dr-niraj-man-shrestha", name: "Dr. Niraj Man Shrestha", qualification: "Consultant – Orthopedics & Trauma", department: "Orthopaedics & Trauma" },
      { id: "dr-buland-thapa", name: "Prof. Dr. Buland Thapa", qualification: "Consultant – Orthopedics & Trauma", department: "Orthopaedics & Trauma" },
      { id: "dr-abhishek-man-shrestha", name: "Dr. Abhishek Man Shrestha", qualification: "HOD, Assistant Professor", department: "Hospital Administration" },
      { id: "dr-prasissdha-bikram-kadel", name: "Dr. Prasissdha Bikram Kadel", qualification: "Consultant – Cardiovascular, CTVS Surgeon", department: "Cardiovascular & CTVS Surgery" },
      { id: "dr-sarita-acharya", name: "Dr. Sarita Acharya", qualification: "Consultant – Gynae/Obs", department: "Obstetrics & Gynecology" },
    ],
  },
  "tuth": {
    id: "tuth",
    name: "Tribhuvan University Teaching Hospital",
    tagline: "त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल · Nepal's first medical college hospital",
    logo: "https://tuth.org.np/wp-content/uploads/2025/03/cropped-cropped-TU-Logo-270x270.png",
    description: "Established in 1986 through collaboration between the governments of Nepal and Japan, TUTH is a 301-bed teaching hospital in Maharajgunj offering care across more than twenty specialty departments.",
    address: "Maharajgunj, Kathmandu, Bagmati Pradesh, Nepal",
    phones: ["+977-1-4512505"],
    mobile: "+977-9851405475 (Ambulance)",
    email: null,
    hours: [
      { days: "OPD Ticket · Mon – Fri", time: "7:00 – 11:00 AM & 1:00 – 2:30 PM" },
      { days: "Hospital Administration", time: "9:00 AM – 5:00 PM" },
    ],
    emergency: "24/7 Emergency Department",
    emergencyPhone: "+977-9851405475",
    departments: ["Department of Emergency Medicine", "ENT-HNS Department", "Orthopedics and Trauma Surgery",
      "Plastic Surgery and Burns", "Obstetrics & Gynecology", "Psychiatry & Mental Health", "General Practice",
      "Dental", "Internal Medicine", "Neurology", "Neurosurgery", "Urology and Kidney Transplant Surgery",
      "Department of Paediatrics", "Dermatology", "Department of Nephrology", "Critical care Medicine",
      "Pharmacy", "Anesthesiology", "General Surgery", "Gastroenterology", "Pathology",
      "Pulmonology & Critical Care", "Surgical Gastroenterology"],
    directionsUrl: "https://maps.apple.com/place?place-id=IEFEF1D41D0044FC1&address=Maharajgunj%2C+Kathmandu+44616%2C+%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2&coordinate=27.735860%2C85.330226&name=Tribhuvan+University+Teaching+Hospital&_provider=9902",
    directionsProvider: "Apple Maps",
    doctors: [
      { id: "prof-gopal-sedhain", name: "Prof. Dr. Gopal Sedhain", qualification: "Deputy Director — Internal Medicine", department: "Internal Medicine" },
      { id: "prof-pawan-raj-chalise", name: "Prof. Dr. Pawan Raj Chalise", qualification: "Deputy Director — Urology & Kidney Transplant Surgery", department: "Urology and Kidney Transplant Surgery" },
      { id: "prof-subhash-prasad-acharya", name: "Prof. Dr. Subhash Prasad Acharya", qualification: "Executive Director — Critical Care Medicine", department: "Critical care Medicine" },
    ],
  },
};

const WAYFINDING = [
  { icon: Users, label_en: "Reception", label_np: "रिसेप्सन" },
  { icon: Stethoscope, label_en: "OPD / Clinics", label_np: "ओपीडी / क्लिनिक" },
  { icon: ShieldAlert, label_en: "Emergency", label_np: "आपतकालीन" },
  { icon: Building2, label_en: "Pharmacy", label_np: "फार्मेसी" },
  { icon: CheckCircle2, label_en: "Laboratory", label_np: "प्रयोगशाला" },
  { icon: CalendarCheck, label_en: "Billing", label_np: "बिलिङ" },
];

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_MAP = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/* -------------------------------- helpers ---------------------------------- */
function upcomingDates(days, count = 5) {
  const out = [];
  let d = new Date();
  let guard = 0;
  while (out.length < count && guard < 60) {
    if (days.some((ab) => DAY_MAP[ab] === d.getDay())) out.push(new Date(d));
    d = new Date(d.getTime() + 86400000);
    guard++;
  }
  return out;
}
function genSlots(start, end, mins) {
  const toM = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const s = toM(start), e = toM(end);
  const out = [];
  for (let m = s; m + mins <= e; m += mins) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}
function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2, "0")} ${period}`;
}
function fmtDate(d) { return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }
function dateKey(d) { return d.toISOString().slice(0, 10); }
function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function initials(name) {
  const clean = name.replace(/\b(Dr\.|Prof\.|Assoc\.|Asst\.|Mr\.|Ms\.)\b/g, "").trim();
  return clean.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function groupBy(arr, key) {
  const out = {};
  arr.forEach((item) => {
    const k = item[key] || "Other";
    if (!out[k]) out[k] = [];
    out[k].push(item);
  });
  return out;
}

/* ------------------------------ small pieces ------------------------------- */
function LogoBadge({ src, name, size = 48 }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ width: size, height: size }} className="rounded-2xl overflow-hidden shrink-0 bg-blue-50 border border-blue-100 flex items-center justify-center">
      {!failed && src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="text-blue-600 font-bold" style={{ fontFamily: FONT_DISPLAY, fontSize: size * 0.32 }}>{initials(name)}</span>
      )}
    </div>
  );
}

function Avatar({ name, size = 48 }) {
  return (
    <div style={{ width: size, height: size, background: brandGrad, fontFamily: FONT_DISPLAY, fontSize: size * 0.34 }}
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm shadow-blue-600/20">
      {initials(name)}
    </div>
  );
}

function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    red: "bg-red-50 text-red-700 border-red-100",
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${tones[tone]}`}>{children}</span>;
}

function SectionCard({ children, className = "" }) {
  return (
    <div style={{ ...glass(0.88), border: "1px solid rgba(226,232,240,0.85)" }} className={`rounded-3xl shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.06)] p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, children, right }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900" style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}>
        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-blue-600" strokeWidth={2.25} />
        </span>
        {children}
      </h3>
      {right}
    </div>
  );
}

/* ---------------------------------- App ------------------------------------ */
export default function App() {
  const [lang, setLang] = useState("en");
  const t = STR[lang];
  const [view, setView] = useState("landing"); // landing | portal | admin
  const [activeId, setActiveId] = useState(null);
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [hospitals, setHospitals] = useState(() => {
    const m = {};
    Object.values(HOSPITALS_BASE).forEach((h) => { m[h.id] = { ...h, doctors: [...h.doctors], announcements: [] }; });
    return m;
  });

  const [bookings, setBookings] = useState({});
  const [apptCount, setApptCount] = useState(0);
  const [aiMsgCount, setAiMsgCount] = useState(0);
  const [chatByCtx, setChatByCtx] = useState({});

  const activeHospital = activeId ? hospitals[activeId] : null;

  function goPortal(id) { setActiveId(id); setView("portal"); window.scrollTo?.(0, 0); }
  function goLanding() { setView("landing"); }
  function goAdmin(id) { if (id) setActiveId(id); setView("admin"); }

  function addDoctor(hospitalId, doc) {
    setHospitals((prev) => ({ ...prev, [hospitalId]: { ...prev[hospitalId], doctors: [...prev[hospitalId].doctors, doc] } }));
  }
  function removeDoctor(hospitalId, docId) {
    setHospitals((prev) => ({ ...prev, [hospitalId]: { ...prev[hospitalId], doctors: prev[hospitalId].doctors.filter((d) => d.id !== docId) } }));
  }
  function addAnnouncement(hospitalId, ann) {
    setHospitals((prev) => ({ ...prev, [hospitalId]: { ...prev[hospitalId], announcements: [ann, ...prev[hospitalId].announcements] } }));
  }
  function bookSlot(key, payload) {
    setBookings((prev) => ({ ...prev, [key]: payload }));
    setApptCount((c) => c + 1);
  }

  const rootStyle = {
    fontFamily: FONT_BODY,
    fontSize: `${fontScale * 100}%`,
    backgroundColor: highContrast ? "#000000" : "#FAFBFC",
    color: highContrast ? "#FFFFFF" : "#0F172A",
    minHeight: "100%",
  };

  return (
    <div style={rootStyle} className="w-full min-h-screen transition-colors duration-200">
      <TopBar t={t} lang={lang} setLang={setLang} fontScale={fontScale} setFontScale={setFontScale}
        highContrast={highContrast} setHighContrast={setHighContrast} view={view} goLanding={goLanding}
        activeHospital={activeHospital} />

      <div className={highContrast ? "bg-black" : ""}>
        {!highContrast && (
          <div className="bg-blue-600 text-white text-center text-[11px] sm:text-xs py-2 px-4 font-medium tracking-wide">
            {t.disclaimerBanner}
          </div>
        )}

        {view === "landing" && <Landing t={t} hospitals={hospitals} goPortal={goPortal} setChatOpen={setChatOpen} highContrast={highContrast} />}

        {view === "portal" && activeHospital && (
          <Portal t={t} lang={lang} hospital={activeHospital} goLanding={goLanding} goAdmin={goAdmin}
            bookings={bookings} bookSlot={bookSlot} highContrast={highContrast} />
        )}

        {view === "admin" && (
          <AdminView t={t} hospitals={hospitals} activeId={activeId} setActiveId={setActiveId}
            addDoctor={addDoctor} removeDoctor={removeDoctor} addAnnouncement={addAnnouncement}
            apptCount={apptCount} aiMsgCount={aiMsgCount} goLanding={goLanding} highContrast={highContrast} />
        )}
      </div>

      <ChatWidget t={t} lang={lang} open={chatOpen} setOpen={setChatOpen} hospital={activeHospital}
        chatByCtx={chatByCtx} setChatByCtx={setChatByCtx} setAiMsgCount={setAiMsgCount} highContrast={highContrast} />
    </div>
  );
}

/* --------------------------------- TopBar ----------------------------------- */
function TopBar({ t, lang, setLang, fontScale, setFontScale, highContrast, setHighContrast, view, goLanding, activeHospital }) {
  return (
    <header className="sticky top-0 z-30" style={{ ...glass(0.9), borderBottom: "1px solid rgba(226,232,240,0.85)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <button onClick={goLanding} className="flex items-center gap-2.5 shrink-0" aria-label={t.brand}>
          <div style={{ background: brandGrad }} className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shadow-blue-600/30">
            <Stethoscope className="w-5 h-5 text-white" strokeWidth={2.25} />
          </div>
          <div className="text-left leading-tight">
            <div className="font-extrabold text-slate-900 text-base" style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}>{t.brand}</div>
            {view !== "landing" && activeHospital && (
              <div className="text-[11px] text-slate-500 truncate max-w-[140px] sm:max-w-xs">{activeHospital.name}</div>
            )}
          </div>
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {view === "portal" && activeHospital && (
            <a href={`tel:${activeHospital.emergencyPhone.replace(/[^+\d]/g, "")}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 mr-1">
              <PhoneCall className="w-3.5 h-3.5" /> {t.callNow}
            </a>
          )}
          <button onClick={() => setFontScale((s) => (s >= 1.25 ? 1 : +(s + 0.125).toFixed(3)))}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" title={t.fontSize} aria-label={t.fontSize}>
            <Type className="w-4 h-4" />
          </button>
          <button onClick={() => setHighContrast((v) => !v)}
            className={`p-2 rounded-lg hover:bg-slate-100 ${highContrast ? "text-blue-600 bg-blue-50" : "text-slate-600"}`}
            title={t.contrast} aria-label={t.contrast}>
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => setLang(lang === "en" ? "np" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 text-sm font-medium">
            <Globe className="w-4 h-4" /> {t.language}
          </button>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Landing ----------------------------------- */
function Landing({ t, hospitals, goPortal, setChatOpen, highContrast }) {
  const list = Object.values(hospitals);
  return (
    <main>
      <section className="relative overflow-hidden">
        {!highContrast && (
          <>
            <div aria-hidden style={{ background: "radial-gradient(circle, #93C5FD 0%, transparent 70%)", opacity: 0.35, filter: "blur(40px)" }} className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none" />
            <div aria-hidden style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)", opacity: 0.14, filter: "blur(50px)" }} className="absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full pointer-events-none" />
          </>
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" /> {t.heroKicker}
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] ${highContrast ? "text-white" : "text-slate-900"}`} style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.02em" }}>
            {t.tagline}
          </h1>
          <p className={`mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${highContrast ? "text-slate-300" : "text-slate-600"}`}>
            {t.heroSub}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#hospitals" className="px-6 py-3.5 rounded-xl text-white font-semibold text-sm shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-transform hover:-translate-y-0.5" style={{ background: brandGrad }}>
              {t.chooseHospital} <ChevronRight className="w-4 h-4" />
            </a>
            <button onClick={() => setChatOpen(true)} className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 flex items-center gap-2 transition-transform hover:-translate-y-0.5">
              <MessageCircle className="w-4 h-4 text-blue-600" /> {t.chatWithAI}
            </button>
          </div>
        </div>
      </section>

      <section id="hospitals" className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${highContrast ? "text-white" : "text-slate-900"}`} style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}>{t.hospitalsTitle}</h2>
          <p className={`mt-2 text-sm ${highContrast ? "text-slate-300" : "text-slate-500"}`}>{t.hospitalsSub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((h) => (
            <div key={h.id} style={{ ...glass(0.92), border: "1px solid rgba(226,232,240,0.9)" }}
              className="rounded-3xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(37,99,235,0.18)] transition-shadow flex flex-col">
              <div style={{ background: brandGrad }} className="h-1.5 w-full" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start gap-3">
                  <LogoBadge src={h.logo} name={h.name} size={52} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 leading-snug" style={{ fontFamily: FONT_DISPLAY }}>{h.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{h.tagline}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-slate-600 flex-1">
                  <div className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" /><span>{h.address}</span></div>
                  <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" /><span>{h.phones[0]}</span></div>
                  <div className="flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-blue-500 shrink-0" /><span>{h.doctors.length} {t.doctorsCount}</span></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Pill tone="red">{h.emergency}</Pill>
                </div>
                <button onClick={() => goPortal(h.id)} className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  {t.openPortal} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* --------------------------------- Portal ------------------------------------ */
function Portal({ t, lang, hospital, goLanding, goAdmin, bookings, bookSlot, highContrast }) {
  const h = hospital;
  const [dept, setDept] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const doctorsInDept = h.doctors.filter((d) => d.department === dept);
  const doctor = h.doctors.find((d) => d.id === doctorId);
  const doctorGroups = useMemo(() => groupBy(h.doctors, "department"), [h.doctors]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={goLanding} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t.back}
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <LogoBadge src={h.logo} name={h.name} size={64} />
        <div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold ${highContrast ? "text-white" : "text-slate-900"}`} style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}>{h.name}</h1>
          <p className="text-sm text-slate-500 mt-1">{h.tagline}</p>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#DC2626,#EF4444)" }} className="rounded-2xl p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3 mb-8 shadow-lg shadow-red-600/20">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 shrink-0" />
          <div>
            <div className="font-bold text-sm">{t.emergencyLabel} · {h.emergency}</div>
            <div className="text-xs text-white/80">{h.emergencyPhone}</div>
          </div>
        </div>
        <a href={`tel:${h.emergencyPhone.replace(/[^+\d]/g, "")}`} className="px-4 py-2 rounded-lg bg-white text-red-600 text-sm font-bold flex items-center gap-1.5 hover:bg-red-50 transition-colors">
          <Phone className="w-4 h-4" /> {t.callNow}
        </a>
      </div>

      <p className={`text-sm leading-relaxed mb-10 max-w-3xl ${highContrast ? "text-slate-300" : "text-slate-600"}`}>{h.description}</p>

      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <SectionCard>
          <SectionTitle icon={Phone}>{t.contact}</SectionTitle>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" /><span>{h.address}</span></div>
            {h.phones.map((p, i) => (
              <a key={i} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Phone className="w-4 h-4 text-blue-500 shrink-0" /><span>{p}</span></a>
            ))}
            <div className="flex items-center gap-2 text-slate-500"><Phone className="w-4 h-4 text-blue-500 shrink-0" /><span>{h.mobile}</span></div>
            {h.email && <a href={`mailto:${h.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Mail className="w-4 h-4 text-blue-500 shrink-0" /><span className="break-all">{h.email}</span></a>}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionTitle icon={Clock}>{t.hours}</SectionTitle>
          <div className="space-y-3 text-sm">
            {h.hours.map((row, i) => (
              <div key={i} className="flex justify-between gap-3 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                <span className="text-slate-500">{row.days}</span>
                <span className="font-semibold text-slate-800 text-right">{row.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionTitle icon={Navigation}>{t.blueprintTitle}</SectionTitle>
          <p className="text-xs text-slate-500 mb-4 -mt-2">{t.blueprintSub}</p>
          <div className="grid grid-cols-3 gap-3">
            {WAYFINDING.map((w, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><w.icon className="w-5 h-5 text-blue-600" /></div>
                <span className="text-[11px] text-slate-600 leading-tight">{lang === "np" ? w.label_np : w.label_en}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard className="mb-10">
        <SectionTitle icon={Building2} right={<span className="text-xs text-slate-400 font-medium">{h.departments.length}</span>}>{t.departments}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {h.departments.map((d, i) => <Pill key={i} tone="blue">{d}</Pill>)}
        </div>
      </SectionCard>

      <SectionCard className="mb-10">
        <SectionTitle icon={MapPin}>{t.location}</SectionTitle>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 p-5 bg-slate-50/60">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Navigation className="w-5 h-5 text-blue-600" /></div>
            <div>
              <div className="font-semibold text-sm text-slate-800">{h.address}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.opensNewTab}</div>
            </div>
          </div>
          <a href={h.directionsUrl} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors">
            {t.getDirections} · {h.directionsProvider} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </SectionCard>

      <SectionCard className="mb-10">
        <SectionTitle icon={Stethoscope} right={h.doctors.length > 0 ? <span className="text-xs text-slate-400 font-medium">{h.doctors.length} {t.doctorsCount}</span> : null}>
          {t.doctorsTitle}
        </SectionTitle>
        {h.doctors.length === 0 ? (
          <div className="text-center py-10">
            <Users className="w-9 h-9 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-medium text-sm">{t.doctorsEmpty}</p>
            <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">{t.doctorsEmptySub}</p>
            <button onClick={() => goAdmin(h.id)} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" /> {t.openAdmin}
            </button>
          </div>
        ) : (
          <div className="space-y-7">
            {Object.entries(doctorGroups).map(([deptName, docs]) => (
              <div key={deptName}>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">{deptName}</h4>
                  <span className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {docs.map((d) => (
                    <div key={d.id} className="rounded-2xl border border-slate-200 p-4 flex gap-3 hover:border-blue-200 hover:shadow-sm transition-all">
                      <Avatar name={d.name} size={46} />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm flex items-center gap-1">
                          {d.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{d.qualification}</div>
                        {(d.experienceYears || d.fee) && (
                          <div className="text-xs text-slate-400 mt-1.5 flex gap-2">
                            {d.experienceYears && <span>{d.experienceYears} yrs exp.</span>}
                            {d.fee && <span>· NPR {d.fee}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard className="mb-10">
        <SectionTitle icon={CalendarCheck}>{t.bookTitle}</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.selectDept}</label>
            <select value={dept} onChange={(e) => { setDept(e.target.value); setDoctorId(""); }}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">—</option>
              {h.departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            {dept && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.selectDoctor}</label>
                {doctorsInDept.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-slate-50 rounded-xl p-3">{t.noDoctorDept}</p>
                ) : (
                  <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">—</option>
                    {doctorsInDept.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                )}
              </div>
            )}
            {!dept && <p className="text-xs text-slate-400 mt-3">{t.pickDeptFirst}</p>}
          </div>

          <div>
            {doctor ? (
              doctor.schedule ? (
                <BookingSlots t={t} hospital={h} doctor={doctor} bookings={bookings} bookSlot={bookSlot} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center gap-2 border border-dashed border-slate-200 rounded-xl p-6">
                  <Clock className="w-6 h-6 text-slate-300" />
                  <p className="text-xs text-slate-400 max-w-[220px]">{t.scheduleNotPublished}</p>
                  <a href={`tel:${h.phones[0].replace(/[^+\d]/g, "")}`} className="text-xs font-semibold text-blue-600 flex items-center gap-1"><Phone className="w-3 h-3" /> {h.phones[0]}</a>
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl p-6 text-center">
                {t.selectSlot}
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionTitle icon={Megaphone}>{t.announcementsTitle}</SectionTitle>
        {h.announcements.length === 0 ? (
          <p className="text-sm text-slate-400">{t.announcementsEmpty}</p>
        ) : (
          <div className="space-y-3">
            {h.announcements.map((a, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3.5">
                <div className="font-semibold text-sm text-slate-800">{a.title}</div>
                <div className="text-xs text-slate-500 mt-1">{a.body}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </main>
  );
}

/* ------------------------------ BookingSlots -------------------------------- */
function BookingSlots({ t, hospital, doctor, bookings, bookSlot }) {
  const dates = useMemo(() => upcomingDates(doctor.schedule.days, 5), [doctor]);
  const [selectedDate, setSelectedDate] = useState(dates[0] || null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const slots = genSlots(doctor.schedule.start, doctor.schedule.end, doctor.schedule.slotMinutes);
  const dKey = selectedDate ? dateKey(selectedDate) : "";

  function keyFor(time) { return `${doctor.id}|${dKey}|${time}`; }

  function confirm() {
    if (!selectedTime || !name || !phone) return;
    const payload = { name, phone, doctorName: doctor.name, dept: doctor.department, date: dKey, time: selectedTime, hospital: hospital.name };
    bookSlot(keyFor(selectedTime), payload);
    setConfirmed(payload);
  }

  if (confirmed) {
    const slip = `ReceptionIQ — Appointment Slip
Hospital: ${confirmed.hospital}
Doctor: ${confirmed.doctorName}
Department: ${confirmed.dept}
Date: ${confirmed.date}
Time: ${fmt12(confirmed.time)}
Patient: ${confirmed.name}
Phone: ${confirmed.phone}`;
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
        <div className="font-bold text-emerald-800 text-sm">{t.bookingConfirmed}</div>
        <div className="text-xs text-emerald-700 mt-1">{doctor.name} · {fmtDate(selectedDate)} · {fmt12(confirmed.time)}</div>
        <button onClick={() => downloadText(slip, "appointment-slip.txt")}
          className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> {t.downloadSlip}
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.selectDate}</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {dates.map((d, i) => (
          <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${dateKey(d) === dKey ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}>
            {fmtDate(d)}
          </button>
        ))}
      </div>

      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.selectSlot}</label>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {slots.map((s) => {
          const isBooked = !!bookings[keyFor(s)];
          const isSel = selectedTime === s;
          return (
            <button key={s} disabled={isBooked} onClick={() => setSelectedTime(s)}
              className={`px-2 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1 transition-colors
                ${isBooked ? "bg-red-50 text-red-400 border-red-100 cursor-not-allowed line-through" :
                  isSel ? "bg-blue-600 text-white border-blue-600" : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300"}`}>
              {isBooked ? <Ban className="w-3 h-3" /> : <Circle className="w-2 h-2 fill-current" />} {fmt12(s)}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-4">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {t.available}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> {t.booked}</span>
      </div>

      {selectedTime && (
        <div className="space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.patientName}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.patientPhone}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={confirm} disabled={!name || !phone}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold transition-colors">
            {t.confirmBooking}
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- AdminView ---------------------------------- */
function AdminView({ t, hospitals, activeId, setActiveId, addDoctor, removeDoctor, addAnnouncement, apptCount, aiMsgCount, goLanding, highContrast }) {
  const h = activeId ? hospitals[activeId] : null;
  const [tab, setTab] = useState("overview");
  const [doc, setDoc] = useState({ name: "", qualification: "", department: "", experienceYears: "", fee: "", days: [], start: "10:00", end: "14:00", slotMinutes: 20 });
  const [ann, setAnn] = useState({ title: "", body: "" });

  function toggleDay(ab) {
    setDoc((p) => ({ ...p, days: p.days.includes(ab) ? p.days.filter((d) => d !== ab) : [...p.days, ab] }));
  }
  function submitDoctor() {
    if (!doc.name || !doc.department || doc.days.length === 0) return;
    addDoctor(h.id, {
      id: `${Date.now()}`, name: doc.name, qualification: doc.qualification, department: doc.department,
      experienceYears: doc.experienceYears || null, fee: doc.fee || null,
      schedule: { days: doc.days, start: doc.start, end: doc.end, slotMinutes: Number(doc.slotMinutes) || 20 },
    });
    setDoc({ name: "", qualification: "", department: "", experienceYears: "", fee: "", days: [], start: "10:00", end: "14:00", slotMinutes: 20 });
  }
  function submitAnnouncement() {
    if (!ann.title) return;
    addAnnouncement(h.id, ann);
    setAnn({ title: "", body: "" });
  }

  const totalDoctors = Object.values(hospitals).reduce((a, x) => a + x.doctors.length, 0);
  const tabs = [
    { id: "overview", label: t.adminOverview, icon: LayoutGrid },
    { id: "doctors", label: t.adminDoctors, icon: UserPlus },
    { id: "announcements", label: t.adminAnnouncements, icon: Megaphone },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={goLanding} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t.back}
      </button>

      <div className="flex items-center gap-2.5 mb-1">
        <div style={{ background: brandGrad }} className="w-9 h-9 rounded-xl flex items-center justify-center"><LayoutDashboard className="w-5 h-5 text-white" /></div>
        <h1 className={`text-2xl font-extrabold ${highContrast ? "text-white" : "text-slate-900"}`} style={{ fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}>{t.adminTitle}</h1>
      </div>
      <p className="text-xs text-slate-500 mb-6 ml-11">{t.adminSub}</p>

      <SectionCard className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.selectHospitalLabel}</label>
        <select value={activeId || ""} onChange={(e) => setActiveId(e.target.value)}
          className="w-full sm:w-96 border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">—</option>
          {Object.values(hospitals).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </SectionCard>

      {!h ? (
        <p className="text-sm text-slate-400">{t.noHospitalSelected}</p>
      ) : (
        <>
          <div className="flex gap-1.5 mb-6 p-1 rounded-2xl bg-slate-100 w-fit">
            {tabs.map((tb) => (
              <button key={tb.id} onClick={() => setTab(tb.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${tab === tb.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                <tb.icon className="w-3.5 h-3.5" /> {tb.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard label={t.apptsBooked} value={apptCount} icon={CalendarCheck} />
              <StatCard label={t.aiMessages} value={aiMsgCount} icon={Bot} />
              <StatCard label={t.doctorsAdded} value={totalDoctors} icon={Users} />
            </div>
          )}

          {tab === "doctors" && (
            <SectionCard>
              <SectionTitle icon={UserPlus}>{t.addDoctor}</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} placeholder={t.docName}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={doc.qualification} onChange={(e) => setDoc({ ...doc, qualification: e.target.value })} placeholder={t.docQual}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={doc.department} onChange={(e) => setDoc({ ...doc, department: e.target.value })}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">{t.docDept}</option>
                  {h.departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
                <input value={doc.experienceYears} onChange={(e) => setDoc({ ...doc, experienceYears: e.target.value })} placeholder={t.docExp} type="number"
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={doc.fee} onChange={(e) => setDoc({ ...doc, fee: e.target.value })} placeholder={t.docFee} type="number"
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.docDays}</label>
                <div className="flex flex-wrap gap-2">
                  {DAY_ABBR.map((ab) => (
                    <button key={ab} onClick={() => toggleDay(ab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${doc.days.includes(ab) ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600"}`}>
                      {ab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.docStart}</label>
                  <input type="time" value={doc.start} onChange={(e) => setDoc({ ...doc, start: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.docEnd}</label>
                  <input type="time" value={doc.end} onChange={(e) => setDoc({ ...doc, end: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.docSlot}</label>
                  <input type="number" value={doc.slotMinutes} onChange={(e) => setDoc({ ...doc, slotMinutes: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <button onClick={submitDoctor} className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
                <Plus className="w-4 h-4" /> {t.saveDoctor}
              </button>

              {h.doctors.length > 0 && (
                <div className="mt-6">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">{t.currentDirectory} · {h.doctors.length}</div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {h.doctors.map((d) => (
                      <div key={d.id} className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5">
                        <div className="text-sm text-slate-700 min-w-0">
                          <span className="font-medium">{d.name}</span> <span className="text-xs text-slate-400">— {d.department}</span>
                        </div>
                        <button onClick={() => removeDoctor(h.id, d.id)} className="text-red-400 hover:text-red-600 p-1 shrink-0"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>
          )}

          {tab === "announcements" && (
            <SectionCard>
              <SectionTitle icon={Megaphone}>{t.publishAnnouncement}</SectionTitle>
              <div className="space-y-3">
                <input value={ann.title} onChange={(e) => setAnn({ ...ann, title: e.target.value })} placeholder={t.annTitleField}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea value={ann.body} onChange={(e) => setAnn({ ...ann, body: e.target.value })} placeholder={t.annBody} rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={submitAnnouncement} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
                  <Megaphone className="w-4 h-4" /> {t.publish}
                </button>
              </div>
            </SectionCard>
          )}
        </>
      )}
    </main>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div style={{ ...glass(0.92) }} className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
      <div style={{ background: brandGrad }} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-white" /></div>
      <div>
        <div className="text-xl font-extrabold text-slate-900" style={{ fontFamily: FONT_DISPLAY }}>{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

/* -------------------------------- ChatWidget ---------------------------------- */
function buildKB(hospital, lang) {
  return [
    { keys: ["hour", "time", "open", "opd", "opening", "समय"], en: `OPD hours: ${hospital.hours.map((r) => `${r.days} ${r.time}`).join(" · ")}`, np: `ओपीडी समय: ${hospital.hours.map((r) => `${r.days} ${r.time}`).join(" · ")}` },
    { keys: ["emergency", "urgent", "आपत"], en: `${hospital.emergency}. Call ${hospital.emergencyPhone} immediately.`, np: `${hospital.emergency}। तुरुन्त ${hospital.emergencyPhone} मा फोन गर्नुहोस्।` },
    { keys: ["address", "location", "where", "direction", "ठेगान"], en: `${hospital.name} is located at ${hospital.address}. Tap "Get directions" on the portal to open it in ${hospital.directionsProvider}.`, np: `${hospital.name} ${hospital.address} मा अवस्थित छ। पोर्टलमा "बाटो हेर्नुहोस्" थिच्नुहोस्।` },
    { keys: ["phone", "call", "contact", "number", "फोन"], en: `You can reach reception at ${hospital.phones.join(", ")}.`, np: `रिसेप्सनलाई ${hospital.phones.join(", ")} मा सम्पर्क गर्न सकिन्छ।` },
    { keys: ["email", "mail"], en: hospital.email ? `Email the hospital at ${hospital.email}.` : `An email isn't listed yet for this hospital — please call reception instead.`, np: hospital.email ? `${hospital.email} मा इमेल गर्नुहोस्।` : `यस अस्पतालको इमेल अझै छैन — कृपया रिसेप्सनमा फोन गर्नुहोस्।` },
    { keys: ["department", "service", "clinic", "विभाग"], en: `Departments here include ${hospital.departments.slice(0, 6).join(", ")}, and more — see the Departments section on this page.`, np: `यहाँका विभागहरूमा ${hospital.departments.slice(0, 6).join(", ")} लगायत थप समावेश छन् — यस पृष्ठको विभाग खण्ड हेर्नुहोस्।` },
    { keys: ["parking"], en: `Parking availability isn't listed for this hospital yet — please check with reception on arrival.`, np: `यस अस्पतालको पार्किङ जानकारी अझै छैन — कृपया आइपुग्दा रिसेप्सनमा सोध्नुहोस्।` },
    { keys: ["pharmacy", "medicine"], en: `Check the Departments section for this hospital's pharmacy service and hours.`, np: `फार्मेसी सेवा र समयको लागि विभाग खण्ड हेर्नुहोस्।` },
    { keys: ["fee", "cost", "price", "bill", "insurance", "शुल्क"], en: `Consultation fees are set per doctor and shown on their profile once listed. For billing or insurance questions, reception can help directly.`, np: `परामर्श शुल्क डाक्टर अनुसार फरक हुन्छ। बिलिङ वा बीमा प्रश्नका लागि रिसेप्सनले सिधै मद्दत गर्न सक्छ।` },
  ];
}
const MEDICAL_FLAGS = ["pain", "fever", "symptom", "diagnos", "prescri", "treatment for", "sick", "hurts", "bleeding", "medicine for"];

function ChatWidget({ t, lang, open, setOpen, hospital, chatByCtx, setChatByCtx, setAiMsgCount, highContrast }) {
  const ctxKey = hospital ? hospital.id : "landing";
  const [input, setInput] = useState("");
  const messages = chatByCtx[ctxKey] || [];

  function ensureWelcome() {
    if (messages.length === 0) {
      const welcome = hospital
        ? { role: "bot", text: `${t.chatDisclaimer} ${lang === "np" ? "म कसरी मद्दत गर्न सक्छु?" : "How can I help with " + hospital.name + "?"}` }
        : { role: "bot", text: `${t.chatDisclaimer} ${t.chatChooseFirst}` };
      setChatByCtx((p) => ({ ...p, [ctxKey]: [welcome] }));
    }
  }

  function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim() };
    let botText;

    if (!hospital) {
      botText = t.chatChooseFirst;
    } else {
      const q = input.toLowerCase();
      if (MEDICAL_FLAGS.some((f) => q.includes(f))) {
        botText = lang === "np"
          ? "म चिकित्सा सल्लाह वा निदान दिन सक्दिन। कृपया यस विषयमा डाक्टरलाई भेट्नुहोस् वा रिसेप्सनमा सम्पर्क गर्नुहोस्।"
          : "I can't give medical advice or a diagnosis. Please consult a doctor about this, or contact reception to be directed to the right department.";
      } else if (q.includes("doctor") || q.includes("appointment") || q.includes("book") || q.includes("डाक्टर")) {
        botText = hospital.doctors.length === 0
          ? (lang === "np" ? "यस अस्पतालमा अझै डाक्टर सूचीकृत छैनन्। कृपया रिसेप्सनमा सम्पर्क गर्नुहोस्।" : "No doctors are listed for this hospital yet — please contact reception directly to book.")
          : (lang === "np" ? "यस पृष्ठको 'अपोइन्टमेन्ट बुक गर्नुहोस्' खण्डबाट विभाग र डाक्टर छान्नुहोस्।" : "Use the 'Book an Appointment' section on this page — pick a department, then a doctor, then an open time slot.");
      } else {
        const kb = buildKB(hospital, lang);
        const hit = kb.find((e) => e.keys.some((k) => q.includes(k)));
        botText = hit ? hit[lang] : (lang === "np"
          ? `यसबारे मसँग प्रमाणित जानकारी छैन। कृपया रिसेप्सनलाई ${hospital.phones[0]} मा सम्पर्क गर्नुहोस्।`
          : `I don't have verified information on that yet. Please call reception at ${hospital.phones[0]} for help.`);
      }
    }

    setChatByCtx((p) => ({ ...p, [ctxKey]: [...(p[ctxKey] || []), userMsg, { role: "bot", text: botText }] }));
    setAiMsgCount((c) => c + 1);
    setInput("");
  }

  return (
    <>
      <button onClick={() => { setOpen((v) => !v); ensureWelcome(); }}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: brandGrad }} aria-label={t.chatTitle}>
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div style={{ ...glass(0.97) }} className="fixed bottom-24 right-5 z-40 w-[92vw] max-w-sm h-[70vh] max-h-[520px] rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
          <div style={{ background: brandGrad }} className="text-white px-4 py-3.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
            <div className="min-w-0">
              <div className="font-bold text-sm leading-tight">{t.chatTitle}</div>
              <div className="text-[10px] text-blue-100 leading-tight">{t.chatDisclaimer}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-xs text-slate-400 text-center pt-6">
                {hospital ? t.chatPlaceholder : t.chatChooseFirst}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${m.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t.chatPlaceholder}
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={send} className="w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0" style={{ background: brandGrad }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
