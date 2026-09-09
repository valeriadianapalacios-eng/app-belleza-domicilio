// Arreglo de servicios reales de Lashes Rose's Studio
const listaServicios = [
    // Pestañas y Cejas
    { id: 1, categoria: "Pestañas", nombre: "Extensiones Clásicas", precio: 25.00, descripcion: "Aplicación pelo a pelo para una mirada natural y delicada." },
    { id: 2, categoria: "Pestañas", nombre: "Extensiones Volumen", precio: 40.00, descripcion: "Abundancia y mayor densidad para un efecto glamuroso e impactante." },
    { id: 3, categoria: "Cejas", nombre: "Laminado de Cejas", precio: 15.00, descripcion: "Diseño, peinado y fijación semipermanente para cejas perfiladas." },
    { id: 4, categoria: "Cejas", nombre: "Depilación de Cejas", precio: 5.00, descripcion: "Limpieza y perfilado de cejas según la forma de tu rostro." },
    
    // Uñas y Manos/Pies
    { id: 5, categoria: "Uñas", nombre: "Uñas Acrílicas Naturales", precio: 15.00, descripcion: "Estructura acrílica con acabado limpio, natural y elegante." },
    { id: 6, categoria: "Uñas", nombre: "Manicure", precio: 10.00, descripcion: "Cuidado completo de uñas y cutículas con hidratación." },
    { id: 7, categoria: "Uñas", nombre: "Pedicure", precio: 12.00, descripcion: "Tratamiento y estética para pies impecables y descansados." },
    { id: 8, categoria: "Uñas", nombre: "Esmaltado Permanente", precio: 10.00, descripcion: "Color duradero en uña natural con secado en lámpara UV/LED." }
];

// Inicialización de la app
document.addEventListener("DOMContentLoaded", () => {
    inicializarSesion();
    renderizarServicios();
    renderizarFormularioReserva();
    configurarEventos();
});

// Manejo de la sesión guardada en localStorage
function inicializarSesion() {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario_activo"));
    const labelUsuario = document.getElementById("usuario-sesion");
    const btnLoginModal = document.getElementById("btn-login-modal");
    const btnLogout = document.getElementById("btn-logout");

    if (usuarioGuardado) {
        labelUsuario.textContent = `${usuarioGuardado.email} (${usuarioGuardado.rol})`;
        btnLoginModal.classList.add("d-none");
        btnLogout.classList.remove("d-none");
    } else {
        labelUsuario.textContent = "Invitado";
        btnLoginModal.classList.remove("d-none");
        btnLogout.classList.add("d-none");
    }
}

