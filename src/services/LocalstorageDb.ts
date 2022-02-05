

export default function  LocalstorageDb() {
  const DATA_KEYWORD = "data";

  const getData = () => {
    let data = localStorage.getItem(DATA_KEYWORD);
    if (data != null && typeof data == 'string') {
      return JSON.parse(data);
    }
    return data;
  }

  const saveData = (data: any) => {
    let savedData = data;
    if (data != null && typeof data == 'object') {
      savedData = JSON.stringify(data);
    }
    localStorage.setItem(DATA_KEYWORD, savedData);
  }

  return {
    getData,
    saveData
  }
}