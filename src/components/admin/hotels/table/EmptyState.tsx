
import React from "react";

const EmptyState = () => {
  return (
    <tr>
      <td colSpan={10} className="px-6 py-8 text-center text-stone-500">
        No hotels found. Try a different search or add a new hotel.
      </td>
    </tr>
  );
};

export default EmptyState;
