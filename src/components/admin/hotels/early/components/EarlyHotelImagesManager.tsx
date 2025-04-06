
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2, ImagePlus, CheckCircle, MoveUp, MoveDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HotelImage {
  id?: number;
  hotel_id: number;
  image_url: string;
  caption?: string;
  is_primary: boolean;
  display_order: number;
}

interface EarlyHotelImagesManagerProps {
  hotelId: number;
}

const EarlyHotelImagesManager: React.FC<EarlyHotelImagesManagerProps> = ({ hotelId }) => {
  const [images, setImages] = useState<HotelImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [hotelId]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('early_hotel_images')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load hotel images');
    } finally {
      setLoading(false);
    }
  };

  const addNewImage = async () => {
    if (!newImageUrl) {
      toast.error('Please enter an image URL');
      return;
    }

    try {
      // Set the display order to be the highest current + 1
      const highestOrder = images.length > 0 
        ? Math.max(...images.map(img => img.display_order)) 
        : -1;
      
      const newImage: Omit<HotelImage, 'id'> = {
        hotel_id: hotelId,
        image_url: newImageUrl,
        caption: newImageCaption || undefined,
        is_primary: images.length === 0, // Make first image primary if there are no others
        display_order: highestOrder + 1
      };
      
      const { error } = await supabase
        .from('early_hotel_images')
        .insert(newImage);

      if (error) throw error;
      
      fetchImages();
      setNewImageUrl('');
      setNewImageCaption('');
      setIsAddingNew(false);
      toast.success('Image added successfully');
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error('Failed to add image');
    }
  };

  const deleteImage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('early_hotel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchImages();
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const setPrimaryImage = async (id: number) => {
    try {
      // First set all images to non-primary
      await supabase
        .from('early_hotel_images')
        .update({ is_primary: false })
        .eq('hotel_id', hotelId);
      
      // Then set the selected image as primary
      const { error } = await supabase
        .from('early_hotel_images')
        .update({ is_primary: true })
        .eq('id', id);

      if (error) throw error;
      
      fetchImages();
      toast.success('Primary image updated');
    } catch (error) {
      console.error('Error setting primary image:', error);
      toast.error('Failed to update primary image');
    }
  };

  const moveImage = async (id: number, direction: 'up' | 'down') => {
    const imageIndex = images.findIndex(img => img.id === id);
    if (imageIndex === -1) return;
    
    const targetIndex = direction === 'up' ? imageIndex - 1 : imageIndex + 1;
    
    // Check if the target index is valid
    if (targetIndex < 0 || targetIndex >= images.length) return;
    
    try {
      const currentImage = images[imageIndex];
      const targetImage = images[targetIndex];
      
      // Swap display orders
      const { error: error1 } = await supabase
        .from('early_hotel_images')
        .update({ display_order: targetImage.display_order })
        .eq('id', currentImage.id);
        
      const { error: error2 } = await supabase
        .from('early_hotel_images')
        .update({ display_order: currentImage.display_order })
        .eq('id', targetImage.id);
        
      if (error1 || error2) throw error1 || error2;
      
      fetchImages();
    } catch (error) {
      console.error('Error reordering images:', error);
      toast.error('Failed to reorder images');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Hotel Images</CardTitle>
        <Button 
          onClick={() => setIsAddingNew(!isAddingNew)} 
          size="sm"
          variant="outline"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </CardHeader>
      <CardContent>
        {isAddingNew && (
          <div className="mb-4 p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-3">Add New Image</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="new-image-url">Image URL</Label>
                <Input 
                  id="new-image-url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <Label htmlFor="new-image-caption">Caption (optional)</Label>
                <Input 
                  id="new-image-caption"
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  placeholder="Enter caption"
                />
              </div>
              
              {newImageUrl && (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img 
                    src={newImageUrl} 
                    alt="Preview" 
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
              
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
                  onClick={addNewImage}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border rounded-md overflow-hidden relative group">
                <div className="absolute top-2 right-2 z-10 flex space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white opacity-90 hover:opacity-100"
                    onClick={() => deleteImage(image.id!)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                
                {image.is_primary && (
                  <div className="absolute top-2 left-2 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Primary
                  </div>
                )}
                
                <img 
                  src={image.image_url} 
                  alt={image.caption || `Hotel image ${image.id}`} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-3 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {image.caption || `Image ${image.id}`}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveImage(image.id!, 'up')}
                        disabled={images.indexOf(image) === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveImage(image.id!, 'down')}
                        disabled={images.indexOf(image) === images.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {!image.is_primary && (
                    <div className="mt-2 flex items-center space-x-2">
                      <Switch
                        id={`primary-${image.id}`}
                        checked={image.is_primary}
                        onCheckedChange={() => setPrimaryImage(image.id!)}
                      />
                      <Label htmlFor={`primary-${image.id}`} className="text-sm cursor-pointer">
                        Set as primary image
                      </Label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !isAddingNew && (
          <div className="text-center py-8 text-gray-500">
            <p>No images found. Add some images to showcase this hotel.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarlyHotelImagesManager;
