"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BOARDS,
  KINDS,
  PLATFORMS,
  TESTS,
  boardsByEntry,
  byEntry,
  byPay,
  type Kind,
  type Platform,
} from "@/lib/data";

type Sort = "easy" | "hard" | "pay";

const MAX = 10000;
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const pct = (v: number) => Math.min(100, (v / MAX) * 100);
const testLabel = (p: Platform) => p.testLabel ?? TESTS.find((t) => t.id === p.test)!.label;
const isHardGate = (p: Platform) => p.test === "dsa" || p.test === "aptitude" || p.dsa === "yes";

const DSA_TEXT = { yes: "Required", some: "Partly", no: "No" } as const;

function Steps({ level }: { level: number | null }) {
  if (level == null) {
    return <span className="steps-none">Can&apos;t apply</span>;
  }
  return (
    <span className="steps" role="img" aria-label={`Entry difficulty ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= level ? "on" : undefined} />
      ))}
      <b>{level}</b>
    </span>
  );
}

function Pay({ p }: { p: Platform }) {
  if (p.lo == null || p.hi == null) {
    return (
      <span className="pay">
        <strong className="pay-none">{p.unverified ? "Per bounty or prize" : "Not published"}</strong>
      </span>
    );
  }
  return (
    <span className="pay">
      <strong>
        {fmt(p.lo)}–{fmt(p.hi).slice(1)}
      </strong>
      <small>a month{p.est ? ", estimate" : ""}</small>
      <span
        className="bar"
        role="img"
        aria-label={`Range ${fmt(p.lo)} to ${fmt(p.hi)} a month; target $5,000 to $8,000`}
      >
        <span className="band" />
        <span
          className="range"
          style={{ left: `${pct(p.lo)}%`, width: `${Math.max(2, pct(p.hi) - pct(p.lo))}%` }}
        />
      </span>
    </span>
  );
}

function Row({ p, rank }: { p: Platform; rank: number }) {
  return (
    <li id={p.id} className="row-item">
      <details>
        <summary className="row">
          <span className="rank">{rank}</span>
          <span className="who">
            <span className="name">{p.name}</span>
            <span className="label">{p.label}</span>
          </span>
          <span className="test">
            <span className={`tag t-${p.test}`}>{testLabel(p)}</span>
          </span>
          <Steps level={p.difficulty} />
          <span className={`dsa dsa-${p.dsa}`}>
            <span className="dsa-k">DSA</span> {DSA_TEXT[p.dsa]}
          </span>
          <Pay p={p} />
        </summary>
        <div className="more">
          <dl>
            <dt>Entry</dt>
            <dd>{p.entry}</dd>
            <dt>Pay basis</dt>
            <dd>{p.basis}</dd>
            <dt>Hours</dt>
            <dd>{p.hours}</dd>
            <dt>Fees</dt>
            <dd>{p.fees}</dd>
            <dt className="watch">Watch out</dt>
            <dd className="watch">{p.watch}</dd>
          </dl>
          <p className="links">
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              Open {p.name}
            </a>
            {p.src
              .filter(([, u]) => u !== p.url)
              .map(([t, u]) => (
                <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                  {t}
                </a>
              ))}
            {p.researchRank && <span className="rr">Overall ease rank {p.researchRank} of 25</span>}
          </p>
        </div>
      </details>
    </li>
  );
}

function RowList({ items }: { items: Platform[] }) {
  if (!items.length) {
    return (
      <p className="empty">
        Every platform here uses a DSA or aptitude test. Turn off &ldquo;Hide DSA and aptitude
        tests&rdquo; to see them.
      </p>
    );
  }
  return (
    <ol className="rows">
      {items.map((p, i) => (
        <Row key={p.id} p={p} rank={i + 1} />
      ))}
    </ol>
  );
}

function SectionHead({ kind, count }: { kind: Kind; count: number }) {
  const k = KINDS.find((x) => x.id === kind)!;
  return (
    <header className="sect-head">
      <h2 id={`${kind}-h`}>
        {k.title} <span className="count">{count}</span>
      </h2>
      <p>{k.blurb}</p>
    </header>
  );
}

export default function Directory() {
  const [sort, setSort] = useState<Sort>("easy");
  const [hideHard, setHideHard] = useState(false);

  // Open a row's details when the URL hash points at it (from the ladder chips).
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      const d = el?.querySelector("details");
      if (d) d.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  const list = useMemo(() => {
    const cmp =
      sort === "pay" ? byPay : sort === "hard" ? (a: Platform, b: Platform) => byEntry(b, a) : byEntry;
    const pick = (f: (p: Platform) => boolean) =>
      PLATFORMS.filter((p) => f(p) && !(hideHard && isHardGate(p))).sort(cmp);
    return {
      freelance: pick((p) => p.kind === "freelance"),
      dev: pick((p) => p.kind === "vetted" && p.group === "dev"),
      ai: pick((p) => p.kind === "vetted" && p.group === "ai"),
      build: pick((p) => p.kind === "build"),
    };
  }, [sort, hideHard]);

  const boards = useMemo(() => {
    const b = [...BOARDS].sort(boardsByEntry);
    return sort === "hard" ? b.reverse() : b;
  }, [sort]);

  const counts: Record<Kind, number> = {
    freelance: list.freelance.length,
    boards: BOARDS.length,
    vetted: list.dev.length + list.ai.length,
    build: list.build.length,
  };

  return (
    <div className="directory">
      <nav className="bar-nav" aria-label="Portal types and sorting">
        <div className="wrap bar-inner">
          <ul className="jump">
            {KINDS.map((k) => (
              <li key={k.id} className={`k-${k.id}`}>
                <a href={`#${k.id}`}>
                  {k.short} <span className="count">{counts[k.id]}</span>
                </a>
              </li>
            ))}
            <li className="k-skip">
              <a href="#skip">Skip list</a>
            </li>
          </ul>
          <div className="controls">
            <div className="seg" role="group" aria-label="Sort">
              {(
                [
                  ["easy", "Easiest entry"],
                  ["hard", "Hardest entry"],
                  ["pay", "Highest pay"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" aria-pressed={sort === id} onClick={() => setSort(id)}>
                  {label}
                </button>
              ))}
            </div>
            <label className="toggle">
              <input type="checkbox" checked={hideHard} onChange={(e) => setHideHard(e.target.checked)} />
              Hide DSA and aptitude tests
            </label>
          </div>
        </div>
      </nav>

      <div className="wrap">
        <div className="legend" aria-label="How to read each row">
          <span>
            <span className="steps" aria-hidden="true">
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i />
              <i />
            </span>
            Entry difficulty, 1 to 5
          </span>
          <span>
            <span className="swatch sw-range" /> Realistic monthly range
          </span>
          <span>
            <span className="swatch sw-band" /> Your $5–8K target
          </span>
          <span>Select a row for entry steps, fees, warnings and sources.</span>
        </div>

        <section id="freelance" className="sect k-freelance" aria-labelledby="freelance-h">
          <SectionHead kind="freelance" count={counts.freelance} />
          <RowList items={list.freelance} />
        </section>

        <section id="boards" className="sect k-boards" aria-labelledby="boards-h">
          <SectionHead kind="boards" count={BOARDS.length} />
          <p className="sect-note">
            Startup-heavy boards come first: startups more often use practical rounds and take-homes,
            while larger companies lean on DSA rounds. The board doesn&apos;t set the test; the employer
            does.
          </p>
          <ol className="rows boards">
            {boards.map((b, i) => (
              <li key={b.id} id={b.id} className="board">
                <span className="rank">{i + 1}</span>
                <span className="who">
                  <a className="name" href={b.url} target="_blank" rel="noopener noreferrer">
                    {b.name}
                  </a>
                  <span className="label">{b.note}</span>
                </span>
                <span className="test">
                  <span className={`tag ${b.mix === "startup" ? "t-practical" : "t-dsa"}`}>
                    {b.mix === "startup" ? "Mostly startups: practical rounds common" : "All sizes: expect DSA at big companies"}
                  </span>
                </span>
                <span className="cost">{b.cost}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="vetted" className="sect k-vetted" aria-labelledby="vetted-h">
          <SectionHead kind="vetted" count={counts.vetted} />
          <h3 className="sub">Developer networks: placed on client teams</h3>
          <RowList items={list.dev} />
          <h3 className="sub">AI-training networks: write and judge code for AI labs</h3>
          <RowList items={list.ai} />
        </section>

        <section id="build" className="sect k-build" aria-labelledby="build-h">
          <SectionHead kind="build" count={counts.build} />
          <p className="sect-note unverified">
            Added on top of the October 2026 research and not checked with it. Confirm India eligibility
            and payout terms on each site before you build anything. Two test-and-match platforms also
            end with a build step: Toptal&apos;s 1–3 week test project and Crossover&apos;s real-work
            trial.
          </p>
          <RowList items={list.build} />
        </section>
      </div>
    </div>
  );
}
