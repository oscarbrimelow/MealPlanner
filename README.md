# Meal Planner Website

A modern meal planning website with recipe display, shopping list functionality, and Instagram Reels integration.

## Features

- 📋 **Recipe Display**: View recipes with ingredients, instructions, and storage/reheating info
- 🔢 **Quantity Calculator**: Adjust serving sizes and see quantities update automatically
- 💰 **Pricing**: See recipe costs with dynamic price calculations
- 📱 **Shopping List**: Add recipes to a shopping list with grouped ingredients
- 📸 **Instagram Integration**: View recipe videos directly in the app
- 🖨️ **Print Recipes**: Print-friendly recipe pages
- 📱 **Mobile Friendly**: Responsive design for all devices
- 🔗 **Clean URLs**: No .html extensions in URLs

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment to GitHub Pages

There are two ways to deploy to GitHub Pages:

### Option 1: GitHub Actions (Recommended - Automatic)

This method automatically deploys whenever you push to the `main` branch.

**First Time Setup:**

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Click **Save**

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push
   ```

3. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy your site
   - Check the **Actions** tab to see the deployment progress
   - Your site will be available at: `https://oscarbrimelow.github.io/MealPlanner/`

**Subsequent Deployments:**
Just push to `main` - deployments happen automatically!

```bash
git add .
git commit -m "Your changes"
git push
```

### Option 2: Manual Deployment (Using gh-pages)

This method creates a `gh-pages` branch with your built site.

**First Time Setup:**

1. **Install dependencies** (including gh-pages):
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

Your site will be live at: `https://oscarbrimelow.github.io/MealPlanner/`

**Subsequent Deployments:**
After making changes:

```bash
npm run deploy
```

### If You Want to Deploy from Root (Custom Domain)

If you're using a custom domain or want to deploy from the repository root:

1. Update `vite.config.js`:
   ```js
   base: '/',
   ```

2. Deploy:
   - **GitHub Actions:** Just push to main
   - **Manual:** Run `npm run deploy`

## Project Structure

```
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   ├── data/            # Recipe data
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── scripts/             # Build scripts
├── dist/                # Production build (generated)
└── package.json         # Dependencies and scripts
```

## Adding New Recipes

Edit `src/data/recipes.js` to add new recipes. Each recipe needs:

- `id`: Unique identifier (used in URL)
- `name`: Recipe name
- `day`: Day of the week
- `servings`: Base number of servings
- `calories`: Calories per serving
- `ingredients`: Array of ingredients with quantities and prices
- `instructions`: Array of step-by-step instructions
- `storage`: Storage instructions (freezer, fridge, shelfLife)
- `reheating`: Array of reheating methods
- `instagramUrl`: (Optional) Instagram Reels URL

## Technologies Used

- React 18
- React Router 6
- Vite
- GitHub Pages

## License

MIT

