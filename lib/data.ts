// Platform data. Entries come from "Remote platforms that hire from India, ranked by ease
// (Oct 2026)" plus a second research pass (Oct 2026) on test pipelines, legitimacy and
// build-first hiring. Stage details are from official pages where they exist, otherwise from
// candidate write-ups; anything unconfirmed says so in the text.

import type { Dropped, Dsa, Format, Kind, Platform, Speed, Stage, Test } from "./types";

export const TESTS: { id: Test; label: string; hint: string }[] = [
  { id: "open", label: "Open sign-up", hint: "Make a profile and start bidding" },
  { id: "ai", label: "AI interview", hint: "Spoken or video interview scored by AI" },
  { id: "practical", label: "Practical / take-home", hint: "Real-world task or code review, no puzzles" },
  { id: "trial", label: "Paid trial on real work", hint: "Days to weeks of paid work in the real codebase" },
  { id: "live", label: "Live coding", hint: "Coding with an interviewer watching" },
  { id: "dsa", label: "DSA test", hint: "Timed algorithm and data-structure problems" },
  { id: "aptitude", label: "Aptitude test", hint: "IQ-style questions against the clock" },
];

export const TEST_ORDER = Object.fromEntries(TESTS.map((t, i) => [t.id, i])) as Record<Test, number>;

export const FORMATS: { id: Format; label: string; hint: string }[] = [
  { id: "ai", label: "AI interview", hint: "Spoken or video interview scored by an AI" },
  { id: "english", label: "English check", hint: "Spoken or written English and communication" },
  { id: "mcq", label: "Stack quiz", hint: "Multiple-choice on your language and framework" },
  { id: "dsa", label: "DSA coding", hint: "Timed algorithm problems" },
  { id: "live", label: "Live coding", hint: "Coding while an interviewer watches" },
  { id: "takehome", label: "Take-home project", hint: "Build something on your own time to a spec" },
  { id: "trial", label: "Paid trial on real work", hint: "Paid days or weeks inside a real codebase" },
  { id: "codereview", label: "Code / PR review", hint: "Review a diff or merge request and defend your comments" },
  { id: "aieval", label: "Judging AI code", hint: "Rank, fix and critique code written by AI models" },
  { id: "sysdesign", label: "System design", hint: "Design and scale a system out loud" },
  { id: "aptitude", label: "Aptitude (CCAT)", hint: "50 logic, maths and verbal questions in 15 minutes" },
  { id: "talk", label: "Interviews and calls", hint: "Talking through your experience with a person" },
];

export const SPEED_LABEL: Record<Speed, string> = {
  1: "Days to 2 weeks",
  2: "2–6 weeks",
  3: "1–3 months",
  4: "Months, or never",
};

export const DSA_ORDER: Record<Dsa, number> = { none: 0, easy: 1, medium: 2, hard: 3 };
export const DSA_LABEL: Record<Dsa, string> = { none: "None", easy: "Easy", medium: "Medium", hard: "Hard" };

export const KINDS: { id: Kind; title: string; short: string; blurb: string }[] = [
  {
    id: "freelance",
    title: "Freelancer portals",
    short: "Freelance",
    blurb:
      "Open marketplaces where clients pick you from proposals and reviews. Only one is worth a senior developer's time: the rest compete on price.",
  },
  {
    id: "boards",
    title: "Direct remote job boards",
    short: "Job boards",
    blurb:
      "The employer hires you directly and runs their own interviews. This is where the highest offers are, but you need the prep. For India-eligible remote roles, expect $2–6K a month; AI and Forward Deployed specialists can get $6K+.",
  },
  {
    id: "vetted",
    title: "Test-and-match marketplaces",
    short: "Test and match",
    blurb:
      "Like Turing and Andela: pass their test pipeline once, join a pool, and get matched to clients. On every one of these, passing gets you into a queue, not into paid work, so run two or three in parallel.",
  },
  {
    id: "build",
    title: "Build-first hiring",
    short: "Build first",
    blurb:
      "Companies that decide by watching you do real work: a paid trial in their codebase, a merge-request review, or contract-to-hire. No contests or prize bounties. Toptal's test project and Crossover's real-work assessment are build steps too, listed under test-and-match because their first gates are DSA and aptitude.",
  },
];

