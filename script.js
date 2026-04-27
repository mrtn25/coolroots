var gifLoaded = false;

function transformCity() {
  var wrapper = document.getElementById('heroWrapper');
  var btn = document.getElementById('tapBtn');
  var gifImg = document.getElementById('heroImgAfter');

  // Load GIF src on first click (so it starts playing from the beginning)
  if (!gifLoaded) {
    gifImg.src = gifImg.getAttribute('data-src');
    gifLoaded = true;
  }

  wrapper.classList.toggle('transformed');

  if (wrapper.classList.contains('transformed')) {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
  } else {
    // Reset GIF by reloading src so it replays from start next click
    gifImg.src = '';
    gifLoaded = false;
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
    btn.innerHTML = 'Tap to transform &#x2197;';
  }
}
