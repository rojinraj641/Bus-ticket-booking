import { GiSteeringWheel } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { toggleSeatSelection } from "../Features/Seats/selectedSeatsSlice";

const SleeperSeat = () => {
    const { seats } = useSelector((state) => state.seats);
    const { busId } = useSelector((state) => state.busId);
    const { seatIds } = useSelector((state) => state.selectedSeats);
    const availabeSeats = seats.filter((s) => s.busId === busId);
    const dispatch = useDispatch();
    const toggleSeat = (seatId)=>{
        dispatch(toggleSeatSelection({busId, seatId}))
    }
    const renderSeats = (seat) => {
        const isSelected = seatIds.includes(seat._id)
        return (
            <div key={seat._id} className="flex px-3 cursor-pointer">
                <div
                    className={` border border-gray-200 w-3 h-5 rounded-md ${isSelected ? "#16A34A" :  "#9CA3AF"}`}
                    onClick={() => toggleSeat(seat._id)} />

            </div>

        )
    }
    return (
        <div className='flex flex-row gap-5 lg-flex-col'>
            {/*Lower Deck*/}
            <div>
                <p>Lower Deck</p>
                <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-2">
                    <div className="flex justify-end pr-10 py-10">
                        <GiSteeringWheel size={24} />
                    </div>
                    <div className="grid grid-cols-[auto_auto_40px_auto_auto] gap-3">
                        {seats.seats.map((seat, index) => (
                            <>
                                {index % 4 === 2 && <div />}
                                {renderSeats(seat)}
                            </>
                        ))}
                    </div>
                </div>
            </div>

            {/*Upper Deck*/}
            <div>
                <p>Upper Deck</p>
                <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-2">
                    <div className="grid grid-cols-[auto_auto_40px_auto_auto] gap-3">
                        {seats.seats.map((seat, index) => (
                            <>
                                {index % 4 === 2 && <div />}
                                {renderSeats(seat)}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SleeperSeat