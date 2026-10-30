/* Configuración del funnel. Lo único que hay que tocar para lanzar. */
window.SACIANTE_CONFIG = {
  // Meta Pixel: vacío = no se carga ningún píxel (los eventos solo se registran en consola).
  META_PIXEL_ID: "",

  // Checkout principal (USD 9). Si KashPay está listo, poner aquí su URL (pay.sheridanmktmng.com/...).
  // Respaldo: plan oculto de Whop (Sheridan) creado el 31-oct.
  CHECKOUT_URL: "https://whop.com/checkout/plan_kGCkazBxpnOUv",

  // Upsell y downsell (los usan upsell.html y downsell.html si KashPay no los aloja).
  UPSELL_URL: "https://whop.com/checkout/plan_6HqdieE1PDaZd",   // Plan Saciante 90 · USD 27
  DOWNSELL_URL: "https://whop.com/checkout/plan_O8cTfalg3IxBR", // Plan Saciante 90 solo menús · USD 13

  PRICE: 9,
  PRICE_AFTER: 17,
  ANCHOR: 147,
  CURRENCY: "USD",

  // Minutos del contador de "plan reservado" en la página de oferta.
  TIMER_MINUTES: 10,

  // Los testimonios son ilustrativos hasta tener reseñas reales de beta testers.
  SHOW_TESTIMONIAL_NOTE: true
};
