let lang = "th";

function setLang(l) {
  lang = l;
}

/* เปลี่ยนท่าโกโก้ */
function setMascot(state) {
  const mascot = document.getElementById("mascot-pointer");
  if (!mascot) return;

  if (state === "idle") mascot.src = "cocoa-idle.png";
  if (state === "point") mascot.src = "cocoa-point.png";
  if (state === "talk") mascot.src = "cocoa-talk.png";
  if (state === "sleep") mascot.src = "cocoa-sleep.png";
}

/* โหลดเสียง */
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

function getThaiVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang === "th-TH") || voices[0];
}

function speakText(text) {
  window.speechSynthesis.cancel();
  const parts = text.split(/[,ๆ]| และ | ซึ่ง | เพราะ /);

  parts.forEach(part => {
    if (part.trim()) {
      const speech = new SpeechSynthesisUtterance(part.trim());
      speech.lang = "th-TH";
      speech.voice = getThaiVoice();
      speech.rate = 0.85;
      speech.pitch = 0.95;
      window.speechSynthesis.speak(speech);
    }
  });
}

function speak(q, event) {
  let msg = "";

  if (q === "q1") msg = "โกโก้ คือ วัตถุดิบหลักที่ได้จากเมล็ดของต้นธีโอโบรมา คาเคา ผ่านกระบวนการหมัก คั่ว และบด";
  if (q === "q2") msg = "โกโก้อุดมไปด้วยฟลาโวนอยด์ โดยเฉพาะเอพิแคทีชิน และคาเทชิน";
  if (q === "q3") msg = "สารโพลีฟีนอลในโกโก้ช่วยกระตุ้นการทำงานของเอนไซม์ต้านอนุมูลอิสระ";
  if (q === "q4") msg = "โกโก้มีสารธีโอโบรมีน ช่วยกระตุ้นสมองและอารมณ์";
  if (q === "q5") msg = "โกโก้จัดเป็น Functional Food เพราะมีสารออกฤทธิ์ทางชีวภาพ";
  if (q === "q6") msg = "การแปรรูปที่ใช้ความร้อนสูงทำให้สารฟลาโวนอยด์ลดลง";
  if (q === "q7") msg = "โกโก้ธรรมชาติกับโกโก้ดัตช์แตกต่างกันที่กระบวนการผลิต";
  if (q === "q8") msg = "ฟลาโวนอยด์ช่วยลดความเสี่ยงโรคหัวใจ";
  if (q === "q9") msg = "เปลือกโกโก้นำไปทำปุ๋ยหรือพลังงานชีวมวลได้";
  if (q === "q10") msg = "โกโก้เป็นพืชเศรษฐกิจที่สำคัญต่อความยั่งยืน";

  document.getElementById("text").innerText = msg;

  /* ให้โกโก้ชี้ปุ่ม */
  const btn = event.target;
  const rect = btn.getBoundingClientRect();
  const mascot = document.getElementById("mascot-pointer");

  mascot.style.top = window.scrollY + rect.top + rect.height / 2 - 40 + "px";
  mascot.style.left = rect.left - 90 + "px";

  setMascot("point");
  setTimeout(() => setMascot("talk"), 200);
  speakText(msg);
  setTimeout(() => setMascot("idle"), msg.length * 80);
}

window.onload = () => setMascot("sleep");

