export {};
declare global {
  interface Window {
    grecaptcha?: { render: (container: HTMLElement, parameters: Record<string, unknown>) => number; reset: (widgetId?: number) => void };
  }
}
