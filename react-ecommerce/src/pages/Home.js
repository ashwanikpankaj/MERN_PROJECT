import _map from "lodash/map";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'

import Navbar from "../components/navbar/Navbar";
import MyCard from "../molecules/card/Card";
import Filter from "../components/filterSection/Filter";
import ReactSlider from "../components/reactSlider/ReactSlider";

const Home = () => {

  const section = [
    { section: "Shirt Section",item:[1, 2, 3, 4] },
    { section: "Jeans Section",item:[1] },
  ];

  const renderSubSection = (item) => (
    <>
      <Stack
        spacing={2}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{ marginTop: 2 }}
      >
        {_map(item, () => (
          <MyCard />
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
        {_map(section, ({ section,item }) => (
          <>
            <Typography>{section}</Typography>
            {renderSubSection(item)}
          </>
        ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
