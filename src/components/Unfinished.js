import React from "react";
import moment from "moment";

function Unfinished(props) {
  // 刪除
  function handleRemove(todoId) {
    const removeResult = props.anotherList.filter((v, i) => v.id !== todoId);
    let newlist = removeResult;
    props.setAnotherList(newlist);
    props.setTodoContent(newlist.filter((v, i) => v.finished === false));
    let listString = JSON.stringify(newlist);
    localStorage.setItem("list", listString);
  }

  // 待完成變已完成
  function handleFinished(id) {
    let finishedTime = moment().format("YYYY-MM-DD");

    const finishedResult = props.anotherList.map((todoContent) => {
      if (todoContent.id === id) {
        return { ...todoContent, finished: true, finishedTime: finishedTime };
      } else {
        return { ...todoContent };
      }
    });

    let newlist = finishedResult;
    props.setAnotherList(newlist);
    props.setTodoContent(newlist.filter((v, i) => v.finished === false));
    let listString = JSON.stringify(newlist);
    localStorage.setItem("list", listString);
  }
  return (
    <>
      <div className="unfinished-list-box">
        {props.todoContent.map((todoContent, index) => {
          return (
            <React.Fragment key={todoContent.id}>
              <div className="unfinished-list-content">
                <div className="unfinished-list-content-single">
                  <div className="unfinished-main-content">
                    {todoContent.content}
                  </div>
                  <div className="remove-finish-btn">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(todoContent.id)}
                    >
                      刪除
                    </button>
                    <button
                      className="finish-btn"
                      onClick={() => handleFinished(todoContent.id)}
                    >
                      完成
                    </button>
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
export default Unfinished;
