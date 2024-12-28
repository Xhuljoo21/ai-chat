import { PanelTopClose, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getToken, saveToken } from "../utils/saveToken";

function SettingModel({ isOpen, setIsOpen }) {
  const [key, setKey] = useState("");
  const saveKey = () => {
    saveToken(key);
    setIsOpen(false);
  };
  useEffect(() => {
    const token = getToken();
    console.log("token", token);
    if (token !== null) {
      setKey(token);
    }
  }, []);
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-black bg-opacity-50 z-50">
      <div className="w-96 h-96 bg-white rounded-lg shadow-lg flex items-center justify-center relative">
        <button
          className="absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>
        <div className="w-64">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="model" className="block font-semibold mb-2">
                Model
              </label>
              <select
                name="model"
                id="model"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="gpt-4o">GPT-4o</option>
              </select>
            </div>
            <div>
              <label htmlFor="top-p" className="block font-semibold mb-2">
                API KEY
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                name="top-p"
                id="top-p"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={saveKey}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingModel;
