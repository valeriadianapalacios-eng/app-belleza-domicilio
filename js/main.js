const listaServicios = [
    { id: 1, categoria: "Pestañas", nombre: "Extensiones Clásicas", precio: 25.00, descripcion: "Aplicación pelo a pelo para una mirada natural y delicada.", imagen: "img/extensionesclasicas.jpg" },
    { id: 2, categoria: "Pestañas", nombre: "Extensiones Volumen", precio: 40.00, descripcion: "Abundancia y mayor densidad para un efecto glamuroso e impactante.", imagen: "img/extensionesvolumen.jpg" },
    { id: 3, categoria: "Cejas", nombre: "Laminado de Cejas", precio: 15.00, descripcion: "Diseño, peinado y fijación semipermanente para cejas perfiladas.", imagen: "img/laminadodecejas.jpg" },
    { id: 4, categoria: "Cejas", nombre: "Depilación de Cejas", precio: 5.00, descripcion: "Limpieza y perfilado de cejas según la forma de tu rostro.", imagen: "img/depilaciondecejas.jpg" },
    { id: 5, categoria: "Uñas", nombre: "Uñas Acrílicas Naturales", precio: 15.00, descripcion: "Estructura acrílica con acabado limpio, natural y elegante.", imagen: "img/natuales.jpg" },
    { id: 6, categoria: "Uñas", nombre: "Manicure", precio: 10.00, descripcion: "Cuidado completo de uñas y cutículas con hidratación.", imagen: "img/manicure.jpg" },
    { id: 7, categoria: "Uñas", nombre: "Pedicure", precio: 12.00, descripcion: "Tratamiento y estética para pies impecables y descansados.", imagen: "img/pedicure.jpg" },
    { id: 8, categoria: "Uñas", nombre: "Esmaltado Permanente", precio: 10.00, descripcion: "Color duradero en uña natural con secado en lámpara UV/LED.", imagen: "img/esmaltado.jpg" }

];

function iniciarAplicacion() {
    inicializarSesion();
    renderizarPaginaPrincipal();
    configurarEventos();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
    iniciarAplicacion();
}

function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario_activo"));
}

function inicializarSesion() {
    const usr = obtenerUsuario();
    const lbl = document.getElementById("usuario-sesion");
    const btnL = document.getElementById("btn-login-modal");
    const btnO = document.getElementById("btn-logout");

    if (usr) {
        lbl.textContent = usr.rol === 'admin' ? " Modo Administradora" : `Hola, ${usr.nombre}`;
        btnL.classList.add("d-none");
        btnO.classList.remove("d-none");
    } else {
        lbl.textContent = "Invitado";
        btnL.classList.remove("d-none");
        btnO.classList.add("d-none");
    }
}

