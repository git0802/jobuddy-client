import { useState, useEffect, useRef } from "react";
import Service from "../../services/index";
import Skill from "./skill";
import { Upload, message, Tabs, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SingleJob from "@/components/SingleJob";
import Job from "./Job";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      text: "Hey there, I'm your Career Pilot, a personal career assistant, I'm tracking many recently posted roles at startups, so let's start with your LinkedIn URL to quickly find some matches for you! (e.g. https://www.linkedin.com/in/beiercai)",
      type: 1,
    },
  ]);
  const [profile, setProfile] = useState([]);
  const [skill, setSkill] = useState("");
  const [sentMsg, setSentMsg] = useState("");
  const [jobdetail, setJobdetail] = useState([]);
  const [number, setNumber] = useState(15);
  const [profilelink, setProfilelink] = useState("");
  const [profiletitle, setProfiletitle] = useState("FullStack");
  const [gettingReply, setGettingReply] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [jobloading, setJobloading] = useState(false);
  const [qlocation, setqLocation] = useState("");
  const [qsalary, setqSalary] = useState("");
  const [qskill, setqSkill] = useState("");
  const [qnumber, setqnumber] = useState(0);
  const chatRef = useRef(null);
  const [searchdata, setSearchdata] = useState({
    query: " India",
    remote: false,
    type: "",
    date: "",
  });

  useEffect(() => {}, [skill, jobdetail, number]);

  useEffect(() => {
    if (number < 14) skilltoindeed(searchdata);
  }, [searchdata]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const beforeUpload = (file) => {
    const allowedDocTypelist = [
      {
        type: "application/pdf",
        extension: ".pdf",
      },
      {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        extension: ".docx",
      },
      {
        type: "text/plain",
        extension: ".txt",
      },
    ];
    setUploadingDoc(true);
    let filelist = [];
    filelist.push(file);
    if (Service.isAllowedFile(allowedDocTypelist, filelist)) {
      Service.uploadTrainData({
        file,
        namespace: "Linkdin",
      }).then(
        (res) => {
          setProfilelink(res.data.label);
          Service.getReply(
            "What skills are described in this? such as javascript. name only."
          ).then(
            async (res) => {
              console.log("<<<<<<<<<<<<<<<", res.data);
              res.data.type = 1;
              const str =
                typeof res.data.text === "string" ? res.data.text : "";
              const arr = str.split(",").map((s) => s.trim());
              setSkill(arr);

              // let data = messages;
              // data.push({ text: "Your resume has been successfully uploaded. What type of work would you like to do?", type: 1 });
              // chatRef.current.scrollTop = chatRef.current.scrollHeight;

              let query = searchdata.query;
              arr.map((index, i) => {
                if (i > 3) return;
                if (!index.includes(" ")) {
                  console.log(index, index.includes(" "));
                  setqSkill(index);
                  // query +=" "+ index + " ";
                }
              });
              if (!qlocation.includes("India")) {
                setqLocation(" In India");
              }
              setSearchdata({ ...searchdata, query: `${qskill} ${qlocation}` });
              skilltoindeed(searchdata);
              setUploadingDoc(false);
            },
            (err) => {
              message.error(
                "Sorry, but There seem to be a little problem on server side."
              );
              setGettingReply(false);
            }
          );
        },
        (error) => {
          message.error(
            "Sorry, but There seem to be a little problem on server side."
          );
        }
      );
    }
  };

  const skilltoindeed = (data) => {
    Service.getIndeedjob(data).then(
      (res) => {
        setNumber(0);
        setJobdetail(res.data);
        setqnumber(res.data.length);
        setJobloading(false);
        console.log(res.data, res.data.length);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSendMessage = async () => {
    if (sentMsg.trim()) {
      let data = messages;
      data.push({ text: sentMsg, type: 0 });
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      setGettingReply(true);
      setJobloading(true);
      const hasLinkedIn = sentMsg.includes("www.linkedin");

      Service.getReplyQA({ sentMsg }).then(
        async (res) => {
          // let data = messages;
          // data.push({ text: res.data.ask, type: 1 });
          // chatRef.current.scrollTop = chatRef.current.scrollHeight;

          if (hasLinkedIn) {
            setProfilelink(sentMsg);

            Service.getBots(sentMsg).then(
              async (res) => {
                setProfile(res.data);
                setSkill(res.data.skills);
                // setProfiletitle(res.data);
                console.log(res.data.skills);
                let query = searchdata.query;
                await res.data.skills.map((index, i) => {
                  if (i > 2) return;
                  if (!index.includes(" ")) {
                    console.log(index, index.includes(" "));
                    setqSkill(index);
                    query += " " + index + " ";
                  }
                });
                if (!qlocation.includes("India")) {
                  setqLocation(" In India");
                }
                setSearchdata({
                  ...searchdata,
                  query: `${qskill} ${qlocation}`,
                });
                skilltoindeed(searchdata);
                setGettingReply(false);
                let data = messages;
                data.push({
                  text: "Thank you for your Linkdin information. Could you tell me about your finding Job title?",
                  type: 1,
                });
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            console.log("!!!!!!!!!!!!!!", res.data.label);

            switch (res.data.label) {
              case "type":
                setSearchdata({ ...searchdata, type: sentMsg });
                break;
              case "remote":
                setSearchdata({ ...searchdata, remote: true });
                break;
              case "Salary": {
                setSearchdata({ ...searchdata, remote: true });
                setqSalary(sentMsg);
                let data = messages;
                data.push({
                  text: "Thank you for your Salary information. Please check your favourite job.",
                  type: 1,
                });
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
                break;
              }
              case "Location": {
                setqLocation(res.data.ask);
                const newSearchdata = {
                  ...searchdata,
                  query: `${qskill} ${res.data.ask.split(",")[0].trim()}`,
                };
                setSearchdata(newSearchdata);
                let data = messages;
                data.push({
                  text: "Thank you for your Location information. Could you tell me about your Salery?",
                  type: 1,
                });
                // setMessages(data);
                chatRef.current.scrollTop = chatRef.current.scrollHeight;

                break;
              }
              case "Job title":
                const newSearchdata = {
                  ...searchdata,
                  query: `${sentMsg} ${qskill}  ${qlocation}`,
                };
                setSearchdata(newSearchdata);
                setProfiletitle(sentMsg);
                let data = messages;
                data.push({
                  text: "Thank you for your Job title information. Could you tell me about your Location?",
                  type: 1,
                });
                // setMessages(data);
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
                break;
            }

            console.log(searchdata, "!!!!!");

            setGettingReply(false);
          }
        },
        (err) => {
          message.error(
            "Sorry, but There seem to be a little problem on server side."
          );
        }
      );

      setSentMsg("");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <svg
          className="svg-icon"
          style={{
            width: 20,
            height: 20,
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden",
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M303.845193 890.605897c-2.653433 0-4.635577-0.669242-5.957689-1.991354-6.618744-2.644223-9.93221-7.236821-9.93221-13.897521L287.955294 731.715097 129.064494 731.715097c-18.541285 0-33.760918-5.965875-45.684482-17.880229C71.464635 701.919491 65.50797 686.733627 65.50797 668.158572L65.50797 191.484126c0-18.541285 5.957689-33.770128 17.872043-45.684482 11.923564-11.914354 27.143197-17.872043 45.684482-17.872043l762.678296 0c18.533099 0 33.760918 5.957689 45.684482 17.872043 11.914354 11.914354 17.872043 27.143197 17.872043 45.684482l0 476.673423c0 18.575054-5.957689 33.760918-17.872043 45.676295-11.923564 11.914354-27.151383 17.880229-45.684482 17.880229L484.582557 731.714074 313.77638 886.631376C311.12397 889.317555 307.818691 890.605897 303.845193 890.605897zM129.064494 159.706375c-21.185508 0-31.777751 10.627035-31.777751 31.777751l0 476.673423c0 21.185508 10.592242 31.778774 31.777751 31.778774l174.780699 0c10.593266 0 15.888875 5.296633 15.888875 15.888875l0 123.138528 148.959613-135.062092c2.65241-2.644223 5.957689-3.966335 9.93221-3.966335l413.116899 0c21.185508 0 31.778774-10.593266 31.778774-31.778774L923.521564 191.484126c0-21.151739-10.593266-31.777751-31.778774-31.777751L129.064494 159.706375z" />
        </svg>
      ),
      children: (
        <>
          <div className="chat-conatainer">
            <div className="jobs-wrapper" ref={chatRef}>
              <SingleJob />
              <SingleJob />
              <SingleJob />
              <SingleJob />
            </div>
            <div className="chat-wrapper">
              <h3>
                Chat with <span>Career Pilot</span>
              </h3>
              <div className="chat-main">
                {messages.map((message, index) => (
                  <p className={message.type === 1 ? "recive" : "send"}>
                    {message.text}
                  </p>
                ))}
                <Spin
                  spinning={gettingReply}
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                ></Spin>
                <div className="input-wra">
                  <input
                    type="text"
                    onChange={(e) => {
                      setSentMsg(e.target.value);
                    }}
                    placeholder="Ask me anything....."
                  />
                  <button className="send-btn" onClick={handleSendMessage}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.1686 6.83145L9.24852 12.3303L0.964497 9.5686C0.386258 9.37546 -0.00330584 8.83294 2.11451e-05 8.22344C0.00339191 7.61395 0.397421 7.07476 0.977892 6.88836L22.1573 0.0678197C22.6607 -0.0940207 23.2133 0.0387961 23.5873 0.412776C23.9612 0.786755 24.0941 1.3393 23.9322 1.84277L17.1117 23.0221C16.9253 23.6026 16.3861 23.9966 15.7766 24C15.1671 24.0033 14.6246 23.6138 14.4314 23.0355L11.6563 14.7114L17.1686 6.83145Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-wrapper">
              <h3 className="profile">Profile</h3>
              <div className="img">
                <p>NP</p>
              </div>
              <p className="name">Nikhil Panchal</p>
              <p className="email">npanchal161@gmail.com</p>
              <span className="label">Job Title:</span>
              <p className="value">Full Stack Developer</p>
              <span className="label">Phone:</span>
              <p className="value">+91 8235629881</p>
              <span className="label">Location</span>
              <p className="value">Mumbai</p>
              <div className="divider"></div>
              <span className="value">Attachments</span>
              <div className="flex items-align justify-between">
                <p className="label">My Resume.pdf</p>
                <div className="flex items-align">
                  <p
                    className="label"
                    style={{ color: "#7678ED", marginRight: "20px" }}
                  >
                    Change
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.2501 4.75794C14.9251 4.43294 14.4001 4.43294 14.0751 4.75794L10.0001 8.82461L5.9251 4.74961C5.6001 4.42461 5.0751 4.42461 4.7501 4.74961C4.4251 5.07461 4.4251 5.59961 4.7501 5.92461L8.8251 9.99961L4.7501 14.0746C4.4251 14.3996 4.4251 14.9246 4.7501 15.2496C5.0751 15.5746 5.6001 15.5746 5.9251 15.2496L10.0001 11.1746L14.0751 15.2496C14.4001 15.5746 14.9251 15.5746 15.2501 15.2496C15.5751 14.9246 15.5751 14.3996 15.2501 14.0746L11.1751 9.99961L15.2501 5.92461C15.5668 5.60794 15.5668 5.07461 15.2501 4.75794Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            style={{
              overflow: "auto",
              flex: 1,
              margin: "auto",
              width: "100%",
              // maxHeight: "300px",
            }}
            className="bg-[#F5F6FA] rounded-[16px]"
            ref={chatRef}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: `${
                    message.type == 1 ? "flex-start" : "flex-end"
                  }`,
                }}
              >
                <div
                  style={{
                    backgroundColor: `${
                      message.type == 1 ? "#2b6cb0" : "white"
                    }`,
                    borderRadius: "8px",
                    color: `${message.type == 1 ? "white" : "black"}`,
                    padding: "8px",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: "#00000000",
                  borderRadius: "8px",
                  color: "#222",
                  padding: "8px",
                }}
              >
                <Spin
                  spinning={gettingReply}
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                ></Spin>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginBottom: "16px",
            }}
          >
            <form className="flex w-full">
              <div className="relative w-full">
                <input
                  type="search"
                  className="block p-2.5 w-full z-20 text-sm bg-[#F5F6FA] text-[white] rounded-lg border "
                  placeholder="Type something..."
                  required
                  value={sentMsg}
                  onChange={(e) => {
                    setSentMsg(e.target.value);
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-[#F5F6FA] rounded-r-lg border hover:bg-[#273247] "
                >
                  <svg
                    className="svg-icon"
                    style={{
                      width: 16,
                      height: 20,
                      verticalAlign: "middle",
                      fill: "currentColor",
                      overflow: "hidden",
                    }}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-0.9 3.7-0.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 0.7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-0.8 4.2-2.6 5-5 1.4-4.2-0.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
                  </svg>
                </button>
              </div>
            </form>
          </div> */}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <svg
          className="svg-icon"
          style={{
            width: 20,
            height: 20,
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden",
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M461.112 919.464a1926.072 1926.072 0 0 1 59.872 52.536c-19.656 17.384-33.416 30-34.784 31.12l-25.088 20.304-25.088-20.304c-3.872-3.152-96.08-78.176-189.608-185.784C117.416 668.904 52 537.672 52 423.336V412C52 185.928 235.528 0 461.112 0c225.576 0 409.112 183.928 409.112 410v11.336c0 28.36-4.04 57.88-12.056 88.504a304.592 304.592 0 0 0-77.248-19.672c6.08-23.28 9.472-46.336 9.472-68.832V410C790.4 228.04 642.68 80 461.12 80c-181.568 0-329.28 148.04-329.28 330v11.336c0 193.2 248.392 427.096 329.28 498.128z m0-699.464c104.536 0 189.584 85.232 189.584 190S565.656 600 461.12 600C356.576 600 271.52 514.768 271.52 410S356.576 220 461.12 220z m0 80c-60.528 0-109.76 49.344-109.76 110S400.584 520 461.112 520c60.52 0 109.76-49.344 109.76-110S521.632 300 461.112 300z m437.984 538a159.52 159.52 0 0 1-17.12 41.208l50.68 50.792-56.448 56.568-50.68-50.784a158.8 158.8 0 0 1-41.12 17.152V1024h-79.824v-71.064a158.8 158.8 0 0 1-41.12-17.152l-50.68 50.784-56.448-56.568 50.68-50.792a159.52 159.52 0 0 1-17.12-41.208h-72.904v-80h72.904a159.52 159.52 0 0 1 17.12-41.208l-50.68-50.792 56.448-56.568 50.672 50.784a158.8 158.8 0 0 1 41.12-17.152V572h79.832v71.064a158.8 158.8 0 0 1 41.12 17.152l50.68-50.784 56.448 56.568-50.68 50.792a159.52 159.52 0 0 1 17.12 41.208H972v80h-72.904z m-219.76-86.144a79.68 79.68 0 0 0-14.664 46.144c0 44.112 35.808 80 79.824 80s79.824-35.888 79.824-80-35.808-80-79.824-80a79.312 79.312 0 0 0-46.04 14.704l-19.12 19.152z" />
        </svg>
      ),
      children: (
        <>
          <div className="resume-section">
            <div className="resume-dnd-sec">
              <Spin
                spinning={uploadingDoc}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              >
                <Upload
                  beforeUpload={beforeUpload}
                  accept={".pdf"}
                  multiple={true}
                >
                  <div className="flex items-center flex-col">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M68.79 21.3425C68.1801 20.0328 67.3516 18.8365 66.34 17.805L54.695 6.16C52.3386 3.83508 49.1677 2.52187 45.8575 2.5H22.5C19.186 2.50397 16.0089 3.8222 13.6655 6.16555C11.3222 8.50889 10.004 11.686 10 15V65C10.004 68.314 11.3222 71.4911 13.6655 73.8344C16.0089 76.1778 19.186 77.496 22.5 77.5H57.5C60.814 77.496 63.9911 76.1778 66.3345 73.8344C68.6778 71.4911 69.996 68.314 70 65V26.6425C69.9878 24.8088 69.5748 22.9999 68.79 21.3425ZM61.465 20H55C54.337 20 53.7011 19.7366 53.2322 19.2678C52.7634 18.7989 52.5 18.163 52.5 17.5V11.035L61.465 20ZM65 65C65 66.9891 64.2098 68.8968 62.8033 70.3033C61.3968 71.7098 59.4891 72.5 57.5 72.5H22.5C20.5109 72.5 18.6032 71.7098 17.1967 70.3033C15.7902 68.8968 15 66.9891 15 65V15C15 13.0109 15.7902 11.1032 17.1967 9.6967C18.6032 8.29018 20.5109 7.5 22.5 7.5H45.8575C46.4108 7.50491 46.9617 7.57199 47.5 7.7V17.5C47.5 19.4891 48.2902 21.3968 49.6967 22.8033C51.1032 24.2098 53.0109 25 55 25H64.8C64.928 25.5383 64.9951 26.0892 65 26.6425V65Z"
                        fill="#7678ED"
                      />
                      <path
                        d="M50 40H42.5V32.5C42.5 31.837 42.2366 31.2011 41.7678 30.7322C41.2989 30.2634 40.663 30 40 30C39.337 30 38.7011 30.2634 38.2322 30.7322C37.7634 31.2011 37.5 31.837 37.5 32.5V40H30C29.337 40 28.7011 40.2634 28.2322 40.7322C27.7634 41.2011 27.5 41.837 27.5 42.5C27.5 43.163 27.7634 43.7989 28.2322 44.2678C28.7011 44.7366 29.337 45 30 45H37.5V52.5C37.5 53.163 37.7634 53.7989 38.2322 54.2678C38.7011 54.7366 39.337 55 40 55C40.663 55 41.2989 54.7366 41.7678 54.2678C42.2366 53.7989 42.5 53.163 42.5 52.5V45H50C50.663 45 51.2989 44.7366 51.7678 44.2678C52.2366 43.7989 52.5 43.163 52.5 42.5C52.5 41.837 52.2366 41.2011 51.7678 40.7322C51.2989 40.2634 50.663 40 50 40Z"
                        fill="#7678ED"
                      />
                    </svg>
                    <h5 className="select-pdf">Select a PDF file to upload</h5>
                  </div>
                </Upload>
              </Spin>
              <p className="or-dnd">or drag and drop it here</p>
            </div>
            <div className="resume-link-sec">
              <p className="upload-url">Or upload from a URL</p>
              <div className="in-wrapper">
                <input type="text" placeholder="Add pdf file URL" />
                <button>Upload</button>
              </div>
            </div>
            {/* <div className="text-[20px]">Reset History : </div>
            <div className="mb-2">
              <button
                className="px-[8px] text-black font-medium text-[16px] w-20 bg-[#90cdf4] hover:bg-[#63B3ED] rounded-[5px]"
                onClick={() => {
                  setMessages([
                    {
                      text: "Hey there, I'm your Career Pilot, a personal career assistant, I'm tracking many recently posted roles at startups, so let's start with your LinkedIn URL to quickly find some matches for you! (e.g. https://www.linkedin.com/in/beiercai)",
                      type: 1,
                    },
                  ]);
                  setProfilelink("https://www.linkedin.com/in/beiercai");
                  setSkill("");
                  setJobdetail([]);
                }}
              >
                Reset
              </button>
            </div> */}
          </div>
          {/* <div className="flex justify-between">
            <div className="text-[20px]">Upload Resume : </div>
            <div className="mb-2">
              <Spin
                spinning={uploadingDoc}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              >
                <Upload
                  beforeUpload={beforeUpload}
                  accept={".pdf"}
                  multiple={true}
                >
                  <button className="px-[8px] bg-[#90cdf4] w-20 hover:bg-[#63B3ED] rounded-[5px]">
                    Upload
                  </button>
                </Upload>
              </Spin>
            </div>
          </div> */}
          {/* <hr className="border-[#303641]" />
          <div className="relative z-0 w-full mb-6 group">
              <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Posted Date</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Type</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salery</label>
          </div>
          
          <button className="px-[8px] bg-[#90cdf4] w-20 hover:bg-[#63B3ED] rounded-[5px]">
           Submit
          </button> */}
        </>
      ),
    },
  ];

  return (
    <div className="flex-col justify-center ">
      <div className="flex sm:flex-wrap  xl:max-w-[1250px] mt-[80px] gap-[8px] ">
        {skill ? (
          <div className="flex-1  min-w-[450px] w-[700px] max-w-[640px]:w-full">
            <div className="bg-[#F5F6FA] p-4 border-[1px] border-[#a0aec0] rounded-[16px]">
              <Tabs
                type="card"
                items={items}
                className="bg-[#F5F6FA] text-white "
              />
            </div>
          </div>
        ) : (
          <div className="flex-1  min-w-[450px] w-[1200px] max-w-[640px]:w-full">
            <div className="bg-[#F5F6FA] p-4 border-[1px] border-[#a0aec0] rounded-[16px]">
              <Tabs
                type="card"
                items={items}
                className="bg-[#F5F6FA] text-white "
              />
            </div>
          </div>
        )}
        {skill && (
          <div className="flex-2  min-w-[450px] w-[542px] max-w-[640px]:w-full">
            <div className="bg-[#F5F6FA] p-[16px] border-[#a0aec0] border-[1px]  rounded-[16px]">
              <div className="text-white text-[30px] text-center ">Profile</div>
              <div className="text-white text-[16px]">
                {profilelink.includes("linkedin")
                  ? `Linkedin: ${profilelink}`
                  : profilelink
                  ? `FileName: ${profilelink}`
                  : "Linkedin: https://www.linkedin.com/in/beiercai"}
              </div>
              <div className="text-white text-[16px]">
                {profiletitle && <div>{`Job Title: ${profiletitle}`}</div>}
              </div>
              {qlocation && (
                <div className="text-white text-[16px]">
                  {`Location: ${qlocation}`}
                </div>
              )}
              {qsalary && (
                <div className="text-white text-[16px]">
                  {`Salary: ${qsalary}`}
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-1 ">
                <Skill skill={skill} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="my-2 ">
        {jobdetail[number] && (
          <div className="mx-2 text-[20px] text-center text-white font-semibold">
            {number + 1}/{qnumber}
          </div>
        )}
      </div>
      <div className="flex w-full justify-center">
        {jobdetail[number] && (
          <div className="relative xl:max-w-[1250px] sm:min-w-[650px]">
            <div className="absolute">
              <button
                onClick={() => {
                  number > 0 ? setNumber(number - 1) : setNumber(qnumber - 1);
                }}
                className=" text-lg font-large text-[#afafaf96] bg-[#d3d3d300] rounded-sm  hover:text-white mt-[270px] -ml-20"
              >
                <svg
                  className="svg-icon"
                  style={{
                    width: 70,
                    height: 70,
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: "hidden",
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M561.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L206.08 545.92A50.56 50.56 0 0 1 192 512a47.36 47.36 0 0 1 14.08-33.28L494.72 192a47.36 47.36 0 0 1 67.2 0z" />
                  <path d="M817.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L462.08 545.92A50.56 50.56 0 0 1 448 512a47.36 47.36 0 0 1 14.08-33.28L750.72 192a47.36 47.36 0 0 1 67.2 0z" />
                </svg>
              </button>
            </div>
            <div className="absolute right-0">
              <button
                onClick={() => {
                  number < qnumber - 1 ? setNumber(number + 1) : setNumber(0);
                }}
                className="text-lg font-large text-[#afafaf96] bg-[#d3d3d300] rounded-sm  hover:text-white mt-[270px] -mr-20"
              >
                <svg
                  className="svg-icon"
                  style={{
                    width: 70,
                    height: 70,
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: "hidden",
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M462.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l288.64-288.64A50.56 50.56 0 0 0 832 512a47.36 47.36 0 0 0-14.08-33.28L529.28 192a47.36 47.36 0 0 0-67.2 0z" />
                  <path d="M206.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l291.84-286.08A50.56 50.56 0 0 0 576 512a47.36 47.36 0 0 0-14.08-33.28L273.28 192a47.36 47.36 0 0 0-67.2 0z" />
                </svg>
              </button>
            </div>
            <div className="w-full">
              <Spin
                spinning={jobloading}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              >
                <Job jobdetail={jobdetail[number]} />
              </Spin>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
