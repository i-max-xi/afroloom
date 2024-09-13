// import from "../textures/tie_and_dye/21 tie and dye.jpg";
import AllServices from "../../../../Services/usersService";

import batik2 from "../textures/tie_and_dye/7. bubu.jpg";
import batik3 from "../textures/tie_and_dye/8. tomogyi.jpg";
import batik4 from "../textures/tie_and_dye/9. gye nyame.jpg";
import batik5 from "../textures/tie_and_dye/10 medofo.jpg";

import nailDesign3 from "../textures/nail designs/22.jpg";
import nailDesign4 from "../textures/nail designs/23.jpg";
// import nailDesign13 from "../textures/nail designs/18.jpg";
import nailDesign30 from "../textures/nail designs/edwed.jpg";
import nailDesign31 from "../textures/nail designs/ef.jpg";
import nailDesign37 from "../textures/nail designs/fwef.jpg";
import nailDesign38 from "../textures/nail designs/geg.jpg";
import nailDesign41 from "../textures/nail designs/rege.jpg";

//news
import nailDesign43 from "../textures/nail designs/new/2.jpg";
import nailDesign44 from "../textures/nail designs/new/2ed2d.jpg";
import nailDesign45 from "../textures/nail designs/new/4.jpg";
import nailDesign47 from "../textures/nail designs/new/fwef.jpg";

import waxPrint1 from "../textures/waxPrint/new/1 dade3 mpadua.jpg";
import waxPrint2 from "../textures/waxPrint/new/2. ayeyi wura.jpg";
import waxPrint3 from "../textures/waxPrint/new/3. 8 8.jpg";
import waxPrint4 from "../textures/waxPrint/new/4. A B C.jpg";
import waxPrint5 from "../textures/waxPrint/new/5. Apaawa.jpg";
import waxPrint6 from "../textures/waxPrint/new/6. Sika nto nkwa.jpg";

// disapora
import conti from "../textures/diaspora/conti_LE_auto_x2.jpg";
import katanga from "../textures/diaspora/kat_LE_auto_x2.jpg";
import republic from "../textures/diaspora/repo_LE_auto_x2.jpg";
import queens from "../textures/diaspora/queens_LE_auto_x2.jpg";
import africa from "../textures/diaspora/africa_LE_auto_x2.jpg";

export const colorBasePrice = 35;

export const colorOptions = [
  { color: "#ff0000", label: "Red" },
  { color: "#ffffff", label: "White" },
  { color: "#00ff00", label: "Green" },
  { color: "#ffd700", label: "Gold" },
  { color: "#0000ff", label: "Blue" },
  { color: "#222222", label: "Black" },
  { color: "#666666", label: "Grey" },
  { color: "#444444", label: "Lighter Black" },
  { color: "#ffff00", label: "Yellow" },
  { color: "#87ceeb", label: "Seablue" },
  { color: "#ff7f50", label: "Coral" },
  { color: "#008080", label: "Teal" },
  { color: "#808000", label: "Olive" },
  { color: "#e0b0ff", label: "Mauve" },
  { color: "#c0c0c0", label: "Silver" },
  { color: "#ffa500", label: "Orange" },
  { color: "#800080", label: "Purple" },
  { color: "#ff69b4", label: "Pink" },
  { color: "#a52a2a", label: "Brown" },
  { color: "#808080", label: "Gray" },
  { color: "#00ffff", label: "Cyan" },
  { color: "#ff00ff", label: "Magenta" },
  { color: "#8a2be2", label: "Blue Violet" },
  { color: "#deb887", label: "Burly Wood" },
  { color: "#5f9ea0", label: "Cadet Blue" },
  { color: "#7fff00", label: "Chartreuse" },
  { color: "#d2691e", label: "Chocolate" },
  { color: "#ff7f50", label: "Coral" },
  { color: "#6495ed", label: "Cornflower Blue" },
  { color: "#dc143c", label: "Crimson" },
  { color: "#00ffff", label: "Cyan" },
  { color: "#00008b", label: "Dark Blue" },
  { color: "#008b8b", label: "Dark Cyan" },
  { color: "#b8860b", label: "Dark Golden Rod" },
  { color: "#a9a9a9", label: "Dark Gray" },
  { color: "#006400", label: "Dark Green" },
  { color: "#bdb76b", label: "Dark Khaki" },
  { color: "#8b008b", label: "Dark Magenta" },
  { color: "#556b2f", label: "Dark Olive Green" },
  { color: "#ff8c00", label: "Dark Orange" },
  { color: "#9932cc", label: "Dark Orchid" },
  { color: "#8b0000", label: "Dark Red" },
  { color: "#e9967a", label: "Dark Salmon" },
  { color: "#8fbc8f", label: "Dark Sea Green" },
  { color: "#483d8b", label: "Dark Slate Blue" },
  { color: "#2f4f4f", label: "Dark Slate Gray" },
  { color: "#00ced1", label: "Dark Turquoise" },
  { color: "#9400d3", label: "Dark Violet" },
  { color: "#ff1493", label: "Deep Pink" },
  { color: "#00bfff", label: "Deep Sky Blue" },
  { color: "#696969", label: "Dim Gray" },
  { color: "#1e90ff", label: "Dodger Blue" },
  { color: "#b22222", label: "Fire Brick" },
  { color: "#ff4500", label: "Orange Red" },
];

