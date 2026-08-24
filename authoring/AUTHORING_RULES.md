# Flight Academy Authoring Standard 1.0

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
