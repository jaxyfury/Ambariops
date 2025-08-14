
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
import { format } from 'date-fns';
import { fetchDocumentationArticles, addDocumentationArticle, updateDocumentationArticle, deleteDocumentationArticle } from '@amberops/api/client';
import type { DocumentationArticle } from '@amberops/lib';

export default function AdminDocumentationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<DocumentationArticle | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '' });

  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery<DocumentationArticle[]>({
    queryKey: ['documentation'],
    queryFn: fetchDocumentationArticles,
  });

  const mutation = useMutation({
    mutationFn: (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
        if(editingArticle) {
            return updateDocumentationArticle(editingArticle.slug, articleData);
        }
        return addDocumentationArticle(articleData);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['documentation'] });
        toast.success(`Article ${editingArticle ? 'updated' : 'created'} successfully!`);
        closeModal();
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deleteDocumentationArticle(slug),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['documentation'] });
        toast.success('Article deleted successfully!');
    },
     onError: (error) => {
        toast.error(error.message);
    }
  });


  const openModal = (article: DocumentationArticle | null = null) => {
    setEditingArticle(article);
    setFormData(article ? { title: article.title, slug: article.slug, content: article.content } : { title: '', slug: '', content: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const columns: ColumnDef<DocumentationArticle>[] = [
    {
        id: 'select',
        header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    },
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'slug', header: 'Slug' },
    { accessorKey: 'updatedAt', header: 'Last Updated', cell: ({ row }) => format(new Date(row.original.updatedAt), 'PPp') },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openModal(row.original)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => deleteMutation.mutate(row.original.slug)}><Trash className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Manage Documentation"
        description="Create, edit, and delete documentation articles."
        actions={<Button onClick={() => openModal()}><PlusCircle className="mr-2 h-4 w-4" /> New Article</Button>}
      />
      <DataTable columns={columns} data={articles} filterKey="title" isLoading={isLoading} />
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingArticle ? 'Edit' : 'Create'} Article</DialogTitle>
            <DialogDescription>Fill in the details for the documentation article.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">Slug</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => setFormData(f => ({ ...f, slug: e.target.value }))} className="col-span-3" disabled={!!editingArticle} />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right mt-2">Content</Label>
              <Textarea id="content" value={formData.content} onChange={(e) => setFormData(f => ({ ...f, content: e.target.value }))} className="col-span-3 h-64" placeholder="Use HTML for formatting." />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save Article'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
