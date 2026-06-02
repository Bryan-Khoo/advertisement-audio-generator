interface Brand {
  id: number;
  brandName: string;
  description: string;
  products: string[];
  voice: string;
}

const brands: Brand[] = [
  {
    id: 1,
    brandName: "Bear Necessities Coffee & Bar",
    description:
      "Discover Bear Necessities Coffee & Bar at 9609 W 87th St, your local haven for high-quality coffee and craft beverages. This warm and welcoming community hub caters to young professionals, students, and coffee enthusiasts who appreciate an inviting atmosphere and artisanal drinks. What sets us apart is our expertly crafted beverage menu featuring affordable, unique options like house-made seasonal syrups and a dual-purpose space that transitions seamlessly from a cozy coffee shop by day to a vibrant bar by night. Our commitment to local partnerships and a community-oriented business model fosters a sense of belonging among our patrons. At Bear Necessities, we don't just serve drinks; we create a community.",
    products: [
      "Drip coffee",
      "Espresso-based drinks",
      "Chai tea latte",
      "Baked goods",
      "Breakfast Burritos",
    ],
    voice: "Warm, friendly, casual, clear",
  },
  {
    id: 2,
    brandName: "Ragazza Food & Wine",
    description:
      "Discover Ragazza Food & Wine, a charming Italian restaurant and wine bar located at 4301 Main Street in Kansas City, MO. Since 2013, we've been serving our community with authentic Southern Italian cuisine inspired by cherished family recipes, including our renowned Meatball Grande and delectable pasta dishes. Our extensive wine selection, featuring house-made limoncello and curated Italian wines, complements our cozy atmosphere, perfect for intimate dinners or lively brunches with friends. Catering to local professionals and couples aged 30-55, we pride ourselves on warm, personalized service that makes every guest feel like family. At Ragazza, we're not just about food; we're about creating memorable dining experiences rooted in community and tradition.",
    products: [
      "Braised beef or lamb shanks",
      "Crème brûlée",
      "Pasta",
      "House-made limoncello",
      "Curated Italian wines",
    ],
    voice: "Warm, authentic, casual, welcoming, clear",
  },
  {
    id: 3,
    brandName: "Bamboo Penny's",
    description:
      "Discover Bamboo Penny's, a culinary oasis located at 5270 W 116th Pl in Leawood, Kansas. Led by the talented Chef Penny Mufuka, we blend traditional Thai cooking with modern craft, offering a menu that bursts with vibrant flavors and aromatic herbs. Our establishment caters to affluent, educated diners who appreciate elevated dining experiences, making every meal a special occasion. With a tropical atmosphere and a rooftop bar, we provide not just food, but a full sensory escape. Join us for an unforgettable dining journey where community and culture meet culinary excellence.",
    products: [
      "Pad Thai",
      "Fried Rice",
      "Green Curry",
      "Mango Sticky Rice",
      "Tropical Cocktails",
    ],
    voice: "Warm, vibrant, authentic, polished",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("brand-select") as HTMLSelectElement;
  const details = document.getElementById("brand-details") as HTMLDivElement;
  const brandName = document.getElementById("brand-name") as HTMLHeadingElement;
  const brandDescription = document.getElementById("brand-description") as HTMLParagraphElement;
  const brandProducts = document.getElementById("brand-products") as HTMLUListElement;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  const audioResult = document.getElementById("audio-result") as HTMLDivElement;
  const adAudio = document.getElementById("ad-audio") as HTMLAudioElement;
  const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = String(brand.id);
    option.textContent = brand.brandName;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selectedId = Number(select.value);
    const brand = brands.find((b) => b.id === selectedId);

    audioResult.style.display = "none";
    errorMessage.style.display = "none";

    if (!brand) {
      details.style.display = "none";
      return;
    }

    brandName.textContent = brand.brandName;
    brandDescription.textContent = brand.description;
    brandProducts.innerHTML = "";
    brand.products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      brandProducts.appendChild(li);
    });

    details.style.display = "block";
  });

  submitBtn.addEventListener("click", async () => {
    const selectedId = Number(select.value);
    const brand = brands.find((b) => b.id === selectedId);
    if (!brand) {
      alert("Please select a brand before submitting.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Generating...";
    audioResult.style.display = "none";
    errorMessage.style.display = "none";

    try {
      const response = await fetch(`/api/generate-ad/${brand.id}`, { method: "POST" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail ?? "Failed to generate advertisement");
      }
      const blob = await response.blob();
      adAudio.src = URL.createObjectURL(blob);
      audioResult.style.display = "block";
    } catch (err: any) {
      errorMessage.textContent = err.message;
      errorMessage.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
});
