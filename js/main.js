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
    renderizarPaginaPrincipal();
    configurarEventos();
});

function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario_activo"));
}

function inicializarSesion() {
    const usr = obtenerUsuario();
    const lbl = document.getElementById("usuario-sesion");
    const btnL = document.getElementById("btn-login-modal");
    const btnO = document.getElementById("btn-logout");

    if (usr) {
        lbl.textContent = usr.rol === 'admin' ? "👑 Modo Administradora" : `✨ Hola, ${usr.nombre}`;
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

    // Si es Administradora, va directo al panel sin la introducción comercial ni servicios públicos
    if (esAdmin) {
        html += `
            <div class="p-4 mb-4 bg-white rounded-4 shadow-sm border d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold text-rose-dark mb-1">Panel de Control - Lashes Rose's Studio</h2>
                    <p class="text-muted mb-0 small">Bienvenida, Administradora. Aquí puedes gestionar la agenda de citas de tus clientas.</p>
                </div>
                <button onclick="cerrarSesionCliente()" class="btn btn-outline-danger btn-sm rounded-pill">Cerrar Sesión</button>
            </div>
        `;
        html += renderizarTablaCitas("Agenda General de Citas", true);
        app.innerHTML = html;
        return;
    }

    // Vista normal para Invitadas o Clientas
    html += `
        <section class="p-5 mb-4 bg-white rounded-4 shadow-sm border text-center">
            <h1 class="fw-bold text-rose-dark mb-3">🌸 Lashes Rose's Studio</h1>
            <p class="lead text-muted mx-auto" style="max-width: 750px;">
                Servicios profesionales de belleza a domicilio. Nos acoplamos a tus necesidades y estilo de vida, 
                ahorrándote tiempo y brindándote una experiencia cómoda y personalizada directamente en tu hogar.
            </p>
            <hr class="my-4 w-25 mx-auto border-rose">
            <div class="row text-start mt-4 g-4">
                <div class="col-md-4"><div class="p-3 border rounded-3 h-100 bg-light"><h6 class="fw-bold text-rose-dark">⏱️ Ahorro de Tiempo</h6><p class="small text-muted mb-0">Disfruta de tratamientos de alta calidad sin traslados ni filas.</p></div></div>
                <div class="col-md-4"><div class="p-3 border rounded-3 h-100 bg-light"><h6 class="fw-bold text-rose-dark">🏠 Comodidad en Casa</h6><p class="small text-muted mb-0">Llevamos todo el equipo necesario para consentirte en tu propio espacio.</p></div></div>
                <div class="col-md-4"><div class="p-3 border rounded-3 h-100 bg-light"><h6 class="fw-bold text-rose-dark">📅 Reserva Ágil</h6><p class="small text-muted mb-0">Elige tu servicio favorito y agenda tu cita de inmediato.</p></div></div>
            </div>
        </section>
    `;

    html += renderizarSeccionServicios();

    if (!usr) {
        html += `
            <section class="my-5 p-5 bg-white rounded-4 shadow-sm border">
                <h3 class="fw-bold text-rose-dark mb-4 text-center">¿Cómo Agendar Tu Cita a Domicilio?</h3>
                <div class="row g-4">
                    <div class="col-md-4 text-center"><div class="p-3 border rounded-3 h-100 bg-light"><span class="fs-2 text-rose-dark fw-bold">1</span><h6 class="fw-bold mt-2">Elige tu Servicio</h6><p class="small text-muted mb-0">Haz clic en <strong>Reservar</strong> en el servicio que prefieras.</p></div></div>
                    <div class="col-md-4 text-center"><div class="p-3 border rounded-3 h-100 bg-light"><span class="fs-2 text-rose-dark fw-bold">2</span><h6 class="fw-bold mt-2">Identifícate</h6><p class="small text-muted mb-0">Ingresa tu número de teléfono celular.</p></div></div>
                    <div class="col-md-4 text-center"><div class="p-3 border rounded-3 h-100 bg-light"><span class="fs-2 text-rose-dark fw-bold">3</span><h6 class="fw-bold mt-2">¡Listo para Agendar!</h6><p class="small text-muted mb-0">Selecciona tu fecha, hora disponible y dirección exacta en casa.</p></div></div>
                </div>
            </section>
        `;
    } else if (usr && usr.rol === "cliente") {
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

function renderizarSeccionServicios() {
    let html = `<section id="servicios" class="my-5"><h2 class="text-center fw-bold text-rose-dark mb-4">Nuestros Servicios</h2><div class="row g-4">`;
    ["Pestañas", "Cejas", "Uñas"].forEach(cat => {
        const sub = listaServicios.filter(s => s.categoria === cat);
        html += `<div class="col-lg-4 col-md-6"><div class="card h-100 border-0 shadow-sm rounded-4 border-top border-4 border-rose overflow-hidden"><div class="card-header bg-rose-pastel text-center py-3"><h4 class="fw-bold text-rose-dark mb-0">${cat}</h4></div><div class="card-body p-4"><ul class="list-group list-group-flush">`;
        sub.forEach((s, idx) => {
            html += `<li class="list-group-item px-0 py-3 ${idx !== sub.length - 1 ? 'border-bottom' : ''}"><div class="d-flex justify-content-between align-items-center mb-1"><h6 class="fw-bold mb-0">${s.nombre}</h6><span class="fs-5 fw-bold text-rose-dark">$${s.precio.toFixed(2)}</span></div><p class="text-muted small mb-2">${s.descripcion}</p><button onclick="intentarReservar('${s.nombre}')" class="btn btn-rose btn-sm rounded-pill px-3">Reservar</button></li>`;
        });
        html += `</ul></div></div></div>`;
    });
    html += `</div></section>`;
    return html;
}

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
                <div class="col-12"><label class="form-label fw-semibold">Dirección de Domicilio</label><textarea id="reserva-direccion" class="form-control" rows="2" required placeholder="Ingresa tu dirección exacta"></textarea></div>
                <div class="col-12"><div class="form-check p-3 bg-light rounded-3 border"><input class="form-check-input mt-1" type="checkbox" id="check-autorizacion" checked><label class="form-check-label small text-muted" for="check-autorizacion">🔒 <strong>Autorización de datos:</strong> ¿Guardar datos para agilizar tu próxima cita?</label></div></div>
                <div class="col-12 d-flex justify-content-between align-items-center"><button type="button" onclick="cerrarSesionCliente()" class="btn btn-outline-secondary btn-sm rounded-pill">Cambiar de número</button><button type="submit" class="btn btn-rose-lg rounded-pill px-4">Confirmar y Agendar Cita</button></div>
            </form>
            <div id="reserva-mensaje" class="mt-3"></div>
        </section>
    `;
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
            html += `<td>${c.servicio}</td><td>${c.fecha} - ${c.hora} hrs</td><td><small>${c.direccion}</small></td><td><span class="badge ${badge}">${c.estado}</span></td><td>`;
            if (esAdmin) {
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

function cambiarEstadoCita(id, estado) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citas = citas.map(c => c.id === id ? { ...c, estado } : c);
    localStorage.setItem("citas_estudio", JSON.stringify(citas));
    renderizarPaginaPrincipal();
}

function eliminarCita(id) {
    let citas = JSON.parse(localStorage.getItem("citas_estudio")) || [];
    citas = citas.filter(c => c.id !== id);
    localStorage.setItem("citas_estudio", JSON.stringify(citas));
    renderizarPaginaPrincipal();
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
            document.getElementById("paso-nuevo-registro").classList.add("d-none");
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
                localStorage.setItem("usuario_activo", JSON.stringify(enc));
                bootstrap.Modal.getInstance(mLogin).hide();
                inicializarSesion(); renderizarPaginaPrincipal();
            } else {
                document.getElementById("paso-busqueda").classList.add("d-none");
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