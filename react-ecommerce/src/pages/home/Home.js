import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import _map from "lodash/map";
import _get from "lodash/get";
import _size from "lodash/size";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "../../components/navbar/Navbar";
import MyCard from "../../molecules/card/Card";
import Filter from "../../components/filterSection/Filter";
import ReactSlider from "../../components/reactSlider/ReactSlider";
import {
  categoryFilterConfig,
  priceFilterConfig,
  ratingFilterConfig,
} from "./home.config";
import { makeFilterPayload } from "./home.factory";
import { getProducts,getFilteredProduct } from "../../reducers/app.reducer";

const Home = () => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const {products} = useSelector(state=>state.ecommerceReducer)

  const [selectedFilterConfig, setSelectedFilterConfig] = useState({
    price: priceFilterConfig,
    category: categoryFilterConfig,
    rating: ratingFilterConfig,
  });

  const getProduct = useCallback(async () => {
    try {
      setIsFetching(true);
      dispatch(getProducts())
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const handleFilter = useCallback(async () => {
    try {
      setIsFetching(true);
      const payload = makeFilterPayload(selectedFilterConfig);
      if (_size(payload) > 0) {
       dispatch(getFilteredProduct({ filters: payload }))
      } else {
        dispatch(getProducts())
      }
    } catch (err) {
    } finally {
      setIsFetching(false);
    }
  }, [selectedFilterConfig,dispatch]);

  const handleSectionFilterSelect = useCallback((data) => {
    setSelectedFilterConfig(data);
  }, []);

  const renderSubSection = (category) => {
    const selectedCategoryProduct = _get(products,["productMap", category],[]);

    return (
      <>
        {_size(selectedCategoryProduct) > 0 ? (
          <>
            <Typography>{category}</Typography>
            <Stack
              spacing={2}
              direction="row"
              useFlexGap
              flexWrap="noWrap"
              sx={{ marginTop: 2 }}
              style={{ width: "100vw", overflowX: "scroll" }}
            >
              {_map(selectedCategoryProduct, (itemData) => (
                <MyCard {...itemData} />
              ))}
            </Stack>
          </>
        ) : null}
      </>
    );
  };

  const renderFetchingCircle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width:'100vw'
        }}
      >
        <CircularProgress />
      </div>
    );
  };

  const renderAllProducts = () => {
    return isFetching ? (
      renderFetchingCircle()
    ) : (
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Stack>
          {_map(products?.categories, (category) => (
            <>{renderSubSection(category)}</>
          ))}
        </Stack>
      </div>
    );
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <Navbar />
        <ReactSlider />
        <Stack spacing={2} direction="row" style={{ height: "100%" }}>
          <Filter
            handleFilter={handleFilter}
            selectedFilterConfig={selectedFilterConfig}
            handleSectionFilterSelect={handleSectionFilterSelect}
          />
          {renderAllProducts()}
        </Stack>
      </div>
    </>
  );
};

export default Home;