function renderizarPaginaPrincipal() {
    const app = document.getElementById("app-content");
    if (!app) return;

    const usr = obtenerUsuario();
    const esAdmin = usr && usr.rol === "admin";

    let html = "";

    if (esAdmin) {
        html += `
            <div class="p-4 mb-4 bg-white rounded-4 shadow-sm border d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold text-rose-dark mb-1">Panel de Control - Lashes Rose's Studio</h2>
                    <p class="text-muted mb-0 small">Bienvenida, Administradora. Gestiona la agenda de citas y los datos de las clientas.</p>
                </div>
                <button onclick="cerrarSesionCliente()" class="btn btn-outline-danger btn-sm rounded-pill">Cerrar Sesión</button>
            </div>
        `;
            html += renderizarEstadisticas();
            html += renderizarTablaCitas("Agenda General de Citas", true);
            html += renderizarTablaClientesAdmin(); // Sección nueva para gestionar datos de clientas guardadas

            app.innerHTML = html;
            inicializarGraficasEstadisticas();
            return;
            }

    html += `
       <section class="hero-principal">
             <video class="hero-video" autoplay muted loop playsinline> <source src="img/SDB.mp4" type="video/mp4">   </video>

             <div class="hero-overlay"></div>

            <div class="hero-contenido text-center">

            <img src="img/LOGOSALON.png" alt="Logo Lashes Rose's Studio" class="hero-logo">

            <h1 class="hero-titulo">Lashes Rose's Studio</h1>

            <p class="hero-texto">
                    Servicios profesionales de belleza a domicilio. 
                    Nos acoplamos a tus necesidades y estilo de vida
                    ahorrándote tíempo y brindándote una experiencia cómoda y personalizada directamente en tu hogar.
            </p>
            </div>
        </section>
    `;

    html += '<div id="react-servicios-root"></div>';
    
    /*cambios hechos*/
   if (!usr) {
    html += `
      <section id="como-agendar" class="seccion-agendar">

    <div class="agendar-encabezado">
        <span class="agendar-linea"></span>

        <h2 class="agendar-titulo">
            ¿Cómo Agendar Tu Cita a Domicilio?
        </h2>

        <span class="agendar-linea"></span>
    </div>

    <div class="agendar-box">

        <p class="agendar-subtitulo">
            Es muy fácil, solo sigue estos 3 pasos
        </p>

                <div class="agendar-pasos">

                    <div class="agendar-paso">
                        <div class="agendar-numero">1</div>

                        <h3>Elige tu Servicio</h3>

                        <p>
                            Haz clic en Reservar en el servicio que prefieras.
                        </p>
                    </div>


                    <div class="agendar-paso">
                        <div class="agendar-numero">2</div>

                        <h3>Identifícate</h3>

                        <p>
                            Ingresa tu número de teléfono celular.
                        </p>
                    </div>


                    <div class="agendar-paso">
                        <div class="agendar-numero">3</div>

                        <h3>¡Listo para Agendar!</h3>

                        <p>
                            Selecciona la fecha, hora disponible y dirección exacta en casa.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    `;
} 
    else if (usr && usr.rol === "cliente") {
        html += renderizarFormularioReserva(usr);
        html += renderizarTablaCitas("Mis Citas Agendadas", false, usr.telefono);
    }

    app.innerHTML = html;
    montarServiciosReact();
    inicializarMapaReserva();

    const servPendiente = sessionStorage.getItem("servicio_seleccionado");

    if (servPendiente && document.getElementById("reserva-servicio")) {

    document.getElementById("reserva-servicio").value = servPendiente;
    sessionStorage.removeItem("servicio_seleccionado");

    setTimeout(() => {
        document.getElementById("reservas")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}
}
function intentarReservar(nombreServicio) {
    sessionStorage.setItem("servicio_seleccionado", nombreServicio);
    const usr = obtenerUsuario();
    if (!usr) {
        new bootstrap.Modal(document.getElementById('loginModal')).show();
    
} else if (usr.rol === 'admin') {
    Swal.fire({
        title: "Modo administradora",
        text: "Las reservas se realizan desde cuentas de cliente.",
        icon: "info",
        confirmButtonColor: "#d63384"
    });
} else {
    renderizarPaginaPrincipal();
}
}


function renderizarFormularioReserva(usr) {
    let opts = listaServicios.map(s => `<option value="${s.nombre}">${s.nombre} - $${s.precio.toFixed(2)}</option>`).join("");
    return `
        <section id="reservas" class="my-5 p-4 bg-white rounded-4 shadow-sm border">
            <h3 class="fw-bold text-rose-dark mb-3 text-center">Personaliza Tu Cita</h3>
            <p class="text-center text-muted small mb-4">Hola, <strong>${usr.nombre}</strong>. Teléfono: <em>${usr.telefono}</em>. Completa los detalles para tu domicilio.</p>
            <form id="form-reserva" class="row g-3">
                <div class="col-md-6"><label class="form-label fw-semibold">Nombre del Cliente</label><input type="text" id="reserva-nombre" class="form-control" required value="${usr.nombre}" readonly></div>
                <div class="col-md-6"><label class="form-label fw-semibold">Número Telefónico</label><input type="tel" id="reserva-telefono" class="form-control" required value="${usr.telefono}" readonly></div>
                <div class="col-md-6"><label class="form-label fw-semibold">Tipo de Servicio</label><select id="reserva-servicio" class="form-select" required><option value="">-- Selecciona un servicio --</option>${opts}</select></div>
                <input type="date" id="reserva-fecha" class="form-control" required min="${new Date().toLocaleDateString('en-CA')}" onchange="actualizarHorariosDisponibles(); consultarClimaReserva();">
                <div class="col-md-3"><label class="form-label fw-semibold">Horario (7 AM - 5 PM)</label><select id="reserva-hora" class="form-select" required><option value="">-- Selecciona fecha primero --</option></select></div>
                <div class="col-md-6">
                <label class="form-label fw-semibold">Departamento</label>
                <select id="reserva-departamento" class="form-select" required>
                <option value="">-- Selecciona un departamento --</option>
                <option value="Ahuachapán">Ahuachapán</option>
                <option value="Cabañas">Cabañas</option>
                <option value="Chalatenango">Chalatenango</option>
                <option value="Cuscatlán">Cuscatlán</option>
                <option value="La Libertad">La Libertad</option>
                <option value="La Paz">La Paz</option>
                <option value="La Unión">La Unión</option>
                <option value="Morazán">Morazán</option>
                <option value="San Miguel">San Miguel</option>
                <option value="San Salvador">San Salvador</option>
                <option value="San Vicente">San Vicente</option>
                <option value="Santa Ana">Santa Ana</option>
                <option value="Sonsonate">Sonsonate</option>
                <option value="Usulután">Usulután</option>
                </select>
                </div>   
                
                <div class="col-12"><div id="clima-reserva" class="d-none"></div></div>
                <div class="col-12">
                <label class="form-label fw-semibold">Dirección exacta del domicilio</label>
                <div class="input-group mb-2">
                <input type="text" id="reserva-direccion" class="form-control" placeholder="Escribe tu dirección exacta">
                <button type="button" class="btn btn-outline-secondary" onclick="buscarDireccionEnMapa()">Buscar en mapa</button>
                </div>
                <div id="mapa-reserva" style="height: 350px; width: 100%; border-radius: 12px;"></div>
                              
                <input type="hidden" id="reserva-latitud">
                <input type="hidden" id="reserva-longitud">
                <input type="hidden" id="reserva-place-id">
                <input type="hidden" id="reserva-maps-url">
                <small class="text-muted">
                Haz clic en el mapa para marcar la ubicación exacta de tu domicilio.    
                </small>
</div>                <div class="col-12"><div class="form-check p-3 bg-light rounded-3 border"><input class="form-check-input mt-1" type="checkbox" id="check-autorizacion" checked><label class="form-check-label small text-muted" for="check-autorizacion"><strong>Autorización de datos:</strong> ¿Guardar datos para agilizar tu próxima cita?</label></div></div>
                <div class="col-12 d-flex justify-content-between align-items-center"><button type="button" onclick="cerrarSesionCliente()" class="btn btn-outline-secondary btn-sm rounded-pill">Cambiar de número</button><button type="submit" class="btn btn-rose-lg rounded-pill px-4">Confirmar y Agendar Cita</button></div>
            </form>
            <div id="reserva-mensaje" class="mt-3"></div>
        </section>
    `;
}

let mapaReserva = null;
let marcadorReserva = null;

function inicializarMapaReserva() {

    const contenedor = document.getElementById("mapa-reserva");

    if (!contenedor || typeof L === "undefined") return;

    if (mapaReserva) {
        mapaReserva.remove();
        mapaReserva = null;
        marcadorReserva = null;
    }

    mapaReserva = L.map("mapa-reserva").setView(
        [13.7942, -88.8965],
        8
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapaReserva);

    mapaReserva.on("click", async function (e) {
    const latitud = e.latlng.lat;
    const longitud = e.latlng.lng;

    if (marcadorReserva) {
        marcadorReserva.setLatLng([latitud, longitud]);
    } else {
        marcadorReserva = L.marker([latitud, longitud]).addTo(mapaReserva);
    }

    document.getElementById("reserva-latitud").value = latitud;
    document.getElementById("reserva-longitud").value = longitud;

        try {
    const respuesta = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitud}&lon=${longitud}&accept-language=es`
    );

    const datos = await respuesta.json();

    const direccion = datos.display_name || `${latitud}, ${longitud}`;

    document.getElementById("reserva-direccion").value = direccion;

    marcadorReserva
        .bindPopup(`<strong>Ubicación seleccionada</strong><br>${direccion}`)
        .openPopup();

       } catch (error) {
        console.error("No se pudo obtener la dirección:", error);

        document.getElementById("reserva-direccion").value =
            `${latitud}, ${longitud}`;
    }

    consultarClimaReserva();
});
}
async function buscarDireccionEnMapa() {
    const direccion = document.getElementById("reserva-direccion").value.trim();
    const departamento = document.getElementById("reserva-departamento").value;

    if (!direccion) return;

    const busqueda = departamento ? `${direccion}, ${departamento}, El Salvador` : `${direccion}, El Salvador`;

    try {
        const respuesta = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(busqueda)}&limit=1&countrycode=SV`);

        if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
}

        const datos = await respuesta.json();

        if (!datos.features || datos.features.length === 0) {
        Swal.fire({
        title: "Dirección no encontrada",
        text: "No pudimos ubicarla en el mapa. Puedes guardar la dirección escrita de todas formas.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Guardar igual",
        cancelButtonText: "Intentar otra dirección",
        confirmButtonColor: "#d63384"
                }).then((resultado) => {
        if (resultado.isConfirmed) {
            document.getElementById("reserva-latitud").value = "";
            document.getElementById("reserva-longitud").value = "";
        }
    });

    return;
}
        const [longitud, latitud] = datos.features[0].geometry.coordinates;

        document.getElementById("reserva-latitud").value = latitud;
        document.getElementById("reserva-longitud").value = longitud;

        mapaReserva.setView([latitud, longitud], 17);

        if (marcadorReserva) {
            marcadorReserva.setLatLng([latitud, longitud]);
        } else {
            marcadorReserva = L.marker([latitud, longitud]).addTo(mapaReserva);
        }

        marcadorReserva.bindPopup(`<strong>Ubicación encontrada</strong><br>${direccion}`).openPopup();

        consultarClimaReserva();

    } catch (error) {
    console.error(error);

    Swal.fire({
        title: "No se pudo buscar la dirección",
        text: "Puedes guardar la dirección escrita de todas formas.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Guardar igual",
        cancelButtonText: "Intentar otra dirección",
        confirmButtonColor: "#d63384"
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            document.getElementById("reserva-latitud").value = "";
            document.getElementById("reserva-longitud").value = "";
        }
    });
}
}

