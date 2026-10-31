/* Configuración del funnel. Lo único que hay que tocar para lanzar. */
window.SACIANTE_CONFIG = {
  // Marca (provisional, la decide Paoloni). Se usa en todo el quiz y la oferta; las páginas .html la toman de aquí (brand.js).
  BRAND: "Plan Saciante",
  PRODUCT: "Plan Saciante 21",   // nombre del producto principal
  PRODUCT_90: "Plan Saciante 90", // upsell

  // Meta Pixel: vacío = no se carga ningún píxel (los eventos solo se registran en consola).
  META_PIXEL_ID: "",

  // Checkout principal (USD 9) en KashPay, con 2 order bumps (Acceso prioritario y soporte VIP $4 + Menú Express $5) y el embudo upsell → downsell.
  CHECKOUT_URL: "https://pay.sheridanmktmng.com/checkout/checkout-1793403586919",
  // Respaldo sin bumps (Whop directo): https://whop.com/checkout/plan_kGCkazBxpnOUv

  // Upsell y downsell one-click de KashPay (tokens del embudo "Funnel Plan Saciante 21").
  KP_UPSELL: "https://pay.sheridanmktmng.com/u/c56586b6945a3101",
  KP_DOWNSELL: "https://pay.sheridanmktmng.com/u/2a9d24d988082957",
  // Respaldo Whop (cobro aparte, pide la tarjeta otra vez):
  UPSELL_URL: "https://whop.com/checkout/plan_6HqdieE1PDaZd",   // Plan Saciante 90 · USD 27
  DOWNSELL_URL: "https://whop.com/checkout/plan_O8cTfalg3IxBR", // Plan Saciante 90 solo menús · USD 13

  // Medición por etapa (Franco: aterrizaje → inicio del quiz → oferta → clic → checkout). Se guarda en Supabase vía la app.
  // Lectura: GET https://app-production-e884.up.railway.app/api/admin/funnel?days=3 con la cabecera x-admin-key. Vacío = no se mide.
  TRACK_URL: "https://app-production-e884.up.railway.app/api/t",

  // App del producto (Railway). gracias.html manda aquí a la clienta con sus respuestas del quiz.
  APP_URL: "https://app-production-e884.up.railway.app",

  PRICE: 9,
  PRICE_AFTER: 17,
  ANCHOR: 147,
  CURRENCY: "USD",

  // Minutos del contador de "plan reservado" en la página de oferta.
  TIMER_MINUTES: 10,

  // Los testimonios son ilustrativos hasta tener reseñas reales de beta testers.
  SHOW_TESTIMONIAL_NOTE: true,

  // Testimonios hechos con IA (Franco L 4.4: "Yo tengo dos videos. En cada embudo"; llamada 02-oct: "un slide de cuatro testimonios").
  // Foto: img/testi/. Vídeos: video/ (mp4 vertical + poster jpg). Vacío = no se muestra.
  REVIEWS: [
    { name: "Lupita", age: 52, city: "Guadalajara, Jal.", photo: "img/testi/r1.jpg", text: "Ya no me levanto a buscar pan a las 11. El licuado de canela me deja tranquila." },
    { name: "Maribel", age: 55, city: "Houston, TX", photo: "img/testi/r2.jpg", text: "La primera semana noté la panza menos inflamada. Lo hago con lo que ya tengo en casa." },
    { name: "Claudia", age: 53, city: "CDMX", photo: "img/testi/r3.jpg", text: "Lo que más me gustó es que no paso hambre. Mis pantalones de antes ya me quedan holgados." },
    { name: "Rosa", age: 58, city: "Los Ángeles, CA", photo: "img/testi/r4.jpg", text: "Duermo mejor y amanezco con más ganas. Mis hijas ya me preguntaron qué estoy haciendo." }
  ],
  VIDEOS: [
    { name: "Rocío", city: "Monterrey, N.L.", src: "video/testimonio-1.mp4", poster: "video/testimonio-1.jpg" },
    { name: "Marisela", city: "Houston, TX", src: "video/testimonio-2.mp4", poster: "video/testimonio-2.jpg" }
  ]
};
