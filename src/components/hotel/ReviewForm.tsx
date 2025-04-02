
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { useReviewsActions } from '@/hooks/useReviewsActions';
import { useAuth } from '@/context/AuthContext';

const reviewSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email('Please enter a valid email'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, { message: 'Please enter at least 10 characters' })
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  hotelId: number;
  hotelName: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ hotelId, hotelName, onSuccess }) => {
  const { createReview } = useReviewsActions();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedRating, setSelectedRating] = React.useState<number>(0);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      rating: 0,
      comment: ''
    }
  });

  const onSubmit = async (data: ReviewFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to submit a review',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        user_id: user.id,
        item_id: hotelId,
        item_type: 'hotel',
        rating: data.rating,
        comment: data.comment
      };
      
      const result = await createReview(reviewData);
      
      if (result) {
        form.reset();
        setSelectedRating(0);
        if (onSuccess) onSuccess();
        
        toast({
          title: 'Review Submitted',
          description: `Thank you for reviewing ${hotelName}!`
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue('rating', rating);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= selectedRating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {!user && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your experience with this hotel..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full gap-2" 
            disabled={isSubmitting || !selectedRating}
          >
            <Send className="h-4 w-4" />
            Submit Review
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
