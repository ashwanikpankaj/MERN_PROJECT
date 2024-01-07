import _forEach from 'lodash/forEach'
import _size from 'lodash/size';

export const makeFilterPayload = (selectedFilterConfig)=>{
    let filterConfig = {price:[],category:[],rating:[]}
   _forEach(selectedFilterConfig,item=>{
        _forEach(item,({key,value,isChecked})=>{
            if(filterConfig[key] && isChecked){
                filterConfig =   {...filterConfig,[key]:[...filterConfig[key],...value]}
             
            }
        })
  })
const formattedFilter = []
 _forEach(filterConfig,(item,key)=>{
    if(key==='price' && _size(item)>0){
        formattedFilter.push({key,value:[Math.min(...item),Math.max(...item)]})
    }
   else if(key==='category' && _size(item)>0){
    formattedFilter.push({key,value:item})
    }
    else if(key==='rating' && _size(item)>0){
        formattedFilter.push({key,value:[Math.min(...item),Math.max(...item)]})
    }
  })
  return formattedFilter;
}