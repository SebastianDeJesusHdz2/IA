import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export const CharacterCard = ({ character, onClick, raceName }) => {
  const characterTypeColors = {
    protagonista: 'bg-primary text-primary-foreground',
    antagonista: 'bg-destructive text-destructive-foreground',
    secundario: 'bg-secondary text-secondary-foreground',
    NPC: 'bg-muted text-muted-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        data-testid={`character-card-${character.id}`}
        className="group cursor-pointer transition-all duration-200 hover:shadow-sm hover:bg-secondary/50"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {character.image_url ? (
                <img
                  src={character.image_url}
                  alt={character.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-ui font-medium text-base truncate">{character.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {character.age ? `${character.age} años` : 'Edad no especificada'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 flex-wrap">
            <Badge
              className={characterTypeColors[character.character_type] || 'bg-secondary'}
              variant="secondary"
            >
              {character.character_type}
            </Badge>
            {raceName && (
              <Badge variant="outline" className="font-ui text-[11px]">
                {raceName}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};