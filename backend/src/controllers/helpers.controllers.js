const getAllProductMap = async(categories,Schema)=>{

    const productMap = {};

    for (const item of categories) {
      productMap[item] = await Schema.find({ category: item });
    }
    return productMap;
}

module.exports = {getAllProductMap}