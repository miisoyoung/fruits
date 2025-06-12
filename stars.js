const papers = [
  {
    title: "해변에서 조개껍데기를 캐는 것이",
    text: "해변에서 조개껍데기를 캐는 것이 저에게는 리서치의 한 형태라고 말했습니다.",
  },
  {
    title: "아침일",
    text: "기분은 정서보다 오래 지속되고, 개인 내부에서 조절됩니다.",
  },
  {
    title: "시선의 범위",
    text: "지금 내 앞에 있는 과업에 충실하자. 지금 내 과업은 글루텐 프리 케이크를 맛보는 거다.",
  },
  {
    title: "Advanced Cabinet",
    text: "디자인은 언제부터 질서에 쾌감을 부여하기 시작했을까?",
  },
];

// 드래그 + 클릭 구분
function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;
  let wasDragged = false;

  el.addEventListener("mousedown", (e) => {
    isDragging = true;
    wasDragged = false;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.style.position = "absolute";
    el.style.zIndex = 10000;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      wasDragged = true;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  el.addEventListener("click", (e) => {
    if (wasDragged) {
      e.stopPropagation();
      return;
    }
    const msg = document.createElement("div");
    msg.classList.add("message-box");
    msg.innerHTML = `<p>${el.dataset.text}</p>`;
    document.getElementById("message-container").appendChild(msg);
  });
}

// 별 생성
const container = document.getElementById("star-container");
const messageContainer = document.getElementById("message-container");

papers.forEach((entry) => {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = `${Math.random() * 90}%`;
  star.style.left = `${Math.random() * 90}%`;

  // 툴팁
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.innerText = `${entry.title}\n\n${entry.text}`;
  tooltip.style.display = "none";
  container.appendChild(tooltip);

  star.addEventListener("mouseover", () => {
    tooltip.style.display = "block";
  });
  star.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.pageX + 15}px`;
    tooltip.style.top = `${e.pageY + 15}px`;
  });
  star.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  star.dataset.text = entry.text;
  makeDraggable(star);
  container.appendChild(star);
});

// 다운로드 버튼 기능
document.getElementById("download-btn").addEventListener("click", () => {
  const boxes = document.querySelectorAll(".message-box p");
  if (boxes.length === 0) {
    alert("저장할 텍스트가 없습니다.");
    return;
  }

  let combinedText = "";
  boxes.forEach((p, index) => {
    combinedText += `--- ${index + 1} ---\n${p.textContent}\n\n`;
  });

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const fileName = `${dateStr}_fruits.txt`;

  const blob = new Blob([combinedText], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  document.getElementById("message-container").innerHTML = "";
});


function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomConicGradient() {
  const colorCount = Math.floor(Math.random() * 3) + 3; // 3~5개 색
  const colors = Array.from({ length: colorCount }, getRandomColor);
  return `conic-gradient(${colors.join(", ")})`;
}

document.body.addEventListener("click", (e) => {
  // 별이나 버튼 클릭 시에는 배경 안 바꿈
  if (
    e.target.closest(".star") ||
    e.target.closest("#download-btn") ||
    e.target.closest(".message-box")
  ) {
    return;
  }

  // 배경 변경
  document.body.style.background = generateRandomConicGradient();
});
