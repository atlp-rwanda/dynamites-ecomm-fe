import Product from "@/Interfaces/Product";

interface Review {
    id: number;
    content: string;
    rating: number;
    user: {
      firstName: string;
    };
    product: {
      name: string;
    };
  }

export const filterPopular = (CopyOfreview:Review[], items:Product[])=>{

const reviewReting:{[productName:string]:{totalRating:number, count:number}} ={}

for(let i = 0; i<CopyOfreview.length; i++)
    {
      const productname = CopyOfreview[i].product.name

      if(!reviewReting[productname])
        {
          reviewReting[productname] = {totalRating : 0, count : 0}
        }
      
      reviewReting[productname].totalRating += CopyOfreview[i].rating
      reviewReting[productname].count += 1  
    }
    
 const sortedProductNames = Object.keys(reviewReting)
  .map(productName => ({
    name: productName,
    averageRating: reviewReting[productName].totalRating / reviewReting[productName].count,
  }))
  .sort((a, b) => b.averageRating - a.averageRating)
  .map(product => product.name);

  const mostPopularProducts = sortedProductNames.map((productName) => {
    const matchedItem = items.find((item) => item.name === productName);
  
    if (matchedItem) {
      return matchedItem;
    }
   else{
    return
   }
  }).filter(item => item !== undefined);
  
  return { mostPopularProducts, sortedProductNames };

}

