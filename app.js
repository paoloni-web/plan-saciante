/* Plan Saciante · quiz funnel (estático, sin dependencias) */
(function () {
  "use strict";
  var C = window.SACIANTE_CONFIG || {};
  var $main = document.getElementById("main");
  var $top = document.getElementById("top");
  var $back = document.getElementById("back");
  var $milk = document.getElementById("milk");
  var $pct = document.getElementById("pct");
  var $progress = document.getElementById("progress");

  /* ---------- Meta Pixel (inactivo si no hay ID) ---------- */
  var pixelOn = !!(C.META_PIXEL_ID && String(C.META_PIXEL_ID).trim());
  if (pixelOn) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq("init", String(C.META_PIXEL_ID).trim());
    window.fbq("track", "PageView");
  }
  var fired = {};
  function track(ev, params, once) {
    if (once && fired[ev]) return;
    fired[ev] = true;
    if (pixelOn && window.fbq) window.fbq("track", ev, params || {});
    if (window.console) console.info("[pixel" + (pixelOn ? "" : " · sin ID") + "]", ev, params || {});
  }

  /* ---------- UTMs: se guardan y se pasan al checkout ---------- */
  try {
    if (location.search && /utm_|fbclid|src=|sck=/.test(location.search)) sessionStorage.setItem("sac_qs", location.search.slice(1));
  } catch (e) {}
  function withQs(url) {
    var qs = ""; try { qs = sessionStorage.getItem("sac_qs") || ""; } catch (e) {}
    if (!qs) return url;
    return url + (url.indexOf("?") > -1 ? "&" : "?") + qs;
  }

  /* ---------- Iconos (trazos 24×24) ---------- */
  var P = {
    check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
    belly: '<path d="M8 3c-1 3-1 5 0 7-2 2-3 5-2 8 1 2 3 3 6 3s5-1 6-3c1-3 0-6-2-8 1-2 1-4 0-7"/><path d="M12 14v.01"/>',
    arm: '<path d="M4 18c2-1 3-3 3-6 0-2 1-4 3-5l4-2c2-1 4 0 4 2 0 1-1 2-2 2l-2 1"/><path d="M4 18c3 1 7 1 10-1 2-1 4-3 5-6"/>',
    waist: '<path d="M7 3c1 4 1 6-1 9 2 3 2 6 1 9M17 3c-1 4-1 6 1 9-2 3-2 6-1 9"/><path d="M6 12h12"/>',
    leg: '<path d="M9 3v8c0 3-1 6-1 10M15 3v8c0 3 1 6 1 10"/>',
    face: '<circle cx="12" cy="9" r="5"/><path d="M8 15c1 3 3 4 4 4s3-1 4-4"/>',
    body: '<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 11h8M10 22l2-7 2 7"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    mirror: '<ellipse cx="12" cy="10" rx="6" ry="7"/><path d="M12 17v4M8 21h8"/>',
    people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 15c3 0 6 1.5 6 4.5"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    repeat: '<path d="M4 9a7 7 0 0 1 12-3l2 2M20 15a7 7 0 0 1-12 3l-2-2"/><path d="M18 4v4h-4M6 20v-4h4"/>',
    x: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    dollar: '<path d="M12 3v18M16 7.5c-1-1-2.4-1.5-4-1.5-2.2 0-4 1.1-4 3s1.8 2.6 4 3 4 1.1 4 3-1.8 3-4 3c-1.8 0-3.3-.6-4.3-1.7"/>',
    hunger: '<path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    sunset: '<path d="M3 18h18M6 18a6 6 0 0 1 12 0M12 4v4M5 9l2 2M19 9l-2 2"/>',
    cookie: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M14 8h.01M15 13h.01M9 14h.01M12 16h.01"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
    family: '<circle cx="8" cy="7" r="2.5"/><circle cx="16" cy="7" r="2.5"/><circle cx="12" cy="13" r="2"/><path d="M4 20c0-3 2-5 4-5M20 20c0-3-2-5-4-5M9 20c0-2 1.3-3 3-3s3 1 3 3"/>',
    run: '<circle cx="14" cy="4.5" r="2"/><path d="M8 21l3-6 3 2v4M6 12l3-4 5 1 3 3h3"/>',
    bed: '<path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11.5" r="1.5"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
    glass: '<path d="M6 3h12l-1.6 18H7.6z"/><path d="M6.5 9h11"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  };
  function ico(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.sparkle) + "</svg>";
  }
  var TICK = '<span class="tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="' + "M5 12.5l4.2 4.2L19 7" + '"/></svg></span>';

  /* ---------- Estado ---------- */
  var S = load() || { i: 0, a: {}, unit: "kg", hunit: "cm", w: 78, h: 160, g: 70 };
  function save() { try { sessionStorage.setItem("sac_state", JSON.stringify(S)); } catch (e) {} }
  function load() { try { return JSON.parse(sessionStorage.getItem("sac_state")); } catch (e) { return null; } }
  function name() { return (S.a.name || "").trim() || "amiga"; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function N() { return esc(name()); }
  function kg(v) { return S.unit === "kg" ? v : Math.round(v * 0.4536); }
  function fmtW(v) { return v + " " + S.unit; }
  function label(qid, val) {
    var q = SCREENS.filter(function (s) { return s.id === qid; })[0];
    if (!q) return val;
    var o = q.options.filter(function (o) { return o.v === val; })[0];
    return o ? o.t : val;
  }

  /* ---------- Pantallas ---------- */
  var SCREENS = [
    { type: "landing" },
    { id: "age", type: "single", title: "¿Cuántos años tienes?", sub: "Tu plan cambia según tu etapa.", tiles: true, options: [
      { v: "18-34", t: "18 a 34", i: "sun" }, { v: "35-44", t: "35 a 44", i: "leaf" },
      { v: "45-54", t: "45 a 54", i: "heart" }, { v: "55+", t: "55 o más", i: "star" } ] },
    { id: "bodynow", type: "single", title: "¿Cómo describirías tu cuerpo hoy?", options: [
      { v: "un-poco", t: "Me sobran unos kilitos", i: "body" },
      { v: "hinchada", t: "Me siento hinchada casi siempre", i: "belly" },
      { v: "sobrepeso", t: "Tengo sobrepeso", i: "waist" },
      { v: "mucho", t: "Quiero un cambio grande", i: "sparkle" } ] },
    { id: "zones", type: "multi", title: "¿Dónde notas más el cambio?", sub: "Elige todas las que quieras.", options: [
      { v: "panza", t: "Panza", i: "belly" }, { v: "cintura", t: "Cintura y costados", i: "waist" },
      { v: "brazos", t: "Brazos", i: "arm" }, { v: "piernas", t: "Piernas y cadera", i: "leg" },
      { v: "cara", t: "Cara y papada", i: "face" }, { v: "todo", t: "En todo el cuerpo", i: "body" } ] },
    { type: "info", render: function () {
      var z = (S.a.zones || ["panza"]).map(function (v) { return label("zones", v).toLowerCase(); });
      var first = z[0] || "panza";
      return '<h2>No eres tú. Es tu etapa.</h2>' +
        '<p class="sub">Después de los 35, el cuerpo duerme peor, guarda más líquido y pide más azúcar por la noche. Por eso muchas mujeres lo notan primero en la <b>' + esc(first) + "</b>, aunque no coman de más.</p>" +
        '<div class="card"><ol class="steps">' +
        "<li><b>Cenas con poca proteína y fibra</b><span>A las dos horas ya tienes hambre otra vez.</span></li>" +
        "<li><b>Antojo de la noche</b><span>Pan dulce, galletas, «algo» antes de dormir.</span></li>" +
        "<li><b>Duermes peor y amaneces hinchada</b><span>Y al día siguiente el hambre es mayor.</span></li>" +
        "</ol></div>";
    }, cta: "Tiene sentido, continuar" },
    { id: "name", type: "name", title: "¿Cómo te llamas?", sub: "Para preparar tu plan con tu nombre." },
    { id: "bother", type: "single", title: function () { return N() + ", ¿qué es lo que más te pesa hoy?"; }, options: [
      { v: "espejo", t: "Mi reflejo", s: "No me reconozco en el espejo ni en las fotos", i: "mirror" },
      { v: "ropa", t: "La ropa", s: "Nada me queda y me da pena salir", i: "waist" },
      { v: "energia", t: "Mi energía", s: "Llego sin ganas al final del día", i: "bolt" },
      { v: "salud", t: "Mi salud", s: "Me preocupa cómo voy a estar en unos años", i: "heart" } ] },
    { id: "tried", type: "single", title: "¿Ya intentaste bajar de peso antes?", options: [
      { v: "rebote", t: "Sí, bajo y lo recupero", i: "repeat" },
      { v: "nomantengo", t: "Sí, pero no lo sostengo", i: "clock" },
      { v: "nada", t: "Probé de todo y nada funcionó", i: "x" },
      { v: "primera", t: "Es mi primera vez en serio", i: "star" } ] },
    { type: "info", render: function () {
      var t = S.a.tried;
      var line = t === "rebote" ? "Bajar rápido y recuperarlo no es falta de voluntad: cuando comes muy poco, tu cuerpo se defiende con más hambre." :
        t === "nada" ? "Si probaste de todo, probablemente todo era «comer menos». Con hambre nadie aguanta 21 días." :
        t === "nomantengo" ? "Lo que no se sostiene casi siempre es lo que te deja con hambre. El plan va al revés: primero saciedad." :
        "Empezar bien importa: lo que hagas las primeras dos semanas decide si sigues.";
      return '<div class="center" style="margin-top:12px"><span class="badge ok">' + ico("leaf").replace("<svg", '<svg style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2"') + " Buena noticia</span></div>" +
        '<h2 class="center" style="margin-top:14px">' + N() + ", no te falta fuerza de voluntad.</h2>" +
        '<p class="sub center">' + line + "</p>" +
        '<div class="card center"><p style="margin:0;font-size:19px;font-weight:600">El Plan Saciante no te quita comida.<br>Te da <span style="color:var(--canela)">un licuado para la noche</span> que llena y calma el antojo.</p></div>';
    }, cta: "Quiero saber más" },
    { id: "blockers", type: "multi", title: "¿Qué te frena hoy?", sub: "Elige todas las que apliquen.", options: [
      { v: "hambre", t: "Me da hambre y termino cediendo", i: "hunger" },
      { v: "noche", t: "Los antojos de la noche", i: "moon" },
      { v: "tiempo", t: "No tengo tiempo para cocinar aparte", i: "clock" },
      { v: "dinero", t: "Gasté en cosas que no sirvieron", i: "dollar" },
      { v: "constancia", t: "Empiezo con ganas y lo dejo", i: "repeat" } ] },
    { type: "info", render: function () {
      return "<h2>Lo que gastan muchas mujeres vs. lo que vas a gastar tú</h2>" +
        '<div class="compare"><div class="a"><b>Lo de siempre</b>Malteadas de marca, suplementos, comida «light», gimnasio que no usas: fácil más de $100 al mes.</div>' +
        '<div class="b"><b>Plan Saciante</b>Avena, chía, canela, yogur y fruta del súper. Menos de <b style="display:inline;font-size:inherit">$1</b> por licuado.</div></div>' +
        '<p class="sub" style="margin-top:16px">Sin polvos raros. Sin pastillas. Solo tu licuadora.</p>';
    }, cta: "Continuar" },
    { id: "goals", type: "multi", title: "¿Qué quieres lograr en 21 días?", sub: "Elige todas las que quieras.", options: [
      { v: "deshinchar", t: "Deshinchar la panza", i: "belly" },
      { v: "antojos", t: "Dejar los antojos de la noche", i: "cookie" },
      { v: "energia", t: "Tener más energía", i: "bolt" },
      { v: "ropa", t: "Que la ropa me quede mejor", i: "waist" },
      { v: "dormir", t: "Dormir mejor", i: "bed" } ] },
    { id: "bloat", type: "single", title: "¿Con qué frecuencia te sientes hinchada o con la panza dura?", options: [
      { v: "diario", t: "Casi todos los días", i: "belly" },
      { v: "tarde", t: "Sobre todo en la tarde y la noche", i: "sunset" },
      { v: "aveces", t: "De vez en cuando", i: "clock" },
      { v: "nunca", t: "Casi nunca", i: "check" } ] },
    { id: "cravings", type: "single", title: "¿A qué hora te pegan más los antojos?", options: [
      { v: "tarde", t: "En la tarde, como a las 5", i: "sunset" },
      { v: "cena", t: "Después de cenar", i: "moon" },
      { v: "madrugada", t: "Me despierto con hambre", i: "bed" },
      { v: "todo", t: "Todo el día", i: "clock" } ] },
    { type: "info", render: function () {
      return "<h2>Así funciona el licuado de la noche</h2>" +
        '<p class="sub">Una receta de 5 ingredientes que tomas como cena ligera o 1 hora antes de dormir.</p>' +
        '<div class="card"><ol class="steps">' +
        "<li><b>Proteína + fibra</b><span>Yogur, avena y chía llenan y se digieren despacio.</span></li>" +
        "<li><b>Sin pico de azúcar</b><span>La canela y la fruta entera endulzan sin dispararte el antojo.</span></li>" +
        "<li><b>Llegas a la cama satisfecha</b><span>Sin asaltar la alacena a las 11 de la noche.</span></li>" +
        '<li class="good"><b>Amaneces más ligera</b><span>Menos hinchazón y más energía, día tras día.</span></li>' +
        "</ol></div>";
    }, cta: "Entendido, sigamos" },
    { id: "weight", type: "weight", title: "¿Cuánto pesas hoy?", sub: "Un aproximado está bien." },
    { id: "height", type: "height", title: "¿Cuánto mides?" },
    { id: "goal", type: "goal", title: "¿Cuál es tu peso ideal?", sub: "El que te haría sentir cómoda." },
    { id: "routine", type: "single", title: "¿Cómo es tu día a día?", options: [
      { v: "fuera", t: "Trabajo fuera de casa", i: "briefcase" },
      { v: "casa", t: "Trabajo desde casa", i: "home" },
      { v: "familia", t: "Me ocupo de la casa y la familia", i: "family" },
      { v: "corrida", t: "Ando corriendo todo el día", i: "run" } ] },
    { id: "sleep", type: "single", title: "¿Cuántas horas duermes?", options: [
      { v: "<5", t: "Menos de 5", i: "bolt" }, { v: "5-7", t: "Entre 5 y 7", i: "moon" },
      { v: "7-9", t: "Entre 7 y 9", i: "bed" }, { v: "9+", t: "Más de 9", i: "sun" } ] },
    { id: "water", type: "single", title: "¿Cuánta agua tomas al día?", options: [
      { v: "poca", t: "Casi nada, tomo más café o refresco", i: "x" },
      { v: "2-4", t: "2 a 4 vasos", i: "drop" },
      { v: "5-7", t: "5 a 7 vasos", i: "drop" },
      { v: "8+", t: "8 vasos o más", i: "check" } ] },
    { type: "projection" },
    { id: "commit", type: "single", title: function () { return N() + ", ¿te comprometes a tomar tu licuado 21 noches?"; }, sub: "Son 5 minutos al día. Es lo único que te vamos a pedir.", options: [
      { v: "si", t: "Sí, me comprometo", i: "heart" },
      { v: "hoy", t: "Sí, y quiero empezar hoy", i: "sparkle" },
      { v: "dudas", t: "Tengo algunas dudas", i: "question" } ], onDone: function () { track("Lead", { content_name: "quiz_completo" }, true); } },
    { type: "loading", kind: "analysis" },
    { type: "result" },
    { type: "testimonials" },
    { type: "loading", kind: "plan" },
    { type: "offer" }
  ];
  var LAST_QUIZ = SCREENS.length - 1;

  /* ---------- Render ---------- */
  function setProgress() {
    var p = Math.round((S.i / LAST_QUIZ) * 100);
    $milk.setAttribute("y", String(52 - 52 * (p / 100)));
    $pct.textContent = p + "%";
    $progress.setAttribute("aria-valuenow", String(p));
  }
  function go(i, push) {
    S.i = Math.max(0, Math.min(LAST_QUIZ, i));
    save();
    if (push !== false) { try { history.pushState({ i: S.i }, "", location.pathname + location.search); } catch (e) {} }
    render();
  }
  function next() { var s = SCREENS[S.i]; if (s && s.onDone) s.onDone(); go(S.i + 1); }
  window.addEventListener("popstate", function (e) {
    if (e.state && typeof e.state.i === "number") go(e.state.i, false); else go(0, false);
  });
  $back.addEventListener("click", function () { history.back(); });

  var timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; }

  function render() {
    clearTimers();
    var s = SCREENS[S.i];
    var t = s.type;
    document.body.classList.toggle("dark", t === "loading");
    $top.hidden = t === "landing";
    $back.disabled = S.i <= 1 || t === "loading" || t === "offer";
    setProgress();
    var html = "";
    if (t === "landing") html = landing();
    else if (t === "single" || t === "multi") html = question(s);
    else if (t === "info") html = s.render() + dock(s.cta || "Continuar");
    else if (t === "name") html = nameScreen(s);
    else if (t === "weight" || t === "height" || t === "goal") html = stepper(s);
    else if (t === "projection") html = projection();
    else if (t === "loading") html = loading(s);
    else if (t === "result") html = result();
    else if (t === "testimonials") html = testimonials();
    else if (t === "offer") html = offer();
    $main.innerHTML = '<div class="screen">' + html + "</div>";
    window.scrollTo(0, 0);
    bind(s);
    var h = $main.querySelector("h1,h2");
    if (h && S.i > 0) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  function dock(label, disabled) {
    return '<div class="dock"><button class="cta" type="button" data-next' + (disabled ? " disabled" : "") + ">" + label + "</button></div>";
  }
  function tt(x) { return typeof x === "function" ? x() : x; }

  function landing() {
    return '<section class="hero">' +
      '<span class="kicker">' + ico("moon").replace("<svg", '<svg style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2"') + " Test gratuito de 2 minutos</span>" +
      "<h1>El licuado de la noche para <em>deshinchar la panza</em> y dejar los antojos</h1>" +
      '<p class="sub" style="margin:0">Responde unas preguntas y recibe tu plan de 21 días según tu cuerpo, tu rutina y tus horarios.</p>' +
      '<div class="hero-art" aria-hidden="true"><div class="stars"></div><div class="moon"></div>' +
      '<svg class="cup" viewBox="0 0 120 150"><defs><clipPath id="hc"><path d="M14 10h92l-10 130H24z"/></clipPath></defs><g clip-path="url(#hc)"><rect width="120" height="150" fill="#2B3763"/><rect y="38" width="120" height="120" fill="#F3E4C8"/><path d="M0 40 Q30 30 60 40 T120 40 V52 H0z" fill="#FFF6E6"/><circle cx="44" cy="80" r="2.4" fill="#9C4A1A"/><circle cx="70" cy="96" r="2" fill="#9C4A1A"/><circle cx="58" cy="118" r="2.2" fill="#9C4A1A"/><circle cx="82" cy="70" r="1.8" fill="#9C4A1A"/></g><path d="M14 10h92l-10 130H24z" fill="none" stroke="#F5F1EA" stroke-width="4" stroke-linejoin="round"/><path d="M86 0l-8 50" stroke="#F2B544" stroke-width="6" stroke-linecap="round"/></svg>' +
      '<p class="recipe"><b>5 ingredientes del súper.</b> Avena, chía, canela, yogur y fruta. Menos de $1 por vaso.</p></div>' +
      '<button class="cta" type="button" data-next>Empezar mi test</button>' +
      '<div class="proof"><span class="faces" aria-hidden="true"><i style="background:#9C4A1A">L</i><i style="background:#1E7A4C">M</i><i style="background:#2B3763">R</i><i style="background:#C98A12">C</i></span><span>Mujeres de México y EE. UU. ya lo están haciendo</span></div>' +
      '<div class="trust"><span>' + ico("check") + "Gratis</span><span>" + ico("check") + "Sin registrarte</span><span>" + ico("check") + "Resultado al instante</span></div>" +
      "</section>";
  }

  function question(s) {
    var multi = s.type === "multi";
    var cur = S.a[s.id];
    var opts = s.options.map(function (o) {
      var sel = multi ? (cur || []).indexOf(o.v) > -1 : cur === o.v;
      var attr = multi ? ' role="checkbox" aria-checked="' + sel + '"' : ' aria-pressed="' + sel + '"';
      return '<button type="button" class="opt' + (s.tiles ? " tile" : "") + '" data-v="' + o.v + '"' + attr + ">" +
        '<span class="ic">' + ico(o.i) + "</span>" +
        '<span class="tx">' + esc(o.t) + (o.s ? "<small>" + esc(o.s) + "</small>" : "") + "</span>" +
        (multi ? TICK : "") + "</button>";
    }).join("");
    return "<h2>" + tt(s.title) + "</h2>" + (s.sub ? '<p class="sub">' + s.sub + "</p>" : "") +
      '<div class="opts' + (s.tiles ? " grid2" : "") + '" role="group" aria-label="Opciones">' + opts + "</div>" +
      (multi ? dock("Continuar", !(cur && cur.length)) : "");
  }

  function nameScreen(s) {
    return "<h2>" + s.title + '</h2><p class="sub">' + s.sub + "</p>" +
      '<form class="field" id="nf" novalidate><label for="nm">Tu nombre</label>' +
      '<input id="nm" name="given-name" autocomplete="given-name" maxlength="24" placeholder="Ej.: Lupita" value="' + esc(S.a.name || "") + '" required></form>' +
      dock("Continuar", !(S.a.name || "").trim());
  }

  function stepper(s) {
    var isH = s.type === "height";
    var unitToggle = isH
      ? '<div class="center"><div class="unit" role="group" aria-label="Unidad"><button type="button" data-unit="cm" aria-pressed="' + (S.hunit === "cm") + '">cm</button><button type="button" data-unit="in" aria-pressed="' + (S.hunit === "in") + '">pies</button></div></div>'
      : '<div class="center"><div class="unit" role="group" aria-label="Unidad"><button type="button" data-unit="kg" aria-pressed="' + (S.unit === "kg") + '">kg</button><button type="button" data-unit="lb" aria-pressed="' + (S.unit === "lb") + '">lb</button></div></div>';
    var extra = "";
    if (s.type === "goal") {
      var diff = S.w - S.g;
      extra = '<div class="center"><span class="pill" id="gpill">' + (diff > 0 ? "Tu meta: " + diff + " " + S.unit + " menos" : "Elige un peso menor al actual") + "</span></div>";
    }
    var range = isH ? (S.hunit === "cm" ? [140, 195] : [55, 77]) : (S.unit === "kg" ? [40, 180] : [90, 400]);
    return "<h2 class=\"center\">" + s.title + "</h2>" + (s.sub ? '<p class="sub center">' + s.sub + "</p>" : "") + unitToggle +
      '<div class="stepper"><button type="button" data-step="-1" aria-label="Restar">−</button><output id="sv" aria-live="polite"></output><button type="button" data-step="1" aria-label="Sumar">+</button></div>' +
      '<input type="range" id="sr" min="' + range[0] + '" max="' + range[1] + '" step="1" aria-label="' + esc(s.title) + '">' + extra + dock("Continuar");
  }
  function heightLabel(cm) {
    if (S.hunit === "cm") return cm + "<small>cm</small>";
    var inch = Math.round(cm / 2.54); return Math.floor(inch / 12) + "′" + (inch % 12) + "″";
  }

  function projection() {
    var diff = Math.max(0, S.w - S.g);
    return "<h2>" + N() + ", tu meta es alcanzable.</h2>" +
      '<p class="sub">' + (diff > 0 ? "Quieres bajar " + diff + " " + S.unit + ". " : "") + "Lo que hace que una mujer llegue a su meta no es aguantar hambre, sino notar cambios pronto para no rendirse. Así se ven tus 21 días:</p>" +
      '<div class="card chart"><svg viewBox="0 0 320 170" role="img" aria-label="Gráfica: los antojos bajan y la energía sube del día 1 al día 21">' +
      '<g stroke="#EFE6D8" stroke-width="1"><path d="M30 20H310M30 60H310M30 100H310M30 140H310"/></g>' +
      '<path d="M30 30 C90 40 120 90 170 110 S260 135 310 140" fill="none" stroke="#9C4A1A" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M30 130 C90 125 130 90 180 70 S270 35 310 28" fill="none" stroke="#1E7A4C" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="310" cy="28" r="6" fill="#1E7A4C"/><circle cx="310" cy="140" r="6" fill="#9C4A1A"/>' +
      '<g font-family="Figtree" font-size="12" fill="#4A4F63"><text x="30" y="162">Día 1</text><text x="120" y="162">Día 7</text><text x="205" y="162">Día 14</text><text x="282" y="162">Día 21</text></g></svg>' +
      '<div class="legend"><span><i style="background:#9C4A1A"></i>Antojos</span><span><i style="background:#1E7A4C"></i>Energía</span></div></div>' +
      '<p class="note">Ilustración del recorrido típico del plan. Cada cuerpo responde distinto.</p>' + dock("Ver mi plan");
  }

  var REVIEWS = [
    ["Lupita, 47 · Guadalajara", "Ya no me levanto a buscar pan a las 11. El licuado de canela me deja tranquila."],
    ["Maribel, 52 · Houston, TX", "La primera semana noté la panza menos inflamada. Lo hago con lo que ya tengo en casa."],
    ["Claudia, 44 · CDMX", "Lo que más me gustó es que no paso hambre. Por fin algo que sí puedo sostener."],
    ["Rosa, 58 · Los Ángeles, CA", "Duermo mejor y amanezco con más ganas. Mis hijas ya me preguntaron qué estoy haciendo."]
  ];
  function loading(s) {
    var plan = s.kind === "plan";
    var items = plan ? ["Eligiendo tus 6 licuados", "Armando tu menú de 21 días", "Ajustando la lista del súper", "Agregando tus bonos"]
      : ["Calculando tu índice de masa corporal", "Revisando tus horarios de antojo", "Analizando sueño e hidratación", "Detectando tus señales principales"];
    return '<div class="loader" aria-live="polite">' +
      '<svg class="bigcup" viewBox="0 0 40 52" aria-hidden="true"><defs><clipPath id="bc"><path d="M5 4h30l-4 44H9z"/></clipPath></defs><g clip-path="url(#bc)"><rect width="40" height="52" fill="#2B3763"/><rect id="bigmilk" y="52" width="40" height="52" fill="#F2B544"/></g><path d="M5 4h30l-4 44H9z" fill="none" stroke="#F5F1EA" stroke-width="2" stroke-linejoin="round"/></svg>' +
      "<h2>" + (plan ? "Estamos creando tu plan personalizado, " + N() + "…" : "Analizando tus respuestas, " + N() + "…") + "</h2>" +
      '<p class="sub" id="lp" style="margin:0;font:800 28px var(--display);color:#F2B544">0%</p>' +
      '<ul class="checks">' + items.map(function (x) { return '<li><span class="dot"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span>' + x + "</li>"; }).join("") + "</ul>" +
      '<div class="ticker" id="tk"></div></div>';
  }

  function bmi() { var m = (S.h || 160) / 100; return kg(S.w) / (m * m); }
  function signals() {
    var a = S.a, out = [];
    if (a.bloat === "diario" || a.bloat === "tarde") out.push(["Hinchazón frecuente", "Tu digestión se pone lenta en la tarde y la noche. La fase Deshinchar empieza justo aquí."]);
    if (a.cravings === "cena" || a.cravings === "madrugada" || (a.blockers || []).indexOf("noche") > -1) out.push(["Antojos nocturnos", "Tu última comida no te deja satisfecha. El licuado de la noche cubre ese hueco."]);
    if (a.sleep === "<5" || a.sleep === "5-7") out.push(["Sueño corto", "Dormir menos de 7 horas aumenta el hambre del día siguiente. Tu plan incluye una rutina para la noche."]);
    if (a.water === "poca" || a.water === "2-4") out.push(["Poca hidratación", "Con poca agua el cuerpo retiene más líquido. Tus aguas frescas sin azúcar ayudan."]);
    if (a.tried === "rebote" || a.tried === "nada") out.push(["Efecto rebote", "Las dietas de hambre hacen que el cuerpo se defienda. Aquí no vas a contar calorías."]);
    if (out.length < 2) out.push(["Cenas bajas en proteína y fibra", "Es el patrón más común en mujeres de tu edad, y el más fácil de corregir."]);
    return out.slice(0, 4);
  }
  function result() {
    var b = bmi(), bv = b.toFixed(1);
    var cat = b < 18.5 ? "Bajo" : b < 25 ? "Normal" : b < 30 ? "Sobrepeso" : "Obesidad";
    var pin = Math.max(3, Math.min(97, ((b - 15) / (40 - 15)) * 100));
    var sig = signals();
    return '<span class="badge warn">' + ico("alert").replace("<svg", '<svg style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2"') + " " + sig.length + " señales detectadas</span>" +
      '<h2 style="margin-top:12px">' + N() + ", este es tu resultado</h2>" +
      '<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Tu IMC</b><span style="font:800 30px var(--display)">' + bv + ' <small style="font:600 15px var(--body);color:var(--texto-2)">' + cat + "</small></span></div>" +
      '<div class="imc"><div class="imc-bar"><span class="imc-pin" style="left:' + pin + '%"></span></div><div class="imc-scale"><span>Bajo</span><span>Normal</span><span>Sobrepeso</span><span>Obesidad</span></div></div>' +
      '<ul class="signals">' + sig.map(function (x) { return "<li>" + ico("alert") + "<div><b>" + x[0] + "</b><span>" + x[1] + "</span></div></li>"; }).join("") + "</ul></div>" +
      '<p class="sub" style="margin-top:18px">La buena noticia: todas tienen que ver con <b>hábitos de la tarde y la noche</b>, y es justo lo que el Plan Saciante trabaja.</p>' +
      '<p class="note">El IMC es solo una referencia. Este test no es un diagnóstico médico.</p>' + dock("Ver cómo lo logran otras mujeres");
  }
  function testimonials() {
    var colors = ["#9C4A1A", "#1E7A4C", "#2B3763", "#C98A12"];
    return "<h2>Lo que cuentan quienes ya empezaron</h2>" +
      '<div class="testis" style="margin-top:14px">' + REVIEWS.map(function (r, i) {
        return '<article class="testi"><div class="who"><span class="av" style="background:' + colors[i] + '" aria-hidden="true">' + r[0][0] + "</span><div><b>" + r[0].split(",")[0] + '</b><div style="font-size:14px;color:var(--texto-2)">' + r[0].split(",")[1] + '</div></div><span class="stars" style="margin-left:auto" aria-label="5 de 5 estrellas">★★★★★</span></div><p>“' + r[1] + "”</p></article>";
      }).join("") + "</div>" +
      (C.SHOW_TESTIMONIAL_NOTE ? '<p class="fine">Testimonios ilustrativos. Los resultados varían de persona a persona.</p>' : "") +
      dock("Quiero mi plan");
  }

  function nextSunday() {
    var d = new Date(); var add = (7 - d.getDay()) % 7; d.setDate(d.getDate() + add);
    return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  }
  function offer() {
    track("ViewContent", { content_name: "Plan Saciante 21", value: C.PRICE, currency: C.CURRENCY }, true);
    var goals = (S.a.goals || ["deshinchar", "antojos"]).map(function (v) { return label("goals", v).toLowerCase(); });
    var g = goals.slice(0, 2).join(" y ");
    var price = C.PRICE, anchor = C.ANCHOR;
    var cta = '<a class="cta" data-checkout href="' + esc(C.CHECKOUT_URL || "#") + '">Recibir mi plan · $' + price + " USD</a>";
    return '<div class="offer">' +
      '<div class="banner" role="timer">Esta oferta termina en: <b id="tm">' + C.TIMER_MINUTES + ":00</b></div>" +
      "<h2>" + N() + ", tu Plan Saciante 21 personalizado está listo</h2>" +
      appMock() + todayVsAfter() +
      '<p class="sub">Hecho con tus respuestas para ayudarte a <b>' + esc(g) + "</b>, con recetas de tu súper y un licuado para cada noche. Todo dentro de <b>una app en tu celular</b>.</p>" +
      cta +
      "<section><h2>Tus 21 días, paso a paso</h2><div class=\"phases\">" +
      '<div class="phase"><div class="d">Días<b>1-7</b></div><div><b>Deshinchar</b><p>Licuado de la noche + aguas frescas. Notas la panza más ligera.</p></div></div>' +
      '<div class="phase"><div class="d">Días<b>8-14</b></div><div><b>Ajustar</b><p>Menú con más proteína y fibra. Los antojos bajan.</p></div></div>' +
      '<div class="phase"><div class="d">Días<b>15-21</b></div><div><b>Sostener</b><p>Ya es tu hábito. Postres sin culpa incluidos.</p></div></div></div></section>' +
      "<section><h2>Todo lo que recibes hoy</h2><ul class=\"stack\">" +
      stackItem("", "App Plan Saciante 21", "Tu menú de cada día, check-in de hábitos, licuado + 6 variantes y gráfica de progreso", 67) +
      stackItem("", "Lista del súper automática", "Se arma sola cada semana con tu menú. La compartes por WhatsApp en un toque", 20) +
      stackItem("b", "Bono 1 · 30 Postres Sin Culpa", "Dentro de la app, con filtros por tiempo y por lo que no comes", 27) +
      stackItem("b", "Bono 2 · 20 Licuados y Aguas Frescas", "Jamaica, pepino-limón, avena-canela… para no aburrirte", 19) +
      stackItem("b", "Bono 3 · Guía Antojos Bajo Control", "Plan de 7 días para la ansiedad de la noche, día por día en la app", 17) +
      stackItem("", "Recordatorios y acceso de por vida", "Alarmas para tu licuado y tu check-in. Entras desde cualquier celular con tu correo", 17) +
      "</ul>" +
      '<div class="price"><div class="today">Oferta válida solo por hoy</div><div class="was">Valor total <s>$' + anchor + " USD</s></div>" +
      '<div class="now">$' + price + "<small>USD</small></div>" +
      '<p class="why">Precio de lanzamiento hasta el <b>' + nextSunday() + "</b>. Después sube a $" + C.PRICE_AFTER + " y los bonos se retiran.</p>" +
      cta.replace('class="cta"', 'class="cta"') +
      '<div class="secure">' + ico("lock") + " Compra segura · Acceso inmediato a tu app · Satisfacción garantizada</div></div></section>" +
      offerReviews() + '<section class="card guarantee"><div class="seal"><span><b>30</b>días</span></div><div><b>Garantía de 30 días</b><p style="margin:4px 0 0;color:var(--texto-2);font-size:15.5px">Si en 30 días no sientes la diferencia, te devolvemos cada centavo. Escribes un correo y listo, sin preguntas.</p></div></section>' +
      "<section><h2>Preguntas frecuentes</h2>" +
      faq("¿Necesito ingredientes caros?", "No. Avena, chía, canela, yogur natural, leche o bebida vegetal y fruta. Todo lo encuentras en Walmart, Soriana, H-E-B o cualquier súper.") +
      faq("¿Voy a pasar hambre?", "No. El plan está hecho para que comas tres veces al día y llegues satisfecha a la noche. No se cuentan calorías.") +
      faq("¿Cómo lo recibo?", "Justo después de pagar entras a la app con el mismo correo de tu compra. Se instala en tu celular como cualquier app (iPhone y Android), sin descargar nada de la tienda.") +
      faq("¿Sirve si tengo más de 50?", "Sí. Está pensado para mujeres de 35 a 60 años. Si tomas medicamentos o tienes alguna condición, consúltalo antes con tu médico.") +
      faq("¿Es un medicamento o un suplemento?", "No. Es un plan de alimentación con recetas caseras. No vendemos pastillas ni polvos.") +
      faq("¿Y si no me funciona?", "Tienes 30 días de garantía. Si no te gusta, te devolvemos tu dinero.") +
      "</section>" +
      '<section style="margin-top:24px">' + cta + "</section>" +
      '<p class="disclaimer">Este material es educativo y no sustituye la consulta médica. Si estás embarazada, lactando, tienes diabetes, tomas medicamentos o tienes alguna condición de salud, consulta a tu médico antes de cambiar tu alimentación o tu actividad física. Los resultados varían de persona a persona. Este sitio no forma parte de Facebook ni de Meta Platforms, Inc.</p>' +
      "</div>";
  }
  // Mockup de la app (Franco: "hay que mostrar que vamos a entregar una aplicación", L 2.5; mockup del celular, L 4.4).
  function appMock() {
    return '<figure class="appmock"><img src="app-mockup.png" width="1080" height="1080" alt="La app del Plan Saciante en un celular: tu día, tu menú y tu check-in" loading="eager"><figcaption>Tu plan vive en una app en tu celular</figcaption></figure>';
  }
  // Franco L 4.2: bloque "Hoy / En 21 días" con barras en rojo y en verde (dos columnas al 50 %) + elemento de alerta.
  function todayVsAfter() {
    var rows = [["Hinchazón", 78, 25], ["Antojos de noche", 82, 20], ["Energía", 30, 80]];
    function col(title, idx, cls) {
      return '<div class="tv-col ' + cls + '"><b>' + title + "</b>" + rows.map(function (r) {
        var v = r[idx], good = r[0] === "Energía" ? v >= 50 : v < 50;
        return '<div class="tv-row"><span>' + r[0] + '</span><div class="tv-track"><i style="width:' + v + "%;background:" + (good ? "#1E7A4C" : "#B3261E") + '"></i></div></div>';
      }).join("") + "</div>";
    }
    return '<section class="tv"><div class="tv-grid">' + col("Hoy", 1, "now") + col("En 21 días", 2, "after") + "</div>" +
      '<div class="alertbox" role="note">' + ico("alert") + "<div><b>Atención, " + N() + "</b><span>Si sigues igual, la hinchazón y los antojos de la noche suelen ir a más con los años. Empezar hoy es lo más fácil.</span></div></div></section>";
  }
  function offerReviews() {
    var colors = ["#9C4A1A", "#1E7A4C", "#2B3763", "#C98A12"];
    return '<section><h2>Lo que dicen quienes ya lo usan</h2><div class="testis" style="margin-top:12px">' + REVIEWS.map(function (r, i) {
      return '<article class="testi"><div class="who"><span class="av" style="background:' + colors[i % 4] + '" aria-hidden="true">' + r[0][0] + "</span><div><b>" + r[0].split(",")[0] + '</b><div style="font-size:14px;color:var(--texto-2)">' + r[0].split(",")[1] + '</div></div><span class="stars" style="margin-left:auto" aria-label="5 de 5 estrellas">★★★★★</span></div><p>“' + r[1] + "”</p></article>";
    }).join("") + "</div>" + (C.SHOW_TESTIMONIAL_NOTE ? '<p class="fine">Testimonios ilustrativos. Los resultados varían de persona a persona.</p>' : "") + "</section>";
  }
  function stackItem(cls, t, d, v) {
    return '<li><span class="mock ' + cls + '" aria-hidden="true"></span><span class="t"><b>' + t + "</b><span>" + d + '</span></span><span class="v" aria-label="Valor ' + v + ' dólares">$' + v + "</span></li>";
  }
  function faq(q, a) { return "<details><summary>" + q + "</summary><p>" + a + "</p></details>"; }

  /* ---------- Interacciones ---------- */
  function bind(s) {
    $main.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", next); });

    if (s.type === "single") {
      $main.querySelectorAll(".opt").forEach(function (b) {
        b.addEventListener("click", function () {
          S.a[s.id] = b.dataset.v; save();
          $main.querySelectorAll(".opt").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          timers.push(setTimeout(next, 220));
        });
      });
    }
    if (s.type === "multi") {
      var btn = $main.querySelector("[data-next]");
      $main.querySelectorAll(".opt").forEach(function (b) {
        b.addEventListener("click", function () {
          var arr = S.a[s.id] || [];
          var k = arr.indexOf(b.dataset.v);
          if (k > -1) arr.splice(k, 1); else arr.push(b.dataset.v);
          S.a[s.id] = arr; save();
          b.setAttribute("aria-checked", String(k === -1));
          btn.disabled = !arr.length;
        });
      });
    }
    if (s.type === "name") {
      var inp = document.getElementById("nm"), nb = $main.querySelector("[data-next]");
      inp.addEventListener("input", function () { S.a.name = inp.value.replace(/[<>]/g, ""); save(); nb.disabled = !inp.value.trim(); });
      document.getElementById("nf").addEventListener("submit", function (e) { e.preventDefault(); if (inp.value.trim()) next(); });
      setTimeout(function () { inp.focus(); }, 50);
    }
    if (s.type === "weight" || s.type === "height" || s.type === "goal") bindStepper(s);
    if (s.type === "loading") runLoader(s);
    if (s.type === "offer") bindOffer();
  }

  function bindStepper(s) {
    var key = s.type === "weight" ? "w" : s.type === "height" ? "h" : "g";
    var out = document.getElementById("sv"), r = document.getElementById("sr");
    function val() { return key === "h" ? (S.hunit === "cm" ? S.h : Math.round(S.h / 2.54)) : S[key]; }
    function setVal(v) {
      v = Math.max(+r.min, Math.min(+r.max, v));
      if (key === "h") S.h = S.hunit === "cm" ? v : Math.round(v * 2.54); else S[key] = v;
      if (key === "w" && S.g >= S.w) S.g = S.w - Math.max(2, Math.round(S.w * 0.08));
      save(); paint();
    }
    function paint() {
      r.value = val();
      out.innerHTML = key === "h" ? heightLabel(S.h) : S[key] + "<small>" + S.unit + "</small>";
      var gp = document.getElementById("gpill");
      if (gp) { var d = S.w - S.g; gp.textContent = d > 0 ? "Tu meta: " + d + " " + S.unit + " menos" : "Elige un peso menor al actual"; }
      var nb = $main.querySelector("[data-next]"); if (key === "g" && nb) nb.disabled = S.g >= S.w;
    }
    if (key === "g" && S.g >= S.w) S.g = S.w - Math.max(2, Math.round(S.w * 0.08));
    $main.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { setVal(val() + Number(b.dataset.step)); }); });
    r.addEventListener("input", function () { setVal(Number(r.value)); });
    $main.querySelectorAll("[data-unit]").forEach(function (b) {
      b.addEventListener("click", function () {
        var u = b.dataset.unit;
        if (key === "h") { S.hunit = u; }
        else if (u !== S.unit) {
          var f = u === "lb" ? 2.2046 : 1 / 2.2046;
          S.w = Math.round(S.w * f); S.g = Math.round(S.g * f); S.unit = u;
        }
        save(); render();
      });
    });
    paint();
  }

  function runLoader(s) {
    var p = 0, dur = s.kind === "plan" ? 10000 : 7600, step = 80;
    var lp = document.getElementById("lp"), milk = document.getElementById("bigmilk");
    var lis = $main.querySelectorAll(".checks li"), tk = document.getElementById("tk"), ri = 0;
    function showReview() {
      var r = REVIEWS[ri++ % REVIEWS.length];
      tk.innerHTML = '<div class="review"><span class="stars" aria-hidden="true">★★★★★</span><p>“' + r[1] + '”</p><small>' + r[0] + "</small></div>";
    }
    showReview();
    var rv = setInterval(showReview, 2600); timers.push(rv);
    var iv = setInterval(function () {
      p = Math.min(100, p + (100 * step) / dur);
      lp.textContent = Math.round(p) + "%";
      milk.setAttribute("y", String(52 - 52 * (p / 100)));
      lis.forEach(function (li, k) { if (p >= (k + 1) * 24) li.classList.add("done"); });
      if (p >= 100) { clearInterval(iv); timers.push(setTimeout(next, 600)); }
    }, step);
    timers.push(iv);
  }

  function bindOffer() {
    var end = Number(sessionStorage.getItem("sac_end") || 0);
    if (!end || end < Date.now()) { end = Date.now() + C.TIMER_MINUTES * 60000; try { sessionStorage.setItem("sac_end", String(end)); } catch (e) {} }
    var tm = document.getElementById("tm");
    function tick() {
      var ms = Math.max(0, end - Date.now()), m = Math.floor(ms / 60000), sec = Math.floor((ms % 60000) / 1000);
      tm.textContent = m + ":" + (sec < 10 ? "0" : "") + sec;
    }
    tick(); timers.push(setInterval(tick, 1000));
    $main.querySelectorAll("[data-checkout]").forEach(function (a) {
      a.href = withQs(C.CHECKOUT_URL);
      a.addEventListener("click", function () {
        track("InitiateCheckout", { content_name: "Plan Saciante 21", value: C.PRICE, currency: C.CURRENCY, num_items: 1 });
      });
    });
  }

  /* ---------- Arranque ---------- */
  try { history.replaceState({ i: S.i }, "", location.pathname + location.search); } catch (e) {}
  if (/[?&]reset=1/.test(location.search)) { S = { i: 0, a: {}, unit: "kg", hunit: "cm", w: 78, h: 160, g: 70 }; save(); }
  if (SCREENS[S.i] && SCREENS[S.i].type === "loading") S.i = Math.max(0, S.i - 1);
  render();
})();
