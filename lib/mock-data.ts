import type { Product, Promotion } from "@/lib/types";

export const sampleProducts: Product[] = [
  {
    id: "amber-noir",
    name: "Amber Noir",
    type: "original",
    collection: "Night Veil",
    description: "Warm amber, vanilla resin, and smoked cedar.",
    imageUrl: "/images/jstprfpic1.jpg",
    price: 88,
    finalPrice: 88,
    stock: 18
  },
  {
    id: "citrine-veil",
    name: "Citrine Veil",
    type: "extrait",
    collection: "Sun Ritual",
    description: "Bergamot, neroli, and luminous white musk.",
    imageUrl: "/images/jstprf2.jpg",
    price: 74,
    finalPrice: 74,
    stock: 21
  },
  {
    id: "rose-atlas",
    name: "Rose Atlas",
    type: "eau-de-parfum",
    collection: "Velvet Bloom",
    description: "Rose absolute, pink pepper, and suede.",
    imageUrl: "/images/jstperfpic.jpg",
    price: 96,
    finalPrice: 96,
    stock: 12
  },
  {
    id: "oud-river",
    name: "Oud River",
    type: "original",
    collection: "Imperial Wood",
    description: "Oud accord, cardamom, and dark patchouli.",
    imageUrl:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
    price: 120,
    finalPrice: 120,
    stock: 8
  }
];

export const samplePromotions: Promotion[] = [
  {
    id: "launch-week",
    title: "Velvet Launch Week",
    description: "20% off selected scents and double referral points.",
    discountPercent: 20,
    bonusReferralPoints: 50,
    appliesToProductIds: ["amber-noir", "rose-atlas"]
  }
];
