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
// to keep track of the selected dropdown values.
let [selectedDepthOption, setSelectedDepthOption] = useState("brief");
let [selectedToneOption, setSelectedToneOption] = useState("normal");
let [selectedStyleOption, setSelectedStyleOption] = useState("paragraph");

// summary hook to rerender the summary when the output from chatGPT is generated.
const [summary, setSummary] = useState("");
const [text, setText] = useState("");

// to update the summary when we don't need to rerender it.
let summaryVariable = "";
// to keep track of the important keywords returned by the request from ChatGPT.
let importantKeywords = [""];


//works with SearchBar to get the input from and update the setURL. it also disables Submit button if search bar is empty.
const handleInputChange = (e) => {
  setURL(e.target.value);
  if (e.target.value !== "") setIsDisabled(false);
  else setIsDisabled(true);
};

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
    console.log("Response:", response.data);
    console.log(typeof response.data);
    transcript = response.data;
    // Any code here will execute after the response is received
  } catch (error) {
    console.error("Error:", error);
  }
}

/* /----------------------------------------------------------------------------/ */
/* /----------------------------------------------------------------------------/ */

async function summarizeIt() {
  const chatGptApiBody_Summarize = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
        "give a short explanation the of the main concepts this video is explaining " +
        { selectedDepthOption } +
        ", " +
        { selectedToneOption } +
        ", and in " +
        { selectedStyleOption } +
        " format:",
      },
      {
        role: "user",
        content:
        "give a short explanation the of the main concepts this video is explaining " +
        { selectedDepthOption } +
        ", " +
        { selectedToneOption } +
        ", and in " +
          { selectedStyleOption } +
          " format: " +
          transcript,
        },
      ],
    temperature: 0.5,
    max_tokens: 400,
    top_p: 0.8,
  };

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(chatGptApiBody_Summarize),
  })
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    console.log(data);
    summaryVariable = data.choices[0].message.content;
    });
}

    /* /----------------------------------------------------------------------------/ */
  };

  export default Body;