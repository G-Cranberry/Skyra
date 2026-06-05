// Restore saved data
const savedAvatar = localStorage.getItem('skyra_avatar');
const savedName   = localStorage.getItem('skyra_name');
const savedEmail  = localStorage.getItem('skyra_email');

if (savedAvatar) {
  ['profileAvatarDisplay','profileNavAvatar'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '<img src="' + savedAvatar + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';
  });
}
if (savedName) {
  document.getElementById('profileDisplayName').textContent = savedName;
  const parts = savedName.trim().split(' ');
  const initials = ((parts[0]||'')[0] + (parts[1]||'')[0]).toUpperCase();
  if (!savedAvatar) {
    ['profileAvatarDisplay','profileNavAvatar'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.textContent = initials;
    });
  }
  document.getElementById('inputFirst').value = parts[0] || '';
  document.getElementById('inputLast').value  = parts[1] || '';
}
if (savedEmail) {
  document.getElementById('profileDisplayEmail').textContent = savedEmail;
  document.getElementById('inputEmail').value = savedEmail;
}

// Avatar upload
document.getElementById('avatarUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    const src = ev.target.result;
    localStorage.setItem('skyra_avatar', src);
    ['profileAvatarDisplay','profileNavAvatar'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';
    });
  };
  reader.readAsDataURL(file);
});

// Save profile
document.getElementById('saveBtn').addEventListener('click', function () {
  const first = document.getElementById('inputFirst').value.trim();
  const last  = document.getElementById('inputLast').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const fullName = first + ' ' + last;

  localStorage.setItem('skyra_name',  fullName);
  localStorage.setItem('skyra_email', email);

  document.getElementById('profileDisplayName').textContent  = fullName;
  document.getElementById('profileDisplayEmail').textContent = email;

  const initials = ((first[0]||'') + (last[0]||'')).toUpperCase();
  if (!localStorage.getItem('skyra_avatar')) {
    ['profileAvatarDisplay','profileNavAvatar'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el && !el.querySelector('img')) el.textContent = initials;
    });
  }

  const btn = document.getElementById('saveBtn');
  btn.textContent = '&#10003; SAVED';
  btn.style.background = '#4a90d9';
  setTimeout(function () {
    btn.textContent = 'SAVE CHANGES';
    btn.style.background = '#1a1a2e';
  }, 2000);
});
