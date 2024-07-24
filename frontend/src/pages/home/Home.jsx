import MessageContainer from "../../components/messages/MessageContainer";
import SideeBar from "../../components/sidebar/SideeBar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-gray-50 border-2">
      <SideeBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
