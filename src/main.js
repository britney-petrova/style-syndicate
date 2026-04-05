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

let grid = [];

for (let x = 0; x < cols; x++) {
  grid[x] = [];
  for (let y = 0; y < rows; y++) {
    grid[x][y] = 0; // 0 = empty, 1 = object placed
  }
}

// resize on screen change
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cols = Math.floor(canvas.width / TILE_SIZE);
  rows = Math.floor(canvas.height / TILE_SIZE);

  // rebuild grid
  grid = [];
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = 0;
    }
  }
});

// desktop clicks
canvas.addEventListener("click", (e) => {
  const gridX = Math.floor(e.clientX / TILE_SIZE);
  const gridY = Math.floor(e.clientY / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = 1;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});
// mobile taps
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];

  const gridX = Math.floor(touch.clientX / TILE_SIZE);
  const gridY = Math.floor(touch.clientY / TILE_SIZE);

  if (grid[gridX][gridY] === 0) {
    grid[gridX][gridY] = 1;
  } else {
    grid[gridX][gridY] = 0;
  }
});

function highlightTile() {
  // skip highlight until cursor moves
  if (mouseX === 0 && mouseY === 0) return;

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

function drawObjects() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 1) {
        ctx.fillStyle = "#ff69b4"; // pink object
        ctx.fillRect(
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }
}

// basic game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawObjects();
  highlightTile();

  requestAnimationFrame(gameLoop);
}

gameLoop();