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

  // 新しいスポットライト要素
  const hostSpotlight = document.getElementById("host-spotlight");
  const backRightSpotlight = document.getElementById("back-right-spotlight");
  const backLeftSpotlight = document.getElementById("back-left-spotlight");
  const frontLeftSpotlight = document.getElementById("front-left-spotlight");
  const frontRightSpotlight = document.getElementById("front-right-spotlight");

  // ホリゾントライト要素
  const upperLeftHorizon = document.getElementById("upper-left-horizon");
  const upperRightHorizon = document.getElementById("upper-right-horizon");
  const lowerLeftHorizon = document.getElementById("lower-left-horizon");
  const lowerRightHorizon = document.getElementById("lower-right-horizon");

  // 舞台奥ライト要素
  const backLights = document.querySelectorAll(".back-light");

  // ビーム要素を追加
  backLights.forEach((light) => {
    if (!light.querySelector(".beam")) {
      const beam = document.createElement("div");
      beam.className = "beam";
      light.appendChild(beam);
    }
  });

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
        const beam = light.querySelector(".beam");

        if (finalIntensity > 0) {
          light.classList.add("active");

          // 本体（光源）の輝き
          light.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(${r}, ${g}, ${b}, ${finalIntensity}) 40%, rgba(${r}, ${g}, ${b}, 0.8) 100%)`;
          light.style.boxShadow = `0 0 10px rgba(${r}, ${g}, ${b}, ${finalIntensity}), 0 0 20px rgba(${r}, ${g}, ${b}, ${
            finalIntensity * 0.5
          })`;

          // ビームの更新
          if (beam) {
            beam.style.opacity = finalIntensity;
            beam.style.background = `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, 0.8) 0%, rgba(${r}, ${g}, ${b}, 0) 100%)`;
            beam.style.boxShadow = `0 0 20px rgba(${r}, ${g}, ${b}, ${
              finalIntensity * 0.5
            })`;
          }
        } else {
          light.classList.remove("active");
          light.style.background =
            "radial-gradient(circle at 30% 30%, #444 0%, #333 40%, #222 70%, #111 100%)";
          light.style.boxShadow =
            "0 3px 6px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -2px 4px rgba(0, 0, 0, 0.4)";

          if (beam) {
            beam.style.opacity = 0;
          }
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

    // 新しいスポットライト更新
    updateSpotlight(hostSpotlight, "host", 200, 150); // 司会用（右側手前）
    updateSpotlight(backRightSpotlight, "back-right", 250, -200); // 右奥
    updateSpotlight(backLeftSpotlight, "back-left", -250, -200); // 左奥
    updateSpotlight(frontLeftSpotlight, "front-left", -200, 150); // 手前左
    updateSpotlight(frontRightSpotlight, "front-right", 200, 150); // 手前右

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

    // ステージカラー更新
    updateStageColors();
  }

  // Masterフェーダー値表示更新
  function updateMasterValue() {
    masterValue.textContent = `${masterFader.value}%`;
  }

  // Chaseフェーダー値表示更新（将来の機能用）
  function updateChaseValue() {
    chaseValue.textContent = `${chaseFader.value}%`;
  }

  // 汎用フェーダー値表示更新
  function updateFaderValue(input) {
    // IDに基づいて対応する値表示要素を探す
    // 例: group1-intensity -> group1-intensity-value
    // 例: floor-red -> floor-red-value
    // 例: master-fader -> master-value (これは既存の関数で処理されているが、統一しても良い)

    let valueSpanId = `${input.id}-value`;

    // 特殊なケース（既存のID命名規則と異なる場合）
    if (input.id === "master-fader") valueSpanId = "master-value";
    if (input.id === "chase-fader") valueSpanId = "chase-value";

    const valueSpan = document.getElementById(valueSpanId);

    if (valueSpan) {
      if (input.max === "100") {
        valueSpan.textContent = `${input.value}%`;
      } else {
        valueSpan.textContent = input.value;
      }
    }
  }

  // 全てのフェーダーの値表示を更新
  function updateAllFaderValues() {
    document
      .querySelectorAll(".controls input[type='range']")
      .forEach((input) => {
        updateFaderValue(input);
      });
  }

  // ステージカラー更新関数
  function updateStageColors() {
    // 床の色
    const floorRed = document.getElementById("floor-red").value;
    const floorGreen = document.getElementById("floor-green").value;
    const floorBlue = document.getElementById("floor-blue").value;

    // Masterフェーダーの影響を適用
    const masterLevel = masterFader.value / 100;
    const r = Math.floor(floorRed * masterLevel);
    const g = Math.floor(floorGreen * masterLevel);
    const b = Math.floor(floorBlue * masterLevel);

    // CSS変数を更新
    document.documentElement.style.setProperty(
      "--floor-color",
      `rgb(${r}, ${g}, ${b})`
    );
  }

  // 全ての入力コントロールにイベントリスナーを追加
  document.querySelectorAll(".controls input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.type === "range") {
        updateFaderValue(input);
      }
      updateAllLights();
    });
  });

  // LocalStorage機能
  const STORAGE_KEY = "lightingSimulator_settings";
  const LOG_STORAGE_KEY = "lightingSimulator_logs";

  // LocalStorageに設定を保存
  function saveToLocalStorage() {
    try {
      const params = getCurrentParameters();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch (error) {
      console.error("LocalStorage保存エラー:", error);
    }
  }

  // LocalStorageから設定を読み込み
  function loadFromLocalStorage() {
    try {
      const savedParams = localStorage.getItem(STORAGE_KEY);
      if (savedParams) {
        const params = JSON.parse(savedParams);
        return applyParametersToUI(params);
      }
      return false;
    } catch (error) {
      console.error("LocalStorage読み込みエラー:", error);
      return false;
    }
  }

  // 変更ログをLocalStorageに保存
  function saveLogsToLocalStorage() {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(changeHistory));
    } catch (error) {
      console.error("ログ保存エラー:", error);
    }
  }

  // 変更ログをLocalStorageから復元
  function loadLogsFromLocalStorage() {
    try {
      const savedLogs = localStorage.getItem(LOG_STORAGE_KEY);
      if (savedLogs) {
        changeHistory = JSON.parse(savedLogs);
        // ログUIを復元
        changeLogElement.innerHTML = "";

        // ログコンテナのスタイルを確実に設定
        changeLogElement.style.backgroundColor = "#1a1a1a";
        changeLogElement.style.color = "#ffff00";
        changeLogElement.style.border = "1px solid #555";

        changeHistory.forEach((logEntry) => {
          const logDiv = document.createElement("div");
          logDiv.className = "log-entry";

          const logText = document.createElement("span");
          logText.className = "log-entry-text";
          logText.textContent = `[${logEntry.time}] ${logEntry.parameter}: ${logEntry.oldValue} → ${logEntry.newValue}`;
          logText.style.color = "#ffff00"; // 確実に黄色に設定

          const revertButton = document.createElement("button");
          revertButton.className = "log-entry-revert";
          revertButton.textContent = "戻す";
          revertButton.onclick = () =>
            revertToValue(logEntry.parameter, logEntry.oldValue);

          logDiv.appendChild(logText);
          logDiv.appendChild(revertButton);
          changeLogElement.appendChild(logDiv);
        });
        changeLogElement.scrollTop = changeLogElement.scrollHeight;
      }
    } catch (error) {
      console.error("ログ読み込みエラー:", error);
    }
  }

  // LocalStorageをクリア
  function clearLocalStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LOG_STORAGE_KEY);
    } catch (error) {
      console.error("LocalStorageクリアエラー:", error);
    }
  }

  // パラメーター出力機能
  const currentParamsElement = document.getElementById("current-params");
  const changeLogElement = document.getElementById("change-log");
  const copyButton = document.getElementById("copy-params");
  const importButton = document.getElementById("import-json");
  const exportButton = document.getElementById("export-json");
  const clearButton = document.getElementById("clear-output");
  const toggleLogButton = document.getElementById("toggle-log");
  const togglePanelButton = document.getElementById("toggle-panel");
  const outputContent = document.getElementById("output-content");
  const parameterOutput = document.querySelector(".parameter-output");
  const fileInput = document.getElementById("file-input");

  let changeHistory = [];
  let isLogCollapsed = false;
  let isPanelCollapsed = false;
  let dragStates = {}; // ドラッグ状態を追跡

  // 現在のパラメーターを取得
  function getCurrentParameters() {
    const params = {
      master: {
        level: masterFader.value,
      },
      chase: {
        level: chaseFader.value,
      },
      spotlights: {
        left: {
          size: document.getElementById("left-size").value,
          intensity: document.getElementById("left-intensity").value,
        },
        center: {
          size: document.getElementById("center-size").value,
          intensity: document.getElementById("center-intensity").value,
        },
        right: {
          size: document.getElementById("right-size").value,
          intensity: document.getElementById("right-intensity").value,
        },
        host: {
          size: document.getElementById("host-size").value,
          intensity: document.getElementById("host-intensity").value,
        },
        backRight: {
          size: document.getElementById("back-right-size").value,
          intensity: document.getElementById("back-right-intensity").value,
        },
        backLeft: {
          size: document.getElementById("back-left-size").value,
          intensity: document.getElementById("back-left-intensity").value,
        },
        frontLeft: {
          size: document.getElementById("front-left-size").value,
          intensity: document.getElementById("front-left-intensity").value,
        },
        frontRight: {
          size: document.getElementById("front-right-size").value,
          intensity: document.getElementById("front-right-intensity").value,
        },
      },
      backLights: {
        group1: {
          intensity: document.getElementById("group1-intensity").value,
          red: document.getElementById("group1-red").value,
          green: document.getElementById("group1-green").value,
          blue: document.getElementById("group1-blue").value,
        },
        group2: {
          intensity: document.getElementById("group2-intensity").value,
          red: document.getElementById("group2-red").value,
          green: document.getElementById("group2-green").value,
          blue: document.getElementById("group2-blue").value,
        },
        group3: {
          intensity: document.getElementById("group3-intensity").value,
          red: document.getElementById("group3-red").value,
          green: document.getElementById("group3-green").value,
          blue: document.getElementById("group3-blue").value,
        },
      },
      horizonLights: {
        upperLeft: {
          intensity: document.getElementById("upper-left-intensity").value,
          red: document.getElementById("upper-left-red").value,
          green: document.getElementById("upper-left-green").value,
          blue: document.getElementById("upper-left-blue").value,
        },
        upperRight: {
          intensity: document.getElementById("upper-right-intensity").value,
          red: document.getElementById("upper-right-red").value,
          green: document.getElementById("upper-right-green").value,
          blue: document.getElementById("upper-right-blue").value,
        },
        lowerLeft: {
          intensity: document.getElementById("lower-left-intensity").value,
          red: document.getElementById("lower-left-red").value,
          green: document.getElementById("lower-left-green").value,
          blue: document.getElementById("lower-left-blue").value,
        },
        lowerRight: {
          intensity: document.getElementById("lower-right-intensity").value,
          red: document.getElementById("lower-right-red").value,
          green: document.getElementById("lower-right-green").value,
          blue: document.getElementById("lower-right-blue").value,
        },
      },
      stage: {
        floor: {
          red: document.getElementById("floor-red").value,
          green: document.getElementById("floor-green").value,
          blue: document.getElementById("floor-blue").value,
        },
      },
      timestamp: new Date().toISOString(),
    };
    return params;
  }

  // パラメーター表示を更新
  function updateParameterDisplay() {
    const params = getCurrentParameters();
    currentParamsElement.textContent = JSON.stringify(params, null, 2);

    saveToLocalStorage(); // 設定をLocalStorageに自動保存
  }

  // 変更ログに追加（戻し機能付き）
  function addToChangeLog(inputId, oldValue, newValue) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      time: timestamp,
      parameter: inputId,
      oldValue: oldValue,
      newValue: newValue,
    };

    changeHistory.push(logEntry);
    saveLogsToLocalStorage(); // ログをLocalStorageに保存

    const logDiv = document.createElement("div");
    logDiv.className = "log-entry new";

    const logText = document.createElement("span");
    logText.className = "log-entry-text";
    logText.textContent = `[${timestamp}] ${inputId}: ${oldValue} → ${newValue}`;

    const revertButton = document.createElement("button");
    revertButton.className = "log-entry-revert";
    revertButton.textContent = "戻す";
    revertButton.onclick = () => revertToValue(inputId, oldValue);

    logDiv.appendChild(logText);
    logDiv.appendChild(revertButton);
    changeLogElement.appendChild(logDiv);
    changeLogElement.scrollTop = changeLogElement.scrollHeight;

    // アニメーション効果を削除
    setTimeout(() => {
      logDiv.classList.remove("new");
    }, 1000);
  }

  // 値を戻す機能
  function revertToValue(inputId, value) {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = value;

      // 対応する更新関数を呼び出し
      if (inputId === "master-fader") {
        updateMasterValue();
      } else if (inputId === "chase-fader") {
        updateChaseValue();
      } else if (inputId.startsWith("floor-")) {
        updateStageColors();
      }

      updateAllLights();
      updateParameterDisplay();

      // 戻し操作もログに記録
      addToChangeLog(inputId + " (戻し)", input.value, value);
    }
  }

  // ログの開閉機能
  toggleLogButton.addEventListener("click", () => {
    isLogCollapsed = !isLogCollapsed;
    if (isLogCollapsed) {
      outputContent.classList.add("collapsed");
      toggleLogButton.textContent = "ログを開く";
    } else {
      outputContent.classList.remove("collapsed");
      toggleLogButton.textContent = "ログを閉じる";
    }
  });

  // パネル全体の開閉機能
  togglePanelButton.addEventListener("click", () => {
    isPanelCollapsed = !isPanelCollapsed;
    if (isPanelCollapsed) {
      // パネルを閉じる
      parameterOutput.classList.add("collapsed");
      document.body.classList.add("panel-collapsed");
      togglePanelButton.textContent = "▲ 開く";

      // 確実に隠すためのスタイル設定
      outputContent.style.display = "none";
      document.querySelector(".output-buttons").style.display = "none";
      parameterOutput.style.maxHeight = "80px";
    } else {
      // パネルを開く
      parameterOutput.classList.remove("collapsed");
      document.body.classList.remove("panel-collapsed");
      togglePanelButton.textContent = "▼ 閉じる";

      // 表示を復元
      outputContent.style.display = "grid";
      document.querySelector(".output-buttons").style.display = "flex";
      parameterOutput.style.maxHeight = "none";
    }
  });

  // コピー機能
  copyButton.addEventListener("click", () => {
    const params = getCurrentParameters();
    navigator.clipboard.writeText(JSON.stringify(params, null, 2)).then(() => {
      copyButton.textContent = "コピー完了!";
      setTimeout(() => {
        copyButton.textContent = "コピー";
      }, 1500);
    });
  });

  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  // パラメーターをUIに適用する関数
  function applyParametersToUI(params) {
    try {
      // Master & Chase
      if (params.master && params.master.level !== undefined) {
        masterFader.value = params.master.level;
        updateMasterValue();
      }
      if (params.chase && params.chase.level !== undefined) {
        chaseFader.value = params.chase.level;
        updateChaseValue();
      }

      // スポットライト
      if (params.spotlights) {
        if (params.spotlights.left) {
          if (params.spotlights.left.size !== undefined)
            document.getElementById("left-size").value =
              params.spotlights.left.size;
          if (params.spotlights.left.intensity !== undefined)
            document.getElementById("left-intensity").value =
              params.spotlights.left.intensity;
        }
        if (params.spotlights.center) {
          if (params.spotlights.center.size !== undefined)
            document.getElementById("center-size").value =
              params.spotlights.center.size;
          if (params.spotlights.center.intensity !== undefined)
            document.getElementById("center-intensity").value =
              params.spotlights.center.intensity;
        }
        if (params.spotlights.right) {
          if (params.spotlights.right.size !== undefined)
            document.getElementById("right-size").value =
              params.spotlights.right.size;
          if (params.spotlights.right.intensity !== undefined)
            document.getElementById("right-intensity").value =
              params.spotlights.right.intensity;
        }
      }

      // 舞台奥ライト
      if (params.backLights) {
        ["group1", "group2", "group3"].forEach((group) => {
          if (params.backLights[group]) {
            const g = params.backLights[group];
            if (g.intensity !== undefined)
              document.getElementById(`${group}-intensity`).value = g.intensity;
            if (g.red !== undefined)
              document.getElementById(`${group}-red`).value = g.red;
            if (g.green !== undefined)
              document.getElementById(`${group}-green`).value = g.green;
            if (g.blue !== undefined)
              document.getElementById(`${group}-blue`).value = g.blue;

            // カラーピッカーも更新
            const picker = document.getElementById(`${group}-color-picker`);
            if (
              picker &&
              g.red !== undefined &&
              g.green !== undefined &&
              g.blue !== undefined
            ) {
              picker.value = rgbToHex(g.red, g.green, g.blue);
            }
          }
        });
      }

      // ホリゾンライト
      if (params.horizonLights) {
        ["upperLeft", "upperRight", "lowerLeft", "lowerRight"].forEach(
          (position) => {
            if (params.horizonLights[position]) {
              const h = params.horizonLights[position];
              const prefix = position.replace(/([A-Z])/g, "-$1").toLowerCase();
              if (h.intensity !== undefined)
                document.getElementById(`${prefix}-intensity`).value =
                  h.intensity;
              if (h.red !== undefined)
                document.getElementById(`${prefix}-red`).value = h.red;
              if (h.green !== undefined)
                document.getElementById(`${prefix}-green`).value = h.green;
              if (h.blue !== undefined)
                document.getElementById(`${prefix}-blue`).value = h.blue;

              // カラーピッカーも更新
              const picker = document.getElementById(`${prefix}-color-picker`);
              if (
                picker &&
                h.red !== undefined &&
                h.green !== undefined &&
                h.blue !== undefined
              ) {
                picker.value = rgbToHex(h.red, h.green, h.blue);
              }
            }
          }
        );
      }

      // ステージの床の色
      if (params.stage && params.stage.floor) {
        if (params.stage.floor.red !== undefined)
          document.getElementById("floor-red").value = params.stage.floor.red;
        if (params.stage.floor.green !== undefined)
          document.getElementById("floor-green").value =
            params.stage.floor.green;
        if (params.stage.floor.blue !== undefined)
          document.getElementById("floor-blue").value = params.stage.floor.blue;

        // カラーピッカーも更新
        const picker = document.getElementById("floor-color-picker");
        if (picker && params.stage.floor.red !== undefined) {
          picker.value = rgbToHex(
            params.stage.floor.red,
            params.stage.floor.green,
            params.stage.floor.blue
          );
        }
      }

      // 全ての値を初期値として記録
      document.querySelectorAll(".controls input").forEach((input) => {
        previousValues[input.id] = input.value;
      });

      // 全ての表示を更新
      updateStageColors();
      updateAllLights();
      updateAllFaderValues();
      updateParameterDisplay();

      return true;
    } catch (error) {
      console.error("パラメーター適用エラー:", error);
      return false;
    }
  }

  // JSON読み込み機能
  importButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const params = JSON.parse(e.target.result);
        const success = applyParametersToUI(params);

        if (success) {
          importButton.textContent = "読込完了!";
          addToChangeLog("JSON読込", "ファイル", file.name);
          setTimeout(() => {
            importButton.textContent = "JSON読込";
          }, 2000);
        } else {
          importButton.textContent = "読込失敗";
          setTimeout(() => {
            importButton.textContent = "JSON読込";
          }, 2000);
        }
      } catch (error) {
        console.error("JSONパースエラー:", error);
        importButton.textContent = "形式エラー";
        setTimeout(() => {
          importButton.textContent = "JSON読込";
        }, 2000);
      }
    };
    reader.readAsText(file);

    // ファイル選択をリセット（同じファイルを再選択可能にする）
    fileInput.value = "";
  });

  // JSON出力機能
  exportButton.addEventListener("click", () => {
    const params = getCurrentParameters();
    const dataStr = JSON.stringify(params, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lighting_params_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  // クリア機能
  clearButton.addEventListener("click", () => {
    if (confirm("ログと保存された設定をすべてクリアしますか？")) {
      changeLogElement.innerHTML = "";
      changeHistory = [];
      clearLocalStorage(); // LocalStorageもクリア

      clearButton.textContent = "クリア完了!";
      setTimeout(() => {
        clearButton.textContent = "クリア";
      }, 1500);
    }
  });

  // リセット機能
  const resetButton = document.getElementById("reset-lights");
  resetButton.addEventListener("click", () => {
    if (confirm("すべての照明を初期状態にリセットしますか？")) {
      // すべての強度を0に設定
      const intensityInputs = [
        "left-intensity",
        "center-intensity",
        "right-intensity",
        "host-intensity",
        "back-right-intensity",
        "back-left-intensity",
        "front-left-intensity",
        "front-right-intensity",
        "upper-left-intensity",
        "upper-right-intensity",
        "lower-left-intensity",
        "lower-right-intensity",
        "group1-intensity",
        "group2-intensity",
        "group3-intensity",
      ];

      intensityInputs.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
          input.value = "0";
        }
      });

      // Masterフェーダーを0に設定
      masterFader.value = "0";

      // すべてのRGB値を255に設定（ライトを白にする）
      const colorInputs = [
        "upper-left-red",
        "upper-left-green",
        "upper-left-blue",
        "upper-right-red",
        "upper-right-green",
        "upper-right-blue",
        "lower-left-red",
        "lower-left-green",
        "lower-left-blue",
        "lower-right-red",
        "lower-right-green",
        "lower-right-blue",
        "group1-red",
        "group1-green",
        "group1-blue",
        "group2-red",
        "group2-green",
        "group2-blue",
        "group3-red",
        "group3-green",
        "group3-blue",
        "floor-red",
        "floor-green",
        "floor-blue",
      ];

      colorInputs.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
          input.value = "255";
        }
      });

      // カラーピッカーを白にリセット
      const colorPickers = [
        "upper-left-color-picker",
        "upper-right-color-picker",
        "lower-left-color-picker",
        "lower-right-color-picker",
        "group1-color-picker",
        "group2-color-picker",
        "group3-color-picker",
        "floor-color-picker",
      ];

      colorPickers.forEach((id) => {
        const picker = document.getElementById(id);
        if (picker) {
          picker.value = "#ffffff";
        }
      });

      // UIを更新
      updateMasterValue();
      updateChaseValue();
      updateStageColors();
      updateAllLights();
      updateAllFaderValues();
      updateParameterDisplay();

      resetButton.textContent = "リセット完了!";
      setTimeout(() => {
        resetButton.textContent = "照明リセット";
      }, 1500);
    }
  });

  // 入力値の変更を監視（ドラッグ終了時のみログ出力）
  let previousValues = {};

  // 全ての入力コントロールにイベントリスナーを追加
  document.querySelectorAll(".controls input").forEach((input) => {
    // 初期値を記録
    previousValues[input.id] = input.value;
    dragStates[input.id] = false;

    // ドラッグ開始時
    input.addEventListener("mousedown", () => {
      dragStates[input.id] = true;
    });

    // ドラッグ中（リアルタイム更新のみ、ログは出力しない）
    input.addEventListener("input", () => {
      if (input.id === "master-fader") {
        updateMasterValue();
      } else if (input.id === "chase-fader") {
        updateChaseValue();
      } else if (input.id.startsWith("floor-")) {
        updateStageColors();
      }
      updateAllLights();
      updateParameterDisplay();
    });

    // ドラッグ終了時（ログを出力）
    input.addEventListener("mouseup", () => {
      if (dragStates[input.id]) {
        const oldValue = previousValues[input.id];
        const newValue = input.value;

        if (oldValue !== newValue) {
          addToChangeLog(input.id, oldValue, newValue);
          previousValues[input.id] = newValue;
        }

        dragStates[input.id] = false;
      }
    });

    // フォーカスが外れた時もログを出力（キーボード操作対応）
    input.addEventListener("blur", () => {
      const oldValue = previousValues[input.id];
      const newValue = input.value;

      if (oldValue !== newValue) {
        addToChangeLog(input.id, oldValue, newValue);
        previousValues[input.id] = newValue;
      }
    });

    // キーボードのEnterキー押下時
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur(); // blurイベントを発生させる
      }
    });
  });

  // カラーピッカーとRGBスライダーの連携
  function setupColorPicker(pickerId, rId, gId, bId) {
    const picker = document.getElementById(pickerId);
    const rInput = document.getElementById(rId);
    const gInput = document.getElementById(gId);
    const bInput = document.getElementById(bId);

    if (!picker || !rInput || !gInput || !bInput) return;

    // 初期同期: ピッカーの値をRGB入力に反映
    // これにより、ページ読み込み時にRGB値が0（真っ黒）になるのを防ぐ
    const initialRgb = hexToRgb(picker.value);
    rInput.value = initialRgb.r;
    gInput.value = initialRgb.g;
    bInput.value = initialRgb.b;
    updateFaderValue(rInput);
    updateFaderValue(gInput);
    updateFaderValue(bInput);

    // ピッカー変更時 -> RGBスライダー更新
    picker.addEventListener("input", (e) => {
      const hex = e.target.value;
      const rgb = hexToRgb(hex);
      rInput.value = rgb.r;
      gInput.value = rgb.g;
      bInput.value = rgb.b;
      updateFaderValue(rInput);
      updateFaderValue(gInput);
      updateFaderValue(bInput);
      updateAllLights();
      updateParameterDisplay();
    });

    // RGBスライダー変更時 -> ピッカー更新（逆方向は複雑なので今回は省略、または必要に応じて実装）
  }

  setupColorPicker(
    "group1-color-picker",
    "group1-red",
    "group1-green",
    "group1-blue"
  );
  setupColorPicker(
    "group2-color-picker",
    "group2-red",
    "group2-green",
    "group2-blue"
  );
  setupColorPicker(
    "group3-color-picker",
    "group3-red",
    "group3-green",
    "group3-blue"
  );
  setupColorPicker(
    "upper-left-color-picker",
    "upper-left-red",
    "upper-left-green",
    "upper-left-blue"
  );
  setupColorPicker(
    "upper-right-color-picker",
    "upper-right-red",
    "upper-right-green",
    "upper-right-blue"
  );
  setupColorPicker(
    "lower-left-color-picker",
    "lower-left-red",
    "lower-left-green",
    "lower-left-blue"
  );
  setupColorPicker(
    "lower-right-color-picker",
    "lower-right-red",
    "lower-right-green",
    "lower-right-blue"
  );
  setupColorPicker(
    "floor-color-picker",
    "floor-red",
    "floor-green",
    "floor-blue"
  );

  // 初期状態を適用
  // UIエレメントの初期スタイル設定（真っ暗になる問題の対策）
  function ensureUIStyles() {
    if (currentParamsElement) {
      currentParamsElement.style.backgroundColor = "#1a1a1a";
      currentParamsElement.style.color = "#00ff00";
      currentParamsElement.style.border = "1px solid #555";
    }
    if (changeLogElement) {
      changeLogElement.style.backgroundColor = "#1a1a1a";
      changeLogElement.style.color = "#ffff00";
      changeLogElement.style.border = "1px solid #555";
    }
  }

  // LocalStorageから設定とログを復元
  const hasLoadedSettings = loadFromLocalStorage();
  loadLogsFromLocalStorage();

  // UIスタイルを確実に適用
  ensureUIStyles();

  // LocalStorageに保存された設定がない場合のみデフォルト値を適用
  if (!hasLoadedSettings) {
    updateMasterValue();
    updateChaseValue();
    updateStageColors();
    updateAllLights();
    updateParameterDisplay();
  } else {
    // LocalStorageから復元した場合もUI更新は必要
    updateMasterValue();
    updateChaseValue();
    updateStageColors();
    updateAllLights();
    updateParameterDisplay();
  }

  // 定期的にスタイルをチェック（保険として）
  setInterval(ensureUIStyles, 5000);

  // パネルリサイズ機能
  const resizer = document.getElementById("dragMe");
  const body = document.body;
  let isResizing = false;

  resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    resizer.classList.add("resizing");
    document.body.style.cursor = "col-resize";
    e.preventDefault(); // テキスト選択などを防止
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    // 右パネルの幅を計算 (全体幅 - マウス位置 - リサイザー幅)
    // リサイザーの中心を基準にするため、少し調整しても良いが、簡易的に計算
    const rightPanelWidth = window.innerWidth - e.clientX;

    // 最小・最大幅の制限 (オプション)
    if (rightPanelWidth < 200) return; // 最小幅
    if (rightPanelWidth > window.innerWidth * 0.6) return; // 最大幅 (画面の60%)

    // グリッドレイアウトを更新
    // 左パネル(1fr) リサイザー(5px) 右パネル(計算した幅px)
    body.style.gridTemplateColumns = `1fr 5px ${rightPanelWidth}px`;
  });

  document.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;
      resizer.classList.remove("resizing");
      document.body.style.cursor = "default";
    }
  });
});
