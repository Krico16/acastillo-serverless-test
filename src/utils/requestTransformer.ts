export const urlTransformer = (url: string) => {
  try{
    return url.split("/")[5];
  }catch (error){
    return ''
  }
}