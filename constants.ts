
import { Topic } from './types';

export const APP_DATA_KEY = 'appData_mypbd_v1';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: '1.1',
    title: 'Dunia Reka Bentuk',
    sps: [
      { 
        kod: '1.1.1', 
        deskripsi: 'Mentakrifkan reka bentuk dan teknologi.',
        tasks: [
          { 
            tpLevel: 1, 
            type: 'Bertulis', 
            question: 'Apakah maksud reka bentuk?', 
            instruction: 'Nyatakan definisi reka bentuk.',
            diff: {
              level: 'Rendah',
              process: 'Murid menyusun keratan perkataan (scaffolding) untuk membentuk definisi yang lengkap.',
              product: 'Definisi lengkap dalam bentuk Peta Bulatan (i-Think).'
            }
          },
          { 
            tpLevel: 2, 
            type: 'Lisan', 
            question: 'Bezakan antara reka bentuk dan teknologi.', 
            instruction: 'Terangkan perbezaan melalui contoh produk harian.',
            diff: {
              level: 'Sederhana',
              process: 'Murid membanding beza menggunakan gambar produk sedia ada di dalam kelas.',
              product: 'Pembentangan lisan ringkas menggunakan teknik "Think-Pair-Share".'
            }
          }
        ]
      },
      { 
        kod: '1.1.2', 
        deskripsi: 'Mengenal pasti elemen reka bentuk berdasarkan produk sedia ada.',
        tasks: [
          { 
            tpLevel: 4, 
            type: 'Bertulis', 
            question: 'Analisis elemen pada produk inovatif.', 
            instruction: 'Huraikan aplikasi elemen warna, rupa, dan tekstur.',
            diff: {
              level: 'Tinggi',
              process: 'Murid melakukan kajian kes ke atas produk teknologi terkini (cth: telefon pintar).',
              product: 'Laporan analisis elemen reka bentuk berserta cadangan penambahbaikan kreatif.'
            }
          }
        ]
      }
    ],
    tps: [
      { tp: 1, deskripsi: 'Mentakrifkan reka bentuk dan teknologi, elemen dan prinsip reka bentuk.' },
      { tp: 2, deskripsi: 'Mengenal pasti elemen dan prinsip reka bentuk.' },
      { tp: 3, deskripsi: 'Mengaplikasikan elemen dan prinsip reka bentuk pada objek asas.' },
      { tp: 4, deskripsi: 'Menganalisis elemen dan prinsip reka bentuk pada objek asas.' },
      { tp: 5, deskripsi: 'Memberi justifikasi pada elemen dan prinsip reka bentuk.' },
      { tp: 6, deskripsi: 'Menghasilkan reka bentuk kreatif and inovatif.' }
    ],
    rphTemplate: "Murid dapat membincangkan definisi RBT serta mengenal pasti sekurang-kurangnya 3 elemen pada produk maujud.",
    induksi: "Guru mempamerkan sebuah kerusi ergonomik dan sebuah kerusi kayu biasa. Murid diminta mencari perbezaan rupa bentuk dan fungsi.",
    aktivitiUtama: {
      umum: "Aktiviti 'Station Rotation': Setiap stesen mempunyai produk berbeza untuk dianalisis elemennya.",
      lelaki: "Menganalisis elemen kekuatan dan bahan pada struktur basikal.",
      perempuan: "Menganalisis elemen warna dan tekstur pada reka bentuk pembungkusan makanan.",
      elemen5C: ["Critical Thinking", "Collaboration", "Communication"]
    },
    activities: "Murid menganalisis perbezaan antara reka bentuk dan teknologi dalam bentuk peta pemikiran serta melakar objek asas dengan label elemen."
  },
  {
    id: '4.1',
    title: 'Lakaran Piktorial',
    sps: [
      { 
        kod: '4.1.1', 
        deskripsi: 'Menyatakan peranan lakaran dalam reka bentuk.',
        tasks: [
          { 
            tpLevel: 2, 
            type: 'Bertulis', 
            question: 'Mengenal pasti teknik lakaran.', 
            instruction: 'Labelkan teknik lakaran pada gambar yang disediakan.',
            diff: {
              level: 'Rendah',
              process: 'Murid memadankan kad nama teknik dengan contoh lakaran fizikal.',
              product: 'Lembaran kerja padanan visual.'
            }
          },
          { 
            tpLevel: 3, 
            type: 'Pemerhatian', 
            question: 'Menghasilkan lakaran 3D.', 
            instruction: 'Lukis satu bongkah geometri menggunakan teknik isometrik.',
            diff: {
              level: 'Sederhana',
              process: 'Murid melakar menggunakan bantuan kertas grid isometrik.',
              product: 'Lakaran isometrik 3D yang tepat dimensinya.'
            }
          }
        ]
      }
    ],
    tps: [
      { tp: 1, deskripsi: 'Menyatakan peranan lakaran.' },
      { tp: 2, deskripsi: 'Mengenal pasti teknik lakaran piktorial.' },
      { tp: 3, deskripsi: 'Menghasilkan lakaran piktorial 3D.' },
      { tp: 4, deskripsi: 'Menganalisis rupa bentuk lakaran.' },
      { tp: 5, deskripsi: 'Menilai maklumat pada lakaran.' },
      { tp: 6, deskripsi: 'Menghasilkan lakaran kreatif dengan rendering.' }
    ],
    rphTemplate: "Murid menghasilkan lakaran isometrik dengan teknik garisan yang betul.",
    induksi: "Guru melukis 'kotak ajaib' di papan putih menggunakan teknik isometrik. Murid meneka teknik tersebut.",
    aktivitiUtama: {
      umum: "Latihan melukis garisan lurus dan melengkung tanpa menggunakan pembaris.",
      lelaki: "Melakar model bongkah menggunakan teknik oblik.",
      perempuan: "Melakar model bongkah menggunakan teknik perspektif.",
      elemen5C: ["Creativity", "Character"]
    },
    activities: "Menghasilkan lakaran 3D produk lengkap dengan aplikasi kesan cahaya dan bayang (rendering)."
  },
  {
    id: '5.1',
    title: 'Sistem Fertigasi',
    sps: [
      {
        kod: '5.1.1',
        deskripsi: 'Mentakrifkan sistem fertigasi.',
        tasks: [
          {
            tpLevel: 2,
            type: 'Pemerhatian',
            question: 'Mengenal pasti komponen sistem fertigasi.',
            instruction: 'Labelkan komponen pada model sistem fertigasi mini.',
            diff: {
              level: 'Rendah',
              process: 'Murid melabel menggunakan pelekat nama komponen yang telah disediakan (drag & drop manual).',
              product: 'Diagram berlabel lengkap komponen fertigasi.'
            }
          },
          {
            tpLevel: 6,
            type: 'Bertulis',
            question: 'Membina lakaran reka bentuk sistem fertigasi bermaklumat.',
            instruction: 'Hasilkan lakaran 3D teknik penyusunan polibeg.',
            diff: {
              level: 'Tinggi',
              process: 'Murid menganalisis ruang sekolah untuk menentukan susun atur polibeg yang paling efisien secara mandiri.',
              product: 'Lakaran 3D berserta rajah blok sistem fertigasi yang inovatif.'
            }
          }
        ]
      }
    ],
    tps: [
      { tp: 1, deskripsi: 'Mentakrifkan sistem fertigasi.' },
      { tp: 2, deskripsi: 'Menerangkan komponen utama sistem fertigasi.' },
      { tp: 3, deskripsi: 'Melakar reka bentuk sistem fertigasi.' },
      { tp: 4, deskripsi: 'Menganalisis elemen reka bentuk dalam sistem fertigasi.' },
      { tp: 5, deskripsi: 'Menilai lakaran reka bentuk sistem fertigasi.' },
      { tp: 6, deskripsi: 'Membina model struktur sistem fertigasi.' }
    ],
    rphTemplate: "Murid mengenal pasti komponen fertigasi melalui aktiviti padanan.",
    induksi: "Guru menunjukkan set kit fertigasi mini yang berfungsi. Murid memerhati aliran air.",
    aktivitiUtama: {
      umum: "Melabelkan rajah aliran sistem fertigasi (aliran statik dan kitaran).",
      lelaki: "Memasang sambungan paip tertier pada paip sekunder (simulasi).",
      perempuan: "Menyusun atur pasu/polibeg mengikut corak penanaman yang efisien.",
      elemen5C: ["Critical Thinking", "Collaboration"]
    },
    activities: "Mencadangkan inovasi pada sistem fertigasi sedia ada dan melukis rajah blok sistem."
  }
];
