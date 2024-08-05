import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    catagory: { type: String, required: true },
    yearOfWriting: { type: Number, required: true },
    price: { type: Number, required: true },
    isHidden: { type: Boolean, required: true },
    fileBook: [],
});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);