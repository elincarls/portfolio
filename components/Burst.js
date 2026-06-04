'use client';

import { useEffect, useRef } from 'react';

const LABELS = ['Design Leadership', 'User Experience', 'Code'];

const BURST_X = 1077;
const LINE_Y = 475.589;
const TEXT_X_PX = 0; // CSS pixels from SVG's left edge — overflow:visible allows negative if needed
const GAP = 40;

const STAGGER = 0.03;
const RAY_DUR = 0.7;
const JITTER = [0, 0.02, 0.01, 0.03, 0, 0.02, 0.01, 0.03, 0.02, 0, 0.01, 0.03, 0.02, 0.01];

const LINE_DUR = 0.9;
const TEXT_FADE_DELAY = 0.0;
const TEXT_FADE_DUR = 0.9;
const PHASE_DUR = 1.2;
const ROLL_DUR = 0.4;

const RAY_PATHS = [
  'M1077 475.589L820.5 859.089',
  'M1077 475.589L996 715.589',
  'M1077 475.589L1176.5 848.089',
  'M1077 475.589L1305.5 636.589',
  'M1077 475.589L1162.5 430.589',
  'M1077 475.589L1105.5 152.089',
  'M1077 475.589L1241.5 269.089',
  'M1077 475.589L1430.5 439.589',
  'M1077 475.589L1276 405.589',
  'M1077 475.589L801.5 547.589',
  'M1077 475.589L945.5 328.589',
  'M1077 475.589L781 1.58911',
  'M1077 475.589L629.5 327.089',
];

