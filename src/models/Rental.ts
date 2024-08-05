import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
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
    rentalDuration: {
        type: Number,
        required: true,
        enum: [14, 30, 90]
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

export default mongoose.models.Rental || mongoose.model("Rental", rentalSchema);
