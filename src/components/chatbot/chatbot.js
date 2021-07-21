import React from "react";
import { useState, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import "./chatbot.styles.css";
import ChatbotHeader from "../chatbot-header/ChatbotHeader";
import GrapefruitLogo from "../grapefruit-logo/GrapefruitLogo";
import UserIcon from "../user-icon/UserIcon";
import TelegramSubmit from "../telegram-submit/TelegramSubmit";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handle = useFullScreenHandle();

  async function df_text_query(queryText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText,
        },
      },
    };
    console.log(says);
    messages.push(says);
    const res = await axios.post(
      "https://evening-retreat-02820.herokuapp.com/https://aqueous-dusk-26803.herokuapp.com/api/df_text_query",
      {
        text: queryText,
      }
    );
    if (res.data.parameters.fields["number-sequence"]) {
      console.log(res.data.parameters.fields["number-sequence"].stringValue);
    }
    console.log(res.data.fulfillmentMessages);
    for (let msg of res.data.fulfillmentMessages) {
      const botSays = {
        speaks: "bot",
        msg,
      };
      //this promise resolution is causing a 2sec delay befor setting the
      //new messages to state

      setMessages([...messages, botSays]);
    }
  }

  //some theory for the above method but this method
  //will be handling our event queries as opposed to text
  async function df_event_query(eventName) {
    const res = await axios.post(
      "https://evening-retreat-02820.herokuapp.com/https://aqueous-dusk-26803.herokuapp.com/api/df_event_query",
      {
        event: eventName,
      }
    );
    console.log("this is the res:", res);
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg,
      };
      setMessages([...messages, says]);
    }
  }

  useEffect(() => {
    df_event_query("welcome");
  }, []);

  const handlekeyPress = (e) => {
    if (e.key === "Enter") {
      df_text_query(e.target.value);

      e.target.value = "";
      console.log(e.target.value);
    }
  };

  return (
    <>
      <button onClick={handle.enter}>Enter Full</button>

      <FullScreen handle={handle} className="chatbot-container">
        <div className="chatbot-container">
          <ChatbotHeader />
          <div className="chat-body">
            {messages.map((message, i) => {
              if (message.speaks === "user") {
                return (
                  <div key={i} className="user-bubble-container">
                    <p className="user-bubble-text">{message.msg.text.text}</p>
                    <UserIcon />
                  </div>
                );
              }
              if (message.speaks === "bot") {
                return (
                  <div key={i} className="bot-bubble-container">
                    <GrapefruitLogo />
                    <p className="bot-bubble-text">{message.msg.text.text}</p>
                  </div>
                );
              }
            })}
          </div>
          <div className="user-input">
            <input
              className="text-input"
              placeholder="Say Something..."
              onKeyPress={handlekeyPress}
            />
            <TelegramSubmit />
          </div>
        </div>
      </FullScreen>
    </>
  );
};

export default Chatbot;
