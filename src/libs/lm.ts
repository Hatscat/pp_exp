export type LmContent =
  | HTMLElement
  | string
  | undefined
  | Array<HTMLElement | string | undefined>;

export type LM<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T] & {
    addContent: (c?: LmContent) => LM<T>;
    replaceContent: (c?: LmContent) => LM<T>;
  };

export function lm<T extends keyof HTMLElementTagNameMap>(
  type: T,
  attributes?: Partial<HTMLElement> & Record<string, unknown>
): (...content: Array<HTMLElement | string | undefined>) => LM<T> {
  return (...content) => {
    const element = Object.assign(document.createElement(type), {
      ...attributes,
      addContent: (c?: LmContent) => {
        if (c) {
          if (Array.isArray(c)) c.forEach(element.addContent);
          else if (typeof c === "object" && "appendChild" in c)
            element.appendChild(c);
          else if (element instanceof HTMLInputElement) element.value += c;
          else element.innerText += c;
        }
        return element;
      },
      replaceContent: (c?: LmContent) => {
        while (element.firstChild) element.removeChild(element.firstChild);
        if (element instanceof HTMLInputElement) element.value = "";
        return element.addContent(c);
      },
    });
    return element.addContent(content);
  };
}
