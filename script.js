document.getElementById("calculatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 차량 수 입력
  const nexos = parseInt(document.getElementById("nexo").value) || 0;
  const others = ["grandeur", "gv60", "gv70", "gv80", "g70", "g80", "g90"];
  let otherCount = 0;

  others.forEach(id => {
    otherCount += parseInt(document.getElementById(id).value) || 0;
  });

  // 현금 포상 계산
  let cashReward = 0;

  // 넥쏘 계산
  if (nexos === 1) {
    cashReward += 720000;
  } else if (nexos >= 2) {
    cashReward += Math.min(nexos * 1000000, 5000000);
  }

  // 나머지 차량 계산
  if (otherCount === 1) {
    cashReward += 100000;
  } else if (otherCount === 2) {
    cashReward += 400000;
  } else if (otherCount >= 3) {
    cashReward += otherCount * 300000;
  }

  // CRM 포인트 계산
  const tradeinCount = parseInt(document.getElementById("tradeinCount").value) || 0;
  const gfNew = parseInt(document.getElementById("gfNew").value) || 0;
  const gfOld = parseInt(document.getElementById("gfOld").value) || 0;

  let crmPoint = (tradeinCount * 100000) + (gfNew * 100000) + (gfOld * 50000);

  // 결과 출력
  document.getElementById("result").innerHTML = `
    💰 <strong>총 현금 포상:</strong> ${cashReward.toLocaleString()}원<br>
    🎯 <strong>총 CRM 포인트:</strong> ${crmPoint.toLocaleString()}P
  `;
});
