import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';

const BookingCard = ({ status = 'completed' }) => {
    const getLineColor = () => {
        switch (status) {
            case 'completed': return 'bg-blue-500';
            case 'cancelled': return 'bg-red-500';
            case 'in-progress':
            default: return 'bg-gray-300';
        }
    };

    const getStatusLabel = () => {
        switch (status) {
            case 'completed': return 'CONFIRMED';
            case 'cancelled': return 'CANCELLED';
            case 'in-progress': return 'IN PROGRESS';
            default: return 'UNKNOWN';
        }
    };

    const getStatusStyle = () => {
        switch (status) {
            case 'completed': return 'bg-green-200 text-green-600';
            case 'cancelled': return 'bg-red-200 text-red-600';
            case 'in-progress': return 'bg-yellow-200 text-yellow-600';
            default: return 'bg-gray-200 text-gray-600';
        }
    };

    return (
        <div className='flex flex-col items-center w-full sm:max-w-sm bg-white rounded-md border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105'>

            {/* Top Section */}
            <div className='w-full border-b border-gray-200 h-24 flex items-center justify-between px-4 sm:px-6'>
                <p className='text-sm font-semibold'>Kochi</p>
                <div className="flex items-center flex-1 mx-4">
                    <span className="rounded-full bg-blue-500 w-3 h-3" />
                    <div className={`flex-1 h-1 rounded ${getLineColor()}`} />
                    <span className={`rounded-full w-3 h-3 ${getLineColor()}`} />
                </div>
                <p className='text-sm font-semibold'>Bangalore</p>
                <span className={`rounded-3xl text-xs px-2 py-1 ml-3 ${getStatusStyle()}`}>
                    {getStatusLabel()}
                </span>
            </div>

            {/* Middle Section */}
            <div className='flex flex-col gap-3 p-5 w-full'>
                <div className="flex justify-between">
                    <div>
                        <p className='text-xs font-thin'>Date</p>
                        <p className='text-md font-semibold'>May 15, 2025</p>
                    </div>
                    <div>
                        <p className='text-xs font-thin'>Departure</p>
                        <p className='text-md font-semibold'>08:30 AM</p>
                    </div>
                    <div>
                        <p className='text-xs font-thin'>Arrival</p>
                        <p className='text-md font-semibold'>01:45 PM</p>
                    </div>
                </div>

                <div className='flex items-center bg-gray-100 rounded-md p-3 gap-3'>
                    <div className='border border-gray-400 rounded-md p-3 bg-gray-200'>
                        <FontAwesomeIcon icon={faBusSimple} size="lg" color="#4B5563" />
                    </div>
                    <p className="text-sm font-medium">Kerala Lines</p>
                </div>

                <div>
                    <p className='text-xs font-thin'>Passengers</p>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <span className="rounded-3xl bg-gray-200 text-xs text-gray-600 px-3 py-1">John Doe (Seat 14A)</span>
                        <span className="rounded-3xl bg-gray-200 text-xs text-gray-600 px-3 py-1">Jean Doe (Seat 15A)</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200 w-full">
                <div>
                    <p className="text-red-500 text-lg font-semibold">$20</p>
                    <p className="text-xs text-gray-500">Incl. all taxes</p>
                </div>
                <button className="border border-red-500 text-red-500 text-sm rounded-md px-4 py-1 hover:bg-red-50 transition">View Ticket</button>
            </div>
        </div>
    );
};

export default BookingCard;