function actualizarHorariosDisponibles() {
    const f = document.getElementById("reserva-fecha").value;
    const sH = document.getElementById("reserva-hora");
    if (!sH) return;
    if (!f) { sH.innerHTML = `<option value="">-- Selecciona fecha primero --</option>`; return; }

    const todas = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
    const guardadas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    const ocupadas = guardadas.filter(c => c.fecha === f).map(c => c.hora);
    const libres = todas.filter(h => !ocupadas.includes(h));

    if (libres.length === 0) { sH.innerHTML = `<option value="">No hay horarios disponibles este día</option>`; return; }
    sH.innerHTML = `<option value="">-- Selecciona una hora --</option>` + libres.map(h => `<option value="${h}">${h} hrs</option>`).join("");
}
function obtenerDescripcionClima(codigo) {
    const codigos = { 0: "Despejado", 1: "Mayormente despejado", 2: "Parcialmente nublado", 3: "Nublado", 45: "Neblina", 48: "Neblina", 51: "Llovizna ligera", 53: "Llovizna moderada", 55: "Llovizna intensa", 61: "Lluvia ligera", 63: "Lluvia moderada", 65: "Lluvia intensa", 80: "Chubascos ligeros", 81: "Chubascos moderados", 82: "Chubascos fuertes", 95: "Tormenta eléctrica", 96: "Tormenta con granizo", 99: "Tormenta fuerte con granizo" };

    return codigos[codigo] || "Condición variable";
}
        let climaReservaActual = null;
        async function consultarClimaReserva() {

        const latitud = document.getElementById("reserva-latitud")?.value;
        const longitud = document.getElementById("reserva-longitud")?.value;
        const direccion = document.getElementById("reserva-direccion")?.value;
        const fecha = document.getElementById("reserva-fecha")?.value;
        const contenedor = document.getElementById("clima-reserva");

        climaReservaActual = null;

        if (!latitud || !longitud || !fecha || !contenedor) return;

        contenedor.className = "alert alert-info";
        contenedor.innerHTML = "Consultando clima...";

    try {
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitud)}&longitude=${encodeURIComponent(longitud)}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=16`;
        const respuestaClima = await fetch(urlClima);

        if (!respuestaClima.ok) {
            throw new Error("Error al consultar clima");
        }

        const datosClima = await respuestaClima.json();

        const indice = datosClima.daily.time.indexOf(fecha);

        if (indice === -1) {
            contenedor.className = "alert alert-warning";
            contenedor.innerHTML = "El pronóstico todavía no está disponible para esta fecha.";
            return;
        }

        const codigo = datosClima.daily.weather_code[indice];
        const temperaturaMax = datosClima.daily.temperature_2m_max[indice];
        const temperaturaMin = datosClima.daily.temperature_2m_min[indice];
        const lluvia = datosClima.daily.precipitation_probability_max[indice];

        const descripcion = obtenerDescripcionClima(codigo);
        
        climaReservaActual = {descripcion, temperaturaMax, temperaturaMin, lluvia,ubicacion: direccion || "Ubicación seleccionada"
};
        contenedor.className = "alert alert-light border";

contenedor.innerHTML = `<strong>Clima previsto para la ubicación seleccionada</strong><br>${descripcion}<br>Temperatura: ${temperaturaMin} °C - ${temperaturaMax} °C<br>Probabilidad de lluvia: ${lluvia ?? 0}%`;
    } catch (error) {

        console.error(error);

        contenedor.className = "alert alert-danger";
        contenedor.innerHTML = "No fue posible consultar el clima en este momento.";
    }
}

function renderizarTablaCitas(titulo, esAdmin, filtroTel = null) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    if (filtroTel) citas = citas.filter(c => c.telefono === filtroTel);

    let html = `<section class="my-5 p-4 bg-white rounded-4 shadow-sm border"><div class="d-flex justify-content-between align-items-center mb-4"><h3 class="fw-bold text-rose-dark mb-0">${titulo}</h3>`;
    if (esAdmin) html += `<div><button onclick="exportarExcel()" class="btn btn-outline-success btn-sm rounded-pill me-2">📊 Descargar Excel</button><span class="badge bg-rose-dark text-white p-2">Admin</span></div>`;
    html += `</div>`;

    if (citas.length === 0) {
        html += `<p class="text-center text-muted">No hay citas registradas.</p>`;
    } else {
        html += `<div class="table-responsive"><table class="table table-hover align-middle"><thead class="bg-rose-pastel"><tr>`;
        if (esAdmin) html += `<th>Cliente</th>`;
        html += `<th>Servicio</th><th>Fecha y Hora</th><th>Departamento</th><th>Dirección</th><th>Clima</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>`;
        citas.forEach(c => {
            const badge = c.estado === 'Confirmada' ? 'bg-success' : (c.estado === 'Completada' ? 'bg-info text-dark' : 'bg-warning text-dark');
            html += `<tr>`;
            if (esAdmin) html += `<td class="fw-bold">${c.nombre}<br><small class="text-muted">${c.telefono}</small></td>`;
            html += `<td>${c.servicio}</td><td>${c.fecha} - ${c.hora} hrs</td><td>${c.departamento || c.municipio || "No registrado"}</td><td><small>${c.direccion}</small>${c.mapsUrl ? '<br><a href="' + c.mapsUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary btn-sm mt-2">Ver en Google Maps</a>' : ""}</td><td><small>${c.clima ? `${c.clima.descripcion}<br>${c.clima.temperaturaMin} °C - ${c.clima.temperaturaMax} °C<br>Lluvia: ${c.clima.lluvia ?? 0}%` : "Sin pronóstico"}</small></td><td><span class="badge ${badge}">${c.estado}</span></td><td>`;            
            if (esAdmin) {
                html += `<button onclick="cambiarEstadoCita(${c.id}, 'Confirmada')" class="btn btn-outline-success btn-sm rounded-pill me-1">Confirmar</button>`;

                if (c.estado === "Confirmada") {
                html += `<button onclick="cambiarEstadoCita(${c.id}, 'Completada')" class="btn btn-outline-primary btn-sm rounded-pill me-1">Completar cita</button>`;
                }
                 html += `<button onclick="eliminarCita(${c.id})" class="btn btn-outline-danger btn-sm rounded-pill">Eliminar</button>`;
                    } else {
                html += `<button onclick="eliminarCita(${c.id})" class="btn btn-outline-danger btn-sm rounded-pill">Cancelar</button>`;
                }
            html += `</td></tr>`;
        });
        html += `</tbody></table></div>`;
    }
    html += `</section>`;
    return html;
}

