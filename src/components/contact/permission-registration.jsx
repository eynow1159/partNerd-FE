import React, { useState } from 'react';
import { useTeamMembers } from '../../hooks/useTeamMembers';

import {
  Container,
  Title,
  Description,
  MainSection,
  SearchSection,
  SearchInputWrapper,
  SearchInput,
  SearchButton,
  PermissionSection,
  PermissionGroup,
  PermissionLabel,
  PermissionTagsWrapper,
  PermissionTag,
  DeleteButton,
  SearchResultsList,
  SearchResultItem,
  ResultNickname,
  TitleWrapper,
  LimitText,
  LeaderLabel,
  SubleaderLabel,
  ProfileImage,
  LeaderSection,
  LeaderName,
} from '../../styled-components/contact/styled-permission-registration';

export const PermissionRegistration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { currentUser, searchMembers } = useTeamMembers();
  const [leader] = useState({ nickname: currentUser?.nickname }); // 현재 로그인한 사용자의 닉네임 사용

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      await searchMembers(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddPermission = (user) => {
    if (permissions.length >= 1) {
      alert('부리더는 최대 1명만 지정할 수 있습니다.');
      return;
    }
    
    if (!permissions.find(p => p.nickname === user.nickname)) {
      setPermissions([...permissions, user]);
    }
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleRemovePermission = (nickname) => {
    setPermissions(permissions.filter(permission => permission.nickname !== nickname));
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>팀페이지 권한 추가하기</Title>
        <LimitText>* 1명만 지정 가능</LimitText>
      </TitleWrapper>
      <Description>부리더에게 팀페이지 권한을 부여할 수 있습니다.</Description>
      
      <MainSection>
        <SearchSection>
          <SearchInputWrapper>
            <SearchInput
              placeholder="닉네임을 검색하여 추가해주세요"
              value={searchQuery}
              onChange={handleSearch}
            />
            <SearchButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M7.38863 14.4335C10.917 14.4335 13.7773 11.5732 13.7773 8.04488C13.7773 4.51654 10.917 1.65625 7.38863 1.65625C3.86029 1.65625 1 4.51654 1 8.04488C1 11.5732 3.86029 14.4335 7.38863 14.4335Z" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.1212 18.1427L12.0684 13.0898" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SearchButton>
          </SearchInputWrapper>
          
          {searchResults.length > 0 && (
            <SearchResultsList>
              {searchResults.map(result => (
                <SearchResultItem 
                  key={result.nickname} 
                  onClick={() => handleAddPermission(result)}
                >
                  <ProfileImage 
                    src={result.profileImage || '/default-profile.png'} 
                    alt={result.nickname} 
                  />
                  <ResultNickname>{result.nickname}</ResultNickname>
                </SearchResultItem>
              ))}
            </SearchResultsList>
          )}
        </SearchSection>

        <LeaderSection>
          <LeaderLabel>리더</LeaderLabel>
          <LeaderName>{currentUser?.nickname}</LeaderName>
          <SubleaderLabel>부리더</SubleaderLabel>
          {permissions.map(permission => (
            <PermissionTag key={permission.nickname}>
              {permission.nickname}
              <DeleteButton onClick={() => handleRemovePermission(permission.nickname)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DeleteButton>
            </PermissionTag>
          ))}
        </LeaderSection>
      </MainSection>
    </Container>
  );
};

export default PermissionRegistration;