export const specialNodeNames = [
  "button",
  "buttons",
  "sole",
  "zippers",
  "brass",
  "cuttings",
  // "nails",
  "nailHands",
]; // Add your special node names here

let returnedDecsriptions = [];

const initializeData = async () => {
  try {
    const response = await AllServices.getAllFabrics();
    const allFabrics = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    returnedDecsriptions = allFabrics.reduce((acc, fabric) => {
      const { id, items } = fabric;
      acc[id] = items.map((item) => ({
        textureName: item.textureName || "",
        textureDescription: item.textureDescription || "",
      }));
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch fabrics", error);
  }
};

initializeData();

export const textureArrays = {
  batik: [batik2, batik3, batik4, batik5],

  waxPrint: [waxPrint1, waxPrint2, waxPrint3, waxPrint4, waxPrint5, waxPrint6],
  Diaspora: [conti, katanga, republic, queens, africa],
  nailDesigns: [
    nailDesign3,
    nailDesign4,
    nailDesign30,
    nailDesign31,
    nailDesign37,
    nailDesign38,
    nailDesign41,
    nailDesign43,
    nailDesign44,
    nailDesign45,
    nailDesign47,
  ],
};

export const textureDescriptions = {
  batik: [
    {
      textureName: "Bubu",
      textureDescription: `Step out in style and embrace the vibrant culture of Africa with the stunning bubu fabric! Known
      for its intricate patterns and rich history, bubu fabric is a true representation of African heritage
      and creativity. So why not add a touch of vibrant flair to your wardrobe and inspire others to do
      the same by proudly wearing bubu fabric? Join the movement and let your fashion do the
      talking with bubu!`,
    },

    {
      textureName: "Tomogyi",
      textureDescription: `Wrap yourself in the vibrant colors and rich cultural history of Africa with the eye-catching
      tomogyi fabric. This fabric is not just a piece of cloth- it is a work of art that tells a story about
      the beauty and diversity of the African continent. Embrace the sense of empowerment and
      connection that comes with wearing tomogyi, and celebrate the uniqueness of African heritage
      in style. Let the bold patterns and exquisite craftsmanship of tomogyi be your signature look and
      make a statement wherever you go. Dare to stand out and be proud to wear the African
      fabric, tomogyi.`,
    },

    {
      textureName: "Gye Nyame",
      textureDescription: `Have you heard of the ancient African fabric called Gye Nyame, which means except God.
      Embrace the rich history and cultural significance of this beautiful fabric by incorporating it into
      your wardrobe. Let its powerful message remind you to always put your faith in something
      greater. Wear gye nyame proudly and experience the unique and vibrant energy it
      brings to your style.`,
    },
    {
      textureName: "Medofo",
      textureDescription: `Wrap yourself in a piece of culture and love with the beautifully vibrant African fabric known as medofo,
      which translates to "my love" in English. Embrace the rich history and tradition woven into each thread,
      and proudly make a statement with your unique style. Let medofo be a symbol of appreciation for
      African artistry and a celebration of unity through fashion. So why wait? Let your wardrobe reflect love
      and diversity by wearing medofo today!`,
    },
  ],

  waxPrint: [
    {
      textureName: "DADE3 MPADUA",
      textureDescription: `Experience the vibrancy and elegance of African culture with the stunning dade3 mpadua fabric.
      Embodying the rich heritage and craftsmanship of African textiles, this fabric will make you
      stand out in style. So why not elevate your wardrobe and celebrate the beauty of African
      fashion by wearing dade3 mpadua?`,
    },
    {
      textureName: "Ayeyi Wura",
      textureDescription: `Wear the vibrant Ayeyi Wura fabric and praise the living God with every step you take. This
      African fabric is a symbol of gratitude and celebration, making it perfect for brightening up any
      outfit. Embrace the rich cultural heritage and unique beauty of Ayeyi Wura, and let your style
      speak volumes. Join the movement and showcase the essence of African fashion with this fabric
      that exudes positivity and faith.`,
    },
    {
      textureName: "8 8",
      textureDescription: `Embrace the vibrant and cultural essence of the African fabric known as 8 8, symbolizing the
      interconnectedness of life. Let your style speak volumes as you don this unique and colorful
      fabric, encouraging a celebration of diversity and heritage. Stand out from the crowd and make
      a statement by incorporating this beautiful fabric into your wardrobe today. Experience the
      beauty of Africa and express yourself through the art of fabric. Wear 8 8 and bring a touch of
      culture and tradition into your everyday life.`,
    },
    {
      textureName: "A B C",
      textureDescription: `Wrap yourself in the vibrant colors and rich history of African fabric, known as ‘A B C’. Embrace
      the cultural significance and beauty of this unique textile as you make a statement with your
      wardrobe. Stand out from the crowd and show your appreciation for African craftsmanship by
      incorporating this stunning fabric into your everyday style. Wear the name of fabric is called A B C
      proudly and celebrate the beauty of African culture.`,
    },
    {
      textureName: "APAAWA",
      textureDescription: `Wrap yourself in the vibrant and rich history of African culture with the exquisite APAAWA
      fabric. This iconic textile encapsulates the craftsmanship and artistry of African artisans, telling a
      story of tradition and heritage with every thread. Embrace your individuality and make a bold
      statement by adorning yourself in the stunning patterns and colors of the APAAWA fabric.
      Celebrate diversity and creativity by incorporating this unique fabric into your wardrobe, and let
      your style speak volumes about your appreciation for the beauty of African craftsmanship. Try
      on the APAAWA fabric today and experience the magic of African fashion firsthand.`,
    },
    {
      textureName: "Sika Nto Nkwa",
      textureDescription: `Introducing the vibrant and meaningful African fabric called Sika Nto Nkwa, which translates to
     "money can't buy life". This beautiful fabric not only adds a touch of culture to your wardrobe,
      but also reminds you to cherish the moments that truly matter. So, why not embrace the rich
      heritage and unique design of African fabrics by incorporating Sika Nto Nkwa into your everyday
      style? Stand out from the crowd and wear a piece of tradition with pride!`,
    },
  ],
  diaspora: [
    {
      textureName: "Unity Hall Fabric (Conti)",
      textureDescription: `Established in 1968, Unity Hall, also known as Conti, is one of the largest halls at KNUST and a pillar of leadership, unity, and strength. The first hall master was Dr. J.E. Arkorful. The bold and vibrant Unity Hall fabric reflects these long-standing traditions.`,
      disclaimer:
        "Please note that Afroloom only sources this fabric directly from Unity Hall, and we do not produce it. If the school runs out of stock, we will issue a full refund",
    },
    {
      textureName: "Katanga Hall Fabric (University Hall)",
      textureDescription: `Built in 1963, Katanga Hall, officially known as University Hall, has long been a symbol of bravery, camaraderie, and resilience. The first hall master was Mr. J.B. Furlong, whose legacy still echoes in the hall's bold traditions. Now a mixed hall, Katanga continues to stand tall in KNUST’s history.`,
      disclaimer: "Please note that Afroloom only sources this fabric directly from Katanga Hall, and we do not produce it. If the school runs out of stock, we will issue a full refund",
    },
    {
      textureName: "Republic Hall Fabric",
      textureDescription: `Established in 1961, Republic Hall represents diversity, inclusivity, and academic excellence. Known for fostering a vibrant community, Republic Hall has made a lasting impact on the KNUST campus. The first hall master was Dr. R.P. Baffour, a visionary leader.`,
      disclaimer: "Please note that Afroloom only sources this fabric directly from Republic Hall, and we do not produce it. If the school runs out of stock, we will issue a full refund",
    },
    {
      textureName: "Queen Elizabeth Hall Fabric (Queens)",
      textureDescription: `Built in 1959 and originally an all-female hall, Queen Elizabeth Hall is now a mixed hall known for its legacy of nurturing leadership and academic prowess. The first hall master was Mr. R.C. Rattray, who oversaw the hall’s initial development. The Queen’s Hall fabric captures this proud heritage.`,
      disclaimer: "Please note that Afroloom only sources this fabric directly from Queen Elizabeth Hall, and we do not produce it. If the school runs out of stock, we will issue a full refund",
    },
    {
      textureName: "Africa Hall Fabric",
      textureDescription: `Opened in 1967, Africa Hall, famously known as the Ladies Hall, has been a pillar of female empowerment and academic excellence at KNUST. The first hall master was Mrs. A. Gaisie, who guided the hall in its early days of building a legacy of leadership. The Africa Hall fabric celebrates this tradition of excellence.`,
      disclaimer: "Please note that Afroloom only sources this fabric directly from Africa Hall, and we do not produce it. If the school runs out of stock, we will issue a full refund",
    },
  ],
};

export const textureValues = {
  batik: {
    price: 40,
    yardStart: 1,
  },
  waxPrint: {
    price: 50,
    yardStart: 2,
  },
  Diaspora: {
    price: 120,
    yardStart: 2,
  },
};

export const sizeOptions = [
  { label: "S", value: 0.5 },
  { label: "M", value: 1 },
  { label: "L", value: 2 },
  { label: "XL", value: 3 },
  { label: "2XL", value: 4 },
];

export const europeanShoeSizes = [
  { label: "34", value: 34 },
  { label: "35", value: 35 },
  { label: "36", value: 36 },
  { label: "37", value: 37 },
  { label: "38", value: 38 },
  { label: "39", value: 39 },
  { label: "40", value: 40 },
  { label: "41", value: 41 },
  { label: "42", value: 42 },
  { label: "43", value: 43 },
  { label: "44", value: 44 },
  { label: "45", value: 45 },
  { label: "46", value: 46 },
  { label: "47", value: 47 },
];

export const responsiveColor = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "576px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const displayInplaceFor = [
  "Trousers",
  "Shorts",
  "Summer Shorts",
  "Booty Shorts",
  "Leggings",
  "Long Sleeve Top And Down Kaftan",
  "Earring",
  "Beads Bracelet",
  "Kimono Jacket",
  "Mini Skirt",
  "Long Skirt",
];

export const noSpinFor = [
  "Beads Bracelet",
  "Logo Up, Text Down Sash",
  "Text Up, Logo Down Sash",
  "Contrasting Logo and Text Sash",
  "Text Up, Image Down Sash",
  "One-Sided Logo, Two-Sided Text Sash",
];

export const onlySashes = [
  "Logo Up, Text Down Sash",
  "Text Up, Logo Down Sash",
  "Contrasting Logo and Text Sash",
  "Text Up, Image Down Sash",
  "One-Sided Logo, Two-Sided Text Sash",
];

export const notAll = ["Earring", "Bikini", "Square Nails", "Coffin Nails"];

export const hideNotAllNodes = ["bikini_all", "balls", "bikini_top"];

export const shiny3Ds = ["Beads Bracelet", "Earring"];
