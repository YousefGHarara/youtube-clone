import "./playVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";

import React, { useEffect, useState } from "react";
import API_KEY, { value_converter } from "../../data";
import { useParams } from "react-router-dom";
import moment from "moment";

const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  const fetchVideoData = async () => {
    const videoDetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => {
        if(!res.ok) {
          throw Error("Couldn't found data !!")
        }
        return res.json()
      })
      .then((data) => {
        setApiData(data.items[0]);
        // console.log(data.items[0]);
      })
      .catch((err) => {
        setError(err.message)
      });

    // console.log("OOOOOOOOOOOOOOOOOOOOOOO First OOOOOOOOOOOOOOOOOOOOOOo");
  };

  const fetchChannel = async () => {
    // Fetching Channel Data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
      apiData ? apiData.snippet.channelId : ""
    }&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((res) => {
        if(!res.ok) {
          throw Error("Channel Data Not !!")
        }
        return res.json()
      })
      .then((data) => {
        setChannelData(data.items[0]);
        // console.log("Channel Data API : ");
        // console.log(data.items[0]);
      })
      .catch((err) => {
        setError(err.message)
      });
    // console.log("OOOOOOOOOOOOOOOOOOOOOOO Second OOOOOOOOOOOOOOOOOOOOOOo");

    // Fetching Comment Data
  };

  const fetchComment = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => {
        if(!res.ok) {
          throw Error("Comment Data Not !!")
        }
        return res.json()
      })
      .then((data) => {
        setCommentData(data.items[0]);
        setPending(false)
        // console.log("Comment list : ");
        // console.log(data.items[0]);
      })
      .catch((err) => {
        setError(err.message)
      });
    // console.log("OOOOOOOOOOOOOOOOOOOOOOO Third OOOOOOOOOOOOOOOOOOOOOOo");
  };

  useEffect(() => {
    fetchVideoData();
    console.log("First Effect");
    console.log("api data : ", apiData);
  }, [videoId]);

  // useEffect(() => {
  //   fetchChannel();
  //   console.log("2 Effect");
  //   console.log("channel data : ", channelData);
  // }, [apiData]);

  useEffect(() => {
    fetchComment();
    console.log("3 Effect");
    console.log("comment data : ", commentData);
  }, [apiData]);

  return (
    <>
      {apiData && channelData && commentData.snippet ? (
        <div className="play-video">
          {/* add iframe here */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="【ケルト音楽/Celtic Music】冒険者と古代遺跡【作業用・勉強用・睡眠用BGM】"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* <iframe
        src="https://www.youtube.com/embed/"
        title="- الدرس الثاني - دورة تعلم فوتوشوب للمبتدئين Adobe Photoshop 2021"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}

          <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
          <div className="play-video-info">
            <p>
              {apiData ? value_converter(apiData.statistics.viewCount) : "16K"}{" "}
              views &bull;{" "}
              {apiData
                ? moment(apiData.snippet.publishedAt).fromNow()
                : "3 day"}
            </p>

            <div>
              <span>
                <img src={like} alt="" />{" "}
                {apiData ? value_converter(apiData.statistics.likeCount) : 155}
              </span>
              <span>
                <img src={dislike} alt="" /> 3
              </span>
              <span>
                <img src={share} alt="" />
                Share
              </span>
              <span>
                <img src={save} alt="" />
                Save
              </span>
            </div>
          </div>

          <hr />
          <div className="publisher">
            <img
              src={
                channelData ? channelData.snippet.thumbnails.default.url : ""
              }
              alt=""
            />
            <div>
              <p>
                {apiData ? apiData.snippet.channelTitle : "Channel Title Here"}
              </p>
              <span>
                {channelData
                  ? value_converter(channelData.statistics.subscriberCount)
                  : ""}{" "}
                Subscribers
              </span>
            </div>
            <button>Subscribe</button>
          </div>

          <div className="vid-description">
            <p>
              {apiData
                ? apiData.snippet.description.slice(0, 250)
                : "Description Here"}
            </p>
            <hr />
            <h4>
              {apiData
                ? value_converter(apiData.statistics.commentCount)
                : "102"}{" "}
              Comments
            </h4>

            {/* ------------------------------------------------ */}

            {commentData
              ? commentData.map((item, index) => {
                  return (
                    <div className="comment" key={index}>
                      <img
                        src={
                          item.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        alt=""
                      />

                      <div>
                        <h3>
                          {
                            item.snippet.topLevelComment.snippet
                              .authorDisplayName
                          }{" "}
                          <span>1 day ago</span>
                        </h3>

                        <p>
                          {item.snippet.topLevelComment.snippet.textDisplay}
                        </p>

                        <div className="comment-action">
                          <img src={like} alt="" />
                          <span>
                            {value_converter(
                              item.snippet.topLevelComment.snippet.likeCount
                            )}
                          </span>

                          <img src={dislike} alt="" />
                        </div>
                      </div>
                    </div>

                    // <div className="comment">
                    //   <img src={user_profile} alt="" />
                    //   <div>
                    //     <h3>
                    //       Jack Nicholson <span>1 day ago</span>
                    //     </h3>
                    //     <p>
                    //       Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    //       Similique eius voluptas ducimus totam, cupiditate
                    //       aspernatur, consequatur ut dolorum architecto aliquam quod
                    //       tempore ex ipsam! Ipsa dolorum accusantium natus
                    //       consequatur optio.
                    //     </p>
                    //     <div className="comment-action">
                    //       <img src={like} alt="" />
                    //       <span>132</span>
                    //       <img src={dislike} alt="" />
                    //     </div>
                    //   </div>
                    // </div>
                  );
                })
              : ""}

            {/* ------------------------------------------------ */}
          </div>
        </div>
      ) : (
        <p>Loading . . .</p>
      )}
    </>
  );
  // {(apiData && channelData && commentData ) ? }
};

export default PlayVideo;