export const PLATFORMS: Platform[] = [
  // Freelancer portals
  {
    id: "upwork", name: "Upwork", url: "https://www.upwork.com", kind: "freelance", label: "Freelance marketplace",
    test: "open", difficulty: 1,
    speed: 2,
    speedNote: "No pool: work starts when a client hires you. Your review history shortens this; new profiles often wait weeks.",
    stages: [
      { title: "Profile review", formats: [], inside: "New profiles are reviewed before you can bid. Yours is already approved, with $20K+ earned." },
      { title: "Proposal", formats: [], inside: "A written proposal per job. Connects cost $0.15 each and aren't refunded if you lose." },
      { title: "Client interview", formats: ["talk"], time: "20–45 min", inside: "Each client runs their own, usually a call about past work. There's no platform-wide skills test." },
      { title: "Expert-Vetted (optional)", formats: ["talk"], time: "30 min", inside: "Invite-only since 30 June 2024: an interview with a Talent Manager on hard and soft skills, decided in 4–6 weeks. The badge shows only to Enterprise and Business Plus clients." },
    ],
    prep: "Your history is the asset. Pin AI-agent case studies to your profile and bid on fewer, closer-matched jobs.",
    after: "No pool or waiting list: you start when a client hires you. Steady long-term clients take months to build, but this is the one open marketplace where $5–8K a month is realistic.",
    lo: 2000, hi: 6000, est: true,
    pay: "India full-stack median is $15–35/hr; AI-agent work pays more once you have reviews. Since May 2025 the fee is 0–15% per contract; non-US freelancers lose about 13–18% in total to fees.",
    watch: "Many proposals go unanswered; Expert-Vetted can't be applied for.",
    src: [["Fees", "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee"], ["Expert-Vetted", "https://support.upwork.com/hc/en-us/articles/360049625454-Expert-Vetted-talent"]],
  },

  // Test-and-match: developer networks
  {
    id: "arc", name: "Arc.dev", url: "https://arc.dev/talent", kind: "vetted", group: "dev", label: "Vetted network, accepts India",
    test: "live", difficulty: 3,
    speed: 2,
    speedNote: "You apply to live roles, so there's no long pool; Arc claims about 14 days to hire (a competitor's figure).",
    stages: [
      { title: "Profile screening", formats: [], inside: "A person reviews your work history and GitHub. Padded resumes get rejected." },
      { title: "Communication check", formats: ["english"], inside: "A recorded video or voice self-introduction to check English and remote readiness." },
      { title: "Technical interview", formats: ["live", "dsa"], dsa: "medium", time: "about 1 hr", inside: "Live coding or pair programming with an expert, on algorithms and your own domain. Arc publishes no test platform or retake policy." },
      { title: "Final review and onboarding call", formats: ["talk"], inside: "A last check, then you're in the network. Arc claims the top 2.3% get through." },
    ],
    prep: "Medium LeetCode while explaining your reasoning out loud, a polished 2-minute video intro, and an up-to-date GitHub.",
    after: "Vetting only starts when a matching role opens, and clients find you through Arc's matching, so expect to wait. Profiles can sit in 'Reviewing' for a long time.",
    lo: 3000, hi: 6000, est: false,
    pay: "Arc's India page: freelancers $10–80/hr; India remote developers expect about $48.9K/yr on average. Free for developers; Arc adds a 20–40% markup for clients.",
    watch: "Long waits between passing and a client. Trustpilot reviews are mostly positive with on-time payouts.",
    src: [["Vetting", "https://arc.dev/employer-blog/vetting-process/"], ["How Arc works", "https://arc.dev/how-arc-works"], ["India pay", "https://arc.dev/remote-developer-salary/india"]],
  },
  {
    id: "turing", name: "Turing", url: "https://www.turing.com/jobs", kind: "vetted", group: "dev", label: "Developer jobs track",
    test: "dsa", difficulty: 4,
    speed: 4,
    speedNote: "Testing takes 3–4 days, then 3–4 months in the pool is commonly reported. Treat passing as joining a queue.",
    stages: [
      { title: "Work-experience survey", formats: [], time: "20–30 min", inside: "57 questions about your experience (60 minutes allowed)." },
      { title: "Tech-stack quizzes", formats: ["mcq"], time: "45–120 min each", inside: "Multiple-choice on your stack's fundamentals and reading code. Turing says to expect 3–6 hours of testing in total." },
      { title: "Coding challenge", formats: ["dsa", "aieval"], dsa: "medium", time: "about 90 min", proctored: true, inside: "Two LeetCode-style problems, one easy and one medium; you need 80%+ of test cases to pass. Newer versions add a section comparing two AI model answers." },
      { title: "Technical interview (some tracks)", formats: ["talk"], time: "about 1 hr", inside: "Reports conflict: some tracks add a 1-hour technical interview, others go straight to matching." },
      { title: "Client interview", formats: ["talk"], inside: "After AI matching, the client runs their own interview." },
    ],
    prep: "Medium LeetCode on arrays, strings, hash maps, sliding window and light DP; timed multiple-choice practice on your stack; practise judging which of two AI answers is better.",
    retake: "Wait 3 months. Passed tests stay valid about 6 months (not confirmed on an official page).",
    after: "Most open roles are now LLM-trainer contracts, and people report 3–4 months in the pool after passing. Contracts are 20, 30 or 40 hrs/week with 4 hours of US Pacific overlap.",
    lo: 2500, hi: 6000, est: true,
    pay: "Not published. One 2025 case: the client paid $14.5K a month and the developer received $6K.",
    watch: "Trustpilot about 2.5/5 from 200+ reviews, mostly from people stuck in the pool; India reviews mention layoffs and a lack of projects. Placed contractors say payments are on time.",
    src: [["Test prep", "https://www.turing.com/blog/turing-developer-test-preparation-tips"], ["How to get hired", "https://www.turing.com/blog/turing-com-review-good-for-remote-developer-jobs"], ["Glassdoor interviews", "https://www.glassdoor.com/Interview/Turing-Software-Engineer-Interview-Questions-EI_IE2462330.0,6_KO7,24.htm"]],
  },
  {
    id: "andela", name: "Andela", url: "https://www.andela.com/for-talent", kind: "vetted", group: "dev", label: "Vetted network, 4+ years",
    test: "dsa", difficulty: 4,
    speed: 3,
    speedNote: "Pool model with slow matching and long client loops; no measured timing found.",
    check: "India isn't confirmed on Andela's list of approved countries (the page returned an error during research). Confirm before you take the test.",
    stages: [
      { title: "English test", formats: ["english"], inside: "AI-scored. Can be skipped with an English-medium degree." },
      { title: "Skills assessment", formats: ["dsa"], dsa: "hard", time: "about 1 hr, within 48 hrs", proctored: true, inside: "Several coding challenges in your chosen language on Andela's Qualified platform; candidates report 2–4 problems, medium to hard. Camera snapshots: a blurry image can disqualify you." },
      { title: "Live technical interview", formats: ["live", "talk"], time: "60 min", inside: "Discussion plus practical work: why you designed things the way you did, and real-world problems rather than puzzles." },
      { title: "Client interviews", formats: ["talk"], inside: "After matching. Contracts start with a 15-day trial." },
    ],
    prep: "Timed medium-to-hard problems on HackerRank or Qualified with clean, readable code, and a walkthrough of a system you built.",
    retake: "180 days after failing or being disqualified from the assessment; 90 days after a failed interview (you restart at the interview).",
    after: "Matching is slow and client loops are long. Paid in USD as a contractor.",
    lo: 2500, hi: 5000, est: true,
    pay: "India pay not published; low-confidence estimate.",
    watch: "Talent pool is mostly Africa and Latin America; several rounds of staff layoffs 2023–25.",
    src: [["Skills test", "https://help.andela.com/hc/en-us/articles/26607236489363-Step-2-The-technical-skills-test"], ["Live interview", "https://help.andela.com/hc/en-us/articles/26571687079955-Step-2-The-live-technical-interview"], ["Eligibility", "https://help.andela.com/hc/en-us/articles/26812894405267-Eligibility-requirements-to-join-the-Andela-Talent-Cloud"]],
  },
  {
    id: "toptal", name: "Toptal", url: "https://www.toptal.com", kind: "vetted", group: "dev", label: "Vetted network, accepts India",
    test: "dsa", difficulty: 5,
    speed: 3,
    speedNote: "Screening takes 3–8 weeks, then 1–4 weeks to a first client match.",
    stages: [
      { title: "English and personality interview", formats: ["english", "talk"], inside: "A live call. 26.4% of all applicants are still in after this stage." },
      { title: "Skill review", formats: ["dsa"], dsa: "hard", time: "90–100 min", inside: "Timed Codility test: 3 problems (easy, medium, hard), auto-scored on correctness and performance; about 210/300 to pass. Some 2026 reports say HackerRank plus short theory quizzes. 7.4% still in." },
      { title: "Live screening", formats: ["live", "codereview"], inside: "Two live coding tasks of 15–20 minutes each; the screener also goes through your skill-review solutions with you. 3.6% still in." },
      { title: "Test project", formats: ["takehome", "codereview"], time: "1–3 weeks, 30–50 hrs", inside: "Usually a full-stack app built to a spec, then a call where you demo it and defend your code. Unpaid. 3.2% still in." },
      { title: "Ongoing performance tracking", formats: [], inside: "About 3% of applicants end up in the network." },
    ],
    prep: "Codility Lessons (prefix sums, sorting, greedy, DP, graphs); aim to fully solve 2 of 3 with efficient code. Budget about 40 hours for the project.",
    retake: "About 6 months is commonly reported; no official policy found.",
    after: "Passing doesn't guarantee work: you apply to client jobs and may still interview. Payout delays of 20 days to 6 weeks are reported.",
    lo: 5000, hi: 10000, est: true,
    pay: "You set your rate; reported $35–150+/hr. Toptal adds a 30–60% markup for clients.",
    watch: "The 30–50 hour test project is unpaid.",
    src: [["Top 3%", "https://www.toptal.com/top-3-percent"], ["FAQ", "https://www.toptal.com/freelance-jobs/faq"], ["Codility write-up", "https://souvic.medium.com/how-i-passed-the-toptal-codility-test-32f99f22d758"]],
  },
  {
    id: "crossover", name: "Crossover", url: "https://www.crossover.com/jobs/software-engineer/india", kind: "vetted", group: "dev", label: "Fixed USD pay, same in every country",
    test: "aptitude", difficulty: 5,
    speed: 1,
    speedNote: "You apply to a specific open role, so an offer means the job starts; offers often come within days of the last test.",
    stages: [
      { title: "Fit questions and AI screen", formats: ["ai"], time: "15–20 min", inside: "Basic yes/no fit questions and a short AI screening interview." },
      { title: "CCAT aptitude test", formats: ["aptitude"], time: "15 min", inside: "50 verbal, maths and logic questions in 15 minutes, no calculator. Switching tabs disqualifies you. Each role has its own cutoff." },
      { title: "Skills test and real-work assessment", formats: ["takehome"], inside: "A job-like task graded against a published rubric. 'AI-First' engineering roles expect daily use of Claude Code, Cursor or Copilot." },
      { title: "Interview", formats: ["talk"], time: "about 30 min", inside: "Google Meet with an engineering leader." },
      { title: "Proctored CCAT", formats: ["aptitude"], time: "15 min", proctored: true, inside: "The CCAT again with webcam, phone proctoring and an ID check. Crossover says about 1 in 100 candidates reach this step." },
    ],
    prep: "CCAT practice tests (about 18 seconds per question) and a spec-first, test-driven workflow with AI coding tools.",
    retake: "6 months.",
    after: "Offers often come within days. Full-time, 40 hrs/week as an independent contractor, paid weekly via Payoneer.",
    lo: 4000, hi: 8300, est: true,
    pay: "Fixed USD rate per role: standard engineering roles about $100K/yr (~$50/hr), some up to $200K.",
    watch: "WorkSmart tracking: screenshots, webcam photos and keystrokes in 10-minute blocks; idle time is unpaid. No leave or benefits.",
    src: [["Selection process", "https://www.crossover.com/selection-process"], ["Proctored CCAT", "https://www.crossover.com/resources/pccat-guide"], ["Skill tests", "https://www.crossover.com/resources/crossover-s-skill-based-assessments-official-skill-test-guide"], ["Pay", "https://www.crossover.com/help/contractor-pay-calculation"]],
  },

  // Test-and-match: AI-training networks
  {
    id: "micro1", name: "micro1", url: "https://www.micro1.ai/experts", kind: "vetted", group: "ai", label: "AI-interview vetting, open worldwide",
    test: "ai", difficulty: 2,
    speed: 4,
    speedNote: "Pool: the first matching window is 1–2 weeks, but many sit in 'Hiring Manager Reviewing' for 30 days and then get 'Not Selected'.",
    stages: [
      { title: "Resume and role", formats: [], inside: "Pick a role and upload your resume, then verify your ID." },
      { title: "Practice interview (optional)", formats: ["ai"], time: "18 min", inside: "A free practice run with the AI interviewer." },
      { title: "Zara AI interview", formats: ["ai", "dsa"], dsa: "medium", time: "20–40 min", proctored: true, inside: "Spoken, adaptive interview (about 7 minutes per skill) with camera and screen share, recorded for human review. Engineering roles add live coding: usually one easy/medium LeetCode-style problem (merge intervals is reported) plus debugging or optimisation, in any language." },
      { title: "Certification and matching", formats: [], inside: "The result shows immediately; a hiring manager then reviews you for specific projects." },
    ],
    prep: "One easy/medium problem talked through out loud (intervals, arrays, hash maps) and clear spoken answers. Long pauses before answering are watched as an anti-cheating signal.",
    after: "Certified people go into a pool; micro1 says far more pass than there are openings. Applicants report 'Hiring Manager Reviewing' for up to 30 days, then 'Not Selected'.",
    lo: 2000, hi: 5000, est: true,
    pay: "$20–200/hr overall; one SWE AI-trainer listing shows $20–75/hr. Paid in USD via Deel twice a month, reported as reliable. India rate not published.",
    watch: "Hubstaff time tracking. In May 2026 Indian developers posted 'scam alert' threads about automated rejections after a 60-minute interview. No unpaid completed work was reported, but don't count on it as your only channel.",
    src: [["Interview questions", "https://www.micro1.ai/interview-questions"], ["Interview write-up", "https://prachub.com/interview-experiences/micro1-software-engineer-zara-ai-interview-with-rapid-technical-questions-59efcc346c"], ["Waiting", "https://getaiwork.com/articles/micro1-no-response/"]],
  },
  {
    id: "mercor", name: "Mercor", url: "https://www.mercor.com/experts/software-engineers/", kind: "vetted", group: "ai", label: "Expert contracts for AI labs",
    test: "ai", difficulty: 2,
    speed: 2,
    speedNote: "Picked candidates usually start in 2–4 weeks and Stripe holds the first payout 7 days; many applicants are never matched.",
    stages: [
      { title: "AI video interview", formats: ["ai", "dsa"], dsa: "easy", time: "about 20 min", inside: "About your resume and projects, plus data-structure questions. Reports differ: some describe only spoken questions, others an easy-to-medium problem solved while the AI watches your screen. Up to 3 retakes, but hiring managers see the count and a retake resets your application." },
      { title: "Role test (some roles)", formats: ["takehome"], inside: "Some roles add a coding challenge, take-home or domain test." },
      { title: "Paid work trial", formats: ["trial", "aieval"], paid: true, time: "4–6 hrs", inside: "One paid trial per person, ever, on real project tasks." },
    ],
    prep: "Rehearse a 2-minute walkthrough of your strongest AI-agent project and its trade-offs. Using an LLM to write answers or evaluate code is against the rules.",
    after: "No formal rejections: no match within 4–6 weeks means not picked. Projects end abruptly (about 800 contractors offboarded from one project in May 2026), and offboarding decisions are final.",
    lo: 2000, hi: 6000, est: true,
    pay: "Official SWE range $80–200/hr; Glassdoor shows $50–84/hr from 15 reports. A 'Software Engineer – India' contract is listed at 15–40 hrs/week. Paid weekly via Stripe or Wise. In Nov 2025 a Meta project relaunched at $16/hr instead of $21.",
    watch: "Screen monitoring with Insightful; 2026 contractor-misclassification lawsuit and data-breach class action.",
    src: [["Software roles", "https://www.mercor.com/experts/software-engineers/"], ["AI interview", "https://talent.docs.mercor.com/support/ai-interview"], ["Pay cut", "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/"]],
  },
  {
    id: "turing-agi", name: "Turing AGI", url: "https://work.turing.com/", kind: "vetted", group: "ai", label: "Coding-trainer contracts",
    test: "practical", difficulty: 2,
    speed: 3,
    speedNote: "Profiles can sit 'assigned' for weeks with no tasks before a project starts.",
    check: "The senior 'AI Evaluation / Coding Agents' role ($100–150/hr: AI interview, code-evaluation exercise, manager interview) is North America only. The pipeline below is the India-eligible track.",
    stages: [
      { title: "Self-scheduled coding challenge", formats: ["dsa"], dsa: "medium", time: "30–45 min", inside: "An automated challenge in any language on Turing's Vetsmith platform. Difficulty isn't published; likely easy to medium." },
      { title: "Project matching", formats: ["aieval"], inside: "Assigned to LLM-training projects: writing and judging code and model answers." },
    ],
    prep: "Easy/medium timed problems in your best language; practise explaining why one model answer is better than another.",
    after: "Minimum 20 hrs/week with 4 hours of Pacific overlap (late evening in India). Contracts start at 1 month; software contracts average about 8.4 weeks. Profiles can sit 'assigned' for weeks with no tasks.",
    lo: 1500, hi: 5000, est: true,
    pay: "India rate not published; US LLM trainers earn $29–51/hr. Paid on the 1st and 16th, reported on time.",
    watch: "Confirm the USD rate before you commit hours.",
    src: [["India-eligible listing", "https://work.turing.com/r/8ZxbHe4qSQ"], ["Review", "https://talentsforai.com/blog/is-turing-legit/"]],
  },
  {
    id: "g2i", name: "G2i", url: "https://www.g2i.ai/for-talent", kind: "vetted", group: "ai", label: "Senior engineers judging AI-written code",
    test: "practical", difficulty: 3,
    speed: 1,
    speedNote: "Onboarding is designed to finish in about a week (about 3.5 hours of active work), ending in a real production task.",
    check: "India isn't named ('150+ countries… some in Asia'), and whether the final production task is paid isn't confirmed. Check both before you start.",
    stages: [
      { title: "Async code review", formats: ["codereview"], inside: "Review code on your own time and write up what you'd change." },
      { title: "Credentials check", formats: [], inside: "Experience and identity; needs 3–4+ years." },
      { title: "Training course", formats: [], inside: "How G2i's AI-evaluation work is scored." },
      { title: "Real production task", formats: ["aieval", "codereview"], inside: "Your final interview is a real task: ranking output from AI coding agents (Codex, Claude Code), fixing AI-generated code, writing tests and written critiques." },
    ],
    prep: "Practise reviewing AI-generated diffs: spotting bugs, ranking two solutions and writing short, specific critiques. Be sharp in your main framework.",
    after: "Between projects you sit on a bench. Paid weekly, and G2i says it pays even if the client doesn't.",
    lo: 2500, hi: 6000, est: true,
    pay: "Senior SWE AI-training roles $100–200/hr at 10–20 hrs/week (rate depends partly on location); other postings $30–70/hr. Open in 150+ countries (May 2026). India rate not published.",
    watch: "Bench time between projects is the main complaint; no lawsuits found.",
    src: [["For talent", "https://www.g2i.ai/for-talent"], ["2026 hiring", "https://jobbi.org/news/g2i-is-hiring-50-software-engineers-at-up-to-200hour-to-judge-ai-written-code/"]],
  },
  {
    id: "xai", name: "xAI AI Tutor (Software Engineering)", url: "https://x.ai/careers", kind: "vetted", group: "ai", label: "Direct contract with the lab, no middleman",
    test: "dsa", difficulty: 3,
    speed: 2,
    speedNote: "A direct contract for a specific role rather than a marketplace pool. No timing data found; assumed weeks, not months.",
    check: "The listing says 'remote from any location worldwide, subject to legal eligibility' and an aggregator lists India, but xAI hasn't confirmed India. International pay is disclosed only during recruitment. Stages below come from candidate reports.",
    stages: [
      { title: "Screening", formats: ["talk"], time: "about 10 min", inside: "A video intro or about 12 quick questions." },
      { title: "CodeSignal coding test", formats: ["dsa"], dsa: "medium", time: "about 60 min", proctored: true, inside: "Roughly LeetCode easy to medium." },
      { title: "Writing test (some roles)", formats: ["english"], proctored: true, inside: "Candidates say it's graded strictly: you'll explain and critique code in writing." },
      { title: "Short interview", formats: ["talk"], inside: "Then a contract." },
    ],
    prep: "Timed easy-to-medium CodeSignal practice, plus writing clear, precise critiques of code (the core of the work).",
    after: "About 10+ hrs/week on average and you set your own hours.",
    lo: null, hi: null, est: false,
    pay: "$60–100/hr for US candidates (July 2026); the India rate is disclosed during recruitment.",
    watch: "Cut about 500 generalist tutors in September 2025 and kept specialists such as coders; Indeed reviewers call the work unstable.",
    src: [["Listing", "https://job-boards.greenhouse.io/xai/jobs/5063490007"], ["Interviews", "https://www.glassdoor.com/Interview/x-ai-AI-Tutor-Interview-Questions-EI_IE1266796.0,4_KO5,13.htm"], ["India on aggregator", "https://www.whynotremote.com/jobs/ai-tutor-software-engineering-6cf8db5e"]],
  },

  // Build-first hiring
  {
    id: "automattic", name: "Automattic", url: "https://automattic.com/work-with-us/how-we-hire-developers/", kind: "build", label: "WordPress.com, Tumblr, WooCommerce",
    test: "trial", difficulty: 3,
    speed: 2,
    speedNote: "Paid work starts with the trial, after an application and a take-home of about a week.",
    check: "India is likely (staff in 80+ countries, India roles on LinkedIn), but whether India hires are USD contractors or employed through a local service isn't confirmed. Ask on the first call.",
    stages: [
      { title: "Written application", formats: [], inside: "Answers to written questions instead of a cover letter." },
      { title: "Slack chat with an engineer", formats: ["talk"], inside: "A text-based interview about your work." },
      { title: "Coding challenge", formats: ["takehome"], time: "about a week", inside: "An unpaid take-home on near-real-world code. No whiteboarding or puzzles." },
      { title: "Paid trial", formats: ["trial"], paid: true, time: "15–35 hrs over 2–8 weeks", inside: "Part-time work on a real project over Slack, GitHub and P2, reviewed by the engineers you'd work with. $25/hr flat." },
      { title: "Final approval", formats: [], inside: "CEO approval (days to a month), sometimes an executive interview." },
    ],
    prep: "Write clearly and asynchronously, since most of the process happens in writing, and get comfortable reading a large existing codebase.",
    after: "Offer after approval. Salaries are 'based on skills, not location'.",
    lo: null, hi: null, est: false,
    pay: "Trial paid at $25/hr; salary not published.",
    watch: "The take-home, trial and approval together can take a few months.",
    src: [["How we hire", "https://automattic.com/how-we-hire/"], ["About the trial", "https://automattic.com/what-to-expect-during-a-trial/"]],
  },
  {
    id: "calcom", name: "Cal.com", url: "https://cal.com/jobs", kind: "build", label: "Paid 30-day contract-to-hire",
    test: "trial", difficulty: 3,
    speed: 2,
    speedNote: "The paid 30-day contract starts right after the call; no timing data beyond that.",
    check: "India eligibility unconfirmed: the team is in the US, Latin America and Europe, and contractor vs employee depends on country.",
    stages: [
      { title: "Contribute or apply", formats: [], inside: "Apply, or get noticed through merged open-source PRs and Algora bounties on the Cal.com repo." },
      { title: "Call", formats: ["talk"], inside: "A conversation about your work." },
      { title: "Paid 30-day contract", formats: ["trial"], paid: true, time: "30 days", inside: "Paid contract work in the real Cal.com codebase, which converts to full-time if it works out." },
    ],
    prep: "Get a couple of PRs merged in github.com/calcom/cal.com (TypeScript, Next.js) before you apply.",
    after: "Full-time offer after the contract.",
    lo: null, hi: null, est: false,
    pay: "Current senior full-stack role: $132K–150K plus equity.",
    watch: "Few openings at any one time.",
    src: [["Jobs", "https://cal.com/jobs"], ["Bounty-to-hire", "https://x.com/calcom/status/1825479649461178504"]],
  },
  {
    id: "toggl", name: "Toggl", url: "https://toggl.com/jobs", kind: "build", label: "Paid test week with the team",
    test: "trial", difficulty: 3,
    speed: 2,
    speedNote: "About a month from application to offer; the paid test week comes near the end.",
    check: "India eligibility unconfirmed: 'we hire globally' across 43 countries, but check each posting.",
    stages: [
      { title: "Skills test", formats: ["takehome"], inside: "An online skills assessment or home assignment." },
      { title: "Culture interview", formats: ["talk"], inside: "How you work and communicate." },
      { title: "Technical interview", formats: ["talk"], inside: "With the team lead." },
      { title: "Paid test week", formats: ["trial"], paid: true, time: "3–5 days", inside: "Real tasks with your future team." },
    ],
    prep: "Treat the test week like a first week on the job: ask questions early and ship small, finished pieces.",
    after: "About a month from application to offer (Glassdoor).",
    lo: null, hi: null, est: false,
    pay: "Not published.",
    watch: "Check each posting's location rules before applying.",
    src: [["Jobs", "https://toggl.com/jobs"]],
  },
  {
    id: "algora", name: "Algora", url: "https://algora.io", kind: "build", label: "Bounty-to-hire at funded open-source companies",
    test: "trial", difficulty: 3,
    speed: 1,
    speedNote: "No application: you're paid 1–3 days after your PR merges. Contract offers come after a run of merged work.",
    check: "Payouts go through Stripe Connect; reports say Indian recipients need a registered sole proprietorship, LLP or company. Unconfirmed for individuals.",
    stages: [
      { title: "Claim an issue", formats: [], inside: "Pick a funded issue at a company you'd actually join and comment /attempt." },
      { title: "Merged PR", formats: ["trial", "codereview"], paid: true, inside: "The company's engineers review your fix and merge it into their real codebase. Bounties are typically $50–2,500, paid in 1–3 days." },
      { title: "Contract work", formats: ["trial"], paid: true, inside: "Companies offer ongoing contract work to repeat contributors. Firecrawl, Trigger.dev, Activepieces, CodeRabbit and ComfyUI have hired this way." },
      { title: "Full-time offer", formats: ["talk"], inside: "Some contracts convert. Algora also matches companies to developers for full-time roles." },
    ],
    prep: "Choose 3–5 target companies (Cal.com, Twenty, Trigger.dev, Activepieces, Firecrawl), read their contributing guides, and start with small, clean PRs.",
    after: "Hiring comes from a track record of merged work, not from one bounty.",
    lo: null, hi: null, est: false,
    pay: "Per bounty, then contract rates set with each company.",
    watch: "Bounties go to the first merged PR, so treat them as an audition with companies you'd join, not as income.",
    src: [["Algora on GitHub", "https://github.com/algora-io/algora"], ["India payouts", "https://github.com/orgs/qdrant/discussions/2297"]],
  },
  {
    id: "gitlab", name: "GitLab", url: "https://handbook.gitlab.com/handbook/hiring/interviewing/technical/", kind: "build", label: "Merge-request review interview",
    test: "practical", difficulty: 3,
    speed: 3,
    speedNote: "A standard multi-round company loop; no timing data found.",
    check: "Hires through GitLab India Pvt Ltd, so pay is almost certainly INR, not USD.",
    stages: [
      { title: "Recruiter screen", formats: ["talk"], inside: "Background and role fit." },
      { title: "Merge request interview", formats: ["codereview", "live"], time: "1 hr prep + 90 min", inside: "You get a self-contained merge request about 72 hours ahead and review it (about an hour, unpaid). On the call you discuss your review and write code to improve it. AI use is allowed if you say so." },
      { title: "Hiring manager", formats: ["talk"], inside: "Team and role fit." },
      { title: "Leadership", formats: ["talk"], inside: "Final round." },
    ],
    prep: "Practise reviewing real merge requests for correctness, tests, naming, performance and security, written as specific comments, then pair on the fixes.",
    after: "Employment through the India entity. Most open engineering roles are in the US, Canada or India.",
    lo: null, hi: null, est: false,
    pay: "INR; India pay bands are among the top of the market.",
    watch: "Not USD.",
    src: [["Technical interview", "https://handbook.gitlab.com/handbook/hiring/interviewing/technical/"], ["India entity", "https://handbook.gitlab.com/handbook/entity/india-pvt-ltd/"]],
  },
  {
    id: "zapier", name: "Zapier", url: "https://zapier.com/l/jobs/interview-guide", kind: "build", label: "Take-home matched to real work",
    test: "practical", difficulty: 3,
    speed: 3,
    speedNote: "A standard multi-round company loop with references; no timing data found.",
    check: "Has India roles (a Release Engineering team in the India time zone, Apr 2026), but pay currency and employee vs contractor are unconfirmed; likely INR.",
    stages: [
      { title: "Application questions", formats: [], inside: "Written answers; a resume is optional." },
      { title: "Recruiter and hiring manager", formats: ["talk"], inside: "Two conversations about your work." },
      { title: "Skills interview", formats: ["takehome", "live"], inside: "A short take-home plus a live session with the hiring team, scored against a rubric and designed to match day-to-day work. Little DSA." },
      { title: "Final interview and references", formats: ["talk"], inside: "Sometimes a final interview, then references and a background check." },
    ],
    prep: "Zapier publishes an interview guide; read it and practise explaining your take-home choices live.",
    after: "Offer after references.",
    lo: null, hi: null, est: false,
    pay: "Not published; likely INR for India.",
    watch: "Probably not USD.",
    src: [["Interview guide", "https://zapier.com/l/jobs/interview-guide"], ["Jobs", "https://zapier.com/jobs"]],
  },
  {
    id: "doist", name: "Doist", url: "https://www.todoist.com/careers", kind: "build", label: "Todoist; test task before team interviews",
    test: "practical", difficulty: 3,
    speed: 3,
    speedNote: "Long-form application, test task, team interviews and a hiring committee; expect weeks to months.",
    check: "India eligibility unconfirmed but plausible: no location restrictions, and pay is location-adjusted.",
    stages: [
      { title: "Long-form application", formats: [], inside: "Detailed written answers." },
      { title: "Interview", formats: ["talk"], inside: "Google Meet; the salary range is shared up front." },
      { title: "Test task", formats: ["takehome"], time: "about 10 hrs", inside: "A real-world engineering task. Older accounts say it's paid; the current page doesn't confirm it." },
      { title: "Team interviews", formats: ["talk"], inside: "With the people you'd work with." },
      { title: "References and hiring committee", formats: [], inside: "Final decision." },
    ],
    prep: "Write a careful application; the process favours clear written communication.",
    after: "Offer after the hiring committee.",
    lo: null, hi: null, est: false,
    pay: "Location-adjusted salary, which may land lower for India; not published.",
    watch: "Location-adjusted pay.",
    src: [["Careers", "https://www.todoist.com/careers"]],
  },
];