// Renderizado del Catálogo de Servicios
function renderizarServicios() {
    const contenedorApp = document.getElementById("app-content");

    let html = `
        <section id="servicios" class="my-5">
            <h2 class="text-center fw-bold text-rose-dark mb-4">Nuestros Servicios y Precios</h2>
            <div class="row g-4">
    `;

    listaServicios.forEach((servicio) => {
        html += `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-4 p-3 border-start border-4 border-rose">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-rose-pastel text-rose-dark mb-2 align-self-start fw-bold">${servicio.categoria}</span>
                        <h5 class="card-title fw-bold">${servicio.nombre}</h5>
                        <p class="card-text text-muted small flex-grow-1">${servicio.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fs-4 fw-bold text-rose-dark">$${servicio.precio.toFixed(2)}</span>
                            <a href="#reservas" onclick="seleccionarServicio('${servicio.nombre}')" class="btn btn-rose btn-sm rounded-pill px-3">Reservar</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </section>
        <div id="seccion-reserva-container"></div>
    `;

    contenedorApp.innerHTML = html;
}

// Renderizado del Formulario de Reserva (Paso 5)
function renderizarFormularioReserva() {
    const contenedorReserva = document.getElementById("seccion-reserva-container");

    let opcionesServicios = listaServicios.map(s => `<option value="${s.nombre}">${s.nombre} - $${s.precio.toFixed(2)}</option>`).join("");

    contenedorReserva.innerHTML = `
        <section id="reservas" class="my-5 p-4 bg-white rounded-4 shadow-sm border">
            <h3 class="fw-bold text-rose-dark mb-3 text-center">Agendar Cita a Domicilio</h3>
            <form id="form-reserva" class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nombre Completo</label>
                    <input type="text" id="reserva-nombre" class="form-control" required placeholder="Ej: María López">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Teléfono / WhatsApp</label>
                    <input type="tel" id="reserva-telefono" class="form-control" required placeholder="7000-0000">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Servicio Deseado</label>
                    <select id="reserva-servicio" class="form-select" required>
                        <option value="">-- Selecciona un servicio --</option>
                        ${opcionesServicios}
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Fecha</label>
                    <input type="date" id="reserva-fecha" class="form-control" required>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Hora</label>
                    <input type="time" id="reserva-hora" class="form-control" required>
                </div>
                <div class="col-12">
                    <label class="form-label fw-semibold">Dirección de Domicilio</label>
                    <textarea id="reserva-direccion" class="form-control" rows="2" required placeholder="Ingresa tu dirección exacta para la cita"></textarea>
                </div>
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-rose-lg rounded-pill">Confirmar Cita</button>
                </div>
            </form>
            <div id="reserva-mensaje" class="alert mt-3 d-none"></div>
        </section>
    `;
}

// Seleccionar servicio automáticamente al dar clic en la tarjeta
function seleccionarServicio(nombreServicio) {
    const select = document.getElementById("reserva-servicio");
    if (select) {
        select.value = nombreServicio;
    }
}

// Eventos del Login y Formulario de Reserva
function configurarEventos() {
    const formLogin = document.getElementById("form-login");
    const btnLogout = document.getElementById("btn-logout");

    // Login
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const rol = document.getElementById("login-rol").value;
        const alertError = document.getElementById("login-error");

        if (!email.trim() || !password.trim()) {
            alertError.textContent = "Por favor complete todos los campos.";
            alertError.classList.remove("d-none");
            return;
        }

        const usuario = { email, rol, fechaIngreso: new Date().toISOString() };
        localStorage.setItem("usuario_activo", JSON.stringify(usuario));

        const modalElement = document.getElementById("loginModal");
        bootstrap.Modal.getInstance(modalElement).hide();

        alertError.classList.add("d-none");
        formLogin.reset();
        inicializarSesion();
    });

    // Logout
    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario_activo");
        inicializarSesion();
    });

    // Procesar Reserva (Paso 5)
    document.addEventListener("submit", (e) => {
        if (e.target && e.target.id === "form-reserva") {
            e.preventDefault();

            const nombre = document.getElementById("reserva-nombre").value;
            const telefono = document.getElementById("reserva-telefono").value;
            const servicio = document.getElementById("reserva-servicio").value;
            const fecha = document.getElementById("reserva-fecha").value;
            const hora = document.getElementById("reserva-hora").value;
            const direccion = document.getElementById("reserva-direccion").value;
            const mensajeDiv = document.getElementById("reserva-mensaje");

            if (!nombre || !telefono || !servicio || !fecha || !hora || !direccion) {
                mensajeDiv.className = "alert alert-danger mt-3";
                mensajeDiv.textContent = "Por favor, complete todos los datos de la reserva.";
                mensajeDiv.classList.remove("d-none");
                return;
            }

            const nuevaCita = {
                id: Date.now(),
                nombre,
                telefono,
                servicio,
                fecha,
                hora,
                direccion,
                estado: "Pendiente"
            };

            // Guardar en localStorage
            const citasGuardadas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
            citasGuardadas.push(nuevaCita);
            localStorage.setItem("citas_estudio", JSON.stringify(citasGuardadas));

            // Feedback al usuario
            mensajeDiv.className = "alert alert-success mt-3";
            mensajeDiv.textContent = "¡Cita agendada con éxito! Nos pondremos en contacto para confirmar.";
            mensajeDiv.classList.remove("d-none");

            e.target.reset();
        }
    });
}