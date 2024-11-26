import React from "react";

const File = ({type, name}) => {
  return (
    <>
      <img src={type} alt="" />
      <p>{name}</p>
    </>
  );
};

export default File;
