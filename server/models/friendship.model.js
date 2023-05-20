const mongoose = require('mongoose')

const FriendshipSchema = new mongoose.Schema({
    friendships: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]
}, {timestamps: true})

const Friendship = mongoose.model("Friendship", FriendshipSchema)
module.exports = Friendship