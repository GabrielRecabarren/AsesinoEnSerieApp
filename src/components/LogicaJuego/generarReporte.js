// Función para generar y enviar el reporte
const generarReporte = () => {
    // Obtener y procesar los eventos del día
    const eventosDelDia = obtenerEventosDelDia();

    // Formatear el reporte
    const reporte = formatearReporte(eventosDelDia);

    // Enviar el reporte al chat
    enviarReporteAlChat(reporte);
}

// Función para programar la generación del reporte
const programarGeneracionDeReporte = () => {
    setInterval(() => {
        if (partidaEnCurso) {
            generarReporte();
        }
    }, 24 * 60 * 60 * 1000); // Generar el reporte cada 24 horas
}

// Llamar a la función para programar la generación del reporte
programarGeneracionDeReporte();
