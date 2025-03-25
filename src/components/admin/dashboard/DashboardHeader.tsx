
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Filter, Plus, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  onRefresh: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  onTabChange?: (value: string) => void;
  tabs?: Array<{ value: string; label: string }>;
  activeTab?: string;
  loading?: boolean;
  filterComponent?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  onRefresh,
  onExport,
  onAdd,
  onTabChange,
  tabs,
  activeTab,
  loading = false,
  filterComponent
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          
          {onAdd && (
            <Button size="sm" onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          )}
        </div>
      </div>
      
      {tabs && tabs.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {filterComponent && (
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              {filterComponent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
