import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";

export function BoardView() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then(() => setBoard(board));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>글보기</h1>
      <p>번호:{board.id}</p>
      <p>제목:{board.title}</p>
      <p>본문:{board.content}</p>
      <p>작성자:{board.writer}</p>
      <p>작성일지:{board.inserted}</p>
    </Box>
  );
}
