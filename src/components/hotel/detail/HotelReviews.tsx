
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Review {
  name: string;
  rating: number;
  date?: string;
  comment?: string;
}

interface HotelReviewsProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ 
  reviews = [], 
  averageRating = 0,
  reviewCount = 0 
}) => {
  // Helper to generate random color for avatar fallback
  const getRandomColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
          <div className="flex items-center mb-2 md:mb-0 md:mr-6">
            <div className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-gray-500">
            Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </div>
        </div>
        <Button variant="outline">Write a Review</Button>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No reviews yet. Be the first to review this hotel!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className={getRandomColor(review.name)}>
                    <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        {review.date && (
                          <p className="text-sm text-gray-500">{review.date}</p>
                        )}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelReviews;
