// Animate gauge on load
window.addEventListener('load', function () {
  const num = document.querySelector('.gauge-num');
  let count = 0;
  const target = 78;
  const interval = setInterval(function () {
    if (count >= target) { clearInterval(interval); return; }
    count += 2;
    num.textContent = Math.min(count, target);
  }, 20);
});
