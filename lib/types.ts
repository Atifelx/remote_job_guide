export type Kind = "freelance" | "vetted" | "boards" | "takehome";

/** Primary entry gate, used for the ladder columns. */
export type Test =
  | "open"
  | "ai"
  | "trial"
  | "practical"
  | "live"
  | "dsa"
  | "aptitude";

/** What a single test stage asks you to do. */
export type Format =
  | "ai"
  | "english"
  | "mcq"
  | "dsa"
  | "live"
  | "takehome"
  | "trial"
  | "codereview"
  | "aieval"
  | "sysdesign"
  | "aptitude"
  | "talk";

export type Dsa = "none" | "easy" | "medium" | "hard";

/** 1: days to 2 weeks, 2: 2–6 weeks, 3: 1–3 months, 4: months or never. */
export type Speed = 1 | 2 | 3 | 4;

/** How many relevant jobs or projects show up: 1 high, 2 medium, 3 low. */
export type Flow = 1 | 2 | 3;

export interface Stage {
  title: string;
  formats: Format[];
  time?: string;
  inside: string;
  dsa?: Exclude<Dsa, "none">;
  proctored?: boolean;
  paid?: boolean;
}

export interface Platform {
  id: string;
  name: string;
  url: string;
  kind: Exclude<Kind, "boards">;
  /** Best-first position within its section. */
  rank: number;
  label: string;
  test: Test;
  /** Entry difficulty, 1 (walk in) to 5 (top few percent pass). */
  difficulty: number;
  /** How soon paid work usually starts after you apply. */
  speed: Speed;
  speedNote: string;
  flow: Flow;
  flowNote: string;
  stages: Stage[];
  prep: string;
  retake?: string;
  after: string;
  lo: number | null;
  hi: number | null;
  est: boolean;
  pay: string;
  watch: string;
  src: [string, string][];
  /** Shown when a key fact (India eligibility, a stage's format) couldn't be confirmed. */
  check?: string;
}

export interface Dropped {
  name: string;
  why: string;
}
