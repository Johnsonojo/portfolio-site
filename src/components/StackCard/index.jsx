// import { useState } from "react";
import "./style.scss";

const StackCard = ({ stackList, title }) => {
  // const [isHovering, setIsHovering] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

  return (
    <div className="h-100 wrapper my-3">
      <h4 className="px-2 py-2">{title}</h4>
      <div className="stack-wrapper">
        {stackList.map((stack) => (
          <div
            key={stack?.id}
            style={{
              color: `${stack?.color}`,
              backgroundColor: `${stack?.background}`,
              borderRadius: "5px",
              transition: "all 0.5s ease-in-out",
            }}
            // style={{
            //   color: isHovering ? `${stack?.color}` : "",
            //   backgroundColor: isHovering ? `${stack?.background}` : "",
            //   borderRadius: isHovering ? "5px" : "",
            //   transition: "all 0.5s ease-in-out",
            // }}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            {stack?.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackCard;
