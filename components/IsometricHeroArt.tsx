import { CatTreeHangingBall } from "@/components/CatTreeHangingBall";

/**
 * True isometric projection (30deg axes) shared by every shape below.
 *
 *   world +X -> screen right-down   (cos30, sin30)
 *   world +Y -> screen left-down    (-cos30, sin30)
 *   world +Z -> screen up
 *
 * The camera sees three faces of any box: top (+Z), "left" (+Y) and "right" (+X).
 * Drawing every polygon from 3D box coordinates keeps all edges parallel to the
 * three isometric axes, which is what the hand-placed points were missing.
 */
const COS30 = Math.sqrt(3) / 2;

type Pt = readonly [number, number];
type Vec3 = readonly [number, number, number];
type Project = (x: number, y: number, z: number) => Pt;

const makeProject =
  (ox: number, oy: number, s = 1): Project =>
  (x, y, z) => [ox + (x - y) * COS30 * s, oy + (x + y) * 0.5 * s - z * s];

const poly = (pts: Pt[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const line = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;

function boxFaces(p: Project, [x0, y0, z0]: Vec3, [x1, y1, z1]: Vec3) {
  return {
    top: poly([p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)]),
    left: poly([p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)]), // +Y face
    right: poly([p(x1, y0, z0), p(x1, y1, z0), p(x1, y1, z1), p(x1, y0, z1)]), // +X face
  };
}

/* -------------------------------------------------------------------------- */
/* Window                                                                      */
/* -------------------------------------------------------------------------- */

// Window lies in the Y/Z plane (face looks toward +X), thickness D along X.
const WIN = {
  L: 300, // width  (along Y)
  H: 150, // height (along Z)
  D: 14, // frame depth (along X)
  border: 10, // frame border width
  mullion: 8,
  recess: 4, // how far the glass sits behind the frame face
  sillOut: 14, // sill projection past the frame face
  sillOver: 10, // sill overhang at both ends
  sillT: 8, // sill thickness
};

