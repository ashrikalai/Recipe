#  Recipe API

A backend-only Node.js application that imports recipe data from a JSON file and exposes a search API using MongoDB. Built with modular architecture for maintainability and scalability.

---

##  Features

- Parses and imports recipes from `recipes.json`
- Stores data in MongoDB
- Search API with filters: **name, calories, rating**
- Modular folder structure with controllers, routes, models, and utilities

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ashrikalai/recipe-api.git
cd recipe-api/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=mongodb://localhost:27017/recipeDB
PORT=3000
```


### 4. Import Recipe Data

```bash
node utils/importData.js
```

This will read `recipes.json`, clean the data, and insert it into MongoDB.

### 5. Start the Server

```bash
node app.js
```

Server will run on [http://localhost:3000](http://localhost:3000)

---

##  API Testing

### Endpoint

```
GET /api/recipes/search
```

### Query Parameters

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| name      | String | Partial match on recipe name          |
| rating    | Number | Minimum rating (e.g. 4.5)             |
| calories  | Number | Maximum calories (e.g. 400)           |

### Sample Request

```bash
GET /api/recipes/search?name=pie&rating=4.5&calories=400
```

### Sample Response

```json
{
  "data": [
    {
      "name": "Sweet Potato Pie",
      "calories": 389,
      "rating": 4.8,
      "prep_time": 20,
      "cook_time": 45,
      "servings": 8,
      "continent": "North America",
      "country": "USA",
      "category": "Dessert",
      "ingredients": ["..."],
      "instructions": ["..."]
    }
  ]
}
```

---

##  Database Schema

**Database**: MongoDB  
**Collection**: `recipes`

### Fields

- `continent`: String  
- `country`: String  
- `country_state`: String  
- `category`: String  
- `name`: String  
- `ingredients`: [String]  
- `instructions`: [String]  
- `prep_time`: Number  
- `cook_time`: Number  
- `servings`: Number  
- `calories`: Number  
- `rating`: Number (optional)

---

##  Folder Structure

```
backend/
├── config/             # DB connection logic
├── controllers/        # Route handlers
├── data/               # JSON dataset
├── models/             # Mongoose schema
├── routes/             # API endpoints
├── utils/              # Import script
├── app.js              # Server entry point
├── .env.example        # Environment config template
├── package.json        # Dependencies
```

---

