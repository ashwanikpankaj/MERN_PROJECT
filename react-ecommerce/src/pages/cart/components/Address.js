import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import _isEmpty from "lodash/isEmpty";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  addAdressAction,
  getAddressAction,
  updateAddressAction,
} from "../../../reducers/app.reducer";

const Address = () => {
  const [addressForm, setAddressForm] = useState({ city: "", address: "" });
  const [newForm, setNewForm] = useState(true);
  const { userAddress, user } = useSelector((state) => state?.ecommerceReducer);
  const [editForm,setEditForm] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressAction(user?.userId));
    if(userAddress?.address){
      setNewForm(false)
    }
  }, []);

  const isFieldEmpty = useMemo(() => {
    return _isEmpty(addressForm?.city) || _isEmpty(addressForm?.address);
  }, [addressForm]);

  const handleAddAdress = () => {
    const payload = { userId: user?.userId, ...addressForm };
    if (editForm) {
      dispatch(updateAddressAction(payload));
      setEditForm(false)
      return;
    }
    dispatch(addAdressAction(payload));
    setNewForm(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAddressForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const renderAddressForm = () => {
    return (
      <Stack spacing={2} style={{ minWidth: "300px" }}>
        <TextField
          label="City Name"
          name="city"
          onChange={handleOnChange}
          value={addressForm?.city}
        />
        <TextField
          label="Full Address"
          name="address"
          onChange={handleOnChange}
          value={addressForm?.address}
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
        {newForm?"Add Address": "Edit Address"  }
      </Button>
    );
  };

  const renderEditButton = () => {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setAddressForm({
            address: userAddress?.address?.address,
            city: userAddress?.address?.city,
          });
          setNewForm(true);
          setEditForm(true)
        }}
      >
        Edit Address
      </Button>
    );
  };

  if (userAddress?.address && !newForm) {
    return (
      <Stack spacing={5} justifyContent="space-between">
        <Paper>
          <Typography variant="h6" component="h6">
            Address
          </Typography>
          <Divider />
          <Typography
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            City:{userAddress?.address?.city}
          </Typography>
          <Divider />
          <Typography
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            Address:{userAddress?.address?.address}
          </Typography>
        </Paper>
        {renderEditButton()}
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
