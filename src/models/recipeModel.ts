import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from './userModel';

const RecipeSchema = new Schema({
  ingredients: [String],
  title: String,
  createdBy: { type: Schema.Types.ObjectId, ref: User },
  imageUrl: [String],
  imageId: [String],
  createdAt: String,
  text: String,
});
const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Recipe', RecipeSchema);
