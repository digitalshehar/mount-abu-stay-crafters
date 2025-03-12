
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle, 
  AlertCircle, 
  Clock 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample review data
const reviewsData = [
  {
    id: 1,
    hotelName: 'Sunrise Resort',
    userName: 'Amit Sharma',
    rating: 5,
    title: 'Excellent stay!',
    content: 'We had a wonderful time at this hotel. The staff was friendly and the rooms were clean and comfortable.',
    date: '2023-10-05',
    status: 'approved',
  },
  {
    id: 2,
    hotelName: 'Hilltop Retreat',
    userName: 'Priya Patel',
    rating: 4,
    title: 'Great location',
    content: 'The view from our room was breathtaking. Only downside was the limited breakfast options.',
    date: '2023-10-02',
    status: 'approved',
  },
  {
    id: 3,
    hotelName: 'Sunrise Resort',
    userName: 'Rahul Verma',
    rating: 2,
    title: 'Disappointing experience',
    content: 'The room was not as advertised and the bathroom had cleanliness issues.',
    date: '2023-10-01',
    status: 'pending',
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Filter reviews based on search term and tab
  const getFilteredReviews = (status) => {
    return reviews.filter(review => 
      review.status === status && 
      (review.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       review.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  
  const approvedReviews = getFilteredReviews('approved');
  const pendingReviews = getFilteredReviews('pending');
  const rejectedReviews = getFilteredReviews('rejected');
  
  const handleApprove = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? {...review, status: 'approved'} : review
    ));
    
    toast({
      title: "Review approved",
      description: "The review is now visible to users.",
    });
  };
  
  const handleReject = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? {...review, status: 'rejected'} : review
    ));
    
    toast({
      title: "Review rejected",
      description: "The review has been rejected and won't be displayed.",
    });
  };
  
  const renderReviewCard = (review) => (
    <Card key={review.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{review.hotelName}</h3>
            <p className="text-sm text-gray-500">by {review.userName} on {new Date(review.date).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="font-medium">{review.title}</h4>
          <p className="text-gray-700 mt-1">{review.content}</p>
        </div>
        
        <div className="mt-4 flex justify-end">
          {review.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2" 
                onClick={() => handleReject(review.id)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleApprove(review.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </>
          )}
          
          {review.status === 'approved' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleReject(review.id)}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Reject
            </Button>
          )}
          
          {review.status === 'rejected' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleApprove(review.id)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Approve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Review Management</h1>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Search by hotel, guest name or content..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Pending ({pendingReviews.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approved ({approvedReviews.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            Rejected ({rejectedReviews.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {pendingReviews.length > 0 ? (
            pendingReviews.map(renderReviewCard)
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No pending reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="approved">
          {approvedReviews.length > 0 ? (
            approvedReviews.map(renderReviewCard)
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No approved reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedReviews.length > 0 ? (
            rejectedReviews.map(renderReviewCard)
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No rejected reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reviews;
