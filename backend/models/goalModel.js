import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    text: { type: String, required: [true, 'Please add a text value'] },
}, {
    timestamps: true
});

export default mongoose.model('Goal', goalSchema);