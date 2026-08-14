/**
 * The single time source (PHASE_2_DESIGN.md §8 / brief §7: "one time
 * source... competing animation frame loops are the specific cause of the
 * micro-judder that separates a good site from an award-standard one").
 * Everything that needs a frame — camera, shader uniforms, future
 * scroll-linked work — subscribes here instead of running its own
 * requestAnimationFrame.
 *
 * Render-on-demand, not continuous by default: the loop only runs while at
 * least one subscriber keeps calling wake() (see sceneController.ts — it
 * self-wakes every tick while ambient drift is enabled, and stops
 * self-waking under reduced-motion or while paused, so the loop naturally
 * idles out in both cases rather than running forever for nothing).
 */

type TickCallback = (dt: number, elapsed: number) => void;

const subscribers = new Set<TickCallback>();
const IDLE_TIMEOUT_MS = 400;

let rafHandle: number | null = null;
let idleTimer: number | null = null;
let lastTime = 0;

function loop(time: number) {
  const dt = lastTime ? (time - lastTime) / 1000 : 0;
  lastTime = time;
  const elapsed = time / 1000;
  subscribers.forEach((cb) => cb(dt, elapsed));
  rafHandle = requestAnimationFrame(loop);
}

function startLoop() {
  if (rafHandle !== null) return;
  lastTime = 0;
  rafHandle = requestAnimationFrame(loop);
}

function stopLoop() {
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
    rafHandle = null;
  }
}

export function subscribe(cb: TickCallback): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

/** Keep the loop alive for another IDLE_TIMEOUT_MS. Call on real input, or every tick while something must keep animating. */
export function wake() {
  startLoop();
  if (idleTimer !== null) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    stopLoop();
    idleTimer = null;
  }, IDLE_TIMEOUT_MS);
}

/** Force-stop immediately (tab hidden, scene disposed) without waiting out the idle window. */
export function sleepNow() {
  if (idleTimer !== null) {
    window.clearTimeout(idleTimer);
    idleTimer = null;
  }
  stopLoop();
}
