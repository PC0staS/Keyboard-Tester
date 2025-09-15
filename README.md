# Fast Keyboard Tester

Tester de teclado rápido hecho con React + Vite + Tailwind. Detecta las teclas por su posición física usando `event.code` y pinta el estado de cada tecla al presionarla.

## ✨ Características

- Detección por posición física con `event.code` (no por carácter), ideal para distintos layouts.
- Distribución en filas: función/escape, fila superior, QWERTY, ASDF, ZXCV, inferior, navegación y numpad (dividido en filas compactas).
- Estados visuales:
  - Azul: tecla actualmente pulsada (activa)
  - Verde: tecla ya probada (se pulsó al menos una vez)
- Evita el scroll y navegación del navegador al usar Space/Arrows/Home/End/PageUp/PageDown mientras pruebas.
- Indicador del último evento: `code`, `key` y modificadores (Ctrl/Shift/Alt/Meta).
- Botón para resetear el historial de teclas probadas.

## 🧠 ¿Cómo funciona?

- Se escuchan los eventos `keydown` y `keyup` del `window` y se usa `event.code` como identificador. Esto refleja la posición física de la tecla en el teclado (por ejemplo, `KeyA`, `Digit1`, `NumpadEnter`).
- En el render, se muestra una etiqueta legible a partir del `code` (por ejemplo `KeyA → A`, `Digit1 → 1`, `NumpadAdd → +`).
- `keydown` añade la tecla a:
  - `activeKeys` (mientras está pulsada)
  - `testedKeys` (histórico de teclas ya probadas)
- `keyup` elimina la tecla de `activeKeys`.
- Cuando la ventana pierde el foco (`blur`), se limpia `activeKeys` para evitar “teclas atascadas”.

## ⌨️ Filas de teclado incluidas

- Escape y funciones: `Escape`, `F1…F12`, `PrintScreen`, `ScrollLock`, `Pause`
- Fila superior: `IntlBackslash`, `Digit1…Digit0`, `Minus`, `Equal`, `Backspace`
- QWERTY: `Tab`, `KeyQ…KeyP`, `BracketLeft`, `BracketRight`, `Backslash`
- ASDF: `CapsLock`, `KeyA…KeyL`, `Semicolon`, `Quote`, `Enter`
- ZXCV: `ShiftLeft`, `KeyZ…KeyM`, `Comma`, `Period`, `Slash`, `ShiftRight`, `ArrowUp`
- Inferior: `ControlLeft`, `MetaLeft`, `AltLeft`, `Space`, `AltRight`, `MetaRight`, `ControlRight`, `ArrowLeft`, `ArrowDown`, `ArrowRight`, `Delete`, `Insert`
- Navegación: `Home`, `End`, `PageUp`, `PageDown`
- Numpad (dividido en filas):
  - `NumLock`, `NumpadDivide`, `NumpadMultiply`, `NumpadSubtract`
  - `Numpad7`, `Numpad8`, `Numpad9`, `NumpadAdd`
  - `Numpad4`, `Numpad5`, `Numpad6`
  - `Numpad1`, `Numpad2`, `Numpad3`, `NumpadEnter`
  - `Numpad0`, `NumpadDecimal`
- Funciones extendidas: `F13…F24`

Ten en cuenta que algunas teclas dependen del hardware/SO/navegador y pueden no disparar eventos (por ejemplo, `PrintScreen` en macOS).

## 🚀 Ejecutar en local

Requisitos: Node.js 18+ (o Bun/Pnpm/Yarn si prefieres). Instala dependencias y levanta el servidor de desarrollo.

Con npm:

```bash
npm install
npm run dev
```

Con pnpm:

```bash
pnpm install
pnpm dev
```

Con bun:

```bash
bun install
bun dev
```

Build y preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## 🧩 Pila técnica

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- ESLint (config React)

## 📝 Notas y limitaciones

- `event.code` describe la posición física de la tecla (por ejemplo `KeyZ`) y no el carácter (`z`/`y`). Esto es ideal para testers físicos y distintos layouts.
- Algunas teclas especiales pueden no emitir eventos en ciertos navegadores o SO (por ejemplo `PrintScreen` en macOS).
- La tecla `Meta` (Windows/Command) se muestra como "Windows/Command" y su comportamiento puede variar en cada plataforma.
- Para añadir o reordenar filas, edita `keyRows` en `src/App.tsx`.

## 🛠️ Personalización rápida

- Cambiar colores o tamaños: ajusta clases Tailwind en `src/App.tsx`.
- Añadir más teclas o layouts internacionales: agrega nuevas filas/códigos a `keyRows`. Puedes consultar la lista de `KeyboardEvent.code` en MDN.
- Si quieres evitar o permitir el scroll al probar, ajusta la función `shouldPreventDefault` en `src/App.tsx`.

## 🤝 Contribuir

Sugerencias y PRs son bienvenidas. Si reportas un problema, incluye tu SO, navegador, y el `event.code`/`event.key` implicado.

## 📄 Licencia

Este proyecto se distribuye "tal cual" para uso educativo/demostrativo. Añade tu licencia preferida (por ejemplo MIT) si lo publicas.
