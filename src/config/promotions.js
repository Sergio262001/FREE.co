export const PROMO_CONFIG = {
  // Activa o desactiva la alerta visual de bienvenida (true = encendido, false = apagado)
  showWelcomeModal: true,
  
  // Activa o desactiva la posibilidad de ingresar cupones en el checkout
  couponsEnabled: true,
  
  // Lista de cupones activos (Código: Porcentaje en decimal)
  // Ejemplo: 0.20 es un 20% de descuento. 0.10 es un 10%.
  activeCoupons: {
    "OVERS10": 0.10,
    "BIENVENIDO20": 0.20
  }
};
