import * as THREE from "three";

export const POIS_BY_TEMPLE = {
    siwa: [
    {
        id: "mahadewa",
        name: { id: "Siwa Mahadewa", en: "Shiva Mahadewa" },
        dir: { id: "Timur", en: "East" },
        pos: new THREE.Vector3(-0.051, 0.999, -0.039),
        radius: 0.35,
        img: "./assets/poi/siwa/siwa.JPG",
        audio: {
            id: "./assets/audio/siwa/mahadewa_id.mp3",
            en: "./assets/audio/siwa/mahadewa_en.mp3",
        },
        desc: {
            id: "Sebagai arca terbesar di bilik utama, Siwa Mahadewa digambarkan berdiri di atas yoni dengan empat lengan. Kepala memakai mahkota jatamakuta yang dihiasi tengkorak di atas bulan sabit (candrakapala), serta memiliki mata ketiga (trinetra) di dahi. Tangan belakangnya memegang tasbih (aksamala) dan penyapu lalat (camara), sedangkan tangan depannya memegang trisula (atau bersikap memberi anugerah). Tubuhnya mengenakan tali kasta (upawita) berupa ular kobra dan cawat dari kulit harimau.",
            en: "As the largest statue in the main chamber, Shiva Mahadewa is depicted standing on a yoni with four arms. His head features a jatamakuta crown adorned with a skull above a crescent moon (chandrakapala), and a third eye (trinetra) on his forehead. His back hands hold prayer beads (akshamala) and a fly-whisk (chamara), while his front hands hold a trident. His body is wrapped with a cobra serpent caste-cord (upavita) and a tiger skin loincloth."
        },
    },
    {
        id: "agastya",
        name: { id: "Agastya", en: "Agastya" },
        dir: { id: "Selatan", en: "South" },
        pos: new THREE.Vector3(-0.038, 0.934, 0.605),
        radius: 0.35,
        img: "./assets/poi/siwa/agastya.JPG",
        audio: {
            id: "./assets/audio/siwa/agastya_id.mp3",
            en: "./assets/audio/siwa/agastya_en.mp3",
        },
        desc: {
        id: "Agastya merupakan perwujudan Dewa Siwa sebagai Mahaguru spiritual yang menyebarkan ajaran suci. Ia digambarkan sebagai seorang resi tua bertubuh tambun, memiliki kumis dan jenggot panjang yang mencerminkan kebijaksanaan. Tangan kanannya memegang tasbih (aksamala) untuk merapal mantra, dan tangan kirinya memegang kendi air suci (kamandalu). Di latar belakangnya terdapat penyapu lalat (camara) di pundak kiri dan trisula di sebelah kanan sebagai lambang senjata Siwa.",
        en: "Agastya is a manifestation of Shiva as the Mahaguru (Great Teacher) who spread the sacred teachings. He is depicted as an elderly, corpulent sage with a long moustache and beard reflecting his wisdom. His right hand holds prayer beads (akshamala) for chanting mantras, and his left hand holds a holy water vessel (kamandalu). A fly-whisk (chamara) rests on his left shoulder and a trident stands on his right as the weapon of Shiva."
        },
    },
    {
        id: "ganesha",
        name: { id: "Ganesha", en: "Ganesha" },
        dir: { id: "Barat", en: "West" },
        pos: new THREE.Vector3(-0.672, 0.947, -0.005),
        radius: 0.35,
        img: "./assets/poi/siwa/ganesha.JPG",
        audio: {
            id: "./assets/audio/siwa/ganesha_id.mp3",
            en: "./assets/audio/siwa/ganesha_en.mp3",
        },
        desc: {
            id: "Ganesha digambarkan duduk dengan telapak kaki saling bertemu (sikap utkutikasana). Arca bertangan empat ini memegang laksana suci: tangan kanan belakang memegang tasbih (aksamala), tangan kiri belakang memegang kapak perang (parasu), tangan kanan depan memegang patahan gadingnya sendiri (danta), dan tangan kiri depan memegang mangkuk madu/ilmu pengetahuan yang sedang dihisap oleh belalainya sebagai simbol penyerapan kebijaksanaan tanpa henti.",
            en: "Ganesha is depicted sitting with the soles of his feet meeting (utkutikasana posture). This four-armed statue holds sacred attributes: the upper right hand holds prayer beads (akshamala), the upper left holds a battle-axe (parasu), the lower right holds his own broken tusk (danta), and the lower left holds a bowl of knowledge/honey being sipped by his trunk, symbolizing the continuous absorption of wisdom."
        },
    },
    {
        id: "durga",
        name: { id: "Durga Mahisasuramardini", en: "Durga Mahisasuramardini" },
        dir: { id: "Utara", en: "North" },
        pos: new THREE.Vector3(-0.035, 0.939, -0.614),
        radius: 0.35,
        img: "./assets/poi/siwa/durga.JPG",
        audio: {
            id: "./assets/audio/siwa/durga_id.mp3",
            en: "./assets/audio/siwa/durga_en.mp3",
        },
        desc: {
            id: "Durga digambarkan sebagai dewi cantik bertangan delapan yang berdiri di atas kerbau (Mahisa) yang telah ditaklukkannya. Tangan-tangannya memegang berbagai senjata kedewataan pemberian para dewa, seperti cakra, sangka (kerang), pedang, perisai, busur, panah, untaian tali, dan tangan satunya menjambak rambut Asura (raksasa kerdil yang keluar dari tubuh kerbau). Arca ini melambangkan kemenangan kebajikan (dharma) atas kejahatan dan egoisme (adharma).",
            en: "Durga is depicted as a beautiful eight-armed goddess standing atop the buffalo (Mahisa) she has subdued. Her hands hold various celestial weapons gifted by the gods, including a chakra (discus), shanka (conch), sword, shield, bow, arrow, noose, and one hand pulling the hair of the Asura (the dwarf demon emerging from the buffalo). This statue symbolizes the victory of righteousness (dharma) over evil and egoism (adharma)."
        },
    },
    {
        id: "panel_1a",
        name: { id: "Panel Relief 1", en: "Panel Relief 1" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(1.427, 0.444, 0.459),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_1a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel1a_id.mp3",
            en: "./assets/audio/siwa/panel1a_en.mp3",
        },
        desc: {
            id: "Dewa Wisnu di Surga Tushita, duduk di atas singgasana berbentuk ular naga yang muncul dari laut, dan di belakangnya duduk seekor garuda. Lima orang dewa meminta bantuan Wisnu supaya turun ke dunia untuk membinasakan kejahatan yang dilakukan oleh Rawana.",
            en: "The god Vishnu was in the Tushita heaven, sitting on a throne shaped like a serpent, with a garuda behind him. Five gods requested Vishnu's help to descend to the world and destroy the evil done by Ravana.",
        },
    },
    {
        id: "panel_1b",
        name: { id: "Panel Relief 1", en: "Panel Relief 1" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(1.432, 0.436, 0.672),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_1b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel1b_id.mp3",
            en: "./assets/audio/siwa/panel1b_en.mp3",
        },
        desc: {
            id: "Di Kerajaan Ayodya, memerintahlah Raja Dasarata. Raja Dasarata dan permaisuri sedang dihadap oleh Rama, penjelmaan Wisnu, beserta para abdi keraton.",
            en: "In the kingdom of Ayodhya, King Dasaratha ruled. The king and his queen were facing Rama, the incarnation of Vishnu, along with his courtiers.",
        },
    },
    {
        id: "panel_2",
        name: { id: "Panel Relief 2", en: "Panel Relief 2" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(1.255, 0.449, 0.8),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_2.jpg",
        audio: {
            id: "./assets/audio/siwa/panel2_id.mp3",
            en: "./assets/audio/siwa/panel2_en.mp3",
        },
        desc: {
            id: "Pada suatu hari Raja Dasarata kedatangan tamu pendeta bernama Wismamitra. Dia memohon pertolongan kepada Rama agar mau membunuh para raksasa yang mengganggu pertapaannya. Di belakang sang raja duduk tiga istrinya, yaitu Kausalya, yang telah melahirkan Rama (putra pertama), Kaikeyi, yang telah melahirkan Barata, dan Sumitra, yang putranya bernama Laksamana dan Satrugna. Rama dan Laksamana berada di sebelah kanan mereka.",
            en: "One day, King Dasaratha received a visit from a sage named Wismamitra. He requested Rama's help to kill the rakshasas harassing his hermitage. Behind the king sat his three wives: Kausalya, who had given birth to Rama (the first son), Kaikeyi, who had given birth to Bharata, and Sumitra, whose sons were Laksmana and Satrughna. Rama and Laksmana were positioned to the right of them.",
        },
    },
    {
        id: "panel_3",
        name: { id: "Panel Relief 3", en: "Panel Relief 3" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(1.096, 0.448, 0.972),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_3.jpg",
        audio: {
            id: "./assets/audio/siwa/panel3_id.mp3",
            en: "./assets/audio/siwa/panel3_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana dalam perjalanan menuju pertapaan pendeta Wismamitra. Tiba-tiba mereka diganggu oleh raseksi Tataka. Rama membunuh dia di hutan.",
            en: "Rama and Laksmana were on their way to the hermitage of sage Wismamitra. Suddenly, they were disturbed by the rakshasa Tataka. Rama killed her in the forest.",
        },
    },
    {
        id: "panel_4a",
        name: { id: "Panel Relief 4", en: "Panel Relief 4" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.972, 0.444, 1.117),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_4a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel4a_id.mp3",
            en: "./assets/audio/siwa/panel4a_en.mp3",
        },
        desc: {
            id: "Pendeta Wismamitra duduk bersemadi di dalam pertapaannya.",
            en: "The sage Wismamitra sat in meditation within his hermitage.",
        },
    },
    {
        id: "panel_4b",
        name: { id: "Panel Relief 4", en: "Panel Relief 4" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.893, 0.44, 1.118),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_4b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel4b_id.mp3",
            en: "./assets/audio/siwa/panel4b_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana membunuh semua raksasa yang mengganggu pertapaan Wismamitra.",
            en: "Rama and Laksmana killed all the rakshasas harassing the hermitage of sage Wismamitra.",
        },
    },
    {
        id: "panel_5a",
        name: { id: "Panel Relief 5", en: "Panel Relief 5" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.782, 0.448, 1.227),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_5a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel5a_id.mp3",
            en: "./assets/audio/siwa/panel5a_en.mp3",
        },
        desc: {
            id: "Di kerajaan Mantilireja, memerintah Raja Janaka. Beliau mengadakan sayembara: barangsiapa dapat menarik dan mematahkan busur Raja Janaka akan dikawinkan dengan putrinya yang sangat cantik bernama Sinta.",
            en: "In the kingdom of Mantili, King Janaka ruled. He organized a competition: whoever could string and break the bow of King Janaka would be married to his very beautiful daughter, Sita.",
        },
    },
    {
        id: "panel_5b",
        name: { id: "Panel Relief 5", en: "Panel Relief 5" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.787, 0.439, 1.318),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_5b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel5b_id.mp3",
            en: "./assets/audio/siwa/panel5b_en.mp3",
        },
        desc: {
            id: "Rama ikut ambil bagian sayembara dan berhasil menarik serta mematahkan busur Raja Janaka, disaksikan oleh Sinta dan para pengawalnya.",
            en: "Rama participated in the competition and successfully strung and broke the bow of King Janaka, witnessed by Sita and her attendants.",
        },
    },
    {
        id: "panel_6a",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.694, 0.442, 1.454),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_6a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel6a_id.mp3",
            en: "./assets/audio/siwa/panel6a_en.mp3",
        },
        desc: {
            id: "Rama, Sinta, beserta Laksamana dalam perjalanan menuju negeri Ayodya.",
            en: "Rama, Sita, and Laksmana were on their way to the kingdom of Ayodhya.",
        },
    },
    {
        id: "panel_6b",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.584, 0.448, 1.456),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_6b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel6b_id.mp3",
            en: "./assets/audio/siwa/panel6b_en.mp3",
        },
        desc: {
            id: "Di dalam perjalanan tersebut mereka bertemu dengan seorang tokoh yang bernama Rama Parasu. Dia meminta kepada Rama agar ia dibunuh dengan panah.",
            en: "During their journey, they encountered a figure named Rama Parasu. He asked Rama to kill him with an arrow.",
        },
    },
    {
        id: "panel_6c",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(0.447, 0.447, 1.452),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_6c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel6c_id.mp3",
            en: "./assets/audio/siwa/panel6c_en.mp3",
        },
        desc: {
            id: "Rama membunuh Rama Parasu dengan panahnya.",
            en: "Rama killed Rama Parasu with his arrow.",
        },
    },
    {
        id: "panel_6d",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        dir: { id: "Adegan 4", en: "Scene 4" },
        pos: new THREE.Vector3(0.319, 0.449, 1.451),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_6d.jpg",
        audio: {
            id: "./assets/audio/siwa/panel6d_id.mp3",
            en: "./assets/audio/siwa/panel6d_en.mp3",
        },
        desc: {
            id: "Raja Dasarata, karena merasa telah lanjut usia, ingin mewariskan takhta kerajaan kepada Rama. Raja dan permaisurinya serta para pembantunya sedang mempersiapkan pesta penobatan.",
            en: "King Dasaratha, feeling he had grown old, wanted to pass the throne to Rama. The king and his queen along with his ministers were preparing for the coronation ceremony.",
        },
    },
    {
        id: "panel_7a",
        name: { id: "Panel Relief 7", en: "Panel Relief 7" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(-0.381, 0.446, 1.455),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_7a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel7a_id.mp3",
            en: "./assets/audio/siwa/panel7a_en.mp3",
        },
        desc: {
            id: "Penobatan Rama sebagai putra mahkota dilakukan oleh seorang pendeta. Di luar istana rakyat merayakan penobatan tersebut.",
            en: "The coronation of Rama as the crown prince was performed by a priest. The people outside the palace celebrated this event.",
        },
    },
    {
        id: "panel_7b",
        name: { id: "Panel Relief 7", en: "Panel Relief 7" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(-0.574, 0.448, 1.461),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_7b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel7b_id.mp3",
            en: "./assets/audio/siwa/panel7b_en.mp3",
        },
        desc: {
            id: "Istri kedua, Kaikeyi, ibu Barata, membujuk sang Raja untuk membatalkan penobatan Rama sebagai raja, mengasingkannya ke dalam hutan selama empat belas tahun, dan mengangkat Barata sebagai penggantinya. Malam hari sebelum keberangkatan mereka, Rama dan Sinta berdoa di dalam candi.",
            en: "The second wife, Kaikeyi, mother of Bharata, persuaded the king to cancel Rama's coronation, exiling him to the forest for fourteen years and appointing Bharata as his successor. On the night before their departure, Rama and Sita prayed inside the temple.",
        },
    },
    {
        id: "panel_7c",
        name: { id: "Panel Relief 7", en: "Panel Relief 7" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(-0.696, 0.449, 1.458),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_7c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel7c_id.mp3",
            en: "./assets/audio/siwa/panel7c_en.mp3",
        },
        desc: {
            id: "Rama, Sinta, dan Laksamana pergi menuju hutan untuk menjalani pembuangan.",
            en: "Rama, Sita, and Laksmana went to the forest to serve their exile.",
        },
    },
    {
        id: "panel_8",
        name: { id: "Panel Relief 8", en: "Panel Relief 8" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-0.842, 0.456, 1.284),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_8.jpg",
        audio: {
            id: "./assets/audio/siwa/panel8_id.mp3",
            en: "./assets/audio/siwa/panel8_en.mp3",
        },
        desc: {
            id: "Tidak lama kemudian, Raja Dasarata wafat karena dukacita; jenazahnya diperabukan. Para brahmana dan permaisuri Kausalya membagi-bagikan dana kepada rakyat Ayodya.",
            en: "Not long after, King Dasaratha passed away due to grief; his body was cremated. The brahmins and Queen Kausalya distributed charity to the people of Ayodhya.",
        },
    },
    {
        id: "panel_9",
        name: { id: "Panel Relief 9", en: "Panel Relief 9" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-0.995, 0.453, 1.134),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_9.jpg",
        audio: {
            id: "./assets/audio/siwa/panel9_id.mp3",
            en: "./assets/audio/siwa/panel9_en.mp3",
        },
        desc: {
            id: "Barata menolak untuk dinobatkan sebagai raja; dia pergi mencari Rama di hutan untuk membujuknya pulang ke istana dan memerintah kerajaan Ayodya. Akan tetapi, Rama menolaknya dan memberikan sandal sebagai gantinya. Rama meminta sandal itu ditaruh di atas singgasana dan menyuruh Barata agar memerintah Ayodya atas nama Rama.",
            en: "Bharata refused to be crowned as king; he went to the forest to persuade Rama to return to the palace and rule the kingdom of Ayodhya. However, Rama rejected him and gave him a pair of sandals instead. The sandals were to be placed on the throne, and Rama instructed Bharata to rule Ayodhya on his behalf.",
        },
    },
    {
        id: "panel_10",
        name: { id: "Panel Relief 10", en: "Panel Relief 10" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-1.155, 0.45, 0.983),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_10.jpg",
        audio: {
            id: "./assets/audio/siwa/panel10_id.mp3",
            en: "./assets/audio/siwa/panel10_en.mp3",
        },
        desc: {
            id: "Sinta diganggu oleh dua raksasa, tetapi kedua raksasa tersebut berhasil dibunuh oleh Rama.",
            en: "Sita was disturbed by two rakshasas, but the two rakshasas were successfully killed by Rama.",
        },
    },
    {
        id: "panel_11",
        name: { id: "Panel Relief 11", en: "Panel Relief 11" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-1.327, 0.453, 0.82),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_11.jpg",
        audio: {
            id: "./assets/audio/siwa/panel11_id.mp3",
            en: "./assets/audio/siwa/panel11_en.mp3",
        },
        desc: {
            id: "Rama, Sinta, dan Laksamana tinggal di dalam gubuk. Pada suatu hari seekor burung gagak mencuri daging rusa yang sedang dijemur oleh Sinta. Rama membunuh burung gagak tersebut dengan memenggal kepalanya.",
            en: "Rama, Sita, and Laksmana stayed in a hut. One day, a crow stole the venison that Sita was drying in the sun. Rama killed the crow by beheading it.",
        },
    },
    {
        id: "panel_12a",
        name: { id: "Panel Relief 12", en: "Panel Relief 12" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(-1.502, 0.447, 0.676),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_12a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel12a_id.mp3",
            en: "./assets/audio/siwa/panel12a_en.mp3",
        },
        desc: {
            id: "Raseksi Sarpakenaka, adik perempuan Rawana, yang menyamar sebagai wanita cantik, memberikan sesuatu kepada Rama dengan maksud agar Rama mau memperistrinya. Akan tetapi, Rama menolaknya dan menunjuk pada Laksamana.",
            en: "The rakshasi Sarpakenaka, Ravana's sister, disguised as a beautiful woman, offered something to Rama with the intention of making him marry her. However, Rama rejected her and pointed to Laksmana.",
        },
    },
    {
        id: "panel_12b",
        name: { id: "Panel Relief 12", en: "Panel Relief 12" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(-1.5, 0.449, 0.52),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_12b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel12b_id.mp3",
            en: "./assets/audio/siwa/panel12b_en.mp3",
        },
        desc: {
            id: "Cinta Sarpakenaka juga ditolak oleh Laksamana; dengan maksud untuk mengusirnya, Laksamana memotong daun telinga dan hidungnya. Kemudian, dia mengadu kepada saudaranya, Rawana, tentang penghinaan tersebut.",
            en: "Sarpakenaka's affection was also rejected by Laksmana; with the intention of driving her away, Laksmana cut her ear and nose. Then, she complained to her brother, Ravana, about this humiliation.",
        },
    },
    {
        id: "panel_12c",
        name: { id: "Panel Relief 12", en: "Panel Relief 12" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(-1.494, 0.449, 0.369),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_12c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel12c_id.mp3",
            en: "./assets/audio/siwa/panel12c_en.mp3",
        },
        desc: {
            id: "Sinta dijaga oleh Laksamana sewaktu Rama sedang memanah seekor kijang jelmaan Marica, raksasa pembantu Rawana.",
            en: "Sita was guarded by Laksmana while Rama was hunting a deer transformed into Marica, a servant rakshasa of Ravana.",
        },
    },
    {
        id: "panel_13a",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(-1.491, 0.436, -0.31),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_13a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel13a_id.mp3",
            en: "./assets/audio/siwa/panel13a_en.mp3",
        },
        desc: {
            id: "Sinta berada di dalam gubuk seorang diri setelah Laksamana pergi mencari Rama atas perintahnya.",
            en: "Sita was alone in a hut after Laksmana left to search for Rama on her orders.",
        },
    },
    {
        id: "panel_13b",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(-1.491, 0.443, -0.374),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_13b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel13b_id.mp3",
            en: "./assets/audio/siwa/panel13b_en.mp3",
        },
        desc: {
            id: "Rawana yang menyamar sebagai pendeta mendekati Sinta untuk meminta nasi. Ketika Sinta memberikan nasi, tangannya ditarik dengan paksa oleh Rawana.",
            en: "Ravana, disguised as a priest, approached Sita to ask for rice. When Sita offered her rice, her hand was forcibly pulled by Ravana.",
        },
    },
    {
        id: "panel_13c",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(-1.494, 0.442, -0.471),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_13c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel13c_id.mp3",
            en: "./assets/audio/siwa/panel13c_en.mp3",
        },
        desc: {
            id: "Rawana berhasil menculik Sinta dan membawanya terbang ke angkasa. Di tengah perjalanan Rawana diserang Jatayu untuk membebaskan Sinta. Jatayu kalah dalam pertempuran, tetapi dia berhasil menerima cincin Sinta.",
            en: "Ravana successfully kidnapped Sita and carried her away to the sky. During the journey, Ravana was attacked by Jatayu to free Sita. Jatayu was defeated in the battle, but he managed to receive Sita's ring.",
        },
    },
    {
        id: "panel_13d",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        dir: { id: "Adegan 4", en: "Scene 4" },
        pos: new THREE.Vector3(-1.496, 0.447, -0.572),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_13d.jpg",
        audio: {
            id: "./assets/audio/siwa/panel13d_id.mp3",
            en: "./assets/audio/siwa/panel13d_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana sangat sedih ketika mengetahui hilangnya Sinta, dan memutuskan mencarinya. Di dalam pengembaraannya mereka berjumpa dengan Jatayu yang hampir menemui ajalnya. Dia menceritakan apa yang telah terjadi, dan setelah memberi cincin kepada Rama, dia meninggal dunia.",
            en: "Rama and Laksmana were very sad when they learned that Sita was missing, and they decided to search for her. During their travels, they encountered Jatayu, who was nearly at the end of his life. He recounted what had happened, and after giving a ring to Rama, he passed away.",
        },
    },
    {
        id: "panel_13e",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        dir: { id: "Adegan 5", en: "Scene 5" },
        pos: new THREE.Vector3(-1.497, 0.447, -0.667),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_13e.jpg",
        audio: {
            id: "./assets/audio/siwa/panel13e_id.mp3",
            en: "./assets/audio/siwa/panel13e_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana bertempur melawan raksasa Kabandha. Mereka berhasil mengalahkannya dan mengembalikannya kepada wujudnya yang semula. Kabandha adalah inkarnasi dewa yang dikutuk oleh Dewa Siwa dan dihukum untuk hidup sebagai makhluk yang jelek.",
            en: "Rama and Laksmana fought against the rakshasa Kabandha. They successfully defeated him and restored him to his original form. Kabandha was the incarnation of a god cursed by the god Shiva and sentenced to live as a hideous creature.",
        },
    },
    {
        id: "panel_14",
        name: { id: "Panel Relief 14", en: "Panel Relief 14" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-1.323, 0.446, -0.812),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_14.jpg",
        audio: {
            id: "./assets/audio/siwa/panel14_id.mp3",
            en: "./assets/audio/siwa/panel14_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana bertemu dengan seekor buaya yang sebenarnya inkarnasi seorang bidadari yang terkena kutukan oleh dewa. Setelah terkena panah Rama, dia berubah ke dalam wujudnya yang semula dan terbang ke surga.",
            en: "Rama and Laksmana encountered a crocodile that was actually the incarnation of a celestial maiden cursed by a god. After being hit by Rama's arrow, it transformed back to its original form and flew to heaven.",
        },
    },
    {
        id: "panel_15",
        name: { id: "Panel Relief 15", en: "Panel Relief 15" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-1.174, 0.448, -0.985),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_15.jpg",
        audio: {
            id: "./assets/audio/siwa/panel15_id.mp3",
            en: "./assets/audio/siwa/panel15_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana bertemu dengan Hanoman, seekor kera putih. Dia memohon kepada mereka untuk menemui Sugriwa, raja kera.",
            en: "Rama and Laksmana met with Hanuman, a white monkey. He requested them to meet Sugriva, the king of the monkeys.",
        },
    },
    {
        id: "panel_16a",
        name: { id: "Panel Relief 16", en: "Panel Relief 16" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(-1.068, 0.44, -1.132),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_16a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel16a_id.mp3",
            en: "./assets/audio/siwa/panel16a_en.mp3",
        },
        desc: {
            id: "Rama dan Laksamana beristirahat di tengah hutan. Rama menyuruh adiknya untuk mencari air.",
            en: "Rama and Laksmana rested in the middle of the forest. Rama instructed his brother to find water.",
        },
    },
    {
        id: "panel_16b",
        name: { id: "Panel Relief 16", en: "Panel Relief 16" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(-1.002, 0.447, -1.13),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_16b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel16b_id.mp3",
            en: "./assets/audio/siwa/panel16b_en.mp3",
        },
        desc: {
            id: "Laksamana menemukan air yang menetes dari atas pohon. Akan tetapi, rasanya asin; kemudian, diketahui bahwa air tersebut air mata raja kera Sugriwa yang menangis karena terjepit.",
            en: "Laksmana found water dripping from the top of a tree. However, it tasted salty; later, it was discovered that the water was the tears of the monkey king Sugriva, who was crying because he was trapped.",
        },
    },
    {
        id: "panel_16c",
        name: { id: "Panel Relief 16", en: "Panel Relief 16" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(-0.935, 0.447, -1.132),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_16c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel16c_id.mp3",
            en: "./assets/audio/siwa/panel16c_en.mp3",
        },
        desc: {
            id: "Setelah dibantu oleh Rama dan Laksamana turun dari pohon, Sugriwa minta kepada Rama untuk membantu dia menaklukkan Subali yang telah merebut kerajaan dan istrinya dengan paksa. Pada giliran berikutnya Sugriwa akan membantu Rama untuk mendapatkan kembali Sinta dari Alengka.",
            en: "After being helped by Rama and Laksmana to descend from the tree, Sugriva asked Rama for help in subduing Vali, who had seized the kingdom and his wife by force. In return, Sugriva would help Rama to retrieve Sita from Alengka.",
        },
    },
    {
        id: "panel_17",
        name: { id: "Panel Relief 17", en: "Panel Relief 17" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(-0.864, 0.442, -1.299),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_17.jpg",
        audio: {
            id: "./assets/audio/siwa/panel17_id.mp3",
            en: "./assets/audio/siwa/panel17_en.mp3",
        },
        desc: {
            id: "Untuk meyakinkan Sugriwa atas kesaktian Rama, Rama memanah dengan sebatang anak panah yang dapat memotong tujuh pohon palem.",
            en: "To convince Sugriva of Rama's prowess, Rama shot an arrow that could cut through seven palm trees.",
        },
    },
    {
        id: "panel_18a",
        name: { id: "Panel Relief 18", en: "Panel Relief 18" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(-0.717, 0.446, -1.46),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_18a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel18a_id.mp3",
            en: "./assets/audio/siwa/panel18a_en.mp3",
        },
        desc: {
            id: "Setibanya Rama, Laksamana, dan Sugriwa di Kiskenda, mereka menyusun strategi untuk menyerang Subali. Rama menyuruh Sugriwa untuk menantang Subali.",
            en: "Upon arriving at Kiskenda, Rama, Laksmana, and Sugriva formulated a strategy to attack Vali. Rama instructed Sugriva to challenge Vali.",
        },
    },
    {
        id: "panel_18b",
        name: { id: "Panel Relief 18", en: "Panel Relief 18" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(-0.61, 0.44, -1.465),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_18b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel18b_id.mp3",
            en: "./assets/audio/siwa/panel18b_en.mp3",
        },
        desc: {
            id: "Terjadi perang sangat seru antara Subali dan Sugriwa. Rama memanah Subali; Subali mati terbunuh.",
            en: "A fierce battle occurred between Vali and Sugriva. Rama shot Vali; Vali was killed.",
        },
    },
    {
        id: "panel_18c",
        name: { id: "Panel Relief 18", en: "Panel Relief 18" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(-0.429, 0.442, -1.466),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_18c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel18c_id.mp3",
            en: "./assets/audio/siwa/panel18c_en.mp3",
        },
        desc: {
            id: "Sugriwa kembali naik takhta Kiskenda, dan Anggada anak Subali diangkat sebagai putra mahkota. Sugriwa disambut oleh para kera.",
            en: "Sugriva returned to the throne of Kiskenda, and Angada, the son of Vali, was appointed as the crown prince. Sugriva was welcomed by the monkeys.",
        },
    },
    {
        id: "panel_19a",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.25, 0.445, -1.472),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_19a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel19a_id.mp3",
            en: "./assets/audio/siwa/panel19a_en.mp3",
        },
        desc: {
            id: "Rama, Laksamana, dan Sugriwa dalam perjalanan ke suatu tempat perundingan.",
            en: "Rama, Laksmana, and Sugriva were on a journey to a meeting place.",
        },
    },
    {
        id: "panel_19b",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.357, 0.441, -1.476),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_19b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel19b_id.mp3",
            en: "./assets/audio/siwa/panel19b_en.mp3",
        },
        desc: {
            id: "Rama, Laksamana, dan Sugriwa sedang berunding untuk merencanakan dan mengatur siasat dalam rangka penyerangan ke Alengka.",
            en: "Rama, Laksmana, and Sugriva discussed strategies for attacking Alengka.",
        },
    },
    {
        id: "panel_19c",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        dir: { id: "Adegan 3", en: "Scene 3" },
        pos: new THREE.Vector3(0.491, 0.437, -1.471),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_19c.jpg",
        audio: {
            id: "./assets/audio/siwa/panel19c_id.mp3",
            en: "./assets/audio/siwa/panel19c_en.mp3",
        },
        desc: {
            id: "Sugriwa mengusulkan kepada Rama agar mau mengirim utusan, yaitu Hanoman, untuk mencari Sinta di Alengka.",
            en: "Sugriva suggested to Rama that he send an envoy, namely Hanuman, to search for Sita in Alengka.",
        },
    },
    {
        id: "panel_19d",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        dir: { id: "Adegan 4", en: "Scene 4" },
        pos: new THREE.Vector3(0.586, 0.446, -1.47),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_19d.jpg",
        audio: {
            id: "./assets/audio/siwa/panel19d_id.mp3",
            en: "./assets/audio/siwa/panel19d_en.mp3",
        },
        desc: {
            id: "Hanoman pergi ke Alengka dengan jalan melompat dari Gunung Mahameru untuk menyeberangi laut. Sesampainya di Alengka, dia mengamati situasi istana Rawana dan mencari dari atas atap tempat Sinta tinggal.",
            en: "Hanuman went to Alengka by jumping from Mount Mahameru to cross the sea. Upon arriving in Alengka, he observed the situation at Ravana's palace and searched from the roof where Sita was held.",
        },
    },
    {
        id: "panel_20a",
        name: { id: "Panel Relief 20", en: "Panel Relief 20" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.764, 0.445, -1.35),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_20a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel20a_id.mp3",
            en: "./assets/audio/siwa/panel20a_en.mp3",
        },
        desc: {
            id: "Hanoman berada di dalam istana Rawana, tempat Sinta disekap. Dia mengintip Sinta dari atas pohon; Sinta sedang duduk di taman ditemani oleh Trijata, keponakan Rawana. Seorang dayang menemukan dia dan melaporkan bahwa ada seekor kera bersembunyi di taman.",
            en: "Hanuman was inside Ravana's palace, where Sita was being held. He spied on Sita from above the tree; Sita was sitting in the garden accompanied by Trijata, Ravana's niece. A maid discovered him and reported that there was a monkey hiding in the garden.",
        },
    },
    {
        id: "panel_20b",
        name: { id: "Panel Relief 20", en: "Panel Relief 20" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.768, 0.444, -1.261),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_20b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel20b_id.mp3",
            en: "./assets/audio/siwa/panel20b_en.mp3",
        },
        desc: {
            id: "Hanoman menghadap Sinta dan memberitahukan tujuan kedatangannya dan bahwa Rama akan segera datang untuk menjemput Sinta pulang.",
            en: "Hanuman faced Sita and informed her of his purpose for coming and that Rama would soon arrive to fetch her home.",
        },
    },
    {
        id: "panel_21a",
        name: { id: "Panel Relief 21", en: "Panel Relief 21" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(0.885, 0.446, -1.152),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_21a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel21a_id.mp3",
            en: "./assets/audio/siwa/panel21a_en.mp3",
        },
        desc: {
            id: "Kedatangan Hanoman diketahui oleh para pengawal kerajaan Alengka, dan dia ditangkap. Dia diikat dengan tali dan ekornya dibakar.",
            en: "Hanuman's arrival was discovered by the guards of the Alengka kingdom, and he was captured. He was tied up with ropes and his tail was burned.",
        },
    },
    {
        id: "panel_21b",
        name: { id: "Panel Relief 21", en: "Panel Relief 21" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(0.967, 0.443, -1.148),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_21b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel21b_id.mp3",
            en: "./assets/audio/siwa/panel21b_en.mp3",
        },
        desc: {
            id: "Akan tetapi, Hanoman dapat melepaskan diri. Dengan ekornya terbakar, dia melompat ke atas atap yang satu ke atap lainnya sambil membakarnya. Dalam waktu sekejap saja seluruh kota Alengka terbakar.",
            en: "However, Hanuman was able to free himself. With his tail burned, he jumped from one roof to another while setting them on fire. In a short time, the entire city of Alengka was consumed by flames.",
        },
    },
    {
        id: "panel_22",
        name: { id: "Panel Relief 22", en: "Panel Relief 22" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(1.091, 0.451, -0.969),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_22.jpg",
        audio: {
            id: "./assets/audio/siwa/panel22_id.mp3",
            en: "./assets/audio/siwa/panel22_en.mp3",
        },
        desc: {
            id: "Hanoman kembali ke Kiskenda, diterima oleh Rama, Laksamana, dan Sugriwa. Hanoman melaporkan kepada mereka tugasnya di Alengka.",
            en: "Hanuman returned to Kiskenda, where he was received by Rama, Laksmana, and Sugriva. Hanuman reported to them on his mission in Alengka.",
        },
    },
    {
        id: "panel_23",
        name: { id: "Panel Relief 23", en: "Panel Relief 23" },
        dir: { id: "Adegan", en: "Scene" },
        pos: new THREE.Vector3(1.249, 0.447, -0.836),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_23.jpg",
        audio: {
            id: "./assets/audio/siwa/panel23_id.mp3",
            en: "./assets/audio/siwa/panel23_en.mp3",
        },
        desc: {
            id: "Rama akan mengeringkan laut untuk jalan menuju Alengka. Dewa laut merasa takut; kemudian, ia memohon kepada Rama agar membatalkan niatnya tersebut dan menyarankan kepadanya untuk membuat jembatan dari pantai ke Alengka.",
            en: "Rama was about to dry up the sea to create a path to Alengka. The sea god became afraid; then, he pleaded with Rama to cancel his intention and suggested making a bridge from the shore to Alengka.",
        },
    },
    {
        id: "panel_24a",
        name: { id: "Panel Relief 24", en: "Panel Relief 24" },
        dir: { id: "Adegan 1", en: "Scene 1" },
        pos: new THREE.Vector3(1.415, 0.446, -0.646),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_24a.jpg",
        audio: {
            id: "./assets/audio/siwa/panel24a_id.mp3",
            en: "./assets/audio/siwa/panel24a_en.mp3",
        },
        desc: {
            id: "Rama, Laksamana, dan Sugriwa menyaksikan para kera sedang membuat jembatan, dibantu oleh ikan dan dewa laut.",
            en: "Rama, Laksmana, and Sugriva watched as the monkeys built a bridge, assisted by fish and the sea god.",
        },
    },
    {
        id: "panel_24b",
        name: { id: "Panel Relief 24", en: "Panel Relief 24" },
        dir: { id: "Adegan 2", en: "Scene 2" },
        pos: new THREE.Vector3(1.416, 0.446, -0.459),
        radius: 0.35,
        img: "./assets/poi/siwa/panel_24b.jpg",
        audio: {
            id: "./assets/audio/siwa/panel24b_id.mp3",
            en: "./assets/audio/siwa/panel24b_en.mp3",
        },
        desc: {
            id: "Rama, Laksamana, Sugriwa, dan bala tentara kera sedang melewati jembatan menuju Alengka.",
            en: "Rama, Laksmana, Sugriva, and the monkey army were crossing the bridge towards Alengka.",
        },
    },
    ],
    brahma: [
    {
        id: "brahma",
        name: { id: "Brahma", en: "Brahma" },
        dir: { id: "Bilik Utama", en: "Main Chamber" },
        pos: new THREE.Vector3(0.142, 0.860, 4.053),
        radius: 0.35,
        img: "./assets/poi/brahma/brahma.JPG",
        audio: {
            id: "./assets/audio/brahma/brahma_id.mp3",
            en: "./assets/audio/brahma/brahma_en.mp3",
        },
        desc: {
            id: "Arca Dewa Brahma digambarkan berkepala empat (caturmukha) yang menghadap ke empat penjuru mata angin, melambangkan penguasaan atas empat Kitab Suci Weda. Ia memiliki empat lengan yang memegang laksana (atribut) suci: tasbih (aksamala) sebagai simbol waktu dan doa, serta sekuntum bunga teratai (padma) lambang alam semesta. Dua tangan lainnya memegang kendi air kehidupan (kamandalu) dan sebuah sekop ritual (sruwa) untuk upacara korban api.",
            en: "The Brahma statue is depicted with four heads (chaturmukha) facing the four cardinal directions, symbolizing his mastery over the four sacred Vedas. He possesses four arms holding holy attributes (lakshana): prayer beads (akshamala) representing time and prayer, and a lotus flower (padma) symbolizing the universe. His other two hands hold a holy water vessel (kamandalu) and a ritual ladle (sruva) used for sacrificial fire ceremonies."
        },
    },
    {
        id: "panel_1",
        name: { id: "Panel Relief 1", en: "Panel Relief 1" },
        pos: new THREE.Vector3(1.108, 0.403, 4.471),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_1.jpg",
        audio: {
            id: "./assets/audio/brahma/panel1_id.mp3",
            en: "./assets/audio/brahma/panel1_en.mp3",
        },
        desc: {
            id: "Rama, Laksamana, Sugriwa, Bagawan Wismamitra, Wibisana, dan pasukan kera tiba di Alengka. Mereka kemudian berunding untuk mengatur strategi dan langkah-langkah yang harus dilakukan.",
            en: "Rama, Laksmana, Sugriva, Wismamitra, Wibisana, and the monkey army arrived at Alengka. They then discussed strategies and steps to be taken.",
        },
    },
    {
        id: "panel_2",
        name: { id: "Panel Relief 2", en: "Panel Relief 2" },
        pos: new THREE.Vector3(0.997, 0.412, 4.618),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_2.jpg",
        audio: {
            id: "./assets/audio/brahma/panel2_id.mp3",
            en: "./assets/audio/brahma/panel2_en.mp3",
        },
        desc: {
            id: "Pasukan kera bersiap-siap dan menunggu perintah dari atasan mereka.",
            en: "The monkey army prepared and waited for instructions from their leader.",
        },
    },
    {
        id: "panel_3",
        name: { id: "Panel Relief 3", en: "Panel Relief 3" },
        pos: new THREE.Vector3(0.919, 0.405, 4.709),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_3.jpg",
        audio: {
            id: "./assets/audio/brahma/panel3_id.mp3",
            en: "./assets/audio/brahma/panel3_en.mp3",
        },
        desc: {
            id: "Anggada, utusan Rama, menghadap Rawana ke istananya untuk meminta kembali Sinta. Permintaannya ditolak; bahkan telinganya dipotong; setelah itu, Rawana menyampaikan surat tantangan.",
            en: "Angada, Rama's envoy, approached Ravana's palace to request Sita's return. His request was denied; his ears were even cut off; after that, Ravana sent a challenge letter.",
        },
    },
    {
        id: "panel_4",
        name: { id: "Panel Relief 4", en: "Panel Relief 4" },
        pos: new THREE.Vector3(0.818, 0.413, 4.812),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_4.jpg",
        audio: {
            id: "./assets/audio/brahma/panel4_id.mp3",
            en: "./assets/audio/brahma/panel4_en.mp3",
        },
        desc: {
            id: "Dengan berlumuran darah, Anggada melaporkan kepada Rama apa yang sebenarnya telah terjadi. Rama merasa sangat terhina. Kemudian dia memerintahkan pasukannya untuk bersiap-siap menggempur Alengka.",
            en: "Covered in blood, Angada reported to Rama what had actually happened. Rama felt deeply humiliated. Then he ordered his army to prepare for the assault on Alengka.",
        },
    },
    {
        id: "panel_5",
        name: { id: "Panel Relief 5", en: "Panel Relief 5" },
        pos: new THREE.Vector3(0.723, 0.405, 4.909),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_5.jpg",
        audio: {
            id: "./assets/audio/brahma/panel5_id.mp3",
            en: "./assets/audio/brahma/panel5_en.mp3",
        },
        desc: {
            id: "Pasukan kera berbaris menuju medan perang.",
            en: "The monkey army lined up and headed to the battlefield.",
        },
    },
    {
        id: "panel_6",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        pos: new THREE.Vector3(0.579, 0.419, 5.006),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_6.jpg",
        audio: {
            id: "./assets/audio/brahma/panel6_id.mp3",
            en: "./assets/audio/brahma/panel6_en.mp3",
        },
        desc: {
            id: "Perang yang sangat dahsyat terjadi. Indrajit, putra mahkota Alengka, memanahkan panah Nagapasa ke arah Rama dan Laksamana dari balik awan yang membuat kedua ksatria tersebut tidak bisa bergerak. Seekor burung garuda membebaskan mereka dengan jalan menelan panah yang berbentuk rantai berkepala naga tersebut. Akhirnya, Indrajit dibunuh oleh Rama.",
            en: "A very fierce battle occurred. Indrajit, the crown prince of Alengka, launched the Nagapasa arrow towards Rama and Laksmana from behind a cloud, preventing the two warriors from moving. A garuda bird freed them by swallowing the chain-shaped arrow with a dragon's head. Finally, Indrajit was killed by Rama.",
        },
    },
    {
        id: "panel_7",
        name: { id: "Panel Relief 7", en: "Panel Relief 7" },
        pos: new THREE.Vector3(0.328, 0.411, 5.013),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_7.jpg",
        audio: {
            id: "./assets/audio/brahma/panel7_id.mp3",
            en: "./assets/audio/brahma/panel7_en.mp3",
        },
        desc: {
            id: "Perang antara Rama dan Laksamana melawan Rawana yang mengendarai kereta bersayap dan bala tentaranya. Di dalam pertempuran ini Rawana terdesak dan meloloskan diri.",
            en: "A battle occurred between Rama and Laksmana against Ravana, who rode a winged chariot, and his army. In this battle, Ravana was pushed back and managed to escape.",
        },
    },
    {
        id: "panel_8",
        name: { id: "Panel Relief 8", en: "Panel Relief 8" },
        pos: new THREE.Vector3(-0.037, 0.409, 5.017),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_8.jpg",
        audio: {
            id: "./assets/audio/brahma/panel8_id.mp3",
            en: "./assets/audio/brahma/panel8_en.mp3",
        },
        desc: {
            id: "Raksasa Kumbakarna, adik Rawana, sedang bertapa dengan cara tidur. Dia dibangunkan oleh beberapa utusan Rawana untuk membantu Rawana berperang melawan Rama, Laksamana, dan bala tentaranya.",
            en: "The rakshasa Kumbakarna, Ravana's brother, was meditating by sleeping. He was awakened by several of Ravana's messengers to help Ravana fight against Rama, Laksmana, and their army.",
        },
    },
    {
        id: "panel_9",
        name: { id: "Panel Relief 9", en: "Panel Relief 9" },
        pos: new THREE.Vector3(-0.302, 0.405, 5.020),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_9.jpg",
        audio: {
            id: "./assets/audio/brahma/panel9_id.mp3",
            en: "./assets/audio/brahma/panel9_en.mp3",
        },
        desc: {
            id: "Pertempuran antara Kumbakarna melawan Rama yang dibantu oleh Laksamana, Sugriwa, dan bala tentara kera, disaksikan oleh Wismamitra dan Wibisana. Kumbakarna mati terbunuh oleh panah Rama dan Laksamana.",
            en: "A battle occurred between Kumbakarna and Rama, who was assisted by Laksmana, Sugriva, and the monkey army, witnessed by Wismamitra and Wibisana. Kumbakarna died from arrows fired by Rama and Laksamana.",
        },
    },
    {
        id: "panel_10",
        name: { id: "Panel Relief 10", en: "Panel Relief 10" },
        pos: new THREE.Vector3(-0.439, 0.399, 4.914),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_10.jpg",
        audio: {
            id: "./assets/audio/brahma/panel10_id.mp3",
            en: "./assets/audio/brahma/panel10_en.mp3",
        },
        desc: {
            id: "Kumbakarna gugur sebagai pahlawan, dan jasadnya ditaburi bunga oleh para pengabdinya.",
            en: "Kumbakarna fell as a hero, and his body was covered with flowers by his servants.",
        },
    },
    {
        id: "panel_11",
        name: { id: "Panel Relief 11", en: "Panel Relief 11" },
        pos: new THREE.Vector3(-0.524, 0.409, 4.828),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_11.jpg",
        audio: {
            id: "./assets/audio/brahma/panel11_id.mp3",
            en: "./assets/audio/brahma/panel11_en.mp3",
        },
        desc: {
            id: "Sinta dan Trijata di taman kerajaan Alengka; mereka mendengar kabar tentang runtuhnya kerajaan Alengka dan kedatangan Rama.",
            en: "Sita and Trijata were in the garden of the Alengka kingdom; they heard news about the fall of the Alengka kingdom and the arrival of Rama.",
        },
    },
    {
        id: "panel_12",
        name: { id: "Panel Relief 12", en: "Panel Relief 12" },
        pos: new THREE.Vector3(-0.639, 0.413, 4.733),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_12.jpg",
        audio: {
            id: "./assets/audio/brahma/panel12_id.mp3",
            en: "./assets/audio/brahma/panel12_en.mp3",
        },
        desc: {
            id: "Rawana yang dianggap sebagai simbol kejahatan akhirnya terbunuh. Mayat Rawana diletakkan di atas keranda kencana, dikerumuni oleh para pengabdinya.",
            en: "Ravana, considered a symbol of evil, was finally killed. Ravana's body was placed on a golden bier, surrounded by his servants.",
        },
    },
    {
        id: "panel_13",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        pos: new THREE.Vector3(-0.719, 0.426, 4.627),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_13.jpg",
        audio: {
            id: "./assets/audio/brahma/panel13_id.mp3",
            en: "./assets/audio/brahma/panel13_en.mp3",
        },
        desc: {
            id: "Setelah runtuhnya kerajaan Alengka, Bagawan Wismamitra dan para pengikutnya sangat gembira karena mereka dapat hidup tenteram dan tidak akan diganggu lagi oleh Rawana dan para raksasa anak buahnya.",
            en: "After the fall of the Alengka kingdom, Sage Wismamitra and his followers were very happy because they could live in peace and would no longer be disturbed by Ravana and his rakshasa servants.",
        },
    },
    {
        id: "panel_14",
        name: { id: "Panel Relief 14", en: "Panel Relief 14" },
        pos: new THREE.Vector3(-0.818, 0.419, 4.492),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_14.jpg",
        audio: {
            id: "./assets/audio/brahma/panel14_id.mp3",
            en: "./assets/audio/brahma/panel14_en.mp3",
        },
        desc: {
            id: "Pertemuan Sinta dan Rama. Wibisana diangkat menjadi Raja Alengka.",
            en: "The meeting of Sita and Rama. Wibisana was appointed as the King of Alengka.",
        },
    },
    {
        id: "panel_15",
        name: { id: "Panel Relief 15", en: "Panel Relief 15" },
        pos: new THREE.Vector3(-0.830, 0.419, 4.264),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_15.jpg",
        audio: {
            id: "./assets/audio/brahma/panel15_id.mp3",
            en: "./assets/audio/brahma/panel15_en.mp3",
        },
        desc: {
            id: "Rama dan Sinta kembali ke Ayodya, ditemani oleh Laksamana. Mereka disambut oleh Barata yang menyerahkan takhta kepada Rama. Kemudian, Rama memerintah Ayodya, dan di bawah kepemimpinannya yang bijaksana membuat negaranya menjadi makmur.",
            en: "Rama and Sita returned to Ayodhya, accompanied by Laksmana. They were welcomed by Bharata, who handed over the throne to Rama. Then, Rama ruled Ayodhya, and under his wise leadership, the country became prosperous.",
        },
    },
    {
        id: "panel_16",
        name: { id: "Panel Relief 16", en: "Panel Relief 16" },
        pos: new THREE.Vector3(-0.832, 0.418, 3.870),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_16.jpg",
        audio: {
            id: "./assets/audio/brahma/panel16_id.mp3",
            en: "./assets/audio/brahma/panel16_en.mp3",
        },
        desc: {
            id: "Sinta sedang mengandung. Mengetahui hal tersebut, Rama menjadi curiga dan sangsi atas kesucian istrinya karena dia telah lama tinggal di istana Alengka. Tanpa memberi tahu Sinta, Laksamana diperintah untuk mengantar Sinta ke tempat pembuangan.",
            en: "Sita was pregnant. Upon learning this, Rama became suspicious and doubted his wife's chastity, as she had been living in the Alengka palace for a long time. Without informing Sita, Laksmana was ordered to take her to a place of exile.",
        },
    },
    {
        id: "panel_17",
        name: { id: "Panel Relief 17", en: "Panel Relief 17" },
        pos: new THREE.Vector3(-0.834, 0.420, 3.629),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_17.jpg",
        audio: {
            id: "./assets/audio/brahma/panel17_id.mp3",
            en: "./assets/audio/brahma/panel17_en.mp3",
        },
        desc: {
            id: "Sinta dan Laksamana pergi ke hutan dengan naik kereta.",
            en: "Sita and Laksmana went to the forest by carriage.",
        },
    },
    {
        id: "panel_18",
        name: { id: "Panel Relief 18", en: "Panel Relief 18" },
        pos: new THREE.Vector3(-0.727, 0.413, 3.482),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_18.jpg",
        audio: {
            id: "./assets/audio/brahma/panel18_id.mp3",
            en: "./assets/audio/brahma/panel18_en.mp3",
        },
        desc: {
            id: "Sesampainya di hutan, Laksamana menceritakan maksud sebenarnya mereka pergi ke hutan. Sinta merasa sangat sedih, tetapi dia tidak dapat berbuat apa-apa kecuali menerima nasib.",
            en: "Upon arriving in the forest, Laksmana explained the true reason they had come to the forest. Sita felt very sad, but she could do nothing except accept her fate.",
        },
    },
    {
        id: "panel_19",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        pos: new THREE.Vector3(-0.643, 0.415, 3.382),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_19.jpg",
        audio: {
            id: "./assets/audio/brahma/panel19_id.mp3",
            en: "./assets/audio/brahma/panel19_en.mp3",
        },
        desc: {
            id: "Setelah Laksamana pulang ke Ayodya, Sinta tinggal di hutan seorang diri. Dia bertemu dengan binatang-binatang buas.",
            en: "After Laksmana returned to Ayodhya, Sita was left alone in the forest. She encountered fierce wild animals.",
        },
    },
    {
        id: "panel_20",
        name: { id: "Panel Relief 20", en: "Panel Relief 20" },
        pos: new THREE.Vector3(-0.540, 0.413, 3.275),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_20.jpg",
        audio: {
            id: "./assets/audio/brahma/panel20_id.mp3",
            en: "./assets/audio/brahma/panel20_en.mp3",
        },
        desc: {
            id: "Sinta mengembara dari tempat yang satu ke tempat yang lain. Akhirnya, dia sampai di pertapaan Empu Walmiki dan tinggal di sana.",
            en: "Sita traveled from place to place. Eventually, she arrived at the hermitage of Sage Valmiki and stayed there.",
        },
    },
    {
        id: "panel_21",
        name: { id: "Panel Relief 21", en: "Panel Relief 21" },
        pos: new THREE.Vector3(-0.452, 0.414, 3.187),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_21.jpg",
        audio: {
            id: "./assets/audio/brahma/panel21_id.mp3",
            en: "./assets/audio/brahma/panel21_en.mp3",
        },
        desc: {
            id: "Sinta melahirkan anak kembar yang diberi nama Kusa dan Lawa.",
            en: "Sita gave birth to twin children named Kusha and Lava.",
        },
    },
    {
        id: "panel_22",
        name: { id: "Panel Relief 22", en: "Panel Relief 22" },
        pos: new THREE.Vector3(-0.314, 0.420, 3.085),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_22.jpg",
        audio: {
            id: "./assets/audio/brahma/panel22_id.mp3",
            en: "./assets/audio/brahma/panel22_en.mp3",
        },
        desc: {
            id: "Berita tentang kelahiran mereka tersebar luas, bidadara dan bidadari datang ke pertapaan Walmiki untuk mengucapkan selamat dan berdoa agar mereka sehat walafiat serta kelak menjadi ksatria agung.",
            en: "News of their birth spread far and wide, and celestial beings came to the hermitage of Valmiki to offer their congratulations and pray for their health and well-being, hoping they would grow up to be great warriors.",
        },
    },
    {
        id: "panel_23",
        name: { id: "Panel Relief 23", en: "Panel Relief 23" },
        pos: new THREE.Vector3(-0.039, 0.421, 3.082),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_23.jpg",
        audio: {
            id: "./assets/audio/brahma/panel23_id.mp3",
            en: "./assets/audio/brahma/panel23_en.mp3",
        },
        desc: {
            id: "Sinta dan putra-putranya pergi ke hutan, mencari sayur-sayuran dan buah-buahan untuk dibawa pulang ke pertapaannya.",
            en: "Sita and her children went to the forest to gather vegetables and fruits to take back to their hermitage.",
        },
    },
    {
        id: "panel_24",
        name: { id: "Panel Relief 24", en: "Panel Relief 24" },
        pos: new THREE.Vector3(0.322, 0.413, 3.079),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_24.jpg",
        audio: {
            id: "./assets/audio/brahma/panel24_id.mp3",
            en: "./assets/audio/brahma/panel24_en.mp3",
        },
        desc: {
            id: "Semenjak mereka beranjak dewasa, Kusa dan Lawa dilatih memanah bersama-sama dengan murid-murid Empu Walmiki.",
            en: "Once they reached adulthood, Kusha and Lava were trained in archery alongside the students of Sage Valmiki.",
        },
    },
    {
        id: "panel_25",
        name: { id: "Panel Relief 25", en: "Panel Relief 25" },
        pos: new THREE.Vector3(0.593, 0.411, 3.075),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_25.jpg",
        audio: {
            id: "./assets/audio/brahma/panel25_id.mp3",
            en: "./assets/audio/brahma/panel25_en.mp3",
        },
        desc: {
            id: "Sinta wafat untuk bersatu dengan Dewi Pertiwi di surga. Kusa dan Lawa diberi nasihat oleh Empu Walmiki untuk mencari ayahnya di istana Ayodya.",
            en: "Sita passed away to unite with Goddess Pertiwi in heaven. Kusha and Lava were given advice by Sage Valmiki to search for their father in the Ayodhya palace.",
        },
    },
    {
        id: "panel_26",
        name: { id: "Panel Relief 26", en: "Panel Relief 26" },
        pos: new THREE.Vector3(0.717, 0.415, 3.174),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_26.jpg",
        audio: {
            id: "./assets/audio/brahma/panel26_id.mp3",
            en: "./assets/audio/brahma/panel26_en.mp3",
        },
        desc: {
            id: "Kusa dan Lawa pergi menuju Ayodya, ditemani oleh Empu Walmiki. Mereka tiba di istana Ayodya dan menyamar sebagai pengamen pada saat Rama sedang merayakan upacara Aswamedya.",
            en: "Kusha and Lava set off towards Ayodhya, accompanied by Sage Valmiki. They arrived at the Ayodhya palace and disguised themselves as wandering minstrels during Rama's Aswamedya ceremony.",
        },
    },
    {
        id: "panel_27",
        name: { id: "Panel Relief 27", en: "Panel Relief 27" },
        pos: new THREE.Vector3(0.811, 0.408, 3.261),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_27.jpg",
        audio: {
            id: "./assets/audio/brahma/panel27_id.mp3",
            en: "./assets/audio/brahma/panel27_en.mp3",
        },
        desc: {
            id: "Kusa dan Lawa menceritakan riwayat Rama yang disusun oleh Empu Walmiki. Rama menjadi heran mendengar tentang riwayat hidupnya dari mereka; kemudian, menanyakan dari mana sumbernya.",
            en: "Kusha and Lava recounted the history of Rama, as compiled by Sage Valmiki. Rama was puzzled to hear about his own life story from them; he then inquired about the source of this information.",
        },
    },
    {
        id: "panel_28",
        name: { id: "Panel Relief 28", en: "Panel Relief 28" },
        pos: new THREE.Vector3(0.917, 0.413, 3.364),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_28.jpg",
        audio: {
            id: "./assets/audio/brahma/panel28_id.mp3",
            en: "./assets/audio/brahma/panel28_en.mp3",
        },
        desc: {
            id: "Rama meminta Sinta membuat sumpah tentang kesetiaannya di hadapan dewan resi dan bangsawan, dan mengirim utusan kepada Walmiki untuk meminta izinnya. Hari berikutnya Walmiki membawa Sinta ke dewan untuk membuat pernyataannya, dan untuk memastikan bahwa putra-putra itu adalah anak Rama. Sinta memanggil dewi bumi untuk menerimanya, dan ia turun kembali ke bumi.",
            en: "Rama asked that Sita make an oath regarding her fidelity in front of a court of sages and royals, and sent a messenger to Valmiki to ask his permission. On the following day Valmiki brought Sita to the court to make her assertion, and to confirm the sons were his. Sita called on the earth goddess to accept her, and she descended back into the earth.",
        },
    },
    {
        id: "panel_29",
        name: { id: "Panel Relief 29", en: "Panel Relief 29" },
        pos: new THREE.Vector3(1.005, 0.411, 3.460),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_29.jpg",
        audio: {
            id: "./assets/audio/brahma/panel29_id.mp3",
            en: "./assets/audio/brahma/panel29_en.mp3",
        },
        desc: {
            id: "Setelah bertahun-tahun memerintah dengan adil, Rama didatangi Dewa Kematian (Kala) yang memberi tahu bahwa sudah saatnya kembali kepada para dewa di surga. Rama ingin salah satu saudaranya memerintah setelahnya, tetapi Resi Wasista mendesaknya untuk mengangkat putra-putranya. Karenanya, Kusa diberi Kosala selatan, dan Lawa diberi Kosala utara, dan mereka memerintah bersama dari Ayodya.",
            en: "After many years of just rule, Rama was visited by the God of Death (Kala), who informed him it was time to return to the gods in heaven. Rama wanted one of his brothers to reign after him, but the sage Vashistha urged him to appoint his sons to the throne. Therefore, Kusha was given southern Kosala, and Lava northern Kosala, and they reigned together from Ayodhya.",
        },
    },
    {
        id: "panel_30",
        name: { id: "Panel Relief 30", en: "Panel Relief 30" },
        pos: new THREE.Vector3(1.097, 0.417, 3.634),
        radius: 0.35,
        img: "./assets/poi/brahma/panel_30.jpg",
        audio: {
            id: "./assets/audio/brahma/panel30_id.mp3",
            en: "./assets/audio/brahma/panel30_en.mp3",
        },
        desc: {
            id: "Ramayana Walmiki berakhir dengan Rama memasuki alam surga (svargaloka) lagi, bersama saudara-saudaranya dan banyak pahlawan lain dari cerita ini, dan bersama manusia dan hewan dari Ayodya. Mereka disambut para dewa, yang akan memerintah dunia dari sana.",
            en: "The Ramayana of Valmiki ended with Rama entering the heaven realm (svargaloka) again, along with his brothers and many of the other heroes from the story, and together with humans and animals from Ayodhya. They were greeted by the gods, who would rule over the worlds from there.",
        },
    },
    ],
    wisnu: [
    {
        id: "wisnu",
        name: { id: "Wisnu", en: "Vishnu" },
        dir: { id: "Bilik Utama", en: "Main Chamber" },
        pos: new THREE.Vector3(0.140, 0.837, -4.002),
        radius: 0.35,
        img: "./assets/poi/wisnu/wisnu.JPG",
        audio: {
            id: "./assets/audio/wisnu/wisnu_id.mp3",
            en: "./assets/audio/wisnu/wisnu_en.mp3",
        },
        desc: {
            id: "Dewa Wisnu digambarkan sebagai dewa pemelihara alam semesta yang mengenakan mahkota keagungan kiritamakuta. Ia memiliki empat lengan yang memegang atribut utama: sebuah senjata cakra (senjata cakram berputar) di tangan kanan atas, dan kulit kerang suci (sangka) di tangan kiri atas yang melambangkan suara penciptaan. Tangan kiri bawahnya bersandar pada sebuah gada (senjata pemukul) bernama Kaumodaki, dan tangan kanan bawahnya memegang buah atau kuncup teratai.",
            en: "The Vishnu statue is depicted as the preserver of the universe, wearing the majestic kiritamakuta crown. He has four arms holding his primary attributes: a chakra (spinning discus) in his upper right hand, and a sacred conch shell (shanka) in his upper left hand representing the sound of creation. His lower left hand rests on a mace (gada) named Kaumodaki, and his lower right hand holds a fruit or lotus bud."
        },
    },
    {
        id: "panel_1",
        name: { id: "Panel Relief 1", en: "Panel Relief 1" },
        pos: new THREE.Vector3(1.105, 0.395, -3.644),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_1.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel1_id.mp3",
            en: "./assets/audio/wisnu/panel1_en.mp3",
        },
        desc: {
            id: "Raja Ugrasena yang baik dan ratunya, Padmawati, pernah memerintah di Mathura, tetapi digulingkan oleh putranya yang jahat, Kamsa, yang merupakan satu dari banyak penguasa zalim di India pada masa itu. Raja yang terdahulu juga memiliki seorang putri, Dewaki, yang baik, sementara Kamsa jahat, dan Dewaki menikah dengan Wasudewa.",
            en: "The good king Ugrasena and his queen Padmavati had once ruled at Mathura, but had been overthrown by his wicked son Kamsa, who was one of many bad rulers in India at that time. The previous king also had a daughter, Devaki, who was as good as Kamsa was bad, and she had married Vasudeva.",
        },
    },
    {
        id: "panel_2",
        name: { id: "Panel Relief 2", en: "Panel Relief 2" },
        pos: new THREE.Vector3(0.991, 0.392, -3.427),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_2.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel2_id.mp3",
            en: "./assets/audio/wisnu/panel2_en.mp3",
        },
        desc: {
            id: "Ketika Dewaki berusia enam belas tahun, ia diserahkan kepada Wasudewa sebagai istri. Dalam perjalanan ke pernikahan, Raja Kamsa mengemudikan kereta sebagai tanda sayang kepada saudarinya. Saat mereka bepergian, langit berubah gelap dan ada suara menyatakan bahwa Kamsa akan dibunuh oleh anak kedelapan Dewaki.",
            en: "When Devaki was sixteen she was given as wife to Vasudeva. On the way to the wedding, King Kamsa drove the chariot, as a sign of his love for his sister. As they were going along, the sky became cloudy and a voice declared that Kamsa would be killed by Devaki’s eighth child.",
        },
    },
    {
        id: "panel_3",
        name: { id: "Panel Relief 3", en: "Panel Relief 3" },
        pos: new THREE.Vector3(0.909, 0.387, -3.340),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_3.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel3_id.mp3",
            en: "./assets/audio/wisnu/panel3_en.mp3",
        },
        desc: {
            id: "Ketika ia mendengar ramalan itu, gagasan awal Raja Kamsa adalah membunuh saudarinya untuk mencegah ramalan menjadi kenyataan, tetapi Wasudewa membujuk sebaliknya dengan mengatakan kepadanya bahwa ia akan membawa setiap anaknya kepada raja saat lahir, sehingga raja bisa mengenyahkan mereka seperti yang diinginkannya.",
            en: "When he heard the prediction, King Kamsa’s initial idea was to kill his sister to prevent the prophecy coming true, but Vasudeva persuaded him otherwise by telling him he would bring each of his children to the king at birth, so he could dispose of them as he wished.",
        },
    },
    {
        id: "panel_4",
        name: { id: "Panel Relief 4", en: "Panel Relief 4" },
        pos: new THREE.Vector3(0.813, 0.393, -3.241),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_4.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel4_id.mp3",
            en: "./assets/audio/wisnu/panel4_en.mp3",
        },
        desc: {
            id: "Dewaki punya enam anak dan akhirnya Kamsa memutuskan untuk membunuh mereka semua. Ia juga mengurung pasangan itu di ruang bawah tanah. Anak ketujuh, Balarama, dibawa pergi oleh dewa-dewa, dan dipindahkan ke dalam rahim Rohini, istri pertama Wasudewa. Wisnu lalu mengambil wujud sebagai Krisna dan memasuki rahim Dewaki, tetapi ditukar dengan anak perempuan yang lahir dari Yasoda, istri Nanda, gembala sapi.",
            en: "Devaki had six children and Kamsa eventually decided to kill them all. He also locked the couple up in a dungeon. The seventh child, Balarama, was whisked away by the gods and transplanted into the womb of Rohini, Vasudeva’s first wife. Vishnu then took form as Krishna and entered Devaki’s womb, but was swapped with a female child born to Yashoda, wife of Nanda, the cowherd.",
        },
    },
    {
        id: "panel_5",
        name: { id: "Panel Relief 5", en: "Panel Relief 5" },
        pos: new THREE.Vector3(0.729, 0.393, -3.143),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_5.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel5_id.mp3",
            en: "./assets/audio/wisnu/panel5_en.mp3",
        },
        desc: {
            id: "Krisna tumbuh di rumah tangga Nanda dan tingkahnya yang lucu cukup menyusahkan orangtua angkatnya, walaupun ia masih kanak-kanak. Suatu hari, untuk mengekangnya mereka mengikatnya ke lesung batu besar, tetapi Krisna begitu kuat, ia menyeret batu itu begitu saja ke mana-mana bersamanya dan menumbangkan dua pohon, yang memperoleh kembali wujud dewa mereka. Mendengar keributan itu, Nanda dan Yasoda datang untuk mencari anak itu.",
            en: "Krishna grew up in Nanda’s household and his playful ways were quite a lot of trouble to his foster parents, even though he was just a toddler. One day, to restrain him they tied him to a large stone mortar, but he was so strong he simply dragged it around with him and brought down two trees, who regained their divine forms. Hearing the commotion Nanda and Yashoda came to find the child.",
        },
    },
    {
        id: "panel_6",
        name: { id: "Panel Relief 6", en: "Panel Relief 6" },
        pos: new THREE.Vector3(0.591, 0.394, -3.052),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_6.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel6_id.mp3",
            en: "./assets/audio/wisnu/panel6_en.mp3",
        },
        desc: {
            id: "Kamsa hidup dalam ketakutan, dan tak puas dengan membunuh saudara-saudara Krisna, ia ingin membunuh semua anak di kerajaannya. Untuk alasan itu, ia mengerahkan Raksasi Putana yang menyamar sebagai ibu susu dan telah meletakkan racun di payudaranya untuk membunuh bayi-bayi yang menyusu di sana. Ia juga mencoba meracuni Krisna dengan cara yang sama, tetapi Krisna menyusu begitu keras di dadanya sampai ia pingsan, dan kembali pada wujud raksasanya sebelum mati.",
            en: "Kamsa lived in fear, and not satisfied with killing Krishna’s brothers, he wanted to kill all the children in his kingdom. For that reason, he employed the rakshasi Putana who posed as a wet nurse and had placed poison on her breasts to kill the infants suckling there. She also tried to poison Krishna in the same way, but he sucked so hard on her breast she passed out, and reassumed her demonic form before dying.",
        },
    },
    {
        id: "panel_7",
        name: { id: "Panel Relief 7", en: "Panel Relief 7" },
        pos: new THREE.Vector3(0.335, 0.394, -3.046),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_7.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel7_id.mp3",
            en: "./assets/audio/wisnu/panel7_en.mp3",
        },
        desc: {
            id: "Setelah beberapa lama, percaya bahwa tempat yang mereka tinggali tidak menguntungkan, penduduk memutuskan untuk pindah ke Vrindavana, yang digambarkan sebagai hutan yang menakjubkan tak jauh dari Mathura. Krisna menimbulkan banyak masalah bagi masyarakat di sana, dan terutama bagi ibunya. Ia selalu saja membuat masalah. Salah satu kegemaran utamanya adalah susu dan mentega, dan ia akan melepaskan anak sapi lalu menyusu langsung pada sapi sampai kenyang.",
            en: "After some time, believing that the place they were in was inauspicious, the community decided to move to Vrindavana, which is described as a wonderful forest not far from Mathura. There Krishna was an awful lot of trouble to his community, and to his mother especially. He could always be counted on for getting into trouble. One of his main delights was milk and butter and he would detach calves and attach himself to the cows so as to drink to his fill.",
        },
    },
    {
        id: "panel_8",
        name: { id: "Panel Relief 8", en: "Panel Relief 8" },
        pos: new THREE.Vector3(-0.030, 0.393, -3.034),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_8.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel8_id.mp3",
            en: "./assets/audio/wisnu/panel8_en.mp3",
        },
        desc: {
            id: "Kamsa masih memburu anak yang akan menjadi musuh bebuyutannya, dan mengirim banyak pembunuh dalam berbagai wujud untuk mencoba membunuh Krisna, termasuk Agha, saudara Putana, dalam wujud piton besar; Kaliya, dalam wujud naga beracun; dan Dhenuka, yang berwujud keledai. Krisna membunuh ataupun mengusir mereka semua.",
            en: "Kamsa was still pursuing the boy who would be his nemesis, and sent many assassins in various forms to try and kill Krishna, including Agha, Putana’s brother, in the shape of a large python; Kaliya, in the form of a poisonous dragon; and Dhenuka, who had the form of a donkey. Krishna either killed or banished them all.",
        },
    },
    {
        id: "panel_9",
        name: { id: "Panel Relief 9", en: "Panel Relief 9" },
        pos: new THREE.Vector3(-0.299, 0.392, -3.032),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_9.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel9_id.mp3",
            en: "./assets/audio/wisnu/panel9_en.mp3",
        },
        desc: {
            id: "Masih banyak yang bersedia mencoba mengalahkan Krisna, yang mereka pikir akan mudah diatasi. Salah satu asura, yang bernama Arishta, mengubah wujudnya menjadi banteng dan berusaha menerjang Krisna; asura lain yang bernama Keshi mengambil wujud kuda, dan mengalami nasib yang sama.",
            en: "There were still many who were willing to try and defeat Krishna, who they thought would be easy to overcome. One of the asuras, named Arishta, changed his form into a bull and tried to run Krishna down; another asura called Keshi took the form of a horse, and suffered a similar fate.",
        },
    },
    {
        id: "panel_10",
        name: { id: "Panel Relief 10", en: "Panel Relief 10" },
        pos: new THREE.Vector3(-0.429, 0.391, -3.132),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_10.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel10_id.mp3",
            en: "./assets/audio/wisnu/panel10_en.mp3",
        },
        desc: {
            id: "Lebih banyak lagi asura yang ingin mencoba peruntungan mereka melawan Krisna. Salah satunya, Vyoma, mengubah dirinya menjadi gembala sapi (gopa) sehingga ia bisa tak terlihat di antara para gembala. Akan tetapi, Krisna bisa mengenali asura itu sekalipun dalam penyamarannya, dan berhasil membunuhnya dan membebaskan anak-anak yang ia tangkap.",
            en: "Still more asuras wanted to try their luck against Krishna. One of them, Vyoma, changed himself into a cowherd (gopa) so that he could go unseen amongst the herders. Krishna, however, could recognise the asura despite his disguise, and managed to kill him and release the boys he had captured.",
        },
    },
    {
        id: "panel_11",
        name: { id: "Panel Relief 11", en: "Panel Relief 11" },
        pos: new THREE.Vector3(-0.525, 0.386, -3.222),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_11.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel11_id.mp3",
            en: "./assets/audio/wisnu/panel11_en.mp3",
        },
        desc: {
            id: "Dalam Bagawata Purana, pada titik ini Kamsa mengutus Akrura untuk mengundang kedua bersaudara itu ke ibu kota, dan tak ada lagi pertarungan dengan para asura atau siluman lain yang tercatat. Tetapi, cerita yang diikuti di sini sepertinya mengetahui pertarungan lain.",
            en: "In the Bhagavata Purana at this point Kamsa sends Akrura to invite the brothers to the capital, where he intends to kill them, and no more fights with asuras or other rakshasas are recorded. The story followed here, however, seems to know of other battles.",
        },
    },
    {
        id: "panel_12",
        name: { id: "Panel Relief 12", en: "Panel Relief 12" },
        pos: new THREE.Vector3(-0.626, 0.387, -3.321),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_12.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel12_id.mp3",
            en: "./assets/audio/wisnu/panel12_en.mp3",
        },
        desc: {
            id: "Kamsa sekarang memutuskan cara terbaik membunuh Krisna adalah dengan membujuk Krisna ke ibu kotanya, dan mengatur kematiannya di sana. Akrura, sepupu Krisna, adalah suruhan Kamsa, dan ia memerintahkan Akrura untuk pergi ke Vrindavana dan mengundang anak-anak itu ke perayaan di kota.",
            en: "Kamsa now decided the best way to kill Krishna would be to lure him to his capital, and arrange for his death there. Akrura, the boy’s cousin, was in Kamsa’s service, and he ordered him to go to Vrindavana and invite the boys to a festival at the city.",
        },
    },
    {
        id: "panel_13",
        name: { id: "Panel Relief 13", en: "Panel Relief 13" },
        pos: new THREE.Vector3(-0.719, 0.392, -3.416),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_13.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel13_id.mp3",
            en: "./assets/audio/wisnu/panel13_en.mp3",
        },
        desc: {
            id: "Raja Kamsa menyelenggarakan pertandingan gulat, sehingga ia bisa mengalahkan kedua bersaudara itu. Kamsa memasang perangkap bagi anak-anak itu dengan mengatur pertandingan mereka melawan pegulat terbesar dan terkuat saat itu. Ia juga memerintahkan pawang membiarkan gajah istana, Kuvalayapida, menyerang saat mereka masuk, tetapi Krisna membunuh gajah serta pawangnya. Kemudian mereka memasuki gelanggang dan bertanding melawan lawan-lawan mereka.",
            en: "King Kamsa had organised a wrestling contest, so he could defeat the brothers. Kamsa set a trap for the boys by setting their fights up against the biggest and strongest wrestlers of the day. He also instructed a mahout to let the state elephant Kuvalayapida attack them as they entered, but Krishna killed both the elephant and the mahout. Then they entered the arena and fought against their opponents.",
        },
    },
    {
        id: "panel_14",
        name: { id: "Panel Relief 14", en: "Panel Relief 14" },
        pos: new THREE.Vector3(-0.810, 0.397, -3.547),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_14.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel14_id.mp3",
            en: "./assets/audio/wisnu/panel14_en.mp3",
        },
        desc: {
            id: "Setelah para pegulat dikalahkan, Raja Kamsa sendiri ingin mencoba mengalahkan Krisna, tetapi ia diseret dari singgasananya dan dipukuli sampai mati di gelanggang, seperti halnya para pegulat lain. Begitu juga dengan para saudaranya yang berusaha membalaskan dendamnya.",
            en: "After the wrestlers had been defeated, King Kamsa himself wanted to try and beat Krishna, but he was dragged from his throne and beaten to death in the ring, just as the wrestlers had been. And so were his brothers who tried to avenge him.",
        },
    },
    {
        id: "panel_15",
        name: { id: "Panel Relief 15", en: "Panel Relief 15" },
        pos: new THREE.Vector3(-0.814, 0.395, -3.820),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_15.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel15_id.mp3",
            en: "./assets/audio/wisnu/panel15_en.mp3",
        },
        desc: {
            id: "Sayangnya sosok-sosok utama sudah rusak parah pada relief ini. Itu jelas pasangan kerajaan yang duduk dengan nyaman di singgasana. Sosok lelaki pasti Krisna, karena ia ditandai dengan lingkaran cahaya. Di kanan ada bangunan yang sangat rumit, mungkin sebuah istana.",
            en: "Unfortunately the central characters have been badly disfigured on this relief. It is clearly a royal couple sitting at ease on the throne. The male figure must be Krishna, as he is marked by the halo. On the right is a very elaborate building, presumably a palace.",
        },
    },
    {
        id: "panel_16",
        name: { id: "Panel Relief 16", en: "Panel Relief 16" },
        pos: new THREE.Vector3(-0.827, 0.392, -4.164),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_16.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel16_id.mp3",
            en: "./assets/audio/wisnu/panel16_en.mp3",
        },
        desc: {
            id: "Panel dan kepala pangeran rusak. Raja dan ratu punya lingkaran cahaya di belakang kepala mereka, jadi jelas bahwa mereka bukan hanya bangsawan tetapi juga orang suci. Diduga mereka adalah Krisna dan Rukmini, salah satu ratunya. Di kiri terlihat apa yang seperti tiga pedagang mendekati singgasana, dua di antaranya memegang kerang sangkakala.",
            en: "The panel and the prince's head are damaged. The king and queen have halos behind their heads, so it is clear that they are not just nobles but also saints. They are believed to be Krishna and Rukmini, one of his queens. On the left, three merchants approaching the throne can be seen, two of them holding conch shells.",
        },
    },
    {
        id: "panel_17",
        name: { id: "Panel Relief 17", en: "Panel Relief 17" },
        pos: new THREE.Vector3(-0.831, 0.399, -4.424),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_17.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel17_id.mp3",
            en: "./assets/audio/wisnu/panel17_en.mp3",
        },
        desc: {
            id: "Di sebelah kiri duduk Krisna, ditandai dengan lingkaran cahaya. Di depannya seorang petapa berbalik dan tampak siap lari. Di bawah kakinya ada ular yang terlihat siap menyerang.",
            en: "On the left sits Krishna, marked by the halo. In front of him an ascetic turns away and appears ready to run. Beneath his feet is a snake who looks ready to strike.",
        },
    },
    {
        id: "panel_18",
        name: { id: "Panel Relief 18", en: "Panel Relief 18" },
        pos: new THREE.Vector3(-0.750, 0.390, -4.568),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_18.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel18_id.mp3",
            en: "./assets/audio/wisnu/panel18_en.mp3",
        },
        desc: {
            id: "Sayangnya, sisi kiri relief ini hilang, jadi kita tak tahu pasti siapa yang mungkin berdiri atau duduk di sana. Apa yang kita lihat di kanan adalah petapa berjanggut membawa bunga teratai dan pergi menjauh dari apa yang dapat kita anggap sosok lain, mungkin Krisna sendiri.",
            en: "Unfortunately, the left hand side of this relief is missing, so we don’t know for sure who may have been standing or sitting there. What we see on the right is a bearded ascetic carrying a lotus flower and heading away from what we can presume was another character, maybe Krishna himself.",
        },
    },
    {
        id: "panel_19",
        name: { id: "Panel Relief 19", en: "Panel Relief 19" },
        pos: new THREE.Vector3(-0.650, 0.391, -4.668),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_19.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel19_id.mp3",
            en: "./assets/audio/wisnu/panel19_en.mp3",
        },
        desc: {
            id: "Sisi kiri relief ini hilang, dan tidak jelas apakah ada sosok lain ditempatkan di sana. Apa yang bisa kita lihat adalah Krisna duduk di singgasana, dengan pria yang lebih tua, mungkin seorang raja, atau raja sebelumnya, di sampingnya.",
            en: "Again, the left hand side of this relief is missing, and it is unclear whether there was a further character placed there. What we do see is Krishna on the throne, with an older man, presumably a king, or a previous king, next to him.",
        },
    },
    {
        id: "panel_20",
        name: { id: "Panel Relief 20", en: "Panel Relief 20" },
        pos: new THREE.Vector3(-0.548, 0.394, -4.761),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_20.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel20_id.mp3",
            en: "./assets/audio/wisnu/panel20_en.mp3",
        },
        desc: {
            id: "Tiga sosok yang terlihat seperti yaksha, masing-masing dengan postur yang berbeda, duduk di atas pemandangan berair. Tidak cukup jelas apakah mereka melayang di atas air, atau di tepi air. Juga tidak jelas apakah itu sungai atau samudra. Tetapi, kita melihat ikan besar melompat-lompat di air.",
            en: "Three characters that look like yakshas, each of them holding different postures, are sitting above a watery scene. It is not quite clear if they are hovering above the water, or on the water’s edge. Again, we cannot understand whether it is a river or an ocean. We do, however, see large fish jumping around in the water.",
        },
    },
    {
        id: "panel_21",
        name: { id: "Panel Relief 21", en: "Panel Relief 21" },
        pos: new THREE.Vector3(-0.460, 0.398, -4.866),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_21.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel21_id.mp3",
            en: "./assets/audio/wisnu/panel21_en.mp3",
        },
        desc: {
            id: "Kejadian ini berlangsung lagi di perairan. Sosok di kiri, yang terlihat seperti yaksha, memegang payung kerajaan di tangan kirinya. Krisna di kanan tampak seperti melindungi diri dari serangan. Di air kita melihat lagi ikan besar, mungkin menunggu untuk menyantap yang kalah.",
            en: "The action again takes place at the waters. The character on the left, who looks like a yaksha, is holding a royal parasol in his left hand. Krishna is on the right, and appears to be protecting himself against attack. In the waters we again see large fish, maybe waiting to feast on the loser.",
        },
    },
    {
        id: "panel_22",
        name: { id: "Panel Relief 22", en: "Panel Relief 22" },
        pos: new THREE.Vector3(-0.320, 0.395, -4.971),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_22.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel22_id.mp3",
            en: "./assets/audio/wisnu/panel22_en.mp3",
        },
        desc: {
            id: "Di kanan Krisna duduk, dan yang mungkin adalah Rukmini. Krisna membuka telapaknya menghadap para pengunjungnya yang melambangkan kemurahan hati. Tepat di depan mereka duduk dua bangsawan, keduanya lelaki.",
            en: "On the right sit Krishna, and what is probably Rukmini. Krishna has his open palm facing his visitors which signifies munificence. Immediately in front of them sit two members of the nobility, both of them male.",
        },
    },
    {
        id: "panel_23",
        name: { id: "Panel Relief 23", en: "Panel Relief 23" },
        pos: new THREE.Vector3(-0.050, 0.400, -4.965),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_23.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel23_id.mp3",
            en: "./assets/audio/wisnu/panel23_en.mp3",
        },
        desc: {
            id: "Di kiri, sosok yang tampak jahat memegang gada dan menyerang Krisna, yang berada di tengah relief. Ia menangkis pukulan itu sementara di belakangnya sosok lain yang agak tergerus, kelihatannya melarikan diri.",
            en: "On the left a malicious-looking character is wielding a club and is attacking Krishna, who is in the centre of the relief. He is fending off the blow, while behind him another character, somewhat worn-down, appears to be fleeing.",
        },
    },
    {
        id: "panel_24",
        name: { id: "Panel Relief 24", en: "Panel Relief 24" },
        pos: new THREE.Vector3(0.319, 0.398, -4.974),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_24.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel24_id.mp3",
            en: "./assets/audio/wisnu/panel24_en.mp3",
        },
        desc: {
            id: "Krisna duduk akrab dengan seorang sesepuh di tengah relief. Ada enam sosok raja serupa di sekeliling mereka, semuanya berjanggut, kecuali Krisna.",
            en: "Krishna is sitting intimately with an elder in the centre of the relief. There are six other similar kingly figures around them, all of them are bearded, except for Krishna.",
        },
    },
    {
        id: "panel_25",
        name: { id: "Panel Relief 25", en: "Panel Relief 25" },
        pos: new THREE.Vector3(0.579, 0.396, -4.980),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_25.png",
        audio: {
            id: "./assets/audio/wisnu/panel25_id.mp3",
            en: "./assets/audio/wisnu/panel25_en.mp3",
        },
        desc: {
            id: "Krisna, ditandai dengan lingkaran cahaya, duduk di luar bangunan di kanan, dengan dua pelayan di belakangnya. Di kiri ada dua anggota kerajaan yang berkunjung. Ada sosok yang berdiri di tengah yang sepertinya sedang membuat persembahan kepada pengunjung.",
            en: "Krishna, marked by the halo, sits outside a building on the right, with two attendants behind him. On the left are two visiting members of the royalty. There is a standing character in the middle who appears to be making an offering to the visitors.",
        },
    },
    {
        id: "panel_26",
        name: { id: "Panel Relief 26", en: "Panel Relief 26" },
        pos: new THREE.Vector3(0.695, 0.397, -4.883),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_26.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel26_id.mp3",
            en: "./assets/audio/wisnu/panel26_en.mp3",
        },
        desc: {
            id: "Kita cukup dapat melihat untuk mengetahui itu pastilah Krisna yang di dalam kereta, dan lingkaran cahayanya ditandai dengan jelas. Kusirnya duduk dengan agak janggal di pinggir kursi pengemudi, ia dan kudanya tampak sangat ekspresif.",
            en: "We can see enough to know it must be Krishna in the chariot, and his halo is clearly marked. The charioteer sits a little awkwardly on the edge of the driving seat; he and the horse have a lot of character.",
        },
    },
    {
        id: "panel_27",
        name: { id: "Panel Relief 27", en: "Panel Relief 27" },
        pos: new THREE.Vector3(0.800, 0.391, -4.790),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_27.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel27_id.mp3",
            en: "./assets/audio/wisnu/panel27_en.mp3",
        },
        desc: {
            id: "Ada pepohonan dan burung di sekitar. Krisna duduk di kiri dan mengisyaratkan, meski tidak jelas apakah ia sedang bicara atau mendengarkan. Di kanan duduk seorang resi, yang memiliki tasbih Rudraksha di lehernya, menandakan ia pengikut Siwa.",
            en: "There are trees and birds around. Krishna is sitting on the left and is gesticulating, though whether because he is speaking, or listening is not clear. On the right sits a sage, who has Rudraksha beads around his neck, signalling he is a follower of Shiva.",
        },
    },
    {
        id: "panel_28",
        name: { id: "Panel Relief 28", en: "Panel Relief 28" },
        pos: new THREE.Vector3(0.904, 0.389, -4.683),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_28.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel28_id.mp3",
            en: "./assets/audio/wisnu/panel28_en.mp3",
        },
        desc: {
            id: "Dua tokoh di kiri itu kemungkinan Krisna dan Balarama, tetapi ini tidak pasti. Mereka jelas sedang melawan apa yang terlihat seperti yaksha, yang memiliki tengkorak di tata rambutnya. Satu dari kedua bersaudara itu menginjak punggung yaksha itu, sementara yang lain menarik pakaiannya.",
            en: "Two figures on the left are likely Krishna and Balarama, but this is not certain. They are evidently fighting off what looks like a yaksha, who has a skull in his coiffure. One of the brothers has his foot on the yaksha’s back, while the other pulls on his clothes.",
        },
    },
    {
        id: "panel_29",
        name: { id: "Panel Relief 29", en: "Panel Relief 29" },
        pos: new THREE.Vector3(0.999, 0.397, -4.588),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_29.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel29_id.mp3",
            en: "./assets/audio/wisnu/panel29_en.mp3",
        },
        desc: {
            id: "Krisna berada di kiri, menarik busurnya, dan menembak ke sosok yang terjatuh di kanan. Tetapi kita tak melihat panahnya. Di atas sosok yang terjatuh, kita melihat sosok lain berdiri dengan pedang dan perisai. Dari rambut dan mulut mereka yang terbuka, tampaknya mereka raksasa.",
            en: "Krishna is on the left and has his bow drawn and is shooting at the fallen character on the right. We do not see an arrow though. Above the fallen character, we see another standing with sword and shield. By their hair and open mouths, they appear to be rakshasas.",
        },
    },
    {
        id: "panel_30",
        name: { id: "Panel Relief 30", en: "Panel Relief 30" },
        pos: new THREE.Vector3(1.101, 0.394, -4.430),
        radius: 0.35,
        img: "./assets/poi/wisnu/panel_30.jpg",
        audio: {
            id: "./assets/audio/wisnu/panel30_id.mp3",
            en: "./assets/audio/wisnu/panel30_en.mp3",
        },
        desc: {
            id: "Krisna biasanya digambarkan dengan lingkaran cahaya, tetapi tak satu pun dari empat tokoh yang mungkin adalah dirinya dalam relief ini memiliki lingkaran itu, jadi ini tidak pasti. Jika ia digambarkan di sini, ia pasti yang berada di samping dan bicara kepada raja di kanan jauh. Sayangnya, bagian relief ini cukup rusak, dan kita tak dapat melihat raut wajahnya dengan jelas. Di kiri adalah para pelayan, termasuk satu yang menunggang kuda.",
            en: "Krishna is usually depicted with a halo of light, but none of the four figures that might be him in this relief have such a halo, so this is uncertain. If he is pictured here, he must be the one set aside and talking to the king on the far right. Unfortunately, this part of the relief is quite damaged, and we cannot see the expression clearly. On the left are the attendants, including one who is mounted on a horse.",
        },
    },
    ],
    garuda: [
    {
        id: "garuda",
        name: { id: "Candi Garuda", en: "Garuda Temple" },
        dir: { id: "Barat (Menghadap Candi Wisnu)", en: "West (Facing Vishnu Temple)" },
        pos: new THREE.Vector3(4.932, 0.512, -3.970),
        radius: 0.35,
        img: "./assets/poi/garuda/garuda.JPG",
        audio: {
            id: "./assets/audio/garuda/garuda_id.mp3",
            en: "./assets/audio/garuda/garuda_en.mp3",
        },
        desc: {
            id: "Candi ini dipersembahkan untuk Garuda, makhluk mitologi berwujud manusia setengah elang yang merupakan wahana Dewa Wisnu. Saat ini bilik di dalam candi dalam keadaan kosong tanpa arca utama. Arkeolog memperkirakan arca Garuda asli pernah bertakhta di sini sebelum runtuh. Kisah Garuda sendiri sangat dihormati di Nusantara sebagai lambang pembebasan dan kini diabadikan sebagai lambang negara Indonesia.",
            en: "This temple is dedicated to Garuda, the mythical human-eagle creature who serves as Lord Vishnu's vehicle. Currently, the inner chamber is empty. Archaeologists believe a Garuda statue originally resided here before the temple collapsed. Garuda's legend is highly revered in Indonesia as a symbol of liberation and serves as the country's national emblem."
        },
    },
    ],
    nandi: [
    {
        id: "nandi",
        name: { id: "Nandi", en: "Nandi" },
        dir: { id: "Barat (Menghadap Candi Siwa)", en: "West (Facing Shiva Temple)" },
        pos: new THREE.Vector3(4.890, 0.437, 0.045),
        radius: 0.35,
        img: "./assets/poi/nandi/nandi.JPG",
        audio: {
            id: "./assets/audio/nandi/nandi_id.mp3",
            en: "./assets/audio/nandi/nandi_en.mp3",
        },
        desc: {
            id: "Candi Wahana terbesar yang di dalamnya menyimpan Arca Lembu Nandi, lembu suci tunggangan Dewa Siwa. Arca Nandi digambarkan dalam posisi berbaring santai. Uniknya, di bilik ini Nandi tidak sendiri; ia diapit oleh dua arca dewa kosmis pada dinding belakangnya, yaitu Arca Dewa Surya (Dewa Matahari) di sebelah kiri dan Arca Dewa Candra (Dewa Bulan) di sebelah kanan.",
            en: "The largest Wahana temple housing the statue of Nandi, the sacred bull and vehicle of Lord Shiva, depicted in a relaxed reclining posture. Uniquely, the chamber also features two cosmic deities on the back wall: Lord Surya (the Sun God) on the left and Lord Chandra (the Moon God) on the right."
        },
    },
    {
        id: "surya",
        name: { id: "Dewa Surya", en: "Lord Surya" },
        dir: { id: "Dinding Belakang Sisi Kiri", en: "Left Side Back Wall" },
        pos: new THREE.Vector3(4.904, 0.564, -0.126),
        radius: 0.35,
        img: "./assets/poi/nandi/surya nandi.JPG",
        audio: {
            id: "./assets/audio/nandi/surya_id.mp3",
            en: "./assets/audio/nandi/surya_en.mp3",
        },
        desc: {
            id: "Dewa Matahari (Surya) yang dipahatkan di dinding belakang sebelah kiri bilik Candi Nandi. Digambarkan berdiri di atas kereta yang ditarik oleh tujuh ekor kuda, memegang teratai (padma) di kedua tangannya, serta mengenakan atribut kerajaan lengkap dengan mahkota tinggi (kirita-makuta) dan prabha (lingkaran cahaya) di belakang kepalanya sebagai simbol sumber energi kosmis.",
            en: "The Sun God (Surya) carved on the left side of the back wall inside the Nandi Temple chamber. He is depicted standing on a chariot pulled by seven horses, holding lotus flowers in both hands, and adorned with royal attributes including a high crown (kirita-makuta) and a prabha (halo) behind his head symbolizing his cosmic energy."
        },
    },
    {
        id: "candra",
        name: { id: "Dewa Candra", en: "Lord Chandra" },
        dir: { id: "Dinding Belakang Sisi Kanan", en: "Right Side Back Wall)" },
        pos: new THREE.Vector3(4.923, 0.550, 0.216),
        radius: 0.35,
        img: "./assets/poi/nandi/candra nandi.JPG",
        audio: {
            id: "./assets/audio/nandi/candra_id.mp3",
            en: "./assets/audio/nandi/candra_en.mp3",
        },
        desc: {
            id: "Dewa Bulan (Candra) yang terletak di dinding belakang sebelah kanan bilik Candi Nandi, berdampingan dengan Dewa Surya. Ia digambarkan berdiri di atas kereta yang ditarik oleh sepuluh ekor kuda (atau rusa menurut teks ikonografi tertentu), memegang kuncup bunga teratai, serta memancarkan aura ketenangan malam hari melalui hiasan prabha bulan sabit di belakang kepalanya.",
            en: "The Moon God (Chandra) located on the right side of the back wall inside the Nandi Temple chamber, mirroring Lord Surya. He is depicted standing on a chariot pulled by ten horses (or deer according to specific iconographic texts), holding lotus buds, and radiating the serene aura of the night through a crescent moon halo behind his head."
        },
    },
    ],
    angsa: [
    {
        id: "angsa",
        name: { id: "Candi Angsa", en: "Angsa / Hamsa Temple" },
        dir: { id: "Barat (Menghadap Candi Brahma)", en: "West (Facing Brahma Temple)" },
        pos: new THREE.Vector3(4.921, 0.543, 4.113),
        radius: 0.35,
        img: "./assets/poi/angsa/angsa.JPG",
        audio: {
            id: "./assets/audio/angsa/angsa_id.mp3",
            en: "./assets/audio/angsa/angsa_en.mp3",
        },
        desc: {
            id: "Candi ini ditujukan sebagai tempat bersemayamnya Angsa (Hamsa), angsa suci berwujud anggun yang menjadi kendaraan Dewa Brahma dan melambangkan kebijaksanaan serta pemilah kebenaran. Mirip dengan Candi Garuda, bilik utama bangunan ini ditemukan dalam keadaan kosong tanpa arca arwah wahana di dalamnya, namun sisa pahatan luar bangunannya melukiskan keagungan ornamen pohon hayat kalpataru.",
            en: "This temple was intended to house the Angsa (Hamsa), the sacred swan vehicle of Lord Brahma that symbolizes wisdom and discernment. Similar to the Garuda Temple, the main chamber was found empty without its central vehicle statue, though the exterior stone carvings still beautifully showcase the celestial kalpataru tree motifs."
        },
    },
    ],
};

for (const [templeId, list] of Object.entries(POIS_BY_TEMPLE)) {
    list.forEach((p) => {
        p.templeId = templeId;
        p.uid = `${templeId}:${p.id}`;
    });
}

for (const p of POIS_BY_TEMPLE.brahma) if (p.id.startsWith("panel_")) p.pos.y = 0.400;
for (const p of POIS_BY_TEMPLE.wisnu) if (p.id.startsWith("panel_")) p.pos.y = 0.400;

export const POIS = Object.values(POIS_BY_TEMPLE).flat();