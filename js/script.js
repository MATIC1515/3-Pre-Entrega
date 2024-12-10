function calcularGastos() {
    const diasViaje = parseInt(document.getElementById('diasViaje').value);
    const transporte = parseFloat(document.getElementById('transporte').value);
    const alojamiento = parseFloat(document.getElementById('alojamiento').value);
    const comida = parseFloat(document.getElementById('comida').value);
    const actividades = parseFloat(document.getElementById('actividades').value);

    if (isNaN(diasViaje) || isNaN(transporte) || isNaN(alojamiento) || isNaN(comida) || isNaN(actividades)) {
        mostrarMensajeError("Por favor, completa todos los campos correctamente.");
        return;
    }

    mostrarMensajeError("");

    const totalGastos = calcularTotal(diasViaje, transporte, alojamiento, comida, actividades);

    mostrarResultado(totalGastos);

    almacenarDatos(diasViaje, transporte, alojamiento, comida, actividades, totalGastos);

    limpiarFormulario();
}

function calcularTotal(dias, transporte, alojamiento, comida, actividades) {
    return transporte + (alojamiento * dias) + (comida * dias) + actividades;
}

function mostrarResultado(totalGastos) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = <h2>Total de Gastos: $${totalGastos.toFixed(2)}</h2>;
}

function mostrarMensajeError(mensaje) {
    const mensajeErrorDiv = document.getElementById('mensajeError');
    mensajeErrorDiv.innerText = mensaje;
}

function almacenarDatos(dias, transporte, alojamiento, comida, actividades, totalGastos) {
    const gastosViaje = {
        dias: dias,
        transporte: transporte,
        alojamiento: alojamiento,
        comida: comida,
        actividades: actividades,
        totalGastos: totalGastos
    };
    localStorage.setItem('gastosViaje', JSON.stringify(gastosViaje));
}

function recuperarDatos() {
    const datosAlmacenados = localStorage.getItem('gastosViaje');
    if (datosAlmacenados) {
        const gastosViaje = JSON.parse(datosAlmacenados);
        mostrarResultado(gastosViaje.totalGastos);
    }
}

function limpiarFormulario() {
    document.getElementById('formularioViaje').reset();
}

window.onload = recuperarDatos;