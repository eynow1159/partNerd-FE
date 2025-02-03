import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {

    //const [code, setCode] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    //인가 코드 추출
    useEffect(() => {
        const authCode = searchParams.get("code");
        if (!authCode) {
            console.log("No auth code found.");
            return;
        }

        // ✅ 이미 처리된 코드인지 로컬 스토리지에서 확인
        const usedCode = localStorage.getItem("used_kakao_code");
        if (usedCode === authCode) {
            console.log("⚠️ 이미 처리된 인가 코드:", authCode);
            return;
        }

        // ✅ 이미 로그인된 사용자 확인
        const storedToken = localStorage.getItem("kakao_access_token");
        if (storedToken) {
            console.log("✅ 이미 로그인된 사용자입니다. access_token 사용:", storedToken);
            navigate("/register/social");
            return;
        }


         // ✅ 중복 요청 방지를 위한 상태 변수 추가
    let isRequestSent = false;

    if (!isRequestSent) {
        isRequestSent = true;  // ✅ 중복 요청 방지

        axios.get(`${API_BASE_URL}/api/auth/login/kakao?code=${authCode}`)
            .then(response => {
                if (response.status === 200 && response.data.isSuccess) {
                    console.log("백엔드 응답 (액세스 토큰):", response.data);


                    //이메일 정보 저장
                    const email = response.data.result.email;
                    const jwtToken = response.data.result.jwtToken;

                    localStorage.setItem("kakao_access_token", response.data.result.access_token);
                    localStorage.setItem("used_kakao_code", authCode);
                    localStorage.setItem("kakao_email", email); // 이메일 저장
                    localStorage.setItem("jwtToken", jwtToken); //jwt 토큰 저장

                    // ✅ URL에서 `code` 제거하여 중복 요청 방지
                    setSearchParams({});

                    // newUser 여부에 따라 이동 경로 지정
                if (response.data.result.newUser) {
                    navigate("/register/social"); // 새로운 사용자
                } else {
                    navigate("/"); // 기존 사용자
                }
                } else {
                    console.error("카카오 로그인 응답 오류:", response.data);
                    navigate("/login");
                }
            })
            .catch(error => {
                console.error("카카오 로그인 처리 실패:", error);
                if (error.response) {
                    console.error("서버 응답 데이터:", error.response.data);
                }
                navigate("/login");
            });

        console.log("Kakao Auth Code:", authCode);
    }
    }, []);

    return <p>카카오 로그인 처리 중...</p>;
}

export default KakaoCallback;