
const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Spinning loader */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Animated text */}
      <p className="text-lg font-medium animate-pulse text-center px-4">
        Hang tight... good things take time ✨
      </p>
    </div>
  );
};

export default LoadingScreen;
