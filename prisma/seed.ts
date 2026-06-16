import { PrismaClient, DiscountType } from "@prisma/client";

const prisma = new PrismaClient();

const collections = [
  { title: "All Products", slug: "all-products-roasted-snacks", description: "Browse our complete range of roasted snacks", sortOrder: 0 },
  { title: "Millet Namkeen", slug: "millet-namkeen", description: "Healthy millet-based namkeen", sortOrder: 1 },
  { title: "Roasted Namkeen", slug: "roasted-namkeen", description: "Palm oil free healthy namkeen", sortOrder: 2 },
  { title: "Quinoa Snacks", slug: "quinoa-snacks", description: "Protein-rich quinoa snacks", sortOrder: 3 },
  { title: "Healthy Sweets", slug: "healthy-sweets", description: "No added sugar mithai", sortOrder: 4 },
  { title: "Best Seller", slug: "best-seller", description: "Our most loved products", sortOrder: 5 },
  { title: "Snack Gift Hampers", slug: "snack-gift-hampers", description: "Perfect gifting options", sortOrder: 6 },
  { title: "Assorted Packs", slug: "assorted-packs", description: "Combo packs and assortments", sortOrder: 7 },
  { title: "Roasted Nuts and Seeds", slug: "roasted-nuts-seeds", description: "Premium roasted nuts", sortOrder: 8 },
  { title: "Millet Flakes", slug: "millet-flakes", description: "Gluten-free millet flakes", sortOrder: 9 },
  { title: "Ready To Eat", slug: "ready-to-eat", description: "Convenient ready to eat snacks", sortOrder: 10 },
  { title: "Shop All", slug: "all", description: "Shop all products", sortOrder: 11 },
];

