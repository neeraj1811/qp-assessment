import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  userId: string;
  items: { itemId: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  items: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: 'GroceryItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
},{
    timestamps: true,
    versionKey: false,
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
