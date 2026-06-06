s · JS
// ── Profile image persistence ──
function loadProfileImage() {
  const stored = localStorage.getItem('skyra_profile_img');
  const initials = localStorage.getItem('skyra_profile_initials') || 'JD';
  const el = document.getElementById('navProfile');
  if (!el) return;
  if (stored) {
    el.innerHTML = '<img src="' + stored + '" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
  } else {
    const span = el.querySelector('#profileInitials');
    if (span) span.textContent = initials;
  }
}
loadProfileImage();
 
// ── Quick card autofill ──
function autofill(text) {
  const input = document.getElementById('rightsInput');
  if (!input) return;
  input.value = text;
  input.focus();
  input.style.borderColor = '#4f6ef7';
  input.style.background = '#f0f3ff';
  setTimeout(() => {
    input.style.borderColor = '';
    input.style.background = '';
  }, 600);
}
 
// ── AI Responses ──
const aiResponses = [
  "Under DGCA Civil Aviation Requirements, a domestic delay of 3+ hours entitles you to free meals and refreshments. If the delay exceeds 6 hours, you're entitled to either a full refund or an alternate flight, plus ₹5,000 compensation.",
  "For international flights under EU Regulation EC 261/2004, delays over 4 hours entitle you to €250–€600 depending on distance. For Indian carriers on domestic routes, DGCA norms apply — which airline and route?",
  "If your baggage is delayed by more than 12 hours on arrival, you can claim reimbursement for essential expenses up to ₹3,500 on most Indian carriers. Make sure you filed a PIR (Property Irregularity Report) at the airport.",
  "Being denied boarding involuntarily? You're entitled to written notice of your rights, compensation, and either a full refund or the next available alternate flight.",
  "A flight cancelled with less than 14 days' notice entitles you to a full refund AND compensation — ₹5,000 for domestic (DGCA) or €125–€600 for EU-regulated flights.",
  "For refund claims: Indian carriers must process refunds within 7 working days for credit card bookings. You can escalate to DGCA's Air Sewa portal or the National Consumer Helpline (1800-11-4000).",
];
let aiIdx = 0;
 
function sendMessage() {
  const input = document.getElementById('rightsInput');
  const chat = document.getElementById('rightsChat');
  if (!input || !chat || !input.value.trim()) return;
 
  const uMsg = document.createElement('div');
  uMsg.className = 'chat-msg user';
  uMsg.textContent = input.value;
  chat.appendChild(uMsg);
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
 
  const typing = document.createElement('div');
  typing.className = 'chat-msg typing';
  typing.textContent = 'Skyra is checking your rights…';
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
 
  setTimeout(function () {
    chat.removeChild(typing);
    const bMsg = document.createElement('div');
    bMsg.className = 'chat-msg bot';
    bMsg.textContent = aiResponses[aiIdx % aiResponses.length];
    aiIdx++;
    chat.appendChild(bMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 1100);
}
 
document.getElementById('rightsSend').addEventListener('click', sendMessage);
document.getElementById('rightsInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') sendMessage();
});
 
// ── Report Tabs ──
function switchReport(type, tab) {
  document.querySelectorAll('.report-form').forEach(function (f) {
    f.classList.remove('visible');
  });
  document.querySelectorAll('.report-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  var form = document.getElementById('form-' + type);
  if (form) form.classList.add('visible');
  if (tab) tab.classList.add('active');
  var success = document.getElementById('reportSuccess');
  if (success) success.classList.remove('visible');
}
 
function submitReport() {
  var activeForm = document.querySelector('.report-form.visible');
  if (!activeForm) return;
  activeForm.classList.remove('visible');
  var success = document.getElementById('reportSuccess');
  if (success) success.classList.add('visible');
}
