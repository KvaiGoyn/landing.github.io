// Базовые стили для аккордеона

export const accordionStyles = {
  container: 'space-y-4',
  item: 'border-b border-gray-100 pb-4',
  itemLast: 'border-b-0 pb-0',
  header:
    'flex items-center justify-between w-full text-left font-medium text-gray-800 hover:text-orange-600 transition-colors',
  headerOpen: 'text-orange-600',
  content: 'overflow-hidden transition-all duration-300 ease-in-out',
  contentOpen: 'mt-2',
  contentClosed: 'max-h-0',
  icon: 'w-5 h-5 text-gray-400 transition-transform duration-300',
  iconOpen: 'rotate-180',
  iconClosed: 'rotate-0',
};