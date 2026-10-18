// Platform data from "Remote platforms that hire from India, ranked by ease (Oct 2026)".
// The build-first section is added on top of that research and is marked unverified.

export type Kind = "freelance" | "boards" | "vetted" | "build";

export type Test =
  | "open"
  | "review"
  | "ai"
  | "build"
  | "practical"
  | "live"
  | "dsa"
  | "aptitude"
  | "invite";

export type Dsa = "yes" | "some" | "no";

export interface Platform {
  id: string;
  name: string;
  url: string;
  kind: Exclude<Kind, "boards">;
  group?: "dev" | "ai";
  label: string;
  test: Test;
  testLabel?: string;
  /** Entry test difficulty, 1 (walk in) to 5 (top few percent pass). null = can't apply. */
  difficulty: number | null;
  dsa: Dsa;
  /** Overall ease rank from the research (1 = easiest of 25). */
  researchRank?: number;
  lo: number | null;
  hi: number | null;
  est: boolean;
  basis: string;
  entry: string;
  hours: string;
  fees: string;
  watch: string;
  src: [string, string][];
  unverified?: boolean;
}

export interface Board {
  id: string;
  name: string;
  url: string;
  note: string;
  cost: string;
  /** Who mostly posts there, which shapes the interview you'll usually meet. */
  mix: "startup" | "mixed";
  researchRank: number;
}

export const TESTS: { id: Test; label: string; hint: string }[] = [
  { id: "open", label: "Open sign-up", hint: "Make a profile and start bidding" },
  { id: "review", label: "Profile review", hint: "A person approves your profile or portfolio" },
  { id: "ai", label: "AI interview", hint: "Recorded or live AI screen, practical not puzzles" },
  { id: "build", label: "Build first", hint: "Ship real work; the client picks from what was built" },
  { id: "practical", label: "Practical test", hint: "Real-world coding task or per-project qualification" },
  { id: "live", label: "Live coding", hint: "Coding with an interviewer watching" },
  { id: "dsa", label: "DSA test", hint: "Timed algorithm and data-structure problems" },
  { id: "aptitude", label: "Aptitude test", hint: "IQ-style questions against the clock" },
  { id: "invite", label: "Invite only", hint: "You can't apply; they contact you" },
];

export const TEST_ORDER: Record<Test, number> = Object.fromEntries(
  TESTS.map((t, i) => [t.id, i]),
) as Record<Test, number>;

export const KINDS: {
  id: Kind;
  title: string;
  short: string;
  blurb: string;
}[] = [
  {
    id: "freelance",
    title: "Freelancer portals",
    short: "Freelance",
    blurb:
      "Open marketplaces. You make a profile, bid or list services, and clients pick you from proposals and reviews. Almost no entry test; the hard part is winning the first few clients.",
  },
  {
    id: "boards",
    title: "Direct remote job boards",
    short: "Job boards",
    blurb:
      "The employer hires you directly and runs their own interviews (coding, system design, behavioral). This is where the highest offers are, but you need the coding prep. For India-eligible remote roles, expect $2–6K a month; AI and Forward Deployed specialists can get $6K+.",
  },
  {
    id: "vetted",
    title: "Test-and-match marketplaces",
    short: "Test and match",
    blurb:
      "Like Turing: you pass their tests once, join a pool, and they match you to client projects. Two kinds: developer networks that place you on client teams, and AI-training networks that pay you to write and judge code for AI labs.",
  },
  {
    id: "build",
    title: "Build-first portals",
    short: "Build first",
    blurb:
      "No interview up front. You build the thing (a merged pull request, a bounty submission, a hackathon demo, a paid trial project) and the client chooses from finished work. Good if you'd rather show than solve puzzles; the cost is unpaid work when you don't win.",
  },
];

