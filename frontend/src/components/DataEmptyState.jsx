import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export const DataEmptyState = ({ title, description, actionLabel, onAction, icon: Icon, testId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center px-6 py-16"
      data-testid={testId}
    >
      {Icon && (
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-4 ring-primary/5">
            <Icon className="h-10 w-10 text-primary" />
          </div>
        </div>
      )}
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} data-testid={`${testId}-action-button`} size="lg">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};