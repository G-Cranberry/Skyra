function handleGoogleLogin(role) {
  // Simulate Google login — redirect to home
  if (role === 'passenger') {
    window.location.href = 'passenger-home.html';
  } else {
    window.location.href = 'crew-home.html';
  }
}

function handleEmailLogin(role) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please enter your email and password.');
    return;
  }

  // Simulate login — redirect to home
  if (role === 'passenger') {
    window.location.href = 'passenger-home.html';
  } else {
    window.location.href = 'crew-home.html';
  }
}
