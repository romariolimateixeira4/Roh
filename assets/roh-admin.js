(() => {
  "use strict";

  async function waitCore() {
    while (!window.ROH) await new Promise(r => setTimeout(r, 25));
  }

  async function init() {
    await waitCore();
    ROH.bindLogout();
    const session = await ROH.requireSession();
    if (!session) return null;
    ROH.setUserEmail(session);
    const admin = await ROH.rpc("roh_eh_admin");
    if (admin !== true) {
      location.href = "area.html";
      return null;
    }
    return session;
  }

  function notice(id, text, type = "") {
    const node = typeof id === "string" ? document.getElementById(id) : id;
    if (!node) return;
    node.className = `notice${type ? ` ${type}` : ""}`;
    node.textContent = text;
  }

  function busy(button, on, text = "Processando...") {
    if (!button) return;
    if (on) {
      button.dataset.label = button.textContent;
      button.disabled = true;
      button.textContent = text;
    } else {
      button.disabled = false;
      button.textContent = button.dataset.label || button.textContent;
    }
  }

  function fmtInt(value) {
    return new Intl.NumberFormat("pt-BR").format(Number(value || 0));
  }

  function fmtDate(value) {
    if (!value) return "—";
    try { return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value)); }
    catch { return String(value); }
  }

  function text(value) {
    return value === null || value === undefined || value === "" ? "—" : String(value);
  }

  window.ROHAdmin = { init, notice, busy, fmtInt, fmtDate, text };
})();
