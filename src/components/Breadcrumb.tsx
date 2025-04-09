
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
            )}
            <li className={`${item.active ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
              {item.active ? (
                <span>{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
