import React, { useState } from "react";
import img1 from '../pics/mt.png' 


const Template = ({ heading }) => {

  return (
    <>
      <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100 ">
        <h1 className="text-xl font-bold mb-6 text-blue-600">{heading}</h1>
        <p className="text-lime-400 animate-pulse  mb-6 text-5xl font-bold ">Moutain Dew , Dar Ki ...</p>
        <img src={img1} alt="maki ch*t" />
      </div>
    </>
  );
};

export default Template;
