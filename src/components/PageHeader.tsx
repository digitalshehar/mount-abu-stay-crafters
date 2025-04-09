
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumb,
  actions,
}) => {
  return (
    <div className="bg-white border-b border-stone-200 py-6 mb-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {breadcrumb && <div className="mb-3">{breadcrumb}</div>}
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800">{title}</h1>
            {description && <p className="mt-2 text-stone-500">{description}</p>}
          </div>
          {actions && <div className="flex items-center space-x-2 mt-4 md:mt-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
