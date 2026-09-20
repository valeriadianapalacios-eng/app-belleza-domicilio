/*1. DATOS DE SERVICIOS*/

// Catálogo de servicios disponibles.
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


/*2. INICIALIZACIÓN*/

// Inicia la sesión, carga la página y activa los eventos.
document.addEventListener("DOMContentLoaded", () => {
    inicializarSesion();
    renderizarPaginaPrincipal();
    configurarEventos();
});


/*3. SESIÓN DE USUARIO*/

// Obtiene el usuario activo guardado en localStorage.
function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario_activo"));
}


// Actualiza el navbar según exista una sesión activa.
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


/*4. PÁGINA PRINCIPAL*/

// Genera la vista según sea invitado, cliente o administradora.
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
            </div>
        `;
        html += renderizarTablaCitas("Agenda General de Citas", true);
        html += renderizarTablaClientesAdmin(); // Sección nueva para gestionar datos de clientas guardadas
        app.innerHTML = html;
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

    html += renderizarSeccionServicios();

    // Si no hay sesión, muestra la sección con los pasos para agendar.
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

    const servPendiente = sessionStorage.getItem("servicio_seleccionado");
    if (servPendiente && document.getElementById("reserva-servicio")) {
        document.getElementById("reserva-servicio").value = servPendiente;
        sessionStorage.removeItem("servicio_seleccionado");
        document.getElementById("reservas")?.scrollIntoView({ behavior: 'smooth' });
    }
}


/*5. SERVICIOS*/

// Genera las tarjetas de Pestañas, Cejas y Uñas.
function renderizarSeccionServicios() {

    const pestanas = listaServicios.filter(s => s.categoria === "Pestañas");
    const cejas = listaServicios.filter(s => s.categoria === "Cejas");
    const unas = listaServicios.filter(s => s.categoria === "Uñas");

    let html = `
        <section id="servicios" class="seccion-servicios">

            <!-- TEXTO SUPERIOR -->
            <div class="servicios-etiqueta">
                <span></span>
                <p>Belleza a tu alcance</p>
                <span></span>
            </div>

            <!-- TÍTULO -->
            <h2 class="titulo-servicios text-center">
                Nuestros Servicios
            </h2>

            <!-- DESCRIPCIÓN -->
            <p class="subtitulo-servicios">
                Cuidamos cada detalle para que te sientas siempre tu mejor versión.
            </p>


            <!-- PESTAÑAS Y CEJAS -->
            <div class="bloque-servicios">

                <!-- PESTAÑAS -->
                <div class="grupo-servicios">

                    <div class="encabezado-categoria">
                        <h3>Pestañas</h3>
                        <span class="linea-categoria"></span>
                        <p>MÁS MIRADA, MÁS CONFIANZA</p>
                    </div>

                    <div class="grid-servicios">
    `;

    pestanas.forEach(s => {
        html += `
            <div class="tarjeta-servicio"
                 style="background-image: url('${s.imagen}')"
                 onclick="intentarReservar('${s.nombre}')">

                <div class="info-servicio">
                    <h4>${s.nombre}</h4>
                    <p>${s.descripcion}</p>
                    <span>$${s.precio.toFixed(2)}</span>
                </div>

            </div>
        `;
    });

    html += `
                    </div>
                </div>


                <!-- CEJAS -->
                <div class="grupo-servicios">

                    <div class="encabezado-categoria">
                        <h3>Cejas</h3>
                        <span class="linea-categoria"></span>
                        <p>DEFINE TU BELLEZA NATURAL</p>
                    </div>

                    <div class="grid-servicios">
    `;

    cejas.forEach(s => {
        html += `
            <div class="tarjeta-servicio"
                 style="background-image: url('${s.imagen}')"
                 onclick="intentarReservar('${s.nombre}')">

                <div class="info-servicio">
                    <h4>${s.nombre}</h4>
                    <p>${s.descripcion}</p>
                    <span>$${s.precio.toFixed(2)}</span>
                </div>

            </div>
        `;
    });

    html += `
                    </div>
                </div>

            </div>


            <!-- UÑAS -->
            <div class="seccion-unas">

                <div class="encabezado-categoria">
                    <h3>Uñas</h3>
                    <span class="linea-categoria"></span>
                    <p>TU ESTILO EN CADA DETALLE</p>
                </div>

                <div class="grid-unas">
    `;

    unas.forEach(s => {
        html += `
            <div class="tarjeta-servicio"
                 style="background-image: url('${s.imagen}')"
                 onclick="intentarReservar('${s.nombre}')">

                <div class="info-servicio">
                    <h4>${s.nombre}</h4>
                    <p>${s.descripcion}</p>
                    <span>$${s.precio.toFixed(2)}</span>
                </div>

            </div>
        `;
    });

    html += `
                </div>
            </div>

        </section>
    `;

    return html;
}

// Guarda el servicio seleccionado y abre el login o la reserva.
function intentarReservar(nombreServicio) {
    sessionStorage.setItem("servicio_seleccionado", nombreServicio);
    const usr = obtenerUsuario();
    if (!usr) {
        new bootstrap.Modal(document.getElementById('loginModal')).show();
    } else if (usr.rol === 'admin') {
        alert("Estás en modo Administradora. Las reservas se realizan desde cuentas de cliente.");
    } else {
        renderizarPaginaPrincipal();
    }
}


/*6. RESERVAS Y GOOGLE MAPS*/

// Genera el formulario para crear una cita.
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
                <div class="col-md-3"><label class="form-label fw-semibold">Fecha</label><input type="date" id="reserva-fecha" class="form-control" required onchange="actualizarHorariosDisponibles()"></div>
                <div class="col-md-3"><label class="form-label fw-semibold">Horario (7 AM - 5 PM)</label><select id="reserva-hora" class="form-select" required><option value="">-- Selecciona fecha primero --</option></select></div>
                
                <div class="col-12">
    <label class="form-label fw-semibold">Dirección de Domicilio</label>

    <textarea
        id="reserva-direccion"
        class="form-control"
        rows="2"
        required
        placeholder="Ej: Calle, número de casa, colonia, municipio, departamento"></textarea>

    <small class="text-muted d-block mt-1">
        Escribe la dirección lo más completa posible para mejorar la precisión del mapa.
    </small>

    <button
        type="button"
        class="btn btn-outline-rose mt-2"
        onclick="abrirGoogleMaps()">
        Ver ubicación en el mapa
    </button>

    <div id="contenedor-mapa" class="mt-3 d-none">
        <iframe
            id="mapa-google"
            width="100%"
            height="350"
            style="border:0; border-radius:15px;"
            loading="lazy">
        </iframe>
    </div>
</div>


                <div class="col-12"><div class="form-check p-3 bg-light rounded-3 border"><input class="form-check-input mt-1" type="checkbox" id="check-autorizacion" checked><label class="form-check-label small text-muted" for="check-autorizacion">🔒 <strong>Autorización de datos:</strong> ¿Guardar datos para agilizar tu próxima cita?</label></div></div>
                <div class="col-12 d-flex justify-content-between align-items-center"><button type="button" onclick="cerrarSesionCliente()" class="btn btn-outline-secondary btn-sm rounded-pill">Cambiar de número</button><button type="submit" class="btn btn-rose-lg rounded-pill px-4">Confirmar y Agendar Cita</button></div>
            </form>
            <div id="reserva-mensaje" class="mt-3"></div>
        </section>
    `;
    
    }



