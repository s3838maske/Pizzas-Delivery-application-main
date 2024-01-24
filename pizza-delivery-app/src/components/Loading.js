import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="text-center mt-10">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
