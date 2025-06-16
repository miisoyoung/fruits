const papers = [
  {
    title: "피터 밀러, 리서치란 무엇인가",
    text: "해변에서 조개껍데기를 캐는 것이 저에게는 리서치의 한 형태라고 말했다.",
  },
  {
    title: "아침일",
    text: "기분은 정서보다 오래 지속되고, 바깥이 아니라 우리 안에서 조절된다.",
  },
  {
    title: "시선의 범위",
    text: "그러니 지금 내 앞에 있는 과업에 충실하자. 지금 내 과업은 글루텐 프리 케이크를 맛보는 거다.",
  },
  {
    title: "질문들",
    text: "디자인은 언제부터 질서에 쾌감을 부여하기 시작했을까?",
  },
  {
    title: "피터 밀러, 리서치란 무엇인가",
    text: "디자인은 언제부터 질서에 쾌감을 부여하기 시작했을까?",
  },
  {
    title: "피터 밀러, 리서치란 무엇인가",
    text: "끈기와 결단력, 상상력, 조직력, 자기비판, 진실에 대한 사랑, 협력, 소통, 장기적인 안목이 모두 필요하다.",
  },
  {
    title: "쟈크 데리다, 애도 불가능성",
    text: "타자는 죽음 이후에도 내게 말을 건넨다. 나는 그의 목소리에 응답할 책임이 있다.",
  },
  {
    title: "세컨드 브레인",
    text: "이 책 저 책을 동시에 읽곤 했다. 그들은 내용의 일부를 발췌한 다음 노트의 서로 다른 부분에 옮겨 적어 새로운 패턴을 만들었다. 그런 식으로 발췌문을 계속 추가하며 내용을 다시 읽고 패턴을 재배열하였다. 따라서 독서와 작문은 분리할 수 없는 활동이었다.",
  },
  {
    title: "세컨드 브레인",
    text: "세상은 부호로 가득했으므로 그 두 가지 활동은 사물은 이해하기 위해 계속해야 하는 노력의 일환이었다.",
  },
  {
    title: "세컨드 브레인",
    text: "최종적인 것은 아무것도 없으므로 완벽히 준비되는 시작하겠다고 기다릴 필요가 없다.",
  },
  {
    title: "찰스 임스",
    text: "어느 누가 쾌락이 유용하지 않다고 말하겠어요?",
  },
  {
    title: "소설에서",
    text: "사람은 어떤 경우에 변하는가?",
  },
  {
    title: "방",
    text: "그렇게 미치도록 싫었던 내 방에 어제 나는 새로 산 러그를 깔았다.",
  },
  {
    title: "미하엘 하우스켈러, 왜 살아야 하는가 - Marcel Proust",
    text: "우리 생각과는 달리 사람들은 안정된 독립체가 아니라 사건의 연속체다.",
  },
  {
    title: "미하엘 하우스켈러, 왜 살아야 하는가 - Marcel Proust",
    text: "그러므로 집도 도로도 거리도 마치 시간처럼 시시각각 흘러가고 있다.",
  },
  {
    title: "미하엘 하우스켈러, 왜 살아야 하는가 - Marcel Proust",
    text: "우리가 지금 사랑하고 있는 사람들이 언젠가 사라진다는 사실은 생각하는 것만으로도 충분히 끔찍하지만,",
  },
  {
    title: "미하엘 하우스켈러, 왜 살아야 하는가 - Marcel Proust",
    text: "지금 상태에 머무르는 것에는 아무런 가치가 없다.",
  },
  {
    title: "미하엘 하우스켈러, 왜 살아야 하는가 - Marcel Proust",
    text: "하지만 내심 극서들이 내가 이해할 수 없는 무언가를 숨기고 있는 것 같다는 느낌을 받았다.",
  },
  {
    title: "크리스티앙 보뱅, 인간, 즐거움",
    text: "그렇지 않은가요?",
  },
];

// ✅ 네온 색상 목록
function getRandomNeonColor() {
  const neonColors = [
    "#39ff14", "#00ffff", "#ff00ff", "#ff073a",
    "#fafa33", "#ff6ec7", "#00bfff", "#ffd700"
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// ✅ 드래그 가능한 별
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

// ✅ 별 생성
const container = document.getElementById("star-container");
const messageContainer = document.getElementById("message-container");

papers.forEach((entry) => {
  const star = document.createElement("div");
  star.classList.add("star");

  // 위치
  star.style.top = `${Math.random() * 90}%`;
  star.style.left = `${Math.random() * 90}%`;

  // ✅ 색상 + glow
  const color = getRandomNeonColor();
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 8px ${color}, 0 0 16px ${color}`;

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

// ✅ 저장 버튼 기능
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

// ✅ 배경 그라디언트 변경
function generateRandomConicGradient() {
  const neonColors = [
    "#39ff14", "#00ffff", "#ff00ff", "#ff073a",
    "#fafa33", "#ff6ec7", "#00bfff", "#ffd700"
  ];
  const count = Math.floor(Math.random() * 3) + 3;
  const picked = Array.from({ length: count }, () =>
    neonColors[Math.floor(Math.random() * neonColors.length)]
  );
  return `conic-gradient(${picked.join(", ")})`;
}

document.body.addEventListener("click", (e) => {
  if (
    e.target.closest(".star") ||
    e.target.closest("#download-btn") ||
    e.target.closest(".message-box")
  ) {
    return;
  }
  document.body.style.background = generateRandomConicGradient();
});
