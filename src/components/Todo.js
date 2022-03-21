import React, { useState } from "react";
import "../style/Todo.scss";
import moment from "moment";
import Unfinished from "./Unfinished";
import Finished from "./Finished";

function Todo() {
  let list;
  if (
    localStorage.getItem("list") === null ||
    localStorage.getItem("list").length < 3
  ) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }

  const [anotherList, setAnotherList] = useState(list);

  const [listItem, setListItem] = useState({
    id: "",
    content: "",
    finished: false,
    finishedTime: "",
  });
  const [todoContent, setTodoContent] = useState(
    list.filter((v, i) => v.finished === false)
  );
  const [tab, setTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState();

  // 新增事項
  let addTime;
  function handleChange(e) {
    addTime = moment().format("YYYYMMDDHHmmss");
    setListItem({ ...listItem, content: e.target.value, id: addTime });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (listItem.content === "") {
      setInputError(true);
      return;
    }
    setInputError(false);
    setIsLoading(true);
    await new Promise((resolve) => {
      setTimeout(function () {
        setIsLoading(false);
        resolve();
      }, 1300);
    });
    list.push(listItem);
    setAnotherList(list);
    setTodoContent(list.filter((v, i) => v.finished === false));
    let listString = JSON.stringify(list);
    localStorage.setItem("list", listString);
    setListItem({ ...listItem, content: "" });
  }

  // 切換待完成頁和已完成頁
  function handleTabsFalse() {
    setTab(false);
  }
  function handleTabsTrue() {
    setTab(true);
  }

  return (
    <>
      <main className="main">
        <div className="container">
          <div className="title-box">
            <h1 className="title">Todo List</h1>
          </div>
          <div className="add-new-box">
            <div className="add-new">
              <div className="add-new-title">新增事項</div>
              <form className="add-new-form">
                <input
                  className="new-input"
                  name="content"
                  value={listItem.content}
                  onChange={handleChange}
                  onKeyPress={
                    isLoading
                      ? (e) => {
                          e.key === "Enter" && e.preventDefault();
                        }
                      : null
                  }
                  disabled={isLoading ? true : ""}
                ></input>
                <button
                  className="add-new-btn"
                  onClick={handleSubmit}
                  disabled={isLoading ? true : ""}
                >
                  {isLoading ? "Loading..." : "送出"}
                </button>
              </form>
              <div className="error-message">
                {inputError ? "請輸入文字" : ""}
              </div>
            </div>
          </div>
          <div className="finished-or-not">
            <button className="unfinished-btn" onClick={handleTabsFalse}>
              <h2>待完成</h2>
            </button>
            <button className="finished-btn" onClick={handleTabsTrue}>
              <h2>已完成</h2>
            </button>
          </div>
          {tab ? (
            <Finished
              anotherList={anotherList}
              setAnotherList={setAnotherList}
            />
          ) : (
            <Unfinished
              list={list}
              todoContent={todoContent}
              setTodoContent={setTodoContent}
              anotherList={anotherList}
              setAnotherList={setAnotherList}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default Todo;
