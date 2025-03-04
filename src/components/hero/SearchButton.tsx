
import { Search } from "lucide-react";

interface SearchButtonProps {
  activeTab: string;
  handleSearch: () => void;
}

const SearchButton = ({ activeTab, handleSearch }: SearchButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center"
      >
        <Search className="h-4 w-4 mr-2" />
        {activeTab === "hotels" && "Search Hotels"}
        {activeTab === "cars" && "Search Cars"}
        {activeTab === "bikes" && "Search Bikes"}
        {activeTab === "activities" && "Search Activities"}
      </button>
    </div>
  );
};

export default SearchButton;
