export const convertUriToBlob = async (uri: string): Promise<Blob> => {
  const res = await fetch(uri);
  return res.blob();
};
