import CallHeader from "../component/CallHeader";
import CallSearchBar from "../component/CallSearchBar";
import CategoryTabs from "../component/CategoryTabs";
import AstrologerCard from "../component/AstrologerCard";
import Bottomnav from "../component/Bottomnav";

function Call() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl">

        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-28">

          <CallHeader />

          <CallSearchBar />

          <CategoryTabs />

          <div className="px-4 py-4 space-y-5">
            <AstrologerCard />
            <AstrologerCard />
            <AstrologerCard />
            <AstrologerCard />
          </div>

        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}

export default Call;