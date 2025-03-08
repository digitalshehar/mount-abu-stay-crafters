
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  question: string;
  answer?: string;
  userName: string;
  createdAt: string;
}

interface HotelQuestionsProps {
  hotelId: number;
}

const HotelQuestions = ({ hotelId }: HotelQuestionsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "Is breakfast included in the room price?",
      answer: "Yes, we offer complimentary breakfast for all guests staying at our hotel.",
      userName: "John D.",
      createdAt: "2023-05-15"
    },
    {
      id: "2",
      question: "Do you have airport shuttle service?",
      answer: "We offer airport shuttle service at an additional cost of Rs.1200 per trip. Please book 24 hours in advance.",
      userName: "Priya S.",
      createdAt: "2023-06-22"
    },
    {
      id: "3",
      question: "What is the check-in time?",
      userName: "Michael T.",
      createdAt: "2023-07-10"
    }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Would typically send to API or Supabase here
      const newQuestionObj = {
        id: Date.now().toString(),
        question: newQuestion,
        userName: user ? user.email?.split('@')[0] || "Guest" : "Guest",
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion("");
      
      toast({
        title: "Question Submitted",
        description: "Your question has been submitted and will be answered by the hotel soon.",
      });
    } catch (error) {
      console.error("Error submitting question:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your question. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold mb-4">Guest Questions & Answers</h2>
      
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-lg shadow-sm border border-stone-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-stone-800">{q.question}</p>
                <p className="text-sm text-stone-500 mt-1">Asked by {q.userName} - {q.createdAt}</p>
              </div>
              {!q.answer && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Awaiting Answer</span>
              )}
            </div>
            
            {q.answer && (
              <div className="mt-4 pl-4 border-l-2 border-primary-100">
                <p className="text-stone-700">{q.answer}</p>
                <p className="text-sm text-stone-500 mt-1">Response from Hotel Staff</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-stone-200">
        <h3 className="font-semibold mb-3">Ask a Question</h3>
        <div className="space-y-3">
          <Textarea 
            placeholder="Type your question about this hotel..." 
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-stone-500">Questions are typically answered within 24-48 hours</p>
            <Button 
              onClick={handleSubmitQuestion} 
              disabled={!newQuestion.trim() || isSubmitting}
            >
              Submit Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelQuestions;
