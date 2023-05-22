const FriendshipModel = require('../models/friendship.model')

module.exports = {

    friendRequest: async (req, res) => {
        try{
            const { users } = req.body
            const existingFriendship = await FriendshipModel.findOne({friendships: {$all: users}}).exec()
            if(existingFriendship){
                return res.status(200).json(existingFriendship)
            }
            const newFriendship = await new FriendshipModel({ friendships: users })
            await newFriendship.save()
            return res.status(201).json(newFriendship)
        }
        catch(err){
            return res.status(500).json({message: `Could not sync friend request ${err}`})
        }
    },

    getAllFriends: async (req, res) => {
        try{
            const currentUser = req.params.id
            console.log("current user", req.params.id)
            const allFriends = await FriendshipModel.find({friendships: currentUser}).populate('friendships', 'email firstName lastName _id')
            return res.status(200).json(allFriends)
        }
        catch(err){
            return res.status(500).json({message: `Something went wrong finding all friends for this user ${err}`})
        }
    }

}