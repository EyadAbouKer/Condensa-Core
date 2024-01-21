import React, { StrictMode, useState } from "react";
import "./Body.css";
import "./SubmitButton.js";
import SearchBar from "./SearchBar.js";
import SubmitButton from "./SubmitButton.js";
import DropDownMenu from "./DropDownMenu.js";
import TextOutputFeild from "./TextOutputFeild.js";
import axios from "axios";

// const API_KEY = "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";

const Body = () => {
  // a hook to dynamically disable Submit button when users should not click it.
  const [isDisabled, setIsDisabled] = useState(true);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  let transcript = "";

  // a hook to SubmitButton and SearchBar together
  const [getURL, setURL] = React.useState("");

  //works with SearchBar to get the input from and update the setURL. it also disables Submit button if search bar is empty.
  const handleInputChange = (e) => {
    setURL(e.target.value);
    if (e.target.value !== "") setIsDisabled(false);
    else setIsDisabled(true);
  };

  {
    /* /----------------------------------------------------------------------------/ */
  }
  async function sendStringToServer(stringValue) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/getURL",
        { URL: stringValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        // dropDown lists values definition.
  const depthItems = [
    { value: "brief", label: "brief" },
    { value: "normal", label: "normal" },
    { value: "detailed", label: "detailed" },
  ];
  const toneItems = [
    { value: "funny", label: "funny" },
    { value: "normal", label: "normal" },
    { value: "formal", label: "formal" },
  ];
  const styleItems = [
    { value: "paragraph", label: "paragraph" },
    { value: "bullet points", label: "bullet points" },
    { value: "abstract", label: "abstract" },
  ];
