/* ── GIF hero ─────────────────────────────────────────────── */
var gifLoaded = false;
var gifDone   = false;

function transformCity() {
  if (gifDone) return;
  var wrapper = document.getElementById('heroWrapper');
  var btn     = document.getElementById('tapBtn');
  var gifImg  = document.getElementById('heroImgAfter');

  if (!gifLoaded) {
    gifImg.src = gifImg.getAttribute('data-src');
    gifLoaded  = true;
  }

  wrapper.classList.add('transformed');
  btn.style.opacity       = '0';
  btn.style.pointerEvents = 'none';

  setTimeout(function () { gifDone = true; }, 5000);
}

/* ── Animated counters in Challenge section ───────────────── */
// lime #C8F135 → dark red-orange #D94A00

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
  var COLOR_START = '#C8F135'; // lime
  var COLOR_END   = '#D94A00'; // dark red-orange

  function step(ts) {
    if (!start) start = ts;
    var elapsed  = ts - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    var current  = Math.max(1, Math.round(eased * target));
    el.textContent = prefix + current + suffix;
    el.style.color = lerpColor(COLOR_START, COLOR_END, eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target + suffix;
      el.style.color = COLOR_END;
    }
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
