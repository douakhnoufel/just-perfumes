import type { Product, Promotion } from "@/lib/types";

export const sampleProducts: Product[] = [
  {
    id: "amber-noir",
    name: "Amber Noir",
    collection: "Night Veil",
    description: "Warm amber, vanilla resin, and smoked cedar.",
    imageUrl:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80",
    price: 88,
    finalPrice: 88,
    stock: 18
  },
  {
    id: "citrine-veil",
    name: "Citrine Veil",
    collection: "Sun Ritual",
    description: "Bergamot, neroli, and luminous white musk.",
    imageUrl:
      "https://images.unsplash.com/photo-1615634262417-8f9d0d18cbfd?auto=format&fit=crop&w=1000&q=80",
    price: 74,
    finalPrice: 74,
    stock: 21
  },
  {
    id: "rose-atlas",
    name: "Rose Atlas",
    collection: "Velvet Bloom",
    description: "Rose absolute, pink pepper, and suede.",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
    price: 96,
    finalPrice: 96,
    stock: 12
  },
  {
    id: "oud-river",
    name: "Oud River",
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
