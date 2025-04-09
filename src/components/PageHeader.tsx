
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumb }) => {
  return (
    <div className="bg-white border-b border-stone-200">
      <div className="container-custom py-8">
        {breadcrumb && (
          <div className="mb-4">
            {breadcrumb}
          </div>
        )}
        
        <h1 className="text-3xl font-display font-bold text-stone-800 mb-2">{title}</h1>
        
        {description && (
          <p className="text-stone-600">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
