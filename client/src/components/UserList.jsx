

const UserList = ({ boardList, setBoardList, handleCreateConversation, allUsers, user }) => {

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
                                className={`flex justify-between items-center text-white gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer`}
                            >
                                <h3>
                                    {eachUser.firstName} {eachUser.lastName}
                                </h3>
                                <button
                                    className="text-lg font-extrabold text-blue-500 cursor-pointer"
                                    onClick={() => handleCreateConversation([user._id, eachUser._id])}
                                >
                                    +
                                </button>
                            </div>
                        ))}
        </>
    )

}

export default UserList