const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute pt-[20%] px-24 text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6  w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-2 w-36 text-xl  rounded-lg hover:bg-opacity-80">
          ▶Play
        </button>
        <button className=" mx-2 bg-white text-black p-2 w-36 text-xl rounded-lg hover:bg-opacity-80">
          👁More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
