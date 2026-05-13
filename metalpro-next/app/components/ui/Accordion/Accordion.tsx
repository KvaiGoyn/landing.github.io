'use client';

import React, { useState, useEffect, Children, cloneElement } from 'react';
import { AccordionProps, AccordionItemProps } from './Accordion.types';
import { accordionStyles } from './Accordion.styles';
import { useAccordion } from '@/app/hooks/useAccordion';

/**
 * Компонент аккордеона для раскрывающихся секций
 */
export const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  defaultOpenIndex = null,
  className = '',
  onOpenChange,
}) => {
  const items = Children.toArray(children);
  const {
    openIndexes,
    toggleItem,
    openItem,
    closeItem,
    isItemOpen,
  } = useAccordion({
    multiple,
    initialOpenIndex: defaultOpenIndex,
  });

  // Вызываем callback при изменении открытых индексов
  useEffect(() => {
    onOpenChange?.(openIndexes);
  }, [openIndexes, onOpenChange]);

  // Клонируем дочерние элементы и передаём им индекс и состояние
  const enhancedChildren = items.map((child, index) => {
    if (React.isValidElement<AccordionItemProps>(child)) {
      return cloneElement(child, {
        index,
        isOpen: isItemOpen(index),
        onToggle: () => toggleItem(index),
        onOpen: () => openItem(index),
        onClose: () => closeItem(index),
      } as Partial<AccordionItemProps>);
    }
    return child;
  });

  return (
    <div className={`${accordionStyles.container} ${className}`}>
      {enhancedChildren}
    </div>
  );
};

/**
 * Компонент элемента аккордеона
 */
export const AccordionItem: React.FC<AccordionItemProps & {
  isOpen?: boolean;
  onToggle?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}> = ({
  title,
  children,
  index,
  className = '',
  headerClassName = '',
  contentClassName = '',
  icon,
  disableAnimation = false,
  isOpen = false,
  onToggle,
  onOpen,
  onClose,
}) => {
  const handleClick = () => {
    onToggle?.();
  };

  const defaultIcon = (
    <svg
      className={`${accordionStyles.icon} ${
        isOpen ? accordionStyles.iconOpen : accordionStyles.iconClosed
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
  );

  return (
    <div className={`${accordionStyles.item} ${className}`}>
      <button
        onClick={handleClick}
        className={`${accordionStyles.header} ${
          isOpen ? accordionStyles.headerOpen : ''
        } ${headerClassName}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
        id={`accordion-header-${index}`}
      >
        <span>{title}</span>
        {icon || defaultIcon}
      </button>
      <div
        id={`accordion-content-${index}`}
        aria-labelledby={`accordion-header-${index}`}
        className={`${accordionStyles.content} ${
          isOpen ? accordionStyles.contentOpen : accordionStyles.contentClosed
        } ${contentClassName}`}
        style={
          disableAnimation
            ? {}
            : {
                maxHeight: isOpen ? '1000px' : '0px',
                transition: 'max-height 0.3s ease-in-out',
              }
        }
      >
        <div className="text-sm text-gray-600 pt-2">{children}</div>
      </div>
    </div>
  );
};