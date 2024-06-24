import Review from "@/Interfaces/reviews";

function calculateAverageRating(reviews: Review[], productName: string): number {
    const filteredReviews = reviews.filter(review => review.product.name === productName);
    if (filteredReviews.length === 0) {
      return 0;
    }
    
    const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / filteredReviews.length;
  }
  
  
  export default function getSortedProductNames(reviews: Review[]): string[] {
    
    const uniqueProductNames = Array.from(new Set(reviews.map(review => review.product.name)));
    
    const sortedProductNames = uniqueProductNames.sort((a, b) => {
      const avgRatingA = calculateAverageRating(reviews, a);
      const avgRatingB = calculateAverageRating(reviews, b);
      return avgRatingB - avgRatingA;
    });
    
    return sortedProductNames;
  }
  
