
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, GripVertical, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FAQ {
  id?: number;
  hotel_id: number;
  question: string;
  answer: string;
  display_order: number;
}

interface EarlyHotelFaqsManagerProps {
  hotelId: number;
}

const EarlyHotelFaqsManager: React.FC<EarlyHotelFaqsManagerProps> = ({ hotelId }) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [newFaq, setNewFaq] = useState<Omit<FAQ, 'id'>>(
    { hotel_id: hotelId, question: '', answer: '', display_order: 0 }
  );
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, [hotelId]);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('early_hotel_faqs')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setIsAddingNew(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FAQ) => {
    if (editingFaq) {
      setEditingFaq({ ...editingFaq, [field]: e.target.value });
    }
  };

  const handleNewFaqChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Omit<FAQ, 'id'>) => {
    setNewFaq({ ...newFaq, [field]: e.target.value });
  };

  const saveEditedFaq = async () => {
    if (!editingFaq) return;

    try {
      const { error } = await supabase
        .from('early_hotel_faqs')
        .update({
          question: editingFaq.question,
          answer: editingFaq.answer,
        })
        .eq('id', editingFaq.id);

      if (error) throw error;
      
      fetchFaqs();
      setEditingFaq(null);
      toast.success('FAQ updated successfully');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ');
    }
  };

  const addNewFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error('Please fill in both question and answer');
      return;
    }

    try {
      // Set the display order to be the highest current + 1
      const highestOrder = faqs.length > 0 
        ? Math.max(...faqs.map(faq => faq.display_order)) 
        : -1;
      
      const { error } = await supabase
        .from('early_hotel_faqs')
        .insert({
          ...newFaq,
          display_order: highestOrder + 1
        });

      if (error) throw error;
      
      fetchFaqs();
      setNewFaq({ hotel_id: hotelId, question: '', answer: '', display_order: 0 });
      setIsAddingNew(false);
      toast.success('FAQ added successfully');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast.error('Failed to add FAQ');
    }
  };

  const deleteFaq = async (id: number) => {
    try {
      const { error } = await supabase
        .from('early_hotel_faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchFaqs();
      toast.success('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Frequently Asked Questions</CardTitle>
        <Button 
          onClick={() => { 
            setIsAddingNew(true); 
            setEditingFaq(null);
          }} 
          size="sm"
          variant="outline"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-md p-4">
                {editingFaq && editingFaq.id === faq.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`question-${faq.id}`}>Question</Label>
                      <Input 
                        id={`question-${faq.id}`}
                        value={editingFaq.question}
                        onChange={(e) => handleChange(e, 'question')}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`answer-${faq.id}`}>Answer</Label>
                      <Textarea 
                        id={`answer-${faq.id}`}
                        value={editingFaq.answer}
                        onChange={(e) => handleChange(e, 'answer')}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingFaq(null)} 
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={saveEditedFaq}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start mb-2">
                      <GripVertical className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 cursor-grab" />
                      <div className="flex-grow">
                        <h3 className="font-medium">{faq.question}</h3>
                        <p className="text-gray-600 mt-1">{faq.answer}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(faq)}
                        className="text-blue-600"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFaq(faq.id!)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Add new FAQ form */}
            {isAddingNew && (
              <div className="border rounded-md p-4 border-green-200 bg-green-50">
                <h3 className="font-medium mb-3">Add New FAQ</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="new-question">Question</Label>
                    <Input 
                      id="new-question"
                      value={newFaq.question}
                      onChange={(e) => handleNewFaqChange(e, 'question')}
                      placeholder="Enter question"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-answer">Answer</Label>
                    <Textarea 
                      id="new-answer"
                      value={newFaq.answer}
                      onChange={(e) => handleNewFaqChange(e, 'answer')}
                      placeholder="Enter answer"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsAddingNew(false)} 
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={addNewFaq}
                    >
                      Add FAQ
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {faqs.length === 0 && !isAddingNew && (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs found. Add some FAQs to help guests with common questions.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarlyHotelFaqsManager;
