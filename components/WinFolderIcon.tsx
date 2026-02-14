
import React from 'react';

export type FolderVariant = 'blue' | 'teal' | 'grey' | 'orange' | 'purple' | 'yellow' | 'light-blue';

interface WinFolderIconProps {
  variant: FolderVariant;
  icon?: string; // Classe do FontAwesome
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const variantColors: Record<FolderVariant, { bg: string, front: string, icon: string }> = {
  blue: { bg: '#0078D4', front: '#2B88D8', icon: '#FFFFFF' },
  teal: { bg: '#00B294', front: '#17C2A6', icon: '#FFFFFF' },
  grey: { bg: '#7F8C9A', front: '#8E9AAB', icon: '#FFFFFF' },
  orange: { bg: '#D83B01', front: '#E35B2B', icon: '#FFFFFF' },
  purple: { bg: '#5C2D91', front: '#7A4EB2', icon: '#FFFFFF' },
  yellow: { bg: '#FFB900', front: '#FFC832', icon: '#FFFFFF' },
  'light-blue': { bg: '#00A4EF', front: '#33B6F2', icon: '#FFFFFF' },
};

export const WinFolderIcon: React.FC<WinFolderIconProps> = ({ variant, icon, className, size = 'md' }) => {
  const colors = variantColors[variant];
  const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClass} ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform group-hover:scale-110">
        {/* Parte traseira da pasta */}
        <path d="M2 10C2 7.79086 3.79086 6 6 6H12.5L15 9H26C28.2091 9 30 10.7909 30 13V24C30 26.2091 28.2091 28 26 28H6C3.79086 28 2 26.2091 2 24V10Z" fill={colors.bg} />
        {/* Aba frontal da pasta */}
        <path d="M2 13.5C2 11.567 3.567 10 5.5 10H26.5C28.433 10 30 11.567 30 13.5V24.5C30 26.433 28.433 28 26.5 28H5.5C3.567 28 2 26.433 2 24.5V13.5Z" fill={colors.front} />
        {/* Detalhe de sombra na dobra */}
        <path d="M2 13.5C2 11.567 3.567 10 5.5 10H26.5C28.433 10 30 11.567 30 13.5V15H2V13.5Z" fill="black" fillOpacity="0.05" />
      </svg>
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center pt-2.5 pointer-events-none">
          <i className={`fas ${icon} ${size === 'lg' ? 'text-lg' : 'text-[12px]'}`} style={{ color: colors.icon }}></i>
        </div>
      )}
    </div>
  );
};
