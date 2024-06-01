import React, { useState, useEffect } from "react";
import { createBoard, getBoard, createComment, getComment } from "../board";

function Board() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    fetchBoardList();
    fetchCommentList();
  }, []);

  const fetchBoardList = async () => {
    const response = await getBoard();
    setBoardList(response.data);
  };

  const fetchCommentList = async () => {
    const boardResponse = await getBoard();
    const comments = {};
    for (const post of boardResponse.data) {
      const commentResponse = await getComment(post.id);
      comments[post.id] = commentResponse.data;
    }
    setCommentList(comments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBoard({ name, text });
    fetchBoardList();
    setName("");
    setText("");
  };

  const handleChange = (index, value) => {
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  };

  const handleClick = async (index) => {
    console.log(inputValues[index] || "입력값이 없습니다.");
    const postId = boardList[index].id;
    const content = inputValues[index] || "";
    if (!content.trim()) {
      console.error("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await createComment({ postId, content });
      console.log("댓글이 성공적으로 추가되었습니다.");
      await fetchCommentList();
    } catch (error) {
      console.error("댓글 추가 중 오류가 발생했습니다.", error);
    }
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
        <hr />
      </form>
      <div>
        <h2>게시판 목록</h2>

        <ul>
          <hr />

          {boardList.map((post, index) => (
            <li key={index}>
              {post.name}: {post.text}
              <h3>댓글</h3>
              {commentList[post.id] &&
                commentList[post.id].map((comment, commentIndex) => (
                  <ol key={commentIndex}>{comment.content}</ol>
                ))}
              <hr />
              <input
                type="text"
                value={inputValues[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button onClick={() => handleClick(index)}>댓글 추가</button>
              <br />
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Board;