export function IsometricHeroWindow() {
  const { L, H, D, border: b, mullion: m, recess: r, sillOut, sillOver, sillT } = WIN;
  const p = makeProject(328, 110);

  const frame = boxFaces(p, [0, 0, 0], [D, L, H]);
  const sill = boxFaces(p, [0, -sillOver, -sillT], [D + sillOut, L + sillOver, 0]);

  const gx = D - r; // glass plane
  const glass = poly([p(gx, b, b), p(gx, L - b, b), p(gx, L - b, H - b), p(gx, b, H - b)]);

  // Only the reveals that face the camera: the wall at y=b (+Y) and the floor at z=b (+Z).
  const revealSide = poly([p(D, b, b), p(D, b, H - b), p(gx, b, H - b), p(gx, b, b)]);
  const revealFloor = poly([p(D, b, b), p(D, L - b, b), p(gx, L - b, b), p(gx, b, b)]);

  const midY = L / 2;
  const midZ = H / 2;
  const mullions =
    line(p(gx, midY, b), p(gx, midY, H - b)) + line(p(gx, b, midZ), p(gx, L - b, midZ));

  const highlight = `M${p(D, L, 0).join(" ")}L${p(D, L, H).join(" ")}L${p(D, 0, H).join(" ")}`;

  // Sun / moon live on the glass plane, so they get the plane's skew.
  const [px, py] = p(gx, 0, 0);
  const planeMatrix = `matrix(${-COS30} 0.5 0 -1 ${px.toFixed(2)} ${py.toFixed(2)})`;
  const sunY = 70;
  const sunZ = H * 0.72;
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return `M${(sunY + 14.5 * c).toFixed(1)} ${(sunZ + 14.5 * s).toFixed(1)}L${(sunY + 18 * c).toFixed(1)} ${(
      sunZ +
      18 * s
    ).toFixed(1)}`;
  }).join("");

  return (
    <svg className="isometric-hero-art isometric-hero-window" viewBox="0 0 420 320" aria-hidden="true" focusable="false">
      {/* sill */}
      <polygon points={sill.left} className="hero-window-side" />
      <polygon points={sill.right} className="hero-window-side" />
      <polygon points={sill.top} className="hero-window-top" />

      {/* frame */}
      <polygon points={frame.left} className="hero-window-side" />
      <polygon points={frame.top} className="hero-window-top" />
      <polygon points={frame.right} className="hero-window-frame" />

      {/* opening */}
      <polygon points={revealSide} className="hero-window-side" />
      <polygon points={revealFloor} className="hero-window-side" />
      <polygon points={glass} className="hero-window-pane" />

      <defs>
        <clipPath id="hero-window-sky-clip">
          <rect x={b} y={b} width={L - b * 2} height={H - b * 2} />
        </clipPath>
      </defs>
      <g transform={planeMatrix}>
        <g className="hero-window-sun hero-window-clouds" aria-hidden="true">
          <g transform="translate(0 150) scale(1 -1)" clipPath="url(#hero-window-sky-clip)">
            <g transform="translate(45 22.5) scale(0.7)">
              <g transform="translate(-18 55)">
                <path
                  className="hero-window-cloud hero-window-cloud-one"
                  d="M94 73c0-8 6-14 14-14 2-10 11-17 21-17 10 0 18 6 21 15 3-2 6-3 10-3 10 0 18 7 18 16 7 1 12 6 12 13h-82c-8 0-14-4-14-10Z"
                />
              </g>
              <path
                className="hero-window-cloud hero-window-cloud-two"
                d="M204 48c2-7 8-11 15-11 4-8 14-10 21-5 6-5 15-5 21 0 4 3 6 7 6 12 7 0 12 4 13 9h-56c-8 0-15-1-20-5Z"
              />
            </g>
          </g>
        </g>
      </g>
      <path d={mullions} className="hero-window-mullion" />
      <path d={highlight} className="hero-window-highlight" />

      <g transform={planeMatrix}>
        <g className="hero-window-sun">
          <circle cx={sunY} cy={sunZ} r="11" className="hero-window-sun-disc" />
          <path d={rays} className="hero-window-rays" />
        </g>
        <g className="hero-window-moon">
          <path
            className="hero-window-moon-disc"
            transform={`translate(${sunY} ${sunZ}) scale(0.85)`}
            d="M15.1 -5.27A16 16 0 1 0 0.94 15.97A13 13 0 1 1 15.1 -5.27Z"
          />
          <circle className="hero-window-star hero-window-star-one" cx={sunY - 38} cy={sunZ - 8} r="1.5" />
          <circle className="hero-window-star hero-window-star-two" cx={sunY + 48} cy={sunZ + 8} r="1.3" />
        </g>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Cat tree                                                                    */
/* -------------------------------------------------------------------------- */

const TREE_SCALE = 1.1;

const SLAB_T = 8;
const SHARED_DARK_EDGE = 56;
const LOWER_PLATFORM_LENGTH = 112.5;
const PLATFORM_LIGHT_SIDE_LENGTH = LOWER_PLATFORM_LENGTH * 2.5 * 1.3;
const PLATFORM_X_START = (LOWER_PLATFORM_LENGTH - PLATFORM_LIGHT_SIDE_LENGTH) / 2;
const BASE: [Vec3, Vec3] = [[PLATFORM_X_START, 0, 0], [PLATFORM_X_START + PLATFORM_LIGHT_SIDE_LENGTH, LOWER_PLATFORM_LENGTH, SLAB_T]];
const MID_Z = 187.5;
const MID: [Vec3, Vec3] = [[PLATFORM_X_START, 0, MID_Z], [PLATFORM_X_START + PLATFORM_LIGHT_SIDE_LENGTH, LOWER_PLATFORM_LENGTH, MID_Z + SLAB_T]];
const TOP_Z = 375;

const HOUSE_BASE_X = PLATFORM_X_START + PLATFORM_LIGHT_SIDE_LENGTH - LOWER_PLATFORM_LENGTH;
const HOUSE_MIDDLE_X = PLATFORM_X_START;
const POST_A: [Vec3, Vec3] = [[HOUSE_BASE_X + 50.25, 50.25, SLAB_T], [HOUSE_BASE_X + 62.25, 62.25, MID_Z]];
const POST_B: [Vec3, Vec3] = [[HOUSE_MIDDLE_X + 50.25, 50.25, SLAB_T], [HOUSE_MIDDLE_X + 62.25, 62.25, MID_Z]];
const POST_A_UPPER: [Vec3, Vec3] = [[HOUSE_BASE_X + 50.25, 50.25, SLAB_T + LOWER_PLATFORM_LENGTH], [HOUSE_BASE_X + 62.25, 62.25, MID_Z]];
const POST_C: [Vec3, Vec3] = [[HOUSE_BASE_X + 50.25, 50.25, MID_Z + SLAB_T], [HOUSE_BASE_X + 62.25, 62.25, TOP_Z]];

const HOUSE_BASE: [Vec3, Vec3] = [[HOUSE_BASE_X, 0, SLAB_T], [HOUSE_BASE_X + LOWER_PLATFORM_LENGTH, LOWER_PLATFORM_LENGTH, SLAB_T + LOWER_PLATFORM_LENGTH]];
const HOUSE_MIDDLE: [Vec3, Vec3] = [[HOUSE_MIDDLE_X, 0, MID_Z + SLAB_T], [HOUSE_MIDDLE_X + LOWER_PLATFORM_LENGTH, LOWER_PLATFORM_LENGTH, MID_Z + SLAB_T + LOWER_PLATFORM_LENGTH]];
const TOP: [Vec3, Vec3] = [[HOUSE_BASE_X, 0, TOP_Z], [HOUSE_BASE_X + LOWER_PLATFORM_LENGTH, LOWER_PLATFORM_LENGTH, TOP_Z + SLAB_T]];

const CAT_SHAPE = {
  body: "M2 14C0 2 4-12 12-24c8-13 20-18 32-16 14 2 21 12 26 23 5 10 14 18 18 28 4 12-6 22-20 27-16 6-39 4-53-3C4 28 0 20 2 14Z",
  head: "M8 4C2-1 2-9 5-16c2-5 4-10 4-16 0-5 4-6 7-2l8 10c4-2 8-2 12 0l8-10c3-4 7-3 7 2 0 6 2 11 4 16 3 7 3 15-3 20-10 10-34 10-44 0Z",
  tails: [
    "M57 40C58 52 58 63 58 73C58 82 57 88 57 92",
    "M57 40C58 52 59 63 59 73C59 82 58 88 58 92",
    "M57 40C59 51 61 62 62 72C63 81 61 88 60 92",
    "M57 40C60 50 64 60 65 70C66 80 63 88 61 92",
    "M57 40C60 50 65 59 67 69C69 79 66 87 63 91",
    "M57 40C60 50 64 60 64 70C64 80 61 88 59 92",
    "M57 40C59 51 61 62 61 72C61 81 59 88 57 92",
    "M57 40C56 51 55 62 55 72C55 81 56 88 57 92",
    "M57 40C55 51 53 62 52 72C51 81 53 88 55 92",
    "M57 40C54 50 51 60 50 70C49 80 52 88 55 92",
    "M57 40C54 50 50 60 49 70C48 80 52 88 55 92",
    "M57 40C55 51 54 62 54 72C54 81 56 88 57 92",
  ],
};
const CAT_HEAD_LIFT = 31.3;
const CAT_HEAD_SHIFT_X = 3;
const CAT_BODY_WIDTH_SCALE = 0.9;
const CAT_BODY_CENTER_X = 44;
const CAT_TAIL_FRAME_INTERVAL = 0.2;
const CAT_TAIL_LENGTH_SCALE = 1.2;
const CAT_TAIL_CYCLE_DURATION = CAT_TAIL_FRAME_INTERVAL * CAT_SHAPE.tails.length;

export function IsometricHeroCatTree() {
  const s = TREE_SCALE;
  const p = makeProject(200, 298, s);
  const [topLightSideCenterX, topLightSideCenterY] = p(
    (TOP[0][0] + TOP[1][0]) / 2,
    LOWER_PLATFORM_LENGTH,
    TOP_Z,
  );
  const sleeperZ = TOP_Z + SLAB_T + 1;
  const [sleeperX, sleeperY] = p(HOUSE_BASE_X + 35, 80, sleeperZ);
  const sleeperPosition = `translate(${(sleeperX - 12).toFixed(2)} ${(sleeperY - 29).toFixed(2)})`;

  const Slab = ({ box }: { box: [Vec3, Vec3] }) => {
    const f = boxFaces(p, box[0], box[1]);
    return (
      <g className="hero-cat-tree-platform">
        <polygon points={f.top} className="hero-cat-platform-top" />
        <polygon points={f.left} className="hero-cat-platform-front" />
        <polygon points={f.right} className="hero-cat-platform-side" />
      </g>
    );
  };

  const Post = ({ box }: { box: [Vec3, Vec3] }) => {
    const [[x0, y0, z0], [x1, y1, z1]] = box;
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const radius = (Math.min(x1 - x0, y1 - y0) / 2) * 1.45;
    const rx = radius * Math.sqrt(1.5) * s;
    const ry = radius * Math.sqrt(0.5) * s * 1.12;
    const [screenX, topY] = p(centerX, centerY, z1);
    const [, bottomY] = p(centerX, centerY, z0);
    const cylinder = `M${(screenX - rx).toFixed(1)} ${topY.toFixed(1)}C${(screenX - rx).toFixed(1)} ${(topY - ry).toFixed(1)} ${(screenX + rx).toFixed(1)} ${(topY - ry).toFixed(1)} ${(screenX + rx).toFixed(1)} ${topY.toFixed(1)}L${(screenX + rx).toFixed(1)} ${bottomY.toFixed(1)}C${(screenX + rx).toFixed(1)} ${(bottomY + ry).toFixed(1)} ${(screenX - rx).toFixed(1)} ${(bottomY + ry).toFixed(1)} ${(screenX - rx).toFixed(1)} ${bottomY.toFixed(1)}Z`;
    const shadedSide = `M${screenX.toFixed(1)} ${(topY - ry).toFixed(1)}C${(screenX + rx * 0.7).toFixed(1)} ${(topY - ry).toFixed(1)} ${(screenX + rx).toFixed(1)} ${(topY - ry * 0.35).toFixed(1)} ${(screenX + rx).toFixed(1)} ${topY.toFixed(1)}L${(screenX + rx).toFixed(1)} ${bottomY.toFixed(1)}C${(screenX + rx).toFixed(1)} ${(bottomY + ry).toFixed(1)} ${screenX.toFixed(1)} ${(bottomY + ry).toFixed(1)} ${screenX.toFixed(1)} ${bottomY.toFixed(1)}Z`;
    let sisal = "";
    for (let z = z0 + 12; z <= z1 - 8; z += 8) {
      const [, stripeY] = p(centerX, centerY, z);
      sisal += `M${(screenX - rx * 0.78).toFixed(1)} ${stripeY.toFixed(1)}Q${screenX.toFixed(1)} ${(stripeY + ry * 0.45).toFixed(1)} ${(screenX + rx * 0.78).toFixed(1)} ${stripeY.toFixed(1)}`;
    }
    return (
      <g className="hero-cat-tree-post">
        <path d={cylinder} className="hero-cat-post-front" />
        <path d={shadedSide} className="hero-cat-post-side" stroke="none" />
        <path d={sisal} className="hero-cat-sisal" />
      </g>
    );
  };

  const House = ({ box, variant }: { box: [Vec3, Vec3]; variant: "middle" | "base" }) => {
    const [[x0, , z0], [x1, y1, z1]] = box;
    const f = boxFaces(p, box[0], box[1]);
    // The opening is drawn in the +Y face's own (x, z) plane so it skews correctly.
    const [ox, oy] = p(0, y1, 0);
    const faceMatrix = `matrix(${(COS30 * s).toFixed(4)} ${(0.5 * s).toFixed(4)} 0 ${-s} ${ox.toFixed(2)} ${oy.toFixed(2)})`;
    const cx = (x0 + x1) / 2;
    const cz = z0 + (z1 - z0) / 2;
    return (
      <g className={`hero-cat-house hero-cat-house-${variant}`}>
        <polygon points={f.left} className="hero-cat-house-front" />
        <polygon points={f.right} className="hero-cat-house-side" />
        <polygon points={f.top} className="hero-cat-house-roof" />
        <g transform={faceMatrix}>
          <circle cx={cx} cy={cz} r="36" className="hero-cat-cave-opening" />
          <g className={`hero-cat-eyes hero-cat-eyes-${variant}`}>
            <circle cx={cx - 10} cy={cz + 3} r="6.8" />
            <circle cx={cx + 10} cy={cz + 3} r="6.8" />
          </g>
        </g>
        <path d={line(p(x0 + 5, y1, z1 - 6), p(x0 + 26, y1, z1 - 6))} className="hero-cat-house-glint" />
      </g>
    );
  };

  return (
    <svg className="isometric-hero-art isometric-hero-cat-tree" viewBox="-30 -78 480 578" aria-hidden="true" focusable="false">
      <g transform="translate(21 21.1) scale(0.9)">
        {/* painter's order: back to front, bottom to top */}
        <Slab box={BASE} />
        <Post box={POST_A} />
        <Post box={POST_B} />
        <House box={HOUSE_BASE} variant="base" />
        <Post box={POST_A_UPPER} />

        <Slab box={MID} />
        <Post box={POST_C} />
        <House box={HOUSE_MIDDLE} variant="middle" />

        <Slab box={TOP} />
        <g transform={sleeperPosition} aria-hidden="true">
          <g transform="translate(12 29) scale(1.5) translate(-12 -29)">
            <g className="hero-cat-sleeper" aria-hidden="true">
        <g transform={`translate(${CAT_HEAD_SHIFT_X} -${CAT_HEAD_LIFT})`}>
          <path className="hero-cat-sleeper-head" d={CAT_SHAPE.head} />
          <path className="hero-cat-sleeper-fur-streak" d="M26-20Q29-22 32-21" />
        </g>
              <g transform={`translate(${CAT_BODY_CENTER_X} 0) scale(${CAT_BODY_WIDTH_SCALE} 1) translate(-${CAT_BODY_CENTER_X} 0)`}>
                <path className="hero-cat-sleeper-body" d={CAT_SHAPE.body} />
                <path className="hero-cat-sleeper-fur-streak" d="M17-10Q20-13 23-13" />
                <path className="hero-cat-sleeper-fur-streak" d="M65 5Q68 8 70 11" />
              </g>
              <g className="hero-cat-sleeper-tail-frames" transform={`translate(0 40) scale(1 ${CAT_TAIL_LENGTH_SCALE}) translate(0 -40)`}>
                {CAT_SHAPE.tails.map((d, index) => (
                  <path
                    key={index}
                    className={`hero-cat-sleeper-tail-frame hero-cat-sleeper-tail-frame-${index + 1}`}
                    d={d}
                    style={{
                      animationDelay: `${(index * CAT_TAIL_FRAME_INTERVAL).toFixed(2)}s`,
                      animationDuration: `${CAT_TAIL_CYCLE_DURATION.toFixed(2)}s`,
                    }}
                  />
                ))}
              </g>
            </g>
          </g>
        </g>

        <CatTreeHangingBall x={topLightSideCenterX} y={topLightSideCenterY} />
      </g>
    </svg>
  );
}
