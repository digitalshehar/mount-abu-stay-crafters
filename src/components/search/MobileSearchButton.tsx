
import React, { useState } from "react";
import { Search } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { Button } from "@/components/ui/button";

const MobileSearchButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="p-2 h-9 w-9 rounded-full"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      <GlobalSearch open={open} setOpen={setOpen} />
    </>
  );
};

export default MobileSearchButton;
