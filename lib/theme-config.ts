/**
 * Centralized theme configuration for Just Perfumes.
 * All design tokens are mirrored here for use in TypeScript/JS contexts.
 * The authoritative source of truth for CSS remains app/globals.css.
 */

export const theme = {
  colors: {
    /** Primary dark backgrounds */
    bg: "#111316",
    surface: "rgba(19, 22, 28, 0.86)",
    surfaceElevated: "rgba(30, 34, 41, 0.92)",

    /** Text */
    ink: "#f3f2ee",
    muted: "#b3b1aa",

    /** Gold accents */
    gold: "#d4af37",
    goldLight: "#ffd700",
    goldDark: "#b8860b",

    /** Borders / lines */
    line: "rgba(243, 242, 238, 0.12)",
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
      "linear-gradient(-45deg, #0f1115, #141921, #17130f, #10161e, #0f1115)",
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
