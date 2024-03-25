import React from "react";

const Navbar = () => {
  const githubClick = () => {
    window.open("https://github.com");
  };
  return (
    <nav className="flex justify-between items-center px-10 py-2 bg-slate-900 text-white">
      <div className="text-3xl font-bold border-2 border-green-500 rounded-2xl p-2">
        <span className="text-green-700">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">word /&gt;</span>
      </div>

      <ul>
        <li className="flex gap-5 text-lg">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="/">
            About
          </a>
          <a className="hover:font-bold" href="/">
            Contact
          </a>
          <a className="hover:font-bold" href="/">
            Users
          </a>
          <a className="hover:font-bold" href="/">
            Menu
          </a>
        </li>
      </ul>

      <button className="bg-white mx-7 rounded-md">
        <img
          src="github.png"
          alt="github_logo"
          width={40}
          onClick={githubClick}
        />
      </button>
    </nav>
  );
};

export default Navbar;
