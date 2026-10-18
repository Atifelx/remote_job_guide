export type Kind = "freelance" | "boards" | "vetted" | "build";

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
  kind: Kind;
  group?: "dev" | "ai";
  label: string;
  test: Test;
  /** Entry difficulty, 1 (walk in) to 5 (top few percent pass). */
  difficulty: number;
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
