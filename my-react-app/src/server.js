const getlist= ()=>fetch('/list').then((data)=>{
  return data.json();
});

export { getlist };