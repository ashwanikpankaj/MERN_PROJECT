import Button from '@mui/material/Button';

const  MyButton = (props)=>{
    const {buttonTitle} = props
    return   <Button variant="text" {...props}>{buttonTitle}</Button>
}
export default MyButton;