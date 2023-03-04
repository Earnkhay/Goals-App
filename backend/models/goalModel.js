import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: { type: String, required: [true, 'Please add a text value'] },
}, {
    timestamps: true
});

export default mongoose.model('Goal', goalSchema);