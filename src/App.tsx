import React, { useEffect, useState } from "react";

export default function App() {
  // Estado
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [lastEvt, setLastEvt] = useState<{
    code: string;
    key: string;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
  } | null>(null);
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
      // Navegación y edición
      ["Home", "End", "PageUp", "PageDown"],
      // Teclado numérico dividido en filas
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

  // Helpers para etiquetas legibles
  const labelFromCode = (code: string): string => {
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
      case "ShiftRight":
        return "Shift";
      case "ControlLeft":
      case "ControlRight":
        return "Ctrl";
      case "AltLeft":
      case "AltRight":
        return "Alt";
      case "Backquote":
        return "`";
      case "BracketLeft":
        return "[";
      case "BracketRight":
        return "]";
      case "Backslash":
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
      case "Insert":
        return "Insert";
      case "Home":
        return "Home";
      case "End":
        return "End";
      case "PageUp":
        return "PageUp";
      case "PageDown":
        return "PageDown";
      case "PrintScreen":
        return "PrtSc";
      case "ScrollLock":
        return "ScrLk";
      case "Pause":
        return "Pause";
      case "Minus":
        return "-";
      case "Equal":
        return "=";
      // Numpad
      case "NumLock":
        return "NumLock";
      case "NumpadDivide":
        return "/";
      case "NumpadMultiply":
        return "*";
      case "NumpadSubtract":
        return "-";
      case "NumpadAdd":
        return "+";
      case "NumpadEnter":
        return "Enter";
      case "NumpadDecimal":
        return ".";
      default:
        if (code.startsWith("Key")) return code.replace("Key", "");
        if (code.startsWith("Digit")) return code.replace("Digit", "");
        if (code.startsWith("Numpad")) return code.replace("Numpad", "");
        return code;
    }
  };

  const shouldPreventDefault = (code: string): boolean => {
    const preventList = new Set([
      "Space",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ]);
    return preventList.has(code);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code, key, ctrlKey, shiftKey, altKey, metaKey, repeat } = event;
      if (shouldPreventDefault(code)) {
        event.preventDefault();
      }
      setLastEvt({
        code,
        key,
        ctrl: ctrlKey,
        shift: shiftKey,
        alt: altKey,
        meta: metaKey,
      });

      setActiveKeys((prev) => {
        if (prev.has(code) && repeat) return prev;
        const next = new Set(prev);
        next.add(code);
        return next;
      });

      setTestedKeys((prev) => {
        if (prev.has(code)) return prev;
        const next = new Set(prev);
        next.add(code);
        return next;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event;
      setActiveKeys((prev) => {
        if (!prev.has(code)) return prev;
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    };

    const handleBlur = () => {
      // Limpiar teclas activas si se pierde el foco
      setActiveKeys(new Set());
    };

    window.addEventListener("keydown", handleKeyDown as EventListener, {
      passive: false,
    });
    window.addEventListener("keyup", handleKeyUp as EventListener);
    window.addEventListener("blur", handleBlur as EventListener);
    return () => {
      window.removeEventListener("keydown", handleKeyDown as EventListener);
      window.removeEventListener("keyup", handleKeyUp as EventListener);
      window.removeEventListener("blur", handleBlur as EventListener);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="text-4xl mt-6 font-bold">
        Welcome to the keyboard tester!
      </h1>
      <p className="mt-4 text-lg">Press any key to see if it is working.</p>

      {/* Controles */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setTestedKeys(new Set())}
          className="rounded-md border px-3 py-1 text-sm hover:scale-105 active:scale-95 transition-transform"
        >
          Reset tested keys
        </button>
        <div className="text-sm text-gray-600">
          Tested: {testedKeys.size} · Active: {activeKeys.size}
        </div>
      </div>

      {/* Último evento */}
      {lastEvt && (
        <div className="mt-2 text-sm text-gray-700">
          Last: code={lastEvt.code}, key={JSON.stringify(lastEvt.key)} · mods:
          {lastEvt.ctrl ? " Ctrl" : ""}
          {lastEvt.shift ? " Shift" : ""}
          {lastEvt.alt ? " Alt" : ""}
          {lastEvt.meta ? " Meta" : ""}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-2">
        {keyRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap justify-center gap-2">
            {row.map((code, keyIdx) => {
              const isActive = activeKeys.has(code);
              const isTested = testedKeys.has(code);
              const classExtra = isActive
                ? "bg-blue-500 text-white"
                : isTested
                ? "bg-green-500 text-white"
                : "";
              return (
                <div
                  key={keyIdx}
                  className={`rounded-md border border-gray-300 px-4 py-2 text-xl shadow-sm ${classExtra}`}
                  title={code}
                >
                  {labelFromCode(code)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