// NUEVA FUNCIÓN: Tabla de gestión de datos de clientas guardadas para la Admin
function renderizarTablaClientesAdmin() {
    let clientes = JSON.parse(localStorage.getItem("clientes_estudio")) || [];

    let html = `
        <section class="my-5 p-4 bg-white rounded-4 shadow-sm border">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-bold text-rose-dark mb-0">Gestión de Datos de Clientas (Privacidad y Memoria)</h3>
                <span class="badge bg-secondary p-2">Total Registros: ${clientes.length}</span>
            </div>
    `;

    if (clientes.length === 0) {
        html += `<p class="text-center text-muted">No hay clientas con datos guardados en el sistema.</p>`;
    } else {
        html += `
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="bg-rose-pastel">
                        <tr>
                            <th>Nombre de la Clienta</th>
                            <th>Número de Teléfono</th>
                            <th>Acción de Privacidad</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        clientes.forEach(cli => {
            html += `
                <tr>
                    <td class="fw-bold">${cli.nombre}</td>
                    <td>${cli.telefono}</td>
                    <td>
                        <button onclick="eliminarClienteGuardado('${cli.telefono}')" class="btn btn-outline-danger btn-sm rounded-pill"> Eliminar Registro</button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
            <p class="text-muted small mt-3"><em>Nota: Si eliminas el registro de una clienta, su número dejará de autocompletar sus datos automáticamente por razones de privacidad y cambio de línea.</em></p>
        `;
    }

    html += `</section>`;
    return html;
}

// Función para que la admin elimine los datos guardados de una clienta

function eliminarClienteGuardado(telefono) {
    Swal.fire({
        title: "¿Eliminar datos de la clienta?",
        text: `¿Estás segura de eliminar los datos guardados para el número ${telefono}? Esta acción protegerá la privacidad si el número cambió de dueño.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63384",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            let clientes = JSON.parse(localStorage.getItem("clientes_estudio")) || [];
            clientes = clientes.filter(c => c.telefono !== telefono);
            localStorage.setItem("clientes_estudio", JSON.stringify(clientes));

            renderizarPaginaPrincipal();

            Swal.fire({
                title: "¡Eliminado!",
                text: "Los datos guardados de la clienta se eliminaron correctamente.",
                icon: "success",
                confirmButtonColor: "#d63384"
            });
        }
    });
}


