import {useEffect,useState,useCallback} from 'react';
import axios from 'axios'

import _map from "lodash/map";
import _get from 'lodash/get';
import _size from 'lodash/size';

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from "../../components/navbar/Navbar";
import MyCard from "../../molecules/card/Card";
import Filter from "../../components/filterSection/Filter";
import ReactSlider from "../../components/reactSlider/ReactSlider";
import { categoryFilterConfig, priceFilterConfig, ratingFilterConfig } from './home.config';
import { makeFilterPayload } from './home.factory';

const Home = () => {
const [products,setProducts] = useState([]);
const [isFetching ,setIsFetching] = useState(false)
const [selectedFilterConfig, setSelectedFilterConfig] = useState({
  price: priceFilterConfig,
  category: categoryFilterConfig,
  rating: ratingFilterConfig,
});


const getProduct = useCallback(async()=>{
  try{
    setIsFetching(true)
    const res = await axios.get("http://localhost:8000/all-product");
     setProducts(res.data)
  }
  catch(err){
    console.log(err)
  }finally{
    setIsFetching(false)
  }
},[])

useEffect(()=>{
  getProduct();
},[])

const handleFilter= useCallback(async()=>{
try{
   setIsFetching(true)
    const payload = makeFilterPayload(selectedFilterConfig);
    if(_size(payload)>0){
      const response = await axios.post("http://localhost:8000/product/filter",{filters:payload});
      setProducts(response?.data)
    }
    else{
      getProduct();
    }
  }
  catch(err){

  }
  finally{
    setIsFetching(false)
  }
},[selectedFilterConfig,getProduct])

const handleSectionFilterSelect = useCallback((data)=>{
  setSelectedFilterConfig(data)
},[])

  const renderSubSection = (category) => {
   const selectedCategoryProduct = _get(products,['productMap',category],[])
  return  <>
      <Stack
        spacing={2}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{ marginTop: 2 }}
      >
        {_map(selectedCategoryProduct, (itemData) => (
          <MyCard {...itemData}/>
        ))}
      </Stack>
    </>
  };
  if(isFetching){
    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <CircularProgress/>
    </div>
  }

  return (
    <>
    <div style={{ height: '100vh' }}>
      <Navbar />
      <ReactSlider/>
      <Stack spacing={2} direction='row' style={{height:'100%'}}>
       <Filter 
        handleFilter={handleFilter}
         selectedFilterConfig={selectedFilterConfig}
         handleSectionFilterSelect={handleSectionFilterSelect}
         />
         <div style={{height:"100%",overflowY: 'auto'}}>
        <Stack>
        {_map(products?.categories, (category) => (
          <>
            <Typography>{category}</Typography>
            {renderSubSection(category)}
          </>
        ))}
        </Stack>
        </div>
      </Stack>
      </div>
    </>
  );
};

export default Home;