const products = [
  { title: "Jowar Mix - Tangy Tomato | Roasted Millet Namkeen | 200g", slug: "jowar-mix-tangy-tomato", price: 14900, collections: ["millet-namkeen", "all-products-roasted-snacks", "best-seller"], featured: true },
  { title: "Multigrain Mix - Sweet & Tangy | Roasted Millet Namkeen | 200g", slug: "multigrain-mix-sweet-tangy", price: 14900, collections: ["millet-namkeen", "all-products-roasted-snacks"], featured: true },
  { title: "5 Grain Mix - Pudina Punch | Roasted Namkeen | 200g", slug: "5-grain-mix-pudina-punch", price: 14900, collections: ["millet-namkeen", "all-products-roasted-snacks"], featured: true },
  { title: "Roasted Millet Namkeen Combo | 4 Flavours | 200g each", slug: "roasted-millet-namkeen-combo", price: 59600, collections: ["assorted-packs", "snack-gift-hampers", "all-products-roasted-snacks"], featured: true },
  { title: "Falahari Mixture with Sendha Namak | Roasted Namkeen | 200g", slug: "falahari-mixture-sendha-namak", price: 19900, collections: ["roasted-namkeen", "all-products-roasted-snacks", "best-seller"] },
  { title: "Khatta Meetha | Gluten Free | Jowar Flakes | 200g", slug: "khatta-meetha-jowar", price: 19900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Roasted Cornflakes Mixture | Palm Oil Free | 200g", slug: "roasted-cornflakes-mixture", price: 19900, collections: ["roasted-namkeen", "all-products-roasted-snacks", "best-seller"] },
  { title: "Chana Jor - Lime & Chilli | Roasted Gluten Free Snack | 200g", slug: "chana-jor-lime-chilli", price: 14900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Roasted Aloo Lachha - Chilli Chatak | Potato Stick | 200g", slug: "roasted-aloo-lachha-chilli", price: 19900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Quinoa & Seeds Roasted Namkeen - Peri Peri | 150g", slug: "quinoa-seeds-peri-peri", price: 19900, collections: ["quinoa-snacks", "all-products-roasted-snacks"], featured: true },
  { title: "Roasted Quinoa Puffs | Plain | 50g", slug: "roasted-quinoa-puffs-plain", price: 9900, collections: ["quinoa-snacks", "all-products-roasted-snacks"] },
  { title: "Roasted Quinoa Puffs | Wasabi | 60g", slug: "roasted-quinoa-puffs-wasabi", price: 9900, collections: ["quinoa-snacks", "all-products-roasted-snacks"] },
  { title: "Millets & Dryfruits Ladoo Coconut | No Added Sugar | 100g", slug: "ladoo-coconut", price: 22900, collections: ["healthy-sweets", "all-products-roasted-snacks"], featured: true },
  { title: "Millets & Dryfruits Ladoo Cocoa | No Added Sugar | 100g", slug: "ladoo-cocoa", price: 22900, collections: ["healthy-sweets", "all-products-roasted-snacks"] },
  { title: "Millets & Dryfruits Ladoo Elaichi | No Added Sugar | 100g", slug: "ladoo-elaichi", price: 22900, collections: ["healthy-sweets", "all-products-roasted-snacks"] },
  { title: "Assorted Combo of Millets & Dryfruits Ladoo | Pack of 3", slug: "ladoo-assorted-combo", price: 68700, collections: ["healthy-sweets", "assorted-packs", "snack-gift-hampers"] },
  { title: "Assorted Combo Millet & Quinoa Bites | Pack of 3", slug: "millet-quinoa-bites-combo", price: 65400, collections: ["healthy-sweets", "assorted-packs"], soldOut: true },
  { title: "Roasted Soy Nuts - Lemonee Lime | 150g", slug: "roasted-soy-nuts-lime", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Soy Nuts - Hot Wasabi | 150g", slug: "roasted-soy-nuts-wasabi", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Peanuts - Peri Peri | 150g", slug: "roasted-peanuts-peri-peri", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Cashews - Peri Peri Flavour | 150g", slug: "roasted-cashews-peri-peri", price: 35000, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Cashews - Salted | 150g", slug: "roasted-cashews-salted", price: 35000, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Trail Mix - Nuts and Seeds - Plain | 150g", slug: "roasted-trail-mix", price: 29900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Jowar Flakes | Gluten-Free | Plain | 500g", slug: "roasted-jowar-flakes", price: 25000, collections: ["millet-flakes", "all-products-roasted-snacks"] },
  { title: "Roasted Bajra Flakes | Gluten-Free | Plain | 500g", slug: "roasted-bajra-flakes", price: 25000, collections: ["millet-flakes", "all-products-roasted-snacks"] },
  { title: "Chana Cracker - Heeng Jeera | Gluten Free | 200g", slug: "chana-cracker-heeng-jeera", price: 14900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Chana Cracker - Pudina Chutney | Gluten Free | 200g", slug: "chana-cracker-pudina", price: 14900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Roasted Aloo Lachha - Mint | Potato Sticks | 200g", slug: "roasted-aloo-lachha-mint", price: 19900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Roasted Sweet & Sour Mixture | Pudina | 200g", slug: "roasted-sweet-sour-pudina", price: 14900, collections: ["roasted-namkeen", "all-products-roasted-snacks"] },
  { title: "Roasted Sunflower Seeds - Plain | 125g", slug: "roasted-sunflower-seeds", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Flax Seeds - Plain | 150g", slug: "roasted-flax-seeds", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Peanuts - Cheese | 150g", slug: "roasted-peanuts-cheese", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Peanuts - Sizzling Jalapeno | 150g", slug: "roasted-peanuts-jalapeno", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Soy Nuts - Minty Mania | 150g", slug: "roasted-soy-nuts-mint", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Peanuts - Hot Wasabi | 150g", slug: "roasted-peanuts-wasabi", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
  { title: "Roasted Peanuts - Olive & Herbs | 150g", slug: "roasted-peanuts-olive-herbs", price: 14900, collections: ["roasted-nuts-seeds", "all-products-roasted-snacks"] },
];

const testimonials = [
  { author: "Sayyed", body: "Your products Multigrain Sweet and Tangy are very Good and Tasty. Enjoyed every bite!", sortOrder: 0 },
  { author: "Mahesh Behl", body: "We found your Crunchy Munchy 100% Roasted Wholemillet Snack very tasty. A product of Jaipur India we're proud of!", sortOrder: 1 },
  { author: "Nandkumar Manjrekar", body: "Our whole family and group of tourists found it to be very very tasty. Once somebody eats your products, they become permanent customers.", sortOrder: 2 },
  { author: "Vidhi Bala", body: "This gives homely feeling in Dubai. Really nice product.", sortOrder: 3 },
  { author: "Sreegatha Arun", body: "Just had the mentioned namkeen. It's really Roasty and yummy. Please always keep quality as well as this.", sortOrder: 4 },
  { author: "Avinash Shethji", body: "Recently I could get opportunity to taste your product. It is delicious, tasty and delighted by enjoying it.", sortOrder: 5 },
];

const announcements = [
  { text: "Use code WELCOME & get 5% off on your First Order!", link: "/collections/all", sortOrder: 0 },
  { text: "Free Shipping on all Gifting Orders", link: "/corporate-gifting", sortOrder: 1 },
  { text: "Free Shipping on all Pre-paid orders above Rs. 3499", link: "/collections/all", sortOrder: 2 },
];

async function main() {
  console.log("Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productCollection.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.discountCode.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  for (const c of collections) {
    await prisma.collection.create({ data: c });
  }

  const collectionMap = Object.fromEntries(
    (await prisma.collection.findMany()).map((c) => [c.slug, c.id])
  );

  for (const p of products) {
    const { collections: colSlugs, soldOut, ...productData } = p;
    const product = await prisma.product.create({
      data: {
        ...productData,
        description: `Delicious roasted snack made with nourishing superfoods. Palm oil free, cholesterol free.`,
        images: [`/products/placeholder.svg`],
        tags: ["roasted", "healthy", "millet"],
        variants: {
          create: {
            title: "Default Title",
            inventory: soldOut ? 0 : 100,
            soldOut: soldOut ?? false,
          },
        },
      },
    });

    const allSlugs = [...new Set([...(colSlugs ?? []), "all"])];
    for (const slug of allSlugs) {
      const collectionId = collectionMap[slug];
      if (collectionId) {
        await prisma.productCollection.create({
          data: { productId: product.id, collectionId },
        });
      }
    }
  }

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  for (const a of announcements) {
    await prisma.announcement.create({ data: a });
  }

  await prisma.discountCode.create({
    data: {
      code: "WELCOME",
      type: DiscountType.PERCENT,
      value: 5,
      minOrder: 0,
      firstOrderOnly: true,
      active: true,
    },
  });

  const sampleProducts = await prisma.product.findMany({ take: 8 });
  const reviewData = [
    { author: "Sudheer Kakaria", rating: 5, body: "Good taste and quality" },
    { author: "Rakhi Gulati", rating: 5, body: "Very tasty and healthy snack" },
    { author: "Husain", rating: 5, body: "Ingredients are cleaner than legacy brands" },
    { author: "Sandeep", rating: 5, body: "Very tasty without fat and cholesterol" },
    { author: "Girishbhai P.", rating: 5, body: "Great products, corn flakes mixture" },
    { author: "Ramesh M.", rating: 5, body: "Good and tasty!" },
    { author: "Ashok B.", rating: 5, body: "Very good product, I am happy" },
    { author: "John D.", rating: 5, body: "A snack for each day of the week" },
  ];

  for (let i = 0; i < reviewData.length; i++) {
    await prisma.review.create({
      data: {
        ...reviewData[i],
        productId: sampleProducts[i % sampleProducts.length].id,
      },
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
