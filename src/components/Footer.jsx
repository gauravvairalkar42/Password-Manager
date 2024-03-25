import React from "react";

const Footer = () => {
  return (
    <div className="text-white flex justify-between bg-slate-900 px-6 w-full">
      <div className="text-2xl font-bold p-2">
        <span className="text-green-700">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">word /&gt;</span>
      </div>

      <div className="py-1">
        Copyright © 2024 Gaurav Vairalkar. <br />
        All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
