import mongoose, { Schema, Document } from 'mongoose';

interface IGroceryItem extends Document {
  itemName: string;
  price: number;
  quantity: number;
  image: string;
  weight: number;
  unit: string;
}

const groceryItemSchema = new Schema<IGroceryItem>({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
},{
    timestamps: true,
    versionKey: false,
});

groceryItemSchema.index({ itemName: 'text' });

const GroceryItem = mongoose.model<IGroceryItem>('GroceryItem', groceryItemSchema);

export default GroceryItem;
