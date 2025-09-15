import React, { useEffect, useState } from "react";

export default function App() {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  // Códigos físicos de teclas (event.code)
  const keyRows = React.useMemo(
    () => [
      // Fila de función y escape
      [
        "Escape",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
        "PrintScreen",
        "ScrollLock",
        "Pause",
      ],
      // Fila superior
      [
        "IntlBackslash",
        "Digit1",
        "Digit2",
        "Digit3",
        "Digit4",
        "Digit5",
        "Digit6",
        "Digit7",
        "Digit8",
        "Digit9",
        "Digit0",
        "Minus",
        "Equal",
        "Backspace",
      ],
      // Fila QWERTY
      [
        "Tab",
        "KeyQ",
        "KeyW",
        "KeyE",
        "KeyR",
        "KeyT",
        "KeyY",
        "KeyU",
        "KeyI",
        "KeyO",
        "KeyP",
        "BracketLeft",
        "BracketRight",
        "Backslash",
      ],
      // Fila ASDF
      [
        "CapsLock",
        "KeyA",
        "KeyS",
        "KeyD",
        "KeyF",
        "KeyG",
        "KeyH",
        "KeyJ",
        "KeyK",
        "KeyL",
        "Semicolon",
        "Quote",
        "Enter",
      ],
      // Fila ZXCV
      [
        "ShiftLeft",
        "KeyZ",
        "KeyX",
        "KeyC",
        "KeyV",
        "KeyB",
        "KeyN",
        "KeyM",
        "Comma",
        "Period",
        "Slash",
        "ShiftRight",
        "ArrowUp",
      ],
      // Fila inferior
      [
        "ControlLeft",
        "MetaLeft",
        "AltLeft",
        "Space",
        "AltRight",
        "MetaRight",
        "ControlRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight",
        "Delete",
        "Insert",
      ],
      [],
      ["Home buttons"],
      [],
      // Navegación y edición
      ["Home", "End", "PageUp", "PageDown"],
      // Teclado numérico dividido en filas

      [],
      ["Numpad Botones del Numpad"],
      [],
      ["NumLock", "NumpadDivide", "NumpadMultiply", "NumpadSubtract"],
      ["Numpad7", "Numpad8", "Numpad9", "NumpadAdd"],
      ["Numpad4", "Numpad5", "Numpad6"],
      ["Numpad1", "Numpad2", "Numpad3", "NumpadEnter"],
      ["Numpad0", "NumpadDecimal"],
      // Funciones extendidas
      [
        "F13",
        "F14",
        "F15",
        "F16",
        "F17",
        "F18",
        "F19",
        "F20",
        "F21",
        "F22",
        "F23",
        "F24",
      ],
    ],
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.code;
      console.log(code);
      setKeysPressed((prev) => {
        if (prev.includes(code)) return prev;
        return [...prev, code];
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="text-4xl mt-6 font-bold">
        Welcome to the keyboard tester!
      </h1>
      <p className="mt-4 text-lg">Press any key to see if its working.</p>
      <div className="mt-6 flex flex-col gap-2">
        {keyRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap justify-center gap-2">
            {row.map((code, keyIdx) => (
              <div
                key={keyIdx}
                className={`rounded-md border border-gray-300 px-4 py-2 text-xl shadow-sm ${
                  keysPressed.includes(code) ? "bg-green-500" : ""
                } ${
                  code === "Home buttons"
                    ? "w-full text-center font-semibold border-0 shadow-none"
                    : ""
                } ${code === "Numpad Botones del Numpad" ? "w-full text-center font-semibold border-0 shadow-none" : ""}`}
              >
                {(() => {
                  // Mostrar nombres legibles
                  switch (code) {
                    case "Space":
                      return "SPACEBAR";
                    case "MetaLeft":
                    case "MetaRight":
                      return "Windows/Command";
                    case "ArrowUp":
                      return "↑";
                    case "ArrowDown":
                      return "↓";
                    case "ArrowLeft":
                      return "←";
                    case "ArrowRight":
                      return "→";
                    case "ShiftLeft":
                      return "Shift";
                    case "ShiftRight":
                      return "Shift";
                    case "ControlLeft":
                      return "Ctrl";
                    case "ControlRight":
                      return "Ctrl";
                    case "AltLeft":
                      return "Alt";
                    case "AltRight":
                      return "Alt";
                    case "Backquote":
                      return "`";
                    case "BracketLeft":
                      return "[";
                    case "BracketRight":
                      return "]";
                    case "IntlBackslash":
                      return "\\";
                    case "Semicolon":
                      return ";";
                    case "Quote":
                      return "'";
                    case "Comma":
                      return ",";
                    case "Period":
                      return ".";
                    case "Slash":
                      return "/";
                    case "CapsLock":
                      return "CapsLock";
                    case "Enter":
                      return "Enter";
                    case "Tab":
                      return "Tab";
                    case "Backspace":
                      return "Backspace";
                    case "Delete":
                      return "Delete";
                    case "Minus":
                      return "-";
                    case "Equal":
                      return "=";
                    default:
                      if (code.startsWith("Key"))
                        return code.replace("Key", "");
                      if (code.startsWith("Digit"))
                        return code.replace("Digit", "");
                      if (code.startsWith("Numpad"))
                        return code.replace("Numpad", "");
                      return code;
                  }
                })()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
