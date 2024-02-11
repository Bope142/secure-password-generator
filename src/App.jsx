import React, { useState, useEffect } from "react";
import { FaCopy, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
    localStorage.setItem("isDarkMode", prefersDarkMode);
    console.warn(prefersDarkMode);
  }, []);

  const handleCheckboxChange = () => {
    const numbersCheckbox = document.getElementById("numbers");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const specialCheckbox = document.getElementById("special");

    setIsChecked(
      numbersCheckbox.checked ||
        lowercaseCheckbox.checked ||
        uppercaseCheckbox.checked ||
        specialCheckbox.checked
    );
  };
  const handleLengthChange = (e) => {
    setPasswordLength(e.target.value);
  };

  const generatePassword = () => {
    if (!isChecked) {
      toast.error(
        "Please select at least one option to generate the password."
      );
      return;
    }
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+{}[]";

    let availableChars = "";
    let generatedPassword = "";

    if (document.getElementById("lowercase").checked) {
      availableChars += lowercaseChars;
    }
    if (document.getElementById("uppercase").checked) {
      availableChars += uppercaseChars;
    }
    if (document.getElementById("numbers").checked) {
      availableChars += numberChars;
    }
    if (document.getElementById("special").checked) {
      availableChars += specialChars;
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      generatedPassword += availableChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password !== "") {
      navigator.clipboard.writeText(password);
      toast("Password copied to clipboard!");
    }
  };

  return (
    <main className={` App  ${isDarkMode ? "dark" : "light"}`}>
      <div className="container__box">
        <div className="container__header">
          <h1 className="text">PASSWORD GENERATOR</h1>
          <div className="mode__switch">
            <p className="text">Dark</p>
            <div
              className={`dark-mode-switch ${isDarkMode ? "dark" : "light"}`}
              onClick={() => {
                setIsDarkMode(!isDarkMode);
              }}
            >
              <div className="toggle-button"></div>
            </div>
          </div>
        </div>
        <div className="container__password_Length">
          <div className="descrp__top">
            <p className="text">Length</p>
            <input
              type="text"
              className="input-form"
              readOnly
              value={passwordLength}
            />
          </div>
          <input
            type="range"
            name=""
            id="length-pswd"
            onChange={handleLengthChange}
            value={passwordLength}
            min="0"
            max="40"
          />
        </div>
        <ul className="container__option_pswd">
          <li className="item-list">
            <input
              type="checkbox"
              id="numbers"
              onChange={handleCheckboxChange}
            />
            <p className="text__items muted">NUMBERS (0-9)</p>
          </li>
          <li className="item-list">
            <input
              type="checkbox"
              id="lowercase"
              onChange={handleCheckboxChange}
            />
            <p className="text__items">SMALL LETTERS (a-z)</p>
          </li>
          <li className="item-list">
            <input
              type="checkbox"
              id="uppercase"
              onChange={handleCheckboxChange}
            />
            <p className="text__items">CAPITAL LETTERS (A-Z)</p>
          </li>
          <li className="item-list">
            <input
              type="checkbox"
              id="special"
              onChange={handleCheckboxChange}
            />
            <p className="text__items">SPECIAL CHARACTERS (!#$%&@...)</p>
          </li>
        </ul>
        <button className="btn" id="btn-generate" onClick={generatePassword}>
          GENERATE
        </button>
        <div className="result">
          <input
            type="text"
            id="result-password"
            className="input-form"
            readOnly
            value={password}
          />
          <button className="btn" id="btn-copy" onClick={copyToClipboard}>
            <FaCopy />
          </button>
        </div>
      </div>
      <div className="copyright-section">
        <p>Copyright (c) 2024 Norbert Yemuang Bope</p>
        <a
          href="https://github.com/Bope142/secure-password-generator.git"
          className="link-extern"
        >
          <FaGithub />
        </a>
      </div>
      <ToastContainer />
    </main>
  );
}

export default App;
