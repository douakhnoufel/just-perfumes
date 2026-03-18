/**
 * Centralized theme configuration for Just Perfumes.
 * All design tokens are mirrored here for use in TypeScript/JS contexts.
 * The authoritative source of truth for CSS remains app/globals.css.
 */

export const theme = {
  colors: {
    /** Primary dark backgrounds */
    bg: "#0f0f0f",
    surface: "rgba(26, 26, 26, 0.85)",
    surfaceElevated: "rgba(42, 42, 42, 0.9)",

    /** Text */
    ink: "#f5f5f5",
    muted: "#a0a0a0",

    /** Gold accents */
    gold: "#d4af37",
    goldLight: "#ffd700",
    goldDark: "#b8860b",

    /** Borders / lines */
    line: "rgba(255, 255, 255, 0.1)",
    glassBorder: "rgba(255, 255, 255, 0.08)",

    /** Feedback */
    error: "rgba(201, 67, 57, 0.18)",
    success: "rgba(32, 108, 74, 0.18)",
  },

  gradients: {
    /**
     * Reference value mirroring the animated body background defined in globals.css.
     * The actual animation is applied purely via CSS (see `gradientShift` keyframes).
     * This value is provided here for documentation and for programmatic reads only.
     */
    animatedBg:
      "linear-gradient(-45deg, #0f0f0f, #1a0a2e, #0d1a2e, #0f1a0f, #2a0d0d, #0f0f0f)",
    luxury:
      "linear-gradient(135deg, #d4af37 0%, #ffd700 25%, #b8860b 50%, #d4af37 100%)",
    goldShimmer: "linear-gradient(135deg, #d4af37, #ffd700, #b8860b)",
    primaryButton: "linear-gradient(135deg, #d4af37, #b8860b)",
  },

  shadows: {
    soft: "0 8px 32px rgba(0, 0, 0, 0.4)",
    deep: "0 32px 80px rgba(0, 0, 0, 0.6)",
    glow: "0 0 40px rgba(212, 175, 55, 0.25)",
  },

  animation: {
    /** Background gradient loop duration in seconds */
    gradientDuration: 18,
    /** Easing for luxury interactions */
    easeLuxury: "cubic-bezier(0.4, 0, 0.2, 1)",
    durationFast: "200ms",
    durationMedium: "350ms",
    durationSlow: "600ms",
  },

  borderRadius: {
    sm: "14px",
    md: "18px",
    lg: "26px",
    xl: "32px",
    pill: "999px",
  },
} as const;

export type Theme = typeof theme;
