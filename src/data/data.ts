import homeworkPng from "./homework.png";
import homeworkPdf from "./hmPdf.pdf";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  password: string;
  userType: "principle" | "teacher" | "student";
  teacherId?: string;
}

interface Homeworks {
  id: string;
  publisherId: string;
  title: string;
  description: string;
}

interface CompletedHomeworks {
  id: string;
  homeworkId: string;
  studentId: string;
  document: any;
}

export const users: User[] = [
  {
    firstName: "Kendra",
    username: "Kendra",
    password: "kendraRoob",
    userType: "principle",
    avatar: "https://cdn.fakercloud.com/avatars/kudretkeskin_128.jpg",
    lastName: "Roob",
    id: "1",
  },
  {
    firstName: "Maudie",
    username: "Maudie",
    password: "muadiePf",
    userType: "teacher",
    avatar: "https://cdn.fakercloud.com/avatars/sementiy_128.jpg",
    lastName: "Pfannerstill",
    id: "2",
  },
  {
    firstName: "Ryleigh",
    username: "Ryleigh",
    password: "ryleighJohnston",
    userType: "teacher",
    avatar: "https://cdn.fakercloud.com/avatars/dhrubo_128.jpg",
    lastName: "Johnston",
    id: "3",
  },
  {
    firstName: "Bertram",
    username: "Bertram",
    password: "berthamSkiles",
    userType: "teacher",
    avatar: "https://cdn.fakercloud.com/avatars/gkaam_128.jpg",
    lastName: "Skiles",
    id: "4",
  },
  {
    firstName: "Orrin",
    username: "Orrin",
    password: "orrinNitz",
    userType: "teacher",
    avatar: "https://cdn.fakercloud.com/avatars/edkf_128.jpg",
    lastName: "Nitzsche",
    id: "5",
  },
  {
    firstName: "Reynold",
    username: "Reynold",
    password: "reynoldZiemann",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/GavicoInd_128.jpg",
    lastName: "Ziemann",
    id: "6",
    teacherId: "2",
  },
  {
    firstName: "Kelsi",
    username: "Kelsi",
    password: "kelsiBoehm",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/russoedu_128.jpg",
    lastName: "Boehm",
    id: "7",
    teacherId: "2",
  },
  {
    firstName: "Laney",
    username: "Laney",
    password: "laneyBeier",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/quailandquasar_128.jpg",
    lastName: "Beier",
    id: "8",
    teacherId: "2",
  },
  {
    firstName: "Javonte",
    username: "Javonte",
    password: "javonteGleason",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/sasha_shestakov_128.jpg",
    lastName: "Gleason",
    id: "9",
    teacherId: "3",
  },
  {
    firstName: "Minnie",
    username: "Minnie",
    password: "minnieChr",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/flexrs_128.jpg",
    lastName: "Christiansen",
    id: "10",
    teacherId: "3",
  },
  {
    firstName: "Drake",
    username: "Drake",
    password: "drakeLeu",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/looneydoodle_128.jpg",
    lastName: "Leuschke",
    id: "11",
    teacherId: "3",
  },
  {
    firstName: "Sydney",
    username: "Sydney",
    password: "sydneyMetz",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/ahmetalpbalkan_128.jpg",
    lastName: "Metz",
    id: "12",
    teacherId: "4",
  },
  {
    firstName: "Warren",
    username: "Warren",
    password: "warrenWiderman",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/danpliego_128.jpg",
    lastName: "Wilderman",
    id: "13",
    teacherId: "4",
  },
  {
    firstName: "Dandre",
    username: "Dandre",
    password: "dandreJaskoloski",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/madshensel_128.jpg",
    lastName: "Jaskolski",
    id: "14",
    teacherId: "4",
  },
  {
    firstName: "Henderson",
    username: "Henderson",
    password: "hendersonHomenick",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/danro_128.jpg",
    lastName: "Homenick",
    id: "15",
    teacherId: "5",
  },
  {
    firstName: "Anita",
    username: "Anita",
    password: "anitaDach",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/lisovsky_128.jpg",
    lastName: "Dach",
    id: "16",
    teacherId: "5",
  },
  {
    firstName: "Howell",
    username: "Howell",
    password: "wuGhMNMTWaIhowellAnkunding",
    userType: "student",
    avatar: "https://cdn.fakercloud.com/avatars/IsaryAmairani_128.jpg",
    lastName: "Ankunding",
    id: "17",
    teacherId: "5",
  },
];

export const homeworks: Homeworks[] = [
  {
    id: "1",
    publisherId: "2",
    title: "HomeWork 1",
    description: "Homework 1 Decription",
  },
  {
    id: "2",
    publisherId: "3",
    title: "HomeWork 2",
    description: "Homework 2 Decription",
  },
  {
    id: "3",
    publisherId: "4",
    title: "HomeWork 3",
    description: "Homework 3 Decription",
  },
  {
    id: "4",
    publisherId: "5",
    title: "HomeWork 4",
    description: "Homework 4 Decription",
  },
];

export const completedHomeworks: CompletedHomeworks[] = [
  {
    id: "1",
    homeworkId: "1",
    studentId: "6",
    document: homeworkPng,
  },
  {
    id: "2",
    homeworkId: "1",
    studentId: "7",
    document: homeworkPng,
  },
  {
    id: "3",
    homeworkId: "1",
    studentId: "8",
    document: homeworkPdf,
  },
  {
    id: "4",
    homeworkId: "2",
    studentId: "9",
    document: homeworkPdf,
  },
  {
    id: "5",
    homeworkId: "2",
    studentId: "10",
    document: homeworkPng,
  },
  {
    id: "6",
    homeworkId: "2",
    studentId: "11",
    document: homeworkPdf,
  },
  {
    id: "7",
    homeworkId: "3",
    studentId: "12",
    document: homeworkPdf,
  },
  {
    id: "8",
    homeworkId: "3",
    studentId: "13",
    document: homeworkPng,
  },
  {
    id: "9",
    homeworkId: "3",
    studentId: "14",
    document: homeworkPdf,
  },
  {
    id: "10",
    homeworkId: "4",
    studentId: "15",
    document: homeworkPdf,
  },
  {
    id: "11",
    homeworkId: "4",
    studentId: "16",
    document: homeworkPng,
  },
  {
    id: "12",
    homeworkId: "4",
    studentId: "17",
    document: homeworkPdf,
  },
];
