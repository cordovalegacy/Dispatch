const FriendshipController = require('../controllers/friendship.controller')

module.exports = (app) => {
    app.post('/api/friendRequest', FriendshipController.friendRequest)
    app.get('/api/friendsList', FriendshipController.getAllFriends)
}