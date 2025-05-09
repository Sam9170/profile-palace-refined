
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, UserPlus, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// User type definition
type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

// Sample initial user data
const initialUsers: UserType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    role: "Admin"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 987-654-3210",
    role: "User"
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.j@example.com",
    phone: "+1 555-123-4567",
    role: "User"
  }
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for adding/editing user
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "User"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddUserDialog = () => {
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "User"
    });
    setIsDialogOpen(true);
  };

  const openEditUserDialog = (user: UserType) => {
    setIsEditing(true);
    setCurrentUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (user: UserType) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleAddUser = () => {
    if (!formData.firstName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the first name and email.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      ...formData,
    };

    setUsers([...users, newUser]);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "User has been added successfully.",
      duration: 3000,
    });
  };

  const handleEditUser = () => {
    if (!currentUser || !formData.firstName || !formData.email) return;

    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? { ...user, ...formData } : user
    );

    setUsers(updatedUsers);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "User has been updated successfully.",
      duration: 3000,
    });
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;

    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "User has been deleted successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Users</h2>
          <p className="text-muted-foreground">Add, edit or remove users</p>
        </div>
        <Button onClick={openAddUserDialog} className="animate-fade-in">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openEditUserDialog(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openDeleteDialog(user)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-10 w-10 text-muted-foreground/60" />
                    <p>No users found</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={openAddUserDialog}
                    >
                      Add your first user
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={isEditing ? handleEditUser : handleAddUser}>
              {isEditing ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete {currentUser?.firstName} {currentUser?.lastName}?</p>
            <p className="text-muted-foreground text-sm mt-1">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
