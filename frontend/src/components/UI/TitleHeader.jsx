// 페이지 최상단 타이틀

import React from 'react';
import styled from '@emotion/styled';

// 제목 컨테이너: 가운데 정렬, 하단 여백 적용
const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

// 제목 텍스트: 큰 글씨, 컬러 설정, 가운데 정렬 + 이모지와의 간격 조절
const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

/**
 * 앱 상단의 메인 제목 영역 (Todo Calendar)
 * - 가운데 정렬
 * - 스타일 일관성 유지
 */
function TitleHeader() {
    return (
        <Header>
            <Title>
                <span role="img" aria-label="calendar">📅</span>
                Todo Calendar
            </Title>
        </Header>
    );
}

export default TitleHeader;
