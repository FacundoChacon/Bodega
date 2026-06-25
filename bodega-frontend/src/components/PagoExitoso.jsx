import { useEffect, useState } from "react";
import axios from "axios";

export default function PagoExitoso() {
  const [procesando, setProcesando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("--- DETECTIVE DE STOCK INICIADO ---");

    // LEE LA QUERY STRING DE LA URL PARA OBTENER EL ESTADO DEL PAGO
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");

    console.log("Estado capturado de Mercado Pago (status):", status);

    if (status === "approved") {
      const carritoGuardado = localStorage.getItem("carrito");
      console.log("Contenido del localStorage ['carrito']:", carritoGuardado);

      if (carritoGuardado) {
        const itemsCarrito = JSON.parse(carritoGuardado);
        console.log("Items recuperados:", itemsCarrito);

        if (itemsCarrito.length === 0) {
          setError("El carrito llegó vacío.");
          setProcesando(false);
          return;
        }

        // ARMA LAS PETICIONES PARA DESCONTAR EL STOCK DE CADA VINO
        const peticionesDescuento = itemsCarrito.map((item) => {
          const url = `http://localhost:8080/api/vinos/${item.id}/descontar-stock?cantidad=${item.cantidad}`;
          console.log(`Preparando petición hacia: ${url}`);
          return axios.put(url);
        });

        Promise.all(peticionesDescuento)
          .then((respuestas) => {
            console.log("✅ ¡ÉXITO! Stock descontado en Spring Boot:", respuestas);
            localStorage.removeItem("carrito"); // Limpiamos el carrito del navegador
            setProcesando(false);
          })
          .catch((err) => {
            console.error("❌ ERROR EN SPRING BOOT:", err.response?.data || err.message);
            setError(`Error de servidor: ${err.response?.data || err.message}`);
            setProcesando(false);
          });
      } else {
        console.error("❌ No se encontró 'carrito' en localStorage.");
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
    <div style={{ textAlign: "center", marginTop: "100px", color: "green", fontFamily: "sans-serif" }}>
      <h1>¡Muchas gracias por tu compra! 🎉</h1>
      <p>Tu pago fue procesado y el stock de la cava se actualizó correctamente.</p>
      <a 
        href="/" 
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#722F37",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px"
        }}
      >
        Volver a la Cava
      </a>
    </div>
  );
}