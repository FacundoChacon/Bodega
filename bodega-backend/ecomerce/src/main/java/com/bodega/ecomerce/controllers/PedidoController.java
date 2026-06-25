package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.dto.CarritoDTO;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.exceptions.MPApiException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @PostMapping("/checkout-real")
    public ResponseEntity<?> crearPreferenciaPago(@RequestBody CarritoDTO carritoDTO) {
        try {
            // 1. Seteamos tu token de prueba
            MercadoPagoConfig.setAccessToken("APP_USR-7683994118381277-062502-5f339fca243afdc21e8b4ce74f0840c1-3497353752");

            // 2. Armamos la lista de ítems con las clases del SDK actualizado
            List<PreferenceItemRequest> itemsMp = new ArrayList<>();
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title("Reserva de Vinos - Bodega Ecommerce")
                    .quantity(1)
                    .unitPrice(new BigDecimal("1.00")) // $1.00 peso
                    .currencyId("ARS")
                    .build();
            itemsMp.add(item);

            // 3. Definimos las Back URLs usando el objeto oficial del SDK
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("https://localhost:5173/pago-exitoso") // RUTAS DE PRUEBA
                    .failure("https://www.google.com")
                    .pending("https://www.google.com")
                    .build();

            // 4. Creamos la preferencia uniendo todo
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(itemsMp)
                    .backUrls(backUrls)
                    // .autoReturn("approved") // Retorno automático al aprobarse
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            // 5. Si todo sale bien, devolvemos el initPoint para React
            return ResponseEntity.ok().body(Map.of("initPoint", preference.getInitPoint()));

        } catch (MPApiException e) {
            // 🔥 El truco: Extraemos el error crudo que el SDK le oculta a los logs normales
            String errorDetalle = e.getApiResponse().getContent();
            System.out.println("❌ ERROR DETALLADO DEL SDK DE MP: " + errorDetalle);
            return ResponseEntity.badRequest().body("Error de MP: " + errorDetalle);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error genérico: " + e.getMessage());
        }
    }
}