import { useState } from "react";

const UserList = ({ boardList, setBoardList, handleCreateConversation, friendRequestHandler, allUsers, user, AddFriend, NewMessage }) => {

    const [showTooltip, setShowTooltip] = useState(false)
    return (
        <>
            <h2 className='text-amber-400 font-bold'>Users</h2>
            {allUsers.map((eachUser) => (
                <div
                    key={eachUser._id}
                    onClick={() => {
                        if (!boardList.some((user) => user._id === eachUser._id)) {
                            setBoardList([...boardList, eachUser]);
                        }
                    }}
                    className={`flex relative justify-between items-center hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer`}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div className="flex items-center gap-2 mr-6 p-1 hover:text-amber-400 text-white">
                        <AddFriend
                            className="text-lg hover:text-gray-200 duration-150 font-extrabold text-blue-500 cursor-pointer"
                            onMouseEnter={() => setShowTooltip(false)}
                            onClick={() => friendRequestHandler([user._id, eachUser._id])}
                        />
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
            {showTooltip && <div className="absolute text-sm top-0 left-0 w-2/5 bg-blue-500 text-amber-400 font-extrabold rounded-xl">Add to Group</div>}
        </>
    )

}

export default UserList