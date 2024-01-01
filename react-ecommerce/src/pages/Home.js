import {useEffect,useState} from 'react';
import axios from 'axios'

import _map from "lodash/map";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Navbar from "../components/navbar/Navbar";
import MyCard from "../molecules/card/Card";
import Filter from "../components/filterSection/Filter";
import ReactSlider from "../components/reactSlider/ReactSlider";

const Home = () => {
const [products,setProducts] = useState([]);

const getProduct = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/all-product");
     setProducts(res.data.products)
     console.log(res)
  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  getProduct();
},[])
  const section = [
    { section: "Shirt Section",item:[1, 2, 3, 4] },
    { section: "Jeans Section",item:[1] },
  ];

  //shirt => shirt , item = {name,size,rating,price,category,}

  const renderSubSection = (item) => (
    <>
      <Stack
        spacing={2}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{ marginTop: 2 }}
      >
        {_map(item, (itemData) => (
          <MyCard {...itemData}/>
        ))}
      </Stack>
    </>
  );
  return (
    <>
      <Navbar />
      <ReactSlider/>
      <Stack spacing={2} direction='row'>
        <Filter />
        <Stack>
        {_map(section, ({ section }) => (
          <>
            <Typography>{section}</Typography>
            {renderSubSection(products)}
          </>
        ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
