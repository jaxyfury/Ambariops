
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash, Edit } from 'lucide-react';
import { DataTable } from '@amberops/ui/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import toast from 'react-hot-toast';
import { fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '@amberops/api/client';
import type { Testimonial } from '@amberops/lib';
import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';


export default function AdminTestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({ name: '', role: '', quote: '', avatar: '' });

  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const mutation = useMutation({
    mutationFn: (testimonialData: Omit<Testimonial, 'id'> & { id?: string }) => {
        if(editingTestimonial) {
            return updateTestimonial(editingTestimonial.id, testimonialData);
        }
        return addTestimonial(testimonialData);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        toast.success(`Testimonial ${editingTestimonial ? 'updated' : 'created'} successfully!`);
        closeModal();
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        toast.success('Testimonial deleted successfully!');
    },
     onError: (error) => {
        toast.error(error.message);
    }
  });

  const openModal = (testimonial: Testimonial | null = null) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial ? { ...testimonial } : { name: '', role: '', quote: '', avatar: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const columns: ColumnDef<Testimonial>[] = [
    {
        id: 'select',
        header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    },
    { 
        accessorKey: 'name', 
        header: 'Author',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={row.original.avatar} alt={row.original.name} />
                    <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{row.original.name}</p>
                    <p className="text-sm text-muted-foreground">{row.original.role}</p>
                </div>
            </div>
        )
    },
    { accessorKey: 'quote', header: 'Quote', cell: ({ row }) => <p className="max-w-md truncate">{row.original.quote}</p> },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openModal(row.original)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => deleteMutation.mutate(row.original.id)}><Trash className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Manage Testimonials"
        description="Create, edit, and delete customer testimonials."
        actions={<Button onClick={() => openModal()}><PlusCircle className="mr-2 h-4 w-4" /> New Testimonial</Button>}
      />
      <DataTable columns={columns} data={testimonials} filterKey="name" isLoading={isLoading} />
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Edit' : 'Create'} Testimonial</DialogTitle>
            <DialogDescription>Fill in the details for the testimonial.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role / Title</Label>
              <Input id="role" value={formData.role} onChange={(e) => setFormData(f => ({ ...f, role: e.target.value }))} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">Avatar URL</Label>
              <Input id="avatar" value={formData.avatar} onChange={(e) => setFormData(f => ({ ...f, avatar: e.target.value }))} className="col-span-3" placeholder="e.g., https://avatar.vercel.sh/name" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="quote" className="text-right mt-2">Quote</Label>
              <Textarea id="quote" value={formData.quote} onChange={(e) => setFormData(f => ({ ...f, quote: e.target.value }))} className="col-span-3 h-32" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save Testimonial'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
