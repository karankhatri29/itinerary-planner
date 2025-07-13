# 🧳 Smart Itinerary Planner

A full-stack **Itinerary Planner** application that helps travelers plan personalized and budget-optimized travel experiences. Users simply enter their travel details and preferences, and the system intelligently generates a complete itinerary—including attractions, activities, and estimated costs—tailored to their inputs.

---

## 🚀 Features

- 🌍 Personalized travel itinerary generator
- 💸 Budget-conscious activity suggestions
- 🧠 Smart filtering based on preferences (e.g., Adventure, Food, Relaxation)
- 📅 Day-wise plan generation
- 📊 Cost estimation for accommodation, travel, and experiences
- 📂 JSON-based data storage for locations and activities
- 🔄 Easy to deploy, simple to customize

---


## 🧑‍💻 Tech Stack

| Layer       | Technology     |
|-------------|----------------|
| Frontend    | React.js       |
| Backend     | Node.js, Express |
| Database    | JSON (for now) |
| Styling     | Tailwind CSS / Bootstrap |
| Deployment  | (Optional: Vercel, Netlify, or Render) |

---

## 🧠 How It Works

1. **User Input:**
   - Travel dates
   - Budget
   - Number of people
   - Location
   - Preferences (Adventure, Luxury, Cultural, etc.)

2. **Backend Processing:**
   - Parses data from JSON datasets
   - Filters activities based on selected preferences
   - Organizes activities by day, optimizing time and budget
   - Calculates estimated total costs (travel, stay, activities)

3. **Frontend Display:**
   - Interactive UI displays the complete plan
   - Each day includes activity timing, costs, and descriptions
   - Option to regenerate or export the plan

---

## 📊 Sample User Flow

1. Select location → "Jaipur"
2. Choose preferences → ["Heritage", "Food"]
3. Set budget → ₹20,000 for 2 people over 3 days
4. Get itinerary:
   - Day 1: City Palace, Hawa Mahal + Lunch at LMB
   - Day 2: Amber Fort, Jaigarh + Rajasthani Thali
   - Day 3: Johari Bazaar shopping + Local snacks
   - Estimated Cost: ₹18,300

---

