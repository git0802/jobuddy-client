export default function Skill({ skill }) {

  return (
    <>
      {skill ? (
        skill.map((i) => (
          <span
            className="px-[3px] text-[14px] font-bold text-[#d7e8f0] bg-[#3a404c]"
            key={i}
          >
            {i}
          </span>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
