// zaka sensi — Free Fire / Free Fire MAX AI Sensitivity Generator
// Single-file Node.js + Express application.
// Run with: node index.js
// Then open: http://localhost:3000
//
// Install dependency once:
// npm install express
//
// This app only uses information that normal browser APIs expose.
// It does NOT modify Free Fire files, memory, processes, game code,
// or implement cheats, exploits, aimlock, ESP, injection, or bypasses.

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

const HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#070914">
<title>Zaka Sensi — AI Sensitivity Generator</title>

<style>
:root {
  --bg: #05060d;
  --panel: rgba(13, 16, 30, .88);
  --panel2: rgba(20, 24, 43, .9);
  --text: #f4f7ff;
  --muted: #9299ad;
  --accent: #7c5cff;
  --accent2: #00d9ff;
  --good: #43e6a2;
  --danger: #ff5577;
  --border: rgba(255,255,255,.09);
  --shadow: 0 25px 70px rgba(0,0,0,.45);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at 10% 10%, rgba(124,92,255,.18), transparent 30%),
    radial-gradient(circle at 90% 20%, rgba(0,217,255,.12), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(124,92,255,.10), transparent 35%),
    var(--bg);
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .28;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 35px 35px;
  mask-image: linear-gradient(to bottom, black, transparent);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.hidden {
  display: none !important;
}

/* =========================
   ANALYSIS SCREEN
   ========================= */

#analysisScreen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.analyzer {
  width: min(520px, 100%);
  padding: 34px;
  border: 1px solid var(--border);
  border-radius: 28px;
  background: linear-gradient(
    145deg,
    rgba(19,23,42,.94),
    rgba(7,9,18,.94)
  );
  box-shadow: var(--shadow);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.analyzer::after {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(124,92,255,.16);
  filter: blur(45px);
  right: -100px;
  top: -100px;
}

.logo {
  width: 76px;
  height: 76px;
  border-radius: 22px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  font-weight: 950;
  font-size: 24px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  box-shadow: 0 0 45px rgba(124,92,255,.35);
  color: white;
}

.analyzer h1 {
  margin: 0;
  font-size: clamp(28px, 6vw, 42px);
  letter-spacing: -1.5px;
}

.analyzer p {
  color: var(--muted);
  line-height: 1.6;
}

.progress-wrap {
  margin-top: 28px;
  text-align: left;
}

.progress-track {
  height: 12px;
  padding: 2px;
  border-radius: 99px;
  background: rgba(255,255,255,.07);
  overflow: hidden;
}

.progress-bar {
  width: 0%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  box-shadow: 0 0 25px rgba(0,217,255,.35);
  transition: width .12s linear;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: var(--muted);
  font-size: 13px;
}

.percent {
  color: white;
  font-weight: 800;
}

.analysis-list {
  margin-top: 25px;
  display: grid;
  gap: 9px;
  text-align: left;
}

.analysis-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 13px;
  border: 1px solid rgba(255,255,255,.055);
  background: rgba(255,255,255,.025);
  border-radius: 12px;
  color: var(--muted);
  font-size: 13px;
}

.analysis-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #555b70;
  flex: 0 0 auto;
}

.analysis-item.active .analysis-dot {
  background: var(--accent2);
  box-shadow: 0 0 12px var(--accent2);
}

.analysis-item.done .analysis-dot {
  background: var(--good);
}

.disclaimer {
  margin-top: 22px;
  font-size: 11px;
  color: #747b90;
}

/* =========================
   APP
   ========================= */

#app {
  width: min(1100px, 100%);
  margin: auto;
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 22px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  font-weight: 950;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  box-shadow: 0 0 25px rgba(124,92,255,.25);
}

.brand h2 {
  margin: 0;
  font-size: 20px;
}

.brand span {
  color: var(--muted);
  font-size: 11px;
}

.status {
  border: 1px solid rgba(67,230,162,.18);
  color: var(--good);
  background: rgba(67,230,162,.06);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
}

.panel {
  border: 1px solid var(--border);
  background: var(--panel);
  border-radius: 24px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.setup {
  padding: 26px;
}

.section-title {
  margin-bottom: 20px;
}

.section-title h3 {
  margin: 0 0 5px;
  font-size: 21px;
}

.section-title p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.field {
  display: grid;
  gap: 8px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  color: #dce0ec;
  font-size: 12px;
  font-weight: 700;
}

.field input,
.field select {
  width: 100%;
  border: 1px solid rgba(255,255,255,.09);
  outline: none;
  color: white;
  background: rgba(255,255,255,.045);
  border-radius: 13px;
  padding: 13px 14px;
  transition: .2s ease;
}

.field input::placeholder {
  color: #666d80;
}

.field input:focus,
.field select:focus {
  border-color: rgba(124,92,255,.75);
  box-shadow: 0 0 0 3px rgba(124,92,255,.12);
}

.field select option {
  color: #111;
}

.hint {
  color: #70788d;
  font-size: 10px;
}

.error {
  color: var(--danger);
  min-height: 16px;
  font-size: 11px;
}

.analyzed-card {
  margin: 18px 0;
  padding: 15px;
  border: 1px solid rgba(0,217,255,.11);
  border-radius: 16px;
  background: rgba(0,217,255,.035);
}

.analyzed-card strong {
  display: block;
  margin-bottom: 8px;
}

.device-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.fact {
  padding: 7px 9px;
  border-radius: 9px;
  background: rgba(255,255,255,.045);
  color: #aab1c4;
  font-size: 10px;
}

.primary {
  width: 100%;
  border: 0;
  padding: 14px 18px;
  border-radius: 14px;
  color: white;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent), #5c7dff);
  box-shadow: 0 12px 30px rgba(92,125,255,.20);
  transition: transform .18s ease, filter .18s ease;
}

.primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}

/* =========================
   RESULT
   ========================= */

.result {
  margin-top: 20px;
  display: grid;
  gap: 20px;
}

.hero {
  padding: 26px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  background: rgba(124,92,255,.14);
  filter: blur(70px);
  right: -140px;
  top: -150px;
}

.hero-content {
  position: relative;
}

.eyebrow {
  color: var(--accent2);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 10px;
  font-weight: 900;
}

.hero h1 {
  margin: 7px 0;
  font-size: clamp(26px, 5vw, 42px);
  letter-spacing: -1.5px;
}

.hero p {
  color: var(--muted);
  line-height: 1.6;
  max-width: 760px;
}

.sensi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 22px;
}

.sensi-card {
  min-height: 110px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,.075);
  border-radius: 17px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.015));
}

.sensi-card .label {
  color: #9098ad;
  font-size: 11px;
  font-weight: 700;
}

.sensi-card .value {
  margin-top: 8px;
  font-size: 34px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: -1px;
}

.sensi-card .meter {
  height: 4px;
  margin-top: 15px;
  border-radius: 99px;
  background: rgba(255,255,255,.07);
  overflow: hidden;
}

.sensi-card .meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
}

.device-settings {
  padding: 24px;
}

.settings-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.setting {
  padding: 15px;
  border: 1px solid rgba(255,255,255,.065);
  border-radius: 15px;
  background: rgba(255,255,255,.025);
}

.setting strong {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
}

.setting span {
  color: #9da5b8;
  font-size: 12px;
  line-height: 1.5;
}

.actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.action {
  border: 1px solid rgba(255,255,255,.09);
  background: rgba(255,255,255,.045);
  color: white;
  border-radius: 13px;
  padding: 13px;
  font-weight: 800;
  transition: .18s ease;
}

.action:hover {
  background: rgba(255,255,255,.08);
  transform: translateY(-1px);
}

.notice {
  padding: 15px;
  border-radius: 14px;
  background: rgba(124,92,255,.06);
  border: 1px solid rgba(124,92,255,.11);
  color: #9ea6ba;
  font-size: 11px;
  line-height: 1.6;
}

.footer {
  padding: 24px 4px 12px;
  color: #6e7588;
  font-size: 11px;
  text-align: center;
}

.footer span {
  color: #858ca0;
}

/* Toast */

.toast {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: 22px;
  transform: translate(-50%, 25px);
  opacity: 0;
  pointer-events: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: #171b2b;
  border: 1px solid rgba(255,255,255,.1);
  box-shadow: 0 15px 40px rgba(0,0,0,.4);
  color: white;
  font-size: 12px;
  font-weight: 700;
  transition: .25s ease;
}

.toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* Responsive */

@media (max-width: 760px) {
  #app {
    padding: 15px;
  }

  .topbar {
    align-items: flex-start;
  }

  .status {
    font-size: 10px;
    padding: 7px 9px;
  }

  .grid,
  .settings-list {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: auto;
  }

  .sensi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .setup,
  .hero,
  .device-settings {
    padding: 19px;
  }

  .analyzer {
    padding: 25px 19px;
  }
}

@media (max-width: 430px) {
  .sensi-grid {
    grid-template-columns: 1fr 1fr;
  }

  .sensi-card {
    min-height: 100px;
    padding: 14px;
  }

  .sensi-card .value {
    font-size: 29px;
  }
}
</style>
</head>

<body>

<!-- =========================
     ANALYSIS SCREEN
     ========================= -->

<section id="analysisScreen">
  <div class="analyzer">
    <div class="logo">ZS</div>

    <h1>Zaka Sensi</h1>
    <p>
      AI-style device analysis is preparing a deterministic
      sensitivity profile for your setup.
    </p>

    <div class="progress-wrap">
      <div class="progress-track">
        <div id="progressBar" class="progress-bar"></div>
      </div>

      <div class="progress-meta">
        <span id="analysisStatus">Initializing analyzer...</span>
        <span id="percent" class="percent">0%</span>
      </div>
    </div>

    <div class="analysis-list">
      <div id="a-os" class="analysis-item">
        <span class="analysis-dot"></span>
        Operating system
      </div>

      <div id="a-browser" class="analysis-item">
        <span class="analysis-dot"></span>
        Browser/device information
      </div>

      <div id="a-screen" class="analysis-item">
        <span class="analysis-dot"></span>
        Screen resolution
      </div>

      <div id="a-dpr" class="analysis-item">
        <span class="analysis-dot"></span>
        Device pixel ratio
      </div>

      <div id="a-touch" class="analysis-item">
        <span class="analysis-dot"></span>
        Touch capability
      </div>
    </div>

    <div class="disclaimer">
      Browser analysis is limited to information websites can legitimately
      access. Private hardware details are not read.
    </div>
  </div>
