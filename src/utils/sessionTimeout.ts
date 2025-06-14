// src/utils/sessionTimeout.ts
// Helper para logout automático por inatividade

export function setupSessionTimeout(
  logout: () => void,
  timeoutMs: number = 15 * 60 * 1000
) {
  let timer: ReturnType<typeof setTimeout>;
  const reset = () => {
    clearTimeout(timer);
    timer = setTimeout(logout, timeoutMs);
  };
  const events = ['mousemove', 'keydown', 'click', 'scroll'];
  events.forEach(evt => window.addEventListener(evt, reset));
  reset();
  return () => {
    clearTimeout(timer);
    events.forEach(evt => window.removeEventListener(evt, reset));
  };
}
