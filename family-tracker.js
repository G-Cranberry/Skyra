document.getElementById('generateBtn').addEventListener('click', function () {
  const fn    = document.getElementById('flightNumInput').value.trim() || '6E-204';
  const area  = document.getElementById('shareLinkArea');
  const text  = document.getElementById('shareLinkText');
  const token = 'sk_live_' + Math.random().toString(36).substr(2, 8);
  text.textContent = 'https://skyra.app/track/' + fn + '?token=' + token;
  area.style.display = 'block';
});
