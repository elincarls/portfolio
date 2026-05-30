'use client';

import { useEffect, useRef } from 'react';

const LABELS = ['Design Leadership', 'User Experience', 'Code'];

const STAGGER = 0.03;
const RAY_DUR = 0.7;
const JITTER = [0, 0.02, 0.01, 0.03, 0, 0.02, 0.01, 0.03, 0.02, 0, 0.01, 0.03, 0.02, 0.01];
const DRIFT_DUR = 0.9;
const TEXT_FADE_DUR = 0.6;
const PHASE_DUR = 1.3;
const ROLL_DUR = 0.4;
const REF_W = 500;
const REF_H = 802;
const TEXT_START_OFFSET_Y = 60;
const PAD_X = 48;
const PAD_Y = 10;
const DRIFT_X = -80;
const DRIFT_Y = -180;
const TEXT_FONT_SIZE = 32;

const RAY_PATHS = [
  'M430 430 L189 790',
  'M430 430 L312 781',
  'M430 430 L528 798',
  'M430 430 L731 642',
  'M430 430 L545 369',
  'M430 430 L461 78',
  'M430 430 L636 172',
  'M430 430 L840 388',
  'M430 430 L752 317',
  'M430 430 L176 496',
  'M430 430 L279 261',
  'M430 430 L175 22',
  'M430 430 L93 318',
  'M430 430 L20 430',
];

function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function BurstMobile() {
  const sceneRef = useRef(null);
  const wrapRef  = useRef(null);
  const svgRef   = useRef(null);
  const labelRef = useRef(null);
  const textRef  = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const wrapEl  = wrapRef.current;
    const svgEl   = svgRef.current;
    const labelEl = labelRef.current;
    const textEl  = textRef.current;
    if (!sceneEl || !wrapEl || !svgEl || !labelEl || !textEl) return;

    const sceneW = sceneEl.clientWidth;
    const sceneH = sceneEl.clientHeight;
    const sf     = sceneW / REF_W; // uniform scale factor

    // lock scene to REF_W and scale up/down to fit actual width
    sceneEl.style.width          = `${REF_W}px`;
    sceneEl.style.height         = `${REF_H}px`;
    sceneEl.style.transform      = `scale(${sf})`;
    sceneEl.style.transformOrigin = 'top left';

    // all pixel values now calculated against REF_W, not sceneW
    const burstPx         = 430 * (REF_W * 2 / 860);
    const padX            = PAD_X;
    const padY            = PAD_Y;
    const driftX          = DRIFT_X;
    const driftY          = DRIFT_Y;
    const textStartOffset = TEXT_START_OFFSET_Y;
    const fontSize        = TEXT_FONT_SIZE;

    wrapEl.style.left      = `${padX - burstPx}px`;
    wrapEl.style.top       = `${padY - burstPx}px`;
    labelEl.style.fontSize = `${fontSize}px`;

    const rayEls = Array.from(svgEl.querySelectorAll('.ray'));
    const rays = rayEls.map((el, i) => {
      const len = el.getTotalLength();
      el.setAttribute('stroke-dasharray', String(len));
      el.setAttribute('stroke-dashoffset', String(len));
      return { el, len, delay: i * STAGGER + JITTER[i] };
    });

    const burstEnd      = RAY_DUR + STAGGER * (rays.length - 1) + 0.1;
    const driftDelay    = burstEnd - 0.1;
    const textFadeDelay = driftDelay + 0.2;
    const totalDur      = textFadeDelay + PHASE_DUR * LABELS.length + 0.4;

    function renderAt(t) {
      rays.forEach(r => {
        const lt = Math.max(0, Math.min(1, (t - r.delay) / RAY_DUR));
        r.el.setAttribute('stroke-dashoffset', String(r.len * (1 - ease(lt))));
      });

      const de = ease(Math.max(0, Math.min(1, (t - driftDelay) / DRIFT_DUR)));
      wrapEl.style.transformOrigin = `${burstPx}px ${burstPx}px`;
      wrapEl.style.transform = `translate(${lerp(0, driftX, de)}px, ${lerp(0, driftY, de)}px) rotate(${lerp(0, 45, de)}deg) scale(${lerp(1, 1.8, de)})`;

      const ft = Math.max(0, Math.min(1, (t - textFadeDelay) / TEXT_FADE_DUR));
      textEl.style.opacity   = String(ft);
      textEl.style.transform = `translateY(${lerp(textStartOffset, 0, ease(ft))}px)`;

      const tRel = t - textFadeDelay - TEXT_FADE_DUR * 0.2;
      if (tRel >= 0) {
        const phaseIndex = Math.min(Math.floor(tRel / PHASE_DUR), LABELS.length - 1);
        const phaseT     = (tRel - phaseIndex * PHASE_DUR) / PHASE_DUR;
        const current    = LABELS[phaseIndex];
        const next       = LABELS[phaseIndex + 1];
        const rollStart  = 1 - ROLL_DUR / PHASE_DUR;
        const inRoll     = next && phaseT > rollStart;

        if (inRoll) {
          const rollT  = Math.min(1, (phaseT - rollStart) / (ROLL_DUR / PHASE_DUR));
          const offset = ease(rollT) * 50;
          if (rollT < 0.5) {
            labelEl.textContent     = current;
            labelEl.style.transform = `translateY(${-offset}px)`;
            labelEl.style.opacity   = String(1 - ease(rollT * 2));
          } else {
            labelEl.textContent     = next;
            labelEl.style.transform = `translateY(${50 - offset}px)`;
            labelEl.style.opacity   = String(ease((rollT - 0.5) * 2));
          }
        } else {
          labelEl.textContent     = current;
          labelEl.style.transform = 'translateY(0)';
          labelEl.style.opacity   = '1';
        }
      }
    }

    function play() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      let startTime = null;
      wrapEl.style.transform  = '';
      wrapEl.style.left       = `${padX - burstPx}px`;
      wrapEl.style.top        = `${padY - burstPx}px`;
      textEl.style.opacity    = '0';
      textEl.style.transform  = `translateY(${textStartOffset}px)`;
      labelEl.textContent     = LABELS[0];
      labelEl.style.transform = '';
      labelEl.style.opacity   = '1';
      rays.forEach(r => r.el.setAttribute('stroke-dashoffset', String(r.len)));
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
    };
  }, []);

  return (
    // outer wrapper clips the scaled content and sizes itself to the actual screen
    <div style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: 'var(--color-primary)' }}>
      {/* Scaled scene contains only the burst */}
      <div
        ref={sceneRef}
        style={{
          position: 'relative',
          width: REF_W,
          height: REF_H,
          overflow: 'hidden',
        }}
      >
        <div
          ref={wrapRef}
          style={{ position: 'absolute', width: '200%', height: '200%', top: 0, left: 0 }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 860 860"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleX(-1)' }}
          >
            {RAY_PATHS.map((d, i) => (
              <path
                key={i}
                className="ray"
                d={d}
                stroke="white"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Text overlay — sits in the outer wrapper so it's positioned in real viewport pixels, not in the scaled scene */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '38%',
          opacity: 0,
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            display: 'inline-block',
            color: 'white',
            fontSize: TEXT_FONT_SIZE,
            fontWeight: 'var(--font-weight-medium)',
            fontFamily: 'var(--font-schibsted-grotesk), sans-serif',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
          }}
        >
          {LABELS[0]}
        </span>
      </div>
    </div>
  );
}