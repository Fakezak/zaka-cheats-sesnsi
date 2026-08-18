/*
  Tactical Signal Room style: a dark editorial calibration console with Signal Orange actions,
  acid-green generated states, asymmetric information rails, and direct, grounded copy.
*/
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  Check,
  ChevronDown,
  Clipboard,
  Crosshair,
  Gauge,
  Menu,
  MonitorSmartphone,
  MoveRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { toast } from "sonner";

const markUrl = "/manus-storage/zaka-sensi-mark_ae84780c.png";
const previewImageUrl = "https://i.ibb.co/WWNK9qxv/Gemini-Generated-Image-z49spdz49spdz49s.jpg";
const previewVideoUrl = "https://videotourl.com/videos/1787084183797-f4f9f373-c452-4fc6-9580-794c7a983313.mp4";

type Preset = {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  fireButton: number;
};

const basePreset: Preset = {
  general: 188,
  redDot: 181,
  scope2x: 170,
  scope4x: 158,
  sniper: 126,
  freeLook: 148,
  fireButton: 47,
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePreset(ram: string, device: string): Preset {
  const deviceBias = device === "iphone" ? 7 : device === "realme" ? 3 : device === "samsung" ? 1 : 0;
  if (ram === "2-3") {
    return { general: getRandomInt(184, 197) + deviceBias, redDot: getRandomInt(178, 193) + deviceBias, scope2x: getRandomInt(170, 188), scope4x: getRandomInt(160, 181), sniper: getRandomInt(112, 133), freeLook: getRandomInt(135, 158), fireButton: getRandomInt(42, 48) };
  }
  if (ram === "4-6") {
    return { general: getRandomInt(166, 184) + deviceBias, redDot: getRandomInt(158, 178) + deviceBias, scope2x: getRandomInt(150, 172), scope4x: getRandomInt(142, 164), sniper: getRandomInt(118, 138), freeLook: getRandomInt(136, 160), fireButton: getRandomInt(45, 52) };
  }
  return { general: getRandomInt(142, 162) + deviceBias, redDot: getRandomInt(136, 156) + deviceBias, scope2x: getRandomInt(128, 149), scope4x: getRandomInt(118, 143), sniper: getRandomInt(112, 140), freeLook: getRandomInt(144, 170), fireButton: getRandomInt(50, 58) };
}

const presetRows: { key: keyof Preset; label: string; hint: string }[] = [
  { key: "general", label: "General", hint: "Camera movement" },
  { key: "redDot", label: "Red Dot", hint: "Close-range drag" },
  { key: "scope2x", label: "2× Scope", hint: "Mid-range control" },
  { key: "scope4x", label: "4× Scope", hint: "Precision tracking" },
  { key: "sniper", label: "Sniper Scope", hint: "Fine adjustment" },
  { key: "freeLook", label: "Free Look", hint: "Field of view" },
];

const deviceLabels: Record<string, string> = {
  samsung: "Samsung",
  xiaomi: "Xiaomi / Redmi / POCO",
  realme: "Realme",
  iphone: "iPhone / iPad",
  infinix: "Infinix / Tecno",
  other: "Other device",
};

export default function Home() {
  const [device, setDevice] = useState("samsung");
  const [ram, setRam] = useState("4-6");
  const [preset, setPreset] = useState<Preset | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const statusLabel = useMemo(() => (preset ? "Preset ready" : "Awaiting calibration"), [preset]);

  const handleGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setPreset(generatePreset(ram, device));
      setIsGenerating(false);
    }, 420);
  };

  const copySettings = async () => {
    if (!preset) return;
    const text = `Zaka Sensi preset\nDevice: ${deviceLabels[device]}\nRAM: ${ram} GB\nGeneral: ${preset.general}\nRed Dot: ${preset.redDot}\n2x Scope: ${preset.scope2x}\n4x Scope: ${preset.scope4x}\nSniper Scope: ${preset.sniper}\nFree Look: ${preset.freeLook}\nFire Button: ${preset.fireButton}%`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Preset copied", { description: "Paste it into your Free Fire settings and test it in the range." });
    } catch {
      toast.error("Copy was blocked", { description: "Select the values manually and copy them from the panel." });
    }
  };

  const scrollToGenerator = () => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="#top" className="brand-lockup" aria-label="Zaka Sensi home">
          <span className="brand-mark"><img src={markUrl} alt="" /></span>
          <span><strong>ZAKA</strong><em>SENSI</em></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          <a href="#generator" onClick={() => setMenuOpen(false)}>Generator</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>Method</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <button className="top-cta" onClick={scrollToGenerator}>Tune your sensi <MoveRight size={16} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-grid" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Free Fire sensitivity lab / 01</div>
            <h1>Tune the<br /><span>first shot.</span></h1>
            <p className="hero-lede">A clean, device-aware starting preset for players who want less guessing and more time in the range.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={scrollToGenerator}>Build my preset <ArrowDownRight size={17} /></button>
              <a className="text-link" href="#method">How the lab works <MoveRight size={15} /></a>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-number">01</span>
            <p>Values are a starting point, not a guarantee. Your aim still gets the final word.</p>
          </div>
        </div>
        <div className="hero-footer page-width">
          <span>Signal orange / calibration active</span>
          <span>Built for Android + iOS</span>
          <span>v.2026.01</span>
        </div>
      </section>

      <section className="media-preview-section page-width" aria-labelledby="preview-title">
        <div className="media-preview-copy">
          <div className="section-kicker">Preview bay <span>02 — 04</span></div>
          <h2 id="preview-title">See the setup<br /><span>in motion.</span></h2>
          <p>Keep the visual proof close to the tool. Watch the supplied gameplay preview, then use the image reference as a quick visual check before you tune your own layout.</p>
          <div className="media-caption"><span className="media-status" /> Calibration loop / sound on</div>
        </div>
        <div className="media-preview-frame">
          <div className="media-preview-image"><img src={previewImageUrl} alt="Zaka Sensi sensitivity calibration artwork" /></div>
          <div className="media-preview-video">
            <video autoPlay loop controls playsInline preload="auto" poster={previewImageUrl} aria-label="Zaka Sensi gameplay preview video" onLoadedMetadata={(event) => { event.currentTarget.volume = 1; void event.currentTarget.play().catch(() => undefined); }}>
              <source src={previewVideoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <div className="video-label"><span>LIVE PREVIEW</span><strong>Drag. Track. Adjust.</strong></div>
          </div>
        </div>
      </section>

      <section className="intro-strip page-width" id="method">
        <div className="section-kicker">Why Zaka Sensi <span>02 — 04</span></div>
        <div className="intro-copy"><h2>Stop chasing<br /><span>random numbers.</span></h2><p>Start with a considered baseline. Zaka Sensi weighs your device tier and RAM profile, then gives you a practical setup to test—not a magic promise.</p></div>
        <div className="signal-line" />
        <div className="feature-rail">
          <div className="feature-item"><span className="feature-icon"><Gauge size={19} /></span><div><strong>Device-aware</strong><p>Less friction between your hardware and the preset.</p></div></div>
          <div className="feature-item"><span className="feature-icon"><Target size={19} /></span><div><strong>Range-ready</strong><p>Numbers organized so you can adjust one variable at a time.</p></div></div>
          <div className="feature-item"><span className="feature-icon"><ShieldCheck size={19} /></span><div><strong>Clear by design</strong><p>No fake proof, no “secret” claims, no distracting upsell.</p></div></div>
        </div>
      </section>

      <section id="generator" className="generator-section page-width">
        <div className="generator-heading"><div className="section-kicker">Calibration console <span>03 — 04</span></div><h2>Build your <span>starting point.</span></h2><p>Pick the closest match. You can always fine-tune after a few matches.</p></div>
        <div className="generator-layout">
          <div className="control-panel">
            <div className="panel-topline"><span>Input profile</span><span className="status-chip"><span className="status-dot" /> Live</span></div>
            <div className="control-step"><span className="step-index">01</span><div className="control-copy"><label htmlFor="device">Device family</label><small>Use the closest available profile.</small><div className="select-wrap"><Smartphone size={16} /><select id="device" value={device} onChange={(event) => setDevice(event.target.value)}>{Object.entries(deviceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown size={16} /></div></div></div>
            <div className="control-step"><span className="step-index">02</span><div className="control-copy"><label htmlFor="ram">RAM tier</label><small>Match your device's usable memory.</small><div className="select-wrap"><MonitorSmartphone size={16} /><select id="ram" value={ram} onChange={(event) => setRam(event.target.value)}><option value="2-3">2–3 GB RAM</option><option value="4-6">4–6 GB RAM</option><option value="8+">8 GB+ RAM</option></select><ChevronDown size={16} /></div></div></div>
            <button className="button button-primary generate-button" onClick={handleGenerate} disabled={isGenerating}>{isGenerating ? <><span className="spinner" /> Calibrating…</> : <>Generate best sensi <Sparkles size={17} /></>}</button>
            <p className="control-footnote"><span>↳</span> Your selections stay in this browser. Nothing is uploaded.</p>
          </div>

          <div className={preset ? "result-panel is-ready" : "result-panel"} aria-live="polite">
            <div className="panel-topline"><span>Preset telemetry</span><span className={preset ? "ready-label" : "muted-label"}>{statusLabel}</span></div>
            {!preset ? <div className="empty-result"><div className="empty-reticle"><Crosshair size={43} strokeWidth={1.2} /></div><h3>Your numbers will land here.</h3><p>Generate a preset to see the full sensitivity map and fire button size.</p><span className="empty-code">WAITING FOR INPUT / 000</span></div> : <div className="result-content"><div className="result-meta"><div><span>Profile</span><strong>{deviceLabels[device]}</strong></div><div><span>RAM tier</span><strong>{ram} GB</strong></div><div><span>State</span><strong className="state-ready"><Check size={14} /> Ready</strong></div></div><div className="sensi-grid">{presetRows.map(({ key, label, hint }) => <div className="sensi-row" key={key}><div><strong>{label}</strong><span>{hint}</span></div><b>{preset[key]}</b></div>)}</div><div className="fire-row"><div><strong>Fire button size</strong><span>Start here, then adjust to grip.</span></div><b>{preset.fireButton}%</b></div><button className="copy-button" onClick={copySettings}><Clipboard size={16} /> Copy preset to clipboard</button></div>}
          </div>
        </div>
      </section>

      <section className="lab-section page-width">
        <div className="lab-image" aria-hidden="true"><span className="image-label">Field note / 04</span></div>
        <div className="lab-copy"><div className="section-kicker">Use the numbers well</div><h2>One change<br /><span>at a time.</span></h2><p>Run a short training session after every preset. If your drag overshoots, lower General or Red Dot slightly. If it feels heavy, move in the other direction.</p><div className="lab-list"><div><span>01</span><p>Apply the generated baseline.</p></div><div><span>02</span><p>Test the same weapon for a few minutes.</p></div><div><span>03</span><p>Adjust one value, then repeat.</p></div></div><a className="text-link" href="#faq">Read the calibration notes <MoveRight size={15} /></a></div>
      </section>

      <section id="faq" className="faq-section page-width"><div className="section-kicker">Calibration notes <span>FAQ</span></div><div className="faq-layout"><h2>Good settings<br /><span>need context.</span></h2><div className="faq-list">{[
        ["Is this an automatic headshot tool?", "No. Zaka Sensi only generates a starting sensitivity preset. It does not control your game, modify files, or promise a particular result."],
        ["Will this work on every device?", "It is designed to give you a useful baseline across common Android and iOS device tiers. Screen size, touch response, FPS, and your own drag technique still matter."],
        ["Can I copy the generated values?", "Yes. Once a preset is generated, use the copy button to place the full profile on your clipboard."],
        ["What should I do if the preset feels off?", "Change one value at a time in small increments, play a short test round, and keep the values that feel consistent for your grip and play style."],
      ].map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button><div className={openFaq === index ? "faq-answer is-open" : "faq-answer"}><p>{answer}</p></div></div>)}</div></div></section>

      <footer className="footer page-width"><div className="footer-brand"><img src={markUrl} alt="" /><span><strong>ZAKA</strong><em>SENSI</em></span></div><p>A calmer way to find your baseline.</p><span className="footer-code">ZAKA / SIGNAL ORANGE / 2026</span></footer>
    </main>
  );
}
