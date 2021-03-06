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
            <React.Fragment key={todoContent.id}>
              <div className="finished-list-content">
                <div className="finished-list-content-single">
                  <div className="finished-main-content">
                    {todoContent.content}
                  </div>
                  <div className="finished-time">
                    {todoContent.finishedTime}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
export default Finished;