function exportarExcel() {
    const citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    
if (citas.length === 0) {
    Swal.fire({
        title: "Sin citas",
        text: "No hay citas para exportar.",
        icon: "info",
        confirmButtonColor: "#d63384"
    });
    return;
}

    let csv = "data:text/csv;charset=utf-8,ID,Cliente,Telefono,Servicio,Fecha,Hora,Departamento,Direccion,Clima,Estado\n";
    citas.forEach(c => { const clima = c.clima ? `${c.clima.descripcion} | ${c.clima.temperaturaMin}°C-${c.clima.temperaturaMax}°C | Lluvia ${c.clima.lluvia ?? 0}%` : "Sin pronóstico"; csv += `"${c.id}","${c.nombre}","${c.telefono}","${c.servicio}","${c.fecha}","${c.hora}","${c.departamento || c.municipio || ""}","${(c.direccion || "").replace(/\n/g, ' ')}","${clima}","${c.estado}"\n`; });    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "Reporte_Citas_LashesRosesStudio.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}


function cambiarEstadoCita(id, estado) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citas = citas.map(c => c.id === id ? { ...c, estado } : c);
    localStorage.setItem("citas_estudio", JSON.stringify(citas));
    renderizarPaginaPrincipal();

    Swal.fire({
        title: estado === "Completada" ? "¡Cita completada!" : "¡Cita confirmada!",
        text: estado === "Completada"
            ? "La cita se marcó como completada correctamente."
            : "La cita se confirmó correctamente.",
        icon: "success",
        confirmButtonColor: "#d63384"
    });
}



