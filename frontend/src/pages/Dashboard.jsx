import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DataEmptyState } from '@/components/DataEmptyState';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Plus, BookOpen, Users, Layers, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [workCounts, setWorkCounts] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: '', name: '' });

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get(`${API}/works`);
      setWorks(response.data);
      
      const counts = {};
      for (const work of response.data) {
        const [racesRes, charactersRes] = await Promise.all([
          axios.get(`${API}/works/${work.id}/races`),
          axios.get(`${API}/works/${work.id}/characters`)
        ]);
        counts[work.id] = {
          races: racesRes.data.length,
          characters: charactersRes.data.length
        };
      }
      setWorkCounts(counts);
    } catch (error) {
      console.error('Error fetching works:', error);
      toast.error(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/works`, formData);
      toast.success(t.workCreated);
      setOpen(false);
      setFormData({ title: '', description: '' });
      fetchWorks();
    } catch (error) {
      console.error('Error creating work:', error);
      toast.error(t.errorSaving);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/works/${deleteDialog.id}`);
      toast.success(t.workDeleted);
      setDeleteDialog({ open: false, id: '', name: '' });
      fetchWorks();
    } catch (error) {
      console.error('Error deleting work:', error);
      toast.error(t.errorDeleting);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="gradient-header border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight mb-3" data-testid="dashboard-title">
              {t.appTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.appSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {works.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <DataEmptyState
                testId="empty-works"
                icon={BookOpen}
                title={t.emptyWorks}
                description={t.emptyWorksDesc}
                actionLabel={t.createWork}
                onAction={() => setOpen(true)}
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold tracking-tight">{t.newWork}</h3>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="create-work-button" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    {t.createWork}
                  </Button>
                </DialogTrigger>
                <DialogContent data-testid="create-work-dialog" className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{t.createWorkTitle}</DialogTitle>
                      <DialogDescription className="text-base">
                        {t.createWorkDesc}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 py-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">{t.title} *</Label>
                        <Input
                          id="title"
                          data-testid="work-title-input"
                          placeholder={t.workTitlePlaceholder}
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">{t.description}</Label>
                        <Textarea
                          id="description"
                          data-testid="work-description-input"
                          placeholder={t.workDescPlaceholder}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" data-testid="work-submit-button" size="lg">
                        {t.create}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="works-grid">
              {works.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    data-testid={`work-card-${work.id}`}
                    className="group relative card-hover cursor-pointer border-2 hover:border-primary/50 h-full"
                    onClick={() => navigate(`/works/${work.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl font-semibold line-clamp-2 flex-1">
                          {work.title}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-2 hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialog({ open: true, id: work.id, name: work.title });
                          }}
                          data-testid={`delete-work-${work.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-2 text-base">
                        {work.description || t.noDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="text-xs font-medium">
                          <Layers className="h-3 w-3 mr-1.5" />
                          {workCounts[work.id]?.races || 0} {t.races}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-medium">
                          <Users className="h-3 w-3 mr-1.5" />
                          {workCounts[work.id]?.characters || 0} {t.characters}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent data-testid="delete-work-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteWorkDesc} "{deleteDialog.name}". {t.deleteWarning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="delete-cancel-button">{t.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              data-testid="delete-confirm-button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
