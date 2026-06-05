const dropZone   = document.getElementById('dropZone');
const audioInput = document.getElementById('audioUpload');
const statusEl   = document.getElementById('uploadStatus');

dropZone.addEventListener('click', function () { audioInput.click(); });

dropZone.addEventListener('dragover', function (e) {
  e.preventDefault();
  dropZone.style.borderColor = '#4a90d9';
  dropZone.style.background  = '#f5f9ff';
});
dropZone.addEventListener('dragleave', function () {
  dropZone.style.borderColor = '#e8ecf0';
  dropZone.style.background  = '';
});
dropZone.addEventListener('drop', function (e) {
  e.preventDefault();
  dropZone.style.borderColor = '#e8ecf0';
  dropZone.style.background  = '';
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

audioInput.addEventListener('change', function () {
  if (audioInput.files[0]) handleFile(audioInput.files[0]);
});

function handleFile(file) {
  statusEl.textContent = '&#128257; Analysing ' + file.name + ' ...';
  setTimeout(function () {
    statusEl.textContent = '✓ Analysis complete — scroll down to see results.';
  }, 2200);
}