function eliminarCita(id) {
    Swal.fire({
        title: "¿Eliminar cita?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63384",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
            citas = citas.filter(c => c.id !== id);
            localStorage.setItem("citas_estudio", JSON.stringify(citas));
            renderizarPaginaPrincipal();

            Swal.fire({
                title: "¡Cita eliminada!",
                text: "La cita se eliminó correctamente.",
                icon: "success",
                confirmButtonColor: "#d63384"
            });
        }
    });
}


function cerrarSesionCliente() {
    localStorage.removeItem("usuario_activo");
    inicializarSesion();
    renderizarPaginaPrincipal();
}

function configurarEventos() {
    const mLogin = document.getElementById("loginModal");
    if (mLogin) {
        mLogin.addEventListener("show.bs.modal", () => {
            document.getElementById("ident-telefono").value = "";
            document.getElementById("ident-error").classList.add("d-none");
            document.getElementById("paso-busqueda").classList.remove("d-none");
            
            const divConfirmar = document.getElementById("paso-confirmacion-nombre");
            if (divConfirmar) divConfirmar.classList.add("d-none");

            const pasoNuevo = document.getElementById("paso-nuevo-registro");
            if (pasoNuevo) pasoNuevo.classList.add("d-none");
        });
    }

    const fIdent = document.getElementById("form-identificacion");
    if (fIdent) {
        fIdent.addEventListener("submit", (e) => {
            e.preventDefault();
            const tel = document.getElementById("ident-telefono").value.trim();
            const err = document.getElementById("ident-error");
            if (!tel) { err.textContent = "Ingresa tu número de teléfono."; err.classList.remove("d-none"); return; }

            if (tel === "admin" || tel === "7000-admin") {
                localStorage.setItem("usuario_activo", JSON.stringify({ nombre: "Administradora", telefono: "N/A", rol: "admin" }));
                bootstrap.Modal.getInstance(mLogin).hide();
                inicializarSesion(); renderizarPaginaPrincipal(); return;
            }

            let reg = JSON.parse(localStorage.getItem("clientes_estudio")) || [];
            let enc = reg.find(c => c.telefono === tel);

            if (enc) {
                document.getElementById("paso-busqueda").classList.add("d-none");
                
                let divConfirmar = document.getElementById("paso-confirmacion-nombre");
                if (!divConfirmar) {
                    divConfirmar = document.createElement("div");
                    divConfirmar.id = "paso-confirmacion-nombre";
                    divConfirmar.innerHTML = `
                        <div class="alert alert-warning py-2 small">Hemos encontrado un registro con este número. Por seguridad (números reciclados), indícanos tu nombre para validar tu identidad:</div>
                        <form id="form-val-nombre">
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Escribe tu Nombre para Confirmar</label>
                                <input type="text" class="form-control" id="val-nombre-ingresado" required placeholder="Tu nombre">
                            </div>
                            <div id="val-error" class="alert alert-danger d-none py-2 fs-6"></div>
                            <button type="submit" class="btn btn-rose w-100 rounded-pill py-2">Verificar e Ingresar</button>
                        </form>
                    `;
                    mLogin.querySelector(".modal-body").appendChild(divConfirmar);
                } else {
                    divConfirmar.classList.remove("d-none");
                    document.getElementById("val-error").classList.add("d-none");
                    document.getElementById("val-nombre-ingresado").value = "";
                }

                document.getElementById("form-val-nombre").onsubmit = function(ev) {
                    ev.preventDefault();
                    const nombreIngresado = document.getElementById("val-nombre-ingresado").value.trim().toLowerCase();
                    const nombreReal = enc.nombre.trim().toLowerCase();

                    if (nombreIngresado === nombreReal || nombreReal.includes(nombreIngresado)) {
                        localStorage.setItem("usuario_activo", JSON.stringify(enc));
                        bootstrap.Modal.getInstance(mLogin).hide();
                        inicializarSesion(); 
                        renderizarPaginaPrincipal();
                    } else {
                        const errVal = document.getElementById("val-error");
                        errVal.textContent = "El nombre no coincide con el registrado para este número. Si eres una persona nueva con este número, regístrate.";
                        errVal.classList.remove("d-none");
                    }
                };

            } else {
                document.getElementById("paso-busqueda").classList.add("d-none");
                let divConfirmar = document.getElementById("paso-confirmacion-nombre");
                if(divConfirmar) divConfirmar.classList.add("d-none");

                document.getElementById("paso-nuevo-registro").classList.remove("d-none");
                document.getElementById("reg-tel-oculto").value = tel;
            }
        });
    }

    const fNuevo = document.getElementById("form-nuevo-cliente");
    if (fNuevo) {
        fNuevo.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nuevo-nombre").value.trim();
            const telefono = document.getElementById("reg-tel-oculto").value;
            const nuevo = { nombre, telefono, rol: "cliente" };

            if (document.getElementById("check-guardar-datos").checked) {
                let reg = JSON.parse(localStorage.getItem("clientes_estudio")) || [];
                if (!reg.some(c => c.telefono === telefono)) {
                    reg.push(nuevo);
                    localStorage.setItem("clientes_estudio", JSON.stringify(reg));
                }
            }

            localStorage.setItem("usuario_activo", JSON.stringify(nuevo));
            bootstrap.Modal.getInstance(mLogin).hide();
            inicializarSesion(); renderizarPaginaPrincipal();
        });
    }

    const btnOut = document.getElementById("btn-logout");
    if (btnOut) {
        btnOut.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuario_activo");
            inicializarSesion(); renderizarPaginaPrincipal();
        });
    }

    document.addEventListener("submit", (e) => {
        if (e.target && e.target.id === "form-reserva") {
            e.preventDefault();
            const nombre = document.getElementById("reserva-nombre").value;
            const telefono = document.getElementById("reserva-telefono").value;
            const servicio = document.getElementById("reserva-servicio").value;
            const fecha = document.getElementById("reserva-fecha").value;
            const hora = document.getElementById("reserva-hora").value;
            const departamento = document.getElementById("reserva-departamento").value;
            const direccion = document.getElementById("reserva-direccion").value;
            const latitud = document.getElementById("reserva-latitud").value;
            const longitud = document.getElementById("reserva-longitud").value;
            const mapsUrl = latitud && longitud
            ? `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`: ""; const msg = document.getElementById("reserva-mensaje");
            if (!nombre.trim() || !telefono.trim() || !servicio || !fecha || !hora || !departamento || !direccion.trim()) {            
            msg.innerHTML = `<div class="alert alert-danger">Completa todos los datos correctamente.</div>`;
            return;
}

            if (document.getElementById("check-autorizacion").checked) {
                let reg = JSON.parse(localStorage.getItem("clientes_estudio")) || [];
                if (!reg.some(c => c.telefono === telefono)) {
                    reg.push({ nombre, telefono, rol: "cliente" });
                    localStorage.setItem("clientes_estudio", JSON.stringify(reg));
                }
            }

            const citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];

            const horarioOcupado = citas.some(
            c => c.fecha === fecha && c.hora === hora
            );

            if (horarioOcupado) {
            msg.innerHTML = `<div class="alert alert-danger">Ese horario ya está reservado. Selecciona otro.</div>`;
            actualizarHorariosDisponibles();
            return;
            }
                citas.push({ id: Date.now(), nombre, telefono, servicio, fecha, hora, departamento, direccion, latitud, longitud, mapsUrl, clima: climaReservaActual, estado: "Pendiente" });
                localStorage.setItem("citas_estudio", JSON.stringify(citas));

            e.target.reset();

            Swal.fire({
            title: "¡Cita agendada con éxito!",
            html: `<strong>Servicio:</strong> ${servicio}<br><strong>Fecha:</strong> ${fecha} a las ${hora} hrs<br><strong>Departamento:</strong> ${departamento}<br><strong>Dirección:</strong> ${direccion}<br><br>Te contactaremos a través de WhatsApp para confirmar los detalles.`,
            icon: "success",
            confirmButtonColor: "#d63384"
            }).then(() => {
            renderizarPaginaPrincipal();
            });        
        }
    });
}

