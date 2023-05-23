

const ConversationList = ({ allUserConversations, user, handleCreateConversation }) => {

    return (
        <>
            <h2 className='text-amber-400 font-bold text-center'>Conversations</h2>
            {
                allUserConversations.map((eachConversation) => {
                    const otherUsers = eachConversation.users.filter((eachUser) => eachUser._id !== user._id);
                    console.log(otherUsers)
                    return (
                        <div
                            key={eachConversation._id}
                            onClick={() => handleCreateConversation([user._id, ...otherUsers.map((eachUser) => eachUser._id)])}
                            className={`flex justify-center items-center hover:bg-gray-900 py-1 rounded-lg cursor-pointer`}
                        >
                            <div className="w-60 px-2 py-1 hover:text-amber-400 text-white">
                                    {otherUsers.map((eachUser) => <h3>{eachUser.firstName} {eachUser.lastName}</h3>)}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}

export default ConversationList