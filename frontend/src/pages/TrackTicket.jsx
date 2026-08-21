import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Bus, MapPin, Clock, Phone, Star, ChevronRight, Circle, CheckCircle2, Navigation } from 'lucide-react';

const trip = {
    ticketId: 'BMT4521',
    status: 'in_transit', // 'upcoming' | 'in_transit' | 'completed'
    busNumber: 'TS-09-AB-1234',
    operator: 'Orange Travels',
    rating: 4.3,
    from: 'Hyderabad',
    to: 'Vijayawada',
    departureTime: '10:30 AM',
    arrivalTime: '4:00 PM',
    currentStop: 'Suryapet',
    eta: '2h 15m remaining',
    progressPercent: 45,
    seat: 'A3',
    driverPhone: '+91 98765 43210',
    stops: [
        { name: 'Hyderabad', time: '10:30 AM', status: 'done' },
        { name: 'Suryapet', time: '12:45 PM', status: 'current' },
        { name: 'Khammam', time: '2:10 PM', status: 'upcoming' },
        { name: 'Vijayawada', time: '4:00 PM', status: 'upcoming' },
    ],
};

const statusConfig = {
    upcoming: { label: 'Upcoming', color: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-600' },
    in_transit: { label: 'On the way', color: '#2563EB', bg: 'bg-blue-50', text: 'text-blue-600' },
    completed: { label: 'Completed', color: '#22C55E', bg: 'bg-green-50', text: 'text-green-600' },
};

const TrackTicket = ({ data = trip }) => {
    const [showStops, setShowStops] = useState(true);
    const status = statusConfig[data.status];

    return (
        <div>
            <Navbar />
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-semibold text-gray-900">Track Ticket</h2>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                                {status.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">Ticket #{data.ticketId}</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Bus size={22} />
                    </div>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-lg font-bold text-gray-900">{data.from}</p>
                        <p className="text-xs text-gray-500">{data.departureTime}</p>
                    </div>
                    <div className="flex-1 flex items-center px-4">
                        <div className="w-full h-1.5 rounded-full bg-gray-100 relative overflow-hidden">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{ width: `${data.progressPercent}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow flex items-center justify-center"
                                style={{ left: `calc(${data.progressPercent}% - 8px)` }}
                            >
                                <Navigation size={9} className="text-white" fill="white" />
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{data.to}</p>
                        <p className="text-xs text-gray-500">{data.arrivalTime}</p>
                    </div>
                </div>

                {/* Live status line */}
                {data.status === 'in_transit' && (
                    <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mb-5 mt-4">
                        <MapPin size={16} />
                        <span className="font-medium">Near {data.currentStop}</span>
                        <span className="text-blue-400">•</span>
                        <Clock size={14} />
                        <span>{data.eta}</span>
                    </div>
                )}

                {/* Bus + driver info */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100 mt-4">
                    <div>
                        <p className="font-medium text-gray-800">{data.operator}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                            <span>{data.busNumber}</span>
                            <span>•</span>
                            <span>Seat {data.seat}</span>
                            <span className="flex items-center gap-0.5 text-amber-500">
                                <Star size={12} fill="#F59E0B" /> {data.rating}
                            </span>
                        </div>
                    </div>
                    <a
                        href={`tel:${data.driverPhone}`}
                        className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition"
                    >
                        <Phone size={18} />
                    </a>
                </div>

                {/* Stops timeline (toggle) */}
                <button
                    onClick={() => setShowStops((prev) => !prev)}
                    className="flex items-center justify-between w-full text-sm font-medium text-blue-600 hover:text-blue-700 pt-2"
                >
                    Stop-wise timeline
                    <ChevronRight size={16} className={`transition-transform ${showStops ? 'rotate-90' : ''}`} />
                </button>

                {showStops && (
                    <div className="mt-4 pl-2">
                        {data.stops.map((stop, idx) => (
                            <div key={stop.name} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    {stop.status === 'done' && <CheckCircle2 size={18} className="text-green-500" />}
                                    {stop.status === 'current' && (
                                        <div className="w-[18px] h-[18px] rounded-full bg-blue-600 border-2 border-blue-200 animate-pulse" />
                                    )}
                                    {stop.status === 'upcoming' && <Circle size={18} className="text-gray-300" />}
                                    {idx !== data.stops.length - 1 && (
                                        <div className={`w-0.5 flex-1 min-h-[24px] ${stop.status === 'done' ? 'bg-green-400' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                                <div className="pb-5">
                                    <p className={`text-sm font-medium ${stop.status === 'upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>
                                        {stop.name}
                                    </p>
                                    <p className="text-xs text-gray-400">{stop.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default TrackTicket;