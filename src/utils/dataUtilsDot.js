export const formData = (isoString) =>{
    if(! isoString) return "날짜 정보 없음";

    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월 = 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}