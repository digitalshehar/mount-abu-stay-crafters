
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the form schema with zod
const reviewFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  rating: z.coerce.number().min(1, { message: 'Please select a rating.' }).max(5),
  travelType: z.string().optional(),
  comment: z.string().min(10, { message: 'Review must be at least 10 characters.' }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface UserReviewFormProps {
  onSubmitSuccess?: (data: ReviewFormValues) => void;
  onCancel: () => void;
}

const UserReviewForm: React.FC<UserReviewFormProps> = ({ onSubmitSuccess, onCancel }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  // Initialize the form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 0,
      travelType: 'Leisure',
      comment: '',
    },
  });
  
  // Form submission handler
  const onSubmit = (data: ReviewFormValues) => {
    console.log('Review submitted:', data);
    toast.success('Thank you for your review!', {
      description: 'Your review has been submitted and will be published after moderation.',
    });
    
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
    
    // Reset the form
    form.reset();
    onCancel();
  };
  
  // Star rating component
  const StarRating = ({ rating, onSetRating }: { rating: number, onSetRating: (rating: number) => void }) => {
    const selected = form.watch('rating');
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              (hoverRating || selected) >= star
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-stone-300'
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onSetRating(star)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div>
                      <StarRating
                        rating={field.value}
                        onSetRating={(rating) => form.setValue('rating', rating)}
                      />
                      <input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="travelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Leisure">Leisure</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="Solo">Solo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience at this property"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserReviewForm;
