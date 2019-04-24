import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Product = new Schema({
    name: { type: String },
    type: { type: String },
    price: { type: Number },
});

export default mongoose.model('Product', Product);