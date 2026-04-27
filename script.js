function transformCity() {
  const wrapper = document.getElementById('heroWrapper');
  wrapper.classList.toggle('transformed');
  const btn = document.getElementById('tapBtn');
  if (wrapper.classList.contains('transformed')) {
    btn.textContent = 'Tap to reset ↺';
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  } else {
    btn.innerHTML = 'Tap to transform &#x2197;';
  }
}

// Re-show button after transform so user can toggle back
document.getElementById('heroWrapper').addEventListener('transitionend', function() {
  const wrapper = document.getElementById('heroWrapper');
  const btn = document.getElementById('tapBtn');
  if (wrapper.classList.contains('transformed')) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  }
});
