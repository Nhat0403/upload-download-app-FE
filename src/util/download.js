const donwload = async(response, name) => {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  console.log(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export default donwload;