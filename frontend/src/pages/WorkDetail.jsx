import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DataEmptyState } from '@/components/DataEmptyState';
import { CharacterCard } from '@/components/CharacterCard';
import { DynamicFieldRenderer } from '@/components/DynamicFieldRenderer';
import { ImageUpload } from '@/components/ImageUpload';
import { Plus, ArrowLeft, Layers, Users, Edit, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
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

export default function WorkDetail() {
  const { workId } = useParams();
  const navigate = useNavigate();
  
  const [work, setWork] = useState(null);
  const [races, setRaces] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('characters');
  
  // Race state
  const [raceSheetOpen, setRaceSheetOpen] = useState(false);
  const [editingRace, setEditingRace] = useState(null);
  const [raceFormData, setRaceFormData] = useState({ name: '', description: '', template_fields: [] });
  const [templateJson, setTemplateJson] = useState('[]');
  
  // Character state
  const [characterSheetOpen, setCharacterSheetOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [characterFormData, setCharacterFormData] = useState({
    name: '',
    age: '',
    character_type: 'secundario',
    race_id: '',
    image_url: '',
    custom_fields: {}
  });
  
  // Delete confirmation
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: '', name: '' });

  useEffect(() => {
    fetchData();
  }, [workId]);

  const fetchData = async () => {
    try {
      const [workRes, racesRes, charactersRes] = await Promise.all([
        axios.get(`${API}/works/${workId}`),
        axios.get(`${API}/works/${workId}/races`),
        axios.get(`${API}/works/${workId}/characters`)
      ]);
      setWork(workRes.data);
      setRaces(racesRes.data);
      setCharacters(charactersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Race handlers
  const handleRaceSubmit = async (e) => {
    e.preventDefault();
    try {
      let parsedTemplate = [];
      try {
        parsedTemplate = JSON.parse(templateJson);
      } catch (err) {
        toast.error('Error: El JSON de template no es válido');
        return;
      }

      const payload = { ...raceFormData, template_fields: parsedTemplate };

      if (editingRace) {
        await axios.put(`${API}/races/${editingRace.id}`, payload);
        toast.success('Raza actualizada exitosamente');
      } else {
        await axios.post(`${API}/works/${workId}/races`, payload);
        toast.success('Raza creada exitosamente');
      }
      
      setRaceSheetOpen(false);
      resetRaceForm();
      fetchData();
    } catch (error) {
      console.error('Error saving race:', error);
      toast.error('Error al guardar la raza');
    }
  };

  const resetRaceForm = () => {
    setEditingRace(null);
    setRaceFormData({ name: '', description: '', template_fields: [] });
    setTemplateJson('[]');
  };

  const openEditRace = (race) => {
    setEditingRace(race);
    setRaceFormData({
      name: race.name,
      description: race.description,
      template_fields: race.template_fields
    });
    setTemplateJson(JSON.stringify(race.template_fields, null, 2));
    setRaceSheetOpen(true);
  };

  // Character handlers
  const handleCharacterSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...characterFormData,
        age: characterFormData.age ? parseInt(characterFormData.age) : null,
        race_id: characterFormData.race_id || null
      };

      if (editingCharacter) {
        await axios.put(`${API}/characters/${editingCharacter.id}`, payload);
        toast.success('Personaje actualizado exitosamente');
      } else {
        await axios.post(`${API}/works/${workId}/characters`, payload);
        toast.success('Personaje creado exitosamente');
      }
      
      setCharacterSheetOpen(false);
      resetCharacterForm();
      fetchData();
    } catch (error) {
      console.error('Error saving character:', error);
      toast.error('Error al guardar el personaje');
    }
  };

  const resetCharacterForm = () => {
    setEditingCharacter(null);
    setCharacterFormData({
      name: '',
      age: '',
      character_type: 'secundario',
      race_id: '',
      image_url: '',
      custom_fields: {}
    });
  };

  const openEditCharacter = (character) => {
    setEditingCharacter(character);
    setCharacterFormData({
      name: character.name,
      age: character.age ? character.age.toString() : '',
      character_type: character.character_type,
      race_id: character.race_id || '',
      image_url: character.image_url || '',
      custom_fields: character.custom_fields || {}
    });
    setCharacterSheetOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (deleteDialog.type === 'race') {
        await axios.delete(`${API}/races/${deleteDialog.id}`);
        toast.success('Raza eliminada exitosamente');
      } else {
        await axios.delete(`${API}/characters/${deleteDialog.id}`);
        toast.success('Personaje eliminado exitosamente');
      }
      setDeleteDialog({ open: false, type: '', id: '', name: '' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Error al eliminar');
    }
  };

  const selectedRace = races.find(r => r.id === characterFormData.race_id);
  const templateFields = selectedRace?.template_fields || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4"
            data-testid="back-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al dashboard
          </Button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading tracking-tight mb-2" data-testid="work-title">
              {work?.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {work?.description || 'Sin descripción'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} data-testid="work-tabs">
          <TabsList className="mb-6">
            <TabsTrigger value="characters" data-testid="characters-tab">
              <Users className="h-4 w-4 mr-2" />
              Personajes
            </TabsTrigger>
            <TabsTrigger value="races" data-testid="races-tab">
              <Layers className="h-4 w-4 mr-2" />
              Razas
            </TabsTrigger>
          </TabsList>

          {/* Characters Tab */}
          <TabsContent value="characters" data-testid="characters-tab-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base md:text-lg font-ui font-medium tracking-[-0.01em]">
                Personajes ({characters.length})
              </h2>
              <Sheet open={characterSheetOpen} onOpenChange={setCharacterSheetOpen}>
                <SheetTrigger asChild>
                  <Button onClick={resetCharacterForm} data-testid="add-character-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Personaje
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto sm:max-w-[600px]" data-testid="character-sheet">
                  <form onSubmit={handleCharacterSubmit}>
                    <SheetHeader>
                      <SheetTitle>
                        {editingCharacter ? 'Editar Personaje' : 'Nuevo Personaje'}
                      </SheetTitle>
                      <SheetDescription>
                        Crea un personaje usando un template de raza o define atributos personalizados.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-6">
                      <div className="space-y-2">
                        <Label htmlFor="char-name">Nombre *</Label>
                        <Input
                          id="char-name"
                          data-testid="character-name-input"
                          placeholder="Ej: Aragorn"
                          value={characterFormData.name}
                          onChange={(e) => setCharacterFormData({ ...characterFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="char-age">Edad</Label>
                          <Input
                            id="char-age"
                            data-testid="character-age-input"
                            type="number"
                            placeholder="Ej: 87"
                            value={characterFormData.age}
                            onChange={(e) => setCharacterFormData({ ...characterFormData, age: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="char-type">Tipo *</Label>
                          <Select
                            value={characterFormData.character_type}
                            onValueChange={(val) => setCharacterFormData({ ...characterFormData, character_type: val })}
                          >
                            <SelectTrigger data-testid="character-type-select">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="protagonista">Protagonista</SelectItem>
                              <SelectItem value="antagonista">Antagonista</SelectItem>
                              <SelectItem value="secundario">Secundario</SelectItem>
                              <SelectItem value="NPC">NPC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="char-race">Raza</Label>
                        <Select
                          value={characterFormData.race_id}
                          onValueChange={(val) => setCharacterFormData({ ...characterFormData, race_id: val, custom_fields: {} })}
                        >
                          <SelectTrigger data-testid="character-race-select">
                            <SelectValue placeholder="Ninguna / Personalizado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Ninguna / Personalizado</SelectItem>
                            {races.map((race) => (
                              <SelectItem key={race.id} value={race.id}>
                                {race.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <ImageUpload
                        value={characterFormData.image_url}
                        onChange={(val) => setCharacterFormData({ ...characterFormData, image_url: val })}
                        testId="character-image-upload"
                      />

                      {templateFields.length > 0 && (
                        <div className="space-y-3 pt-4 border-t">
                          <h4 className="font-ui font-medium text-sm">Atributos de {selectedRace?.name}</h4>
                          <DynamicFieldRenderer
                            fields={templateFields}
                            values={characterFormData.custom_fields}
                            onChange={(fields) => setCharacterFormData({ ...characterFormData, custom_fields: fields })}
                          />
                        </div>
                      )}
                    </div>
                    <SheetFooter>
                      <Button type="submit" data-testid="character-save-button">
                        {editingCharacter ? 'Actualizar' : 'Crear'} Personaje
                      </Button>
                    </SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>
            </div>

            {characters.length === 0 ? (
              <DataEmptyState
                testId="empty-characters"
                icon={User}
                title="Da vida a tu elenco"
                description="Crea personajes usando templates de raza o define atributos personalizados. Cada personaje puede tener su propia historia."
                actionLabel="Crear Personaje"
                onAction={() => {
                  resetCharacterForm();
                  setCharacterSheetOpen(true);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="characters-grid">
                {characters.map((character) => {
                  const race = races.find(r => r.id === character.race_id);
                  return (
                    <div key={character.id} className="relative group">
                      <CharacterCard
                        character={character}
                        raceName={race?.name}
                        onClick={() => navigate(`/works/${workId}/characters/${character.id}`)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditCharacter(character);
                          }}
                          data-testid={`edit-character-${character.id}`}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialog({ open: true, type: 'character', id: character.id, name: character.name });
                          }}
                          data-testid={`delete-character-${character.id}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Races Tab */}
          <TabsContent value="races" data-testid="races-tab-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base md:text-lg font-ui font-medium tracking-[-0.01em]">
                Razas ({races.length})
              </h2>
              <Sheet open={raceSheetOpen} onOpenChange={setRaceSheetOpen}>
                <SheetTrigger asChild>
                  <Button onClick={resetRaceForm} data-testid="add-race-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Raza
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto sm:max-w-[600px]" data-testid="race-sheet">
                  <form onSubmit={handleRaceSubmit}>
                    <SheetHeader>
                      <SheetTitle>
                        {editingRace ? 'Editar Raza' : 'Nueva Raza'}
                      </SheetTitle>
                      <SheetDescription>
                        Define especies o linajes con atributos personalizados en formato JSON.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-6">
                      <div className="space-y-2">
                        <Label htmlFor="race-name">Nombre *</Label>
                        <Input
                          id="race-name"
                          data-testid="race-name-input"
                          placeholder="Ej: Elfo"
                          value={raceFormData.name}
                          onChange={(e) => setRaceFormData({ ...raceFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="race-description">Descripción</Label>
                        <Textarea
                          id="race-description"
                          data-testid="race-description-input"
                          placeholder="Describe la raza..."
                          value={raceFormData.description}
                          onChange={(e) => setRaceFormData({ ...raceFormData, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="race-template">Template de Campos (JSON)</Label>
                        <Textarea
                          id="race-template"
                          data-testid="race-template-json-textarea"
                          placeholder='[{"key": "affinity", "label": "Afinidad", "type": "text", "required": true}]'
                          value={templateJson}
                          onChange={(e) => setTemplateJson(e.target.value)}
                          rows={8}
                          className="font-mono text-xs"
                        />
                        <p className="text-xs text-muted-foreground">
                          Ejemplo: {`[{"key": "lifespan", "label": "Esperanza de vida", "type": "number"}]`}
                        </p>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button type="submit" data-testid="race-save-button">
                        {editingRace ? 'Actualizar' : 'Crear'} Raza
                      </Button>
                    </SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>
            </div>

            {races.length === 0 ? (
              <DataEmptyState
                testId="empty-races"
                icon={Layers}
                title="Define especies o linajes"
                description="Crea razas con atributos personalizados usando templates JSON. Los personajes pueden heredar estos atributos."
                actionLabel="Crear Raza"
                onAction={() => {
                  resetRaceForm();
                  setRaceSheetOpen(true);
                }}
              />
            ) : (
              <Card data-testid="races-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Campos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {races.map((race) => (
                      <TableRow key={race.id} data-testid={`race-row-${race.id}`}>
                        <TableCell className="font-medium">{race.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {race.description || 'Sin descripción'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-ui text-[11px]">
                            {race.template_fields?.length || 0} campos
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditRace(race)}
                              data-testid={`edit-race-${race.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteDialog({ open: true, type: 'race', id: race.id, name: race.name })}
                              data-testid={`delete-race-${race.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent data-testid="delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de eliminar {deleteDialog.type === 'race' ? 'la raza' : 'el personaje'} "{deleteDialog.name}". Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="delete-cancel-button">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} data-testid="delete-confirm-button">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
