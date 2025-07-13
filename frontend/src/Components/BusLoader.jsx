import Lottie  from "lottie-react";

const BusLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <Lottie
        autoplay
        loop
        src="https://lottie.host/1be0aba9-80b9-43dd-b5fb-0f829db2edf3/KhDqaKKFsF.lottie"
        style={{ height: "300px", width: "300px" }}
      />
      <p className="mt-4 text-gray-700 font-semibold text-lg">
        Booking your ride...
      </p>
    </div>
  );
};

export default BusLoader;
