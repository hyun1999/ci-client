import React, { useState, useEffect } from "react";
import { createBoard, getBoard } from "../board";

function Board() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetchBoardList();
  }, []);

  const fetchBoardList = async () => {
    const response = await getBoard();
    setBoardList(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBoard({ name, text });
    fetchBoardList();
    setName("");
    setText("");
    console.error("Error creating board post:", error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-text">
        <label>
          이름:
          <input
            className="text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          텍스트:
          <input
            className="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">제출</button>
      </form>
      <div>
        <h2>게시판 목록</h2>
        <ul>
          {boardList.map((post, index) => (
            <li key={index}>
              {post.name}: {post.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Board;
