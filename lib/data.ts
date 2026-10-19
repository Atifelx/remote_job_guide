// Curated, ranked platform data (re-audited October 2026). Each section keeps only the
// strongest options, ranked by how many relevant jobs appear and how likely a senior developer
// in India is to get onboarded and paid. Traffic figures are Similarweb or Semrush, Aug–Sep 2026
// unless noted; stage details come from official pages where they exist, otherwise from
// candidate write-ups. Anything unconfirmed says so in the text.

import type { Dropped, Dsa, Flow, Format, Kind, Platform, Speed, Stage, Test } from "./types";

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

export const FLOW_LABEL: Record<Flow, string> = { 1: "High", 2: "Medium", 3: "Low" };

export const DSA_ORDER: Record<Dsa, number> = { none: 0, easy: 1, medium: 2, hard: 3 };
export const DSA_LABEL: Record<Dsa, string> = { none: "None", easy: "Easy", medium: "Medium", hard: "Hard" };

export const KINDS: { id: Kind; title: string; short: string; blurb: string }[] = [
  {
    id: "freelance",
    title: "Freelance marketplaces",
    short: "Freelance",
    blurb:
      "Clients post projects and you bid, or clients find your services. Ranked by how many developer projects appear and how trusted the platform is. Only four clear the bar.",
  },
  {
    id: "vetted",
    title: "Test-and-match marketplaces",
    short: "Test and match",
    blurb:
      "Like Turing: pass their tests once and get matched to client work. Ranked by evidence that accepted people actually get paid work, then trust and volume. Run two or three in parallel; passing gets you into a queue, not a guaranteed project.",
  },
  {
    id: "boards",
    title: "Remote job boards",
    short: "Job boards",
    blurb:
      "The employer hires you directly and runs its own interviews. Ranked by India-eligible developer job volume times your chance of a reply. Wherever you find a role, apply on the company's own careers page: those applications reach interview about 3.5 times as often as LinkedIn ones.",
  },
  {
    id: "takehome",
    title: "Take-home hiring, no DSA",
    short: "Take-home",
    blurb:
      "Trusted remote companies that hire developers through a real take-home assignment or paid trial instead of algorithm puzzles, then make an offer. Top six, ranked by how clean the process is and how confirmed India hiring is.",
  },
];

