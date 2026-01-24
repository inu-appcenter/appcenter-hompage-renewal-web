export async function convertURLtoFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  // URL에서 파일명 추출 (확장자가 없다면 기본값 jpg 지정)
  const ext = url.split('.').pop() || 'jpg';
  const filename = url.split('/').pop() || `image.${ext}`;
  const metadata = { type: data.type };
  return new File([data], filename, metadata);
}
