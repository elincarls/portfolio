// Smootherstep: zero velocity AND acceleration at both ends (C2 continuous),
// which removes the snap at the start/stop of each motion.
export function ease(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}
