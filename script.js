const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultDiv = document.getElementById("result");

const segments = ["جائزة 🎁", "فرصة أخرى 🔄", "لا شيء 😢", "خصم %50", "هدايا 🎉", "محاولة مجانية"];
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
let angle = 0;
let spinning = false;

function drawWheel() {
  const segmentAngle = (2 * Math.PI) / segments.length;
  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, i * segmentAngle, (i + 1) * segmentAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(i * segmentAngle + segmentAngle / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.fillText(segments[i], 100, 0);
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  let spinAngle = Math.random() * 360 + 720;
  let currentAngle = 0;
  const interval = setInterval(() => {
    currentAngle += 10;
    angle = (angle + 10) % 360;
    canvas.style.transform = `rotate(${angle}deg)`;
    if (currentAngle >= spinAngle) {
      clearInterval(interval);
      const segmentIndex = Math.floor(((360 - angle % 360) / 360) * segments.length) % segments.length;
      resultDiv.textContent = `النتيجة: ${segments[segmentIndex]}`;
      spinning = false;
    }
  }, 20);
}

drawWheel();
spinBtn.addEventListener("click", spinWheel);
