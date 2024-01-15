import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'


const Total = ({totalPrice})=>{

    const renderCol = (title,price)=>{
        return <Stack direction="row" justifyContent="space-between">
            <Typography style={{paddingTop:"10px",paddingBottom:"10px",paddingRight:"10px",paddingLeft:"10px"}}>{title}</Typography>
            <Typography style={{paddingTop:"10px",paddingBottom:"10px",paddingRight:"10px",paddingLeft:"10px"}}>{price}</Typography>
        </Stack>
    }

    const calulatePriceWithTax = ()=>{
     return  totalPrice + 0.03*totalPrice
    }
    return (
        <Paper sx={{minWidth:"400px"}} elevation={5}>
            {renderCol("SubTotal", totalPrice)}
            <Divider/>
            {renderCol("Tax","3%")}
            <Divider/>
            {renderCol("GrandTotal",calulatePriceWithTax())}
        </Paper>
    )
}

export default Total;