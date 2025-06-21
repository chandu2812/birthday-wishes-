const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const radius = 2 + Math.random() * 3;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

  for (let i = 0; i < 30; i++) {
    fireworks.push({
      x, y,
      radius,
      color,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((p, i) => {
    const dx = Math.cos(p.angle) * p.speed;
    const dy = Math.sin(p.angle) * p.speed;

    p.x += dx;
    p.y += dy;
    p.alpha -= 0.01;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = p.color.replace('60%', `${p.alpha * 60}%`);
    ctx.fill();
  });

  fireworks = fireworks.filter(p => p.alpha > 0);
  requestAnimationFrame(animate);
}

setInterval(createFirework, 800);
animate();
