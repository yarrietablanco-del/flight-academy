# Flight Academy: instrucciones permanentes

Flight Academy enseña a una persona sin conocimientos de aviación a operar de forma realista un Airbus A320 en Microsoft Flight Simulator 2024 sobre Xbox Series X con Turtle Beach VelocityOne Flight.

## Estándar editorial

- Enseña primero el **por qué** y después el **cómo**.
- El español debe ser claro; introduce terminología aeronáutica progresivamente y defínela al usarla.
- Cada acción debe poder realizarse inmediatamente en MSFS 2024.
- No escribas capítulos largos ni contenido superficial. Divide la acción en pasos cortos, verificables y visuales.
- Cada lección completa necesita objetivo, práctica, checklist, quiz, criterios de finalización y fuentes.
- Cada paso debe explicar qué tocar/mirar, qué resultado esperar y qué hacer si no coincide.
- Diferencia siempre práctica de simulación y procedimiento real cuando sea relevante.

## Precisión y visuales

- No inventes valores técnicos, posiciones de controles, asignaciones del VelocityOne ni cartas aeronáuticas.
- Marca `requiresReference: true` si un visual o dato requiere una referencia real que no está disponible.
- Hardware real, cabinas reales y cartas tienen prioridad de exactitud sobre decoración.
- Los visuales pedagógicos SVG deben representar una relación concreta: movimiento, instrumento, flujo, trayectoria o comparación. Nunca uses placeholders, emojis o diagramas sin leyenda como sustituto de una referencia.
- Para VelocityOne confirma perfil y acción en MSFS/FMD antes de afirmar una asignación.

## Arquitectura

- La UI React renderiza documentos JSON desde `/content/lessons`; no agregues contenido educativo hardcodeado a componentes React.
- El mapa editorial vive en `/curriculum/curriculum.json` y su estado (`planned`, `generated`, `validated`, `published`) es independiente del progreso del estudiante.
- Usa el schema y las reglas de `/authoring` antes de publicar una lección.
- Ejecuta `npm run validate:content`, `npm run lint` y `npm run build` antes de declarar una lección validada.
