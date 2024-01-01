import _map from "lodash/map";

import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'

const Filter = () => {
  const priceFilter = [
    { title: "0-100", symbol: "Rs" },
    { title: "100-500", symbol: "Rs" },
    { title: "500-1000", symbol: "Rs" },
    { title: "500-1000", symbol: "Rs" },
    { title: "500-1000", symbol: "Rs" },
  ];

  const categoryFilter = [{title:'Shirt',symbol:''},{title:'Shoes',symbol:''},{title:'Jeans',symbol:''}]
  const renderFilter = (filter, type) => (
    <>
      <Typography variant="h6" sx={{ color: "#1976d2" }}>
        {type}
      </Typography>
      <Paper elevation={8}>
        <div style={{display:'flex'}}>
        <Button>Select All</Button>
        <Button>Clear All</Button>
        </div>
        {_map(filter, ({ title, symbol }) => (
          <Stack direction="row">
            <Checkbox />
            <Typography
              mt={1}
              variant="body"
            >{`${symbol} ${title}`}</Typography>
          </Stack>
        ))}
      </Paper>
    </>
  );

  return (
    <Box>
     {renderFilter(priceFilter,'Price')}
      {renderFilter(categoryFilter,'Category')}
      {renderFilter(priceFilter,'Rating')}
    </Box>
  );
};

export default Filter;
