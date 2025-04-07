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
      early_hotel_amenities: {
        Row: {
          category_id: number | null
          created_at: string | null
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_amenities_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_amenity_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_amenity_categories: {
        Row: {
          created_at: string | null
          display_order: number
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          display_order?: number
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      early_hotel_availability: {
        Row: {
          available_slots: number
          created_at: string | null
          date: string
          hotel_id: number
          id: number
        }
        Insert: {
          available_slots?: number
          created_at?: string | null
          date: string
          hotel_id: number
          id?: number
        }
        Update: {
          available_slots?: number
          created_at?: string | null
          date?: string
          hotel_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_availability_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_availability_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_faqs: {
        Row: {
          answer: string
          created_at: string | null
          display_order: number
          hotel_id: number
          id: number
          question: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          display_order?: number
          hotel_id: number
          id?: number
          question: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          display_order?: number
          hotel_id?: number
          id?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_faqs_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_faqs_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number
          hotel_id: number
          id: number
          image_url: string
          is_primary: boolean
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number
          hotel_id: number
          id?: number
          image_url: string
          is_primary?: boolean
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number
          hotel_id?: number
          id?: number
          image_url?: string
          is_primary?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_maintenance: {
        Row: {
          assigned_to: string | null
          hotel_id: number
          id: number
          issue_description: string
          notes: string | null
          priority: string
          reported_at: string | null
          reported_by: string | null
          resolved_at: string | null
          status: string
        }
        Insert: {
          assigned_to?: string | null
          hotel_id: number
          id?: number
          issue_description: string
          notes?: string | null
          priority?: string
          reported_at?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          status?: string
        }
        Update: {
          assigned_to?: string | null
          hotel_id?: number
          id?: number
          issue_description?: string
          notes?: string | null
          priority?: string
          reported_at?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_maintenance_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_maintenance_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_pricing: {
        Row: {
          created_at: string | null
          end_date: string
          hotel_id: number
          id: number
          price_multiplier: number
          pricing_name: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          hotel_id: number
          id?: number
          price_multiplier?: number
          pricing_name: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          hotel_id?: number
          id?: number
          price_multiplier?: number
          pricing_name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_pricing_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_pricing_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_promotions: {
        Row: {
          active: boolean
          created_at: string | null
          discount_percent: number
          end_date: string
          hotel_id: number
          id: number
          promotion_code: string
          start_date: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          discount_percent: number
          end_date: string
          hotel_id: number
          id?: number
          promotion_code: string
          start_date: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          discount_percent?: number
          end_date?: string
          hotel_id?: number
          id?: number
          promotion_code?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_promotions_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_promotions_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      early_hotel_reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          guest_name: string
          hotel_id: number
          id: number
          rating: number
          user_id: string | null
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          guest_name: string
          hotel_id: number
          id?: number
          rating: number
          user_id?: string | null
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          guest_name?: string
          hotel_id?: number
          id?: number
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "early_hotel_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "early_hotel_reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotel_booking_stats"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "early_hotel_reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "early_hotels"
            referencedColumns: ["id"]
          },
        ]
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
      early_hotel_booking_stats: {
        Row: {
          cancelled_bookings: number | null
          completed_bookings: number | null
          confirmed_bookings: number | null
          hotel_id: number | null
          hotel_name: string | null
          location: string | null
          paid_bookings: number | null
          pending_payments: number | null
          total_bookings: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bulk_delete_seasonal_pricing: {
        Args: { p_hotel_ids: number[] }
        Returns: undefined
      }
      email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_profile: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: Json
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