export interface Board {
  id: string;
  name: string;
  url: string;
  note: string;
  cost: string;
  mix: "startup" | "bigco";
  rank: number;
  speed: Speed;
  speedNote: string;
  warn?: string;
}

export const LOOPS: Record<Board["mix"], { title: string; stages: Stage[] }> = {
  startup: {
    title: "Startup loop",
    stages: [
      { title: "Recruiter or founder call", formats: ["talk"], time: "30 min", inside: "Background, why this company, salary range." },
      { title: "Take-home or practical pairing", formats: ["takehome", "live"], time: "2–4 hrs typical", inside: "A small feature or bug fix in a realistic codebase, or pairing on one." },
      { title: "Architecture chat", formats: ["sysdesign"], inside: "Walk through a system you built and how you'd scale it." },
      { title: "Team and culture", formats: ["talk"], inside: "Meeting the people you'd work with." },
    ],
  },
  bigco: {
    title: "Larger-company loop",
    stages: [
      { title: "Online assessment", formats: ["dsa"], dsa: "medium", time: "60–90 min", inside: "2–3 LeetCode-style problems on HackerRank or CodeSignal." },
      { title: "Live coding rounds", formats: ["live", "dsa"], dsa: "medium", time: "45–60 min each", inside: "One or two rounds of algorithm problems with an interviewer." },
      { title: "System design", formats: ["sysdesign"], time: "45–60 min", inside: "Design a service end to end: APIs, storage, scaling, failure modes." },
      { title: "Behavioral", formats: ["talk"], inside: "Past projects, conflict, ownership." },
    ],
  },
};

