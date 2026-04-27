/* ── GIF hero ────────────────────────────────────────────────── */
// NOTE: True single-play GIF is not possible in plain HTML — browsers always loop GIFs.
// Best approach: use libgif.js or gifuct-js to decode frame-by-frame, OR
// simply let the GIF play naturally (it loops) and after a fixed duration
// replace it with the static final frame (a screenshot saved as hero-after.jpg).
// We use the simpler approach: show GIF for ~6 s then freeze on static image.

var gifLoaded = false;
var gifDone   = false;

function transformCity() {
  if (gifDone) return;
  var wrapper   = document.getElementById('heroWrapper');
  var btn       = document.getElementById('tapBtn');
  var gifEl     = document.getElementById('heroImgAfter');
  var canvas    = document.getElementById('heroCanvas');

  if (!gifLoaded) {
    gifEl.src = gifEl.getAttribute('data-src');
    gifLoaded = true;
  }

  // Show the GIF (hidden img drives loading; canvas shows it visually)
  gifEl.style.display = 'block';
  gifEl.style.opacity = '0';
  gifEl.style.position = 'absolute';
  gifEl.style.top = '0';
  gifEl.style.left = '0';
  gifEl.style.width = '100%';
  gifEl.style.height = '100%';
  gifEl.style.objectFit = 'cover';
  gifEl.style.zIndex = '2';

  // Fade in
  wrapper.classList.add('transformed');
  btn.style.opacity       = '0';
  btn.style.pointerEvents = 'none';

  // Fade in the GIF image directly
  gifEl.style.transition = 'opacity 0.9s ease';
  setTimeout(function () { gifEl.style.opacity = '1'; }, 50);

  // After ~6 s (one loop of most GIFs), freeze by drawing last frame to canvas
  // Since we can't reliably detect GIF end, we use a timeout.
  // The GIF will keep looping visually until we swap to static.
  setTimeout(function () {
    // Try to paint current GIF frame to canvas and show canvas instead
    try {
      canvas.width  = gifEl.naturalWidth  || gifEl.offsetWidth;
      canvas.height = gifEl.naturalHeight || gifEl.offsetHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(gifEl, 0, 0, canvas.width, canvas.height);
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
      canvas.style.zIndex  = '3';
      gifEl.style.opacity  = '0';
      setTimeout(function () { gifEl.style.display = 'none'; }, 600);
    } catch(e) {
      // Cross-origin GIF blocks canvas taint — just leave GIF playing
    }
    gifDone = true;
  }, 6000);
}

/* ── Animated counters in Challenge section ───────────────── */
function lerpColor(from, to, t) {
  var f = parseInt(from.slice(1), 16);
  var e = parseInt(to.slice(1),   16);
  var r = Math.round(((f >> 16) & 0xff) + (((e >> 16) & 0xff) - ((f >> 16) & 0xff)) * t);
  var g = Math.round(((f >>  8) & 0xff) + (((e >>  8) & 0xff) - ((f >>  8) & 0xff)) * t);
  var b = Math.round(( f        & 0xff) + (( e        & 0xff) - ( f        & 0xff)) * t);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function animateStat(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  var target      = parseInt(el.dataset.target, 10);
  var prefix      = el.dataset.prefix  || '';
  var suffix      = el.dataset.suffix  || '';
  var duration    = 1400;
  var start       = null;
  var COLOR_START = '#C8F135';
  var COLOR_END   = '#D94A00';
  function step(ts) {
    if (!start) start = ts;
    var elapsed  = ts - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    var current  = Math.max(1, Math.round(eased * target));
    el.textContent = prefix + current + suffix;
    el.style.color = lerpColor(COLOR_START, COLOR_END, eased);
    if (progress < 1) { requestAnimationFrame(step); }
    else { el.textContent = prefix + target + suffix; el.style.color = COLOR_END; }
  }
  requestAnimationFrame(step);
}

function animateTextStat(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  var COLOR_START = '#C8F135';
  var COLOR_END   = '#D94A00';
  var duration = 1400;
  var start    = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / duration, 1);
    var e = 1 - Math.pow(1 - p, 3);
    el.style.color = lerpColor(COLOR_START, COLOR_END, e);
    if (p < 1) requestAnimationFrame(step);
    else el.style.color = COLOR_END;
  }
  requestAnimationFrame(step);
}

var challengeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.stat-num[data-target]').forEach(animateStat);
    document.querySelectorAll('.stat-num.stat-text').forEach(animateTextStat);
    challengeObserver.disconnect();
  });
}, { threshold: 0.3 });

var challengeSection = document.querySelector('.challenge');
if (challengeSection) challengeObserver.observe(challengeSection);
