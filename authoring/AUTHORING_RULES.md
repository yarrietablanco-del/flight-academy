# Reglas para la fábrica de lecciones

1. Lee `AGENTS.md`, el schema y el registro de currículo antes de generar.
2. Genera un solo JSON por lección en `content/lessons/<id>.json` y recursos SVG en `content/assets/` cuando sean pedagógicamente exactos.
3. Cada paso contiene una acción MSFS, resultado esperado y visual. Para hardware/cockpit/cartas sin referencia fiable usa `requiresReference: true`; no inventes.
4. Máximo 420 caracteres por bloque de texto editorial; divide instrucciones complejas en pasos.
5. Antes de marcar validada ejecuta `node authoring/validate-content.mjs --lesson <id>`.
6. No cambies la UI ni el currículo salvo los archivos de lección/asset requeridos para la lección solicitada.
7. Tras pasar validación, actualiza el estado editorial en `curriculum/curriculum.json` a `validated`. Solo el mantenedor publica a `published`.