</section>


<!-- =========================
     MAIN APP
     ========================= -->

<main id="app" class="hidden">

  <header class="topbar">
    <div class="brand">
      <div class="brand-mark">ZS</div>
      <div>
        <h2>Zaka Sensi</h2>
        <span>Deterministic AI Sensitivity Generator</span>
      </div>
    </div>

    <div class="status">● ANALYZED</div>
  </header>


  <!-- Setup -->

  <section id="setupPanel" class="panel setup">

    <div class="section-title">
      <h3>Build your sensitivity profile</h3>
      <p>
        Enter the information that the analyzer cannot reliably determine
        from a browser.
      </p>
    </div>

    <div class="analyzed-card">
      <strong>Browser analysis</strong>

      <div id="deviceFacts" class="device-facts"></div>
    </div>

    <form id="sensiForm" novalidate>

      <div class="grid">

        <div class="field full">
          <label for="deviceName">Device name / model</label>

          <input
            id="deviceName"
            name="deviceName"
            type="text"
            maxlength="80"
            autocomplete="off"
            placeholder="Example: Samsung Galaxy A51 5G"
          >

          <div class="hint">
            Use the actual model when possible.
          </div>

          <div id="deviceError" class="error"></div>
        </div>


        <div class="field">
          <label for="platform">Platform</label>

          <select id="platform" name="platform">
            <option value="">Select platform</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="PC">PC</option>
          </select>

          <div id="platformError" class="error"></div>
        </div>


        <div class="field">
          <label for="game">Game</label>

          <select id="game" name="game">
            <option value="">Select game</option>
            <option value="Free Fire">Free Fire</option>
            <option value="Free Fire MAX">Free Fire MAX</option>
          </select>

          <div id="gameError" class="error"></div>
        </div>


        <div class="field full">
          <label for="maxSensitivity">
            Maximum sensitivity supported by your setup
          </label>

          <input
            id="maxSensitivity"
            name="maxSensitivity"
            type="number"
            min="100"
            max="200"
            step="1"
            inputmode="numeric"
            placeholder="100 - 200"
          >

          <div class="hint">
            Allowed range: 100–200.
          </div>

          <div id="maxError" class="error"></div>
        </div>

      </div>

      <button class="primary" type="submit">
        Generate AI Sensi
      </button>

    </form>
  </section>


  <!-- Result -->

  <section id="result" class="result hidden">

    <div id="captureCard" class="panel hero">

      <div class="hero-content">

        <div class="eyebrow">Zaka Sensi • Generated Profile</div>

        <h1 id="resultTitle">
          Use these device settings
        </h1>

        <p id="resultDescription"></p>

        <div id="sensiGrid" class="sensi-grid"></div>

        <div id="captureMeta"
             style="margin-top:18px;color:#777f94;font-size:10px;">
        </div>

      </div>
    </div>


    <section class="panel device-settings">

      <div class="section-title">
        <h3>Use these device settings</h3>

        <p>
          Practical device recommendations. These do not modify the game
          or guarantee a particular performance result.
        </p>
      </div>

      <div id="settingsList" class="settings-list"></div>

    </section>


    <div class="actions">
      <button id="generateAgain" class="action">
        ↻ Generate Again
      </button>

      <button id="copySensi" class="action">
        ⧉ Copy Sensi
      </button>

      <button id="saveImage" class="action">
        ↓ Save as Image
      </button>
    </div>


    <div class="notice">
      <strong>Important:</strong>
      Zaka Sensi only creates a sensitivity recommendation from
      browser-visible device characteristics and the values you provide.
      It does not read private hardware data and does not alter Free Fire,
      Free Fire MAX, memory, files, processes, or game code.
    </div>

  </section>


  <footer class="footer">
    More tools: <span>[empty for now]</span>
  </footer>

</main>


<div id="toast" class="toast"></div>


<script>
"use strict";

/* ==========================================================
   ZAKA SENSI FRONTEND
   ========================================================== */

const analyzerData = {
  os: "Unknown",
  browser: "Unknown",
  screenWidth: window.screen && screen.width ? screen.width : 0,
  screenHeight: window.screen && screen.height ? screen.height : 0,
  dpr: Number.isFinite(window.devicePixelRatio)
    ? window.devicePixelRatio
    : 1,
  touch: (
    "ontouchstart" in window ||
    (navigator.maxTouchPoints || 0) > 0
  ),
  userAgent: navigator.userAgent || "Unavailable",
  platformHint: navigator.platform || "Unavailable",
  cores: navigator.hardwareConcurrency || null,
  memory: navigator.deviceMemory || null
};


