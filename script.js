// JavaScriptは不要になりました。
// ステージの表現は HTML と CSS だけで構成されています。

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lighting Simulator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <div id="controls-grid"></div>
        <div id="front-view" class="view-container"></div>
        <div id="top-view" class="view-container"></div>
    </div>
</body>
</html>

<style>
  /* styles.css */

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #121212;
  }

  #app {
    display: grid;
    grid-template-areas:
      "controls-grid front-view"
      "controls-grid top-view";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    width: 90vw;
    height: 90vh;
  }

  .view-container {
    position: relative;
    background-color: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
  }

  #controls-grid {
    grid-area: controls-grid;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .control-group {
    background-color: #2c2c2c;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .control-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .control-row label {
    flex: 0 0 80px;
    color: #ffffff;
  }

  .intensity-value {
    min-width: 40px;
    text-align: right;
    color: #ffffff;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: #444;
    border-radius: 2px;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #5f7cff;
    border-radius: 50%;
    cursor: pointer;
  }

  input[type="color"] {
    padding: 0;
    border: none;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  h3 {
    color: #ffffff;
    font-size: 16px;
    margin: 0 0 8px 0;
  }

  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .seating {
    position: absolute;
    width: 100%;
    height: 20%;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }

  .stage {
    position: absolute;
    width: 100%;
    height: 80%;
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  }

  .top-audience {
    position: absolute;
    width: 100%;
    height: 20%;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  }

  .light-beam {
    position: absolute;
    pointer-events: none;
  }

  .beam-wash {
    inset: 15%;
    border-radius: 20px;
  }

  .beam-strip {
    width: 44%;
    height: 14%;
    top: 36%;
    transform: skewY(5deg);
  }

  .beam-strobe {
    left: 15%;
    right: 15%;
    bottom: 6%;
    height: 35%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 65%);
  }

  .beam-spot {
    width: 30%;
    height: 40%;
    bottom: 8%;
    border-radius: 50% 50% 60% 60%;
  }

  .light-fixture {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
  // JavaScriptは不要になりました。
  // ステージの表現は HTML と CSS だけで構成されています。
</script>
