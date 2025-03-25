import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Adventure } from "@/integrations/supabase/custom-types";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

const AdventuresPage = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [filteredAdventures, setFilteredAdventures] = useState<Adventure[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingAdventure, setEditingAdventure] = useState<Adventure | null>(null);
  const [deletingAdventureId, setDeletingAdventureId] = useState<number | null>(null);

  // New adventure template
  const emptyAdventure: Adventure = {
    id: 0,
    name: "",
    type: "hiking",
    duration: "2 hours",
    difficulty: "easy",
    price: 0,
    image: "https://images.unsplash.com/photo-1682686580003-82234af9e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    bookings: 0,
    rating: 4.5,
    status: "active",
    description: "",
    slug: "",
    location: "Mount Abu",
    requirements: []
  };

  // Form state for new/edit adventure
  const [adventureData, setAdventureData] = useState(emptyAdventure);

  useEffect(() => {
    fetchAdventures();
  }, []);

  useEffect(() => {
    filterAdventures();
  }, [searchQuery, adventures]);

  const fetchAdventures = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("adventures")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      const formattedAdventures: Adventure[] = data.map(adventure => ({
        id: adventure.id,
        name: adventure.name,
        type: adventure.type,
        duration: adventure.duration,
        difficulty: adventure.difficulty,
        price: adventure.price,
        image: adventure.image,
        bookings: adventure.bookings || 0,
        rating: adventure.rating || 4.5,
        status: adventure.status || "active",
        description: adventure.description || "",
        slug: adventure.slug || adventure.name.toLowerCase().replace(/\s+/g, '-'),
        location: adventure.location || "Mount Abu",
        requirements: adventure.requirements || [],
        review_count: adventure.review_count || 10,
        reviewCount: adventure.review_count || 10,
        includes: adventure.includes || [],
        timeline: adventure.timeline || []
      }));

      setAdventures(formattedAdventures);
      setFilteredAdventures(formattedAdventures);
    } catch (error: any) {
      console.error("Error fetching adventures:", error.message);
      toast.error("Failed to load adventures");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAdventures = () => {
    if (!searchQuery.trim()) {
      setFilteredAdventures(adventures);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = adventures.filter(
      adventure =>
        adventure.name.toLowerCase().includes(query) ||
        adventure.type.toLowerCase().includes(query) ||
        adventure.location.toLowerCase().includes(query) ||
        adventure.description?.toLowerCase().includes(query)
    );
    setFilteredAdventures(filtered);
  };

  const handleAddAdventure = async () => {
    try {
      const newAdventureData = {
        name: adventureData.name,
        type: adventureData.type,
        duration: adventureData.duration,
        difficulty: adventureData.difficulty,
        price: adventureData.price,
        image: adventureData.image,
        location: adventureData.location,
        description: adventureData.description,
        status: "active"
      };

      const { data, error } = await supabase
        .from("adventures")
        .insert([newAdventureData])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const addedAdventure: Adventure = {
          id: data[0].id,
          name: data[0].name,
          type: data[0].type,
          duration: data[0].duration,
          difficulty: data[0].difficulty,
          price: data[0].price,
          image: data[0].image,
          bookings: 0,
          rating: 4.5,
          status: data[0].status,
          description: data[0].description || "",
          slug: data[0].name.toLowerCase().replace(/\s+/g, '-'),
          location: data[0].location || "Mount Abu",
          requirements: [],
          review_count: 0,
          reviewCount: 0
        };

        setAdventures(prevAdventures => [addedAdventure, ...prevAdventures]);
        toast.success("Adventure created successfully");
        setIsAddDialogOpen(false);
        setAdventureData(emptyAdventure);
      }
    } catch (error: any) {
      console.error("Error adding adventure:", error.message);
      toast.error("Failed to create adventure");
    }
  };

  const handleUpdateAdventure = async () => {
    if (!editingAdventure) return;

    try {
      const updatedAdventureData = {
        name: adventureData.name,
        type: adventureData.type,
        duration: adventureData.duration,
        difficulty: adventureData.difficulty,
        price: adventureData.price,
        image: adventureData.image,
        location: adventureData.location,
        description: adventureData.description,
        status: adventureData.status
      };

      const { error } = await supabase
        .from("adventures")
        .update(updatedAdventureData)
        .eq("id", editingAdventure.id);

      if (error) throw error;

      const updatedAdventure: Adventure = {
        ...editingAdventure,
        ...adventureData,
        slug: adventureData.name.toLowerCase().replace(/\s+/g, '-')
      };

      setAdventures(prevAdventures =>
        prevAdventures.map(adv => (adv.id === editingAdventure.id ? updatedAdventure : adv))
      );
      setFilteredAdventures(prevFilteredAdventures =>
        prevFilteredAdventures.map(adv => (adv.id === editingAdventure.id ? updatedAdventure : adv))
      );

      toast.success("Adventure updated successfully");
      setIsEditDialogOpen(false);
      setEditingAdventure(null);
      setAdventureData(emptyAdventure);
    } catch (error: any) {
      console.error("Error updating adventure:", error.message);
      toast.error("Failed to update adventure");
    }
  };

  const handleDeleteAdventure = async (id: number) => {
    try {
      const { error } = await supabase
        .from("adventures")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAdventures(prevAdventures => prevAdventures.filter(adv => adv.id !== id));
      setFilteredAdventures(prevFilteredAdventures => prevFilteredAdventures.filter(adv => adv.id !== id));

      toast.success("Adventure deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingAdventureId(null);
    } catch (error: any) {
      console.error("Error deleting adventure:", error.message);
      toast.error("Failed to delete adventure");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdventureData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = (adventure: Adventure) => {
    setEditingAdventure(adventure);
    setAdventureData(adventure);
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Adventures</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Adventure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Adventure</DialogTitle>
              <DialogDescription>
                Add a new adventure to the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={adventureData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setAdventureData(prev => ({ ...prev, type: value }))} defaultValue={adventureData.type}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiking">Hiking</SelectItem>
                    <SelectItem value="biking">Biking</SelectItem>
                    <SelectItem value="kayaking">Kayaking</SelectItem>
                    <SelectItem value="climbing">Climbing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Input
                  type="text"
                  id="duration"
                  name="duration"
                  value={adventureData.duration}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="difficulty" className="text-right">
                  Difficulty
                </Label>
                <Select onValueChange={(value) => setAdventureData(prev => ({ ...prev, difficulty: value }))} defaultValue={adventureData.difficulty}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={adventureData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  value={adventureData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={adventureData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={adventureData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleAddAdventure}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search adventures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">Loading adventures...</TableCell>
            </TableRow>
          ) : filteredAdventures.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">No adventures found.</TableCell>
            </TableRow>
          ) : (
            filteredAdventures.map((adventure) => (
              <TableRow key={adventure.id}>
                <TableCell>{adventure.name}</TableCell>
                <TableCell>{adventure.type}</TableCell>
                <TableCell>{adventure.duration}</TableCell>
                <TableCell>{adventure.difficulty}</TableCell>
                <TableCell>₹{adventure.price}</TableCell>
                <TableCell>
                  <Badge variant={adventure.status === "active" ? "success" : "secondary"}>
                    {adventure.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Dialog open={isEditDialogOpen && editingAdventure?.id === adventure.id} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleEditClick(adventure)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Adventure</DialogTitle>
                          <DialogDescription>
                            Edit the details of the adventure.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={adventureData.name}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Type
                            </Label>
                            <Select onValueChange={(value) => setAdventureData(prev => ({ ...prev, type: value }))} defaultValue={adventureData.type}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hiking">Hiking</SelectItem>
                                <SelectItem value="biking">Biking</SelectItem>
                                <SelectItem value="kayaking">Kayaking</SelectItem>
                                <SelectItem value="climbing">Climbing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                              Duration
                            </Label>
                            <Input
                              type="text"
                              id="duration"
                              name="duration"
                              value={adventureData.duration}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="difficulty" className="text-right">
                              Difficulty
                            </Label>
                            <Select onValueChange={(value) => setAdventureData(prev => ({ ...prev, difficulty: value }))} defaultValue={adventureData.difficulty}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="challenging">Challenging</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Price
                            </Label>
                            <Input
                              type="number"
                              id="price"
                              name="price"
                              value={adventureData.price}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                              Image URL
                            </Label>
                            <Input
                              type="text"
                              id="image"
                              name="image"
                              value={adventureData.image}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <Input
                              type="text"
                              id="location"
                              name="location"
                              value={adventureData.location}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={adventureData.description}
                              onChange={handleInputChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select onValueChange={(value) => setAdventureData(prev => ({ ...prev, status: value }))} defaultValue={adventureData.status}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" onClick={handleUpdateAdventure}>Update</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={isDeleteDialogOpen && deletingAdventureId === adventure.id} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="icon" onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setDeletingAdventureId(adventure.id);
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the adventure from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" variant="destructive" onClick={() => handleDeleteAdventure(adventure.id)}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdventuresPage;
