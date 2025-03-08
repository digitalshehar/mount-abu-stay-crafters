
import React from "react";

interface EmptyStateProps {
  filtered?: boolean;
}

const EmptyState = ({ filtered = false }: EmptyStateProps) => {
  return (
    <div className="py-12 text-center">
      <p className="text-lg font-medium text-stone-700">
        {filtered ? "No hotels match your filters" : "No hotels added yet"}
      </p>
      <p className="text-sm text-stone-500 mt-1">
        {filtered 
          ? "Try adjusting your search criteria or clearing filters" 
          : "Add your first hotel to get started"}
      </p>
    </div>
  );
};

export default EmptyState;
