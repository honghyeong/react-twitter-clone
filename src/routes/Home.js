import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import Nweet from "../components/Nweet";
import {
  getDocs,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweeted, setTweeted] = useState([]);

  // const getTweeted = async () => {
  //   const dbTweeted = await getDocs(collection(dbService, "tweets"));
  //   dbTweeted.forEach((doc) => {
  //     const tweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweeted((prev) => [tweetObject, ...prev]);
  //   }); // setState에 function을 넣으면 전의 데이터를 전달받을 수 있다.
  // };

  // 실시간 tweet list 반영
  useEffect(() => {
    // getTweeted();
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTweeted(tweetArray);
      console.log(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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
            <Nweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={userObj.uid === tweet.creatorId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
