# App-belleza-domicilio · Lashes Rose's Studio
**Proyecto de cátedra DAW901 · Universidad Don Bosco**

Sistema web de gestión y agendamiento de citas de belleza a domicilio (pestañas, cejas y uñas). Permite a las clientas reservar un servicio desde su casa y a la administradora gestionar la agenda.

🔗 **Sitio desplegado:** https://valeriadianapalacios-eng.github.io/app-belleza-domicilio/

## Integrantes
- Carlos Rodrigo Hernández Guardado · HG262490
- Diana Valeria Palacios Ruiz · PR261366
- Cristopher Enrique Santamaria Chacon · SC261741

## Problema que resuelve
Antes, las citas de Lashes Rose's Studio se coordinaban por WhatsApp, lo que generaba mensajes dispersos, riesgo de citas duplicadas y falta de un registro ordenado de la agenda. La app centraliza el proceso: la clienta elige servicio, fecha, hora disponible y ubicación de su domicilio, y la administradora gestiona todas las citas desde un solo panel.

## Funcionalidades
**Clienta**
- Identificación rápida por teléfono (con verificación de nombre).
- Catálogo de servicios y reserva de cita con fecha, hora, departamento y dirección.
- Horarios disponibles en tiempo real (evita citas duplicadas).
- Mapa interactivo para ubicar el domicilio y pronóstico del clima para la fecha.
- Consulta y cancelación de sus citas.

**Administradora**
- Panel con estadísticas y gráficas (Chart.js).
- Agenda general: confirmar, completar y eliminar citas.
- Exportación de reporte de citas a CSV (Excel).
- Gestión de datos guardados de clientas (privacidad).

## Tecnologías
HTML5 · CSS3 · JavaScript · React 18 · Bootstrap 5 · Chart.js · SweetAlert2 · Leaflet

**APIs externas:** Open-Meteo (clima), Nominatim y Photon (direcciones), OpenStreetMap (mapa).

## Seguridad básica
- Validación de entradas en formularios.
- Sesiones simuladas con `localStorage`.
- Escape de HTML contra XSS.
- La clave de administración se valida contra un hash SHA-256 y no está escrita en el código.

## Mockups (Figma)
- Los mockups desarrollados en Figma durante la Etapa 1 funcionaron como referencia -- visual para el diseño e implementación de Lashes Rose´s Studio.
- Estos diseños representan el prototipo e idea inicial de la interfaz y permiten
- comparar la planificación visual realizada al inicio del proyecto con la -- aplicación web desarrollada
- https://www.figma.com/design/iZ9FJuNf2iMVBhFF4Q7HlO/UDB-Aplicaciones?node-id=0-1&t=Y8357SrGrf8PxZcB-1 -- Enlace a Figma



## Cómo ejecutarlo
1. Clonar el repositorio.
2. Abrir la carpeta en VS Code e iniciar con **Live Server**.
3. Acceso de administradora: solicitar la clave al equipo.

## Estructura
```
├── index.html
├── css/style.css
├── js/main.js
├── img/
├── fonts/
└── mockups/
```

## Licencia
Este trabajo está bajo una licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0).

Permite compartir y adaptar el contenido siempre que se otorgue el crédito a sus autores y no se use con fines comerciales.

[Consultar la licencia completa](LICENSE)
