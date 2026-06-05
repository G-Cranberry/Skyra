const savedAvatar = localStorage.getItem('skyra_avatar');
const savedName   = localStorage.getItem('skyra_name');
const el = document.getElementById('crewAvatar');
if (el) {
  if (savedAvatar) {
    el.innerHTML = '<img src="' + savedAvatar + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';
  } else if (savedName) {
    const parts = savedName.trim().split(' ');
    el.textContent = ((parts[0]||'')[0] + (parts[1]||'')[0]).toUpperCase();
  }
}
