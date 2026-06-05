const responses = [
  "Based on DGCA regulations, if your flight is delayed by 3+ hours you are entitled to meals and refreshments. For delays over 6 hours on domestic routes, you may claim ₹5,000 or a full refund.",
  "For international delays over 4 hours, EU Regulation EC 261/2004 entitles you to €250–€600 depending on flight distance. Which airline and route?",
  "If your baggage is delayed by more than 12 hours, you can claim essential expenses up to ₹3,500 on most Indian carriers. Keep your receipts.",
  "Denied boarding against your will? You're entitled to compensation plus an alternate flight or full refund, plus written notice of your rights.",
  "Cancelled flight with less than 14 days notice? You're owed a full refund AND compensation between €125–€600 (EU flights) or ₹5,000 (domestic).",
];
let idx = 0;

function sendMessage() {
  const input = document.getElementById('rightsInput');
  const chat  = document.getElementById('rightsChat');
  if (!input.value.trim()) return;
  const uMsg = document.createElement('div');
  uMsg.className = 'chat-msg user';
  uMsg.textContent = input.value;
  chat.appendChild(uMsg);
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
  setTimeout(function () {
    const bMsg = document.createElement('div');
    bMsg.className = 'chat-msg bot';
    bMsg.textContent = responses[idx % responses.length];
    idx++;
    chat.appendChild(bMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 800);
}

document.getElementById('rightsSend').addEventListener('click', sendMessage);
document.getElementById('rightsInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') sendMessage();
});
