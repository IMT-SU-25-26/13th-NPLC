import { RegistrationStatus, User } from "@prisma/client"; // Pastikan untuk mengimpor enum dari prisma client

export interface Competition {
  id: string;
  name: string;
  is_started: boolean;
  is_paused: boolean;
}

// Definisikan tipe untuk objek user yang diseleksi
interface MemberUser {
  id: string;
  name: string;
  nomor_induk_siswa_nasional: string | null;
}

// Definisikan tipe untuk setiap anggota dalam array 'members'
interface TeamMember {
  id: string;
  team_name: string;
  link_twiboon: string; 
  school_name: string; 
  contact_person_number: string;
  competition_id: string;
  user_id: string;
  submission_link: string | null;
  registration_status: RegistrationStatus;
  user: MemberUser; // Menggunakan interface yang kita definisikan sebelumnya
}
export interface Team {
  competition_id: string;
  team_name: string;
  school_name: string;
  members: TeamMember[];
}

export interface Registration {
  id: string;
  team_name: string;
  registration_status: string;
  createdAt: Date;
  competition: {
    name: string;
  };
}

export interface AdminDashboardClientProps {
  initialRegistrations: {
    success: boolean;
    data: Registration[] | null;
    errorMessage?: string;
  };
}

export interface aiPromptAdminSubmission{
    id?: string;
    user: User;
    team_name: string;
    ai_chat_link: string;
    submittedAt?: string | Date | null;
    trial_and_error_link: string;
}