// Smootherstep: zero velocity AND acceleration at both ends (C2 continuous),
// which removes the snap at the start/stop of each motion.
function ease(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function Burst() {
  const svgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rayEls = Array.from(svg.querySelectorAll('.ray'));
    const rays = rayEls.map((el, i) => {
      const len = el.getTotalLength();
      el.setAttribute('stroke-dasharray', String(len));
      el.setAttribute('stroke-dashoffset', String(len));
      return { el, len, delay: i * STAGGER + JITTER[i] };
    });

    const txtEl = svg.querySelector('#burst-txt');
    const hlineEl = svg.querySelector('#burst-hline');

    // Convert CSS pixel offset (relative to SVG's left edge) to SVG userspace units
    function pxToSvgX(px) {
      const svgWidth = svg.getBoundingClientRect().width;
      return (px / svgWidth) * 1431;
    }

    let textX = pxToSvgX(TEXT_X_PX);

    function measureLabel(label) {
      txtEl.textContent = label;
      txtEl.setAttribute('opacity', '1');
      const w = txtEl.getComputedTextLength();
      txtEl.setAttribute('opacity', '0');
      return w;
    }

    let textData = LABELS.map(label => ({
      label,
      lineStartX: textX + measureLabel(label) + GAP,
    }));
    txtEl.textContent = LABELS[0];
    txtEl.setAttribute('x', String(textX));

    const burstEnd = RAY_DUR + STAGGER * (rays.length - 1) + 0.1;
    const totalDur = burstEnd + PHASE_DUR * LABELS.length + 0.3;

    let keyframes = buildKeyframes();

    function buildKeyframes() {
      const kfs = [
        { t: 0,        x1: BURST_X },
        { t: LINE_DUR, x1: textData[0].lineStartX },
      ];
      LABELS.forEach((_, i) => {
        if (i < LABELS.length - 1) {
          const rollStart = burstEnd + i * PHASE_DUR + PHASE_DUR * (1 - ROLL_DUR / PHASE_DUR);
          const rollEnd = rollStart + ROLL_DUR;
          kfs.push({ t: rollStart, x1: textData[i].lineStartX });
          kfs.push({ t: rollEnd,   x1: textData[i + 1].lineStartX });
        }
      });
      return kfs;
    }

    function getX1(t) {
      if (t <= keyframes[0].t) return keyframes[0].x1;
      if (t >= keyframes[keyframes.length - 1].t) return keyframes[keyframes.length - 1].x1;
      for (let i = 0; i < keyframes.length - 1; i++) {
        const a = keyframes[i], b = keyframes[i + 1];
        if (t >= a.t && t <= b.t) {
          return lerp(a.x1, b.x1, ease((t - a.t) / (b.t - a.t)));
        }
      }
      return keyframes[keyframes.length - 1].x1;
    }

    // Recompute layout on resize so text + line stay anchored to CSS pixel offset
    let lastT = 0;
    const resizeObs = new ResizeObserver(() => {
      textX = pxToSvgX(TEXT_X_PX);
      textData = LABELS.map(label => ({
        label,
        lineStartX: textX + measureLabel(label) + GAP,
      }));
      txtEl.setAttribute('x', String(textX));
      keyframes = buildKeyframes();
      hlineEl.setAttribute('x1', String(getX1(lastT)));
    });
    resizeObs.observe(svg);

    function renderAt(t) {
      lastT = t;
      rays.forEach(r => {
        const lt = Math.max(0, Math.min(1, (t - r.delay) / RAY_DUR));
        r.el.setAttribute('stroke-dashoffset', String(r.len * (1 - ease(lt))));
      });

      hlineEl.setAttribute('x1', String(getX1(t)));
      hlineEl.setAttribute('x2', String(BURST_X));

      const tRel = t - burstEnd;

      if (tRel < 0) {
        const fadeT = Math.max(0, Math.min(1, (t - TEXT_FADE_DELAY) / TEXT_FADE_DUR));
        txtEl.setAttribute('opacity', String(ease(fadeT)));
        txtEl.textContent = LABELS[0];
        txtEl.setAttribute('y', String(LINE_Y));
        return;
      }

      txtEl.setAttribute('opacity', '1');
      const phaseIndex = Math.min(Math.floor(tRel / PHASE_DUR), LABELS.length - 1);
      const phaseT = (tRel - phaseIndex * PHASE_DUR) / PHASE_DUR;
      const current = textData[phaseIndex];
      const next = textData[phaseIndex + 1];

      const rollStart = 1 - ROLL_DUR / PHASE_DUR;
      const inRoll = next && phaseT > rollStart;

      if (inRoll) {
        const rollT = Math.min(1, (phaseT - rollStart) / (ROLL_DUR / PHASE_DUR));
        const offset = ease(rollT) * 100;
        // Fade out as the old label rolls up, back in as the new rolls down.
        // Opacity dips to 0 exactly at the swap point, hiding the content change.
        txtEl.setAttribute('opacity', String(Math.abs(2 * rollT - 1)));
        if (rollT < 0.5) {
          txtEl.textContent = current.label;
          txtEl.setAttribute('y', String(LINE_Y - offset));
        } else {
          txtEl.textContent = next.label;
          txtEl.setAttribute('y', String(LINE_Y + (100 - offset)));
        }
      } else {
        txtEl.textContent = current.label;
        txtEl.setAttribute('y', String(LINE_Y));
      }
    }

    let startTime = null;

    function play() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTime = null;
      renderAt(0);
      function frame(ts) {
        if (!startTime) startTime = ts;
        const t = Math.min((ts - startTime) / 1000, totalDur);
        renderAt(t);
        if (t < totalDur) rafRef.current = requestAnimationFrame(frame);
      }
      rafRef.current = requestAnimationFrame(frame);
    }

    play();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1431 861"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
    >
      {RAY_PATHS.map((d, i) => (
        <path
          key={i}
          className="ray"
          d={d}
          stroke="white"
          strokeWidth="6"
          strokeDasharray="9999"
          strokeDashoffset="9999"
        />
      ))}

      <defs>
        <clipPath id="burst-text-clip">
          <rect x="0" y="410" width="900" height="130" />
        </clipPath>
      </defs>

      <line
        id="burst-hline"
        x1={BURST_X}
        y1={LINE_Y}
        x2={BURST_X}
        y2={LINE_Y}
        stroke="white"
        strokeWidth="6"
        strokeLinecap="sharp"
      />

      <g clipPath="url(#burst-text-clip)">
        <text
          id="burst-txt"
          x={0}
          y={LINE_Y}
          dominantBaseline="middle"
          fill="white"
          fontWeight="500"
          textAnchor="start"
          opacity="0"
          style={{ fontFamily: 'var(--font-schibsted-grotesk), sans-serif', fontSize: '48px', fontWeight: 'var(--font-weight-medium)' }}
        >
          {LABELS[0]}
        </text>
      </g>
    </svg>
  );
}