/* ----------------------------------------------------------
   Detect browser-visible operating system.
   This does NOT claim to know private hardware information.
---------------------------------------------------------- */

function detectOS() {
  const ua = analyzerData.userAgent.toLowerCase();

  if (/android/.test(ua)) return "Android";
  if (/iphone|ipad|ipod/.test(ua)) return "iOS";
  if (/windows/.test(ua)) return "Windows";
  if (/mac os/.test(ua) || /macintosh/.test(ua)) return "macOS";
  if (/linux/.test(ua)) return "Linux";

  return "Unknown";
}


/* ----------------------------------------------------------
   Detect browser family using user-agent information.
---------------------------------------------------------- */

function detectBrowser() {
  const ua = analyzerData.userAgent;

  if (/edg\\//i.test(ua)) return "Microsoft Edge";
  if (/opr\\//i.test(ua)) return "Opera";
  if (/firefox\\//i.test(ua)) return "Firefox";
  if (/chrome\\//i.test(ua) && !/edg\\//i.test(ua)) return "Chrome";
  if (/safari\\//i.test(ua) && !/chrome\\//i.test(ua)) return "Safari";

  return "Browser";
}

analyzerData.os = detectOS();
analyzerData.browser = detectBrowser();


/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value) {
  return Math.round(value);
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ==========================================================
   ANALYSIS ANIMATION
   Stops at exactly 50% before asking for user input.
========================================================== */

const analysisMessages = [
  [8, "Reading browser environment...", "a-os"],
  [18, "Checking device/browser information...", "a-browser"],
  [28, "Checking display dimensions...", "a-screen"],
  [38, "Calculating pixel density...", "a-dpr"],
  [50, "Checking touch capability...", "a-touch"]
];

let progress = 0;

const progressBar = document.getElementById("progressBar");
const percentLabel = document.getElementById("percent");
const analysisStatus = document.getElementById("analysisStatus");

function markAnalysis(id, state) {
  const item = document.getElementById(id);
  if (!item) return;

  item.classList.remove("active", "done");

  if (state === "active") item.classList.add("active");
  if (state === "done") item.classList.add("done");
}

const analysisTimer = setInterval(() => {
  progress++;

  progressBar.style.width = progress + "%";
  percentLabel.textContent = progress + "%";

  for (const item of analysisMessages) {
    if (progress === item[0]) {
      analysisStatus.textContent = item[1];
      markAnalysis(item[2], "active");
    }

    if (progress > item[0]) {
      markAnalysis(item[2], "done");
    }
  }

  if (progress >= 50) {
    clearInterval(analysisTimer);

    analysisStatus.textContent =
      "Analysis complete — enter your device details.";

    setTimeout(() => {
      document.getElementById("analysisScreen").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");

      renderDeviceFacts();
    }, 650);
  }
}, 42);


/* ==========================================================
   DISPLAY DEVICE FACTS
========================================================== */

function renderDeviceFacts() {
  const facts = document.getElementById("deviceFacts");

  const resolution =
    analyzerData.screenWidth && analyzerData.screenHeight
      ? analyzerData.screenWidth + " × " + analyzerData.screenHeight
      : "Unavailable";

  const touch =
    analyzerData.touch
      ? "Touch capable"
      : "No touch reported";

  const dpr =
    Number.isFinite(analyzerData.dpr)
      ? analyzerData.dpr.toFixed(2)
      : "Unavailable";

  facts.innerHTML = [
    analyzerData.os,
    analyzerData.browser,
    resolution,
    "DPR " + dpr,
    touch
  ].map(value =>
    '<span class="fact">' + escapeText(value) + "</span>"
  ).join("");
}


/* ==========================================================
   DETERMINISTIC SENSITIVITY ENGINE
==========================================================

   IMPORTANT:
   There is intentionally NO Math.random().

   The engine creates a stable base score using:
   - supplied maximum sensitivity
   - platform
   - selected game
   - screen resolution
   - DPR
   - touch capability
   - browser-visible CPU core count when available
   - model name characters

   The model name is converted to a small deterministic hash.
   This means the same inputs produce the same profile.

   The generated values are always between 100 and maxSensitivity.
========================================================== */

function stringHash(text) {
  let hash = 2166136261;

  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function normalizedHash(text) {
  return stringHash(text) / 4294967295;
}

function calculateProfile(input) {
  const max = input.maxSensitivity;

  const width = analyzerData.screenWidth || 1080;
  const height = analyzerData.screenHeight || 1920;
  const dpr = analyzerData.dpr || 1;
  const touch = analyzerData.touch ? 1 : 0;
  const cores = analyzerData.cores || 4;

  const modelHash = normalizedHash(input.deviceName.toLowerCase());

  /*
    A higher usable resolution and touch device can justify
    slightly finer sensitivity values.

    This is not a claim that the browser knows the exact
    physical touchscreen sampling rate or hardware internals.
  */
  const pixelArea = width * height;
  const resolutionFactor =
    clamp(Math.sqrt(pixelArea) / 1500, 0.55, 1.65);

  const dprFactor = clamp(dpr / 2.5, 0.4, 1.2);
  const coreFactor = clamp(cores / 8, 0.5, 1.25);

  /*
    Device factor stays deterministic.
    It provides small model-specific variation without
    randomizing the sensitivity.
  */
  const deviceFactor = 0.90 + modelHash * 0.20;

  /*
    Base target is intentionally inside the user's
    supplied range rather than simply returning max.
  */
  const usableRange = max - 100;

  let normalizedBase =
    0.50 +
    ((resolutionFactor - 0.55) / 1.10) * 0.12 +
    (dprFactor - 0.4) * 0.08 +
    (coreFactor - 0.5) * 0.05 +
    touch * 0.08;

  normalizedBase *= deviceFactor;

  if (input.platform === "iOS") {
    normalizedBase += 0.025;
  }

  if (input.platform === "PC") {
    normalizedBase -= 0.055;
  }

  if (input.game === "Free Fire MAX") {
    normalizedBase -= 0.018;
  }

  normalizedBase = clamp(normalizedBase, 0.25, 0.90);

  const base =
    100 + usableRange * normalizedBase;

  /*
    Scope multipliers create a coherent profile:
    General is highest,
    Red Dot slightly lower,
    2x lower,
    4x lower,
    Sniper lower,
    Free Look sits between General and Red Dot.

    Each value is still calculated from the same device profile.
  */
  const weights = {
    general: 1.00,
    redDot: 0.965,
    scope2x: 0.875,
    scope4x: 0.735,
    sniper: 0.60,
    freeLook: 0.92
  };

  const deterministicOffset =
    ((modelHash - 0.5) * usableRange * 0.045);

  const profile = {};

  for (const [key, weight] of Object.entries(weights)) {
    let value =
      100 +
      (base - 100) * weight +
      deterministicOffset;

    /*
      Platform-specific tuning is deterministic.
      These are recommendations, not game modifications.
    */
    if (input.platform === "PC") {
      if (key === "general") value -= 3;
      if (key === "redDot") value -= 4;
      if (key === "sniper") value -= 5;
    }

    if (input.platform === "iOS") {
      if (key === "general") value += 2;
      if (key === "redDot") value += 1;
    }

    if (input.game === "Free Fire MAX") {
      if (key === "4x") value -= 1;
      if (key === "sniper") value -= 1;
    }

    value = round(clamp(value, 100, max));

    profile[key] = value;
  }

  /*
    Guarantee a sensible descending relationship.
    The result remains deterministic.
  */
  profile.redDot = clamp(
    Math.min(profile.redDot, profile.general),
    100,
    max
  );

  profile.scope2x = clamp(
    Math.min(profile.scope2x, profile.redDot),
    100,
    max
  );

  profile.scope4x = clamp(
    Math.min(profile.scope4x, profile.scope2x),
    100,
    max
  );

  profile.sniper = clamp(
    Math.min(profile.sniper, profile.scope4x),
    100,
    max
  );

  profile.freeLook = clamp(
    Math.min(profile.freeLook, max),
    100,
    max
  );

  return profile;
}


/* ==========================================================
   DEVICE SETTINGS RECOMMENDATIONS
========================================================== */

function buildDeviceSettings(input) {
  const settings = [];

  if (input.platform === "Android") {
    settings.push({
      title: "Touch response",
      text: "Use the fastest touch-response option your phone provides without causing missed or accidental touches."
    });

    settings.push({
      title: "Pointer / touch settings",
      text: "Keep touch-related accessibility settings at their normal or gaming-optimized values unless you specifically need an accessibility feature."
    });

    settings.push({
      title: "Display refresh rate",
      text: "Use the highest stable refresh-rate mode available when it does not cause excessive heat or battery drain."
    });

    settings.push({
      title: "Performance mode",
      text: "Use your phone's built-in performance or game mode if available."
    });

    settings.push({
      title: "Battery / performance",
      text: "For longer sessions, avoid extreme battery-saver modes because they may reduce CPU/GPU performance."
    });
  }

  else if (input.platform === "iOS") {
    settings.push({
      title: "Touch response",
      text: "Keep touch and accessibility settings at their normal configuration unless a specific accessibility feature is needed."
    });

    settings.push({
      title: "Pointer / touch settings",
      text: "On supported iPads, use pointer settings that feel natural. On iPhone, focus on consistent touch behavior."
    });

    settings.push({
      title: "Display refresh rate",
      text: "If your device supports a high-refresh-rate display, allow the system to use its high-refresh-rate mode."
    });

    settings.push({
      title: "Performance mode",
      text: "Keep Low Power Mode off during performance-focused gaming sessions when practical."
    });

    settings.push({
      title: "Battery / performance",
      text: "Keep the device cool and avoid gaming while charging if heat becomes excessive."
    });
  }

  else {
    settings.push({
      title: "Touch response",
      text: "For touchscreen PCs, use the normal Windows touch configuration and keep unnecessary touch utilities closed."
    });

    settings.push({
      title: "Pointer / touch settings",
      text: "Use a stable mouse sensitivity and Windows pointer configuration that feels consistent."
    });

    settings.push({
      title: "Display refresh rate",
      text: "Set Windows to the highest stable refresh rate supported by your display."
    });

    settings.push({
      title: "Performance mode",
      text: "Use an appropriate Windows power mode and your laptop manufacturer's performance mode when available."
    });

    settings.push({
      title: "Battery / performance",
      text: "When gaming on a laptop, AC power can provide more consistent performance than battery mode."
    });
  }

  return settings;
}


/* ==========================================================
   FORM VALIDATION
========================================================== */

function clearErrors() {
  document.querySelectorAll(".error").forEach(el => {
    el.textContent = "";
  });
}

function validateForm() {
  clearErrors();

  const deviceName =
    document.getElementById("deviceName").value.trim();

  const platform =
    document.getElementById("platform").value;

  const game =
    document.getElementById("game").value;

  const maxSensitivity =
    Number(document.getElementById("maxSensitivity").value);

  let valid = true;

  if (!deviceName || deviceName.length < 2) {
    document.getElementById("deviceError").textContent =
      "Enter a valid device/model name.";

    valid = false;
  }

  if (deviceName.length > 80) {
    document.getElementById("deviceError").textContent =
      "Device name is too long.";

    valid = false;
  }

  if (!["Android", "iOS", "PC"].includes(platform)) {
    document.getElementById("platformError").textContent =
      "Select Android, iOS, or PC.";

    valid = false;
  }

  if (!["Free Fire", "Free Fire MAX"].includes(game)) {
    document.getElementById("gameError").textContent =
      "Select Free Fire or Free Fire MAX.";

    valid = false;
  }

  if (
    !Number.isInteger(maxSensitivity) ||
    maxSensitivity < 100 ||
    maxSensitivity > 200
  ) {
    document.getElementById("maxError").textContent =
      "Maximum sensitivity must be a whole number from 100 to 200.";

    valid = false;
  }

  return {
    valid,
    input: {
      deviceName,
      platform,
      game,
      maxSensitivity
    }
  };
}


/* ==========================================================
   RENDER RESULT
========================================================== */

let currentResult = null;

const labels = {
  general: "General",
  redDot: "Red Dot",
  scope2x: "2x Scope",
  scope4x: "4x Scope",
  sniper: "Sniper Scope",
  freeLook: "Free Look"
};

function renderResult(input, profile) {
  currentResult = {
    input,
    profile,
    generatedAt: new Date()
  };

  document.getElementById("setupPanel")
    .classList.add("hidden");

  document.getElementById("result")
    .classList.remove("hidden");

  document.getElementById("resultTitle").textContent =
    "Use these device settings for " + input.deviceName;

  document.getElementById("resultDescription").textContent =
    "AI analyzed your device and generated this profile specifically for " +
    input.deviceName +
    ". The calculation uses browser-visible device information and your selected setup.";

  const grid = document.getElementById("sensiGrid");

  grid.innerHTML = "";

  for (const [key, label] of Object.entries(labels)) {
    const value = profile[key];

    const percentage =
      ((value - 100) / (input.maxSensitivity - 100 || 1)) * 100;

    const card = document.createElement("div");

    card.className = "sensi-card";

    card.innerHTML = `
      <div class="label">${escapeText(label)}</div>
      <div class="value">${value}</div>
      <div class="meter">
        <span style="width:${clamp(percentage, 0, 100)}%"></span>
      </div>
    `;

    grid.appendChild(card);
  }

  const generatedText =
    currentResult.generatedAt.toLocaleString();

  document.getElementById("captureMeta").textContent =
    input.platform +
    " • " +
    input.game +
    " • Max " +
    input.maxSensitivity +
    " • Generated " +
    generatedText;

  const settingsList =
    document.getElementById("settingsList");

  settingsList.innerHTML = "";

  for (const setting of buildDeviceSettings(input)) {
    const element = document.createElement("div");

    element.className = "setting";

    element.innerHTML = `
      <strong>${escapeText(setting.title)}</strong>
      <span>${escapeText(setting.text)}</span>
    `;

    settingsList.appendChild(element);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ==========================================================
   GENERATE
========================================================== */

document.getElementById("sensiForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const result = validateForm();

    if (!result.valid) {
      showToast("Check your inputs.");
      return;
    }

    const profile =
      calculateProfile(result.input);

    renderResult(result.input, profile);

    showToast("Sensitivity profile generated.");
  });


/* ==========================================================
   GENERATE AGAIN
========================================================== */

document.getElementById("generateAgain")
  .addEventListener("click", () => {
    document.getElementById("result")
      .classList.add("hidden");

    document.getElementById("setupPanel")
      .classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    showToast("Ready for another profile.");
  });


/* ==========================================================
   COPY SENSI
========================================================== */

function profileText() {
  if (!currentResult) return "";

  const { input, profile, generatedAt } =
    currentResult;

  return [
    "ZAKA SENSI",
    "==============================",
    "Device: " + input.deviceName,
    "Platform: " + input.platform,
    "Game: " + input.game,
    "Maximum Sensitivity: " + input.maxSensitivity,
    "",
    "GENERAL: " + profile.general,
    "RED DOT: " + profile.redDot,
    "2X SCOPE: " + profile.scope2x,
    "4X SCOPE: " + profile.scope4x,
    "SNIPER SCOPE: " + profile.sniper,
    "FREE LOOK: " + profile.freeLook,
    "",
    "Generated: " + generatedAt.toLocaleString(),
    "",
    "Zaka Sensi uses deterministic device/setup-based calculations.",
    "It does not modify game files, memory, processes, or game code."
  ].join("\\n");
}

document.getElementById("copySensi")
  .addEventListener("click", async () => {
    if (!currentResult) return;

    const text = profileText();

    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement("textarea");

        area.value = text;
        area.style.position = "fixed";
        area.style.left = "-9999px";

        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }

      showToast("Complete sensi copied.");
    } catch (error) {
      showToast("Clipboard permission was unavailable.");
    }
  });


/* ==========================================================
   SAVE AS IMAGE
==========================================================

   This uses an offscreen client-side canvas.
   No external image library is required.
========================================================== */

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(
    radius,
    width / 2,
    height / 2
  );

  ctx.beginPath();

  ctx.moveTo(x + r, y);

  ctx.arcTo(
    x + width,
    y,
    x + width,
    y + height,
    r
  );

  ctx.arcTo(
    x + width,
    y + height,
    x,
    y + height,
    r
  );

  ctx.arcTo(
    x,
    y + height,
    x,
    y,
    r
  );

  ctx.arcTo(
    x,
    y,
    x + width,
    y,
    r
  );

  ctx.closePath();
}

function drawCanvasText(
  ctx,
  text,
  x,
  y,
  size,
  weight = "400",
  font = "Arial"
) {
  ctx.font =
    weight +
    " " +
    size +
    "px " +
    font;

  ctx.fillText(text, x, y);
}

function createSensiCanvas() {
  const { input, profile, generatedAt } =
    currentResult;

  const width = 1200;
  const height = 1450;

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  /* Background */
  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );

  gradient.addColorStop(0, "#070914");
  gradient.addColorStop(.45, "#11162b");
  gradient.addColorStop(1, "#05060d");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  /* Decorative glow */
  const glow =
    ctx.createRadialGradient(
      1020,
      100,
      10,
      1020,
      100,
      430
    );

  glow.addColorStop(0, "rgba(124,92,255,.40)");
  glow.addColorStop(1, "rgba(124,92,255,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(600, 0, 600, 500);

  /* Main card */
  ctx.fillStyle = "#0d1020";

  roundedRect(
    ctx,
    60,
    60,
    width - 120,
    height - 120,
    40
  );

  ctx.fill();

  /* Header */
  ctx.fillStyle = "#ffffff";

  drawCanvasText(
    ctx,
    "ZAKA SENSI",
    105,
    145,
    44,
    "900"
  );

  ctx.fillStyle = "#00d9ff";

  drawCanvasText(
    ctx,
    "AI SENSITIVITY PROFILE",
    105,
    185,
    17,
    "800"
  );

  /* Device information */
  ctx.fillStyle = "#ffffff";

  drawCanvasText(
    ctx,
    input.deviceName,
    105,
    260,
    38,
    "900"
  );

  ctx.fillStyle = "#969db1";

  drawCanvasText(
    ctx,
    input.platform +
      "  •  " +
      input.game,
    105,
    300,
    19,
    "600"
  );

  drawCanvasText(
    ctx,
    "Maximum sensitivity: " +
      input.maxSensitivity,
    105,
    335,
    16,
    "500"
  );

  /* Sensitivity cards */
  const keys = [
    "general",
    "redDot",
    "scope2x",
    "scope4x",
    "sniper",
    "freeLook"
  ];

  const cardLabels = [
    "GENERAL",
    "RED DOT",
    "2X SCOPE",
    "4X SCOPE",
    "SNIPER SCOPE",
    "FREE LOOK"
  ];

  const startX = 105;
  const startY = 400;
  const cardWidth = 485;
  const cardHeight = 190;
  const gapX = 25;
  const gapY = 25;

  for (let i = 0; i < keys.length; i++) {
    const row = Math.floor(i / 2);
    const col = i % 2;

    const x =
      startX +
      col * (cardWidth + gapX);

    const y =
      startY +
      row * (cardHeight + gapY);

    ctx.fillStyle = "#171c31";

    roundedRect(
      ctx,
      x,
      y,
      cardWidth,
      cardHeight,
      25
    );

    ctx.fill();

    ctx.fillStyle = "#9da5b9";

    drawCanvasText(
      ctx,
      cardLabels[i],
      x + 28,
      y + 42,
      17,
      "800"
    );

    ctx.fillStyle = "#ffffff";

    drawCanvasText(
      ctx,
      String(profile[keys[i]]),
      x + 28,
      y + 103,
      56,
      "900"
    );

    /* Meter */
    const meterWidth = cardWidth - 56;
    const ratio =
      (profile[keys[i]] - 100) /
      (input.maxSensitivity - 100 || 1);

    ctx.fillStyle = "#2a3048";

    roundedRect(
      ctx,
      x + 28,
      y + 137,
      meterWidth,
      10,
      5
    );

    ctx.fill();

    const meterGradient =
      ctx.createLinearGradient(
        x + 28,
        y,
        x + 28 + meterWidth,
        y
      );

    meterGradient.addColorStop(
      0,
      "#7c5cff"
    );

    meterGradient.addColorStop(
      1,
      "#00d9ff"
    );

    ctx.fillStyle = meterGradient;

    roundedRect(
      ctx,
      x + 28,
      y + 137,
      Math.max(8, meterWidth * clamp(ratio, 0, 1)),
      10,
      5
    );

    ctx.fill();
  }

  /* Footer information */
  const footerY = 1060;

  ctx.fillStyle = "#171c31";

  roundedRect(
    ctx,
    105,
    footerY,
    width - 210,
    170,
    24
  );

  ctx.fill();

  ctx.fillStyle = "#ffffff";

  drawCanvasText(
    ctx,
    "DEVICE-BASED RECOMMENDATION",
    135,
    footerY + 43,
    16,
    "900"
  );

  ctx.fillStyle = "#949caf";

  drawCanvasText(
    ctx,
    "Generated from browser-visible device information",
    135,
    footerY + 78,
    15,
    "500"
  );

  drawCanvasText(
    ctx,
    "and user-provided setup details.",
    135,
    footerY + 104,
    15,
    "500"
  );

  drawCanvasText(
    ctx,
    generatedAt.toLocaleString(),
    135,
    footerY + 140,
    14,
    "500"
  );

  /* Bottom branding */
  ctx.fillStyle = "#6e7588";

  drawCanvasText(
    ctx,
    "Zaka Sensi • No game files or memory modified",
    105,
    1305,
    15,
    "600"
  );

  return canvas;
}

document.getElementById("saveImage")
  .addEventListener("click", () => {
    if (!currentResult) return;

    try {
      const canvas = createSensiCanvas();

      canvas.toBlob(blob => {
        if (!blob) {
          showToast("Could not create image.");
          return;
        }

        const url =
          URL.createObjectURL(blob);

        const safeName =
          currentResult.input.deviceName
            .replace(/[^a-z0-9]+/gi, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase() ||
          "device";

        const anchor =
          document.createElement("a");

        anchor.href = url;

        anchor.download =
          "zaka-sensi-" +
          safeName +
          ".png";

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);

        showToast("Sensi image created.");
      }, "image/png");
    } catch (error) {
      console.error(error);
      showToast("Image generation failed.");
    }
  });


/* ==========================================================
   OPTIONAL PLATFORM AUTO-HINT
   ----------------------------------------------------------
   The user still chooses the final platform manually.
   This only makes the form easier to fill.
========================================================== */

(function applyPlatformHint() {
  const hint = analyzerData.os;

  if (
    hint === "Android" ||
    hint === "iOS"
  ) {
    document.getElementById("platform").value = hint;
  }

  if (hint === "Windows" || hint === "macOS") {
    document.getElementById("platform").value = "PC";
  }
})();

</script>
</body>
</html>`;


/* ==========================================================
   EXPRESS SERVER
========================================================== */

app.get("/", (req, res) => {
  res.type("html").send(HTML);
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    app: "Zaka Sensi",
    version: "1.0.0"
  });
});

app.use((req, res) => {
  res.status(404).type("text").send("Zaka Sensi: Not Found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("========================================");
  console.log("        ZAKA SENSI IS RUNNING");
  console.log("========================================");
  console.log("");
  console.log("Local:  http://localhost:" + PORT);
  console.log("");
  console.log("Free Fire / Free Fire MAX sensitivity");
  console.log("generator ready.");
  console.log("");
  console.log("Browser-visible analysis only.");
  console.log("No game files, memory, processes, or code");
  console.log("are modified.");
  console.log("========================================");
});


/*
==============================================================
STARTUP INSTRUCTIONS
==============================================================

1. Create a folder:

   zaka-sensi

2. Save this entire file as:

   index.js

3. Open a terminal inside the folder.

4. Initialize Node.js:

   npm init -y

5. Install Express:

   npm install express

6. Start the server:

   node index.js

7. Open:

   http://localhost:3000

The application is intentionally self-contained:
- Node.js
- Express
- One index.js file
- Vanilla HTML
- Vanilla CSS
- Vanilla browser JavaScript
- No database
- No external frontend framework
- No Math.random()
- Client-side canvas image generation

==============================================================
*/
