import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty'


export const  getInitials = (name='') =>{

  const initials = name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("");

  return initials;
}

export const getIsPresent = (selectedProduct,products)=>{
  const isPresent  = _find(products,(item)=>item?._id === selectedProduct?._id);
  return !_isEmpty(isPresent)
}

