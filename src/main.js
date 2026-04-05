// =========================
// 🎮 CANVAS SETUP
// =========================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =========================
// 🧱 GRID SETTINGS
// =========================
const TILE_SIZE = 64;

let cols = Math.floor(canvas.width / TILE_SIZE);
let rows = Math.floor(canvas.height / TILE_SIZE);


// =========================
// 🖱️ INPUT TRACKING
// =========================
let mouseX = 0;
let mouseY = 0;


// =========================
// 🧩 GAME STATE
// =========================

// 0 = empty
// 1 = rack
// 2 = plant
// 3 = counter
let grid = [];

// currently selected object type
let selectedObject = 1;


// =========================
// 🏗️ INITIALISE GRID
// =========================
function createGrid() {
  grid = [];
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = 0;
    }
  }
}

createGrid();


// =========================
// 🔄 RESIZE HANDLING
// =========================
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cols = Math.floor(canvas.width / TILE_SIZE);
  rows = Math.floor(canvas.height / TILE_SIZE);

  createGrid(); // rebuild grid on resize
});


// =========================
// 🖱️ INPUT EVENTS
// =========================

// track mouse movement (for hover)
canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// click to place/remove object
canvas.addEventListener("click", (e) => {
  const gridX = Math.floor(e.clientX / TILE_SIZE);
  const gridY = Math.floor(e.clientY / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    // toggle placement
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = selectedObject;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});

// touch support (mobile)
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];

  const gridX = Math.floor(touch.clientX / TILE_SIZE);
  const gridY = Math.floor(touch.clientY / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = selectedObject;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});

// change selected object with keyboard
window.addEventListener("keydown", (e) => {
  if (e.key === "1") selectedObject = 1;
  if (e.key === "2") selectedObject = 2;
  if (e.key === "3") selectedObject = 3;
});


// =========================
// 🎨 RENDERING FUNCTIONS
// =========================

// draw grid lines
function drawGrid() {
  ctx.strokeStyle = "#333";
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


// draw placed objects
function drawObjects() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const tile = grid[x][y];

      if (tile !== 0) {
        // different colours for different objects
        if (tile === 1) ctx.fillStyle = "#ff69b4"; // rack
        if (tile === 2) ctx.fillStyle = "#4CAF50"; // plant
        if (tile === 3) ctx.fillStyle = "#FFD700"; // counter

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


// highlight hovered tile
function highlightTile() {
  // skip until mouse moves
  if (mouseX === 0 && mouseY === 0) return;

  const gridX = Math.floor(mouseX / TILE_SIZE);
  const gridY = Math.floor(mouseY / TILE_SIZE);

  // prevent highlighting outside grid
  if (gridX < 0 || gridX >= cols || gridY < 0 || gridY >= rows) return;

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fillRect(
    gridX * TILE_SIZE,
    gridY * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}


// =========================
// 🔁 GAME LOOP
// =========================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawObjects();
  highlightTile();

  requestAnimationFrame(gameLoop);
}

gameLoop();