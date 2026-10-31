/* Configuración del funnel. Lo único que hay que tocar para lanzar. */
window.SACIANTE_CONFIG = {
  // Meta Pixel: vacío = no se carga ningún píxel (los eventos solo se registran en consola).
  META_PIXEL_ID: "",

  // Checkout principal (USD 9) en KashPay, con los 3 order bumps y el embudo upsell → downsell.
  CHECKOUT_URL: "https://pay.sheridanmktmng.com/checkout/checkout-1793403586919",
  // Respaldo sin bumps (Whop directo): https://whop.com/checkout/plan_kGCkazBxpnOUv

  // Upsell y downsell one-click de KashPay (tokens del embudo "Funnel Plan Saciante 21").
  KP_UPSELL: "https://pay.sheridanmktmng.com/u/c56586b6945a3101",
  KP_DOWNSELL: "https://pay.sheridanmktmng.com/u/2a9d24d988082957",
  // Respaldo Whop (cobro aparte, pide la tarjeta otra vez):
  UPSELL_URL: "https://whop.com/checkout/plan_6HqdieE1PDaZd",   // Plan Saciante 90 · USD 27
  DOWNSELL_URL: "https://whop.com/checkout/plan_O8cTfalg3IxBR", // Plan Saciante 90 solo menús · USD 13

  // App del producto (Railway). gracias.html manda aquí a la clienta con sus respuestas del quiz.
  APP_URL: "https://app-production-e884.up.railway.app",

  PRICE: 9,
  PRICE_AFTER: 17,
  ANCHOR: 147,
  CURRENCY: "USD",

  // Minutos del contador de "plan reservado" en la página de oferta.
  TIMER_MINUTES: 10,

  // Los testimonios son ilustrativos hasta tener reseñas reales de beta testers.
  SHOW_TESTIMONIAL_NOTE: true
};
