const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      return users
        ? res.status(200).json(users)
        : res.status(404).json({ message: 'No users found in the DB' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        '-__v'
      );

      return user
        ? res.status(200).json(user)
        : res.status(404).json({ message: 'No user with that ID' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return user
        ? res.status(200).json(user)
        : res.status(400).json({ message: 'Unable to create user' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      return res
        .status(200)
        .json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new friend
  async createFriend(req, res) {
    try {
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No user/friend found with that ID.' });
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friend._id } }
      );
      return user
        ? res.status(200).json(user)
        : res.status(400).json({ message: 'Unable to update users friend' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      return user
        ? res
            .status(200)
            .json({ message: 'Friend of user deleted!' })
        : res
            .status(404)
            .json({ message: 'User not found, friend not deleted.' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
