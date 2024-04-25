const textosPorRol = {
    DEFAULT : {
        pregunta: "",
        preguntaDestino: "",
        accion: "",
        recordatorio: "",
        recordatorioDestino: "",
        instrucciones: ""
    },
    VICTIMA : {
        pregunta: "",
        preguntaDestino: "",
        accion: "",
        recordatorio: "",
        recordatorioDestino: "",
        instrucciones: "Juega y evita morir."
    },
    ASESINO: {
        pregunta: "¿A quién intentarás asesinar hoy?",
        preguntaDestino: "¿Te están asesinando?",
        accion: "Asesinar",
        recordatorio: "Recuerda que debes asesinar con tu CÓMPLICE",
        recordatorioDestino: "Recuerda que sólo pueden matarte el ASESINO y el CÓMPLICE estando JUNTOS, sino NO PUEDEN MATARTE.",
        instrucciones: "ASESINO y CÓMPLICE deben planear su crimen. Una vez elegida su victima, aprovecharán el momento preciso. Existe absoluta libertad en cuanto al ambiente que quisieran generar (cartas de amenzada, hostigamiento sicológico, mensajitos en el casillero, pitanzas a altas horas de la madrugada, sábanas cortas, dulces de ajo, entre otras atrocidades que puedan germinar de una mente criminal). NO SE VALE MUERTE REAL. La manera de cometer el Crimen es mostrar la tarjeta del asesino a la víctima, enunciando alguna frase como 'Estas Muerto', 'Llegó tu hora', 'despídete', entre otras que pudieren suscitar la sensación de muerte. La tarjeta puede ser mostrada por el ASESINO o por el CÓMPLICE. Si eres ASESINO es importante que no haya testigos en la escena, pues en caso de ser vista por otros jugadores, o testigos comunes, el juicio será inminente ¡Los habrán descubierto! Asesino y Cómplice pueden asesinar sólo 1 vez por día."
    },
    MEDICO: {
        pregunta: "¿A quién deseas ayudar hoy?",
        accion: "Salvar",
        recordatorio: "Recuerda usar tu habilidad de salvar durante hoy.",
        preguntaDestino: "¿Recibiste una visita del doctor?",
        recordatorioDestino: "La visita del doctor es como un seguro de vida. Si ya te asesinaron, o te asesinan, te salvarás (Hasta el reporte de hoy).",
        instrucciones: "Si tu rol es MÉDICO, una vez al día podrás mostrar tu carta a cualquier otro jugador con objetivo de evitar su asesinato. Esto significa que a la hora de escribir la carta de despedida, el jugador podrá decir que 'El MÉDICO me salvó justo antes de desangrarme', o 'llegó justo a tiempo, antes de morir', entre otras cosas que se le ocurran. Tendrá la información privilegiada sobre sus verdugos, pero cuidado, también se convertirá en el primer objetivo del ASESINO y su COMPLICE al siguiente día."
    },
    PERIODISTA: {
        pregunta: "¿A quién deseas investigar hoy?",
        accion: "Investigar",
        recordatorio: "Recuerda usar tu habilidad de investigar durante hoy.",
        preguntaDestino: "¿Fuiste entrevistado hoy por el periodista?",
        recordatorioDestino: "Recuerda que tus respuestas pueden influir en la percepción de los demás jugadores.",
        instrucciones: "Como PERIODISTA, tendrás la oportunidad de entrevistar a un jugador una vez al día, mostrándole tu carta. Podrás hacer preguntas como '¿Dónde estuviste ayer en la tarde?', '¿Cuál es tu color favorito?', '¿Con quién andabas a la hora de almuerzo?'. Luego podrás hacer una nota acerca de la entrevista y publicarla en el medio oficial, junto a los eventos del día. Tienes un gran poder, ya que un lector podría encontrar una incongruencia en el relato del entrevistado, lo que podría delatar al ASESINO. O si eres CÓMPLICE, podrías manipular la información ocultando algunos detalles y resaltando otros para tu conveniencia."
    },
    FISCAL: {
        pregunta: "¿A quién deseas investigar hoy?",
        accion: "Investigar",
        recordatorio: "Recuerda usar tu habilidad de investigar durante hoy.",
        preguntaDestino: "¿Has llevado a juicio a alguien hoy?",
        recordatorioDestino: "Recuerda que puedes participar en dos juicios por día, siempre y cuando otros jugadores participantes no hayan participado en más juicios ese día.",
        instrucciones: "Como FISCAL, tendrás la responsabilidad de investigar los crímenes que ocurren en la partida. Podrás participar en dos juicios por día, siempre y cuando otros jugadores participantes no hayan participado en más juicios ese día."
    },
    MANIACO: {
        pregunta: "¿A quién deseas atacar hoy?",
        accion: "Atacar",
        recordatorio: "Recuerda que puedes asesinar sin necesidad de un CÓMPLICE.",
        preguntaDestino: "¿Alguien te ha atacado hoy?",
        recordatorioDestino: "Recuerda que cada muerte en vano te acercará más a la derrota y confundirá a los demás jugadores.",
        instrucciones: "Si eres el MANIACO, tu objetivo es asesinar al ASESINO. Actúas solo y puedes usar tu acción de asesinar una vez al día, al igual que el ASESINO. Sin embargo, debes tener cuidado, ya que cada muerte en vano te acercará más a la derrota y confundirás a los demás jugadores, desviando la atención de los verdaderos criminales. Si eres seleccionado como CÓMPLICE por el ASESINO, primará tu rol de CÓMPLICE sobre los demás, lo que significa que podría haber una partida sin MANIACO, sin afectar las reglas básicas del juego."
    },
    DETECTIVE: {
        pregunta: "¿A quién deseas interrogar hoy?",
        accion: "Interrogar",
        recordatorio: "Recuerda usar tu habilidad de interrogar durante hoy.",
        preguntaDestino: "¿Alguien ha intentado descubrir tu rol hoy?",
        recordatorioDestino: "Recuerda que eres el objetivo más importante para el ASESINO y su CÓMPLICE.",
        instrucciones: "Como DETECTIVE, tu papel será fundamental para atrapar al ASESINO. Cada día, al inicio de la partida, podrás exigir ver la carta de algún jugador en solitario y de manera discreta, corroborando su rol en la partida. Esto te permitirá gestionar un juicio en caso de haber descubierto al asesino o ir acotando tus sospechas. Pero cuidado, aún estás expuesto a ser asesinado, ya que eres el objetivo más importante; sin ti, el plan criminal será más fácil. Si eres seleccionado como CÓMPLICE por el ASESINO, primará tu rol de CÓMPLICE sobre los demás, lo que significa que podría haber una partida sin DETECTIVE, sin afectar las reglas básicas del juego."
    },
    COMPLICE: {
        pregunta: "¿A quién deseas ayudar hoy?",
        accion: "Ayudar",
        recordatorio: "Recuerda usar tu habilidad de ayudar durante hoy.",
        preguntaDestino: "¿Has estado en colaboración con el asesino hoy?",
        recordatorioDestino: "Recuerda que trabajar en conjunto con el asesino puede llevar a la victoria, pero también al descubrimiento.",
        instrucciones: "El cómplice trabaja en conjunto con el asesino para llevar a cabo los asesinatos sin ser descubiertos."
    }

};

export default textosPorRol;
