import Recipe from '../models/recipeModel';

const recipe = `
<div>
        <h1>Title: Homemade Dog Food</h1>
        <h3>Ingredients</h3>
        <ul>
          <li>1 pound ground turkey</li>
          <li>6 cups water</li>
          <li>2 cups brown rice</li>
          <li>1 teaspoon dried rosemary</li>
          <li>
            ½ (16 ounce) package frozen broccoli, carrots and cauliflower
            combination
          </li>
        </ul>
        <h3>Directions</h3>
        <div>
          <h4>Step 1</h4>
          <p>
            Place ground turkey, water, rice, and rosemary into a large Dutch
            oven. Stir until ground turkey is broken up and evenly distributed
            throughout the mixture; bring to a boil over high heat, then reduce
            heat to low and simmer for 20 minutes.
          </p>
          <h4>Step 2</h4>
          <p>
            Add frozen vegetables, and cook for an additional 5 minutes. Remove
            from heat and cool. Refrigerate until using.
          </p>
        </div>
        <h2>Tips</h2>
        <p>My dogs are large breed so they get 2 cups in the a.m. and p.m.</p>
        <div>
          <h1>Nutrition Facts</h1>
          <p>440 Calories</p>
          <p>10g Fat</p>
          <p>64g Carbs</p>
          <p>23g Protein</p>
        </div>
      </div>`;

export const getRandomRecipe = async (req: any, res: any) => {
  //   const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);

  if (recipe) {
    return res.status(200).json(recipe);
  } else {
    return res.status(400).json({ error: 'Unable to find the recipe' });
  }
};
