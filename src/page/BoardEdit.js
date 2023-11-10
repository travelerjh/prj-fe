import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useImmer } from "use-immer";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);

  const navigate = useNavigate();

  //  edit :/ id
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  // 타이틀 바꾸는 역활
  function handleChangeT(e) {
    updateBoard((draft) => {
      draft.title = e.target.value;
    });
  }

  // 컨텐츠 바꾸는 역활
  function handleChangeC(e) {
    updateBoard((draft) => {
      draft.content = e.target.value;
    });
  }

  //함수마다 이름이달라야 한다.
  function handleChangeW(e) {
    updateBoard((draft) => {
      draft.writer = e.target.value;
    });
  }

  return (
    <>
      <Box>
        <h1>{id}번 글 수정</h1>
        <h1>{board.id}번 글 보기</h1>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} onChange={handleChangeT} />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={board.content} onChange={handleChangeC} />
        </FormControl>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} onChange={handleChangeW} />
        </FormControl>
        <Button colorScheme="yellow">저장</Button>
        {/*  navigate(-1) 은 이전 t경로 로 돌아가기  */}
        <Button colorScheme="red" onClick={() => navigate(-1)}>
          취소
        </Button>
      </Box>
    </>
  );
}
