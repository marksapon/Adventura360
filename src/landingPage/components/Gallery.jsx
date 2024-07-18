import React from "react";

const Gallery = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="grid h-full w-full grid-cols-10 grid-rows-4 gap-2">
        <div className="col-span-4 row-span-3 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/4.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-4 row-span-1 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/5.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-2 row-span-1 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/1.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-3 row-span-2 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/3.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-3 row-span-2 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/6.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-4 row-span-1 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/8.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-6 row-span-1 flex items-center justify-center overflow-hidden rounded  border-green-500">
          <img
            src="/assets/Landing Page/snapshots/7.webp"
            alt="Picture 1"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
