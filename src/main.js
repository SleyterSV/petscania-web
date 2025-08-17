// En desarrollo usa el proxy de Vite (/__api). En producción usa la URL del .env
const API = import.meta.env.DEV ? '/__api' : import.meta.env.VITE_BACKEND_URL;

const $ = (s) => document.querySelector(s);
const out = $("#out");
const statusEl = $("#status");
const log = (m) => { out.textContent += (out.textContent ? "\n" : "") + m; };

$("#btnHealth").addEventListener("click", async () => {
  try {
    statusEl.textContent = "Probando /health...";
    const r = await fetch(`${API}/health`);
    if (!r.ok) throw new Error(`/health ${r.status} ${r.statusText}`);
    const data = await r.text();
    statusEl.textContent = "OK /health";
    log(`Health → ${data}`);
  } catch (e) {
    statusEl.textContent = "Error /health";
    log(`Error /health: ${e}`);
  }
});

$("#btnPredict").addEventListener("click", async () => {
  const file = $("#file").files?.[0];
  if (!file) { alert("Selecciona una imagen"); return; }

  const fd = new FormData();
  fd.append("file", file);

  try {
    statusEl.textContent = "Enviando a /predecir...";
    const r = await fetch(`${API}/predecir`, { method: "POST", body: fd });
    if (!r.ok) throw new Error(`/predecir ${r.status} ${r.statusText}`);
    const data = await r.json().catch(() => ({}));
    statusEl.textContent = "OK /predecir";
    log(JSON.stringify(data, null, 2));
  } catch (e) {
    statusEl.textContent = "Error /predecir";
    log(`Error /predecir: ${e}`);
  }
});
