import React, { useEffect, useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    // console.log(ref.current.src);

    if (ref.current.src.includes("hidden.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length >= 3 &&
      form.username.length >= 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem("passwords",JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      // console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
    } else {
      alert("Please fill all inputs...!");
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);
    let con = confirm("Do you really want to delete?");
    if (con) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter((item) => item.id !== id)));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}),
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    // toast('Copied to clipboard...!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",

    //   });

    // alert("Copied to clipboard \n" + text);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white"></div> */}

      <div className="p-2 mx-auto max-w-4xl py-5">
        <div className="text-white flex flex-col items-center ">
          <h1 className="font-bold text-2xl py-4">
            <span className="text-green-700">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">word /&gt;</span>
          </h1>
          <p className="text-green-300 ">Your own password manager...</p>
        </div>

        <div className="flex flex-col items-center p-5">
          <input
            onChange={handleChange}
            placeholder="Enter website URL"
            className="border rounded border-green-400 py-2 px-4 text-black w-full"
            type="text"
            name="site"
            id="1"
            value={form.site}
          />

          <div className="my-8 mx-0 flex justify-between gap-8 ">
            <input
              onChange={handleChange}
              placeholder="Enter Username"
              className="border rounded border-green-400 py-2 px-4 text-gray-900 "
              type="text"
              name="username"
              id="2"
              value={form.username}
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                placeholder="Enter Password"
                className="border rounded border-green-400 py-2 px-4 text-gray-900 "
                type="password"
                name="password"
                id="3"
                value={form.password}
              />
              <span
                className="absolute right-0.5 top-0.5 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={40}
                  src="hidden.png"
                  alt="hidden"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 rounded-full w-fit px-4 py-2 hover:text-white hover:bg-green-600 gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="text-white mt-9">
          <h1 className="text-lg underline">Your Passwords :</h1>

          {passwordArray.length == 0 && (
            <div className="mt-2"> No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full mt-3 rounded-lg overflow-hidden mb-5">
              <thead className="bg-green-800">
                <tr>
                  <th className="py-3">Website</th>
                  <th className="py-3">Username</th>
                  <th className="py-3">Password</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200 text-black">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32">
                        <a href="{item.site}" target="_blank">
                          {item.site}
                        </a>

                        <img
                          onClick={() => {
                            copyText(item.site);
                          }}
                          className="mt-[-20px] mx-3 cursor-pointer"
                          src="copy.png"
                          alt="copy"
                          width={22}
                        />
                      </td>

                      <td className="py-2 border border-white text-center w-32">
                        {item.username}
                        <img
                          onClick={() => {
                            copyText(item.username);
                          }}
                          className="mt-[-20px] mx-3 cursor-pointer"
                          src="copy.png"
                          alt="copy"
                          width={22}
                        />
                      </td>

                      <td className="py-2 border border-white text-center w-32">
                        {"*".repeat(item.password.length)}
                        <img
                          onClick={() => {
                            copyText(item.password);
                          }}
                          className="mt-[-20px] mx-3 cursor-pointer"
                          src="copy.png"
                          alt="copy"
                          width={22}
                        />
                      </td>

                      <td className="py-2 border border-white text-center w-32 text-red-700">
                        <div className="flex justify-around">
                          <div>
                            <img
                              onClick={() => {
                                editPassword(item.id);
                              }}
                              className="ml-4 cursor-pointer"
                              src="edit.png"
                              alt="edit"
                              width={30}
                            />
                          </div>

                          <div>
                            <img
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                              className=" cursor-pointer"
                              src="delete.png"
                              alt="delete"
                              width={30}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
