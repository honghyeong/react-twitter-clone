import React, { useState } from "react";
import { dbService } from "../fBase";
import { addDoc, collection } from "firebase/firestore";
const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        tweet,
        createAt: Date.now(),
      });
      console.log("Document Written", docRef);
    } catch (e) {
      console.log("Error adding document: ", e);
    }

    setTweet("");
  };

  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What is on your mind?"
          value={tweet}
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};

export default Home;