export const BOARDS: Board[] = [
  { id: "yc", name: "Y Combinator Work at a Startup", url: "https://www.workatastartup.com", note: "Build a full profile so founders can find you, then filter by remote and location; look for 'Remote (IN)'. Has Forward Deployed roles.", cost: "Free", mix: "startup", rank: 1, speed: 1, speedNote: "Founders message strong profiles themselves, often within a week, and loops move in days. Cold applications are slow: founders read a small share of inbound." },
  { id: "hn", name: "Hacker News 'Who is hiring'", url: "https://hnhiring.com/locations/remote", note: "Monthly thread (hnhiring.com filters it). Look for REMOTE posts without a country limit; many are US/EU-only or timezone-bound.", cost: "Free", mix: "startup", rank: 2, speed: 2, speedNote: "Posters must be the hiring company and commit to replying; some run a paid build session instead of rounds." },
  { id: "hn-wtbh", name: "Hacker News 'Who wants to be hired'", url: "https://news.ycombinator.com/submitted?id=whoishiring", note: "The same monthly batch has a thread where you post yourself: stack, location, 'remote, USD contract'. Employers come to you.", cost: "Free", mix: "startup", rank: 3, speed: 2, speedNote: "Inbound, so it's fast when it lands; no response-rate data." },
  { id: "dailydev", name: "daily.dev Career Mode", url: "https://recruiter.daily.dev/", note: "Turn it on in daily.dev and set location and pay preferences. Employers see a match and approve you before anyone contacts you; salary is shown up front.", cost: "Free for developers", mix: "bigco", rank: 4, speed: 2, speedNote: "Double opt-in skips the application pile; response claims are daily.dev's own." },
  { id: "hiringcafe", name: "HiringCafe", url: "https://hiringcafe.com/", note: "Pulls listings straight from company career pages, with true-remote, timezone and eligibility filters. Apply on the careers page it links to.", cost: "Free", mix: "bigco", rank: 5, speed: 2, speedNote: "Careers-page applications reached interview about 3.5 times as often as LinkedIn applications (6.87% vs 1.95%, 1.2M applications)." },
  { id: "agentic", name: "Agentic engineering jobs", url: "https://agentic-engineering-jobs.com/jobs/langchain", note: "Roles by framework: LangGraph, LlamaIndex, CrewAI, Claude Agent SDK and more. Close match for AI-agent work. New board; check each role's location.", cost: "Free", mix: "startup", rank: 6, speed: 3, speedNote: "No speed data; depends on the employer." },
  { id: "fde", name: "Forward Deployed job boards", url: "https://fdejobs.com", note: "fdejobs.com and fde.traversaal.ai list only FD roles (US, EU and India). Newer, niche boards.", cost: "Free", mix: "startup", rank: 7, speed: 3, speedNote: "No speed data." },
  { id: "aijobs", name: "aijobs.net (Foorilla)", url: "https://aijobs.net/", note: "Long-running AI-only board, about 800 active listings, some marked 'Remote – India'.", cost: "Free", mix: "bigco", rank: 8, speed: 3, speedNote: "No speed data; depends on the employer." },
  { id: "web3", name: "web3.career", url: "https://web3.career/india+remote-jobs", note: "Many crypto roles are worldwide and pay in USD or USDC. Only if you're open to crypto work.", cost: "Free", mix: "startup", rank: 9, speed: 2, speedNote: "Small teams usually move fast (not measured).", warn: "Fake crypto 'interviews' that ask you to run a repo are a known malware trick. Never run take-home code on your main machine." },
  { id: "hww", name: "Hiring Without Whiteboards", url: "https://github.com/poteto/hiring-without-whiteboards", note: "A maintained list of companies that interview with take-homes or real problems instead of puzzles. Most are US or EU, so check location rules.", cost: "Free", mix: "startup", rank: 10, speed: 3, speedNote: "A list, not a board; speed depends on each company." },
  { id: "wellfound", name: "Wellfound", url: "https://wellfound.com/remote", note: "Set your profile location to India and it shows remote roles you're eligible for. Also try the 'Distributed teams only' toggle.", cost: "Free", mix: "startup", rank: 11, speed: 3, speedNote: "About a 6% response rate, and about 80% of applications expire unreviewed (Huntr data)." },
  { id: "remotecom", name: "Remote.com jobs", url: "https://remote.com/jobs", note: "Employers here already hire across borders through Remote's employer-of-record service. Make a profile once and let them find you.", cost: "Free", mix: "bigco", rank: 12, speed: 3, speedNote: "No speed data." },
  { id: "himalayas", name: "Himalayas", url: "https://himalayas.app/jobs/countries/india", note: "Country, worldwide-only and timezone filters. Click through and apply on the company's own careers page.", cost: "Free", mix: "bigco", rank: 13, speed: 3, speedNote: "Depends on the employer; careers-page applications do best." },
  { id: "jobgether", name: "Jobgether", url: "https://jobgether.com/remote-jobs/india", note: "Filter by 'open to candidates in India'.", cost: "Free, 5 matches a week; about $29/month for more", mix: "bigco", rank: 14, speed: 3, speedNote: "Depends on the employer." },
  { id: "remoteok", name: "RemoteOK", url: "https://remoteok.com", note: "Regions: Worldwide. Every post must show a salary range.", cost: "Free to apply", mix: "bigco", rank: 15, speed: 3, speedNote: "Depends on the employer." },
  { id: "wwr", name: "We Work Remotely", url: "https://weworkremotely.com/100-percent-remote-jobs", note: "'Anywhere in the World' tag (set by the employer, not checked).", cost: "Free basic; Pro $14.95/month", mix: "bigco", rank: 16, speed: 3, speedNote: "Depends on the employer." },
  { id: "remotive", name: "Remotive", url: "https://remotive.com/remote-worldwide-jobs", note: "'Available from my location' filter includes Worldwide jobs.", cost: "Free tier shows only some jobs; paid plans", mix: "bigco", rank: 17, speed: 3, speedNote: "Depends on the employer." },
  { id: "rwfa", name: "Real Work From Anywhere and Relomote", url: "https://www.realworkfromanywhere.com/", note: "Boards that list only worldwide roles.", cost: "Free", mix: "bigco", rank: 18, speed: 3, speedNote: "Depends on the employer." },
  { id: "a16z", name: "VC portfolio boards (a16z, speedrun)", url: "https://jobs.a16z.com/", note: "Jobs across a fund's portfolio companies. Mostly US; filter Remote and check each role's eligibility.", cost: "Free", mix: "startup", rank: 19, speed: 3, speedNote: "No speed data." },
  { id: "linkedin", name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/search/?f_WT=2&geoId=92000000", note: "Remote + Worldwide search. Many 'remote' jobs are locked to one country, so read the location line. Turn on 'Open to work' for recruiter messages.", cost: "Free", mix: "bigco", rank: 20, speed: 4, speedNote: "Slowest: Easy Apply gets about 1–4% replies, while recruiter-initiated messages get about 17%. Let recruiters come to you." },
];

export const DROPPED: { title: string; items: Dropped[] }[] = [
  {
    title: "Tier systems, low pay or unpaid-work complaints",
    items: [
      { name: "Outlier (Scale AI)", why: "Tier and per-project qualification gates fail most people, with 30-day lockouts; India coding pays $13.75–27.50/hr; unexplained removals" },
      { name: "Alignerr", why: "Credible reports of unpaid hours (one: 65 hours, Sept 2026) and an F rating on BBB" },
      { name: "AfterQuery", why: "Unpaid hours when a project paused (July 2026), accounts closed with work forfeited, India Stripe payouts put on hold" },
      { name: "Pareto AI", why: "Reports of 3–4 weeks of missed pay and over $1,000 owed; intermittent work" },
      { name: "SuperAnnotate (SME Careers)", why: "Advertises $60–100/hr; one real project paid $15/hr; months with no work" },
      { name: "Rex.zone / RemoExperts / Abaka AI", why: "One-shot assessment, delayed payouts, missing referral pay, inconsistent work" },
      { name: "Mindrift (Toloka)", why: "Pay is location-based ($20–40/hr reported for India) and work comes and goes" },
      { name: "Invisible / Meridial", why: "Location-based pay, roughly $6–20/hr for India; sudden cancellations" },
      { name: "Deccan AI / Soul AI", why: "Priced for India, mostly non-coding rubric work, complaints about unpaid assessments" },
      { name: "Handshake AI", why: "India role is invite-only and capped at $25/hr" },
      { name: "Braintrust", why: "92 of 150 live listings were AI-training gigs at $18–55/hr (Oct 2026); net-30 pay; fake-client malware scams" },
      { name: "Datacurve / Shipd", why: "Coding quests paid only if accepted, so unpaid work is built in; India payouts unconfirmed" },
      { name: "Perle", why: "Pay partly in crypto points and tokens, with on-chain tiers" },
    ],
  },
  {
    title: "Not USD, or not really placing people",
    items: [
      { name: "Uplers", why: "Sells Indian developers to clients at a discount (about $1,900–3,500/month to clients); your share isn't disclosed" },
      { name: "Flexiple", why: "Pivoted to offshore teams on Indian payroll" },
      { name: "Supersourcing", why: "Indian staffing; its own pages put engineers at $6–14K a year" },
      { name: "EPAM Anywhere", why: "Salaried in INR in India (offers around 18–30 LPA)" },
      { name: "Wisemonk, Cutshort, Instahyre, Weekday", why: "Mostly Indian employers or India-entity payroll in INR" },
      { name: "Gigster", why: "Sold to Virtasant in 2024; no sign the network still places developers" },
      { name: "Remotebase", why: "Pivoted to fixed-scope product builds; no evidence on developer pay" },
      { name: "Paraform", why: "Recruiters submit candidates; you can't apply yourself" },
      { name: "Sepal AI", why: "Bought by Mercor in Feb 2026; the work now runs through Mercor" },
    ],
  },
  {
    title: "Cheap marketplaces, contests and duplicate boards",
    items: [
      { name: "Fiverr, Freelancer.com, Guru, PeoplePerHour", why: "Compete on price; fastest, cheapest bids win" },
      { name: "Codementor", why: "Side income at most: 20% cut and sporadic demand" },
      { name: "Pangea", why: "Mostly creative and marketing roles; reviewers report no replies" },
      { name: "Devpost, HackerEarth, Unstop, Topcoder, IssueHunt, Superteam Earn", why: "Contests and prize bounties, not client hiring" },
      { name: "Gumroad", why: "Its no-interview paid part-time model ended; now a New York office" },
      { name: "Replit Bounties", why: "Shut down September 2025" },
      { name: "Working Nomads, Remote Rocketship, FlexJobs, Remote.co, startup.jobs", why: "Paywalled or partly paywalled copies of free boards" },
      { name: "Jobicy, Jobspresso, Dynamite Jobs, NoDesk", why: "Free and legitimate, but they repeat the boards above" },
      { name: "Built In, Welcome to the Jungle (Otta), Jobright.ai", why: "Mostly US/UK/EU roles; India-remote is rare" },
    ],
  },
  {
    title: "Genuine, but not a fit or not open to India",
    items: [
      { name: "Codeable", why: "Genuine and $80–120/hr, but WordPress-only; worth it only with deep WordPress/WooCommerce experience" },
      { name: "PostHog", why: "Paid SuperDay, but hires only GMT−8 to GMT+2" },
      { name: "Linear", why: "Paid work trial, but engineering roles are US and Europe only" },
      { name: "37signals", why: "Americas or Europe only" },
      { name: "Ghost", why: "Paid trial, but UTC−1 to UTC+3 only" },
      { name: "Close", why: "Engineering roles US only" },
      { name: "Strider, Howdy, Revelo", why: "Latin America only" },
      { name: "Surge AI / DataAnnotation, Snorkel, Prolific", why: "US or a short list of countries; Prolific closed to new India sign-ups" },
      { name: "OpenAI, Anthropic, Google DeepMind (direct)", why: "No open contractor programme for India-based coders; they buy this work through vendors like Mercor and Turing" },
      { name: "Proxify, Lemon.io", why: "Time-zone or region rules leave out India" },
      { name: "Terminal, Index.dev, BairesDev, Workana", why: "Latin America, Canada or Europe focused" },
      { name: "Gun.io, Malt, Talent500", why: "US/EU-focused, needs an EU business, or pays INR at India offices" },
      { name: "A.Team, X-Team, Contra", why: "India eligibility unverified; A.Team and Contra don't select on real work (Contra is fine for invoicing clients you already have)" },
      { name: "Pesto, Hired", why: "Shut down" },
    ],
  },
];

export const REALITY: { value: string; label: string; you?: boolean }[] = [
  { value: "$22K/yr", label: "India median, engineering roles on Deel (2025)" },
  { value: "$48.9K/yr", label: "What India remote developers expect on Arc (average)" },
  { value: "$100K/yr", label: "Crossover's fixed rate for standard engineering roles, any country" },
  { value: "$60–96K/yr", label: "Your target ($5–8K a month)", you: true },
];

export function maxDsa(stages: Stage[]): Dsa {
  let best: Dsa = "none";
  for (const s of stages) if (s.dsa && DSA_ORDER[s.dsa] > DSA_ORDER[best]) best = s.dsa;
  return best;
}

/** Formats a reader has to be ready for, DSA excluded (it has its own level). */
export function needsOf(stages: Stage[]): Format[] {
  const used = new Set(stages.flatMap((s) => s.formats));
  return FORMATS.map((f) => f.id).filter((f) => f !== "dsa" && used.has(f));
}

/** Easiest entry first: difficulty, then kind of gate, then DSA level. */
export function byEntry(a: Platform, b: Platform) {
  if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
  if (a.test !== b.test) return TEST_ORDER[a.test] - TEST_ORDER[b.test];
  const d = DSA_ORDER[maxDsa(a.stages)] - DSA_ORDER[maxDsa(b.stages)];
  return d || a.name.localeCompare(b.name);
}

export function bySpeed(a: Platform, b: Platform) {
  return a.speed - b.speed || byEntry(a, b);
}

export function byPay(a: Platform, b: Platform) {
  const va = a.hi == null ? -1 : a.hi + (a.lo ?? 0) / 1e5;
  const vb = b.hi == null ? -1 : b.hi + (b.lo ?? 0) / 1e5;
  return vb - va || byEntry(a, b);
}
