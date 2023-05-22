const FriendshipController = require('../controllers/friendship.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/friendRequest', authenticate, FriendshipController.friendRequest)
    app.get('/api/friendsList/:id', FriendshipController.getAllFriends)
}