export const PLATFORMS: Platform[] = [
  // Freelancer portals
  {
    id: "upwork", name: "Upwork", url: "https://www.upwork.com", kind: "freelance", label: "Freelance marketplace",
    test: "open", testLabel: "No test", difficulty: 1, dsa: "no", researchRank: 1,
    entry: "Open sign-up. Your past Upwork history ($20K+ earned) gives you a head start.",
    lo: 2000, hi: 6000, est: true, basis: "India full-stack median is $15–35/hr; AI-agent work pays more once you have reviews.",
    hours: "Depends on the clients you win", fees: "0–15% per contract (about 10% on most), paid Connects for each bid, 18% GST on fees without a GSTIN",
    watch: "Takes months to build steady clients; many proposals go unanswered",
    src: [["Fees", "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee"], ["Rates", "https://www.upwork.com/hire/full-stack-developers/cost/"]],
  },
  {
    id: "braintrust", name: "Braintrust", url: "https://www.usebraintrust.com", kind: "freelance", label: "Freelance network",
    test: "ai", difficulty: 2, dsa: "no", researchRank: 4,
    entry: "Profile, ID check and a 5–10 minute AI screen (not technical). Each client then interviews you.",
    lo: 3500, hi: 8000, est: true, basis: "You set your rate; $30–50/hr at full-time hours.",
    hours: "Contract, set with each client", fees: "You keep 100%; the client pays 15% on top",
    watch: "Approval isn't work; ignore 'clients' who send files to open (malware reports)",
    src: [["Approval guide", "https://support.usebraintrust.com/hc/en-us/articles/14302713002391-Guide-Becoming-Approved-Talent"]],
  },
  {
    id: "codementor", name: "Codementor", url: "https://www.codementor.io", kind: "freelance", label: "Freelance mentoring",
    test: "open", testLabel: "No test", difficulty: 1, dsa: "no", researchRank: 12,
    entry: "Create a mentor profile and take paid help sessions.",
    lo: 300, hi: 1500, est: true, basis: "Sessions of about $8–30 per 15 minutes; demand is sporadic.",
    hours: "On demand", fees: "13–22% depending on activity", watch: "Side income only",
    src: [["Fees", "https://support.codementor.io/en/articles/4226113"]],
  },
  {
    id: "fiverr", name: "Fiverr (and Fiverr Pro)", url: "https://www.fiverr.com", kind: "freelance", label: "Freelance marketplace",
    test: "open", testLabel: "No test", difficulty: 1, dsa: "no", researchRank: 13,
    entry: "Anyone can list services. Fiverr Pro needs an application with a portfolio (2–4 week review).",
    lo: 500, hi: 3000, est: true, basis: "Priced per service package; no hourly data published.",
    hours: "Per order", fees: "Flat 20%; earnings held 7–14 days", watch: "Very crowded; disputes tend to favor buyers",
    src: [["Fiverr Pro", "https://help.fiverr.com/hc/en-us/articles/29453001296913-How-to-become-a-Fiverr-Pro-freelancer"]],
  },
  {
    id: "freelancer", name: "Freelancer.com", url: "https://www.freelancer.com", kind: "freelance", label: "Freelance marketplace",
    test: "open", testLabel: "No test", difficulty: 1, dsa: "no", researchRank: 15,
    entry: "Open sign-up; 6 free bids a month.",
    lo: 500, hi: 2500, est: true, basis: "Projects often get 40–80 bids, which pushes prices down.",
    hours: "Per project", fees: "10% (or $5 minimum) per project, plus 1% tax collected in India", watch: "Heavy price competition",
    src: [["Fees", "https://www.freelancer.com/feesandcharges"]],
  },
  {
    id: "peopleperhour", name: "PeoplePerHour", url: "https://www.peopleperhour.com", kind: "freelance", label: "Freelance marketplace",
    test: "review", testLabel: "Application review", difficulty: 2, dsa: "no", researchRank: 16,
    entry: "Applications are moderated and often rejected for crowded skills.",
    lo: 500, hi: 2500, est: true, basis: "Mostly UK and EU clients.",
    hours: "Per project", fees: "20%, falling to 7.5% and 3.5% per client as billing grows", watch: "Expect rejections at sign-up",
    src: [["Fees", "https://support.peopleperhour.com/hc/en-us/articles/205218337-Freelancer-commission-fees"]],
  },
  {
    id: "guru", name: "Guru", url: "https://www.guru.com", kind: "freelance", label: "Freelance marketplace",
    test: "open", testLabel: "No test", difficulty: 1, dsa: "no", researchRank: 17,
    entry: "Open sign-up.",
    lo: 300, hi: 2000, est: true, basis: "Low project volume.",
    hours: "Per project", fees: "9% on the free plan, down to 5% on the top paid plan", watch: "Few good projects",
    src: [["Fees", "https://www.guru.com/help/freelancer/job-fee/"]],
  },

  // Test-and-match: developer networks
  {
    id: "uplers", name: "Uplers", url: "https://www.uplers.com/talent/", kind: "vetted", group: "dev", label: "Vetted network, India only",
    test: "practical", difficulty: 3, dsa: "no", researchRank: 6,
    entry: "Technical test, Versant English test and a 30-minute AI-scored screen, then client interviews.",
    lo: 2500, hi: 5000, est: true, basis: "Uplers' 2026 benchmark: senior $36–48K/yr, AI/ML specialists up to $72K+.",
    hours: "Full-time remote contract, 3 months minimum", fees: "Your take-home and payout currency are not published",
    watch: "Clients pay from about $2,500/month, so confirm your share before you accept",
    src: [["FAQ", "https://www.uplers.com/talent/faqs/"], ["Salary benchmark", "https://www.uplers.com/article/software-engineer-salary-india/"]],
  },
  {
    id: "supersourcing", name: "Supersourcing", url: "https://supersourcing.com/developers/", kind: "vetted", group: "dev", label: "Vetted network, India",
    test: "practical", difficulty: 3, dsa: "some", researchRank: 11,
    entry: "AI profile screen, automated tests, then technical and video interviews.",
    lo: 1500, hi: 4000, est: true, basis: "Clients pay $18–40/hr (AI/ML $40–60/hr); your share is not published.",
    hours: "Contract staffing", fees: "Built into the client rate", watch: "Ask what you receive, not what the client pays",
    src: [["Rates", "https://supersourcing.com/blog/hire-remote-software-developers-india/"]],
  },
  {
    id: "andela", name: "Andela", url: "https://www.andela.com/for-talent", kind: "vetted", group: "dev", label: "Vetted network",
    test: "live", testLabel: "Technical + live", difficulty: 4, dsa: "some", researchRank: 20,
    entry: "Needs 4+ years. English test, technical assessment, then a live technical interview.",
    lo: 2500, hi: 5000, est: true, basis: "India pay not published; low-confidence estimate.",
    hours: "Contract, full- or part-time", fees: "Not published",
    watch: "Talent mostly from Africa and Latin America; complaints about pay and a 15-day trial clause",
    src: [["Eligibility", "https://help.andela.com/hc/en-us/articles/26812894405267-Eligibility-requirements-to-join-the-Andela-Talent-Cloud"], ["Review", "https://www.tecla.io/blog/andela-review"]],
  },
  {
    id: "arc", name: "Arc.dev", url: "https://arc.dev/talent", kind: "vetted", group: "dev", label: "Vetted network",
    test: "live", difficulty: 4, dsa: "some", researchRank: 22,
    entry: "English check, then a 1-hour live coding interview (about 2% pass overall). Vetting starts only when a matching role opens.",
    lo: 3000, hi: 6000, est: false, basis: "India remote developers expect about $48.9K/yr on average (Arc's data).",
    hours: "Freelance or full-time", fees: "Free for talent", watch: "Profiles can sit in 'Reviewing' for a long time",
    src: [["Vetting", "https://arc.dev/employer-blog/vetting-process/"], ["India pay", "https://arc.dev/remote-developer-salary/india"]],
  },
  {
    id: "turing", name: "Turing", url: "https://www.turing.com/jobs", kind: "vetted", group: "dev", label: "Vetted network and AI training",
    test: "dsa", difficulty: 4, dsa: "yes", researchRank: 7,
    entry: "3–6 hours of tests: stack questions plus algorithm and data-structure coding, then a 1-hour technical interview.",
    lo: 2500, hi: 6000, est: true, basis: "Not published. One 2025 case: developer received $6K/month. LLM-trainer roles $15–75/hr.",
    hours: "20, 30 or 40 hrs/week contracts, with 4 hours of overlap with US Pacific time",
    fees: "Large; in one case the client paid $14.5K and the developer got $6K",
    watch: "Weeks to months of waiting for a match after you pass",
    src: [["How to get hired", "https://www.turing.com/blog/turing-com-review-good-for-remote-developer-jobs"], ["AI work", "https://work.turing.com/"], ["Review", "https://www.tecla.io/blog/turing-review"]],
  },
  {
    id: "flexiple", name: "Flexiple", url: "https://flexiple.com", kind: "vetted", group: "dev", label: "Vetted network, India",
    test: "dsa", difficulty: 4, dsa: "yes", researchRank: 21,
    entry: "Proctored algorithm tests, practical assessments and interviews.",
    lo: 2500, hi: 6000, est: true, basis: "Clients pay $30–100/hr; your share is not published.",
    hours: "Contract, hourly or monthly", fees: "Built into the client rate", watch: "Few developer reviews to judge it by",
    src: [["Overview", "https://slashdot.org/software/p/Flexiple/"]],
  },
  {
    id: "gigster", name: "Gigster", url: "https://gigster.com/network-faq/", kind: "vetted", group: "dev", label: "Project network",
    test: "aptitude", testLabel: "Aptitude + technical", difficulty: 4, dsa: "some", researchRank: 23,
    entry: "60-minute aptitude/technical test, a 30-minute call, then a 30-minute technical interview.",
    lo: null, hi: null, est: false, basis: "Pay not published.",
    hours: "Project teams, paid per milestone", fees: "Not published", watch: "Little public information on developer earnings",
    src: [["Network FAQ", "https://gigster.com/network-faq/"]],
  },
  {
    id: "toptal", name: "Toptal", url: "https://www.toptal.com", kind: "vetted", group: "dev", label: "Vetted network",
    test: "dsa", difficulty: 5, dsa: "yes", researchRank: 25,
    entry: "English call, timed algorithm test, live technical screen, then a 1–3 week test project. Under 3% are accepted.",
    lo: 5000, hi: 10000, est: true, basis: "You set your rate; reported $35–150+/hr.",
    hours: "Hourly, part- or full-time", fees: "Toptal's markup is billed to the client", watch: "Some skills are waitlisted; matching can be slow",
    src: [["Top 3%", "https://www.toptal.com/top-3-percent"], ["FAQ", "https://www.toptal.com/freelance-jobs/faq"]],
  },
  {
    id: "crossover", name: "Crossover", url: "https://www.crossover.com/jobs/software-engineer/india", kind: "vetted", group: "dev", label: "Vetted network",
    test: "aptitude", difficulty: 5, dsa: "no", researchRank: 24,
    entry: "Aptitude test (50 questions in 15 minutes, roughly top 10% needed), skill and English tests, then a real-work trial.",
    lo: 4000, hi: 8000, est: true, basis: "Fixed USD rate per role, the same in every country ($22–105/hr across roles on Glassdoor India).",
    hours: "Full-time, 40 hrs/week; reliable weekly pay", fees: "None to you",
    watch: "Tracking software takes screenshots and webcam photos every 10 minutes; 3–6 month wait to retake",
    src: [["Glassdoor India", "https://www.glassdoor.com/Salary/Crossover-for-Work-India-Salaries-EI_IE1041838.0,18_IL.19,24_IN115.htm"], ["Experience", "https://medium.com/@sekhar.vallath_97547/the-top-1-my-experience-at-crossover-55a0e2d56a7c"]],
  },

  // Test-and-match: AI training networks
  {
    id: "micro1", name: "micro1", url: "https://www.micro1.ai/experts", kind: "vetted", group: "ai", label: "AI training and expert contracts",
    test: "ai", difficulty: 2, dsa: "no", researchRank: 2,
    entry: "20–40 minute AI interview with live coding (practical, not puzzles), plus ID and background check.",
    lo: 2000, hi: 5000, est: true, basis: "Advertised $40–80/hr, adjusted by location. India rate not published.",
    hours: "Project-based; paid in USD via Deel twice a month", fees: "None to you",
    watch: "Passing doesn't guarantee a project; some people wait months",
    src: [["micro1", "https://www.micro1.ai/experts"], ["Review", "https://annotation.academy/blog/is-micro1-legit"]],
  },
  {
    id: "mercor", name: "Mercor", url: "https://www.mercor.com/experts/", kind: "vetted", group: "ai", label: "AI training and expert contracts",
    test: "ai", difficulty: 2, dsa: "no", researchRank: 3,
    entry: "About 20-minute AI video interview (up to 3 retakes) plus short role tests.",
    lo: 2000, hi: 6000, est: true, basis: "Coding contractors report $35–60/hr; hours are often capped.",
    hours: "Project-based, 15–40 hrs/week; paid weekly in USD", fees: "None to you (margin charged to client)",
    watch: "Projects end without notice; 2026 data-breach lawsuit and staff cuts",
    src: [["Software roles", "https://www.mercor.com/experts/software-engineers/"], ["Payout countries", "https://talent.docs.mercor.com/policies/supported-countries"]],
  },
  {
    id: "mindrift", name: "Mindrift (formerly Toloka)", url: "https://mindrift.ai", kind: "vetted", group: "ai", label: "AI training",
    test: "practical", difficulty: 2, dsa: "no", researchRank: 5,
    entry: "Sign up, then qualify for each project separately.",
    lo: 800, hi: 3000, est: true, basis: "Coding advertised 'up to $90/hr'; general tasks in lower-cost countries pay $5–15/hr.",
    hours: "Project-based; paid via Payoneer or Tipalti", fees: "None found",
    watch: "Which projects you see depends on your country; side income, not a salary",
    src: [["Coding projects", "https://mindrift.ai/project/code"], ["Review", "https://www.aitrainingjobsfinder.com/blog/toloka-review-2026"]],
  },
  {
    id: "g2i", name: "G2i", url: "https://www.g2i.ai/for-talent", kind: "vetted", group: "ai", label: "AI training (code review)",
    test: "practical", difficulty: 3, dsa: "no", researchRank: 8,
    entry: "About 3.5 hours of screening and onboarding; needs 3–4+ years of experience.",
    lo: 2500, hi: 6000, est: true, basis: "Typically $30–70/hr to judge AI-written code, 15–40 hrs/week.",
    hours: "Part-time hourly, 15–40 hrs/week", fees: "Not published",
    watch: "Listings say 'some countries in Asia', so confirm India is eligible before testing",
    src: [["For talent", "https://www.g2i.ai/for-talent"], ["2026 hiring", "https://jobbi.org/news/g2i-is-hiring-50-software-engineers-at-up-to-200hour-to-judge-ai-written-code/"]],
  },
  {
    id: "invisible", name: "Invisible (Meridial)", url: "https://meridial.ai", kind: "vetted", group: "ai", label: "AI training",
    test: "practical", difficulty: 3, dsa: "no", researchRank: 9,
    entry: "Unpaid onboarding, then matching to projects. Some roles are India-only.",
    lo: 1000, hi: 4000, est: true, basis: "Coding ads list $8–65/hr, set by experience and location.",
    hours: "Project-based; activity tracked with Hubstaff", fees: "None found", watch: "Same work can pay very differently by region",
    src: [["Platform review", "https://aitraining.jobs/platforms/invisible-technologies"]],
  },
  {
    id: "outlier", name: "Outlier (Scale AI)", url: "https://outlier.ai", kind: "vetted", group: "ai", label: "AI training",
    test: "practical", difficulty: 3, dsa: "no", researchRank: 14,
    entry: "ID check, then unpaid assessments for each project. The India coding role asks for a CS degree from a selective institute.",
    lo: 1000, hi: 3000, est: true, basis: "India coding listing: $13–28/hr from a task queue.",
    hours: "Task queue, not steady; paid weekly", fees: "None",
    watch: "Your degree is ECE, so you may not meet the India coding requirement",
    src: [["India listing", "https://builtinmumbai.in/job/coding-expertise-ai-training-english-india/3748004"], ["Review", "https://getaiwork.com/articles/outlier-ai-review/"]],
  },
  {
    id: "alignerr", name: "Alignerr", url: "https://www.alignerr.com", kind: "vetted", group: "ai", label: "AI training",
    test: "practical", testLabel: "Proctored coding", difficulty: 4, dsa: "some", researchRank: 10,
    entry: "Proctored coding test with one attempt; a fail is usually permanent.",
    lo: 2000, hi: 4500, est: true, basis: "Advertised $60–120/hr; workers report about $37/hr on average.",
    hours: "Project-based", fees: "None found",
    watch: "India eligibility is limited and often city-specific; unpaid 3–5 hour evaluations",
    src: [["Review", "https://annotation.academy/blog/is-alignerr-legit"], ["BBB complaints", "https://www.bbb.org/us/ca/san-francisco/profile/artificial-intelligence/alignerr-1116-975409/complaints"]],
  },
  {
    id: "deccan", name: "Deccan AI (Soul AI)", url: "https://deccanexperts.ai", kind: "vetted", group: "ai", label: "AI training, India-based",
    test: "invite", difficulty: null, dsa: "no", researchRank: 18,
    entry: "Invite-only expert network; most workers are in India.",
    lo: 1000, hi: 4000, est: true, basis: "Founder claims up to $7K/month for top earners (unverified).",
    hours: "Project-based", fees: "Not published", watch: "Reports of late or withheld pay",
    src: [["TechCrunch", "https://techcrunch.com/2026/03/25/deccan-ai-raises-25m-as-ai-training-push-relies-on-india-based-workforce/"]],
  },
  {
    id: "handshake", name: "Handshake AI", url: "https://joinhandshake.com/ai", kind: "vetted", group: "ai", label: "AI training",
    test: "invite", difficulty: null, dsa: "no", researchRank: 19,
    entry: "India software engineer role is invite-only; the main program is for US residents.",
    lo: 2000, hi: 4000, est: true, basis: "India role up to $25/hr (third-party quote of the listing).",
    hours: "Project-based", fees: "Not published", watch: "2026 class action and reported payment failures",
    src: [["India role", "https://reconscribe.com/handshake-ai-india/"]],
  },

  // Build-first portals (added; not part of the October 2026 research)
  {
    id: "superteam", name: "Superteam Earn", url: "https://earn.superteam.fun", kind: "build", label: "Crypto bounties and projects",
    test: "build", testLabel: "Submit work", difficulty: 2, dsa: "no", unverified: true,
    entry: "Pick a listed bounty, build it and submit before the deadline. The sponsor picks winners. Project listings take applications with past work instead.",
    lo: null, hi: null, est: false, basis: "Paid per bounty, usually in USDC. Amounts are on each listing.",
    hours: "Per bounty or project", fees: "Check each listing",
    watch: "Solana ecosystem only; most bounty work goes unpaid if you don't place",
    src: [["Listings", "https://earn.superteam.fun"]],
  },
  {
    id: "devpost", name: "Devpost hackathons", url: "https://devpost.com/hackathons", kind: "build", label: "Online hackathons",
    test: "build", testLabel: "Ship a demo", difficulty: 2, dsa: "no", unverified: true,
    entry: "Join an online hackathon, build a working demo with a short video, and judges pick winners. Sponsors use it to spot people to hire.",
    lo: null, hi: null, est: false, basis: "Prize money per hackathon; hiring is a side effect, not a promise.",
    hours: "Weekend to a few weeks per event", fees: "Free to enter",
    watch: "Check each hackathon's eligible countries; many exclude some regions",
    src: [["Hackathons", "https://devpost.com/hackathons"]],
  },
  {
    id: "issuehunt", name: "IssueHunt", url: "https://issuehunt.io", kind: "build", label: "Open-source issue bounties",
    test: "build", testLabel: "Merged PR", difficulty: 2, dsa: "no", unverified: true,
    entry: "Fix a funded GitHub issue; you're paid when the maintainer merges your pull request.",
    lo: null, hi: null, est: false, basis: "Bounties are set per issue and are usually small.",
    hours: "Per issue", fees: "Check the platform's current fee",
    watch: "Low volume; treat it as portfolio building more than income",
    src: [["Bounties", "https://issuehunt.io"]],
  },
  {
    id: "hackerearth", name: "HackerEarth hackathons", url: "https://www.hackerearth.com/challenges/", kind: "build", label: "Hiring hackathons, India",
    test: "build", testLabel: "Ship a demo", difficulty: 2, dsa: "some", unverified: true,
    entry: "Company-run hackathons where you build a prototype and top teams are shortlisted for interviews. Its separate hiring challenges are DSA tests.",
    lo: null, hi: null, est: false, basis: "Prize money; hiring outcomes vary by company.",
    hours: "Per event", fees: "Free to enter",
    watch: "Many listings are India-office jobs paid in INR; pick hackathons run by global companies",
    src: [["Challenges", "https://www.hackerearth.com/challenges/"]],
  },
  {
    id: "unstop", name: "Unstop", url: "https://unstop.com/hackathons", kind: "build", label: "Hackathons and hiring challenges, India",
    test: "build", testLabel: "Ship a demo", difficulty: 2, dsa: "some", unverified: true,
    entry: "Build-and-submit hackathons and case challenges run by companies; winners are fast-tracked to interviews.",
    lo: null, hi: null, est: false, basis: "Prize money; jobs are mostly India-based.",
    hours: "Per event", fees: "Free to enter",
    watch: "Aimed at students and early-career; salaries are usually INR, not USD",
    src: [["Hackathons", "https://unstop.com/hackathons"]],
  },
  {
    id: "algora", name: "Algora", url: "https://algora.io", kind: "build", label: "Open-source bounties to hire",
    test: "build", testLabel: "Merged PR", difficulty: 3, dsa: "no", unverified: true,
    entry: "Companies put cash bounties on GitHub issues in their open-source repos. Get PRs merged, and companies use that track record to offer contracts and jobs.",
    lo: null, hi: null, est: false, basis: "Paid per bounty; contract rates are set with each company.",
    hours: "Per bounty, then contract", fees: "Check the platform's current terms",
    watch: "Popular bounties draw many competing PRs; read the claim rules before you start",
    src: [["Bounties", "https://algora.io"]],
  },
  {
    id: "topcoder", name: "Topcoder", url: "https://www.topcoder.com", kind: "build", label: "Paid development challenges",
    test: "build", testLabel: "Submit code", difficulty: 3, dsa: "some", unverified: true,
    entry: "Clients post development challenges; you submit working code, reviewers score it and top submissions are paid. Its competitive programming track is pure DSA.",
    lo: null, hi: null, est: false, basis: "Prize per challenge; amounts are on each challenge.",
    hours: "Per challenge", fees: "Check the platform's current terms",
    watch: "Several people build the same thing and only the top few are paid",
    src: [["Challenges", "https://www.topcoder.com"]],
  },
  {
    id: "nowhiteboard", name: "Hiring Without Whiteboards", url: "https://github.com/poteto/hiring-without-whiteboards", kind: "build", label: "List of take-home companies",
    test: "build", testLabel: "Take-home project", difficulty: 3, dsa: "no", unverified: true,
    entry: "A community list of companies whose interviews use take-home projects or pairing on real problems instead of algorithm puzzles. Use it to filter the job boards.",
    lo: null, hi: null, est: false, basis: "Salary set by each employer.",
    hours: "Full-time or contract, per company", fees: "Free",
    watch: "It doesn't say who hires from India; check each company's location rules",
    src: [["The list", "https://github.com/poteto/hiring-without-whiteboards"]],
  },
  {
    id: "worktrials", name: "Paid work-trial companies", url: "https://automattic.com/work-with-us/", kind: "build", label: "Hire by paid trial project",
    test: "build", testLabel: "Paid trial", difficulty: 4, dsa: "no", unverified: true,
    entry: "Some all-remote companies (Automattic, PostHog and others) replace most interview rounds with a short paid trial on real work.",
    lo: null, hi: null, est: false, basis: "The trial is paid; salary set by each company.",
    hours: "Trial of a few days to weeks, then full-time", fees: "None",
    watch: "Fewer openings than the job boards, and you still need to pass a first screen",
    src: [["Automattic", "https://automattic.com/work-with-us/"], ["PostHog", "https://posthog.com/careers"]],
  },
];