// Muestra la dirección escrita dentro de Google Maps.
function abrirGoogleMaps() {
    const direccion = document.getElementById("reserva-direccion").value.trim();

    if (!direccion) {
        alert("Primero ingresa una dirección.");
        return;
    }

    const direccionCompleta = `${direccion}, El Salvador`;

    const mapa = document.getElementById("mapa-google");
    const contenedor = document.getElementById("contenedor-mapa");

    mapa.src = `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta)}&output=embed`;

    contenedor.classList.remove("d-none");
}

// Muestra solamente los horarios que aún están libres.
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


/*7. CITAS Y PANEL DE ADMINISTRACIÓN*/

// Genera la tabla de citas para cliente o administradora.
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
        html += `<th>Servicio</th><th>Fecha y Hora</th><th>Dirección</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>`;

        citas.forEach(c => {
            const badge = c.estado === 'Confirmada' ? 'bg-success' : (c.estado === 'Completada' ? 'bg-info text-dark' : 'bg-warning text-dark');
            html += `<tr>`;
            if (esAdmin) html += `<td class="fw-bold">${c.nombre}<br><small class="text-muted">${c.telefono}</small></td>`;


html += `
    <td>${c.servicio}</td>

    <td>
        ${c.fecha} - ${c.hora} hrs
    </td>

    <td style="min-width: 300px;">
        <small class="d-block mb-2">
            ${c.direccion}
        </small>

        ${esAdmin ? `
            <iframe
                src="https://www.google.com/maps?q=${encodeURIComponent(c.direccion + ', El Salvador')}&output=embed"
                width="100%"
                height="180"
                style="border:0; border-radius:12px;"
                loading="lazy">
            </iframe>
        ` : ''}
    </td>

    <td>
        <span class="badge ${badge}">
            ${c.estado}
        </span>
    </td>

    <td>
`;            if (esAdmin) {
                html += `<button onclick="cambiarEstadoCita(${c.id}, 'Confirmada')" class="btn btn-outline-success btn-sm rounded-pill me-1">Confirmar</button><button onclick="eliminarCita(${c.id})" class="btn btn-outline-danger btn-sm rounded-pill">Eliminar</button>`;
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

// Genera la tabla de clientas que autorizaron guardar sus datos.
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
                        <button onclick="eliminarClienteGuardado('${cli.telefono}')" class="btn btn-outline-danger btn-sm rounded-pill">🗑️ Eliminar Registro</button>
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

/*8. ACCIONES DE ADMINISTRACIÓN*/

// Elimina los datos guardados de una clienta, sin borrar sus citas.
function eliminarClienteGuardado(telefono) {
    if (confirm(`¿Estás segura de eliminar los datos guardados para el número ${telefono}? Esta acción protegerá la privacidad si el número cambió de dueño.`)) {
        let clientes = JSON.parse(localStorage.getItem("clientes_estudio")) || [];
        clientes = clientes.filter(c => c.telefono !== telefono);
        localStorage.setItem("clientes_estudio", JSON.stringify(clientes));
        renderizarPaginaPrincipal();
    }
}


// Descarga todas las citas en formato CSV compatible con Excel.
function exportarExcel() {
    const citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    if (citas.length === 0) { alert("No hay citas para exportar."); return; }
    let csv = "data:text/csv;charset=utf-8,ID,Cliente,Telefono,Servicio,Fecha,Hora,Direccion,Estado\n";
    citas.forEach(c => { csv += `"${c.id}","${c.nombre}","${c.telefono}","${c.servicio}","${c.fecha}","${c.hora}","${c.direccion.replace(/\n/g, ' ')}","${c.estado}"\n`; });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "Reporte_Citas_LashesRosesStudio.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}


// Cambia el estado de una cita.
function cambiarEstadoCita(id, estado) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citas = citas.map(c => c.id === id ? { ...c, estado } : c);
    localStorage.setItem("citas_estudio", JSON.stringify(citas));
    renderizarPaginaPrincipal();
}


// Elimina una cita por su identificador.
function eliminarCita(id) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citas = citas.filter(c => c.id !== id);
    localStorage.setItem("citas_estudio", JSON.stringify(citas));
    renderizarPaginaPrincipal();
}


// Cierra la sesión actual y vuelve a cargar la página.
function cerrarSesionCliente() {
    localStorage.removeItem("usuario_activo");
    inicializarSesion();
    renderizarPaginaPrincipal();
}


/*9. LOGIN, REGISTRO Y EVENTOS*/

// Controla login, registro, cierre de sesión y creación de citas.
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
            const direccion = document.getElementById("reserva-direccion").value;
            const msg = document.getElementById("reserva-mensaje");

            if (!nombre || !telefono || !servicio || !fecha || !hora || !direccion) {
                msg.innerHTML = `<div class="alert alert-danger">Completa todos los datos.</div>`;
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
            citas.push({ id: Date.now(), nombre, telefono, servicio, fecha, hora, direccion, estado: "Pendiente" });
            localStorage.setItem("citas_estudio", JSON.stringify(citas));

            msg.innerHTML = `
                <div class="card border-0 shadow-sm rounded-4 bg-rose-pastel p-4 text-center my-3">
                    <h4 class="fw-bold text-rose-dark mb-1">SU INFORMACIÓN</h4>
                    <p class="text-muted small mb-3">Datos de su cita reservada</p>
                    <ul class="list-group list-group-flush rounded-3 overflow-hidden mb-3">
                        <li class="list-group-item bg-white py-2"><strong>Cliente:</strong> ${nombre}</li>
                        <li class="list-group-item bg-white py-2"><strong>Teléfono:</strong> ${telefono}</li>
                        <li class="list-group-item bg-white py-2"><strong>Servicio:</strong> ${servicio}</li>
                        <li class="list-group-item bg-white py-2"><strong>Fecha y Hora:</strong> ${fecha} a las ${hora} hrs</li>
                        <li class="list-group-item bg-white py-2"><strong>Dirección:</strong> ${direccion}</li>
                    </ul>
                    <div class="alert alert-success py-2 mb-0">¡Cita agendada con éxito! <strong>Te contactaremos a través de WhatsApp</strong> para confirmar los detalles de tu visita a domicilio.</div>
                </div>
            `;
            e.target.reset();
            renderizarPaginaPrincipal();
        }
    });
}

/* 10. NAVBAR*/

// Cambia el fondo del navbar cuando el usuario hace scroll.
function actualizarNavbar() {
    const navbar = document.getElementById("navbar-principal");
    if (!navbar) return;

    if (window.scrollY > 5) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }
}

window.addEventListener("scroll", actualizarNavbar);
window.addEventListener("load", actualizarNavbar);
