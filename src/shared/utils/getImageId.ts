// 이미지 URL에서 id를 추출한다.
// 예) /image/photo/12        → 12
//     /image/photo/12?v=1732 → 12

export const getImageId = (url: string) => Number(url.split('?')[0].split('/').pop());
