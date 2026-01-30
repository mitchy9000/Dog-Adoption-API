import Dog from '../models/Dog.js';

export const registerDog = async (req, res) => {
  try {
    const { name, description } = req.body;

    const dog = await Dog.create({
      name,
      description,
      owner: req.user._id
    });

    res.status(201).json({ message: 'Dog registered', dog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const adoptDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    if (dog.adoptedBy) return res.status(400).json({ message: 'Dog already adopted' });
    if (dog.owner?.toString() === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot adopt your own dog' });

    dog.adoptedBy = req.user._id;
    await dog.save();

    res.status(200).json({ message: 'Dog adopted', dog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    if (dog.owner?.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not your dog' });
    if (dog.adoptedBy)
      return res.status(400).json({ message: 'Cannot remove adopted dog' });

    await dog.deleteOne();

    res.status(200).json({ message: 'Dog removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};