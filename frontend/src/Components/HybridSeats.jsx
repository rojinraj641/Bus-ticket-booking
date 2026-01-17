import { MdEventSeat } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { useState } from "react";

const HybridSeat = (seats, totalSeats, deck) => {
    const [seatColor, setSeatColor] = useState('gray')

    const renderSeaterSeats = (item) => {
        return (
            <div className="flex px-3">
                <MdEventSeat
                    onClick={() => setSeatColor('green')}
                    size={30}
                    style={{ color: seatColor }}
                />
            </div>
        )
    }
    const renderSleeperSeats = (item) => {
        return (
            <div className="border border-gray-200 w-3 h-5 rounded-md "/>
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
                                {seats.seatType === 'Seater' && (
                                    <>
                                        {index % 4 === 2 && <div />}
                                        {renderSeaterSeats(seat)}
                                    </>
                                )}
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
                                {seats.seatType === 'Sleeper' && (
                                    <>
                                        {index % 4 === 2 && <div />}
                                        {renderSleeperSeats(seat)}
                                    </>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HybridSeat