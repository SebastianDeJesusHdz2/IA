import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ImageUpload = ({ value, onChange, testId = 'image-upload' }) => {
  const { t } = useLanguage();
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
      <Label className="text-sm font-medium">{t.image}</Label>
      <Card
        data-testid={testId}
        className="relative overflow-hidden border-2 border-dashed hover:border-primary/50 transition-colors"
      >
        {preview ? (
          <div className="relative aspect-video w-full bg-muted">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-3 right-3 shadow-lg"
              onClick={handleRemove}
              data-testid={`${testId}-remove-button`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image-upload-input"
            className="flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium mb-1">{t.uploadImage}</p>
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
      <Button
        variant="ghost"
        size="sm"
        className="text-xs w-full"
        disabled
        data-testid={`${testId}-ai-generate-button`}
      >
        <ImageIcon className="h-3 w-3 mr-2" />
        {t.generateAI}
      </Button>
    </div>
  );
};