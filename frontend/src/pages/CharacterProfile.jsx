import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, User, Edit } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CharacterProfile() {
  const { workId, characterId } = useParams();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState(null);
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [characterId]);

  const fetchData = async () => {
    try {
      const characterRes = await axios.get(`${API}/characters/${characterId}`);
      setCharacter(characterRes.data);
      
      if (characterRes.data.race_id) {
        const raceRes = await axios.get(`${API}/races/${characterRes.data.race_id}`);
        setRace(raceRes.data);
      }
    } catch (error) {
      console.error('Error fetching character:', error);
      toast.error('Error al cargar el personaje');
    } finally {
      setLoading(false);
    }
  };

  const characterTypeColors = {
    protagonista: 'bg-primary text-primary-foreground',
    antagonista: 'bg-destructive text-destructive-foreground',
    secundario: 'bg-secondary text-secondary-foreground',
    NPC: 'bg-muted text-muted-foreground',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Personaje no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/works/${workId}`)}
            className="mb-4"
            data-testid="back-to-work-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la obra
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Summary Card */}
          <Card className="mb-6" data-testid="character-profile-summary">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
                {/* Image */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative h-48 w-48 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {character.image_url ? (
                      <img
                        src={character.image_url}
                        alt={character.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-24 w-24 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-heading tracking-tight mb-2" data-testid="character-name">
                      {character.name}
                    </h1>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={characterTypeColors[character.character_type] || 'bg-secondary'}>
                        {character.character_type}
                      </Badge>
                      {race && (
                        <Badge variant="outline" className="font-ui">
                          {race.name}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Edad</p>
                      <p className="text-sm font-ui font-medium">
                        {character.age ? `${character.age} años` : 'No especificada'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Raza</p>
                      <p className="text-sm font-ui font-medium">
                        {race ? race.name : 'Personalizado'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/works/${workId}`)}
                      data-testid="edit-character-button"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attributes Section */}
          {Object.keys(character.custom_fields || {}).length > 0 && (
            <Card className="mb-6" data-testid="character-profile-attributes-section">
              <CardHeader>
                <CardTitle className="font-ui text-lg">Atributos</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="attributes">
                    <AccordionTrigger className="font-ui text-sm">
                      Ver todos los atributos ({Object.keys(character.custom_fields).length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {Object.entries(character.custom_fields).map(([key, value]) => {
                          // Find the field definition from race template if exists
                          const fieldDef = race?.template_fields?.find(f => f.key === key);
                          const label = fieldDef?.label || key;
                          
                          return (
                            <div key={key} className="space-y-1">
                              <p className="text-xs text-muted-foreground font-ui">{label}</p>
                              <p className="text-sm font-medium">
                                {typeof value === 'boolean' 
                                  ? (value ? 'Sí' : 'No')
                                  : value?.toString() || 'N/A'}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* Race Details */}
          {race && (
            <Card data-testid="character-profile-race-details">
              <CardHeader>
                <CardTitle className="font-ui text-lg">Sobre la raza: {race.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {race.description || 'Sin descripción'}
                </p>
                {race.template_fields && race.template_fields.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Campos disponibles en esta raza:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {race.template_fields.map((field) => (
                        <Badge key={field.key} variant="outline" className="font-ui text-[11px]">
                          {field.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
