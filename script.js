document.getElementById("calcButton").addEventListener("click", function () {
  const ids = ["nexo", "grandeur", "gv60", "gv70", "gv80", "g70", "g80", "g90"];
  const carCounts = {};
  ids.forEach(id => {
    carCounts[id] = parseInt(document.getElementById(id).value) || 0;
  });

  const tradein = parseInt(document.getElementById("tradeinCount").value) || 0;
  const gfNew = parseInt(document.getElementById("gfNew").value) || 0;
  const gfOld = parseInt(document.getElementById("gfOld").value) || 0;

  // 현금 포상 계산
  let cash = 0;

  // 넥쏘
  if (carCounts.nexo === 1) {
    cash += 720000;
  } else if (carCounts.nexo >= 2) {
    cash += Math.min(carCounts.nexo * 1000000, 5000000);
  }

  // 나머지 차량
  const otherTotal =
    carCounts.grandeur + carCounts.gv60 + carCounts.gv70 +
    carCounts.gv80 + carCounts.g70 + carCounts.g80 + carCounts.g90;

  if (otherTotal === 1) cash += 100000;
  else if (otherTotal === 2) cash += 400000;
  else if (otherTotal >= 3) cash += otherTotal * 300000;

  // CRM 포인트
  const crm = (tradein * 100000) + (gfNew * 100000) + (gfOld * 50000);

  // 결과 표시
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `
    💰 <strong>총 현금 포상:</strong> ${cash.toLocaleString()}원<br>
    🎯 <strong>총 CRM 포인트:</strong> ${crm.toLocaleString()}P
  `;
  resultEl.classList.remove("show");
  void resultEl.offsetWidth; // Reflow
  resultEl.classList.add("show");
});
