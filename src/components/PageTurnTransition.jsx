import styles from './PageTurnTransition.module.css';

/**
 * FLIP_MS — total page-turn duration in milliseconds.
 * Changing this one constant keeps the JS lock and CSS animation in sync.
 * Book.jsx imports it to set the setTimeout lock duration.
 */
export const FLIP_MS = 800;

/**
 * PageTurnTransition — two-layer book-page flip
 *
 * Layer stack during a flip:
 *   0  incoming  — new page, always visible underneath
 *   1  castShadow — shadow the outgoing page casts onto the incoming one
 *   2  outgoing  — old page; rotates away via perspective + rotateY
 *      └─ pageDarken — gradient overlay that darkens as the page folds
 *
 * Why two layers (not the card-flip "preserve-3d" pattern):
 *   The stage lives inside overflow:hidden containers (BookLayout, pageArea).
 *   overflow:hidden creates a stacking context that flattens preserve-3d,
 *   making rotation invisible. The two-layer approach needs no preserve-3d —
 *   the outgoing page just rotates out of view and the incoming is revealed.
 *
 * Why perspective() is in the keyframes (not on the parent):
 *   perspective CSS property + overflow:hidden on the same ancestor causes
 *   3D rendering to be dropped in some browsers. Embedding perspective()
 *   directly in the transform value applies it unconditionally.
 */
export default function PageTurnTransition({
  isFlipping,
  direction = 'next',
  outgoing,
  children,
}) {
  const isNext = direction === 'next';

  return (
    <div className={styles.stage}>

      {/* Layer 0 — incoming: new page, always visible */}
      <div className={styles.incoming}>
        {children}
      </div>

      {isFlipping && (
        <>
          {/* Layer 1 — shadow the flipping page casts onto the new page */}
          <div
            className={`${styles.castShadow} ${isNext ? styles.castShadowNext : styles.castShadowPrev}`}
            style={{ '--flip-ms': `${FLIP_MS}ms` }}
            aria-hidden="true"
          />

          {/* Layer 2 — outgoing page; rotates around the spine edge and away */}
          <div
            className={`${styles.outgoing} ${isNext ? styles.outgoingNext : styles.outgoingPrev}`}
            style={{ '--flip-ms': `${FLIP_MS}ms` }}
            aria-hidden="true"
          >
            {outgoing}
            {/* Darkens the page surface near the fold as it bends */}
            <div
              className={`${styles.pageDarken} ${isNext ? styles.pageDarkenNext : styles.pageDarkenPrev}`}
              style={{ '--flip-ms': `${FLIP_MS}ms` }}
            />
          </div>
        </>
      )}

    </div>
  );
}
