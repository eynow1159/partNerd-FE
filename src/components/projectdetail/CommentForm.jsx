import React, { useState } from 'react';
import styled from 'styled-components';

const CommentForm = ({ onAddComment, type }) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onAddComment(text, type);  // 댓글 내용과 type을 전달
        setText(''); // 댓글 입력란 초기화
      }
    }
  };

  return (
    <form>
      <InquiryTitle>댓글</InquiryTitle>
      <Textarea
        placeholder="댓글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)} // 댓글 입력받기
        onKeyDown={handleKeyDown} 
      />
    </form>
  );
};

export default CommentForm;





const InquiryTitle = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;


const Textarea = styled.textarea`
  display: flex;
  width: 600px;
  height: 60px;
  padding: 0 10px;
  align-items: center;
  justify-content: start;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1.5px solid #E1E1E1;
  background: #FFF;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 60px;
  resize: none;
  margin-top: 10px;
  outline: none;
  ::placeholder {
    color: #f2f2f2;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
  }
`;