export const PLATFORMS: Platform[] = [
  // Freelance marketplaces
  {
    id: "upwork", name: "Upwork", url: "https://www.upwork.com", kind: "freelance", rank: 1, label: "Largest freelance marketplace",
    test: "open", difficulty: 1,
    speed: 2, speedNote: "No pool: work starts when a client hires you. Your review history shortens this; new profiles often wait weeks.",
    flow: 1, flowNote: "33.3M visits a month (Sep 2026). About 160K new posts a month site-wide in H1 2026, roughly 1,500–2,000 software posts a day (estimate). About 10 times the developer jobs of any other freelance site.",
    stages: [
      { title: "Profile review", formats: [], inside: "New profiles are reviewed before you can bid. Yours is already approved, with $20K+ earned." },
      { title: "Proposal", formats: [], inside: "A written proposal per job. Connects cost $0.15 each and aren't refunded if you lose." },
      { title: "Client interview", formats: ["talk"], time: "20–45 min", inside: "Each client runs their own, usually a call about past work. There's no platform-wide skills test." },
      { title: "Expert-Vetted (optional)", formats: ["talk"], time: "30 min", inside: "Invite-only since 30 June 2024: an interview with a Talent Manager on hard and soft skills, decided in 4–6 weeks." },
    ],
    prep: "Your history is the asset. Pin AI-agent case studies to your profile and bid on fewer, closer-matched jobs within the first hour they're posted.",
    after: "No waiting list: you start when a client hires you. Long-term clients take months to build, but this is where $5–8K a month from direct clients is most realistic.",
    lo: 2000, hi: 6000, est: true,
    pay: "Top Rated seniors charge $60–100/hr; India seniors realistically $35–80/hr (estimate). Fee is 0–15% per contract since May 2025.",
    watch: "Paid bidding and many unanswered proposals. Trustpilot 4.2 from 16.6K reviews.",
    src: [["Job volume", "https://uphunt.io/blog/upwork-worth-it-2026-data"], ["Fees", "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee"], ["Expert-Vetted", "https://support.upwork.com/hc/en-us/articles/360049625454-Expert-Vetted-talent"]],
  },
  {
    id: "fiverr-pro", name: "Fiverr Pro", url: "https://pro.fiverr.com/", kind: "freelance", rank: 2, label: "Vetted tier of Fiverr: clients come to you",
    test: "open", difficulty: 2,
    speed: 3, speedNote: "Clients find you through search, so the first order depends on ranking; new sellers often wait weeks.",
    flow: 1, flowNote: "34.4M visits a month (Sep 2026). Buyers search for services instead of posting jobs, which suits fixed-scope AI-agent builds.",
    stages: [
      { title: "Seller profile and offers", formats: [], inside: "List fixed-scope service packages with clear deliverables and prices." },
      { title: "Fiverr Pro application", formats: [], time: "2–4 week review", inside: "Apply with a portfolio of real work; Fiverr's team reviews it." },
      { title: "Buyer messages and orders", formats: ["talk"], inside: "Clients message you about a package; no bidding." },
    ],
    prep: "Package one or two AI-agent builds as fixed-scope offers with sample deliverables, and price for Pro buyers rather than the open market.",
    after: "The Pro badge lifts you above regular sellers in search. Repeat buyers are where the steady income comes from.",
    lo: 1500, hi: 5000, est: true,
    pay: "Pro sellers can reach $50–150/hr equivalent (estimate). Flat 20% fee; earnings clear after 7–14 days.",
    watch: "Only use the Pro tier; regular Fiverr competes on price. Trustpilot 3.4 from 16.2K reviews (35% one-star).",
    src: [["Fiverr Pro", "https://help.fiverr.com/hc/en-us/articles/29453001296913-How-to-become-a-Fiverr-Pro-freelancer"], ["Trustpilot", "https://www.trustpilot.com/review/www.fiverr.com"]],
  },
  {
    id: "freelancer", name: "Freelancer.com", url: "https://www.freelancer.com", kind: "freelance", rank: 3, label: "High-volume project marketplace",
    test: "open", difficulty: 1,
    speed: 2, speedNote: "No pool: you bid and clients reply within days when it lands.",
    flow: 1, flowNote: "7.8M visits a month (Sep 2026). Lots of projects, mostly with low budgets.",
    stages: [
      { title: "Profile", formats: [], inside: "Open sign-up." },
      { title: "Bid", formats: [], inside: "6 free bids a month on the free plan; popular projects draw 40–80 bids." },
      { title: "Client chat", formats: ["talk"], inside: "The client picks from bids and usually asks a few questions." },
    ],
    prep: "Filter hard: verified-payment clients, fixed budgets above $1,000 or hourly above $30, and AI or agent keywords.",
    after: "Work starts as soon as a bid is awarded.",
    lo: 500, hi: 2500, est: true,
    pay: "Budgets are mostly low; good projects exist but need filtering. Fee 10% (or $5 minimum) plus 1% tax collected in India.",
    watch: "Heavy price competition. Trustpilot 4.4 from 20.2K reviews.",
    src: [["Fees", "https://www.freelancer.com/feesandcharges"], ["Trustpilot", "https://www.trustpilot.com/review/www.freelancer.com"]],
  },
  {
    id: "braintrust", name: "Braintrust", url: "https://www.usebraintrust.com/jobs", kind: "freelance", rank: 4, label: "Senior client network, 0% fee to you",
    test: "ai", difficulty: 2,
    speed: 3, speedNote: "Approval can take weeks; you're paid only after the client pays (about net-30).",
    flow: 2, flowNote: "468K visits a month. Lists about 4,800 engineering and 2,100 AI/ML roles (its own claim); an Oct 2026 snapshot found 92 of 150 live listings were AI-training gigs.",
    stages: [
      { title: "Profile and ID check", formats: [], inside: "Profile, ID verification and an approval review." },
      { title: "AIR AI interview", formats: ["ai"], time: "15–20 min", inside: "An AI video interview scored against recruiter criteria. No skills test." },
      { title: "Client interviews", formats: ["talk"], inside: "You apply to listed jobs and each client interviews you." },
    ],
    prep: "Rehearse a short, specific walkthrough of your best AI-agent project; apply only to listings with a named client and a rate you'd accept.",
    after: "Contract terms are set with each client.",
    lo: 3500, hi: 8000, est: true,
    pay: "You set your rate; senior roles list $100–180/hr. You keep 100%; the client pays 10–15% on top.",
    watch: "Many listings are AI-training gigs. Ignore 'clients' who send files to open: malware scams have been reported.",
    src: [["Jobs", "https://www.usebraintrust.com/jobs"], ["AI interview", "https://recruitingtechreviews.com/articles/braintrust-air-interview-what-to-expect"], ["Approval guide", "https://support.usebraintrust.com/hc/en-us/articles/14302713002391-Guide-Becoming-Approved-Talent"]],
  },

  // Test-and-match marketplaces
  {
    id: "mercor", name: "Mercor", url: "https://www.mercor.com/experts/software-engineers/", kind: "vetted", rank: 1, label: "Expert contracts for AI labs, India listings",
    test: "ai", difficulty: 2,
    speed: 2, speedNote: "Picked candidates usually start in 2–4 weeks and Stripe holds the first payout 7 days; many applicants are never matched.",
    flow: 1, flowNote: "10.6M visits a month. 30K+ contractors active each week and $2M+ paid out a day (Mercor, May 2026): the strongest evidence that accepted people actually get paid work.",
    stages: [
      { title: "AI video interview", formats: ["ai", "dsa"], dsa: "easy", time: "about 20 min", inside: "About your resume and projects, plus data-structure questions. Reports differ: some describe only spoken questions, others an easy-to-medium problem solved while the AI watches your screen. Up to 3 retakes, but hiring managers see the count." },
      { title: "Role test (some roles)", formats: ["takehome"], inside: "Some roles add a coding challenge, take-home or domain test." },
      { title: "Paid work trial", formats: ["trial", "aieval"], paid: true, time: "4–6 hrs", inside: "One paid trial per person, ever, on real project tasks." },
    ],
    prep: "Rehearse a 2-minute walkthrough of your strongest AI-agent project and its trade-offs. Using an LLM to write answers or evaluate code is against the rules.",
    after: "No formal rejections: no match within 4–6 weeks means not picked. Projects can end abruptly, and offboarding decisions are final.",
    lo: 2000, hi: 6000, est: true,
    pay: "Official SWE range $80–200/hr; Glassdoor shows $50–84/hr. A 'Software Engineer – India' contract is listed at 15–40 hrs/week, with rates adjusted to location. Paid weekly via Stripe or Wise.",
    watch: "Churn: a Meta project relaunched at $16/hr instead of $21 (Nov 2025). Screen monitoring with Insightful; March 2026 data breach. Trustpilot 4.5 from 1.2K reviews.",
    src: [["Software roles", "https://www.mercor.com/experts/software-engineers/"], ["Scale", "https://www.mercor.com/blog/when-you-go-from-2-million-a-month-to-2-million-a-day/"], ["India listing", "https://nodesk.co/remote-jobs/mercor-software-engineer-india/"]],
  },
  {
    id: "toptal", name: "Toptal", url: "https://www.toptal.com", kind: "vetted", rank: 2, label: "Most trusted, highest senior rates",
    test: "dsa", difficulty: 5,
    speed: 3, speedNote: "Screening takes 3–8 weeks, then the first match usually comes 1–4 weeks after acceptance; some report 2–3 month gaps.",
    flow: 2, flowNote: "2.0M visits a month. People who rely on it report a median of about $5.5K a month.",
    stages: [
      { title: "English and personality interview", formats: ["english", "talk"], inside: "A live call. 26.4% of all applicants are still in after this stage." },
      { title: "Skill review", formats: ["dsa"], dsa: "hard", time: "90–100 min", inside: "Timed Codility test: 3 problems (easy, medium, hard), auto-scored on correctness and performance; about 210/300 to pass. 7.4% still in." },
      { title: "Live screening", formats: ["live", "codereview"], inside: "Two live coding tasks of 15–20 minutes each; the screener also goes through your skill-review solutions with you. 3.6% still in." },
      { title: "Test project", formats: ["takehome", "codereview"], time: "1–3 weeks, 30–50 hrs", inside: "Usually a full-stack app built to a spec, then a call where you demo it and defend your code. Unpaid. 3.2% still in." },
    ],
    prep: "Codility Lessons (prefix sums, sorting, greedy, DP, graphs); aim to fully solve 2 of 3 with efficient code. Budget about 40 hours for the project.",
    retake: "About 6 months is commonly reported; no official policy found.",
    after: "You apply to client jobs and may still interview. Payout delays of 20 days to 6 weeks are reported.",
    lo: 5000, hi: 10000, est: true,
    pay: "You set your rate; reported $35–150+/hr. No fee to you; Toptal adds its markup for clients.",
    watch: "Hard to get in, and the 30–50 hour test project is unpaid. Trustpilot 4.8 from 2.6K reviews.",
    src: [["Top 3%", "https://www.toptal.com/top-3-percent"], ["FAQ", "https://www.toptal.com/freelance-jobs/faq"], ["2026 review", "https://earnifyhub.com/blog/freelancing/toptal-review-2026"]],
  },
  {
    id: "micro1", name: "micro1", url: "https://www.micro1.ai/experts", kind: "vetted", rank: 3, label: "Fast AI interview, many software listings",
    test: "ai", difficulty: 2,
    speed: 4, speedNote: "Pool: the first matching window is 1–2 weeks, but many sit in 'Hiring Manager Reviewing' for 30 days and then get 'Not Selected'.",
    flow: 1, flowNote: "9.8M visits a month; about 154 open software listings (Oct 2026). Recruits actively in South Asia.",
    stages: [
      { title: "Resume and role", formats: [], inside: "Pick a role and upload your resume, then verify your ID." },
      { title: "Practice interview (optional)", formats: ["ai"], time: "18 min", inside: "A free practice run with the AI interviewer." },
      { title: "Zara AI interview", formats: ["ai", "dsa"], dsa: "medium", time: "20–40 min", proctored: true, inside: "Spoken, adaptive interview (about 7 minutes per skill) with camera and screen share, recorded for human review. Engineering roles add live coding: usually one easy/medium LeetCode-style problem plus debugging or optimisation, in any language." },
      { title: "Certification and matching", formats: [], inside: "The result shows immediately; a hiring manager then reviews you for specific projects." },
    ],
    prep: "One easy/medium problem talked through out loud (intervals, arrays, hash maps) and clear spoken answers. Long pauses before answering are watched as an anti-cheating signal.",
    after: "Certified people go into a pool; far more pass than there are openings. Once placed, pay through Deel is reported as reliable.",
    lo: 2000, hi: 5000, est: true,
    pay: "$20–200/hr overall; one SWE AI-trainer listing shows $20–75/hr. Paid in USD via Deel twice a month. India rate not published.",
    watch: "The top complaint is getting certified and then no paid tasks. Hubstaff time tracking. Trustpilot 4.7 from 10.9K reviews.",
    src: [["Interview questions", "https://www.micro1.ai/interview-questions"], ["Listings", "https://skillora.ai/ai-training-jobs/micro1"], ["Waiting", "https://getaiwork.com/articles/micro1-no-response/"]],
  },
  {
    id: "arc", name: "Arc.dev", url: "https://arc.dev/talent", kind: "vetted", rank: 4, label: "Free for developers, India jobs page",
    test: "live", difficulty: 3,
    speed: 2, speedNote: "You apply to live roles after vetting, so there's no long pool; Arc claims about 14 days to hire.",
    flow: 2, flowNote: "508K visits a month; 'thousands' of jobs (third-party claim) and an India jobs page.",
    stages: [
      { title: "Profile screening", formats: [], inside: "A person reviews your work history and GitHub. Padded resumes get rejected." },
      { title: "Communication check", formats: ["english"], inside: "A recorded video or voice self-introduction to check English and remote readiness." },
      { title: "Technical interview", formats: ["live", "dsa"], dsa: "medium", time: "about 1 hr", inside: "Live coding or pair programming with an expert, on algorithms and your own domain. Full-time roles may need only the communication check." },
      { title: "Final review and onboarding call", formats: ["talk"], inside: "A last check, then you're in. About 2% pass overall." },
    ],
    prep: "Medium LeetCode while explaining your reasoning out loud, a polished 2-minute video intro, and an up-to-date GitHub.",
    after: "Matching depends on companies picking you; reviewers say be patient. Weekly payouts.",
    lo: 3000, hi: 6000, est: false,
    pay: "Arc's India page: freelancers $10–80/hr; India remote developers expect about $48.9K/yr on average. Free for developers.",
    watch: "Some India-rate listings pay $20–25K a year; filter by pay band. Trustpilot 4.2 from 198 reviews.",
    src: [["Vetting", "https://arc.dev/employer-blog/vetting-process/"], ["India jobs", "https://arc.dev/en-in/remote-jobs"], ["India pay", "https://arc.dev/remote-developer-salary/india"]],
  },
  {
    id: "turing", name: "Turing", url: "https://www.turing.com/jobs", kind: "vetted", rank: 5, label: "India is its core talent pool",
    test: "dsa", difficulty: 4,
    speed: 4, speedNote: "Testing takes 3–4 days, then 3–4 months in the pool is commonly reported. Treat passing as joining a queue.",
    flow: 2, flowNote: "2.4M visits a month. Most open roles are now LLM-trainer contracts (writing and judging code for AI labs).",
    stages: [
      { title: "Work-experience survey", formats: [], time: "20–30 min", inside: "57 questions about your experience." },
      { title: "Tech-stack quizzes", formats: ["mcq"], time: "45–120 min each", inside: "Multiple-choice on your stack's fundamentals and reading code. Expect 3–6 hours of testing in total." },
      { title: "Coding challenge", formats: ["dsa", "aieval"], dsa: "medium", time: "about 90 min", proctored: true, inside: "Two LeetCode-style problems, one easy and one medium; you need 80%+ of test cases. Newer versions add a section comparing two AI model answers. LLM-trainer roles use a shorter 30–45 minute challenge." },
      { title: "Client interview", formats: ["talk"], inside: "After matching, the client runs their own interview. Some tracks add a 1-hour technical interview first." },
    ],
    prep: "Medium LeetCode on arrays, strings, hash maps, sliding window and light DP; timed multiple-choice practice on your stack; practise judging which of two AI answers is better.",
    retake: "Wait 3 months. Passed tests stay valid about 6 months.",
    after: "Contracts are 20, 30 or 40 hrs/week with 4 hours of US Pacific overlap, up to 3 months and extendable. Paid on the 1st and 16th, on time once placed.",
    lo: 2500, hi: 6000, est: true,
    pay: "Not published. Reviews say Turing keeps about half of what the client pays (one 2025 case: client paid $14.5K a month, developer got $6K).",
    watch: "Long waits and a large cut. Trustpilot 2.3 from 205 reviews, mostly from people stuck in the pool.",
    src: [["Test prep", "https://www.turing.com/blog/turing-developer-test-preparation-tips"], ["Review", "https://talentsforai.com/blog/is-turing-legit/"], ["Trustpilot", "https://www.trustpilot.com/review/turing.com"]],
  },
  {
    id: "crossover", name: "Crossover", url: "https://www.crossover.com/jobs/software-engineer/india", kind: "vetted", rank: 6, label: "Full-time USD roles, same pay in every country",
    test: "aptitude", difficulty: 5,
    speed: 1, speedNote: "You apply to a specific open role, so an offer means the job starts; offers often come within days of the last test.",
    flow: 2, flowNote: "531K visits a month; about 27 India roles listed on LinkedIn at a time.",
    stages: [
      { title: "Fit questions and AI screen", formats: ["ai"], time: "15–20 min", inside: "Basic yes/no fit questions and a short AI screening interview." },
      { title: "CCAT aptitude test", formats: ["aptitude"], time: "15 min", inside: "50 verbal, maths and logic questions in 15 minutes, no calculator. Switching tabs disqualifies you." },
      { title: "Skills test and real-work assessment", formats: ["takehome"], inside: "A job-like task graded against a published rubric. 'AI-First' roles expect daily use of Claude Code, Cursor or Copilot." },
      { title: "Interview", formats: ["talk"], time: "about 30 min", inside: "Google Meet with an engineering leader." },
      { title: "Proctored CCAT", formats: ["aptitude"], time: "15 min", proctored: true, inside: "The CCAT again with webcam, phone proctoring and an ID check." },
    ],
    prep: "CCAT practice tests (about 18 seconds per question) and a spec-first, test-driven workflow with AI coding tools.",
    retake: "Failing the CCAT locks you out for about 6 months.",
    after: "Full-time, 40 hrs/week as an independent contractor, paid weekly via Payoneer.",
    lo: 4000, hi: 8300, est: true,
    pay: "Fixed USD rate per role: standard engineering roles about $100K/yr (~$50/hr); $22–105/hr reported from India.",
    watch: "WorkSmart tracking: screenshots, webcam photos and keystrokes in 10-minute blocks; idle time is unpaid. Trustpilot 1.4 from 105 reviews, mostly about the tests and monitoring.",
    src: [["Selection process", "https://www.crossover.com/selection-process"], ["Proctored CCAT", "https://www.crossover.com/resources/pccat-guide"], ["India pay", "https://www.glassdoor.com/Salary/Crossover-for-Work-India-Salaries-EI_IE1041838.0,18_IL.19,24_IN115.htm"]],
  },

  // Take-home hiring
  {
    id: "automattic", name: "Automattic", url: "https://automattic.com/work-with-us/how-we-hire-developers/", kind: "takehome", rank: 1, label: "WordPress.com, Tumblr, WooCommerce",
    test: "trial", difficulty: 3,
    speed: 2, speedNote: "Paid work starts with the trial, after an application and a take-home of about a week.",
    flow: 2, flowNote: "About 1,400 staff in 83 countries, India among them; regular engineering openings.",
    check: "India is on its list of countries with employees. Salary currency for India hires isn't confirmed; ask on the first call.",
    stages: [
      { title: "Written application", formats: [], inside: "Answers to written questions instead of a cover letter." },
      { title: "Slack chat with an engineer", formats: ["talk"], inside: "A text-based interview about your work." },
      { title: "Coding challenge", formats: ["takehome"], time: "about a week", inside: "A take-home in an unfamiliar, near-real-world codebase. No whiteboarding or puzzles." },
      { title: "Paid trial", formats: ["trial"], paid: true, time: "15–35 hrs", inside: "Part-time work on a real project, reviewed by the engineers you'd work with. About $25/hr." },
      { title: "Offer", formats: [], inside: "Final approval, sometimes after an executive interview." },
    ],
    prep: "Write clearly and asynchronously, since most of the process happens in writing, and get comfortable reading a large existing codebase.",
    after: "Salaries are 'based on skills, not location'.",
    lo: null, hi: null, est: false,
    pay: "Trial paid at about $25/hr in USD; salary not published.",
    watch: "The take-home, trial and approval together can take a few months.",
    src: [["How we hire developers", "https://automattic.com/work-with-us/how-we-hire-developers/"], ["About the trial", "https://automattic.com/what-to-expect-during-a-trial/"]],
  },
  {
    id: "zapier", name: "Zapier", url: "https://zapier.com/l/jobs/interview-guide", kind: "takehome", rank: 2, label: "Short take-home, building an India team",
    test: "practical", difficulty: 3,
    speed: 2, speedNote: "Zapier says it replies within 7 days at each step.",
    flow: 2, flowNote: "Actively hiring in India: an India-timezone Release Engineering team and a 'Director, India' role (Apr 2026).",
    check: "Pay is probably INR through the India entity; not confirmed.",
    stages: [
      { title: "Written application", formats: [], inside: "Written answers; a resume is optional." },
      { title: "Recruiter and hiring manager", formats: ["talk"], inside: "Two conversations about your work." },
      { title: "Take-home", formats: ["takehome", "codereview"], time: "about 2.5 hrs", inside: "A take-home designed to match day-to-day work, then reviewed live with engineers. No DSA." },
      { title: "Final interview and references", formats: ["talk"], inside: "Sometimes a final interview, then references and a background check." },
    ],
    prep: "Read Zapier's published interview guide and practise explaining your take-home choices and trade-offs out loud.",
    after: "Offer after references.",
    lo: null, hi: null, est: false,
    pay: "Not published; likely INR for India.",
    watch: "Probably not USD.",
    src: [["Interview guide", "https://zapier.com/l/jobs/interview-guide"], ["India role", "https://jobgether.com/offer/69f0d327c646310ee39d9d28-software-engineer----release-engineering"]],
  },
  {
    id: "gitlab", name: "GitLab", url: "https://handbook.gitlab.com/handbook/hiring/interviewing/technical/", kind: "takehome", rank: 3, label: "Merge-request review instead of LeetCode",
    test: "practical", difficulty: 3,
    speed: 3, speedNote: "A standard multi-round company loop; no timing data found.",
    flow: 1, flowNote: "Many open engineering roles; most are in the US, Canada or India.",
    check: "Hires through GitLab India Pvt Ltd, so pay is INR with a location factor, not USD.",
    stages: [
      { title: "Recruiter screen", formats: ["talk"], inside: "Background and role fit." },
      { title: "Merge request review", formats: ["codereview"], time: "up to 1 hr, at home", inside: "You get a real, self-contained merge request at least 72 hours ahead and review it on your own time." },
      { title: "Technical session", formats: ["codereview", "live"], time: "90 min", inside: "Discuss your review and write code to improve the merge request. No LeetCode round. AI use is allowed if you say so." },
      { title: "Hiring manager and leadership", formats: ["talk"], inside: "Team fit, then a final round." },
    ],
    prep: "Practise reviewing real merge requests for correctness, tests, naming, performance and security, written as specific comments, then pair on the fixes.",
    after: "Employment through the India entity.",
    lo: null, hi: null, est: false,
    pay: "INR; India pay bands are among the top of the market.",
    watch: "Not USD.",
    src: [["Technical interview", "https://handbook.gitlab.com/handbook/hiring/interviewing/technical/"], ["India entity", "https://handbook.gitlab.com/handbook/entity/india-pvt-ltd/"]],
  },
  {
    id: "duckduckgo", name: "DuckDuckGo", url: "https://duckduckgo.com/how-we-hire", kind: "takehome", rank: 4, label: "Two paid async projects, no live coding",
    test: "practical", difficulty: 3,
    speed: 3, speedNote: "Two async projects plus review take weeks; no timing data found.",
    flow: 3, flowNote: "Fewer openings than the companies above.",
    check: "Staff are in 15+ countries but India isn't named; confirm eligibility on each posting.",
    stages: [
      { title: "Application", formats: [], inside: "Apply to a specific role." },
      { title: "Paid project 1", formats: ["takehome"], paid: true, time: "5–10 hrs", inside: "An async project, paid a flat fee. No live coding or puzzles." },
      { title: "Paid project 2", formats: ["takehome"], paid: true, time: "5–20 hrs", inside: "A larger async project, also paid." },
      { title: "Written decisions and technical review", formats: ["talk", "codereview"], inside: "You explain your choices in writing and discuss the work with the team." },
    ],
    prep: "Treat each project like production work: clear README, tests, and a short write-up of the trade-offs you made.",
    after: "Offer after the review.",
    lo: null, hi: null, est: false,
    pay: "Projects paid a flat USD fee; salary not published.",
    watch: "Low volume; India eligibility unconfirmed.",
    src: [["How we hire", "https://duckduckgo.com/how-we-hire"], ["Process guide", "https://prachub.com/resources/duckduckgo-engineering-interview-paid-projects-written-decisions-and-technical-review"]],
  },
  {
    id: "doist", name: "Doist", url: "https://www.todoist.com/careers", kind: "takehome", rank: 5, label: "Todoist; test task before team interviews",
    test: "practical", difficulty: 3,
    speed: 3, speedNote: "Long-form application, test task, team interviews and a hiring committee; expect weeks to months.",
    flow: 3, flowNote: "Small company; occasional engineering openings.",
    check: "'We never place restrictions on locations', but no India hire is confirmed, and pay is location-adjusted.",
    stages: [
      { title: "Long-form application", formats: [], inside: "Detailed written answers." },
      { title: "Interview", formats: ["talk"], inside: "Google Meet; the salary range is shared up front." },
      { title: "Test task", formats: ["takehome"], time: "about 10 hrs", inside: "A real-world engineering task. It was paid in 2018 accounts; whether it still is isn't confirmed." },
      { title: "Team interviews and hiring committee", formats: ["talk"], inside: "With the people you'd work with, then a final decision." },
    ],
    prep: "Write a careful application; the process favours clear written communication.",
    after: "Offer after the hiring committee.",
    lo: null, hi: null, est: false,
    pay: "Location-adjusted salary, which may land lower for India; not published.",
    watch: "Location-adjusted pay.",
    src: [["Careers", "https://www.todoist.com/careers"], ["Hiring process", "https://resources.workable.com/stories-and-insights/hiring-remote-employees"]],
  },
  {
    id: "toggl", name: "Toggl", url: "https://toggl.com/jobs", kind: "takehome", rank: 6, label: "Paid test week with the team",
    test: "trial", difficulty: 3,
    speed: 2, speedNote: "About a month from application to offer; the paid test week comes near the end.",
    flow: 3, flowNote: "Small company; occasional engineering openings.",
    check: "Staff in 43 countries with no stated restrictions, but India isn't confirmed; check each posting.",
    stages: [
      { title: "Skills test", formats: ["takehome"], inside: "An online skills assessment or home assignment." },
      { title: "Culture and technical interviews", formats: ["talk"], inside: "How you work, then a technical conversation with the team lead." },
      { title: "Paid test week", formats: ["trial"], paid: true, time: "3–5 days", inside: "Real tasks with your future team." },
    ],
    prep: "Treat the test week like a first week on the job: ask questions early and ship small, finished pieces.",
    after: "Offer after the test week.",
    lo: null, hi: null, est: false,
    pay: "Not published.",
    watch: "Low volume; India unconfirmed.",
    src: [["Jobs", "https://toggl.com/jobs"]],
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
  flow: Flow;
  flowNote: string;
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
  { id: "wellfound", name: "Wellfound", url: "https://wellfound.com/remote", rank: 1, mix: "startup", cost: "Free",
    note: "Set your location to India and it shows remote roles you're eligible for; try the 'Distributed teams only' toggle. Applications often reach founders.",
    flow: 1, flowNote: "4.64M visits a month (Aug 2026), and India is its biggest audience.",
    speed: 2, speedNote: "3.75–5.2% interview rate, among the highest measured for any job board." },
  { id: "linkedin", name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/search/?f_WT=2&geoId=92000000", rank: 2, mix: "bigco", cost: "Free",
    note: "Remote + Worldwide search. Many 'remote' roles are locked to one country, so read the location line. Turn on 'Open to work' and message hiring managers directly.",
    flow: 1, flowNote: "The largest volume by far; it carries about 78% of all tracked applications, so competition is heaviest.",
    speed: 4, speedNote: "1.95% interview rate (4% in Q2 2026). Recruiter-initiated messages get about 17% replies, so let recruiters come to you." },
  { id: "himalayas", name: "Himalayas", url: "https://himalayas.app/jobs/countries/india/developer", rank: 3, mix: "bigco", cost: "Free",
    note: "Every listing states which countries it accepts, so there's no guessing about eligibility. Click through and apply on the company's careers page.",
    flow: 1, flowNote: "1,845 developer jobs explicitly open to India (Oct 2026).",
    speed: 3, speedNote: "Depends on the employer; careers-page applications do best." },
  { id: "hn", name: "Hacker News 'Who is hiring'", url: "https://hnhiring.com/locations/remote", rank: 4, mix: "startup", cost: "Free",
    note: "Monthly thread (hnhiring.com filters it). Look for REMOTE posts without a country limit. Also post yourself in the same month's 'Who wants to be hired' thread.",
    flow: 2, flowNote: "About 577 roles a month in Q3 2026, 33–42% remote; more than half mention AI.",
    speed: 2, speedNote: "Posters must work at the company and commit to replying to applicants." },
  { id: "hiringcafe", name: "HiringCafe", url: "https://hiringcafe.com/", rank: 5, mix: "bigco", cost: "Free",
    note: "Pulls listings straight from company career pages, with true-remote, timezone and eligibility filters. You apply on the careers page itself.",
    flow: 1, flowNote: "2.54M visits a month (Jan 2026); 5M+ jobs scraped from career pages, US-heavy.",
    speed: 2, speedNote: "Careers-page applications reach interview 6.87% of the time, the best channel measured." },
  { id: "wwr", name: "We Work Remotely", url: "https://weworkremotely.com/100-percent-remote-jobs", rank: 6, mix: "bigco", cost: "Free to apply",
    note: "Use the 'Anywhere in the World' filter. Employers pay to post, which screens out junk.",
    flow: 2, flowNote: "2.19M visits a month.",
    speed: 3, speedNote: "Depends on the employer." },
  { id: "yc", name: "Y Combinator Work at a Startup", url: "https://www.ycombinator.com/jobs/location/india", rank: 7, mix: "startup", cost: "Free",
    note: "Build a full profile so founders can find you; look for 'Remote (IN)'. Has Forward Deployed roles.",
    flow: 3, flowNote: "Small: about 12 India-eligible engineering jobs at a time (Oct 2026).",
    speed: 1, speedNote: "Applications go straight to founders, who often message strong profiles within a week." },
  { id: "jobgether", name: "Jobgether", url: "https://jobgether.com/remote-jobs/india", rank: 8, mix: "bigco", cost: "Free, 5 matches a week; about $29/month for more",
    note: "Filter by 'open to candidates in India'. An aggregator, so listings get pulled after review.",
    flow: 1, flowNote: "18,487 jobs on its India page: 444 software engineer, 273 full-stack and 197 AI engineer roles (Oct 2026).",
    speed: 3, speedNote: "Depends on the employer." },
];

export const DROPPED: { title: string; items: Dropped[] }[] = [
  {
    title: "Below the quality line",
    items: [
      { name: "Contra", why: "Commission-free, but low volume and Trustpilot 2.0" },
      { name: "Codementor", why: "Small side channel for mentoring, not a pipeline" },
      { name: "Guru, Truelancer, PeoplePerHour", why: "Cheap work and little of it; PeoplePerHour's Trustpilot profile was removed" },
      { name: "Andela", why: "About 0.5% acceptance, few Indian placements, Trustpilot 1.9" },
      { name: "G2i", why: "Fast onboarding, but small (13K visits a month) and India unconfirmed" },
      { name: "xAI AI Tutor", why: "Paused tutor hiring in June 2026; non-US pay unpublished" },
      { name: "Uplers, Flexiple, Supersourcing, EPAM Anywhere", why: "India-rate or INR pay" },
      { name: "Lemon.io, Proxify, Gun.io", why: "India missing from accepted countries, Europe hours, or too small" },
      { name: "Algora, Cal.com", why: "Few roles; India payouts or eligibility unconfirmed" },
      { name: "Supabase, Canonical, Elastic", why: "Live coding or aptitude tests before any take-home" },
      { name: "RemoteOK, Remotive, daily.dev", why: "Only 73 India dev results, paywalled database, or few matches by design" },
      { name: "Remote.com jobs, Otta, Built In, web3.career, aijobs.net", why: "Mostly US/UK/EU roles, or niche" },
    ],
  },
  {
    title: "Low pay, unpaid work or tier systems",
    items: [
      { name: "Outlier (Scale AI)", why: "Tier gates fail most people, 30-day lockouts, India coding pays $13.75–27.50/hr" },
      { name: "Alignerr, AfterQuery, Pareto", why: "Reports of unpaid hours, payout holds or missed pay" },
      { name: "SuperAnnotate, Rex.zone / Abaka AI", why: "Advertised rates not matched by real projects; delayed payouts" },
      { name: "Mindrift, Invisible, Soul AI, Handshake AI", why: "Location-based pay that lands low for India, or invite-only and capped" },
      { name: "Datacurve / Shipd, Perle", why: "Paid only if accepted, or paid partly in crypto" },
      { name: "Fiverr (standard), Topcoder, Devpost", why: "Price competition or prize contests, not client hiring" },
    ],
  },
  {
    title: "Not open to India",
    items: [
      { name: "PostHog, Linear, 37signals, Ghost, Close", why: "Good paid-trial processes, but US/EU time zones or countries only" },
      { name: "Strider, Howdy, Revelo", why: "Latin America only" },
      { name: "DataAnnotation, Snorkel, Prolific", why: "US or a short country list" },
      { name: "Terminal, Index.dev, BairesDev, Malt", why: "Latin America, Canada or Europe focused" },
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

export function byRank(a: Platform, b: Platform) {
  return a.rank - b.rank;
}

/** Easiest entry first: difficulty, then kind of gate, then DSA level. */
export function byEntry(a: Platform, b: Platform) {
  if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
  if (a.test !== b.test) return TEST_ORDER[a.test] - TEST_ORDER[b.test];
  return DSA_ORDER[maxDsa(a.stages)] - DSA_ORDER[maxDsa(b.stages)] || a.rank - b.rank;
}

export function bySpeed(a: Platform, b: Platform) {
  return a.speed - b.speed || a.rank - b.rank;
}

export function byPay(a: Platform, b: Platform) {
  const va = a.hi == null ? -1 : a.hi + (a.lo ?? 0) / 1e5;
  const vb = b.hi == null ? -1 : b.hi + (b.lo ?? 0) / 1e5;
  return vb - va || a.rank - b.rank;
}
