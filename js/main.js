// Arreglo de servicios reales de Lashes Rose's Studio
const listaServicios = [
    { id: 1, categoria: "Pestañas", nombre: "Extensiones Clásicas", precio: 25.00, descripcion: "Aplicación pelo a pelo para una mirada natural y delicada." },
    { id: 2, categoria: "Pestañas", nombre: "Extensiones Volumen", precio: 40.00, descripcion: "Abundancia y mayor densidad para un efecto glamuroso e impactante." },
    { id: 3, categoria: "Cejas", nombre: "Laminado de Cejas", precio: 15.00, descripcion: "Diseño, peinado y fijación semipermanente para cejas perfiladas." },
    { id: 4, categoria: "Cejas", nombre: "Depilación de Cejas", precio: 5.00, descripcion: "Limpieza y perfilado de cejas según la forma de tu rostro." },
    { id: 5, categoria: "Uñas", nombre: "Uñas Acrílicas Naturales", precio: 15.00, descripcion: "Estructura acrílica con acabado limpio, natural y elegante." },
    { id: 6, categoria: "Uñas", nombre: "Manicure", precio: 10.00, descripcion: "Cuidado completo de uñas y cutículas con hidratación." },
    { id: 7, categoria: "Uñas", nombre: "Pedicure", precio: 12.00, descripcion: "Tratamiento y estética para pies impecables y descansados." },
    { id: 8, categoria: "Uñas", nombre: "Esmaltado Permanente", precio: 10.00, descripcion: "Color duradero en uña natural con secado en lámpara UV/LED." }
];

document.addEventListener("DOMContentLoaded", () => {
    inicializarSesion();
    renderizarServicios();
    renderizarFormularioReserva();
    renderizarMisCitas();
    configurarEventos();
});

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

// Renderizado agrupado en únicamente 3 Cajas/Contenedores principales
function renderizarServicios() {
    const contenedorApp = document.getElementById("app-content");

    // Agrupar los servicios por categoría
    const categorias = ["Pestañas", "Cejas", "Uñas"];

    let html = `
        <section id="servicios" class="my-5">
            <h2 class="text-center fw-bold text-rose-dark mb-4">Nuestros Servicios y Precios</h2>
            <div class="row g-4">
    `;

    categorias.forEach((cat) => {
        const serviciosDeCategoria = listaServicios.filter(s => s.categoria === cat);

        html += `
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 border-0 shadow-sm rounded-4 border-top border-4 border-rose overflow-hidden">
                    <div class="card-header bg-rose-pastel text-center py-3">
                        <h4 class="fw-bold text-rose-dark mb-0">${cat}</h4>
                    </div>
                    <div class="card-body p-4 d-flex flex-column justify-content-between">
                        <ul class="list-group list-group-flush">
        `;

        serviciosDeCategoria.forEach((servicio, index) => {
            html += `
                <li class="list-group-item px-0 py-3 ${index !== serviciosDeCategoria.length - 1 ? 'border-bottom' : ''}">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <h6 class="fw-bold mb-0">${servicio.nombre}</h6>
                        <span class="fs-5 fw-bold text-rose-dark">$${servicio.precio.toFixed(2)}</span>
                    </div>
                    <p class="text-muted small mb-2">${servicio.descripcion}</p>
                    <a href="#reservas" onclick="seleccionarServicio('${servicio.nombre}')" class="btn btn-rose btn-sm rounded-pill px-3">Reservar</a>
                </li>
            `;
        });

        html += `
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </section>
        <div id="seccion-reserva-container"></div>
        <div id="seccion-citas-container"></div>
    `;

    contenedorApp.innerHTML = html;
}

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

function renderizarMisCitas() {
    const contenedorCitas = document.getElementById("seccion-citas-container");
    const citasGuardadas = JSON.parse(localStorage.getItem("citas_estudio")) || [];

    let html = `
        <section id="mis-citas" class="my-5 p-4 bg-white rounded-4 shadow-sm border">
            <h3 class="fw-bold text-rose-dark mb-4 text-center">Mis Citas Agendadas</h3>
    `;

    if (citasGuardadas.length === 0) {
        html += `<p class="text-center text-muted">No tienes citas registradas actualmente.</p>`;
    } else {
        html += `
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="bg-rose-pastel">
                        <tr>
                            <th>Cliente</th>
                            <th>Servicio</th>
                            <th>Fecha y Hora</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        citasGuardadas.forEach((cita) => {
            html += `
                <tr>
                    <td class="fw-bold">${cita.nombre} <br><small class="text-muted">${cita.telefono}</small></td>
                    <td>${cita.servicio}</td>
                    <td>${cita.fecha} - ${cita.hora}</td>
                    <td><small>${cita.direccion}</small></td>
                    <td><span class="badge bg-warning text-dark">${cita.estado}</span></td>
                    <td>
                        <button onclick="eliminarCita(${cita.id})" class="btn btn-outline-danger btn-sm rounded-pill">Cancelar</button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    }

    html += `</section>`;
    contenedorCitas.innerHTML = html;
}

function seleccionarServicio(nombreServicio) {
    const select = document.getElementById("reserva-servicio");
    if (select) select.value = nombreServicio;
}

function eliminarCita(idCita) {
    let citasGuardadas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citasGuardadas = citasGuardadas.filter(c => c.id !== idCita);
    localStorage.setItem("citas_estudio", JSON.stringify(citasGuardadas));
    renderizarMisCitas();
}

function configurarEventos() {
    const formLogin = document.getElementById("form-login");
    const btnLogout = document.getElementById("btn-logout");

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

    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario_activo");
        inicializarSesion();
    });

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

            const citasGuardadas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
            citasGuardadas.push(nuevaCita);
            localStorage.setItem("citas_estudio", JSON.stringify(citasGuardadas));

            mensajeDiv.className = "alert alert-success mt-3";
            mensajeDiv.textContent = "¡Cita agendada con éxito! Nos pondremos en contacto para confirmar.";
            mensajeDiv.classList.remove("d-none");

            e.target.reset();
            renderizarMisCitas();
        }
    });
}