const Loader = () => {
  return (
    <div className="bg-white rounded-xl border p-5 animate-pulse mb-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="h-6 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default Loader;
