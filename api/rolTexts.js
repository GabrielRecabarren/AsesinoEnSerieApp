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
        recordatorioDestino: "Recuerda que sólo pueden matarte el ASESINO y el CÓMPLICE estando JUNTOS.",
        instrucciones: "ASESINO y CÓMPLICE deben planear su crimen. Una vez elegida su victima, aprovecharán el momento preciso. Existe absoluta libertad en cuanto al ambiente que quisieran generar (cartas de amenzada, hostigamiento sicológico, mensajitos en el casillero, pitanzas a altas horas de la madrugada, sábanas cortas, dulces de ajo, entre otras atrocidades que puedan germinar de una mente criminal). NO SE VALE MUERTE REAL. La manera de cometer el Crimen es mostrar la tarjeta del asesino a la víctima, enunciando alguna frase como 'Estas Muerto', 'Llegó tu hora', 'despídete', entre otras que pudieren suscitar la sensación de muerte. La tarjeta puede ser mostrada por el ASESINO o por el CÓMPLICE. Si eres ASESINO es importante que no haya testigos en la escena, pues en caso de ser vista por otros jugadores, o testigos comunes, el juicio será inminente ¡Los habrán descubierto! Asesino y Cómplice pueden asesinar sólo 1 vez por día."
    },
    MEDICO: {
        pregunta: "¿A quién deseas ayudar hoy?",
        accion: "Salvar",
        recordatorio: "Recuerda usar tu habilidad de salvar durante hoy.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "Si tu rol es MÉDICO, una vez al día podrás mostrar tu carta a cualquier otro jugador con objetivo de evitar su asesinato. Esto significa que a la hora de escribir la carta de despedida, el jugador podrá decir que 'El MÉDICO me salvó justo antes de desangrarme', o 'llegó justo a tiempo, antes de morir', entre otras cosas que se le ocurran. Tendrá la información privilegiada sobre sus verdugos, pero cuidado, también se convertirá en el primer objetivo del ASESINO y su COMPLICE al siguiente día."
    },
    FISCAL: {
        pregunta: "¿A quién deseas investigar hoy?",
        accion: "Investigar",
        recordatorio: "Recuerda usar tu habilidad de investigar durante hoy.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "Si tu rol es FISCAL, podrás estar en un juicio 2 veces en el día, siempre y cuando los demás jugadores participantes no hayan participado en más juicios ese día."
    },
    DETECTIVE: {
        pregunta: "¿A quién deseas interrogar hoy?",
        accion: "Interrogar",
        recordatorio: "Recuerda usar tu habilidad de interrogar durante hoy.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "Si eres el DETECTIVE tu papel será fundamental para atrapar al ASESINO. Cada día, iniciada la partida, podrás exigir ver la carta de alguno de los jugadores en solitario y de manera discreta (con la misma discreción que actúa el asesino), corroborando su rol en la partida. Así podrás gestionar un juicio en caso de haber descubierto al asesino, o ir acotando tus sospechas. Pero cuidado, aún estás expuesto a ser asesinado, ya que eres el objetivo más importante; sin ti, el plan criminal será más fácil...Si se diera el caso en que fuese seleccionado el DETECTIVE como CÓMPLICE por el ASESINO, primará el rol de CÓMPLICE por sobre los demás. Esto significa que podría haber una partida sin DETECTIVE, sin afectar las reglas básicas del juego."
    },
    MANIACO: {
        pregunta: "¿A quién deseas atacar hoy?",
        accion: "Atacar",
        recordatorio: "Recuerda que puedes asesinar sin necesidad de CÓMPLICE.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "Si tu rol es MANIACO, entonces eres un loco/a sediento de sangre y tu objetivo es asesinar al ASESINO. Para ello ni siquiera necesitas de un CÓMPLICE, actúas solo/a. Puedes usar tu accion de asesinar una vez al día, al igual que el ASESINO, pero mucho cuidado, cada muerte en vano te significará estar más cerca de la derrota y encima confundirás a la gente desviando la atención de los verdaderos criminales. Sé cauto con tu rol, podrías asesinar muchos inocentes. Si se diera el caso en que fuese seleccionado el MANIACO como CÓMPLICE por el ASESINO, primará el rol de CÓMPLICE por sobre los demás. Esto significa que podría haber una partida sin MANIACO, sin afectar las reglas básicas del juego."
    },
    PERIODISTA: {
        pregunta: "¿A quién deseas investigar hoy?",
        accion: "Investigar",
        recordatorio: "Recuerda usar tu habilidad de investigar durante hoy.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "Si tu rol es PERIODISTA, una vez al día podrás entrevistar a un jugador, mostrándole tu carta. Puedes preguntar cosas como: '¿Dónde estuviste ayer en la tarde?', '¿Cuál es tu color favorito?', '¿Con quién andabas a la hora de almuerzo?'. Luego podrás hacer una nota acerca de la entrevista y publicarla en el medio oficial, junto a los eventos del día. Tienes un gran poder, porque un lector podría encontrar una incongruencia en el relato del entrevistado/a, delatando al ASESINO. O si eres CÓMPLICE, podrías manipular la información ocultando algunos detalles y resaltando otros para tu conveniencia."
    },
    COMPLICE: {
        pregunta: "¿A quién deseas ayudar hoy?",
        accion: "Ayudar",
        recordatorio: "Recuerda usar tu habilidad de ayudar durante hoy.",
        preguntaDestino: "",
        recordatorioDestino: "",
        instrucciones: "El cómplice trabaja en conjunto con el asesino para llevar a cabo los asesinatos sin ser descubiertos."
    }
};

export default textosPorRol;
