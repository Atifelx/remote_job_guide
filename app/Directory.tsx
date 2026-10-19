"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BOARDS,
  DSA_LABEL,
  DSA_ORDER,
  FORMATS,
  KINDS,
  LOOPS,
  PLATFORMS,
  PROJECT_REFS,
  SPEED_LABEL,
  TESTS,
  FLOW_LABEL,
  byEntry,
  byPay,
  byRank,
  bySpeed,
  maxDsa,
  needsOf,
} from "@/lib/data";
import type { Dsa, Flow, Format, Kind, Platform, Speed, Stage } from "@/lib/types";

type Sort = "best" | "fast" | "easy" | "pay";

const MAX = 10000;
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const pct = (v: number) => Math.min(100, (v / MAX) * 100);
const fmtLabel = (f: Format) => FORMATS.find((x) => x.id === f)!.label;
const testLabel = (p: Platform) => TESTS.find((t) => t.id === p.test)!.label;
/** Format chips the reader can tick. DSA has its own level picker. */
const PREP_FORMATS = FORMATS.filter((f) => f.id !== "dsa");

interface Prep {
  dsa: Dsa;
  formats: Set<Format>;
}

function missing(stages: Stage[], prep: Prep): string[] {
  const out: string[] = [];
  const level = maxDsa(stages);
  if (DSA_ORDER[level] > DSA_ORDER[prep.dsa]) out.push(`${DSA_LABEL[level]} DSA`);
  for (const f of needsOf(stages)) if (!prep.formats.has(f)) out.push(fmtLabel(f));
  return out;
}

