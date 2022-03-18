import React, { useState, useEffect } from "react";
import moment from "moment";

function Unfinished(props) {
  // console.log("props.list 1", props.list);
  // console.log("props.anotherList", props.anotherList);

  // 刪除
  function handleRemove(todoId) {
    const removeResult = props.anotherList.filter((v, i) => v.id !== todoId);
    console.log("removeResult", removeResult);
    let newlist = removeResult;
    props.setAnotherList(newlist);
    props.setTodoContent(newlist.filter((v, i) => v.finished === false));
    let listString = JSON.stringify(newlist);
    localStorage.setItem("list", listString);
  }

  // 待完成變已完成
  function handleFinished(id) {
    let finishedTime = moment().format("YYYY-MM-DD");
    // console.log("props.list 2", props.list);
    const finishedResult = props.anotherList.map((todoContent) => {
      if (todoContent.id === id) {
        // console.log("todoContent 1", todoContent);
        return { ...todoContent, finished: true, finishedTime: finishedTime };
      } else {
        // console.log("todoContent 2", todoContent);
        return { ...todoContent };
      }
    });
    // console.log("finishedResult", finishedResult);
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
            <>
              <div className="unfinished-list-content">
                <div className="unfinished-list-content-single">
                  {/* <input
                    type="radio"
                    onClick={() => handleFinished(todoContent.id)}
                  /> */}
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
            </>
          );
        })}
      </div>
    </>
  );
}
export default Unfinished;
