import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, PrimaryButton } from '../Button';

describe('Button Component', () => {
  test('рендерится с текстом', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
  });

  test('применяет правильные классы для варианта primary', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('bg-gradient-to-r from-orange-500 to-orange-600');
  });

  test('применяет правильные классы для размера', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('px-6 py-3 text-lg');
  });

  test('отображает состояние loading', () => {
    render(<Button state="loading">Загрузка</Button>);
    expect(screen.getByRole('button', { name: 'Загрузка...' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  test('отображает состояние success', () => {
    render(<Button state="success" successText="Успешно!">Действие</Button>);
    expect(screen.getByRole('button', { name: 'Успешно!' })).toBeInTheDocument();
  });

  test('отображает состояние error', () => {
    render(<Button state="error" errorText="Ошибка">Действие</Button>);
    expect(screen.getByRole('button', { name: 'Ошибка' })).toBeInTheDocument();
  });

  test('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Клик' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('не вызывает onClick при disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Заблокировано</Button>);
    const button = screen.getByRole('button', { name: 'Заблокировано' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('имеет правильные атрибуты accessibility', () => {
    render(<Button aria-label="Отправить форму">Отправить</Button>);
    expect(screen.getByLabelText('Отправить форму')).toBeInTheDocument();
  });

  test('PrimaryButton рендерится с правильным вариантом', () => {
    render(<PrimaryButton>Primary</PrimaryButton>);
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('bg-gradient-to-r from-orange-500 to-orange-600');
  });
});