const { User, Thought, Reaction } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return thoughts
        ? res.status(200).json(thoughts)
        : res.status(404).json({ message: 'No thoughts found!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      return thought
        ? res.status(200).json(thought)
        : res.status(404).json({ message: 'No thought with that ID' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought } },
        { new: true }
      );

      return user
        ? res.status(200).json('Thought 💭 created')
        : res.status(404).json({
            message: 'Thought created, but found no user with that ID'
          });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      return thought
        ? res.status(200).json(thought)
        : res.status(404).json({ message: 'No thought with this id!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId
      });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      return user
        ? res.status(200).json({ message: 'Thought successfully deleted!' })
        : res.status(404).json({
            message: 'User not associated to thought, not deleted.'
          });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      return thought
        ? res.status(200).json(thought)
        : res.status(404).json({ message: 'No thought with this id!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } }
        },
        { runValidators: true, new: true }
      );

      return thought
        ? res.status(200).json(thought)
        : res.status(404).json({ message: 'No thought with this id!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};
