export const images = {
  hero: "/images/hero-radiology-reading-room.webp",
  homeOps: "/images/pacs-workstation-closeup.webp",
  homePacsCard: "/images/critical-relay-coordinator.webp",
  homePrelimCard: "/images/teleradiology-night-ops.webp",
  modalityBg: "/images/ct-scan-monitor.webp",
  testimonialsBanner: "/images/testimonials-success.webp",

  aboutHero: "/images/about-hero-campus.webp",
  aboutMission: "/images/about-mission-team.webp",
  aboutSupport: "/images/about-dedicated-support.webp",

  servicesHero: "/images/services-hero-modalities.webp",
  servicePacs: "/images/service-pacs-admin.webp",
  servicePrelim: "/images/service-prelim-reader.webp",

  workflowHero: "/images/workflow-discovery-call.webp",
  workflowSetup: "/images/workflow-secure-setup.webp",
  workflowGoLive: "/images/workflow-go-live.webp",
  workflowOptimize: "/images/hospital-radiology-exterior.webp",

  audienceTelerad: "/images/audience-telerad-network.webp",
  audienceImaging: "/images/audience-imaging-center.webp",
  audienceUrgent: "/images/audience-urgent-care-er.webp",

  bookCallHero: "/images/book-call-hero.webp",
  homeModalityPanel: "/images/home-modality-panel.webp",
} as const;

export const modalities = [
  { code: "CT", label: "Computed Tomography" },
  { code: "MRI", label: "Magnetic Resonance" },
  { code: "XR", label: "X-Ray" },
  { code: "US", label: "Ultrasound" },
];
