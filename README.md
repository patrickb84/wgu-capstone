# Sous Chef: Meal Planning App

- [Description](#description)
	- [Demo](#demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
	- [User Authentication](#user-authentication)
	- [Managing Meal Plans](#managing-meal-plans)
	- [Searching Recipes](#searching-recipes)
	- [Viewing Recipes](#viewing-recipes)
	- [Pagination](#pagination)
	- [Using Advanced Features](#using-advanced-features)
- [Code Examples](#code-examples)
	- [User Sign In with Firebase, React Firebase Hooks, and React Hook Form](#user-sign-in-with-firebase-react-firebase-hooks-and-react-hook-form)
	- [CRUD Operations in Firestore](#crud-operations-in-firestore)
	- [React Component with Context, Provider, and Hook](#react-component-with-context-provider-and-hook)
	- [Axios Fetch with External API](#axios-fetch-with-external-api)
- [Testing](#testing)
	- [Testing Tools](#testing-tools)
	- [Running Tests](#running-tests)
- [Test Example](#test-example)
- [API Reference](#api-reference)
- [NPM Scripts](#npm-scripts)


## Description

*Sous Chef: Meal Planning App* is a responsive web application developed using React, TypeScript, and Firebase. It uses an external API, *TheMealDB*, as a recipe library. It allows users to create meal plans and schedules, browse recipes, and build a shopping lists of ingredients. Firestore handles database operations and Firebase is used for authentication.

### Demo

You can demo the application here: [https://wgu-capstone-e02b9.web.app/](https://wgu-capstone-e02b9.web.app/).\
Sign in with a **Google account** or with the following:
```
email: 4souschef@wgu-capstone-e02b9.app
password: lordofrecipes
```

## Features

* User registration/authentication (email/password and Google sign-in)
* CRUD operations on meal plans and schedule
* Download a calculate grocery list as JSON, CSV, or PDF
* Uses an external recipe API
* Search by recipe name, category, area, or ingredient
* Responsive and aesthetic UI

## Technology Stack

* **Front-end:** React, TypeScript
* **Styling:** Bootstrap, React-Bootstrap, SASS
* **Testing:** Jest, @testing-library/react
* **Hooks:** React Firebase Hooks, React Hook Form
* **Routing:** React Router
* **Backend:** Firebase (Firestore for database, Firebase Authentication)
* Other Key Libraries:
  * Axios for HTTP requests
  * Date-fns for date manipulation
  * React-Paginate for pagination
  * React-DatePicker for date picking components
  * jsPDF and PapaParse for PDF generation and CSV parsing

## Getting Started

* Clone the repository: `git clone https://github.com/patrickb84/wgu-capstone`
* Install dependencies: `npm install`
* Run the app: `npm start`

***Note:** This project has a required .env file with sensitive keys. It will still run without but won't be able to access external libraries. Message me if you need it.*

## Usage

### User Authentication

- **Sign Up/Login:** Access the registration and authentication directly from the home page or from the navbar. Users can sign in using their email and password, or use the Google sign-in option.
- **Sign Out:** Users can sign out via the account button on the navbar.

### Managing Meal Plans

*Note: Users can navigate to the "How It Wokrs" page for step by step instructions*

- Upon log in, users are asked to create a meal plan. In the form that appears, a name and start and end date are required, while a description is optional.
- When the plan is entered, it's auto-populated with meals from the database (this is for convenience, and can be edited later). The meal plan shows up in the "My Meal Plans" table as "Active". It can now be viewed, edited or deleted.
- In the "My Schedule" page, users can see meals assigned for each day in the plan. Meals can be removed by editing the day. (Meals can be added from the recipes pages).
- In the "Grocery Planner" page, all of the ingredients needed for that "Active Meal Plan" (shown in the "Meal Plan Summary") are displayed and can be checked off or looked up in the "Required Ingredients" table.
- Users can download the Required Ingredients list as a JSON or CSV or PDF.

### Searching Recipes

- Recipes can be searched by clicking the magnifying glass icon in the navbar or by navigating to "Search Recipes".
- In the search box users can search by recipe name, area, category, or ingredient. The searchbox dropdown is populate with results organized by type and ending with a "View Search Results" option.
- Viewing search results views all results that match.
- Clicking on a recipe result navigates directly to a recipe page.
- Clicking on an area/category/ingredient results shows all results related to that item.
- The search page also contains links for each area and each category. Below those, there is a section of random recipes that re-populates when the page is refreshed.

### Viewing Recipes

- Each recipe card contains a name, a picture, an "Area" tag saying what area it's from, a "Category" tag, and a calendar button.
- The calendar button allows users to select a date for which to add the recipe and updates their active meal plan.
- Users can view the recipe details (ingredients, instructions, source) by clicking on the recipe image.
- Users can also add the recipe to their meal plan from the recipe details page by clicking "Add to meal plan".

### Pagination

For every results page, pagination controls at the bottom allow you to navigate through different pages of recipes.

### Using Advanced Features

The "Grocery Planner" section of the dashboard allows users to see and plan for all the required ingredients in their meal plan. This shopping list can be downloaded as PDF, CSV, or JSON if desired.

## Code Examples

This section provides insight into some of the core functionalities, showing how key operations are executed.

### User Sign In with Firebase, React Firebase Hooks, and React Hook Form

```ts
export function LoginForm() {
	const currentUser = useUser()
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInputs>()

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		signInWithEmailAndPassword(data.email, data.password)
	}

	if (user) return <Navigate to="/" />

	if (loading) return <OverlaySpinner />

	if (error) {
		console.error(error)
	}

	if (currentUser) return <Navigate to={ROUTES.MEAL_PLANS} />

	// Return sign in form component
	return (...)
}
```

### CRUD Operations in Firestore

To make CRUD operations consistent (i.e. error handling, naming), the different interfaces (.i.e. IScheduledMeal, IMealPlan) export type classes that use functions from `Database.ts` to interact with Firebase. One criticism here could be that each a class implementing an interface (Class ScheduledMeal implements IScheduledMeal) would be more modular and promote the single responsibility approach if the database functions were defined in a separate class (ScheduledMealService).

```ts
// this function in class DB from Database.ts ...
static getCollectionByQuery = async (query: Query<DocumentData>) => {
	const querySnapshot = await getDocs(query)
	return querySnapshot.docs
}

// ... implemented in class ScheduledMeal (and others) as =>
static getMealPlanScheduledMeals = async (mealPlanId: string) => {
	const q = query(collection(firestore, this.collectionName), where('mealPlanId', '==', mealPlanId))
	const docs = await DB.getCollectionByQuery(q)
	const elements: IScheduledMeal[] = docs.map(this.mapIterator)
	return elements
}

// `add` from class DB...
static add = async (collectionName: string, values: any) => {
	try {
		values.createdOn = new Date()
		const docRef = await addDoc(collection(firestore, collectionName), values)
		return docRef.id
	} catch (error) {
		console.error(error)
	}
}

// ... implemented in class ScheduledMeal
static add = async (scheduledMeal: Partial<IScheduledMeal>, userId: string) => {
	const id = await DB.add(this.collectionName, { ...scheduledMeal, userId })
	return id
}

// `get` from class DB...
static get = async (collectionName: string, id: string) => {
	const docRef = doc(firestore, collectionName, id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		return { ...docSnap.data(), id: docSnap.id }
	} else {
		return null
	}
}

// ... in class MealPlan
static get = async (planId: string) => {
	const plan = (await DB.get(this.collectionName, planId)) as IMealPlan
	return new MealPlan(plan)
}
```

### React Component with Context, Provider, and Hook

```ts
interface IAppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {
	return (
		<BrowserRouter>
			<AppContext.Provider value={{}}>
				<UserProvider>
					<RecipeDataProvider>
						<MealPlanProvider>{children}</MealPlanProvider>
					</RecipeDataProvider>
				</UserProvider>
			</AppContext.Provider>
		</BrowserRouter>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
```

### Axios Fetch with External API

```ts
// Axios fetch request funtction
export default async function request(config: IRequestOptions) {
	try {
		const response = await axios.request(config)
		return response.data
	} catch (error) {
		throw new MealDBException(error, { config })
	}
}

// fetch: Filter Recipes
export const fetchAllRecipes = async () => {
	// String.fromCharCode(97 + n)

	const data = await request({
		method: 'GET',
		url: `https://themealdb.p.rapidapi.com/search.php`,
		params: { s: '' },
		headers
	})
	return data.meals
}

const filterRecipes = async (params: any) => {
	const filterConfig: IRequestOptions = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params,
		headers
	}
	const data = await request(filterConfig)
	return data.meals
}

// Request Options interface
export interface IRequestOptions {
	method: string
	headers: {
		[key: string]: string
	}
	url: string
	params?: any
}
```

## Testing

### Testing Tools

- **Jest:** Used as the primary test runner. Jest provides a comprehensive testing framework with support for unit and integration testing.
- **React Testing Library:** Utilized for testing React components, allowing us to render components in isolation and interact with them as users would.

### Running Tests

To run the test suite, execute the following command in the project root directory:

```
npm test
```

## Test Example 

```ts
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HowItWorksPage } from './HowItWorksPage'

it('renders without crashing', async () => {
	render(<HowItWorksPage />, { wrapper: BrowserRouter })

	const howitworks = await screen.findByTestId('howitworks')
	expect(howitworks).toBeInTheDocument()
})

it('renders main image', () => {
	render(<HowItWorksPage />, { wrapper: BrowserRouter })
	const image = screen.getByRole('img')
	expect(image).toBeInTheDocument()
})
```

## API Reference

Aside from Firebase, this project uses [TheMealDB](https://www.themealdb.com/) as an external API. It provides hundreds of recipes and queries to make this app functional.

## NPM Scripts

- `npm start`: Starts the development server
- `npm test`: Runs the test suite
- `npm build`: Builds the app for production
