import React from "react";

const HowWorks = () => {
  return (
    <div className="text-center py-24 mt-28">
      <h2 className="text-5xl font-semibold">
        Search with <span className="text-infraYellow">AI</span> → Reach Out →{" "}
        <span className="text-infraYellow">Hired</span>
      </h2>
      <div className="flex flex-col md:flex-row mx-auto px-8 md:px-12 lg:px-36 justify-between text-center mt-24 gap-4">
        <div>
          <img src="/images/chatjobuddygpt.png" className="h-64" />
          <p className="font-semibold text-xl mt-4">Chat with AI</p>{" "}
          <p className="max-w-sm text-xl">
            based on skills, location, seniority level, salary, current and past
            employment
          </p>
        </div>
        <div>
          <img src="/images/findjobs.png" className="h-64" />
          <p className="font-semibold text-xl mt-4">
            Shortlist jobs suggested by AI
          </p>{" "}
          <p className="max-w-sm text-xl">
            based on various online job portals, company websites, and other
            sources
          </p>
        </div>
        <div>
          <img src="/images/interview.png" className="h-64" />
          <p className="font-semibold text-xl mt-4">
            Apply to job & get interviewed
          </p>{" "}
          <p className="max-w-sm text-xl">
            profiles by skills, location, seniority level, current and past
            employment
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
