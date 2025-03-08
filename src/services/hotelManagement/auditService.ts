
import { supabase } from "@/integrations/supabase/client";
import { AuditLog } from "@/components/admin/hotels/types";

export const addAuditLog = async (auditData: Omit<AuditLog, 'id' | 'timestamp'>) => {
  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      entity_type: auditData.entityType,
      entity_id: auditData.entityId,
      action: auditData.action,
      details: auditData.details,
      user_id: auditData.userId,
      user_name: auditData.userName
    });

  if (error) throw error;
  return data;
};

export const getAuditLogs = async (entityType?: string, entityId?: number, limit = 100) => {
  let query = supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (entityType) {
    query = query.eq('entity_type', entityType);
  }

  if (entityId) {
    query = query.eq('entity_id', entityId);
  }

  const { data, error } = await query;
  if (error) throw error;
  
  return data.map(log => ({
    id: log.id,
    entityType: log.entity_type,
    entityId: log.entity_id,
    action: log.action,
    details: log.details,
    userId: log.user_id,
    userName: log.user_name,
    timestamp: log.created_at
  })) as AuditLog[];
};