// Sección relacionada al HTML hecha por Cristopher scrollIntoView
    function actualizarNavbar(){
    const navbar = document.getElementById("navbar-principal");


    if (!navbar) return;

    if (window.scrollY > 5){
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }
}

window.addEventListener("scroll", actualizarNavbar);
window.addEventListener("load", actualizarNavbar);



function renderizarEstadisticas() {
    const citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];

    const pendientes = citas.filter(c => c.estado === "Pendiente").length;
    const confirmadas = citas.filter(c => c.estado === "Confirmada").length;
    const completadas = citas.filter(c => c.estado === "Completada").length;

    const conteoServicios = {};

    citas.forEach(cita => {
        conteoServicios[cita.servicio] =
            (conteoServicios[cita.servicio] || 0) + 1;
    });

    const serviciosOrdenados = Object.entries(conteoServicios)
        .sort((a, b) => b[1] - a[1]);

    return `
        <section class="my-5 p-4 bg-white rounded-4 shadow-sm border">
            <h3 class="fw-bold text-rose-dark mb-4">
                Estadísticas de Citas
            </h3>

            <div class="row g-3 mb-4">
                <div class="col-md-3 col-6">
                    <div class="p-3 rounded-4 bg-light text-center">
                        <h6 class="text-muted">Total de citas</h6>
                        <h2 class="fw-bold">${citas.length}</h2>
                    </div>
                </div>

                <div class="col-md-3 col-6">
                    <div class="p-3 rounded-4 bg-light text-center">
                        <h6 class="text-muted">Pendientes</h6>
                        <h2 class="fw-bold">${pendientes}</h2>
                    </div>
                </div>

                <div class="col-md-3 col-6">
                    <div class="p-3 rounded-4 bg-light text-center">
                        <h6 class="text-muted">Confirmadas</h6>
                        <h2 class="fw-bold">${confirmadas}</h2>
                    </div>
                </div>

                <div class="col-md-3 col-6">
                    <div class="p-3 rounded-4 bg-light text-center">
                        <h6 class="text-muted">Completadas</h6>
                        <h2 class="fw-bold">${completadas}</h2>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-6">
                    <h5 class="text-center">Citas por estado</h5>
                    <div style="height: 300px;">
                        <canvas id="graficaEstados"></canvas>
                    </div>
                </div>

                <div class="col-md-6">
                    <h5 class="text-center">Servicios más solicitados</h5>
                    <div style="height: 300px;">
                        <canvas id="graficaServicios"></canvas>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function inicializarGraficasEstadisticas() {
    if (typeof Chart === "undefined") {
        console.error("Chart.js no está cargado.");
        return;
    }

    const citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];

    const pendientes = citas.filter(c => c.estado === "Pendiente").length;
    const confirmadas = citas.filter(c => c.estado === "Confirmada").length;
    const completadas = citas.filter(c => c.estado === "Completada").length;

    const conteoServicios = {};

    citas.forEach(cita => {
        conteoServicios[cita.servicio] =
            (conteoServicios[cita.servicio] || 0) + 1;
    });

    const estados = document.getElementById("graficaEstados");
    const servicios = document.getElementById("graficaServicios");

    if (!estados || !servicios) return;

    new Chart(estados, {
        type: "doughnut",
        data: {
            labels: ["Pendientes", "Confirmadas", "Completadas"],
            datasets: [{
                data: [pendientes, confirmadas, completadas],
                backgroundColor: ["#f4c95d", "#e8a0bf", "#8ecfba"],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

    const serviciosOrdenados = Object.entries(conteoServicios)
        .sort((a, b) => b[1] - a[1]);

    new Chart(servicios, {
        type: "bar",
        data: {
            labels: serviciosOrdenados.map(s => s[0]),
            datasets: [{
                label: "Número de citas",
                data: serviciosOrdenados.map(s => s[1]),
                backgroundColor: "#e8a0bf",
                borderColor: "#c96b95",
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/* FASE 2, REACT: COMPONENTE REUTILIZABLE DE SERVICIO */

function TarjetaServicioReact({ servicio, onSeleccionar }) {

    return (
            <div
            className="tarjeta-servicio"
            onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSeleccionar(servicio);
            }}
            style={{
            backgroundImage: `url('${servicio.imagen}')`
            }}
>

            <div className="info-servicio">

                <h4>
                    {servicio.nombre}
                </h4>

                <p>
                    {servicio.descripcion}
                </p>

                <span>
                    ${servicio.precio.toFixed(2)}
                </span>

            </div>

        </div>
    );
}


/* COMPONENTE PARA AGRUPAR LOS SERVICIOS */

function GrupoServiciosReact({ titulo, servicios, onSeleccionar, claseGrupo = "grupo-servicios", claseGrid = "grid-servicios" }) {

    return (
        <div className={claseGrupo}>

            <div className="encabezado-categoria">

                <h3>{titulo}</h3>

                <span className="linea-categoria"></span>

            </div>

            <div className={claseGrid}>

                {servicios.map(servicio => (

                    <TarjetaServicioReact
                        key={servicio.id}
                        servicio={servicio}
                        onSeleccionar={onSeleccionar}
                    />

                ))}

            </div>

        </div>
    );
}

/* SECCIÓN PRINCIPAL DE SERVICIOS EN REACT */

function SeccionServiciosReact() {

    const [servicioSeleccionado, setServicioSeleccionado] = React.useState(null);

    const pestanas = listaServicios.filter(
        servicio => servicio.categoria === "Pestañas"
    );

    const cejas = listaServicios.filter(
        servicio => servicio.categoria === "Cejas"
    );

    const unas = listaServicios.filter(
        servicio => servicio.categoria === "Uñas"
    );

    function seleccionarServicio(servicio) {

        setServicioSeleccionado(servicio);

        intentarReservar(servicio.nombre);
    }
    return (
    <section id="servicios" className="seccion-servicios">

        <h2 className="titulo-servicios text-center">
            Nuestros Servicios
        </h2>

        <p className="visually-hidden" aria-live="polite">
        {servicioSeleccionado
        ? `Servicio seleccionado: ${servicioSeleccionado.nombre}`
        : "Ningún servicio seleccionado"}
        </p>

        <div className="bloque-servicios">

            <GrupoServiciosReact
                titulo="Pestañas"
                servicios={pestanas}
                onSeleccionar={seleccionarServicio}
            />

            <GrupoServiciosReact
                titulo="Cejas"
                servicios={cejas}
                onSeleccionar={seleccionarServicio}
            />

        </div>

        <GrupoServiciosReact
            titulo="Uñas"
            servicios={unas}
            onSeleccionar={seleccionarServicio}
            claseGrupo="seccion-unas"
            claseGrid="grid-unas"
        />

    </section>
);
 
}

/* CONTENEDOR DONDE REACT MOSTRARÁ LOS COMPONENTES */
function montarServiciosReact() {
    const contenedor = document.getElementById("react-servicios-root");
    if (!contenedor) return;

    const root = ReactDOM.createRoot(contenedor);
    root.render(<SeccionServiciosReact />);
}

