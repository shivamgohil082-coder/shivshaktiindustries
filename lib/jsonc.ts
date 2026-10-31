export function parseJsonc<T>(source: string): T {
  let output = "";
  let inString = false;
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      output += character;
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      output += character;
      continue;
    }

    if (character === "/" && source[index + 1] === "/") {
      index += 2;
      while (index < source.length && source[index] !== "\n" && source[index] !== "\r") {
        index += 1;
      }
      if (index < source.length) {
        output += source[index];
      }
      continue;
    }

    if (character === "/" && source[index + 1] === "*") {
      index += 2;
      while (index < source.length && !(source[index] === "*" && source[index + 1] === "/")) {
        if (source[index] === "\n" || source[index] === "\r") {
          output += source[index];
        }
        index += 1;
      }
      if (index >= source.length) {
        throw new SyntaxError("Unterminated JSONC block comment.");
      }
      index += 1;
      continue;
    }

    if (character === ",") {
      let nextIndex = index + 1;
      while (/\s/.test(source[nextIndex] ?? "")) {
        nextIndex += 1;
      }
      if (source[nextIndex] === "}" || source[nextIndex] === "]") {
        continue;
      }
    }

    output += character;
  }

  return JSON.parse(output) as T;
}
