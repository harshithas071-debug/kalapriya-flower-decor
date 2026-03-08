require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Image = require("../models/Image");

const SEED_IMAGES = [
  { category: "Reception", caption: "Grand Reception Stage", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" },
  { category: "Reception", caption: "Floral Arch Reception", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" },
  { category: "Reception", caption: "Royal Reception Decor", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { category: "Mantapa", caption: "Elegant Mantapa", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80" },
  { category: "Mantapa", caption: "Traditional Mantapa Setup", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80" },
  { category: "Door Decoration", caption: "Marigold Door Arch", url: "https://images.unsplash.com/photo-1490750967868-88df5691cc1a?w=600&q=80" },
  { category: "Door Decoration", caption: "Rose Door Decoration", url: "https://images.unsplash.com/photo-1444930694458-01babf71abaf?w=600&q=80" },
  { category: "Name Board", caption: "Floral Name Board", url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80" },
  { category: "Ramp Decoration", caption: "Rose Petal Ramp", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80" },
  { category: "Ramp Decoration", caption: "Floral Ramp Walkway", url: "https://images.unsplash.com/photo-1501747315-124a0eaca060?w=600&q=80" },
  { category: "Jade", caption: "Jade Floral Arrangement", url: "https://images.unsplash.com/photo-1445688678-2f91c4a4bfc5?w=600&q=80" },
  { category: "Jade", caption: "Jade Centrepiece", url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80" },
  { category: "Hara", caption: "Traditional Hara", url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80" },
  { category: "Hara", caption: "Jasmine Hara", url: "https://images.unsplash.com/photo-1499063078284-f78f7d89616a?w=600&q=80" },
  { category: "Chapra Decoration", caption: "Chapra with Marigolds", url: "https://images.unsplash.com/photo-1490145454894-2b1a1681aa63?w=600&q=80" },
  { category: "Chapra Decoration", caption: "Grand Chapra Setup", url: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80" },
  { category: "Naming Ceremony", caption: "Naming Ceremony Decor", url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" },
  { category: "Naming Ceremony", caption: "Baby Shower Floral", url: "https://images.unsplash.com/photo-1519011985187-444d62641929?w=600&q=80" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Image.deleteMany({});
  await Image.insertMany(SEED_IMAGES);
  console.log(`✅ Seeded ${SEED_IMAGES.length} images`);
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
