import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String, required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);