import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export const DataEmptyState = ({ title, description, actionLabel, onAction, icon: Icon, testId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center px-6 py-12"
      data-testid={testId}
    >
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-accent/50 flex items-center justify-center">
            <Icon className="h-8 w-8 text-accent-foreground" />
          </div>
        </div>
      )}
      <h3 className="font-ui font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-6">{description}</p>
      {onAction && (
        <Button onClick={onAction} data-testid={`${testId}-action-button`}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};