import axios from "axios";
import { useEffect, useState } from "react";

const searchData = (param) => {
  const [Datas, setDatas] = useState();
  const [Videos, setVideos] = useState();
  const [SearchInput, setSearchInput] = useState();
  const [isLodaing, setisLodaing] = useState(false);
  const [Theme, setTheme] = useState(true);
  axios.defaults.baseURL = "https://images-api.nasa.gov/";
  

  const fetchData = async (url) => {    
    console.log(url)
    try {
      setisLodaing(true);
      const res = await axios(url);
      setDatas(res.data.collection?.items);      
      // console.log(res.data.collection?.items);      
      setisLodaing(true);
    } catch (err) {
      console.log(err);
    } finally {
      setisLodaing(false);
    }
  };

  useEffect(() => {
    fetchData(param);    
  }, [param]);
  
  return {
    Datas,
    setDatas,
    isLodaing,
    setisLodaing,
    Theme,
    setTheme,
    SearchInput,
    setSearchInput,
    fetchData: (url) => fetchData(url),
  };
};

export default searchData;
