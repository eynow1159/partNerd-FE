import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const PartnerCard = styled.div`
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  padding-top: 73.38%;
  background: #F5F5F5;
  position: relative;
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Badge = styled.span`
  padding: 0;
  background: transparent;
  font-size: 14px;
  color: #08D485;
  display: block;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: left;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const SortButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  background: #E5E5E5;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
  margin-left: 0;
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background: #E5E5E5;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
  margin: 0;
`;

export const SortButton = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: ${props => props.isActive ? 'white' : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  transition: background-color 0.2s;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1200px;
`;

export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1.5px solid #0D29B7;
  background: transparent;
  color: #0D29B7;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: #0D29B7;
    color: white;
  }

  &:before {
    content: '+';
    margin-right: 6px;
    font-size: 14px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.isActive ? '#EAF1FF' : '#F3F3F3'};
  color: ${props => props.isActive ? '#0D29B7' : '#707070'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isActive ? '#EAF1FF' : '#F3F3F3'};
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0;
  background: #FFFFFF;
  font-size: 14px;
  color: #08D485;
  margin-bottom: 8px;
  text-align: left;
  font-weight: 500;
`;