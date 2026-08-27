# Flight Academy Authoring Standard 1.0

## Refinamiento transversal y auditorÃ­a de uso

13. Aplica la prueba de dos segundos a cada visual: un alumno nuevo debe identificar quÃ© mira, el orden y el cambio esperado. Un visual conserva un solo objetivo; divide cualquier diagrama que mezcle decisiones, perspectivas o secuencias. Conceptual no significa tosco: una aeronave debe tener silueta, perspectiva y sentido de movimiento inequÃ­vocos.
14. Toda acciÃ³n de reconocimiento de interfaz (MSFS/EFB, G1000, PFD/MFD, MCDU, FCU, ND, ECAM, VelocityOne, carta, diagrama o vista exterior) exige referencia `real` o `recreated-faithful`, zona de atenciÃ³n, resultado esperado y zoom. Sin fuente fiel, usa `requiresReference: true`; no inventes la interfaz.
15. Cartas, mapas y diagramas se enseÃ±an por capas: documento y vigencia, parte usada hoy, significado, orden de lectura, acciÃ³n en MSFS y comprobaciÃ³n. Un diagrama conceptual no sustituye una carta. En aeropuerto diferencia rampa/gate, calles, intersecciones, espera, pista, hotspots y frecuencias cuando correspondan.
16. La prÃ¡ctica debe aislar una observaciÃ³n comprobable. Declara factores de confusiÃ³n y un resultado visible que demuestre el concepto, no solo una secuencia plausible.
17. Toda promesa posterior enlaza una lecciÃ³n existente o declara su alcance. Para velocidades y performance no uses valores universales: identifica variante, POH y condiciones. El recorrido C172 prepara Vx, Vy y performance; el A320 prepara V1, VR, V2, performance, MCDU y PFD sin adelantar lecciones planned.
18. Desde nivel 4, reemplaza paredes de texto por lectura guiada, visuales ampliables y trazabilidad explÃ­cita de continuidad, referencias operativas y aislamiento de prÃ¡ctica.

Este estándar es obligatorio para `author:next`, `author:batch` y toda edición de una lección. Enseña a una persona sin experiencia a practicar un Airbus A320 o C172 en MSFS 2024 con Xbox y VelocityOne sin presentar simulación como procedimiento real.

1. Lee `AGENTS.md`, este estándar, `lesson-schema.json` y el currículo antes de generar. Genera únicamente la lección solicitada y sus assets necesarios; no alteres el currículo ni la UI.
2. Enseña primero el porqué y después el cómo. Cada paso debe decir qué tocar o mirar, qué resultado esperar y qué hacer si no coincide. Mantén los bloques bajo 420 caracteres.
3. Toda lección contiene objetivo, práctica, checklist, quiz, criterios de finalización y fuentes. La práctica es simulación: no inventes valores, procedimientos reales, cartas, perfiles o asignaciones de hardware.
4. Usa `visualStandardVersion: 3`. Cada visual declara su contrato: propósito, `primaryTeachingObjective`, qué observa, qué reconoce y qué hace después. Un visual existe solo si mejora la acción del paso.
5. Un visual tiene un objetivo pedagógico principal. No mezcles pitch, roll, yaw, trim u otros conceptos en el visual principal salvo que la comparación sea exactamente el objetivo; en ese caso usa un `comparisonDiagram` y justifica `comparisonJustification`.
6. Todo visual conceptual declara `perspective`, `movingElement`, `axisOfMovement` y `directionOfMovement`. Para movimientos: yaw se ve desde arriba, pitch de lado y roll de frente o detrás. Un flujo no físico declara explícitamente que esos campos no aplican.
7. `conceptual` explica una relación. `reference` permite reconocer algo real de MSFS, cockpit, hardware, carta, aeropuerto o vista exterior. Una referencia es `real` o `recreated-faithful`, tiene asset, calidad, zoom y objetivo de detalle; un conceptual nunca sustituye reconocimiento operativo.
8. Cada paso V3 declara `requiredVisualCoverage`. Todo tipo `required` (`cockpit`, `instrument`, `hardware`, `chart`, `exteriorView` o `airport`) necesita una referencia fiel con cobertura equivalente. `notRequired` exige una razón concreta.
9. Prioriza claridad sobre cantidad. Elimina o reemplaza visuales decorativos, repetidos, ambiguos o que exijan una explicación mayor que el concepto. En una mirada de dos segundos debe ser evidente el objetivo.
10. La práctica declara `conceptDemonstrated`, `possibleConfounders` y `whyThisExerciseDemonstratesTheConcept`. Debe aislar el concepto y no contradecir la explicación: por ejemplo, no enseñes yaw aerodinámico con una prueba detenido en tierra, porque puede confundirse con steering de rueda de nariz.
11. Para VelocityOne, confirma perfil y acción en MSFS/FMD antes de afirmar una asignación. Para cabinas, hardware y cartas sin referencia fiable usa `requiresReference: true`; nunca inventes una disposición.
12. Antes de marcar una lección validada ejecuta `npm run validate:content`, `npm test`, `npm run lint` y `npm run build`. El mantenedor decide cuándo cambia el estado editorial a `published`.
