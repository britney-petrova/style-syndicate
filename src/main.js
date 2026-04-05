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

// selected object type
let selectedObject = 1;


// =========================
// 🏗️ GRID INITIALISATION
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

  createGrid();
});


// =========================
// 🧭 UI SYSTEM
// =========================

// UI bar settings
const UI_HEIGHT = 100;

const uiButtons = [
  { id: 1, label: "Rack", color: "#ff69b4" },
  { id: 2, label: "Plant", color: "#4CAF50" },
  { id: 3, label: "Counter", color: "#FFD700" }
];


// =========================
// 🖱️ INPUT EVENTS
// =========================

// track mouse movement
canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// handle click (UI + grid)
canvas.addEventListener("click", (e) => {
  const clickX = e.clientX;
  const clickY = e.clientY;

  // check if clicking UI
  if (clickY > canvas.height - UI_HEIGHT) {
    handleUIClick(clickX, clickY);
    return;
  }

  // otherwise place on grid
  const gridX = Math.floor(clickX / TILE_SIZE);
  const gridY = Math.floor(clickY / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = selectedObject;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});

// touch support
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];

  const clickX = touch.clientX;
  const clickY = touch.clientY;

  if (clickY > canvas.height - UI_HEIGHT) {
    handleUIClick(clickX, clickY);
    return;
  }

  const gridX = Math.floor(clickX / TILE_SIZE);
  const gridY = Math.floor(clickY / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = selectedObject;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});


// =========================
// 🧭 UI LOGIC
// =========================
function handleUIClick(x, y) {
  const buttonWidth = canvas.width / uiButtons.length;

  const index = Math.floor(x / buttonWidth);
  const button = uiButtons[index];

  if (button) {
    selectedObject = button.id;
  }
}


// =========================
// 🎨 RENDERING
// =========================

// draw grid
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
        if (tile === 1) ctx.fillStyle = "#ff69b4";
        if (tile === 2) ctx.fillStyle = "#4CAF50";
        if (tile === 3) ctx.fillStyle = "#FFD700";

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


// highlight tile (not over UI)
function highlightTile() {
  if (mouseX === 0 && mouseY === 0) return;

  // don't highlight over UI
  if (mouseY > canvas.height - UI_HEIGHT) return;

  const gridX = Math.floor(mouseX / TILE_SIZE);
  const gridY = Math.floor(mouseY / TILE_SIZE);

  if (gridX < 0 || gridX >= cols || gridY < 0 || gridY >= rows) return;

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fillRect(
    gridX * TILE_SIZE,
    gridY * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}


// draw UI bar
function drawUI() {
  // background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, canvas.height - UI_HEIGHT, canvas.width, UI_HEIGHT);

  const buttonWidth = canvas.width / uiButtons.length;

  uiButtons.forEach((button, index) => {
    const x = index * buttonWidth;
    const y = canvas.height - UI_HEIGHT;

    // highlight selected
    if (selectedObject === button.id) {
      ctx.fillStyle = "#444";
      ctx.fillRect(x, y, buttonWidth, UI_HEIGHT);
    }

    // icon
    ctx.fillStyle = button.color;
    ctx.fillRect(x + 20, y + 20, 40, 40);

    // label
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(button.label, x + 20, y + 80);
  });
}


// =========================
// 🔁 GAME LOOP
// =========================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawObjects();
  highlightTile();
  drawUI();

  requestAnimationFrame(gameLoop);
}

gameLoop();