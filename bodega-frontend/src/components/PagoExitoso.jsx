import { useEffect, useState } from "react";
import axios from "axios";

export default function PagoExitoso() {
  const [procesando, setProcesando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("--- DETECTIVE DE STOCK INICIADO ---");

    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");

    if (status === "approved") {
      const carritoGuardado = localStorage.getItem("carrito");

      if (carritoGuardado) {
        const itemsCarrito = JSON.parse(carritoGuardado);

        if (itemsCarrito.length === 0) {
          setError("El carrito llegó vacío.");
          setProcesando(false);
          return;
        }

        const peticionesDescuento = itemsCarrito.map((item) => {
          const url = `http://localhost:8080/api/vinos/${item.id}/descontar-stock?cantidad=${item.cantidad}`;
          return axios.put(url);
        });

        Promise.all(peticionesDescuento)
          .then((respuestas) => {
            console.log("✅ ¡ÉXITO! Stock descontado en Spring Boot.");
            localStorage.removeItem("carrito"); // Limpiamos el carrito
            setProcesando(false);

            // REDIRECCIÓN AUTOMÁTICA EN 3 SEGUNDOS (3000 milisegundos)
            setTimeout(() => {
              window.location.href = "/"; // MANDA A LA CAVA PRINCIPAL
            }, 3000); // TIEMPO DE ESPERA ANTES DE REDIRECCIONAR
          })
          .catch((err) => {
            console.error("❌ ERROR EN SPRING BOOT:", err.response?.data || err.message);
            setError(`Error de servidor: ${err.response?.data || err.message}`);
            setProcesando(false);
          });
      } else {
        setError("No pudimos encontrar los productos de tu compra.");
        setProcesando(false);
      }
    } else {
      setError("El pago no figura como aprobado.");
      setProcesando(false);
    }
  }, []);

  if (procesando) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
        <h2>Procesando tu pedido... 🍷</h2>
        <p>Estamos confirmando tu pago y actualizando el stock.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red", fontFamily: "sans-serif" }}>
        <h2>⚠️ Alerta en el proceso</h2>
        <p>{error}</p>
        <a href="/" style={{ color: "blue" }}>Volver a la tienda</a>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "green" }}>¡Muchas gracias por tu compra! 🎉</h1>
      <p style={{ fontSize: "18px" }}>Tu pago fue procesado y la cava se actualizó correctamente.</p>
      
      {/* Mensaje estético avisando que se va solo */}
      <p style={{ color: "gray", fontStyle: "italic", marginTop: "20px" }}>
        Redirigiéndote a la Cava principal en 3 segundos... 🕒
      </p>
    </div>
  );
}