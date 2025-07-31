document.getElementById("calculatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 차량 수 입력
  const nexos = parseInt(document.getElementById("nexo").value) || 0;
  const others = ["grandeur", "gv60", "gv70", "gv80", "g70", "g80", "g90"];
  let otherCount = 0;

  others.forEach(id => {
    otherCount += parseInt(document.getElementById(id).value) || 0;
  });

  // 포상 계산 (현금)
  let cashReward = 0;

  // 넥쏘 계산
  if (nexos === 1) {
    cashReward += 720000;
  } else if (nexos > 1) {
    cashReward += Math.min(nexos * 1000000, 5000000);
  }

  // 나머지 차종 계산
  if (otherCount === 1) {
    cashReward += 100000;
  } else if (otherCount === 2) {
    cashReward += 400000;
  } else if (otherCount >= 3) {
    cashReward += otherCount * 300000;
  }

  // 추가 포상 (CRM 포인트)
  let crmPoint = 0;
  const tradeinChecked = document.getElementById("tradein").checked;
  const goodfriendChecked = document.getElementById("goodfriend").checked;
  const totalCars = nexos + otherCount;

  if (tradeinChecked) crmPoint += totalCars * 100000;
  if (goodfriendChecked) crmPoint += totalCars * 100000;

  // 결과 표시
  document.getElementById("result").innerHTML = `
    💰 <strong>총 현금 포상:</strong> ${cashReward.toLocaleString()}원<br>
    🎯 <strong>총 CRM 포인트:</strong> ${crmPoint.toLocaleString()}P
  `;
});
