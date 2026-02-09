/* =======================
   ภาษาเริ่มต้น
======================= */
let lang = "th";

/* =======================
   คำถาม 2 ภาษา
======================= */
const questions = {
  th: {
    q1: "โกโก้แตกต่างจากช็อกโกแลตอย่างไร",
    q2: "สารสำคัญทางชีวภาพในโกโก้มีอะไรบ้าง",
    q3: "โกโก้มีบทบาทอย่างไรต่อระบบเอนไซม์ในร่างกาย",
    q4: "โกโก้ส่งผลต่อสมองและระบบประสาทอย่างไร",
    q5: "เหตุใดโกโก้จึงถูกจัดเป็น Functional Food",
    q6: "กระบวนการแปรรูปโกโก้ส่งผลต่อคุณค่าทางโภชนาการหรือไม่",
    q7: "ผงโกโก้ธรรมชาติกับโกโก้ดัตช์ต่างกันอย่างไร",
    q8: "โกโก้มีผลต่อระบบหัวใจและหลอดเลือดอย่างไร",
    q9: "ของเหลือจากกระบวนการผลิตโกโก้สามารถนำไปใช้ประโยชน์ได้อย่างไร",
    q10: "โกโก้มีความสำคัญต่อเศรษฐกิจและความยั่งยืนอย่างไร"
  },
  en: {
    q1: "How is cocoa different from chocolate?",
    q2: "What bioactive compounds are found in cocoa?",
    q3: "How does cocoa affect enzymes in the body?",
    q4: "How does cocoa affect the brain and nervous system?",
    q5: "Why is cocoa considered a functional food?",
    q6: "Does cocoa processing affect nutritional value?",
    q7: "What is the difference between natural and Dutch cocoa?",
    q8: "How does cocoa affect the heart and blood vessels?",
    q9: "How can cocoa by-products be reused?",
    q10: "Why is cocoa important for the economy and sustainability?"
  }
};

/* =======================
   คำตอบ
======================= */
const answers = {
  th: {
    q1: "โกโก้คือวัตถุดิบจากเมล็ดคาเคา ส่วนช็อกโกแลตคือผลิตภัณฑ์ที่ผ่านการปรุงแต่ง",
    q2: "โกโก้อุดมไปด้วยฟลาโวนอยด์ เช่น เอพิแคทีชิน",
    q3: "โพลีฟีนอลช่วยกระตุ้นเอนไซม์ต้านอนุมูลอิสระ",
    q4: "ธีโอโบรมีนช่วยกระตุ้นสมองและอารมณ์",
    q5: "โกโก้เป็น Functional Food เพราะมีสารออกฤทธิ์ทางชีวภาพ",
    q6: "ความร้อนสูงทำให้สารอาหารบางชนิดลดลง",
    q7: "แตกต่างกันที่กระบวนการผลิต",
    q8: "ช่วยลดความเสี่ยงโรคหัวใจ",
    q9: "นำไปทำปุ๋ยหรือพลังงานชีวมวลได้",
    q10: "เป็นพืชเศรษฐกิจที่ช่วยความยั่งยืน"
  },
  en: {
    q1: "Cocoa comes from cacao beans, while chocolate is processed.",
    q2: "Cocoa is rich in flavonoids such as epicatechin.",
    q3: "Polyphenols activate antioxidant enzymes.",
    q4: "Theobromine stimulates the brain and mood.",
    q5: "Cocoa is a functional food due to bioactive compounds.",
    q6: "High heat reduces nutritional value.",
    q7: "They differ in processing methods.",
    q8: "It helps reduce heart disease risk.",
    q9: "By-products can be reused as fertilizer or biomass.",
    q10: "Cocoa supports the economy and sustainability."
  }
};

/* =======================
   เปลี่ยนภาษา
======================= */
function setLang(l, btn) {
  lang = l;

  document.querySelectorAll(".lang button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  updateQuestionButtons();
  document.getElementById("text").innerText =
    lang === "th" ? "กรุณาเลือกคำถาม" : "Please select a question";
}

/* =======================
   อัปเดตข้อความปุ่ม
======================= */
function updateQuestionButtons() {
  document.querySelectorAll(".question-grid button").forEach(btn => {
    btn.innerText = questions[lang][btn.dataset.q];
  });
}

/* =======================
   ปุ่ม active
======================= */
function setActiveQuestion(btn) {
  document.querySelectorAll(".question-grid button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

/* =======================
   ควบคุมโกโก้
======================= */
function setMascot(state) {
  document.getElementById("mascot-pointer").src = `cocoa-${state}.png`;
}

/* =======================
   เสียง
======================= */
function speakThai(text) {
  speechSynthesis.cancel();
  text.split(/[,ๆ]| และ | ซึ่ง | เพราะ /).forEach(t => {
    if (!t.trim()) return;
    const u = new SpeechSynthesisUtterance(t.trim());
    u.lang = "th-TH";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  });
}

function speakEnglish(text) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  speechSynthesis.speak(u);
}

/* =======================
   ฟังก์ชันหลัก
======================= */
function speak(q, event) {
  const btn = event.target;
  setActiveQuestion(btn);

  const msg = answers[lang][q];
  document.getElementById("text").innerText = msg;

  /* ===== วางโกโก้ตรงกลางปุ่ม (วิธีที่ถูกต้อง) ===== */
  const mascot = document.getElementById("mascot-pointer");
  const rect = btn.getBoundingClientRect();

  const centerX =
    rect.left + rect.width / 2 + window.scrollX;
  const centerY =
    rect.top + rect.height / 2 + window.scrollY;

  mascot.style.left =
    centerX - mascot.offsetWidth / 2 + "px";
  mascot.style.top =
    centerY - mascot.offsetHeight / 2 + "px";

  /* ท่า + เสียง */
  setMascot("point");
  setTimeout(() => setMascot("talk"), 200);

  lang === "th" ? speakThai(msg) : speakEnglish(msg);

  setTimeout(() => setMascot("idle"), msg.length * 80);
}

/* =======================
   เริ่มต้น
======================= */
window.onload = () => {
  setMascot("sleep");
  updateQuestionButtons();
};
