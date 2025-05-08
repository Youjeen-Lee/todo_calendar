import React from 'react';
import styled from '@emotion/styled';
import { EditButton, CancelButton } from '../UI/Buttons';


// 모달 배경: 화면 전체를 덮고 어두운 배경 처리
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 내부 콘텐츠: 흰색 배경, 그림자, 반응형 크기
const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 모달 제목: 가운데 정렬
const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-size: 1.5rem;
`;

// 입력 폼: 세로 배치
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 입력창 스타일
const ModalInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

// 셀렉트 박스 스타일
const ModalSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

// 버튼 그룹: 오른쪽 정렬
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;


function TodoModal({
                       editingTodo,
                       newTodo,
                       setNewTodo,
                       priority,
                       setPriority,
                       editTitle,
                       setEditTitle,
                       editPriority,
                       setEditPriority,
                       handleSubmit,
                       handleEditSubmit,
                       onCancel
                   }) {
    const isEditMode = !!editingTodo?.id;

    return (
        <Modal>
            <ModalContent>
                <ModalTitle>할 일 {isEditMode ? '수정' : '추가'}</ModalTitle>
                <ModalForm onSubmit={isEditMode ? handleEditSubmit : handleSubmit}>
                    <ModalInput
                        type="text"
                        value={isEditMode ? editTitle : newTodo}
                        onChange={(e) => isEditMode ? setEditTitle(e.target.value) : setNewTodo(e.target.value)}
                        placeholder="할 일을 입력하세요..."
                    />
                    <ModalSelect
                        value={isEditMode ? editPriority : priority}
                        onChange={(e) => isEditMode ? setEditPriority(e.target.value) : setPriority(e.target.value)}
                    >
                        <option value="HIGH">높음</option>
                        <option value="MID">중간</option>
                        <option value="LOW">낮음</option>
                    </ModalSelect>
                    <ButtonGroup>
                        <EditButton type="submit">저장</EditButton>
                        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
                    </ButtonGroup>
                </ModalForm>
            </ModalContent>
        </Modal>
    );
}

export default TodoModal;
