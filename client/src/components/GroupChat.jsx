const GroupChat = ({ boardList, setBoardList, handleCreateConversation, user }) => {

    console.log("Board", boardList);

    const removeFromBoard = (itemFromBoard) => {
        const filteredBoard = boardList.filter((allOtherBoardItems) => allOtherBoardItems._id !== itemFromBoard._id)
        setBoardList(filteredBoard)
    }

    return (
        <div className="flex flex-col justify-between gap-2 bg-gray-800 rounded-lg px-10 py-4 my-6 h-40 max-h-40 overflow-auto">
            <h5 className="text-amber-400 font-bold">Start a group chat</h5>
            {boardList?.map((eachUser) => (
                <div
                    key={eachUser._id}
                    className="flex justify-between items-center text-white hover:text-red-500 gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer"
                >
                    <h3 onClick={() => removeFromBoard(eachUser)}>
                        {eachUser.firstName} {eachUser.lastName}
                    </h3>
                </div>
            ))}
            <button
                className={`bg-blue-600 hover:bg-blue-500 text-amber-400 font-bold rounded-full py-1 px-2  ${boardList.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={boardList.length === 0 ? null : () => handleCreateConversation([user._id, ...boardList.map((eachUser) => eachUser._id)])}
            >Start Group Chat</button>
        </div>
    );
};

export default GroupChat;
