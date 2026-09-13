(() => {
  "use strict";

  const SUPABASE_URL = "https://tvbnkjirfryluhxwpnna.supabase.co";
  const SUPABASE_KEY = "sb_publishable_rCGzxynHFKgEeajIAWHNAw_7Qyw9HD_";

  if (!window.supabase) {
    throw new Error("Biblioteca do Supabase não carregada.");
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  async function rpc(name, params = {}) {
    const { data, error } = await client.rpc(name, params);
    if (error) throw error;
    return data;
  }

  async function getSession() {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data?.session || null;
  }

  async function requireSession() {
    const session = await getSession();
    if (!session) {
      location.href = "login.html";
      return null;
    }
    const active = await rpc("roh_usuario_ativo");
    if (active !== true) {
      await client.auth.signOut();
      location.href = "login.html";
      return null;
    }
    return session;
  }

  async function logout() {
    await client.auth.signOut();
    location.href = "login.html";
  }

  function el(id) { return document.getElementById(id); }
  function num(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
  function pct(v) { return `${Math.round(num(v) * 100) / 100}%`; }
  function formatDate(v) {
    if (!v) return "—";
    try { return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(v)); }
    catch { return String(v); }
  }

  function option(select, value, label) {
    const o = document.createElement("option");
    o.value = String(value ?? "");
    o.textContent = label ?? "";
    select.appendChild(o);
  }

  async function studyOptions(cargoId = null, disciplinaId = null) {
    return await rpc("roh_opcoes_estudo_v1", {
      p_cargo_id: cargoId ? Number(cargoId) : null,
      p_disciplina_id: disciplinaId ? Number(disciplinaId) : null
    });
  }

  async function loadCargoSelect(select, placeholder = "Selecione o cargo") {
    const data = await studyOptions();
    const cargos = Array.isArray(data?.cargos) ? data.cargos : [];
    select.innerHTML = "";
    option(select, "", placeholder);
    cargos.forEach(c => option(select, c.cargo_id ?? c.id, c.cargo_nome ?? c.nome ?? c.cargo));
    return cargos;
  }

  async function fillDisciplines(select, cargoId) {
    const data = await studyOptions(cargoId, null);
    const itens = Array.isArray(data?.disciplinas) ? data.disciplinas : [];
    select.innerHTML = "";
    option(select, "", "Selecione a disciplina");
    itens.forEach(d => option(select, d.disciplina_id ?? d.id, d.disciplina_nome ?? d.nome ?? d.disciplina));
    return itens;
  }

  async function fillSubjects(select, cargoId, disciplinaId, includeAll = true) {
    const data = await studyOptions(cargoId, disciplinaId);
    const itens = Array.isArray(data?.assuntos) ? data.assuntos : [];
    select.innerHTML = "";
    option(select, "", includeAll ? "Todos os assuntos" : "Selecione o assunto");
    itens.forEach(a => option(select, a.assunto_id ?? a.id, a.assunto_nome ?? a.nome ?? a.assunto));
    return itens;
  }

  function normalizedQuestion(q = {}) {
    const alternatives = [];
    ["A","B","C","D","E"].forEach(letter => {
      const k = letter.toLowerCase();
      const v = q[`alternativa_${k}`] ?? q[`alternativa_${letter}`] ?? q[`alternativa${letter}`] ?? q.alternativas?.[letter] ?? q.alternativas?.[k];
      if (v !== null && v !== undefined && String(v).trim()) alternatives.push({ letter, text: String(v) });
    });
    return {
      id: q.questao_id ?? q.id,
      enunciado: String(q.enunciado ?? q.questao ?? q.texto ?? ""),
      dificuldade: String(q.dificuldade ?? ""),
      disciplina: String(q.disciplina ?? q.disciplina_nome ?? ""),
      assunto: String(q.assunto ?? q.assunto_nome ?? ""),
      tipo: q.tipo_questao ?? "multipla_escolha",
      alternatives
    };
  }

  function renderAlternatives(container, q, onClick) {
    container.innerHTML = "";
    q.alternatives.forEach(op => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "option";
      b.dataset.letter = op.letter;
      const l = document.createElement("span"); l.className = "letter"; l.textContent = op.letter;
      const t = document.createElement("span"); t.textContent = op.text;
      b.append(l, t);
      b.addEventListener("click", () => onClick(op.letter, b));
      container.appendChild(b);
    });
  }

  function markAlternatives(container, selected, correct) {
    container.querySelectorAll(".option").forEach(b => {
      b.disabled = true;
      const l = b.dataset.letter;
      if (correct && l === String(correct)) b.classList.add("correct");
      if (selected && l === String(selected) && (!correct || l !== String(correct))) b.classList.add("wrong");
    });
  }

  function setUserEmail(session) {
    document.querySelectorAll("[data-user-email]").forEach(node => {
      node.textContent = session?.user?.email || "Aluno";
    });
  }

  function bindLogout() {
    document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", logout));
  }

  window.ROH = {
    client, rpc, getSession, requireSession, logout, el, num, pct, formatDate,
    option, studyOptions, loadCargoSelect, fillDisciplines, fillSubjects,
    normalizedQuestion, renderAlternatives, markAlternatives, setUserEmail, bindLogout
  };
})();
