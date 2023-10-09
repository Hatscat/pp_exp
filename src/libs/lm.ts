export type LmContent =
  | HTMLElement
  | string
  | undefined
  | Array<HTMLElement | string | undefined>;
export type LM = HTMLElement & {
  addContent: (c?: LmContent) => LM;
  replaceContent: (c?: LmContent) => LM;
};

export function lm(
  type: keyof HTMLElementTagNameMap,
  attributes?: Partial<HTMLElement> & Record<string, unknown>
): (...content: Array<HTMLElement | string | undefined>) => LM {
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
