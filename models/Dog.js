import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

const Dog = mongoose.model('Dog', dogSchema);

export default Dog;