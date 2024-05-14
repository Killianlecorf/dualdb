import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  ingredients: string;
  preparationStep: string;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  preparationStep: { type: String, required: true }
});

const Recipes = mongoose.model<IRecipe>('Recipes', RecipeSchema);

export default Recipes;
