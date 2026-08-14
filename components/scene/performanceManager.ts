/**
 * Runtime frame-time monitor and one-shot demotion — PHASE_2_DESIGN.md §11's
 * "runtime demotion if frame time degrades," implemented for real rather
 * than left as a documented intention.
 *
 * Demotes at most once per session: a sustained overrun means the device is
 * genuinely under-powered for the current tier, not a single dropped frame
 * from GC or a tab switch. Repeatedly demoting/promoting in a loop (thrash)
 * is worse than settling one tier down and staying there.
 */
const WARMUP_FRAMES = 30; // skip shader-compile / first-allocation jank
const SAMPLE_WINDOW = 90; // ~1.5s at 60fps
const BUDGET_MS = 18; // slightly above the 16ms/frame desktop target — avoids demoting on one-off jank

export function createPerformanceMonitor(onDemote: () => void) {
  let framesSeen = 0;
  let samples: number[] = [];
  let demoted = false;

  return {
    sample(dtSeconds: number) {
      if (demoted) return;
      framesSeen++;
      if (framesSeen <= WARMUP_FRAMES) return;

      samples.push(dtSeconds * 1000);
      if (samples.length >= SAMPLE_WINDOW) {
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        samples = [];
        if (avg > BUDGET_MS) {
          demoted = true;
          onDemote();
        }
      }
    },
  };
}
