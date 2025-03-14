
import React, { useState, useEffect } from 'react';
import { Image, Upload, X, Eye, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "sonner";

interface Photo {
  id: string;
  url: string;
  caption: string;
  location: string;
  username: string;
  likes: number;
  comments: number;
  userLiked: boolean;
  date: string;
  tags: string[];
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadLocation, setUploadLocation] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      setPhotos(generateMockPhotos());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateMockPhotos = (): Photo[] => {
    const locations = ['Nakki Lake', 'Sunset Point', 'Dilwara Temples', 'Guru Shikhar', 'Mount Abu Wildlife Sanctuary'];
    const captions = [
      'Beautiful sunset view from the hotel',
      'Amazing experience at Mount Abu',
      'The view is breathtaking',
      'Nature at its best',
      'Perfect weekend getaway',
      'Must visit place in Rajasthan',
      'Spiritual journey at the temples'
    ];
    const usernames = ['traveler123', 'mountainlover', 'photoexplorer', 'wanderlust', 'naturephotography'];
    const tags = ['nature', 'travel', 'landscape', 'mountains', 'sunset', 'temple', 'architecture', 'wildlife', 'lake'];

    // Sample image URLs (replace with actual images)
    const imageUrls = [
      'https://images.unsplash.com/photo-1626621344862-5e4a5d5575b5',
      'https://images.unsplash.com/photo-1566553253535-2754e6762695',
      'https://images.unsplash.com/photo-1576487236230-eaa4afe68b9c',
      'https://images.unsplash.com/photo-1576487248805-cf45bb9a77df',
      'https://images.unsplash.com/photo-1575482420752-345ad9f48aa4',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
      'https://images.unsplash.com/photo-1596205520154-40dbd4b729de'
    ];

    // Generate 12 mock photos
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      return {
        id: `photo-${i + 1}`,
        url: `${imageUrls[i % imageUrls.length]}?w=600&h=400&auto=format&fit=crop`,
        caption: captions[Math.floor(Math.random() * captions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        username: usernames[Math.floor(Math.random() * usernames.length)],
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        userLiked: Math.random() > 0.5,
        date: date.toISOString().split('T')[0],
        tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
          tags[Math.floor(Math.random() * tags.length)]
        )
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadFile) {
      toast.error("Please select an image to upload");
      return;
    }

    if (!uploadCaption) {
      toast.error("Please add a caption for your photo");
      return;
    }

    if (!uploadLocation) {
      toast.error("Please specify the location");
      return;
    }

    setIsUploading(true);

    // Simulate upload with timeout
    setTimeout(() => {
      // Create a new photo object
      const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        url: URL.createObjectURL(uploadFile),
        caption: uploadCaption,
        location: uploadLocation,
        username: 'currentUser', // In a real app, get from auth context
        likes: 0,
        comments: 0,
        userLiked: false,
        date: new Date().toISOString().split('T')[0],
        tags: uploadTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };

      // Add to photos array
      setPhotos([newPhoto, ...photos]);
      
      // Reset form
      setUploadFile(null);
      setUploadCaption('');
      setUploadLocation('');
      setUploadTags('');
      setIsUploading(false);
      
      toast.success("Photo uploaded successfully!");
    }, 2000);
  };

  const toggleLike = (photoId: string) => {
    setPhotos(prevPhotos => 
      prevPhotos.map(photo => {
        if (photo.id === photoId) {
          const userLiked = !photo.userLiked;
          return {
            ...photo,
            userLiked,
            likes: userLiked ? photo.likes + 1 : photo.likes - 1
          };
        }
        return photo;
      })
    );
  };

  const filterPhotosByTag = (tag: string) => {
    if (tag === 'all') {
      return photos;
    }
    return photos.filter(photo => photo.tags.includes(tag));
  };

  const handleRemoveUpload = () => {
    setUploadFile(null);
  };
  
  if (isLoading) {
    return <div className="p-8 flex justify-center">Loading gallery...</div>;
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Mount Abu Trip Gallery</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  <span>Share Your Photos</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload a Photo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    {uploadFile ? (
                      <div className="relative w-full h-[200px] border rounded-md overflow-hidden">
                        <img 
                          src={URL.createObjectURL(uploadFile)} 
                          alt="Upload preview" 
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={handleRemoveUpload}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                        <Image className="h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Drag & drop or click to select</p>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="caption" className="text-sm font-medium">
                      Caption
                    </label>
                    <Input 
                      id="caption" 
                      value={uploadCaption} 
                      onChange={(e) => setUploadCaption(e.target.value)} 
                      placeholder="Add a caption to your photo"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <Input 
                      id="location" 
                      value={uploadLocation} 
                      onChange={(e) => setUploadLocation(e.target.value)} 
                      placeholder="Where was this photo taken?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input 
                      id="tags" 
                      value={uploadTags} 
                      onChange={(e) => setUploadTags(e.target.value)} 
                      placeholder="nature, sunset, temple"
                    />
                  </div>
                </div>
                <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
              <TabsTrigger value="temple">Temples</TabsTrigger>
              <TabsTrigger value="sunset">Sunsets</TabsTrigger>
              <TabsTrigger value="landscape">Landscapes</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filterPhotosByTag(activeTab).map(photo => (
                  <Card key={photo.id} className="overflow-hidden group cursor-pointer">
                    <div 
                      className="relative h-48 overflow-hidden"
                      onClick={() => setSelectedImage(photo)}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.caption} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardFooter className="flex justify-between pt-3 pb-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">{photo.location}</span>
                        <span className="text-xs text-gray-400">By {photo.username}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => toggleLike(photo.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${photo.userLiked ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                        <span className="text-xs flex items-center">{photo.likes}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Image detail dialog */}
          <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
            <DialogContent className="sm:max-w-[700px]">
              {selectedImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-md">
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.caption} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{selectedImage.location}</h3>
                    <p className="text-sm mt-1">{selectedImage.caption}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedImage.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      Posted by {selectedImage.username} on {selectedImage.date}
                    </div>
                    <div className="mt-auto pt-4 flex justify-between">
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => toggleLike(selectedImage.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${selectedImage.userLiked ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                          <span>Like ({selectedImage.likes})</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>Comment ({selectedImage.comments})</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoGallery;
