const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultDiv = document.getElementById("result");

const segments = [
  "🎁 فستان مجاني",
  "🔄 فرصة أخرى",
  "😢 لا شيء",
  "💸 خصم %50",
  "🎉 هدايا",
  "🆓 محاولة مجانية"
];

const colors = [
  "#E74C3C",
  "#3498DB",
  "#95A5A6",
  "#27AE60",
  "#F1C40F",
  "#9B59B6"
];

let angle = 0;
let spinning = false;

function drawWheel(rotation = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const segmentAngle = (2 * Math.PI) / segments.length;

  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * segmentAngle + rotation;
    const endAngle = startAngle + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + segmentAngle / 2);
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

  // مؤشر في الأعلى
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(240, 20);
  ctx.lineTo(260, 20);
  ctx.fillStyle = "#2d3436";
  ctx.fill();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  let spinAngle = Math.random() * 360 + 720;
  let currentAngle = 0;

  const interval = setInterval(() => {
    currentAngle += 10;
    angle = (angle + 10) % 360;
    drawWheel((angle * Math.PI) / 180);

    if (currentAngle >= spinAngle) {
      clearInterval(interval);
      const segmentAngle = 360 / segments.length;
      const index = Math.floor(((360 - angle % 360) % 360) / segmentAngle);
      resultDiv.textContent = `النتيجة: ${segments[index]}`;
      spinning = false;
    }
  }, 20);
}

drawWheel();
spinBtn.addEventListener("click", spinWheel);
