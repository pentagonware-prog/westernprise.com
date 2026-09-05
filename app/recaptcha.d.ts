export {};
declare global {
  interface Window {
    grecaptcha?: { ready: (callback: () => void) => void; render: (container: HTMLElement, parameters: Record<string, unknown>) => number; reset: (widgetId?: number) => void };
  }
}
