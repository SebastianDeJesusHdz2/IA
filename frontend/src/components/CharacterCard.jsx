import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export const CharacterCard = ({ character, onClick, raceName }) => {
  const { t } = useLanguage();
  
  const characterTypeColors = {
    protagonista: 'bg-primary text-primary-foreground',
    antagonista: 'bg-destructive text-destructive-foreground',
    secundario: 'bg-secondary text-secondary-foreground',
    NPC: 'bg-muted text-muted-foreground',
  };

  const characterTypeLabels = {
    protagonista: t.protagonist,
    antagonista: t.antagonist,
    secundario: t.secondary,
    NPC: t.npc,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        data-testid={`character-card-${character.id}`}
        className="group card-hover cursor-pointer border-2 hover:border-primary/50"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center overflow-hidden ring-2 ring-border">
              {character.image_url ? (
                <img
                  src={character.image_url}
                  alt={character.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-semibold text-base truncate">{character.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {character.age ? `${character.age} ${t.yearsOld}` : t.ageNotSpecified}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 flex-wrap">
            <Badge
              className={`${characterTypeColors[character.character_type] || 'bg-secondary'} text-xs font-medium`}
            >
              {characterTypeLabels[character.character_type] || character.character_type}
            </Badge>
            {raceName && (
              <Badge variant="outline" className="text-xs font-medium">
                {raceName}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};