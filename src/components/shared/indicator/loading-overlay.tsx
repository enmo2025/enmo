import LoadingPlaceholder from './loading-placeholder';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-950/10">
      <LoadingPlaceholder />
    </div>
  );
};

export default LoadingOverlay;
