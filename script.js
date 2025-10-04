const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultDiv = document.getElementById("result");

const segments = [
  "🎁 جائزة",
  "🔄 فرصة أخرى",
  "😢 لا شيء",
  "💸 خصم %50",
  "🎉 هدايا",
  "🆓 محاولة مجانية"
];

const colors = [
  "#E74C3C", // أحمر
  "#3498DB", // أزرق
  "#95A5A6", // رمادي
  "#27AE60", // أخضر
  "#F1C40F", // أصفر
  "#9B59B6"  // بنفسجي
];

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
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Arial";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    ctx.fillText(segments[i], 150, 0);
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
