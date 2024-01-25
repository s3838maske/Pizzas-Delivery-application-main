import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="text-center mt-10">
        <div style={{color:"green"}} className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
