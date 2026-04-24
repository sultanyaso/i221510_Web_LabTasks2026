export const recipesData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    prepTime: 20,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    description: "A classic Roman pasta dish made with eggs, hard cheese, cured pork, and black pepper. Rich, creamy, and utterly satisfying.",
    rating: 4.6,
    vegetarian: false,
    vegan: false,
    ingredients: [
      "200g spaghetti",
      "100g pancetta or guanciale",
      "2 large eggs + 2 yolks",
      "50g pecorino romano, grated",
      "50g parmesan, grated",
      "Freshly cracked black pepper",
      "Salt for pasta water"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook spaghetti until al dente.",
      "While pasta cooks, fry pancetta in a large skillet over medium heat until crispy. Remove from heat.",
      "Whisk together eggs, yolks, and grated cheeses in a bowl. Season generously with black pepper.",
      "Reserve 1 cup of pasta cooking water before draining.",
      "Add hot drained pasta to the skillet with pancetta. Toss to coat in the fat.",
      "Remove from heat and pour egg-cheese mixture over pasta, tossing vigorously.",
      "Add splashes of pasta water to loosen into a silky sauce. Serve immediately."
    ],
    reviews: [
      { id: 1, user: "HomeChef", comment: "So authentic! My family loved it.", rating: 5 },
      { id: 2, user: "Foodie99", comment: "Creamy and delicious. Perfect technique.", rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    prepTime: 45,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    description: "Tender chicken in a rich, spiced tomato-cream sauce. One of the world's most beloved curries, bold in flavor and deeply warming.",
    rating: 4.8,
    vegetarian: false,
    vegan: false,
    ingredients: [
      "500g boneless chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tsp garam masala",
      "2 tsp cumin",
      "1 tsp turmeric",
      "1 tsp chili powder",
      "400g crushed tomatoes",
      "1 cup heavy cream",
      "1 large onion, finely diced",
      "4 garlic cloves, minced",
      "1 tbsp fresh ginger, grated",
      "2 tbsp butter"
    ],
    instructions: [
      "Marinate chicken in yogurt, half the spices, salt, and lemon juice for at least 2 hours.",
      "Grill or broil marinated chicken until slightly charred. Set aside.",
      "Melt butter in a large pot. Sauté onion until golden, then add garlic and ginger.",
      "Add remaining spices and cook 1 minute until fragrant.",
      "Pour in crushed tomatoes and simmer 15 minutes.",
      "Blend the sauce until smooth, then return to pan.",
      "Stir in cream and grilled chicken. Simmer 10 minutes. Garnish with cilantro."
    ],
    reviews: [
      { id: 1, user: "SpiceQueen", comment: "Restaurant quality at home!", rating: 5 },
      { id: 2, user: "CurryLover", comment: "The charring on the chicken makes it.", rating: 4.5 },
      { id: 3, user: "MumbaiFoodie", comment: "Authentic and aromatic. Will make again.", rating: 5 }
    ]
  },
  {
    id: 3,
    name: "Avocado Toast with Poached Egg",
    cuisine: "American",
    prepTime: 10,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    description: "The iconic brunch staple. Creamy avocado on toasted sourdough topped with a perfectly runny poached egg and chili flakes.",
    rating: 4.2,
    vegetarian: true,
    vegan: false,
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 large eggs",
      "1 tbsp white vinegar",
      "Juice of half a lemon",
      "Red chili flakes",
      "Sea salt and black pepper",
      "Everything bagel seasoning (optional)"
    ],
    instructions: [
      "Toast sourdough until golden and crispy.",
      "Halve avocado, remove pit, and scoop into a bowl.",
      "Mash with lemon juice, salt, and pepper to desired consistency.",
      "Bring a pot of water to a gentle simmer. Add vinegar.",
      "Crack egg into a small cup. Create a gentle whirlpool in the water and slide in the egg.",
      "Poach 3 minutes for a runny yolk. Remove with a slotted spoon.",
      "Spread avocado on toast, top with poached egg, chili flakes, and seasoning."
    ],
    reviews: [
      { id: 1, user: "BrunchKing", comment: "Simple perfection every time.", rating: 4 },
      { id: 2, user: "HealthyEater", comment: "My go-to weekday breakfast.", rating: 4.5 }
    ]
  },
  {
    id: 4,
    name: "Beef Tacos",
    cuisine: "Mexican",
    prepTime: 25,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    description: "Street-style tacos with seasoned ground beef, fresh pico de gallo, crema, and cotija cheese. Fun, fast, and crowd-pleasing.",
    rating: 4.5,
    vegetarian: false,
    vegan: false,
    ingredients: [
      "500g ground beef",
      "8 small corn tortillas",
      "1 tsp cumin",
      "1 tsp smoked paprika",
      "1 tsp oregano",
      "2 tomatoes, diced",
      "1 small red onion, diced",
      "Fresh cilantro, chopped",
      "Juice of 2 limes",
      "Sour cream or Mexican crema",
      "Cotija cheese, crumbled",
      "Hot sauce to taste"
    ],
    instructions: [
      "Brown ground beef in a skillet over high heat, breaking it up.",
      "Add cumin, paprika, oregano, salt, and a splash of water. Cook 2 minutes.",
      "Mix tomatoes, onion, cilantro, and lime juice for fresh pico de gallo.",
      "Warm tortillas on a dry skillet or open flame.",
      "Double up tortillas and fill with beef.",
      "Top with pico, crema, cotija, and hot sauce.",
      "Squeeze fresh lime over everything before eating."
    ],
    reviews: [
      { id: 1, user: "TacoTuesday", comment: "Better than my local taqueria!", rating: 5 },
      { id: 2, user: "MexicanFood Fan", comment: "The double tortilla trick is key.", rating: 4 }
    ]
  },
  {
    id: 5,
    name: "Mushroom Risotto",
    cuisine: "Italian",
    prepTime: 40,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    description: "Luxuriously creamy Arborio rice with wild mushrooms, white wine, and parmesan. Pure comfort food that rewards patience.",
    rating: 4.7,
    vegetarian: true,
    vegan: false,
    ingredients: [
      "300g Arborio rice",
      "400g mixed mushrooms (porcini, cremini, shiitake)",
      "1L warm vegetable stock",
      "150ml dry white wine",
      "1 large shallot, minced",
      "3 garlic cloves, minced",
      "60g parmesan, grated",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "Fresh thyme",
      "Salt and white pepper"
    ],
    instructions: [
      "Warm stock in a separate pot. Keep it simmering throughout.",
      "Sauté mushrooms in olive oil until golden. Season and set aside.",
      "In the same pan, cook shallot in butter until translucent. Add garlic.",
      "Add Arborio rice and toast 2 minutes, stirring constantly.",
      "Pour in white wine and stir until absorbed.",
      "Add warm stock one ladle at a time, stirring and waiting for each to absorb.",
      "After 18-20 minutes, fold in mushrooms, parmesan, and butter. Rest 2 minutes before serving."
    ],
    reviews: [
      { id: 1, user: "ItalianNonna", comment: "Almost as good as my grandmother's!", rating: 4.5 },
      { id: 2, user: "RisottoRookie", comment: "Takes patience but absolutely worth it.", rating: 5 },
      { id: 3, user: "VeggieChef", comment: "My favorite meatless dinner.", rating: 4.5 }
    ]
  },
  {
    id: 6,
    name: "Pad Thai",
    cuisine: "Thai",
    prepTime: 30,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop",
    description: "Thailand's beloved stir-fried noodle dish with tangy tamarind sauce, tofu or shrimp, crunchy peanuts, and fresh bean sprouts.",
    rating: 4.4,
    vegetarian: false,
    vegan: false,
    ingredients: [
      "200g flat rice noodles",
      "200g shrimp or firm tofu",
      "3 tbsp tamarind paste",
      "2 tbsp fish sauce",
      "1 tbsp palm sugar or brown sugar",
      "2 eggs",
      "100g bean sprouts",
      "3 green onions, sliced",
      "3 tbsp roasted peanuts, crushed",
      "2 garlic cloves, minced",
      "Lime wedges to serve",
      "Chili flakes"
    ],
    instructions: [
      "Soak rice noodles in warm water 20 minutes until pliable. Drain.",
      "Mix tamarind, fish sauce, and sugar into a sauce. Taste and adjust.",
      "Heat wok over highest heat. Stir-fry shrimp or tofu until cooked. Push to side.",
      "Add garlic and noodles, toss to coat with oil.",
      "Pour sauce over noodles and toss quickly.",
      "Push noodles aside, scramble eggs in the pan, then toss everything together.",
      "Add bean sprouts and green onions. Serve with peanuts, lime, and chili."
    ],
    reviews: [
      { id: 1, user: "BangkokBob", comment: "Tamarind is the secret ingredient!", rating: 4.5 },
      { id: 2, user: "NoodleNerd", comment: "Tastes like street food. Love it.", rating: 4 }
    ]
  }
];
