/* Configuración del funnel. Lo único que hay que tocar para lanzar. */
window.SACIANTE_CONFIG = {
  // Marca V2 (OFERTA-V2.md, 1-nov): "El Vaso Blanco". Se usa en todo el quiz y la oferta.
  BRAND: "El Vaso Blanco",
  PRODUCT: "El Vaso Blanco · Plan de 21 días",   // nombre del producto principal (igual que en KashPay)
  PRODUCT_90: "Plan 90 Días del Vaso Blanco",     // upsell

  // Meta Pixel: vacío = no se carga ningún píxel (los eventos solo se registran en consola).
  META_PIXEL_ID: "",

  // Checkout principal (USD 9) en KashPay, con 2 order bumps (Semana de Arranque + acceso prioritario $5 · Menú Express $4) y el embudo upsell 47 → downsell 23.
  CHECKOUT_URL: "https://pay.sheridanmktmng.com/checkout/checkout-1793403586919",
  // Respaldo sin bumps (Whop directo): https://whop.com/checkout/plan_kGCkazBxpnOUv

  // Upsell y downsell one-click de KashPay (tokens del embudo "Funnel Plan Saciante 21").
  KP_UPSELL: "https://pay.sheridanmktmng.com/u/c56586b6945a3101",
  KP_DOWNSELL: "https://pay.sheridanmktmng.com/u/2a9d24d988082957",
  // Respaldo Whop (cobro aparte, pide la tarjeta otra vez):
  UPSELL_URL: "https://whop.com/checkout/plan_6HqdieE1PDaZd",   // Plan 90 Días · USD 47
  DOWNSELL_URL: "https://whop.com/checkout/plan_O8cTfalg3IxBR", // Plan 90 Días solo menús · USD 23

  // Escalera de upsells V2 (Franco, llamada 27-oct: 5×/4×/3× con downsell al 50 %). PREPARADA, SIN ACTIVAR:
  // Franco la monta "a partir del tercer día" de test. Para activarla hace falta crear el contenido y los pasos 2 y 3
  // del embudo en KashPay (ver OFERTA-V2.md 3.8 y QA-BLUEPRINT.md 7). Mientras LADDER_ON sea false, el flujo es U1 → D1 → gracias.
  LADDER_ON: false,
  LADDER: [
    { key: "upsell_familiar", title: "Recetario Familiar", price: 37, downsell: 19 },
    { key: "upsell_fiestas", title: "Plan Fiestas sin Culpa", price: 27, downsell: 13 }
  ],

  // Medición por etapa (Franco: aterrizaje → inicio del quiz → oferta → clic → checkout). Se guarda en Supabase vía la app.
  // Lectura: GET https://app-production-e884.up.railway.app/api/admin/funnel?days=3 con la cabecera x-admin-key. Vacío = no se mide.
  TRACK_URL: "https://app-production-e884.up.railway.app/api/t",

  // App del producto (Railway). gracias.html manda aquí a la clienta con sus respuestas del quiz.
  APP_URL: "https://app-production-e884.up.railway.app",

  PRICE: 9,
  PRICE_AFTER: 17,
  ANCHOR: 197,
  PRICE_MXN_NOTE: "menos de 200 pesos", // Franco L 4.2: moneda visible; la mexicana piensa en pesos
  CURRENCY: "USD",

  // Minutos del contador de "plan reservado" en la página de oferta.
  TIMER_MINUTES: 10,

  // Los testimonios son ilustrativos hasta tener reseñas reales de beta testers.
  SHOW_TESTIMONIAL_NOTE: true,

  // Testimonios hechos con IA (Franco L 4.4: "Yo tengo dos videos. En cada embudo"; llamada 02-oct: "un slide de cuatro testimonios").
  // Foto: img/testi/. Vídeos: video/ (mp4 vertical + poster jpg). Vacío = no se muestra.
  REVIEWS: [
    { name: "Lupita", age: 52, city: "Guadalajara, Jal.", photo: "img/testi/r1.jpg", text: "Ya no ando picando pan toda la tarde. Mi vaso blanco de la mañana me deja tranquila hasta la comida." },
    { name: "Maribel", age: 55, city: "Houston, TX", photo: "img/testi/r2.jpg", text: "La primera semana noté la panza menos inflamada. Lo hago con lo que ya tengo en casa." },
    { name: "Claudia", age: 53, city: "CDMX", photo: "img/testi/r3.jpg", text: "Lo que más me gustó es que no paso hambre. Mis pantalones de antes ya me quedan holgados." },
    { name: "Rosa", age: 58, city: "Los Ángeles, CA", photo: "img/testi/r4.jpg", text: "Ya no ando inflada en la tarde. Mis hijas ya me pidieron la receta del vaso blanco." }
  ],
  VIDEOS: [
    { name: "Rocío", city: "Monterrey, N.L.", src: "video/testimonio-1.mp4", poster: "video/testimonio-1.jpg" },
    { name: "Marisela", city: "Houston, TX", src: "video/testimonio-2.mp4", poster: "video/testimonio-2.jpg" }
  ]
};
