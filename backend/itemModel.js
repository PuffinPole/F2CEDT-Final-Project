import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        acceleration:{
            type: Number,
            required: true,
        },

        velocity:{
            type: Number,
            required: true,
        },

        time:{
            type: Number,
            required: true,
        },

        distance:{
            type: Number,
            required: true,
        },

        name:{
            type: String,
            required: true,
        }
    }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;