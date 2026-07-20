import { images } from "./images";

export const siteConfig = {
  name: "RadAssistPro",
  tagline: "Read More. Worry Less.",
  description:
    "U.S.-based PACS administration and preliminary teleradiology support for radiology groups, imaging centers, and hospital networks.",
  unit: "A Unit of RxOnWeb",
  phone: "+1 (848) 221-8002",
  email: "business@radassistpro.com",
  address: "1625 Jacks Way, Toms River, NJ 08755",
  url: "https://radassistpro.com",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
];

export const author = {
  name: "RadAssistPro Clinical Operations",
  role: "PACS Administration & Teleradiology Operations",
  bio: "The RadAssistPro clinical operations team supports U.S. radiology groups, imaging centers, and hospital networks with virtual PACS administration and preliminary teleradiology coverage that runs inside their existing PACS. Guidance below reflects real onboarding, relay, and turnaround-time workflows the team runs across supported facilities.",
};

export const audienceLinks = [
  { href: "/for/teleradiology-groups", label: "Teleradiology Groups" },
  { href: "/for/imaging-centers", label: "Imaging Centers" },
  { href: "/for/urgent-care-er", label: "Urgent Care & ER" },
];

export const stats = [
  { value: "33+", label: "U.S. Facilities Supported" },
  { value: "50,000+", label: "Studies Managed to Date" },
  { value: "18 min", label: "Median Prelim TAT" },
  { value: "100%", label: "Documented Relay Compliance" },
  { value: "99.2%", label: "Internal QA Pass Rate" },
];

export const trustBadges = [
  "HIPAA-Aligned Workflows",
  "U.S.-Based Account Team",
  "24/7/365 Coverage",
  "Works in Your PACS",
];

export const services = [
  {
    id: "pacs-admins",
    title: "Virtual PACS Admins",
    subtitle: "Operational support inside your existing systems",
    description:
      "Dedicated administrators trained on PACS workflows. They handle relays, calls, study notes, and addendums so your radiologists stay on the worklist.",
    features: [
      "Critical result relay and documentation per your protocol",
      "Inbound and outbound call handling with audit trail",
      "Study notes, TAT follow-up, and addendum coordination",
      "Overread and peer-review workflow support",
      "Worklist triage and prioritization by your rules",
    ],
    metrics: [
      { label: "Calls Handled", value: "35,000+" },
      { label: "Addendums Coordinated", value: "5,000+" },
      { label: "Median Relay Time", value: "2.4 min" },
    ],
    image: images.servicePacs,
  },
  {
    id: "prelim-readers",
    title: "Prelim Teleradiologists",
    subtitle: "Licensed readers for after-hours and overflow volume",
    description:
      "Board-eligible and licensed radiologists providing preliminary reads when your team is at capacity. Coverage scales with study volume, not headcount.",
    features: [
      "24/7/365 coverage including nights, weekends, and holidays",
      "CT, MRI, X-ray, and ultrasound based on your case mix",
      "Voice recognition for efficient dictation",
      "Standardized QA checklists on every read",
      "Per-report pricing with no annual contract required",
    ],
    metrics: [
      { label: "Median Prelim TAT", value: "18 min" },
      { label: "Daily Read Volume", value: "247+" },
      { label: "QA Pass Rate", value: "99.2%" },
    ],
    image: images.servicePrelim,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    duration: "Day 1",
    description:
      "A 15-minute call to review your study volumes, modality mix, coverage hours, and escalation rules. We document your workflow before any system access and return a scoped rate card within one business day.",
    details: [
      "Volume, modality mix, and peak-hour patterns",
      "STAT thresholds and relay protocols",
      "Current TAT targets and backlog drivers",
      "PACS environment and user roles",
    ],
  },
  {
    step: "02",
    title: "Agreement and BAA",
    duration: "Days 2–4",
    description:
      "We finalize the service agreement and execute a Business Associate Agreement — the HIPAA contract that governs how we handle protected health information before we touch your systems. Your legal team reviews on its own schedule; ours turns signatures around same-day.",
    details: [
      "Service scope and rate card confirmed",
      "BAA executed before any PHI access",
      "Coverage hours and escalation owners named",
      "No setup fees at any point",
    ],
  },
  {
    step: "03",
    title: "Access and Provisioning",
    duration: "Days 4–8",
    description:
      "Your IT team provisions our users in your PACS environment with the roles you control. This step runs on your IT queue — it is the most common source of timeline variance, and we supply exact provisioning requirements up front to keep it moving.",
    details: [
      "User accounts created in your environment",
      "Access roles and permissions set by your team",
      "Connectivity and worklist visibility verified",
      "Provisioning checklist provided to your IT",
    ],
  },
  {
    step: "04",
    title: "Protocol Setup and Shadow Period",
    duration: "Days 8–13",
    description:
      "We write your relay, STAT, and escalation protocols, train the assigned team on your rules, and run a parallel shadow period alongside your existing staff — sized to your facility's volume and complexity — before taking the load.",
    details: [
      "Written relay and escalation protocols",
      "QA checklist signed off by your team",
      "Team trained on your facility's rules",
      "Shadow period sized to your volume",
    ],
  },
  {
    step: "05",
    title: "Go Live and Optimize",
    duration: "Days 13–15, then ongoing",
    description:
      "Full coverage begins with daily check-ins through the first week. From there, scheduled QA reports cover TAT, relay compliance, and read quality, and your dedicated U.S. contact adjusts coverage as volumes change.",
    details: [
      "Daily status calls during the first week",
      "Weekly performance and compliance reports",
      "Discrepancy review and TAT tuning",
      "Volume scaling without contract penalties",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Their PACS admins took over relays, calls, and addendum tracking. Our attendings gained roughly three hours back per day, and preliminary TAT improved noticeably within the first month.",
    author: "Dr. Matthew Hargrove",
    role: "Managing Partner",
    organization: "Summit Radiology Associates",
    location: "Denver, CO",
  },
  {
    quote:
      "Night and weekend locum costs were our biggest line item. Prelim coverage through RadAssistPro reduced that spend substantially while keeping read quality consistent with our internal standards.",
    author: "Karen Whitfield",
    role: "Practice Administrator",
    organization: "Gulf Coast Imaging Group",
    location: "Houston, TX",
  },
  {
    quote:
      "They logged into our PACS environment on day one. No workflow changes for our radiologists. The operational load shifted off our physicians within the first week.",
    author: "Dr. Anish Reddy",
    role: "Medical Director",
    organization: "Tri-State Diagnostic Radiology",
    location: "Philadelphia, PA",
  },
];

export const audiences = [
  {
    title: "Teleradiology Groups",
    description:
      "Multi-site groups that need consistent relay documentation, after-hours prelims, and call coverage without adding full-time staff at every location.",
    points: ["Multi-site PACS", "After-hours prelims", "Critical relays"],
  },
  {
    title: "Imaging Centers",
    description:
      "Outpatient centers where radiologists should be reading, not answering phones or chasing addendums across the afternoon worklist.",
    points: ["Call handling", "Addendum tracking", "TAT monitoring"],
  },
  {
    title: "Urgent Care and ER",
    description:
      "Facilities with time-sensitive studies that need reliable STAT relays and prelim coverage when in-house readers are off shift.",
    points: ["STAT priority", "24/7 coverage", "Flexible volume"],
  },
];
