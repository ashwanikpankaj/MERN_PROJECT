import _map from "lodash/map";
import _capitalize from "lodash/capitalize";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Filter = ({
  handleFilter,
  selectedFilterConfig,
  handleSectionFilterSelect,
}) => {
  const handleFilterClick = ({ filter, key, title, event }) => {
    const updateSelectedFilter = _map(filter, (item) => {
      if (item?.title === title) {
        return { ...item, isChecked: event?.target?.checked };
      }
      return { ...item };
    });

    handleSectionFilterSelect({
      ...selectedFilterConfig,
      [key]: updateSelectedFilter,
    });
  };

  const handleApplyFilter = async () => {
    handleFilter();
  };
  const renderFilter = () => {
    return (
      <>
        {_map(selectedFilterConfig, (item, index) => (
          <>
            <Typography variant="h6" sx={{ color: "#1976d2" }}>
              {_capitalize(index)}
            </Typography>
            <Paper elevation={8}>
              <div style={{ display: "flex" }}></div>
              {_map(item, ({ title, symbol, key, value, isChecked }, index) => (
                <Stack direction="row" key={`${index}_${symbol}`}>
                  <Checkbox
                    onChange={(event) =>
                      handleFilterClick({
                        filter: item,
                        key,
                        value,
                        title,
                        event,
                      })
                    }
                    checked={isChecked}
                  />
                  <Typography
                    mt={1}
                    variant="body"
                  >{`${symbol} ${title}`}</Typography>
                </Stack>
              ))}
            </Paper>
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <Stack direction="column" style={{ height: "100%",marginTop:'10px'}}>
        <Button
          onClick={handleApplyFilter}
          variant="contained"
          color="error"
          size="large"
        >
          Apply Filter
        </Button>
        <div
          style={{
            height: "500px",
            overflowY: "auto",
          }}
        >
          <Box sx={{ width: "200px" }}>{renderFilter()}</Box>
        </div>
      </Stack>
    </>
  );
};

export default Filter;
