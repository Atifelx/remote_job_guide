import Directory from "./Directory";
import { DROPPED, KINDS, PLATFORMS, REALITY, TESTS, byEntry } from "@/lib/data";

const shortName = (name: string) => name.replace(/\s*\(.*\)$/, "");

function Ladder() {
  return (
    <section className="ladder-wrap" aria-labelledby="ladder-h">
      <div className="ladder-head">
        <h2 id="ladder-h">Entry tests, from walk-in to top 3%</h2>
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
                  {TESTS.slice(0, 2).map((t) => (
                    <div role="cell" key={t.id} className="ladder-cell" />
                  ))}
                  <div role="cell" className="ladder-cell ladder-span">
                    <a href="#boards">
                      Each employer runs their own loop: take-home, live coding, DSA and system design. See the two typical loops
                    </a>
                  </div>
                  {TESTS.slice(6).map((t) => (
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
          Only the top, most trusted platforms in each section, ranked by how many relevant jobs
          appear and your chance of getting onboarded. Each has its full test pipeline: every stage,
          what&apos;s inside it, how much DSA it needs and how to prepare.
          Monthly figures are for your profile (5+ years full-stack, AI agents) at typical hours; most
          are estimates. Checked October 2026.
        </p>
        <div className="start">
          <div>
            <h2>Most job flow</h2>
            <p>
              Upwork for freelance projects, Mercor and micro1 for test-and-match contracts, and
              Wellfound, LinkedIn and Himalayas for direct jobs.
            </p>
          </div>
          <div>
            <h2>Fastest to paid work</h2>
            <p>
              Crossover (you apply to an open role; offers in days), a YC Work at a Startup profile
              founders can find, and Upwork with your existing history. Turing and micro1 pools can take
              months.
            </p>
          </div>
          <div>
            <h2>No DSA at all</h2>
            <p>
              Algora (a merged PR is the test), Upwork, Fiverr Pro, Crossover (aptitude test instead)
              and every take-home company: Automattic, Zapier, GitLab, DuckDuckGo, Doist and Toggl.
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
        <section id="left-out" className="skip-sect" aria-labelledby="skip-h">
          <details className="left-out">
            <summary>
              <h2 id="skip-h">Checked and left out</h2>
              <span>
                Platforms that didn&apos;t make the top lists ({DROPPED.reduce((n, g) => n + g.items.length, 0)}{" "}
                entries), with the reason for each
              </span>
            </summary>
            {DROPPED.map((g) => (
              <div key={g.title} className="drop-group">
                <h3>{g.title}</h3>
                <ul className="skip">
                  {g.items.map((d) => (
                    <li key={d.name}>
                      <b>{d.name}</b>
                      <span>{d.why}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </section>

        <section className="method" aria-labelledby="method-h">
          <h2 id="method-h">How this was ranked</h2>
          <p>
            Each section is ranked best-first by how many relevant jobs appear (Similarweb and Semrush
            traffic, published job counts) and your chance of getting onboarded and paid (acceptance
            rates, placement evidence, Trustpilot and payment reports), checked October 2026. Entry
            difficulty (1–5) scores the whole pipeline: open sign-up is 1; AI interviews and short
            automated challenges 2; live technical interviews, take-homes and trials 3; multi-hour test
            batteries and medium-to-hard DSA 4; pipelines that pass only the top few percent 5. Ties go
            to the kind of gate, then to the DSA level.
          </p>
          <p>
            DSA levels use LeetCode terms and take the hardest stage in the pipeline. The job-board loops
            are typical patterns, not rules; each employer sets its own.
          </p>
          <p>
            &ldquo;Paid work in&rdquo; is how soon paid work usually starts after you apply, from
            candidate reports and the platform&apos;s own process: platforms where you apply to a live
            role start sooner than pools where passing only gets you into a queue. Where no timing data
            exists, the entry says so.
          </p>
          <p>
            Stage details come from official pages where they exist, otherwise from candidate write-ups
            dated 2024–2026; anything that couldn&apos;t be confirmed says so on the entry. Monthly
            ranges are realistic hourly rates for an India-based engineer multiplied by typical hours.
            Treat every figure as a starting point to check, not a promise.
          </p>
        </section>
      </div>
    </main>
  );
}
