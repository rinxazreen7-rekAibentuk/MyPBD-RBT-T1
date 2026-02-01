
export interface Student {
  id: string;
  nama: string;
  kelas: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  topicId: string;
  spKod: string;
  tp: number;
  notes: string;
  kaedah: string; // Lisan, Bertulis, Pemerhatian
  timestamp: number;
}

export interface UserProfile {
  teacherName: string;
  schoolName: string;
}

export interface SP {
  kod: string;
  deskripsi: string;
}

export interface TPDescription {
  tp: number;
  deskripsi: string;
}

export interface Topic {
  id: string;
  title: string;
  sps: SP[];
  tps: TPDescription[];
  rphTemplate: string;
  induksi: string;
  aktivitiUtama: {
    umum: string;
    lelaki: string;
    perempuan: string;
    elemen5C: string[];
  };
  activities: string; // Simplified from Tier-based to a general instruction
}

export interface AppData {
  students: Student[];
  records: AssessmentRecord[];
  classes: string[];
  userProfile: UserProfile;
  customRubrics: Record<string, TPDescription[]>; // topicId -> TPs
}
