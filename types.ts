
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

export interface DifferentiationStrategy {
  process: string; // Beza Proses: Cara murid melaksanakan tugasan
  product: string; // Beza Produk: Hasil akhir yang dihasilkan
  level: 'Rendah' | 'Sederhana' | 'Tinggi';
}

export interface ReinforcementTask {
  tpLevel: number;
  question: string;
  instruction: string;
  type: 'Bertulis' | 'Lisan' | 'Pemerhatian';
  diff?: DifferentiationStrategy; // Strategi Aktiviti Terbeza
}

export interface SP {
  kod: string;
  deskripsi: string;
  tasks: ReinforcementTask[]; 
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
  activities: string;
}

export interface AppData {
  students: Student[];
  records: AssessmentRecord[];
  classes: string[];
  userProfile: UserProfile;
  customRubrics: Record<string, TPDescription[]>; // topicId -> TPs
}
