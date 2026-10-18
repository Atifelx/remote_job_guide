import Directory from "./Directory";
import { KINDS, PLATFORMS, REALITY, SKIP, TESTS, byEntry } from "@/lib/data";

const shortName = (name: string) => name.replace(/\s*\(.*\)$/, "");

function Ladder() {
  return (
    <section className="ladder-wrap" aria-labelledby="ladder-h">
      <div className="ladder-head">
        <h2 id="ladder-h">Entrance tests, from walk-in to top 3%</h2>
        <p>
          Each column is a kind of entry test, easiest on the left. Each row is one way in. Select a
          name to jump to its details.
        </p>
      </div>
      <div className="ladder-scroll">
        <div className="ladder" role="table" aria-label="Platforms by portal type and entry test">
          <div role="row" className="ladder-row ladder-top">
            <div role="columnheader" className="ladder-corner">
              Easier
              <span aria-hidden="true" className="ladder-arrow" />
              Harder
            </div>
            {TESTS.map((t, i) => (
              <div
                role="columnheader"
                key={t.id}
                className={`ladder-col t-${t.id}`}
                style={{ ["--step" as string]: i }}
                title={t.hint}
              >
                <span>{t.label}</span>
              </div>
            ))}
          </div>
          {KINDS.map((k) => (
            <div role="row" className={`ladder-row k-${k.id}`} key={k.id}>
              <div role="rowheader" className="ladder-kind">
                <a href={`#${k.id}`}>{k.title}</a>
              </div>
              {k.id === "boards" ? (
                <>
                  {TESTS.slice(0, 4).map((t) => (
                    <div role="cell" key={t.id} className="ladder-cell" />
                  ))}
                  <div role="cell" className="ladder-cell ladder-span">
                    <a href="#boards">
                      Each employer runs their own loop: take-home, live coding, DSA and system design
                    </a>
                  </div>
                  {TESTS.slice(7).map((t) => (
                    <div role="cell" key={t.id} className="ladder-cell" />
                  ))}
                </>
              ) : (
                TESTS.map((t) => {
                  const here = PLATFORMS.filter((p) => p.kind === k.id && p.test === t.id).sort(byEntry);
                  return (
                    <div role="cell" key={t.id} className="ladder-cell">
                      {here.map((p) => (
                        <a key={p.id} href={`#${p.id}`} className="chip">
                          {shortName(p.name)}
                        </a>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <header className="hero wrap">
        <h1>Remote work from India, sorted by how hard the door is</h1>
        <p className="lede">
          Four ways to get paid in USD, and every platform in each one ranked by its entry test: open
          sign-up, AI interview, practical task, live coding, DSA or aptitude. Monthly figures are for
          your profile (5+ years full-stack, AI agents) at typical hours; most are estimates built
          from published hourly rates. Checked October 2026.
        </p>
        <div className="start">
          <div>
            <h2>Fastest money, no DSA test</h2>
            <p>
              Upwork (you already have history there), micro1 and Mercor (AI interviews with practical
              coding), then Uplers (built for Indian developers).
            </p>
          </div>
          <div>
            <h2>Can reach $5–8K a month</h2>
            <p>
              Braintrust, Crossover and Toptal, or direct jobs from the boards. Crossover and Toptal have
              the hardest tests.
            </p>
          </div>
        </div>
      </header>

      <div className="wrap">
        <Ladder />

        <dl className="reality" aria-label="What India-based engineers earn">
          {REALITY.map((r) => (
            <div key={r.value} className={r.you ? "you" : undefined}>
              <dt>{r.value}</dt>
              <dd>{r.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Directory />

      <div className="wrap">
        <section id="skip" className="skip-sect" aria-labelledby="skip-h">
          <h2 id="skip-h">Skip these: not open to India</h2>
          <p>Don&apos;t spend time on tests here. Each one restricts location or doesn&apos;t pay in USD.</p>
          <ul className="skip">
            {SKIP.map(([name, why]) => (
              <li key={name}>
                <b>{name}</b>
                <span>{why}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="method" aria-labelledby="method-h">
          <h2 id="method-h">How this was ranked</h2>
          <p>
            Entry difficulty (1–5) scores the test itself: open sign-up is 1; AI interviews and
            per-project qualifiers 2; practical tests and multi-step screens 3; live coding, DSA and
            one-shot proctored tests 4; tests that pass only the top few percent 5. Ties go to the kind
            of test, then to the platform the research ranked easier overall (that rank also counts
            competition and waiting time).
          </p>
          <p>
            Monthly ranges are realistic hourly rates for an India-based engineer multiplied by typical
            hours (about 160 for full-time contracts, 60–120 for AI-training projects). Where a platform
            publishes only what clients pay, your share is lower. Treat every figure as a starting point
            to check, not a promise.
          </p>
          <p>
            Freelance, job board, test-and-match and skip-list entries come from research of platform
            pages, reviews and reports dated 2025–2026, linked on each entry. The build-first portals
            were added afterwards, weren&apos;t part of that check, and carry no pay estimates.
          </p>
        </section>
      </div>
    </main>
  );
}
