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
  if (carCounts.nexo === 1) cash += 720000;
  else if (carCounts.nexo >= 2) cash += Math.min(carCounts.nexo * 1000000, 5000000);

  const otherTotal = ids.slice(1).reduce((sum, id) => sum + carCounts[id], 0);
  if (otherTotal === 1) cash += 100000;
  else if (otherTotal === 2) cash += 400000;
  else if (otherTotal >= 3) cash += otherTotal * 300000;

  // CRM 포인트 계산
  const crm = (tradein * 100000) + (gfNew * 100000) + (gfOld * 50000);

  // 결과 출력
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `
    💰 <strong>총 현금 포상:</strong> ${cash.toLocaleString()}원<br>
    🎯 <strong>총 CRM 포인트:</strong> ${crm.toLocaleString()}P
  `;
  resultEl.classList.remove("show");
  void resultEl.offsetWidth;
  resultEl.classList.add("show");

  // 추가 목표 제안
  const suggestionEl = document.getElementById("suggestion");
  let suggestion = "";

  if (carCounts.nexo === 0) {
    suggestion = "📢 넥쏘 차량을 1대 더 판매하면 720,000원의 포상을 받을 수 있어요!";
  } else if (carCounts.nexo === 1) {
    suggestion = "📢 넥쏘 차량을 1대 더 판매하면 총 포상이 2,000,000원으로 증가해요!";
  } else if (carCounts.nexo > 1 && carCounts.nexo < 5) {
    suggestion = `📢 넥쏘 차량을 ${5 - carCounts.nexo}대 더 판매하면 최대 포상인 5,000,000원을 받을 수 있어요!`;
  }

  if (otherTotal === 1) {
    suggestion ||= "📢 그 외 차량 1대를 더 판매하면 총 포상이 400,000원으로 증가해요!";
  } else if (otherTotal === 2) {
    suggestion ||= "📢 그 외 차량을 1대 더 판매하면 대당 300,000원이 적용되어 포상이 더 커져요!";
  }

  suggestionEl.innerText = suggestion;
});
