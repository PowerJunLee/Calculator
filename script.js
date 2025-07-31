document.getElementById("calcButton").addEventListener("click", function () {
  const ids = ["nexo", "grandeur", "gv60", "gv70", "gv80", "g70", "g80", "g90"];
  const carCounts = {};
  ids.forEach(id => {
    carCounts[id] = parseInt(document.getElementById(id).value) || 0;
  });

  const tradein = parseInt(document.getElementById("tradeinCount").value) || 0;
  const gfNew = parseInt(document.getElementById("gfNew").value) || 0;
  const gfOld = parseInt(document.getElementById("gfOld").value) || 0;

  let cash = 0;
  if (carCounts.nexo === 1) cash += 720000;
  else if (carCounts.nexo >= 2) cash += Math.min(carCounts.nexo * 1000000, 5000000);

  const otherTotal = ids.slice(1).reduce((sum, id) => sum + carCounts[id], 0);
  if (otherTotal === 1) cash += 100000;
  else if (otherTotal === 2) cash += 400000;
  else if (otherTotal >= 3) cash += otherTotal * 300000;

  const crm = (tradein * 100000) + (gfNew * 100000) + (gfOld * 50000);

  alert(`💰 총 현금 포상: ${cash.toLocaleString()}원\n🎯 총 CRM 포인트: ${crm.toLocaleString()}P`);

  const nexoSuggestionEl = document.getElementById("nexoSuggestion");
  let nexoMsg = "";
  if (carCounts.nexo === 0) {
    nexoMsg = "🚀 넥쏘 차량을 1대 판매하면 720,000원의 포상을 받을 수 있어요!";
  } else if (carCounts.nexo === 1) {
    nexoMsg = "🚀 넥쏘를 1대 더 판매하면 포상이 2,000,000원으로 증가해요!";
  } else if (carCounts.nexo >= 2 && carCounts.nexo < 5) {
    nexoMsg = `🚀 넥쏘 ${5 - carCounts.nexo}대 더 판매하면 최대 포상인 5,000,000원을 받을 수 있어요!`;
  }
  nexoSuggestionEl.innerText = nexoMsg;

  const othersSuggestionEl = document.getElementById("othersSuggestion");
  let othersMsg = "";
  if (otherTotal === 0) {
    othersMsg = "📈 중점 차종(그랜저, GV60~G90)을 1대 판매하면 100,000원의 포상이 발생합니다.";
  } else if (otherTotal === 1) {
    othersMsg = "📈 중점 차종을 1대 더 판매하면 포상이 400,000원으로 증가해요!";
  } else if (otherTotal === 2) {
    othersMsg = "📈 중점 차종을 1대 더 판매하면 대당 300,000원이 적용되어 포상이 더 커져요!";
  }
  othersSuggestionEl.innerText = othersMsg;
});
