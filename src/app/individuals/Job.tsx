import { useState, useEffect } from "react";
import Skill from "./skill";
import { format } from "date-fns";
const Job = (jobdetail) => {
  const [expiretime, setExpitreTime] = useState("");
  const [posttime, setPostTime] = useState("");
  useEffect(() => {
    if (jobdetail.jobdetail != undefined) {
      const inputDate = jobdetail.jobdetail.job_offer_expiration_datetime_utc;
      const postDate = jobdetail.jobdetail.job_posted_at_datetime_utc;
      const date = new Date(inputDate);
      const outputDate = format(date, "MMMM d, yyyy");
      const date1 = new Date(postDate);
      const PostTime = format(date1, "MMMM d, yyyy");

      setExpitreTime(outputDate);
      setPostTime(PostTime);
    }
  }, [jobdetail]);

  return (
    <>
      {jobdetail.jobdetail != undefined ? (
        <div
          className="px-[16px] grid gap-3 border-[#a0aec0] border-[1px] rounded-[16px] text-start"
          id="ai-bots"
        >
          <div className="text-center text-[36px] font-bold text-[white] py-8">
            {jobdetail.jobdetail.job_title}
          </div>

          <div className="text-[#718096] text-[20px] font-semibold">
            <a
              href={
                jobdetail.jobdetail.employer_website
                // ? jobdetail.jobdetail.employer_website
                // : ""
              }
            >
              {jobdetail.jobdetail.employer_name}
            </a>
          </div>
          <hr className="border-[#303641]" />
          <div className="flex gap-1 mb-1 ">
            <span className="px-[3px] text-[14px] font-bold text-[#d09497] border-[2px] border-[#d09497]">
              Post Time:{posttime}
            </span>
            <span className="px-[3px] text-[14px] font-bold text-[#78aacc] border-[2px] border-[#78aacc]">
              LOCATION: {jobdetail.jobdetail.job_city}
              {jobdetail.jobdetail.job_country}
            </span>
            <span className="px-[3px] text-[14px] font-bold text-[#7e78cc] border-[2px] border-[#8a78cc]">
              Expire Time:
              {expiretime}
            </span>

            {jobdetail.jobdetail.job_job_title && <span className="px-[3px] text-[14px] font-bold text-[#80be99] border-[2px] border-[#80be99]">
              SENIORITY: {jobdetail.jobdetail.job_job_title}
            </span>}
            
          </div>
          <hr className="border-[#303641]" />
          <div>
            <span className="px-[3px] text-[14px] font-bold text-white bg-[#3a404c]">
              PERFORMANCE: {jobdetail.jobdetail.job_employment_type}
            </span>
          </div>
          {jobdetail.jobdetail.job_required_skills && <>
          <hr className="border-[#303641]" />
          <div>
            <span className="px-[3px] text-[14px] font-bold text-white bg-[#3a404c]">
              <Skill skill={jobdetail.jobdetail.job_required_skills} />
            </span>
          </div>
          </>
          }
          
          <hr className="border-[#303641]" />
          <div>
            <button className="px-[12px] bg-[#90cdf4] font-[16px] hover:bg-[#63B3ED] rounded-[5px]">
              <a href={jobdetail.jobdetail.job_apply_link}>Apply</a>
            </button>
          </div>
          <hr className="border-[#303641]" />

          <div className="text-white font-bold text-[36px]">Description</div>
          <div>
            <p className="text-white overflow-auto scroll max-h-[300px] ">
              {jobdetail.jobdetail.job_description}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Job;
