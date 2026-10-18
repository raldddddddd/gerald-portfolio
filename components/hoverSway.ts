export type HorizontalBounds = Pick<DOMRect, "left" | "right">;

export function getHoverSwayImpulse(clientX: number, bounds: HorizontalBounds) {
  return clientX < (bounds.left + bounds.right) / 2 ? -105 : 105;
}

export function advanceAngularSpring(angle: number, velocity: number, dt: number, coupling = 0) {
  const nextVelocity = velocity + (-88 * angle - 4.5 * velocity + coupling) * dt;
  return { angle: angle + nextVelocity * dt, velocity: nextVelocity };
}

export function angularSpringHasSettled(angle: number, velocity: number) {
  return Math.abs(angle) < 0.35 && Math.abs(velocity) < 4;
}
