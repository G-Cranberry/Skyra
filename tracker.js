const statsEl = document.getElementById('flightStats');
statsEl.style.display = 'none';

document.getElementById('trackBtn').addEventListener('click', function () {
  const val = document.getElementById('trackInput').value.trim();
  if (!val) return;
  const map = document.getElementById('trackerMap');
  map.innerHTML =
    '<span>&#9992;&#65039;</span>' +
    '<p style="font-size:14px;font-weight:700;">' + val.toUpperCase() + ' &middot; LIVE</p>' +
    '<div style="font-size:12px;color:#6a8cb8;">Mumbai &#8594; Delhi &middot; 35,000 ft &middot; 840 km/h</div>';
  statsEl.style.display = 'grid';
});
