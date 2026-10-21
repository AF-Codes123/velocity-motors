export const cars = [
  {
    id: 1,
    name: "Toyota Corolla Altis",
    year: 2023,
    price: 6250000,
    category: "Sedan",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "BEST SELLER",
    image: "/cars/corolla.jfif",
    description:
      "A refined sedan with everyday comfort, elegant styling and a smooth driving experience.",
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class",
    year: 2022,
    price: 14500000,
    category: "Luxury",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "LUXURY PICK",
    image: "/cars/mercedes.jfif",
    description:
      "A premium driving experience combining sophisticated design, comfort and performance.",
  },
  {
    id: 3,
    name: "BMW Sports Series",
    year: 2023,
    price: 17800000,
    category: "Sports",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "PERFORMANCE",
    image: "/cars/bmw.jfif",
    description:
      "Sporty character, dynamic road presence and a driver-focused interior.",
  },
  {
    id: 4,
    name: "Porsche 911",
    year: 2022,
    price: 32500000,
    category: "Sports",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "ICONIC DESIGN",
    image: "/cars/porsche.jfif",
    description:
      "An iconic sports car silhouette with a focus on exhilarating performance.",
  },
  {
    id: 5,
    name: "Range Rover Sport",
    year: 2023,
    price: 28500000,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "COMMANDING",
    image: "/cars/rangerover.jfif",
    description:
      "A bold SUV combining road presence, versatility and premium comfort.",
  },
  {
    id: 6,
    name: "Audi R8",
    year: 2021,
    price: 39000000,
    category: "Sports",
    transmission: "Automatic",
    fuel: "Petrol",
    tag: "RARE FIND",
    image: "/cars/audi.jfif",
    description:
      "An unmistakable sports car for drivers who appreciate distinctive styling.",
  },
];

export const categories = ["All", "Sedan", "Luxury", "SUV", "Sports"];

export const formatPrice = (price) =>
  `PKR ${(price / 100000).toLocaleString("en-PK", { maximumFractionDigits: 2 })} Lac`;

export const phone = "923321514444"; // showroom WhatsApp number
export const wa = (m) => `https://wa.me/${phone}?text=${encodeURIComponent(m)}`;

