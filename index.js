// ── ENTER BUTTON ─────────────────────────────────────────────
document.getElementById('enterBtn').addEventListener('click', function () {
  window.location.href = 'login.html';
});

// ── AURORA BOREALIS CANVAS BACKGROUND ────────────────────────
(function () {
  const canvas = document.getElementById('auroraCanvas');
  const ctx = canvas.getContext('2d');

  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    speed: Math.random() * 0.004 + 0.001
  }));

  const blobs = [
    { cx: 0.20, cy: 0.35, rx: 0.55, ry: 0.28, color: [0, 200, 180],  alpha: 0.22, t: 0,   speed: 0.00018 },
    { cx: 0.65, cy: 0.25, rx: 0.50, ry: 0.22, color: [0, 100, 255],  alpha: 0.20, t: 1.5, speed: 0.00022 },
    { cx: 0.50, cy: 0.55, rx: 0.60, ry: 0.30, color: [120, 0, 255],  alpha: 0.16, t: 3.0, speed: 0.00015 },
    { cx: 0.80, cy: 0.45, rx: 0.40, ry: 0.20, color: [0, 229, 255],  alpha: 0.18, t: 0.8, speed: 0.00025 },
    { cx: 0.10, cy: 0.65, rx: 0.45, ry: 0.22, color: [0, 180, 120],  alpha: 0.14, t: 2.2, speed: 0.00020 },
    { cx: 0.45, cy: 0.15, rx: 0.50, ry: 0.18, color: [60, 0, 200],   alpha: 0.13, t: 4.0, speed: 0.00017 },
  ];

  let frame = 0;

  function drawBlob(blob) {
    blob.t += blob.speed * frame;

    const driftX = Math.sin(blob.t * 1.3) * 0.08;
    const driftY = Math.cos(blob.t * 0.9) * 0.05;
    const pulse  = 1 + Math.sin(blob.t * 2.1) * 0.08;

    const cx = (blob.cx + driftX) * W;
    const cy = (blob.cy + driftY) * H;
    const rx = blob.rx * W * pulse;
    const ry = blob.ry * H * pulse;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    const [r, g, b] = blob.color;
    grad.addColorStop(0,   `rgba(${r},${g},${b},${blob.alpha})`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},${blob.alpha * 0.5})`);
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

    ctx.save();
    ctx.scale(1, ry / rx);
    ctx.beginPath();
    ctx.arc(cx, cy * (rx / ry), rx, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawStars() {
    stars.forEach(s => {
      s.a += s.speed;
      const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
      ctx.fill();
    });
  }

  function animate() {
    frame++;

    ctx.fillStyle = '#020b18';
    ctx.fillRect(0, 0, W, H);

    drawStars();

    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach(drawBlob);
    ctx.globalCompositeOperation = 'source-over';

    const vignette = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(2,8,24,0.55)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(animate);
  }

  animate();
})();
