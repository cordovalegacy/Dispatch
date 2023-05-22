import { useState } from "react"

const FriendList = ({ boardList, setBoardList, handleCreateConversation, allFriends, user, NewMessage }) => {

    const [showTooltip, setShowTooltip] = useState(false) //group chat indicator

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
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <h3
                    className="hover:text-amber-400 text-white"
                    onMouseEnter={() => setShowTooltip(true)}
                    >
                        {eachUser.firstName} {eachUser.lastName}
                    </h3>
                    <NewMessage
                        className="text-lg hover:text-gray-200 duration-150 font-extrabold text-blue-500 cursor-pointer"
                        onClick={(e) => newMessage(e, eachUser)}
                        onMouseEnter={() => setShowTooltip(false)}
                    />
                    {showTooltip && <div className="absolute text-xs top-1 left-0 w-full bg-blue-500 text-amber-400 font-extrabold rounded-xl">Add to Group</div>}
                </div>
            ))}
        </>
    )

}

export default FriendList