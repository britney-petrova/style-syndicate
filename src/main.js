const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// set canvas size (landscape mobile ratio)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILE_SIZE = 64; // size of each square

let cols = Math.floor(canvas.width / TILE_SIZE);
let rows = Math.floor(canvas.height / TILE_SIZE);

let mouseX = 0;
let mouseY = 0;

// resize on screen change
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cols = Math.floor(canvas.width / TILE_SIZE);
  rows = Math.floor(canvas.height / TILE_SIZE);
});

// desktop clicks
canvas.addEventListener("click", (e) => {
  console.log("Mouse click:", e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// mobile taps
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  console.log("Touch:", touch.clientX, touch.clientY);
});

function highlightTile() {
  const gridX = Math.floor(mouseX / TILE_SIZE);
  const gridY = Math.floor(mouseY / TILE_SIZE);

  ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
  ctx.fillRect(
    gridX * TILE_SIZE,
    gridY * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

function drawGrid() {
  ctx.strokeStyle = "#333"; // grid line colour
  ctx.lineWidth = 1;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.strokeRect(
        x * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

// basic game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  highlightTile();

  requestAnimationFrame(gameLoop);
}

gameLoop();