export const BOARDS: Board[] = [
  { id: "wellfound", name: "Wellfound", url: "https://wellfound.com/remote", note: "Set your profile location to India and it shows remote roles you're eligible for. Also try the 'Distributed teams only' toggle.", cost: "Free", mix: "startup", researchRank: 1 },
  { id: "yc", name: "Y Combinator Work at a Startup", url: "https://www.workatastartup.com", note: "Log in, filter by remote and location; look for roles tagged 'Remote (IN)'. Has Forward Deployed roles.", cost: "Free", mix: "startup", researchRank: 2 },
  { id: "fde", name: "Forward Deployed job boards", url: "https://fdejobs.com", note: "fdejobs.com and fde.traversaal.ai list only FD roles (US, EU and India). Newer, niche boards.", cost: "Free", mix: "startup", researchRank: 3 },
  { id: "hn", name: "Hacker News 'Who is hiring'", url: "https://news.ycombinator.com/item?id=49922569", note: "Monthly thread. Look for posts marked REMOTE without a country limit; most remote posts are US or EU only.", cost: "Free", mix: "startup", researchRank: 11 },
  { id: "himalayas", name: "Himalayas", url: "https://himalayas.app/jobs/countries/india", note: "Country, worldwide-only and timezone filters.", cost: "Free", mix: "mixed", researchRank: 4 },
  { id: "linkedin", name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/search/?f_WT=2&geoId=92000000", note: "Remote + Worldwide search. Many 'remote' jobs are still locked to one country, so read the location line.", cost: "Free", mix: "mixed", researchRank: 5 },
  { id: "jobgether", name: "Jobgether", url: "https://jobgether.com/remote-jobs/india", note: "Filter by 'open to candidates in India'.", cost: "Free, 5 matches a week; about $29/month for more", mix: "mixed", researchRank: 6 },
  { id: "remoteok", name: "RemoteOK", url: "https://remoteok.com", note: "Regions: Worldwide. Every post must show a salary range.", cost: "Free to apply", mix: "mixed", researchRank: 7 },
  { id: "wwr", name: "We Work Remotely", url: "https://weworkremotely.com/100-percent-remote-jobs", note: "'Anywhere in the World' tag (set by the employer, not checked).", cost: "Free basic; Pro $14.95/month", mix: "mixed", researchRank: 8 },
  { id: "remotive", name: "Remotive", url: "https://remotive.com/remote-worldwide-jobs", note: "'Available from my location' filter includes Worldwide jobs.", cost: "Free tier shows only some jobs; paid plans", mix: "mixed", researchRank: 9 },
  { id: "rwfa", name: "Real Work From Anywhere and Relomote", url: "https://www.realworkfromanywhere.com/", note: "Boards that list only worldwide roles.", cost: "Free", mix: "mixed", researchRank: 10 },
  { id: "nomads", name: "Working Nomads, Remote Rocketship, FlexJobs", url: "https://www.workingnomads.com/remote-india-jobs", note: "All have India pages, but full results are behind paid plans. Optional.", cost: "Paid", mix: "mixed", researchRank: 12 },
];

export const SKIP: [string, string][] = [
  ["Proxify", "Time-zone rule (GMT+4 to GMT−10) leaves out India"],
  ["Lemon.io", "Doesn't accept most Asian countries"],
  ["Terminal", "Canada, Latin America and Europe only"],
  ["Revelo", "Latin America only"],
  ["Index.dev", "Latin America and Central/Eastern Europe"],
  ["BairesDev", "Latin America focused"],
  ["DataAnnotation", "US, Canada, UK, Ireland, Australia, New Zealand"],
  ["Snorkel expert network", "US-based contractors only"],
  ["Prolific", "Not open to new sign-ups from India"],
  ["Gun.io", "Favors US and EU developers"],
  ["Malt", "Europe and UAE; needs a registered business"],
  ["Workana", "Mostly Latin American clients"],
  ["Talent500", "Jobs at India offices, paid in INR"],
  ["Pesto", "Shut down in 2025"],
  ["A.Team, X-Team, Contra", "India eligibility unverified; check before testing"],
];

export const REALITY: { value: string; label: string; you?: boolean }[] = [
  { value: "$22K/yr", label: "India median, engineering roles on Deel (2025)" },
  { value: "$36–48K/yr", label: "Senior engineers via Uplers; AI/ML up to $72K+" },
  { value: "$48.9K/yr", label: "What India remote developers expect on Arc (average)" },
  { value: "$60–96K/yr", label: "Your target ($5–8K a month), above every median", you: true },
];

/** Easiest entry first: difficulty, then test type, then the research's overall ease rank. */
export function byEntry(a: Platform, b: Platform) {
  const da = a.difficulty ?? 6;
  const db = b.difficulty ?? 6;
  if (da !== db) return da - db;
  if (a.test !== b.test) return TEST_ORDER[a.test] - TEST_ORDER[b.test];
  return (a.researchRank ?? 99) - (b.researchRank ?? 99);
}

export function byPay(a: Platform, b: Platform) {
  const va = a.hi == null ? -1 : a.hi + (a.lo ?? 0) / 1e5;
  const vb = b.hi == null ? -1 : b.hi + (b.lo ?? 0) / 1e5;
  return vb - va || byEntry(a, b);
}

export function boardsByEntry(a: Board, b: Board) {
  if (a.mix !== b.mix) return a.mix === "startup" ? -1 : 1;
  return a.researchRank - b.researchRank;
}
