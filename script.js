window.addEventListener('load', () => {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const numFlakes = 150;
  let flakes = [];

  for(let i=0;i<numFlakes;i++){
    flakes.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*6+2,
      speed: Math.random()*1.5 + 0.5,
    });
  }

  function getSectionColor(){
    const sections = document.querySelectorAll(".page");
    let current = "white";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if(rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2){
        current = section.classList.contains("black") ? "black" : "white";
      }
    });
    return current;
  }

  function drawTriangle(x,y,size,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y-size);
    ctx.lineTo(x-size/2, y+size/2);
    ctx.lineTo(x+size/2, y+size/2);
    ctx.closePath();
    ctx.fill();
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const secColor = getSectionColor();
    const flakeColor = secColor==="black" ? "white" : "black";

    flakes.forEach(flake=>{
      drawTriangle(flake.x,flake.y,flake.size,flakeColor);
      flake.y += flake.speed;
      if(flake.y>canvas.height){
        flake.y = 0;
        flake.x = Math.random()*canvas.width;
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
});

