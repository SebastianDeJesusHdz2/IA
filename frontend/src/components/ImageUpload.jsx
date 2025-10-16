import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export const ImageUpload = ({ value, onChange, testId = 'image-upload' }) => {
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      <Label>Imagen del Personaje</Label>
      <Card
        data-testid={testId}
        className="relative overflow-hidden transition-colors hover:bg-muted/50"
      >
        {preview ? (
          <div className="relative aspect-video w-full">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={handleRemove}
              data-testid={`${testId}-remove-button`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image-upload-input"
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer"
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-ui font-medium mb-1">Sube una imagen</p>
            <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
          </label>
        )}
      </Card>
      <input
        id="image-upload-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        data-testid={`${testId}-input`}
      />
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled
          data-testid={`${testId}-ai-generate-button`}
        >
          <ImageIcon className="h-3 w-3 mr-1" />
          Generar con IA (próximamente)
        </Button>
      </div>
    </div>
  );
};