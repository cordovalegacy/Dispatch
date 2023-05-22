import { useState } from "react";

const UserList = ({ boardList, setBoardList, handleCreateConversation, friendRequestHandler, allUsers, user, AddFriend, NewMessage }) => {

    const [showTooltip, setShowTooltip] = useState(false) //group chat indicator

    const handleAddFriendClick = (e, eachUser) => {
        e.stopPropagation() //this line is so cool! stops the bubbling process when clicking on the child within a parent
        //when we click on AddFriend component, it is considered a child of the eachUser div
        //normally when we click on the AddFriend component, it will also invoke the parent div onClick event
        //but since we stop the propogation, it doesn't bubble up to the parent
        friendRequestHandler([user._id, eachUser._id])
    };

    return (
        <>
            <h2 className='text-amber-400 font-bold'>Users</h2>
            {allUsers.map((eachUser) => (
                <div
                    key={eachUser._id}
                    onClick={() => {
                        if (!boardList.some((user) => user._id === eachUser._id)) {
                            setBoardList([...boardList, eachUser]);
                        } //makes it so no duplicates are added to group chat board
                    }}
                    className={`flex relative justify-between items-center hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer`}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <AddFriend
                        className="absolute z-10 top-1/4 left-0 text-lg hover:text-gray-200 duration-150 font-extrabold text-blue-500 cursor-pointer"
                        onMouseEnter={() => setShowTooltip(false)}
                        onClick={(event) => handleAddFriendClick(event, eachUser)}
                    />
                    <div className="relative text-left w-full mr-6 px-2 py-1 hover:text-amber-400 text-white">
                        <h3
                            onMouseEnter={() => setShowTooltip(true)}
                        >
                            {eachUser.firstName} {eachUser.lastName}
                        </h3>
                    </div>
                    <NewMessage
                        className="absolute right-1 text-lg hover:text-gray-200 duration-150 font-extrabold text-blue-500 cursor-pointer"
                        onClick={() => handleCreateConversation([user._id, eachUser._id])}
                        onMouseEnter={() => setShowTooltip(false)}
                    />
                </div>
            ))}
            {showTooltip && <div className="absolute text-xs top-1 left-0 w-full bg-blue-500 text-amber-400 font-extrabold rounded-xl">Add to Group</div>}
        </>
    );
};

export default UserList;
