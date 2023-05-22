

const FriendList = ({ boardList, setBoardList, handleCreateConversation, allFriends, user, NewMessage }) => {

    const newMessage = (e, eachUser) => {
        e.stopPropagation()
        handleCreateConversation([user._id, eachUser._id])
    }

    return (
        <>
            <h2 className='text-amber-400 font-bold'>Friends</h2>
            {allFriends.map((eachUser) => (
                <div
                    key={eachUser._id}
                    onClick={() => {
                        if (!boardList.some((user) => user._id === eachUser._id)) {
                            setBoardList([...boardList, eachUser]);
                        } //makes it so no duplicates are added to group chat board
                    }}
                    className={`flex justify-between items-center text-white gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer`}
                >
                    <h3>
                        {eachUser.firstName} {eachUser.lastName}
                    </h3>
                    <NewMessage
                        className="text-lg hover:text-gray-200 duration-150 font-extrabold text-blue-500 cursor-pointer"
                        onClick={(e) => newMessage(e, eachUser)}
                    />

                </div>
            ))}
        </>
    )

}

export default FriendList