import { useState, useMemo } from "react";
import _isEmpty from "lodash/isEmpty";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const Address = () => {
  const [addressForm, setAddressForm] = useState({ city: "", address: "" });
  const [isAddressInDb, setAddressInDb] = useState(false);

  const isFieldEmpty = useMemo(() => {
    return _isEmpty(addressForm?.city) || _isEmpty(addressForm?.address);
  }, [addressForm]);

  const handleAddAdress = () => {
    //call add form api
    setAddressInDb(true);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAddressForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const renderAddressForm = () => {
    return (
      <Stack spacing={2} style={{ minWidth: "300px" }}>
        <TextField label="City Name" name="city" onChange={handleOnChange} />
        <TextField
          label="Full Address"
          name="address"
          onChange={handleOnChange}
        />
      </Stack>
    );
  };
  const renderAddButton = () => {
    return (
      <Button
        variant="outlined"
        color="primary"
        disabled={isFieldEmpty}
        onClick={handleAddAdress}
      >
        Add Address
      </Button>
    );
  };
  if (isAddressInDb) {
    return (
      <Stack spacing={5} justifyContent="space-between" >
        <Paper>
        <Typography variant="h6" component="h6">Address</Typography>
        <Divider/>
          <Typography style={{paddingTop:"20px",paddingBottom:"20px",paddingRight:"16px",paddingLeft:"16px"}}>City:{addressForm?.city}</Typography>
          <Divider/>
          <Typography style={{paddingTop:"20px",paddingBottom:"20px",paddingRight:"16px",paddingLeft:"16px"}}>Address:{addressForm?.address}</Typography>
        </Paper>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {renderAddressForm()}
      {renderAddButton()}
    </Stack>
  );
};

export default Address;
