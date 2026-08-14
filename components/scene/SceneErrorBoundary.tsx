"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * React error boundaries must be class components — there is no hook
 * equivalent. Catches a failed dynamic import (e.g. a genuine ChunkLoadError
 * from a network blip or a stale deployment) or any render-time failure
 * inside SceneCanvas, and falls back to rendering nothing. SceneGate's own
 * flat-colour div sits underneath this and is unaffected either way, so the
 * DOM portfolio stays fully usable even if the 3D chunk never loads.
 */
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("[scene] falling back after an error in the 3D scene:", error);
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
