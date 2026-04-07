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
// 🧩 GAME STATE
// =========================
let grid = [];
let selectedObject = 1;


// =========================
// 🖼️ LOAD SPRITES
// =========================
const sprites = {
  1: new Image(), // rack
  2: new Image(), // plant
  3: new Image()  // counter
};

sprites[1].src = "assets/rack.png";
sprites[2].src = "assets/plant.png";
sprites[3].src = "assets/counter.png";


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
// 🔄 RESIZE
// =========================
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cols = Math.floor(canvas.width / TILE_SIZE);
  rows = Math.floor(canvas.height / TILE_SIZE);

  createGrid();
});


// =========================
// 🖱️ INPUT
// =========================
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  if (y > canvas.height - 100) {
    handleUIClick(x);
    return;
  }

  const gridX = Math.floor(x / TILE_SIZE);
  const gridY = Math.floor(y / TILE_SIZE);

  if (grid[gridX] && grid[gridX][gridY] !== undefined) {
    grid[gridX][gridY] = grid[gridX][gridY] === 0 ? selectedObject : 0;
  }
});


// =========================
// 🎨 DRAW GRID
// =========================
function drawGrid() {
  ctx.strokeStyle = "#2a2a2a";

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


// =========================
// 🖼️ DRAW OBJECTS (SPRITES)
// =========================
function drawObjects() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const tile = grid[x][y];

      if (tile !== 0) {
        const img = sprites[tile];

        if (img.complete) {
          const baseX = x * TILE_SIZE;
          const baseY = y * TILE_SIZE;

          // === SHADOW ===
          ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
          ctx.beginPath();
          ctx.ellipse(
            baseX + TILE_SIZE / 2,
            baseY + TILE_SIZE - 6,
            TILE_SIZE / 3,
            TILE_SIZE / 6,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // === OBJECT (lifted slightly) ===
          const lift = 10;

          ctx.drawImage(
            img,
            baseX + 4,
            baseY - lift,
            TILE_SIZE - 8,
            TILE_SIZE
          );
        }
      }
    }
  }
}


// =========================
// 🧭 UI
// =========================
const uiButtons = [
  { id: 1, label: "Rack" },
  { id: 2, label: "Plant" },
  { id: 3, label: "Counter" }
];

function handleUIClick(x) {
  const width = canvas.width / uiButtons.length;
  const index = Math.floor(x / width);

  if (uiButtons[index]) {
    selectedObject = uiButtons[index].id;
  }
}

function drawUI() {
  const UI_HEIGHT = 100;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, canvas.height - UI_HEIGHT, canvas.width, UI_HEIGHT);

  const width = canvas.width / uiButtons.length;

  uiButtons.forEach((btn, i) => {
    const x = i * width;
    const y = canvas.height - UI_HEIGHT;

    if (selectedObject === btn.id) {
      ctx.fillStyle = "#444";
      ctx.fillRect(x, y, width, UI_HEIGHT);
    }

    ctx.fillStyle = "white";
    ctx.fillText(btn.label, x + 20, y + 60);
  });
}


// =========================
// 🔁 LOOP
// =========================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawObjects();
  drawUI();

  requestAnimationFrame(gameLoop);
}

gameLoop();