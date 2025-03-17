export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EmotionAI",
  description: "AI-driven emotion and attention detection.",

  // 🔹 Main Navigation Bar Items
  navItems: [
    { label: "Home", href: "/" },
    { label: "Without Jetson", href: "/without-jetson" },
    { label: " AI Emotion Tracking", href: "/realtimedetect" },
    { label: "Attention", href: "/attention" },
    { label: "Real-Time Feed", href: "/without-jetson" },
    { label: "About Us", href: "/about" },

  ],

  // 🔹 Mobile & Sidebar Menu Items
  navMenuItems: [
    { label: "Home", href: "/" },
    { label: "Without Jetson", href: "/without-jetson" },
    { label: " AI Emotion Tracking", href: "/realtimedetect" },
    { label: "Attention", href: "/attention" },
    { label: "Real-Time Feed", href: "/without-jetson" },
    { label: "About Us", href: "/about" },

  ],

  // 🔹 External Links
  links: {
    github: "https://github.com/A-Singh15",
  },
};
