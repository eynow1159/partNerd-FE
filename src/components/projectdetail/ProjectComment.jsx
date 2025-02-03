import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci"; 
import ProjectReply from './ProjectReply'; 
import ReplyInput from '../collaboration-detail/comments/ReplyInput'; 
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectComment';

const ProjectComment = ({ text, user, date, replies = [], onDelete, onUpdate, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyList, setReplyList] = useState(replies); 
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); 

  const handleReplyClick = () => setShowReply(prev => !prev);
  const handleOptionsClick = () => setShowOptions(prev => !prev);
  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
  };
  const handleEditChange = (e) => setEditedText(e.target.value);
  const handleEditSubmit = () => {
    if (editedText.trim()) {
      onUpdate(editedText);
      setEditMode(false);
    }
  };

  const handleReplySubmit = (replyText) => {
    const newReply = {
      text: replyText,
      user: "사용자 이름",
      date: new Date().toISOString().split('T')[0],
    };
    setReplyList([...replyList, newReply]);
    setShowReply(false);
  };

  const handleReplyUpdate = (index, newText) => {
    const updatedReplies = [...replyList];
    updatedReplies[index].text = newText;
    setReplyList(updatedReplies);
  };

  const handleReplyDelete = (index) => {
    const updatedReplies = replyList.filter((_, i) => i !== index);
    setReplyList(updatedReplies);
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1)); 
    setLiked(!liked);
  };

  const formatDate = (date) => {
    const dateParts = date.match(/(\d{4})\.\s*([\d]{1,2})\.\s*([\d]{1,2})/);
    if (!dateParts) {
      console.log('Invalid date format:', date);
      return "Invalid Date"; 
    }

    const [_, year, month, day] = dateParts;
    return `${year}. ${month}. ${day}`;
  };

  const formattedDate = formatDate(date); 

  return (
    <S.SCommentWrapper>
      <S.SProfileImage />
      <S.SCommentContent>
        <S.SCommentHeader>{user}</S.SCommentHeader>
        <S.SCommentMeta>
          <S.SDateText>{formattedDate}</S.SDateText>
          <S.SLikeButtonWrapper>
            <S.SLikeButton onClick={handleLike}>
              <CiHeart color={liked ? "red" : "gray"} size={20} />
            </S.SLikeButton>
            <S.SLikeCount>{likes}</S.SLikeCount>
          </S.SLikeButtonWrapper>
        </S.SCommentMeta>
        <S.SCommentBody>
          {editMode ? (
            <S.SCommentInput
              type="text"
              value={editedText}
              onChange={handleEditChange}
              onBlur={handleEditSubmit}
              autoFocus
            />
          ) : (
            <S.SCommentText>{text}</S.SCommentText>
          )}
          <S.SReplyButton onClick={handleReplyClick}>답글달기</S.SReplyButton>
        </S.SCommentBody>

        {replyList.map((reply, index) => (
          <div key={index} style={{ marginTop: '10px' }}> 
            <ProjectReply 
              text={reply.text}
              user={reply.user}
              date={reply.date}
              onUpdate={(newText) => handleReplyUpdate(index, newText)}
              onDelete={() => handleReplyDelete(index)}
            />
          </div>
        ))}
        {showReply && (
          <ReplyInput 
            onReply={handleReplySubmit} 
            onClose={() => setShowReply(false)} 
          />
        )}
      </S.SCommentContent>

      <FiMoreVertical
        onClick={handleOptionsClick}
        style={{
          position: 'absolute',
          right: '-15px',
          top: '-2px',
          cursor: 'pointer',
        }}
      />

      <S.SMoreOptionsMenu show={showOptions}>
        <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
        <S.SDivider />
        <S.SMenuItem onClick={onDelete}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>
    </S.SCommentWrapper>
  );
};

export default ProjectComment;