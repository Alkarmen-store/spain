const shareBtn = document.getElementById("share");
let currentResult = ""; // لتخزين النتيجة الحالية

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
      currentResult = segments[index];
      resultDiv.textContent = `النتيجة: ${currentResult}`;
      spinning = false;
    }
  }, 20);
}

shareBtn.addEventListener("click", () => {
  if (!currentResult) {
    alert("يرجى تدوير الدولاب أولاً!");
    return;
  }

  const message = `🎡 لقد حصلت على: ${currentResult} من دولاب الحظ! جربه الآن!`;
  const url = `https://alkarmen-store.github.io/spain/`; // رابط موقعك
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message + "\n" + url)}`;
  window.open(whatsappLink, "_blank");
});
