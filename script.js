document.addEventListener("DOMContentLoaded", () => {
  // Master & Chaseフェーダー要素
  const masterFader = document.getElementById("master-fader");
  const masterValue = document.getElementById("master-value");
  const chaseFader = document.getElementById("chase-fader");
  const chaseValue = document.getElementById("chase-value");

  // スポットライト要素
  const leftSpotlight = document.getElementById("left-spotlight");
  const centerSpotlight = document.getElementById("center-spotlight");
  const rightSpotlight = document.getElementById("right-spotlight");

  // ホリゾントライト要素
  const upperLeftHorizon = document.getElementById("upper-left-horizon");
  const upperRightHorizon = document.getElementById("upper-right-horizon");
  const lowerLeftHorizon = document.getElementById("lower-left-horizon");
  const lowerRightHorizon = document.getElementById("lower-right-horizon");

  // 舞台奥ライト要素
  const backLights = document.querySelectorAll(".back-light");

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  // スポットライト更新関数
  function updateSpotlight(spotlight, prefix, fixedX = 0, fixedY = 0) {
    const size = document.getElementById(`${prefix}-size`).value;
    const intensity = document.getElementById(`${prefix}-intensity`).value;
    const masterLevel = masterFader.value / 100; // Masterフェーダーレベル
    const finalIntensity = (intensity / 100) * masterLevel; // Masterで調整

    spotlight.style.width = `${size}px`;
    spotlight.style.height = `${size}px`;
    spotlight.style.transform = `translate(-50%, -50%) translate(${fixedX}px, ${fixedY}px)`;
    spotlight.style.backgroundImage = `radial-gradient(circle, rgba(255, 255, 255, ${finalIntensity}) 0%, rgba(255, 255, 255, 0) 70%)`;
  }

  // ホリゾントライト更新関数
  function updateHorizonLight(
    element,
    intensityId,
    redId,
    greenId,
    blueId,
    position
  ) {
    const intensity = document.getElementById(intensityId).value;
    const masterLevel = masterFader.value / 100; // Masterフェーダーレベル
    const finalIntensity = (intensity / 100) * masterLevel; // Masterで調整
    const r = document.getElementById(redId).value;
    const g = document.getElementById(greenId).value;
    const b = document.getElementById(blueId).value;

    let gradient;
    if (position === "upper") {
      gradient = `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, ${finalIntensity}) 0%, rgba(${r}, ${g}, ${b}, 0) 100%)`;
    } else {
      gradient = `linear-gradient(to top, rgba(${r}, ${g}, ${b}, ${finalIntensity}) 0%, rgba(${r}, ${g}, ${b}, 0) 100%)`;
    }

    element.style.background = gradient;
  }

  // 舞台奥ライトのグループ更新関数
  function updateBackLightGroup(groupNumber) {
    const intensity = document.getElementById(
      `group${groupNumber}-intensity`
    ).value;
    const masterLevel = masterFader.value / 100;
    const finalIntensity = (intensity / 100) * masterLevel;
    const r = document.getElementById(`group${groupNumber}-red`).value;
    const g = document.getElementById(`group${groupNumber}-green`).value;
    const b = document.getElementById(`group${groupNumber}-blue`).value;

    backLights.forEach((light) => {
      if (light.dataset.group === groupNumber.toString()) {
        if (finalIntensity > 0) {
          light.classList.add("active");
          light.style.background = `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, ${finalIntensity}) 0%, rgba(${r}, ${g}, ${b}, 0.1) 100%)`;
          light.style.boxShadow = `
            0 200px 150px rgba(${r}, ${g}, ${b}, ${finalIntensity * 0.1}),
            0 150px 100px rgba(${r}, ${g}, ${b}, ${finalIntensity * 0.05}),
            0 100px 80px rgba(${r}, ${g}, ${b}, ${finalIntensity * 0.02})
          `;
        } else {
          light.classList.remove("active");
          light.style.background = "#222";
          light.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
        }
      }
    });
  }

  // 全舞台奥ライト更新
  function updateAllBackLights() {
    updateBackLightGroup(1);
    updateBackLightGroup(2);
    updateBackLightGroup(3);
  }

  // 全ライト更新関数
  function updateAllLights() {
    // スポットライト更新（固定位置）
    updateSpotlight(leftSpotlight, "left", -250, 0); // 左スポットライト
    updateSpotlight(centerSpotlight, "center", 0, 0); // 中央スポットライト
    updateSpotlight(rightSpotlight, "right", 250, 0); // 右スポットライト

    // ホリゾントライト更新
    updateHorizonLight(
      upperLeftHorizon,
      "upper-left-intensity",
      "upper-left-red",
      "upper-left-green",
      "upper-left-blue",
      "upper"
    );
    updateHorizonLight(
      upperRightHorizon,
      "upper-right-intensity",
      "upper-right-red",
      "upper-right-green",
      "upper-right-blue",
      "upper"
    );
    updateHorizonLight(
      lowerLeftHorizon,
      "lower-left-intensity",
      "lower-left-red",
      "lower-left-green",
      "lower-left-blue",
      "lower"
    );
    updateHorizonLight(
      lowerRightHorizon,
      "lower-right-intensity",
      "lower-right-red",
      "lower-right-green",
      "lower-right-blue",
      "lower"
    );

    // 舞台奥ライト更新
    updateAllBackLights();
  }

  // Masterフェーダー値表示更新
  function updateMasterValue() {
    masterValue.textContent = `${masterFader.value}%`;
  }

  // Chaseフェーダー値表示更新（将来の機能用）
  function updateChaseValue() {
    chaseValue.textContent = `${chaseFader.value}%`;
  }

  // ステージカラー更新関数
  function updateStageColors() {
    // 床の色
    const floorRed = document.getElementById("floor-red").value;
    const floorGreen = document.getElementById("floor-green").value;
    const floorBlue = document.getElementById("floor-blue").value;

    // CSS変数を更新
    document.documentElement.style.setProperty(
      "--floor-color",
      `rgb(${floorRed}, ${floorGreen}, ${floorBlue})`
    );
  }

  // 全ての入力コントロールにイベントリスナーを追加
  document.querySelectorAll(".controls input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.id === "master-fader") {
        updateMasterValue();
      } else if (input.id === "chase-fader") {
        updateChaseValue();
      } else if (input.id.startsWith("floor-")) {
        updateStageColors();
      }
      updateAllLights();
    });
  });

  // 初期状態を適用
  updateMasterValue();
  updateChaseValue();
  updateStageColors();
  updateAllLights();
});
