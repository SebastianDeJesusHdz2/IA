import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export const DynamicFieldRenderer = ({ fields = [], values = {}, onChange }) => {
  const handleChange = (fieldKey, value) => {
    onChange({ ...values, [fieldKey]: value });
  };

  const renderField = (field) => {
    const { key, label, type, options, required, help } = field;
    const value = values[key] || '';
    const fieldTestId = `character-field-${key.toLowerCase().replace(/\s+/g, '-')}-input`;

    switch (type) {
      case 'text':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={key}
              data-testid={fieldTestId}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={help || `Ingresa ${label.toLowerCase()}`}
              required={required}
            />
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={key}
              data-testid={fieldTestId}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={help || `Ingresa ${label.toLowerCase()}`}
              required={required}
              rows={4}
            />
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={key}
              data-testid={fieldTestId}
              type="number"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={help || `Ingresa ${label.toLowerCase()}`}
              required={required}
            />
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleChange(key, val)}>
              <SelectTrigger data-testid={fieldTestId}>
                <SelectValue placeholder={`Selecciona ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );

      case 'boolean':
        return (
          <div key={key} className="flex items-center justify-between space-x-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
              {help && <span className="text-xs text-muted-foreground ml-2">{help}</span>}
            </Label>
            <Switch
              id={key}
              data-testid={fieldTestId}
              checked={value === true || value === 'true'}
              onCheckedChange={(checked) => handleChange(key, checked)}
            />
          </div>
        );

      case 'date':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-testid={fieldTestId}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? format(new Date(value), 'PPP') : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => handleChange(key, date ? date.toISOString() : '')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );

      default:
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={key}
              data-testid={fieldTestId}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={help || `Ingresa ${label.toLowerCase()}`}
              required={required}
            />
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => renderField(field))}
    </div>
  );
};