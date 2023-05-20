const FriendshipController = require('../controllers/friendship.controller')

module.exports = (app) => {
    app.route('/api/friendRequest', FriendshipController.friendRequest)
    app.route('/api/friendsList', FriendshipController.getAllFriends)
}