const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// set canvas size (landscape mobile ratio)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// resize on screen change
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// desktop clicks
canvas.addEventListener("click", (e) => {
  console.log("Mouse click:", e.clientX, e.clientY);
});

// mobile taps
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  console.log("Touch:", touch.clientX, touch.clientY);
});

// basic game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // temporary test rectangle
  ctx.fillStyle = "pink";
  ctx.fillRect(50, 50, 100, 100);

  requestAnimationFrame(gameLoop);
}

gameLoop();