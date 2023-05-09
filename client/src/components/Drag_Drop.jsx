import { useDrag, useDrop } from "react-dnd";

const DragDrop = ({ allUsers, handleCreateConversation, user, board, setBoard }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: user._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => addDivToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addDivToBoard = (id) => { //adds a new div to the board by filtering the one from the friends list and then mapping to board
        const newBoard = board.filter((item) => id !== item.id);
        setBoard((board) => [...board, newBoard[0]]);
        console.log(id);
    };

    return (
        <div>
            <>
                {allUsers.map((eachUser) => (
                    <div
                        key={eachUser._id}
                        ref={drag}
                        onClick={() => handleCreateConversation([user._id, eachUser._id])}
                        className={`flex justify-between items-center text-white gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer ${isDragging ? "bg-amber-400" : "bg-inherit"
                            }`}
                    >
                        <h3>{eachUser.firstName} {eachUser.lastName}</h3>
                        <button className='text-lg font-extrabold text-blue-500 cur'>+</button>
                    </div>
                ))}
            </>
            <div ref={drop} className="bg-amber-600">
                {board.map((eachUser) => (
                    <div key={eachUser._id}>
                        <h3>{eachUser.firstName} {eachUser.lastName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragDrop;
