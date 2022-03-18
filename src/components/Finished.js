import React, { useEffect, useState } from "react";

function Finished(props) {
  const [finishedContent, setFinishedContent] = useState(
    props.anotherList.filter((v, i) => v.finished === true)
  );

  return (
    <>
      <div className="finished-list-box">
        {finishedContent.map((todoContent, index) => {
          return (
            <>
              <div className="finished-list-content">
                <div className="finished-list-content-single">
                  <div>{todoContent.content}</div>
                  <div>{todoContent.finishedTime}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default Finished;
