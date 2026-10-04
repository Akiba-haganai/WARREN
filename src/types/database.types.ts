export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ama_question_votes: {
        Row: {
          question_id: string
          user_id: string
        }
        Insert: {
          question_id: string
          user_id: string
        }
        Update: {
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ama_question_votes_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "ama_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ama_question_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ama_questions: {
        Row: {
          answered: boolean | null
          asked_by: string
          created_at: string | null
          id: string
          question: string
          session_id: string
          upvotes: number | null
        }
        Insert: {
          answered?: boolean | null
          asked_by: string
          created_at?: string | null
          id?: string
          question: string
          session_id: string
          upvotes?: number | null
        }
        Update: {
          answered?: boolean | null
          asked_by?: string
          created_at?: string | null
          id?: string
          question?: string
          session_id?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ama_questions_asked_by_fkey"
            columns: ["asked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ama_questions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ama_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ama_sessions: {
        Row: {
          community_id: string
          created_at: string | null
          duration_minutes: number | null
          id: string
          lecturer_id: string
          scheduled_for: string
          status: string | null
        }
        Insert: {
          community_id: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          lecturer_id: string
          scheduled_for: string
          status?: string | null
        }
        Update: {
          community_id?: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          lecturer_id?: string
          scheduled_for?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ama_sessions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ama_sessions_lecturer_id_fkey"
            columns: ["lecturer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          document_url: string | null
          id: string
          image_url: string | null
          pinned: boolean | null
          title: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          id?: string
          image_url?: string | null
          pinned?: boolean | null
          title?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          id?: string
          image_url?: string | null
          pinned?: boolean | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answer_votes: {
        Row: {
          answer_id: string
          created_at: string
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          answer_id: string
          created_at?: string
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          answer_id?: string
          created_at?: string
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_votes_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answers: {
        Row: {
          author_id: string
          content: string
          created_at: string
          downvotes: number
          id: string
          is_accepted: boolean
          question_id: string
          updated_at: string
          upvotes: number
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          downvotes?: number
          id?: string
          is_accepted?: boolean
          question_id: string
          updated_at?: string
          upvotes?: number
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          downvotes?: number
          id?: string
          is_accepted?: boolean
          question_id?: string
          updated_at?: string
          upvotes?: number
        }
        Relationships: [
          {
            foreignKeyName: "answers_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_users: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campuses: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          university_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          university_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          university_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campuses_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_poll_options: {
        Row: {
          id: string
          option_text: string
          poll_id: string | null
        }
        Insert: {
          id?: string
          option_text: string
          poll_id?: string | null
        }
        Update: {
          id?: string
          option_text?: string
          poll_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "chat_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_poll_votes: {
        Row: {
          option_id: string
          user_id: string
        }
        Insert: {
          option_id: string
          user_id: string
        }
        Update: {
          option_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_poll_votes_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "chat_poll_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_poll_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_polls: {
        Row: {
          community_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          question: string
        }
        Insert: {
          community_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          question: string
        }
        Update: {
          community_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_polls_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_polls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_votes: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          downvotes: number | null
          gif_url: string | null
          id: string
          image_url: string | null
          post_id: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          post_id?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          post_id?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          archived: boolean | null
          auto_delete_days: number | null
          cover_color: string
          created_at: string
          created_by: string | null
          description: string
          icon: string
          id: string
          name: string
          parent_id: string | null
          type: string
          updated_at: string
          year: string | null
        }
        Insert: {
          archived?: boolean | null
          auto_delete_days?: number | null
          cover_color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          name: string
          parent_id?: string | null
          type?: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          archived?: boolean | null
          auto_delete_days?: number | null
          cover_color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          parent_id?: string | null
          type?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communities_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          joined_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_messages: {
        Row: {
          community_id: string
          content: string | null
          created_at: string
          expires_at: string | null
          file_name: string | null
          file_url: string | null
          id: string
          image_url: string | null
          is_announcement: boolean | null
          parent_id: string | null
          poll_id: string | null
          sticker_url: string | null
          type: string
          updated_at: string
          user_id: string
          voice_url: string | null
        }
        Insert: {
          community_id: string
          content?: string | null
          created_at?: string
          expires_at?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_announcement?: boolean | null
          parent_id?: string | null
          poll_id?: string | null
          sticker_url?: string | null
          type?: string
          updated_at?: string
          user_id: string
          voice_url?: string | null
        }
        Update: {
          community_id?: string
          content?: string | null
          created_at?: string
          expires_at?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_announcement?: boolean | null
          parent_id?: string | null
          poll_id?: string | null
          sticker_url?: string | null
          type?: string
          updated_at?: string
          user_id?: string
          voice_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_messages_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "chat_polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_materials: {
        Row: {
          course_id: string | null
          created_at: string | null
          curriculum_version_id: string | null
          id: string
          material_id: string | null
          notes: string | null
          priority: number | null
          relationship_type: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          curriculum_version_id?: string | null
          id?: string
          material_id?: string | null
          notes?: string | null
          priority?: number | null
          relationship_type?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          curriculum_version_id?: string | null
          id?: string
          material_id?: string | null
          notes?: string | null
          priority?: number | null
          relationship_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_materials_curriculum_version_id_fkey"
            columns: ["curriculum_version_id"]
            isOneToOne: false
            referencedRelation: "curriculum_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_code: string
          created_at: string | null
          credits: number | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          course_code: string
          created_at?: string | null
          credits?: number | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          course_code?: string
          created_at?: string | null
          credits?: number | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      cram_plan_items: {
        Row: {
          day_offset: number
          id: string
          material_id: string | null
          plan_id: string | null
          position: number | null
        }
        Insert: {
          day_offset: number
          id?: string
          material_id?: string | null
          plan_id?: string | null
          position?: number | null
        }
        Update: {
          day_offset?: number
          id?: string
          material_id?: string | null
          plan_id?: string | null
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cram_plan_items_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cram_plan_items_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "cram_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      cram_plan_progress: {
        Row: {
          completed_at: string
          item_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          item_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cram_plan_progress_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "cram_plan_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cram_plan_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cram_plans: {
        Row: {
          course_key: string | null
          days_total: number | null
          exam_date: string
          generated_at: string | null
          id: string
          share_enabled: boolean | null
          share_slug: string | null
          status: string | null
          subject: string
          user_id: string | null
        }
        Insert: {
          course_key?: string | null
          days_total?: number | null
          exam_date: string
          generated_at?: string | null
          id?: string
          share_enabled?: boolean | null
          share_slug?: string | null
          status?: string | null
          subject: string
          user_id?: string | null
        }
        Update: {
          course_key?: string | null
          days_total?: number | null
          exam_date?: string
          generated_at?: string | null
          id?: string
          share_enabled?: boolean | null
          share_slug?: string | null
          status?: string | null
          subject?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cram_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cram_templates: {
        Row: {
          category: string
          created_by: string | null
          day_sequence: Json
          id: string
        }
        Insert: {
          category: string
          created_by?: string | null
          day_sequence: Json
          id?: string
        }
        Update: {
          category?: string
          created_by?: string | null
          day_sequence?: Json
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cram_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      curriculum_courses: {
        Row: {
          course_id: string | null
          course_type: string | null
          created_at: string | null
          curriculum_version_id: string | null
          id: string
          semester: number
          year_of_study: number
        }
        Insert: {
          course_id?: string | null
          course_type?: string | null
          created_at?: string | null
          curriculum_version_id?: string | null
          id?: string
          semester: number
          year_of_study: number
        }
        Update: {
          course_id?: string | null
          course_type?: string | null
          created_at?: string | null
          curriculum_version_id?: string | null
          id?: string
          semester?: number
          year_of_study?: number
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curriculum_courses_curriculum_version_id_fkey"
            columns: ["curriculum_version_id"]
            isOneToOne: false
            referencedRelation: "curriculum_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      curriculum_versions: {
        Row: {
          academic_year_end: number
          academic_year_start: number
          created_at: string | null
          id: string
          programme_id: string | null
          source_document: string | null
          status: string | null
          verified_at: string | null
          verified_by: string | null
          version: string
        }
        Insert: {
          academic_year_end: number
          academic_year_start: number
          created_at?: string | null
          id?: string
          programme_id?: string | null
          source_document?: string | null
          status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          version: string
        }
        Update: {
          academic_year_end?: number
          academic_year_start?: number
          created_at?: string | null
          id?: string
          programme_id?: string | null
          source_document?: string | null
          status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_versions_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curriculum_versions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          school_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          school_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      direct_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_reminders: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_reminders_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          community_id: string | null
          created_at: string
          created_by: string
          description: string | null
          event_date: string
          event_type: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          community_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          community_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json | null
          id: string
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      karma_events: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "karma_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_room_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_room_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "live_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_room_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_rooms: {
        Row: {
          break_minutes: number | null
          community_id: string | null
          created_at: string
          created_by: string
          cycle_minutes: number | null
          expires_at: string
          id: string
          sprint_type: string | null
          topic: string
        }
        Insert: {
          break_minutes?: number | null
          community_id?: string | null
          created_at?: string
          created_by: string
          cycle_minutes?: number | null
          expires_at: string
          id?: string
          sprint_type?: string | null
          topic: string
        }
        Update: {
          break_minutes?: number | null
          community_id?: string | null
          created_at?: string
          created_by?: string
          cycle_minutes?: number | null
          expires_at?: string
          id?: string
          sprint_type?: string | null
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_rooms_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_rooms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_edits: {
        Row: {
          content_after: string | null
          content_before: string | null
          created_at: string | null
          diff_summary: string
          editor_id: string | null
          id: string
          material_id: string | null
          status: string | null
        }
        Insert: {
          content_after?: string | null
          content_before?: string | null
          created_at?: string | null
          diff_summary: string
          editor_id?: string | null
          id?: string
          material_id?: string | null
          status?: string | null
        }
        Update: {
          content_after?: string | null
          content_before?: string | null
          created_at?: string | null
          diff_summary?: string
          editor_id?: string | null
          id?: string
          material_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_edits_editor_id_fkey"
            columns: ["editor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_edits_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      material_ratings: {
        Row: {
          created_at: string | null
          id: string
          material_id: string
          rating: number
          review: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id: string
          rating: number
          review?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string
          rating?: number
          review?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_ratings_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_reactions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_requests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          subject: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          subject?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          subject?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_versions: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          material_id: string | null
          uploaded_by: string | null
          version_number: number
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          material_id?: string | null
          uploaded_by?: string | null
          version_number: number
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          material_id?: string | null
          uploaded_by?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "material_versions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_versions_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_views: {
        Row: {
          id: string
          material_id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          material_id: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          material_id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_views_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          author: string | null
          created_at: string | null
          description: string | null
          edition: string | null
          file_url: string | null
          id: string
          isbn: string | null
          language: string | null
          material_type: string
          publication_year: number | null
          publisher: string | null
          status: string | null
          subtitle: string | null
          thumbnail_url: string | null
          title: string
          uploaded_by: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          edition?: string | null
          file_url?: string | null
          id?: string
          isbn?: string | null
          language?: string | null
          material_type: string
          publication_year?: number | null
          publisher?: string | null
          status?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title: string
          uploaded_by?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          edition?: string | null
          file_url?: string | null
          id?: string
          isbn?: string | null
          language?: string | null
          material_type?: string
          publication_year?: number | null
          publisher?: string | null
          status?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "materials_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reads: {
        Row: {
          message_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          message_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          message_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reads_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_queue: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_note: string | null
          status: string
          submitted_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_note?: string | null
          status?: string
          submitted_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_note?: string | null
          status?: string
          submitted_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_queue_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_bounties: {
        Row: {
          academic_year: string
          bounty_karma: number
          course_code: string
          created_at: string
          created_by: string
          fulfilled_by: string | null
          fulfilled_material_id: string | null
          id: string
          paper_type: string
          status: string
        }
        Insert: {
          academic_year: string
          bounty_karma?: number
          course_code: string
          created_at?: string
          created_by: string
          fulfilled_by?: string | null
          fulfilled_material_id?: string | null
          id?: string
          paper_type: string
          status?: string
        }
        Update: {
          academic_year?: string
          bounty_karma?: number
          course_code?: string
          created_at?: string
          created_by?: string
          fulfilled_by?: string | null
          fulfilled_material_id?: string | null
          id?: string
          paper_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_bounties_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_bounties_fulfilled_by_fkey"
            columns: ["fulfilled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_bounties_fulfilled_material_id_fkey"
            columns: ["fulfilled_material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_solutions: {
        Row: {
          author_id: string
          created_at: string
          id: string
          is_lecturer_verified: boolean
          material_id: string
          question_number: string
          solution_text: string
          upvotes_count: number
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          is_lecturer_verified?: boolean
          material_id: string
          question_number: string
          solution_text: string
          upvotes_count?: number
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          is_lecturer_verified?: boolean
          material_id?: string
          question_number?: string
          solution_text?: string
          upvotes_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "paper_solutions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_solutions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      password_recovery_requests: {
        Row: {
          created_at: string | null
          email: string
          id: string
          ip_address: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          score: number
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "password_recovery_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "password_recovery_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      past_paper_metadata: {
        Row: {
          academic_year: string
          exam_period: string
          material_id: string
        }
        Insert: {
          academic_year: string
          exam_period: string
          material_id: string
        }
        Update: {
          academic_year?: string
          exam_period?: string
          material_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "past_paper_metadata_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: true
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          image_url: string | null
          is_anonymous: boolean | null
          is_hidden: boolean | null
          score: number | null
          upvotes: number | null
          user_id: string | null
          voice_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          is_anonymous?: boolean | null
          is_hidden?: boolean | null
          score?: number | null
          upvotes?: number | null
          user_id?: string | null
          voice_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          is_anonymous?: boolean | null
          is_hidden?: boolean | null
          score?: number | null
          upvotes?: number | null
          user_id?: string | null
          voice_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          credits: number | null
          id: string
          is_lecturer: boolean | null
          is_senior: boolean
          karma: number
          last_seen: string | null
          role: Database["public"]["Enums"]["app_role"]
          username: string | null
          year_of_study: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits?: number | null
          id: string
          is_lecturer?: boolean | null
          is_senior?: boolean
          karma?: number
          last_seen?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
          year_of_study?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits?: number | null
          id?: string
          is_lecturer?: boolean | null
          is_senior?: boolean
          karma?: number
          last_seen?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
          year_of_study?: number | null
        }
        Relationships: []
      }
      programmes: {
        Row: {
          award_type: string
          code: string
          created_at: string | null
          department_id: string | null
          id: string
          name: string
        }
        Insert: {
          award_type: string
          code: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          name: string
        }
        Update: {
          award_type?: string
          code?: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "programmes_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          author_id: string
          body: string | null
          community_id: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body?: string | null
          community_id?: string | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string | null
          community_id?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_match_answers: {
        Row: {
          answer_time_ms: number | null
          answered_index: number | null
          created_at: string | null
          is_correct: boolean | null
          match_id: string | null
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          answer_time_ms?: number | null
          answered_index?: number | null
          created_at?: string | null
          is_correct?: boolean | null
          match_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          answer_time_ms?: number | null
          answered_index?: number | null
          created_at?: string | null
          is_correct?: boolean | null
          match_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_match_answers_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "quiz_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_match_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_match_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_match_players: {
        Row: {
          match_id: string
          score: number | null
          user_id: string
        }
        Insert: {
          match_id: string
          score?: number | null
          user_id: string
        }
        Update: {
          match_id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_match_players_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "quiz_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_match_players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_matches: {
        Row: {
          community_id: string | null
          created_at: string | null
          id: string
          status: string | null
          subject: string
        }
        Insert: {
          community_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          subject: string
        }
        Update: {
          community_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_matches_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_index: number
          created_at: string | null
          difficulty: string | null
          id: string
          material_id: string | null
          options: Json
          question: string
          status: string | null
          subject: string
          submitted_by: string | null
        }
        Insert: {
          correct_index: number
          created_at?: string | null
          difficulty?: string | null
          id?: string
          material_id?: string | null
          options: Json
          question: string
          status?: string | null
          subject: string
          submitted_by?: string | null
        }
        Update: {
          correct_index?: number
          created_at?: string | null
          difficulty?: string | null
          id?: string
          material_id?: string | null
          options?: Json
          question?: string
          status?: string | null
          subject?: string
          submitted_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          material_id: string | null
          post_id: string | null
          reason: string
          reporter_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          post_id?: string | null
          reason: string
          reporter_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          post_id?: string | null
          reason?: string
          reporter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_materials: {
        Row: {
          created_at: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          university_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          university_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          university_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schools_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_upvotes: {
        Row: {
          created_at: string
          solution_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          solution_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          solution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_upvotes_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "paper_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_upvotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sprint_dropoffs: {
        Row: {
          created_at: string | null
          id: string
          material_id: string | null
          note: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          note?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          note?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sprint_dropoffs_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_dropoffs_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "live_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_dropoffs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      starter_packs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          material_ids: string[]
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material_ids?: string[]
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material_ids?: string[]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "starter_packs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_academic_profile: {
        Row: {
          course: string | null
          created_at: string | null
          onboarding_completed: boolean | null
          university: string | null
          updated_at: string | null
          user_id: string
          year_of_study: number | null
        }
        Insert: {
          course?: string | null
          created_at?: string | null
          onboarding_completed?: boolean | null
          university?: string | null
          updated_at?: string | null
          user_id: string
          year_of_study?: number | null
        }
        Update: {
          course?: string | null
          created_at?: string | null
          onboarding_completed?: boolean | null
          university?: string | null
          updated_at?: string | null
          user_id?: string
          year_of_study?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_academic_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          academic_year: string | null
          course_code: string | null
          created_at: string
          description: string | null
          download_count: number
          external_url: string | null
          file_url: string | null
          id: string
          is_hidden: boolean | null
          is_pinned: boolean
          is_premium: boolean | null
          material_type: string
          metadata_source: string | null
          original_file_path: string | null
          pages: Json
          paper_type: string | null
          premium_cost: number | null
          processing_error: string | null
          processing_status: string
          programme: string | null
          status: string | null
          subject: string
          submitted_by: string | null
          summary: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          topics: string[]
          trending_score: number | null
          uploaded_by: string
          verified_by_staff: boolean | null
          year_group: string
        }
        Insert: {
          academic_year?: string | null
          course_code?: string | null
          created_at?: string
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_hidden?: boolean | null
          is_pinned?: boolean
          is_premium?: boolean | null
          material_type?: string
          metadata_source?: string | null
          original_file_path?: string | null
          pages?: Json
          paper_type?: string | null
          premium_cost?: number | null
          processing_error?: string | null
          processing_status?: string
          programme?: string | null
          status?: string | null
          subject: string
          submitted_by?: string | null
          summary?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          topics?: string[]
          trending_score?: number | null
          uploaded_by: string
          verified_by_staff?: boolean | null
          year_group?: string
        }
        Update: {
          academic_year?: string | null
          course_code?: string | null
          created_at?: string
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_hidden?: boolean | null
          is_pinned?: boolean
          is_premium?: boolean | null
          material_type?: string
          metadata_source?: string | null
          original_file_path?: string | null
          pages?: Json
          paper_type?: string | null
          premium_cost?: number | null
          processing_error?: string | null
          processing_status?: string
          programme?: string | null
          status?: string | null
          subject?: string
          submitted_by?: string | null
          summary?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          topics?: string[]
          trending_score?: number | null
          uploaded_by?: string
          verified_by_staff?: boolean | null
          year_group?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_materials_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_streaks: {
        Row: {
          current_streak: number | null
          last_active_date: string | null
          longest_streak: number | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          last_active_date?: string | null
          longest_streak?: number | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          last_active_date?: string | null
          longest_streak?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_watches: {
        Row: {
          subject: string
          user_id: string
        }
        Insert: {
          subject: string
          user_id: string
        }
        Update: {
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_watches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_listings: {
        Row: {
          created_at: string | null
          credit_rate: number
          description: string | null
          id: string
          status: string | null
          subject: string
          tutor_id: string
        }
        Insert: {
          created_at?: string | null
          credit_rate: number
          description?: string | null
          id?: string
          status?: string | null
          subject: string
          tutor_id: string
        }
        Update: {
          created_at?: string | null
          credit_rate?: number
          description?: string | null
          id?: string
          status?: string | null
          subject?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_listings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          reviewer_id: string
          slot_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          reviewer_id: string
          slot_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          reviewer_id?: string
          slot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_reviews_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "tutor_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_slots: {
        Row: {
          booked_by: string | null
          created_at: string | null
          end_time: string
          escrowed_credits: number | null
          id: string
          listing_id: string
          start_time: string
          status: string | null
        }
        Insert: {
          booked_by?: string | null
          created_at?: string | null
          end_time: string
          escrowed_credits?: number | null
          id?: string
          listing_id: string
          start_time: string
          status?: string | null
        }
        Update: {
          booked_by?: string | null
          created_at?: string | null
          end_time?: string
          escrowed_credits?: number | null
          id?: string
          listing_id?: string
          start_time?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_slots_booked_by_fkey"
            columns: ["booked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_slots_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "tutor_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_slots_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "tutor_ranking"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      universities: {
        Row: {
          code: string
          country: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          country?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          country?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      unlocked_materials: {
        Row: {
          material_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          material_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          material_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unlocked_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unlocked_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webrtc_signals: {
        Row: {
          created_at: string | null
          id: string
          payload: Json
          receiver_id: string | null
          room_id: string
          sender_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload: Json
          receiver_id?: string | null
          room_id: string
          sender_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json
          receiver_id?: string | null
          room_id?: string
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "webrtc_signals_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      tutor_ranking: {
        Row: {
          avg_rating: number | null
          completed_sessions: number | null
          disputes: number | null
          listing_id: string | null
          score: number | null
          tutor_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_listings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      archive_inactive_communities: { Args: never; Returns: undefined }
      award_credits: {
        Args: { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      can_create_post: { Args: { p_user_id: string }; Returns: boolean }
      cancel_tutor_slot: { Args: { p_slot_id: string }; Returns: undefined }
      check_rate_limit: {
        Args: {
          p_action: string
          p_max: number
          p_user_id: string
          p_window_hours?: number
        }
        Returns: boolean
      }
      cleanup_old_messages: { Args: never; Returns: undefined }
      cleanup_old_notifications: { Args: never; Returns: undefined }
      complete_tutor_slots: { Args: never; Returns: undefined }
      compute_score: {
        Args: {
          age_hours: number
          avg_rating: number
          downloads: number
          is_pinned: boolean
          upvotes: number
        }
        Returns: number
      }
      create_daily_sprint_rooms: { Args: never; Returns: undefined }
      decrement_credits: {
        Args: { amount: number; user_id: string }
        Returns: undefined
      }
      decrement_vote: {
        Args: { p_column: string; p_post_id: string }
        Returns: undefined
      }
      draw_quiz_questions: {
        Args: { count: number; subj: string }
        Returns: {
          correct_index: number
          created_at: string | null
          difficulty: string | null
          id: string
          material_id: string | null
          options: Json
          question: string
          status: string | null
          subject: string
          submitted_by: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "quiz_questions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      finish_quiz_match: { Args: { match_id: string }; Returns: undefined }
      fulfill_bounty: {
        Args: { p_bounty_id: string; p_material_id: string }
        Returns: boolean
      }
      get_caller_ip: { Args: never; Returns: string }
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_password_recovery_challenge: {
        Args: { p_email: string }
        Returns: Json
      }
      increment:
        | {
            Args: {
              amount?: number
              column_name: string
              row_id: string
              table_name: string
            }
            Returns: undefined
          }
        | {
            Args: { column_name: string; row_id: string; table_name: string }
            Returns: undefined
          }
      increment_credits: {
        Args: { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      increment_quiz_score: {
        Args: { p_match_id: string; p_points: number; p_user_id: string }
        Returns: undefined
      }
      list_courses: {
        Args: never
        Returns: {
          all_topics: string[]
          course_key: string
          display_name: string
          exams: number
          latest_year: string
          materials: number
          notes: number
        }[]
      }
      list_public_sitemap: {
        Args: never
        Returns: {
          lastmod: string
          path: string
        }[]
      }
      post_hot_score: {
        Args: { created_at: string; downvotes: number; upvotes: number }
        Returns: number
      }
      recalculate_canonicals: { Args: never; Returns: undefined }
      recalculate_trending_scores: { Args: never; Returns: undefined }
      send_weekly_digest: { Args: never; Returns: undefined }
      spend_credits: {
        Args: { p_material_id: string; p_user_id: string }
        Returns: boolean
      }
      toggle_solution_upvote: {
        Args: { p_solution_id: string }
        Returns: boolean
      }
      touch_last_seen: { Args: never; Returns: undefined }
      update_ama_statuses: { Args: never; Returns: undefined }
      verify_password_recovery_challenge: {
        Args: { p_answers: Json; p_email: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "student"],
    },
  },
} as const
