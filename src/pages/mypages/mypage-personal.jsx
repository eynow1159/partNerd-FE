import styled from "styled-components";
import MyPersonalComp from "../../components/mypage/personal";
import Sidebar from "../../components/mypage/sidebar";

const MyPagePersonal = () => {
    return(
        <Wrapp>
            <Sidebar />
            <MyPersonalComp />
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPagePersonal;