import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button, { TYPES } from '../components/common/button';
import ClubInfoForm from '../components/teamregister/ClubInfoForm';
import Banner from '../components/common/banner/Banner';
import ProjectImageUploadForm from '../components/teamregister/ProjectImageUploadForm';
import styled from 'styled-components';

const TeamManagement = () => {
  const { clubId } = useParams();
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    intro: '',
    contactMethod: [],
    categoryId: '',
    bannerKeyName: '',
    mainKeyName: '',
    activity: {
      intro: '',
      activityImageKeyNames: []
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        
        const response = await axios.get(`${API_BASE_URL}/api/partnerd/${clubId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setTeamInfo(response.data);
      } catch (error) {
        console.error('팀 정보를 가져오는 데 실패했습니다:', error);
        setErrorMessage('팀 정보를 불러오는 데 실패했습니다.');
      }
    };

    if (clubId) {
      fetchTeamData();
    }
  }, [clubId]);

  const handleFormDataChange = (updatedData) => {
    setTeamInfo((prevState) => ({ ...prevState, ...updatedData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', teamInfo.name);
    formData.append('intro', teamInfo.intro);
    formData.append('categoryId', teamInfo.categoryId);
    formData.append('bannerKeyName', teamInfo.bannerKeyName);
    formData.append('mainKeyName', teamInfo.mainKeyName);

    // 연락 방법 배열 추가
    teamInfo.contactMethod.forEach((method, index) => {
      formData.append(`contactMethod[${index}]`, method);
    });

    // 활동 정보 추가
    formData.append('activity[intro]', teamInfo.activity.intro);
    teamInfo.activity.activityImageKeyNames.forEach((file, index) => {
      formData.append(`activity[activityImageKeyNames][${index}]`, file);
    });

    const token = localStorage.getItem('jwtToken');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.put(`https://api.partnerd.site/api/partnerd/${clubId}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('팀 수정 성공:', response.data);
    } catch (error) {
      console.error('팀 수정 실패:', error);
      setErrorMessage('팀 수정에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Banner 
        largeText="팀 페이지 관리" 
        smallText="팀 페이지를 관리해보면서 동아리를 발전시켜보아요!" 
      />
      <Container>
        <ProjectImageUploadForm 
          setProfileImage={(imageKey) => setTeamInfo((prev) => ({ ...prev, mainKeyName: imageKey }))} 
          setBannerImage={(imageKey) => setTeamInfo((prev) => ({ ...prev, bannerKeyName: imageKey }))} 
          profileImageUrl={teamInfo.mainKeyName} 
          bannerImageUrl={teamInfo.bannerKeyName}
        />

        <ClubInfoForm
          handleActivityClick={(updatedInfo) =>
            setTeamInfo((prev) => ({ ...prev, activity: { ...prev.activity, ...updatedInfo } }))
          }
          handleCategoryChange={(categoryId) => handleFormDataChange({ categoryId })}
          handleNameChange={(name) => handleFormDataChange({ name })}
          handleIntroChange={(intro) => handleFormDataChange({ intro })}
          handleContactMethodsChange={(contactMethods) => handleFormDataChange({ contactMethod: contactMethods })}
          teamInfo={teamInfo}
        />

        <Button
          type={TYPES.NEXT}
          text={isLoading ? '등록 중...' : '수정하기'}
          onClick={handleSubmit}
          disabled={isLoading}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};

export default TeamManagement;




const Container = styled.div`
  background-color: #F3F4F7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > :first-child {
    margin-bottom: 30px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

