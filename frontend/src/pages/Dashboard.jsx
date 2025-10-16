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
import { Plus, BookOpen, Users, Layers } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [workCounts, setWorkCounts] = useState({});

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get(`${API}/works`);
      setWorks(response.data);
      
      // Fetch counts for each work
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
      toast.error('Error al cargar las obras');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/works`, formData);
      toast.success('Obra creada exitosamente');
      setOpen(false);
      setFormData({ title: '', description: '' });
      fetchWorks();
    } catch (error) {
      console.error('Error creating work:', error);
      toast.error('Error al crear la obra');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="hero-gradient border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight mb-3" data-testid="dashboard-title">
                Character Architect
              </h1>
              <p className="text-sm md:text-base leading-7 text-muted-foreground max-w-2xl">
                Construye mundos y personajes complejos para tus historias
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" data-testid="create-work-button">
                  <Plus className="h-5 w-5 mr-2" />
                  Nueva Obra
                </Button>
              </DialogTrigger>
              <DialogContent data-testid="create-work-dialog">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Obra</DialogTitle>
                    <DialogDescription>
                      Una obra agrupa tus razas y personajes en un universo único.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        data-testid="work-title-input"
                        placeholder="Ej: El Señor de los Anillos"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        data-testid="work-description-input"
                        placeholder="Describe brevemente tu obra..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" data-testid="work-submit-button">Crear Obra</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] py-12">
        {works.length === 0 ? (
          <DataEmptyState
            testId="empty-works"
            icon={BookOpen}
            title="Comienza un nuevo universo"
            description="Una obra agrupa tus razas y personajes. Crea tu primera obra para empezar a dar vida a tu mundo."
            actionLabel="Crear Obra"
            onAction={() => setOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="works-grid">
            {works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                <Card
                  data-testid={`work-card-${work.id}`}
                  className="cursor-pointer transition-all duration-200 hover:shadow-sm hover:bg-secondary/50 h-full"
                  onClick={() => navigate(`/works/${work.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">{work.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {work.description || 'Sin descripción'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Badge variant="outline" className="font-ui text-[11px]">
                        <Layers className="h-3 w-3 mr-1" />
                        {workCounts[work.id]?.races || 0} razas
                      </Badge>
                      <Badge variant="outline" className="font-ui text-[11px]">
                        <Users className="h-3 w-3 mr-1" />
                        {workCounts[work.id]?.characters || 0} personajes
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}