function Steps({ level }: { level: number }) {
  return (
    <span className="steps" role="img" aria-label={`Entry difficulty ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= level ? "on" : undefined} />
      ))}
      <b>{level}</b>
    </span>
  );
}

function DsaBadge({ level }: { level: Dsa }) {
  return (
    <span className={`dsa dsa-${level}`}>
      <span className="dsa-k">DSA</span> {DSA_LABEL[level]}
    </span>
  );
}

function Ready({ gaps }: { gaps: string[] }) {
  if (!gaps.length) return <span className="ready ok">Ready</span>;
  return (
    <span className="ready gap" title={`Still to prepare: ${gaps.join(", ")}`}>
      Prepare {gaps.length} more
    </span>
  );
}

function SpeedPill({ speed }: { speed: Speed }) {
  return (
    <span className={`speed s${speed}`} title="How soon paid work usually starts">
      <span className="speed-k">Paid work in</span> {SPEED_LABEL[speed]}
    </span>
  );
}

function FlowPill({ flow }: { flow: Flow }) {
  return (
    <span className={`flow f${flow}`} title="How many relevant jobs or projects show up">
      <span className="speed-k">Job flow</span> {FLOW_LABEL[flow]}
    </span>
  );
}

function Pay({ p }: { p: Platform }) {
  if (p.lo == null || p.hi == null) {
    return (
      <span className="pay">
        <strong className="pay-none">{p.kind === "takehome" ? "Set per company" : "Not published"}</strong>
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

/** Compact stage strip shown on the collapsed row. */
function Strip({ stages }: { stages: Stage[] }) {
  return (
    <ol className="strip" aria-label="Test pipeline">
      {stages.map((s, i) => (
        <li key={i} className={s.dsa ? `has-dsa dsa-${s.dsa}` : undefined}>
          <span className="n">{i + 1}</span>
          {s.title}
        </li>
      ))}
    </ol>
  );
}

function Pipeline({ stages, gaps }: { stages: Stage[]; gaps: Prep }) {
  return (
    <ol className="pipeline">
      {stages.map((s, i) => (
        <li key={i}>
          <span className="n" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h4>
              {s.title}
              {s.time && <span className="time">{s.time}</span>}
            </h4>
            <p className="fmts">
              {s.formats.map((f) => (
                <span
                  key={f}
                  className={`fmt${f !== "dsa" && !gaps.formats.has(f) ? " todo" : ""}`}
                >
                  {f === "dsa" && s.dsa ? `${DSA_LABEL[s.dsa]} DSA` : fmtLabel(f)}
                </span>
              ))}
              {s.proctored && <span className="flag">Proctored</span>}
              {s.paid && <span className="flag paid">Paid</span>}
            </p>
            <p className="inside">{s.inside}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Row({ p, rank, prep }: { p: Platform; rank: number; prep: Prep }) {
  const gaps = missing(p.stages, prep);
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
          <DsaBadge level={maxDsa(p.stages)} />
          <Ready gaps={gaps} />
          <Pay p={p} />
          <span className="row2">
            <FlowPill flow={p.flow} />
            <SpeedPill speed={p.speed} />
            <Strip stages={p.stages} />
          </span>
        </summary>
        <div className="more">
          {p.check && <p className="check">{p.check}</p>}
          <h3 className="more-h">Test pipeline</h3>
          <Pipeline stages={p.stages} gaps={prep} />
          {gaps.length > 0 && (
            <p className="gaps">
              <b>Still to prepare for this one:</b> {gaps.join(", ")}
            </p>
          )}
          <dl>
            <dt>Job flow</dt>
            <dd>{p.flowNote}</dd>
            <dt>How fast</dt>
            <dd>{p.speedNote}</dd>
            <dt>How to prepare</dt>
            <dd>{p.prep}</dd>
            {p.retake && (
              <>
                <dt>If you fail</dt>
                <dd>{p.retake}</dd>
              </>
            )}
            <dt>After you pass</dt>
            <dd>{p.after}</dd>
            <dt>Pay</dt>
            <dd>{p.pay}</dd>
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
          </p>
        </div>
      </details>
    </li>
  );
}

function RowList({ items, prep }: { items: Platform[]; prep: Prep }) {
  if (!items.length) {
    return (
      <p className="empty">
        Nothing here matches your prep yet. Raise your DSA level or tick more test types above.
      </p>
    );
  }
  return (
    <ol className="rows">
      {items.map((p, i) => (
        <Row key={p.id} p={p} rank={i + 1} prep={prep} />
      ))}
    </ol>
  );
}

type Ref = { id: string; rank: number; why: string; p: Platform };

/** Project-first section: full rows plus link rows for platforms listed in other sections. */
function ProjectList({ items, refs, sort, prep }: { items: Platform[]; refs: Ref[]; sort: Sort; prep: Prep }) {
  if (!items.length && !refs.length) {
    return (
      <p className="empty">
        Nothing here matches your prep yet. Raise your DSA level or tick more test types above.
      </p>
    );
  }
  const rows: ({ kind: "p"; p: Platform; rank: number } | { kind: "ref"; r: Ref; rank: number })[] = [
    ...items.map((p) => ({ kind: "p" as const, p, rank: p.rank })),
    ...refs.map((r) => ({ kind: "ref" as const, r, rank: r.rank })),
  ];
  // Best-first keeps the researched order; other sorts list full rows first, then the links.
  if (sort === "best") rows.sort((a, b) => a.rank - b.rank);
  return (
    <ol className="rows">
      {rows.map((row, i) =>
        row.kind === "p" ? (
          <Row key={row.p.id} p={row.p} rank={i + 1} prep={prep} />
        ) : (
          <li key={row.r.id} className="ref-row">
            <span className="rank">{i + 1}</span>
            <span className="who">
              <a className="name" href={`#${row.r.id}`}>
                {row.r.p.name}
              </a>
              <span className="label">{row.r.why}</span>
            </span>
            <span className="ref-tag">
              Full entry under {KINDS.find((k) => k.id === row.r.p.kind)!.title}
            </span>
          </li>
        ),
      )}
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
  const [sort, setSort] = useState<Sort>("best");
  const [fastOnly, setFastOnly] = useState(false);
  const [dsa, setDsa] = useState<Dsa>("hard");
  const [formats, setFormats] = useState<Set<Format>>(() => new Set());
  const [onlyReady, setOnlyReady] = useState(false);
  const prep: Prep = useMemo(() => ({ dsa, formats }), [dsa, formats]);

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

  const toggle = (f: Format) =>
    setFormats((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });

  const keep = (stages: Stage[], speed: Speed) => {
    if (fastOnly && speed > 2) return false;
    if (DSA_ORDER[maxDsa(stages)] > DSA_ORDER[dsa]) return false;
    return !onlyReady || missing(stages, prep).length === 0;
  };

  const list = (() => {
    const cmp =
      sort === "pay"
        ? byPay
        : sort === "fast"
          ? bySpeed
          : sort === "easy"
            ? byEntry
            : byRank;
    const pick = (f: (p: Platform) => boolean) =>
      PLATFORMS.filter((p) => f(p) && keep(p.stages, p.speed)).sort(cmp);
    return {
      freelance: pick((p) => p.kind === "freelance"),
      vetted: pick((p) => p.kind === "vetted"),
      project: pick((p) => p.kind === "project"),
      takehome: pick((p) => p.kind === "takehome"),
    };
  })();

  const boards = (() => {
    return BOARDS.filter((x) => keep(LOOPS[x.mix].stages, x.speed)).sort((a, z) =>
      sort === "fast"
        ? a.speed - z.speed || a.rank - z.rank
        : sort === "easy"
          ? (a.mix === z.mix ? 0 : a.mix === "startup" ? -1 : 1) || a.rank - z.rank
          : a.rank - z.rank,
    );
  })();

  const projectRefs = PROJECT_REFS.map((r) => ({ ...r, p: PLATFORMS.find((p) => p.id === r.id)! })).filter(
    (r) => keep(r.p.stages, r.p.speed),
  );

  const counts: Record<Kind, number> = {
    freelance: list.freelance.length,
    boards: boards.length,
    vetted: list.vetted.length,
    project: list.project.length + projectRefs.length,
    takehome: list.takehome.length,
  };

  const total = PLATFORMS.length;
  const readyCount = PLATFORMS.filter(
    (p) => DSA_ORDER[maxDsa(p.stages)] <= DSA_ORDER[dsa] && missing(p.stages, prep).length === 0,
  ).length;

  return (
    <div className="directory">
      <section className="wrap prep" aria-labelledby="prep-h">
        <h2 id="prep-h">What have you prepared for?</h2>
        <p className="prep-lede">
          Pick the hardest DSA you can handle and tick the test types you&apos;re ready for. Every
          platform below then shows whether you&apos;re ready or what&apos;s still missing, stage by
          stage.
        </p>
        <div className="prep-grid">
          <div>
            <h3 id="dsa-h">DSA level</h3>
            <div className="seg seg-dsa" role="radiogroup" aria-labelledby="dsa-h">
              {(["none", "easy", "medium", "hard"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={dsa === d}
                  onClick={() => setDsa(d)}
                >
                  {d === "none" ? "No DSA" : d === "hard" ? "Hard (show all)" : `Up to ${DSA_LABEL[d].toLowerCase()}`}
                </button>
              ))}
            </div>
            <p className="hint">
              Platforms whose DSA is harder than this are hidden. LeetCode terms: easy is arrays and
              hash maps, medium adds sliding window, graphs and light DP, hard is Codility-style
              optimisation under time pressure.
            </p>
          </div>
          <div>
            <h3 id="fmt-h">Test types you&apos;re ready for</h3>
            <div className="fmt-chips" role="group" aria-labelledby="fmt-h">
              {PREP_FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={formats.has(f.id)}
                  onClick={() => toggle(f.id)}
                  title={f.hint}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="prep-actions">
              <button type="button" className="link" onClick={() => setFormats(new Set(PREP_FORMATS.map((f) => f.id)))}>
                Tick all
              </button>
              <button type="button" className="link" onClick={() => setFormats(new Set())}>
                Clear
              </button>
              <label className="toggle">
                <input type="checkbox" checked={onlyReady} onChange={(e) => setOnlyReady(e.target.checked)} />
                Only show platforms I&apos;m ready for
              </label>
            </div>
          </div>
        </div>
        <p className="prep-sum" aria-live="polite">
          You&apos;re ready for <b>{readyCount}</b> of {total} platforms.
        </p>
      </section>

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
              <a href="#left-out">Left out</a>
            </li>
          </ul>
          <div className="controls">
            <span className="bar-ready">
              Ready for {readyCount} of {total}
            </span>
            <div className="seg" role="group" aria-label="Sort">
              {(
                [
                  ["best", "Best first"],
                  ["fast", "Fastest to paid work"],
                  ["easy", "Easiest entry"],
                  ["pay", "Highest pay"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" aria-pressed={sort === id} onClick={() => setSort(id)}>
                  {label}
                </button>
              ))}
            </div>
            <label className="toggle">
              <input type="checkbox" checked={fastOnly} onChange={(e) => setFastOnly(e.target.checked)} />
              Paid work within 6 weeks
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
            <FlowPill flow={1} /> how many relevant jobs appear
          </span>
          <span>
            <span className="swatch sw-range" /> Realistic monthly range
          </span>
          <span>
            <span className="swatch sw-band" /> Your $5–8K target
          </span>
          <span>Select a row to see each test stage, what&apos;s inside and how to prepare.</span>
        </div>

        <section id="freelance" className="sect k-freelance" aria-labelledby="freelance-h">
          <SectionHead kind="freelance" count={counts.freelance} />
          <RowList items={list.freelance} prep={prep} />
        </section>


        <section id="vetted" className="sect k-vetted" aria-labelledby="vetted-h">
          <SectionHead kind="vetted" count={counts.vetted} />
          <RowList items={list.vetted} prep={prep} />
        </section>

        <section id="boards" className="sect k-boards" aria-labelledby="boards-h">
          <SectionHead kind="boards" count={counts.boards} />
          <p className="sect-note">
            The board doesn&apos;t test you; the employer does. These are the two loops you&apos;ll
            usually meet.
          </p>
          <div className="loops">
            {(["startup", "bigco"] as const).map((m) => {
              const gaps = missing(LOOPS[m].stages, prep);
              return (
                <div key={m} className="loop">
                  <h3>
                    {LOOPS[m].title} <DsaBadge level={maxDsa(LOOPS[m].stages)} /> <Ready gaps={gaps} />
                  </h3>
                  <Pipeline stages={LOOPS[m].stages} gaps={prep} />
                </div>
              );
            })}
          </div>
          {boards.length ? (
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
                      {LOOPS[b.mix].title}
                    </span>
                  </span>
                  <span className="board-speed">
                    <FlowPill flow={b.flow} />
                    <SpeedPill speed={b.speed} />
                    <span className="cost">{b.cost}</span>
                  </span>
                  <span className="board-more">
                    {b.flowNote} {b.speedNote}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty">Nothing here matches your prep yet. Raise your DSA level or tick more test types above.</p>
          )}
        </section>

        <section id="project" className="sect k-project" aria-labelledby="project-h">
          <SectionHead kind="project" count={counts.project} />
          <ProjectList items={list.project} refs={projectRefs} sort={sort} prep={prep} />
        </section>

        <section id="takehome" className="sect k-takehome" aria-labelledby="takehome-h">
          <SectionHead kind="takehome" count={counts.takehome} />
          <RowList items={list.takehome} prep={prep} />
        </section>
      </div>
    </div>
  );
}
