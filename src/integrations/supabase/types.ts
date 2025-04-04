export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adventures: {
        Row: {
          bookings: number | null
          cancellation_policy: string | null
          created_at: string | null
          description: string | null
          difficulty: string
          duration: string
          id: number
          image: string
          includes: string[] | null
          location: string | null
          max_group_size: number | null
          meeting_point: string | null
          min_age: number | null
          name: string
          price: number
          rating: number | null
          requirements: string[] | null
          review_count: number | null
          slug: string | null
          status: string
          timeline: string[] | null
          type: string
        }
        Insert: {
          bookings?: number | null
          cancellation_policy?: string | null
          created_at?: string | null
          description?: string | null
          difficulty: string
          duration: string
          id?: number
          image: string
          includes?: string[] | null
          location?: string | null
          max_group_size?: number | null
          meeting_point?: string | null
          min_age?: number | null
          name: string
          price: number
          rating?: number | null
          requirements?: string[] | null
          review_count?: number | null
          slug?: string | null
          status?: string
          timeline?: string[] | null
          type: string
        }
        Update: {
          bookings?: number | null
          cancellation_policy?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string
          duration?: string
          id?: number
          image?: string
          includes?: string[] | null
          location?: string | null
          max_group_size?: number | null
          meeting_point?: string | null
          min_age?: number | null
          name?: string
          price?: number
          rating?: number | null
          requirements?: string[] | null
          review_count?: number | null
          slug?: string | null
          status?: string
          timeline?: string[] | null
          type?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: string | null
          entity_id: number
          entity_type: string
          id: number
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: string | null
          entity_id: number
          entity_type: string
          id?: number
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string | null
          entity_id?: number
          entity_type?: string
          id?: number
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      bike_rentals: {
        Row: {
          bookings: number | null
          created_at: string | null
          description: string | null
          engine: string
          id: number
          image: string
          name: string
          price: number
          status: string
          type: string
        }
        Insert: {
          bookings?: number | null
          created_at?: string | null
          description?: string | null
          engine: string
          id?: number
          image: string
          name: string
          price: number
          status?: string
          type: string
        }
        Update: {
          bookings?: number | null
          created_at?: string | null
          description?: string | null
          engine?: string
          id?: number
          image?: string
          name?: string
          price?: number
          status?: string
          type?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          date: string
          excerpt: string
          id: number
          image: string
          status: string
          title: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          date?: string
          excerpt: string
          id?: number
          image: string
          status?: string
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          date?: string
          excerpt?: string
          id?: number
          image?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          base_price: number | null
          booking_reference: string | null
          booking_status: string
          check_in_date: string
          check_out_date: string
          created_at: string
          guest_email: string
          guest_name: string
          guest_phone: string | null
          hotel_id: number | null
          id: string
          number_of_guests: number
          payment_status: string
          room_type: string
          tax_amount: number | null
          total_price: number
          user_id: string | null
        }
        Insert: {
          base_price?: number | null
          booking_reference?: string | null
          booking_status?: string
          check_in_date: string
          check_out_date: string
          created_at?: string
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          hotel_id?: number | null
          id?: string
          number_of_guests: number
          payment_status?: string
          room_type: string
          tax_amount?: number | null
          total_price: number
          user_id?: string | null
        }
        Update: {
          base_price?: number | null
          booking_reference?: string | null
          booking_status?: string
          check_in_date?: string
          check_out_date?: string
          created_at?: string
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          hotel_id?: number | null
          id?: string
          number_of_guests?: number
          payment_status?: string
          room_type?: string
          tax_amount?: number | null
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      car_rentals: {
        Row: {
          bookings: number | null
          capacity: number
          created_at: string | null
          description: string | null
          id: number
          image: string
          name: string
          price: number
          status: string
          transmission: string
          type: string
        }
        Insert: {
          bookings?: number | null
          capacity: number
          created_at?: string | null
          description?: string | null
          id?: number
          image: string
          name: string
          price: number
          status?: string
          transmission: string
          type: string
        }
        Update: {
          bookings?: number | null
          capacity?: number
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string
          name?: string
          price?: number
          status?: string
          transmission?: string
          type?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          activities: string[] | null
          best_time_to_visit: string | null
          created_at: string | null
          description: string
          highlights: string[] | null
          id: number
          image: string
          location: string
          name: string
          slug: string
        }
        Insert: {
          activities?: string[] | null
          best_time_to_visit?: string | null
          created_at?: string | null
          description: string
          highlights?: string[] | null
          id?: number
          image: string
          location: string
          name: string
          slug: string
        }
        Update: {
          activities?: string[] | null
          best_time_to_visit?: string | null
          created_at?: string | null
          description?: string
          highlights?: string[] | null
          id?: number
          image?: string
          location?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      early_hotels: {
        Row: {
          amenities: string[] | null
          created_at: string | null
          description: string
          featured: boolean | null
          hourly_rate: number
          id: number
          image: string
          location: string
          max_hours: number
          min_hours: number
          name: string
          stars: number
          status: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string | null
          description: string
          featured?: boolean | null
          hourly_rate: number
          id?: number
          image: string
          location: string
          max_hours: number
          min_hours: number
          name: string
          stars: number
          status?: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string | null
          description?: string
          featured?: boolean | null
          hourly_rate?: number
          id?: number
          image?: string
          location?: string
          max_hours?: number
          min_hours?: number
          name?: string
          stars?: number
          status?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          item_id: number
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: number
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: number
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      hotel_versions: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_by_name: string | null
          hotel_id: number
          id: number
          version_data: Json
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_by_name?: string | null
          hotel_id: number
          id?: number
          version_data: Json
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_by_name?: string | null
          hotel_id?: number
          id?: number
          version_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "hotel_versions_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          amenities: string[] | null
          categories: string[] | null
          description: string | null
          featured: boolean | null
          gallery: string[] | null
          id: number
          image: string
          last_modified_at: string | null
          last_modified_by: string | null
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          price_per_night: number
          rating: number | null
          review_count: number | null
          slug: string
          stars: number
          status: string
        }
        Insert: {
          amenities?: string[] | null
          categories?: string[] | null
          description?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: number
          image: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          price_per_night: number
          rating?: number | null
          review_count?: number | null
          slug: string
          stars: number
          status?: string
        }
        Update: {
          amenities?: string[] | null
          categories?: string[] | null
          description?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: number
          image?: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          price_per_night?: number
          rating?: number | null
          review_count?: number | null
          slug?: string
          stars?: number
          status?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          id: number
          permission_name: string
        }
        Insert: {
          id?: never
          permission_name: string
        }
        Update: {
          id?: never
          permission_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          item_id: number
          item_type: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          item_id: number
          item_type: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          item_id?: number
          item_type?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: number
          role_id: number
        }
        Insert: {
          permission_id: number
          role_id: number
        }
        Update: {
          permission_id?: number
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          role_name: string
        }
        Insert: {
          id?: never
          role_name: string
        }
        Update: {
          id?: never
          role_name?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          capacity: number
          count: number
          hotel_id: number
          id: number
          images: string[] | null
          price: number
          type: string
        }
        Insert: {
          capacity: number
          count: number
          hotel_id: number
          id?: number
          images?: string[] | null
          price: number
          type: string
        }
        Update: {
          capacity?: number
          count?: number
          hotel_id?: number
          id?: number
          images?: string[] | null
          price?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      seasonal_pricing: {
        Row: {
          created_at: string | null
          end_date: string
          hotel_id: number | null
          id: number
          name: string
          price_multiplier: number
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          hotel_id?: number | null
          id?: number
          name: string
          price_multiplier?: number
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          hotel_id?: number | null
          id?: number
          name?: string
          price_multiplier?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "seasonal_pricing_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string | null
          password: string
          role_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string | null
          password: string
          role_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string | null
          password?: string
          role_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bulk_delete_seasonal_pricing: {
        Args: {
          p_hotel_ids: number[]
        }
        Returns: undefined
      }
      email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_profile:
        | {
            Args: Record<PropertyKey, never>
            Returns: Json
          }
        | {
            Args: {
              user_id: string
            }
            Returns: {
              avatar_url: string | null
              created_at: string | null
              full_name: string | null
              id: string
              updated_at: string | null
              username: string | null
              website: string | null
            }
          }
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
