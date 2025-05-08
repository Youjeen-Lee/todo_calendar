import styled from '@emotion/styled';

// 아이콘 버튼 (연필, 휴지통 등)
export const IconButton = styled.button`
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    font-size: 1.2rem;
    &:hover {
        color: #333;
    }
`;

// 할 일 추가 버튼 (달력 아래)
export const AddTodoButton = styled.button`
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #9370db;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #8a2be2;
    }
`;

// 수정 버튼 (모달용)
export const EditButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #9370db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #8a2be2;
    }
`;

// 삭제 버튼 (할 일 항목용)
export const DeleteButton = styled.button`
    padding: 0.5rem;
    background-color: #ff3b30;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #d63029;
    }
`;

// 취소 버튼 (모달용)
export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #8e8e93;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #6e6e73;
  }
`;
