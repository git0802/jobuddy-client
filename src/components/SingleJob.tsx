import React from "react";

const SingleJob = () => {
  return (
    <div className="single-job">
      <div className="top">
        <div className="img"></div>
        <div className="text-wra">
          <h4>Senior Full Stack Developer</h4>
          <div className="flex">
            <p>ABC Company</p>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99996 1.44043C5.19996 1.44043 2.66663 3.5871 2.66663 6.9071C2.66663 9.0271 4.29996 11.5204 7.55996 14.3938C7.81329 14.6138 8.19329 14.6138 8.44663 14.3938C11.7 11.5204 13.3333 9.0271 13.3333 6.9071C13.3333 3.5871 10.8 1.44043 7.99996 1.44043ZM7.99996 8.1071C7.26663 8.1071 6.66663 7.5071 6.66663 6.77376C6.66663 6.04043 7.26663 5.44043 7.99996 5.44043C8.73329 5.44043 9.33329 6.04043 9.33329 6.77376C9.33329 7.5071 8.73329 8.1071 7.99996 8.1071Z"
                  fill="#1C1C1C"
                  fill-opacity="0.6"
                />
              </svg>
              <p className="ml-2">Warsaw</p>
            </div>
          </div>
        </div>
        <p className="price">$2100</p>
      </div>
      <p className="des">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="tags">
        <p>Remote</p>
        <p>Senior</p>
      </div>
    </div>
  );
};

export default SingleJob;
