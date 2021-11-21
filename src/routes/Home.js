import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { getDocs, addDoc, collection } from "firebase/firestore";
const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweeted, setTweeted] = useState([]);

  const getTweeted = async () => {
    const dbTweeted = await getDocs(collection(dbService, "tweets"));
    dbTweeted.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTweeted((prev) => [tweetObject, ...prev]);
    }); // setState에 function을 넣으면 전의 데이터를 전달받을 수 있다.
  };

  useEffect(() => {
    getTweeted();
  }, []);

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
      <div>
        {tweeted.map((tweet) => {
          return (
            <div key={tweet.id}>
              <h4>{tweet.tweet}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
