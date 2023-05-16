import { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragDrop = ({ allUsers, handleCreateConversation, user, board, setBoard }) => {

    // const [{ isDragging }, drag] = useDrag(() => ({ //dragging functionality
    //     type: "div", //makes this function reusable for the same element type
    //     item: { id: user._id }, //send data about this object to dropping function
    //     collect: (monitor) => ({ //collects information about dragged element
    //         isDragging: !!monitor.isDragging(), //returns boolean if dragging
    //     }),
    // }));

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: user._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            getItem: monitor.getItem, // add this line
        }),
    }));
    

    useEffect(() => {
        if (isDragging === true) {
            console.log("isDragging: ", drag.getItem())
        }
    }, [isDragging])

    const [{ isOver }, drop] = useDrop(() => ({ //dropping functionality
        accept: "div", //matches with type key from useDrag function
        drop: (item) => addDivToBoard(item.id), //sends mapping info from drag function to the board
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addDivToBoard = (id) => { //add draggable element to board
        const newBoard = board.filter((item) => id !== item.id);
        console.log(newBoard, id, board)
        setBoard([...newBoard, { id: id }]);
    };

    return (
        <div>
            <>
                {allUsers.map((eachUser) => (
                    <div
                        key={eachUser._id}
                        ref={drag}
                        className={`flex justify-between items-center text-white gap-10 hover:bg-gray-900 py-1 px-5 rounded-lg cursor-pointer ${isDragging ? "bg-amber-400 cursor-grabbing" : "bg-inherit cursor-grab"
                            }`}
                    >
                        <h3>
                            {eachUser.firstName} {eachUser.lastName}
                        </h3>
                        <button
                            className="text-lg font-extrabold text-blue-500 cur"
                            onClick={() => handleCreateConversation([user._id, eachUser._id])}
                        >+</button>
                    </div>
                ))}
            </>
            <div
                ref={drop}
                className="bg-amber-400 border border-white w-40 h-3/4 mx-auto">
                {
                    board.map((eachUser) => (
                        <div
                            key={eachUser.id}>
                            <h3>
                                {eachUser.firstName}
                            </h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DragDrop
