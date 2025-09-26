const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createSnowflake() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 3 + 1;
  const speed = Math.random() + 0.5;
  return { x, y, radius, speed };
}

function drawSnowflake(snowflake, color) {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSnowflake(snowflake) {
  snowflake.y += snowflake.speed;
  if (snowflake.y > canvas.height) {
    snowflake.y = 0;
    snowflake.x = Math.random() * canvas.width;
  }
}

function getSectionColor() {
  const sections = document.querySelectorAll(".page");
  let current = "white";
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      current = section.classList.contains("black") ? "black" : "white";
    }
  });
  return current;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const currentSectionColor = getSectionColor();
  const flakeColor = currentSectionColor === "black" ? "white" : "black";

  snowflakes.forEach((snowflake, i) => {
    drawSnowflake(snowflake, flakeColor);
    updateSnowflake(snowflake);
  });

  requestAnimationFrame(animate);
}

function init() {
  for (let i = 0; i < 150; i++) {
    snowflakes.push(createSnowflake());
  }
  animate();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
