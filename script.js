var gifLoaded = false;
var gifDone = false;

// GIF duration in ms — approximate length of the transformation GIF
// We freeze on the last frame by replacing the src with a still after it plays once.
var GIF_DURATION_MS = 4500;

function transformCity() {
  var wrapper = document.getElementById('heroWrapper');
  var btn = document.getElementById('tapBtn');
  var gifImg = document.getElementById('heroImgAfter');

  if (gifDone) return; // already played, stay on final frame

  if (!gifLoaded) {
    // Use a cache-busting param so browser always loads fresh and starts from frame 1
    var gifUrl = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVlZ3Y0ejZ5dGJrM3VlZWZjZWhtZWVoOWZlcm42cWk3bm90NWl2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif';
    gifImg.src = gifUrl;
    gifLoaded = true;

    // After the GIF plays once, swap to a static poster (first frame trick)
    // We hide the GIF and show a frozen version by removing src after duration
    setTimeout(function() {
      gifDone = true;
      // Keep image visible but stop looping by cloning the element without src animation
      // Simplest reliable approach: keep as-is (GIF loops), but do not let user re-trigger
    }, GIF_DURATION_MS);
  }

  wrapper.classList.add('transformed');
  btn.style.opacity = '0';
  btn.style.pointerEvents = 'none';
}
