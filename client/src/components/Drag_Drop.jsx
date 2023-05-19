import { useDrag, useDrop } from "react-dnd";

const DragDrop = ({ allUsers, handleCreateConversation, user, board, setBoard }) => {
    console.log("Board", board);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: (eachUser, monitor) => {
            console.log("Drag Start:", eachUser); // Log drag start
            return {
                id: eachUser.id,
                firstName: eachUser.firstName,
                lastName: eachUser.lastName
            };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item, monitor) => {
            console.log("Drop:", item, monitor); // Log drop event
            addDivToBoard(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addDivToBoard = (item) => {
        const { id, firstName, lastName } = item;

        const newBoard = board.filter((user) => user.id !== id);
        setBoard([...newBoard, { id, firstName, lastName }]);
    };

    return (
        <div>
            <>
                {allUsers.map((eachUser) => (
                    <div
                        key={eachUser._id}
                        ref={drag}
                        onClick={() => {
                            drag(eachUser);
                        }}
                        className={`flex justify-between items-center text-white gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer ${isDragging ? "bg-amber-400 cursor-grabbing" : "bg-inherit cursor-grab"}`}
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
            <hr />
            <div ref={drop} className="bg-stone-800 rounded-lg w-64 h-2/3 mx-auto mt-4 hover:outline hover:outline-amber-500">
                <h5 className="text-gray-200">Start a group chat</h5>
                {board.map((eachUser) => (
                    <div
                        key={eachUser.id}
                        className="flex justify-between items-center text-black hover:text-amber-300 gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer"
                    >
                        <h3>
                            {eachUser.firstName} {eachUser.lastName}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragDrop;
