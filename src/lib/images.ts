export const PLACEHOLDER_IMAGE = "/products/placeholder.svg";

const CDN = "https://cdn.shopify.com/s/files/1/0562/6920/9750";

export const PRODUCT_IMAGES: Record<string, string> = {
  "jowar-mix-tangy-tomato": `${CDN}/files/Jowar_front_200.jpg?v=1745041592`,
  "multigrain-mix-sweet-tangy": `${CDN}/files/Multigrain_01_9ab82265-ab66-4b2e-a5eb-a6db187877e4.jpg?v=1745043863`,
  "5-grain-mix-pudina-punch": `${CDN}/files/5_grain_front_200g.jpg?v=1744980414`,
  "roasted-millet-namkeen-combo": `${CDN}/files/ComboFop.jpg?v=1745235188`,
  "falahari-mixture-sendha-namak": `${CDN}/files/FALAHARI_MIX_01.jpg?v=1745061724`,
  "khatta-meetha-jowar": `${CDN}/files/khatta_mitha_01.jpg?v=1745223604`,
  "roasted-cornflakes-mixture": `${CDN}/files/corn_front.jpg?v=1745055958`,
  "chana-jor-lime-chilli": `${CDN}/files/chana_jor_front.jpg?v=1745045604`,
  "roasted-aloo-lachha-chilli": `${CDN}/files/chilli_front.jpg?v=1745065096`,
  "quinoa-seeds-peri-peri": `${CDN}/files/Q.jpg?v=1745396577`,
  "roasted-quinoa-puffs-plain": `${CDN}/files/1_Quinoa_Puff_Plain_Front.png?v=1745311136`,
  "roasted-quinoa-puffs-wasabi": `${CDN}/files/WhatsApp_Image_2025-04-23_at_16.04.14.jpg?v=1745404535`,
  "ladoo-coconut": `${CDN}/files/COCONU_3_be95fe46-4e8d-42a3-a46a-7d029b537682.jpg?v=1745238743`,
  "ladoo-cocoa": `${CDN}/files/COCOA0_4.jpg?v=1745238612`,
  "ladoo-elaichi": `${CDN}/files/ELAICH_3.jpg?v=1745238921`,
  "ladoo-assorted-combo": `${CDN}/files/ASSORT_1.jpg?v=1724848912`,
  "millet-quinoa-bites-combo": `${CDN}/files/ASSORTEDCHIKKI01.jpg?v=1724219521`,
  "roasted-soy-nuts-lime": `${CDN}/products/SoynutsLemoneeLime_Front.jpg?v=1630325431`,
  "roasted-soy-nuts-wasabi": `${CDN}/products/SoynutsHotWasabi_Front.jpg?v=1630325317`,
  "roasted-soy-nuts-mint": `${CDN}/products/SoynutsMintyMania_Front.jpg?v=1630326101`,
  "roasted-peanuts-peri-peri": `${CDN}/files/1_Flavoured_Peanuts_Peri_Peri_150gm.png?v=1745305648`,
  "roasted-cashews-peri-peri": `${CDN}/files/Creative_1_d4085795-afc5-4f75-bb0d-6f4dbf5e59d8.jpg?v=1724843373`,
  "roasted-cashews-salted": `${CDN}/files/Creative_1_b945cd47-c57c-4eaf-9b2a-5688af105cea.jpg?v=1724827832`,
  "roasted-trail-mix": `${CDN}/products/TrailMix_Front.jpg?v=1630401557`,
  "roasted-jowar-flakes": `${CDN}/files/creative-2-66c575b7a6b87.webp?v=1724216879`,
  "roasted-bajra-flakes": `${CDN}/files/Creative_7_27ebe4a8-cf79-4d89-8865-86b410873473.jpg?v=1724835446`,
  "chana-cracker-heeng-jeera": `${CDN}/files/chana_front.jpg?v=1745044947`,
  "chana-cracker-pudina": `${CDN}/files/chana_pudina.jpg?v=1745045145`,
  "roasted-aloo-lachha-mint": `${CDN}/files/mint_front.jpg?v=1745065331`,
  "roasted-sweet-sour-pudina": `${CDN}/files/sns_fron.jpg?v=1745066081`,
  "roasted-sunflower-seeds": `${CDN}/products/1SunflowerSeeds_Plain_150gm_Front.png?v=1619795849`,
  "roasted-flax-seeds": `${CDN}/products/1Flaxseeds_Plain_150gm_Front.png?v=1619793943`,
  "roasted-peanuts-cheese": `${CDN}/files/1_Flavoured_Peanuts_Cheese_Front.png?v=1745303455`,
  "roasted-peanuts-jalapeno": `${CDN}/files/Copy_of_1_Flavoured_Peanuts_Jalapeno_Front.png?v=1745305871`,
  "roasted-peanuts-wasabi": `${CDN}/files/Copy_of_1_Flavoured_Peanuts_Peanuts_Wasabi_Front.png?v=1745303768`,
  "roasted-peanuts-olive-herbs": `${CDN}/files/1_Flavoured_Peanuts_Peanuts_Olive_Herbs_Front.png?v=1745305429`,
};

export const SITE_IMAGES = {
  heroBanner: "/images/hero-banner.jpg",
  heroProduct: "/images/hero-product.jpg",
  certFssai: "/images/cert-fssai.jpg",
  certIso: "/images/cert-iso.png",
} as const;

export function resolveProductImage(slug: string, images: string[] = []): string {
  const primary = images[0];
  if (primary && primary !== PLACEHOLDER_IMAGE) return primary;
  return PRODUCT_IMAGES[slug] ?? PLACEHOLDER_IMAGE;
}
