
import { Topic } from './types';

export const APP_DATA_KEY = 'appData_mypbd_v1';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: '1.1',
    title: 'Dunia Reka Bentuk',
    sps: [
      { kod: '1.1.1', deskripsi: 'Mentakrifkan reka bentuk dan teknologi.' },
      { kod: '1.1.2', deskripsi: 'Mengenal pasti elemen reka bentuk berdasarkan produk sedia ada.' },
      { kod: '1.1.3', deskripsi: 'Menjelaskan prinsip reka bentuk.' },
      { kod: '1.1.4', deskripsi: 'Aplikasi prinsip-prinsip reka bentuk dalam mereka bentuk objek asas.' },
      { kod: '1.1.5', deskripsi: 'Membanding beza etika dalam reka bentuk.' },
      { kod: '1.1.6', deskripsi: 'Meneroka kerjaya dalam bidang reka bentuk dan teknologi.' }
    ],
    tps: [
      { tp: 1, deskripsi: 'Mentakrifkan reka bentuk dan teknologi, elemen dan prinsip reka bentuk.' },
      { tp: 2, deskripsi: 'Mengenal pasti elemen dan prinsip reka bentuk.' },
      { tp: 3, deskripsi: 'Mengaplikasikan elemen dan prinsip reka bentuk pada objek asas.' },
      { tp: 4, deskripsi: 'Menganalisis elemen dan prinsip reka bentuk pada objek asas.' },
      { tp: 5, deskripsi: 'Memberi justifikasi pada elemen dan prinsip reka bentuk.' },
      { tp: 6, deskripsi: 'Menghasilkan reka bentuk kreatif dan inovatif.' }
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
    id: '2.1',
    title: 'Pengurusan Projek Reka Bentuk',
    sps: [
      { kod: '2.1.1', deskripsi: 'Mentakrifkan pengurusan projek reka bentuk.' },
      { kod: '2.1.2', deskripsi: 'Menjana idea reka bentuk.' },
      { kod: '2.1.3', deskripsi: 'Mengenal pasti langkah pengurusan pelaksanaan projek.' }
    ],
    tps: [
      { tp: 1, deskripsi: 'Mentakrifkan pengurusan projek reka bentuk.' },
      { tp: 2, deskripsi: 'Mengenal pasti langkah pengurusan projek.' },
      { tp: 3, deskripsi: 'Merangka jadual kerja dan kos projek.' },
      { tp: 4, deskripsi: 'Menganalisis jadual kerja dan kos projek.' },
      { tp: 5, deskripsi: 'Menilai keberkesanan jadual kerja.' },
      { tp: 6, deskripsi: 'Menghasilkan kertas kerja pengurusan projek.' }
    ],
    rphTemplate: "Murid menjana idea reka bentuk melalui kaedah sumbang saran.",
    induksi: "Guru menceritakan masalah beg sekolah yang berat. Murid diminta memberikan idea penyelesaian segera.",
    aktivitiUtama: {
      umum: "Membina peta alir proses pengurusan projek (Perancangan, Penjadualan, Pengawalan).",
      lelaki: "Mengira anggaran kos bahan untuk projek mekanikal.",
      perempuan: "Menyusun jadual kerja menggunakan Carta Gantt untuk projek hiasan.",
      elemen5C: ["Creativity", "Collaboration"]
    },
    activities: "Menghasilkan satu lakaran idea penyelesaian masalah yang inovatif dan menyusun langkah pengurusan projek."
  },
  {
    id: '3.1',
    title: 'Projek Brief',
    sps: [
      { kod: '3.1.1', deskripsi: 'Mentakrifkan maksud projek brief.' },
      { kod: '3.1.2', deskripsi: 'Mengenal pasti ciri-ciri dalam projek brief.' },
      { kod: '3.1.3', deskripsi: 'Merancang pembinaan mock-up atau model.' }
    ],
    tps: [
      { tp: 1, deskripsi: 'Menyatakan maksud projek brief.' },
      { tp: 2, deskripsi: 'Menerangkan ciri-ciri projek brief.' },
      { tp: 3, deskripsi: 'Melengkapkan borang projek brief.' },
      { tp: 4, deskripsi: 'Menganalisis maklumat borang projek brief.' },
      { tp: 5, deskripsi: 'Menjustifikasikan hasil analisis maklumat.' },
      { tp: 6, deskripsi: 'Menghasilkan mock-up atau model berdasarkan projek brief.' }
    ],
    rphTemplate: "Murid melengkapkan borang projek brief berdasarkan kriteria pelanggan.",
    induksi: "Guru berperanan sebagai pelanggan yang cerewet. Murid perlu mencatatkan kriteria produk yang diminta.",
    aktivitiUtama: {
      umum: "Simulasi sesi temu bual antara pereka bentuk dan pelanggan.",
      lelaki: "Menganalisis fungsi dan kualiti produk dalam borang brief.",
      perempuan: "Menganalisis sasaran pasaran and stail visual produk.",
      elemen5C: ["Communication", "Critical Thinking"]
    },
    activities: "Melengkapkan borang projek brief dan menganalisis maklumat untuk saringan kriteria produk."
  },
  {
    id: '4.1',
    title: 'Lakaran Piktorial',
    sps: [
      { kod: '4.1.1', deskripsi: 'Menyatakan peranan lakaran dalam reka bentuk.' },
      { kod: '4.1.2', deskripsi: 'Mengenal pasti teknik lakaran piktorial.' },
      { kod: '4.1.3', deskripsi: 'Menghasilkan lakaran asas produk dalam bentuk 3D.' }
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
    title: 'Reka Bentuk Sistem Fertigasi',
    sps: [
      { kod: '5.1.1', deskripsi: 'Mentakrifkan sistem fertigasi.' },
      { kod: '5.1.2', deskripsi: 'Mengenal pasti komponen utama sistem fertigasi.' },
      { kod: '5.1.3', deskripsi: 'Menghasilkan lakaran reka bentuk baharu sistem fertigasi.' }
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
  },
  {
    id: '5.2',
    title: 'Reka Bentuk Fesyen',
    sps: [
      { kod: '5.2.1', deskripsi: 'Mentakrifkan reka bentuk fesyen.' },
      { kod: '5.2.2', deskripsi: 'Menyenaraikan jenis reka bentuk fesyen.' },
      { kod: '5.2.3', deskripsi: 'Mengenal pasti teknik cantuman.' }
    ],
    tps: [
      { tp: 1, deskripsi: 'Mentakrifkan reka bentuk fesyen.' },
      { tp: 2, deskripsi: 'Mengenal pasti jenis reka bentuk fesyen dan teknik cantuman.' },
      { tp: 3, deskripsi: 'Menghasilkan lakaran reka bentuk fesyen.' },
      { tp: 4, deskripsi: 'Menganalisis elemen reka bentuk fesyen.' },
      { tp: 5, deskripsi: 'Menilai lakaran reka bentuk fesyen.' },
      { tp: 6, deskripsi: 'Menghasilkan reka bentuk fesyen dan dokumentasi.' }
    ],
    rphTemplate: "Murid melakar reka bentuk aksesori fesyen menggunakan elemen yang dipelajari.",
    induksi: "Tayangan video pertunjukan fesyen bertema tradisional-moden. Guru tanya: 'Apa teknik cantuman yang digunakan?'.",
    aktivitiUtama: {
      umum: "Aktiviti 'Mix & Match' bahan fabrik dan teknik cantuman (jahitan/gam/staplert).",
      lelaki: "Mereka bentuk aksesori lelaki (cth: tali pinggang, topi).",
      perempuan: "Mereka bentuk aksesori perempuan (cth: beg tangan, kerongsang).",
      elemen5C: ["Creativity", "Communication"]
    },
    activities: "Menghasilkan lakaran 3D reka bentuk fesyen lengkap dengan maklumat bahan and teknik cantuman."
  }
];
