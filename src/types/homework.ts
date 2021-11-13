export interface Homeworks {
  id: string;
  publisherId: string;
  title: string;
  description: string;
}

export interface CompletedHomeworks {
  id: string;
  homeworkId: string;
  studentId: string;
  document: any;
}

export interface CreateHomeWorkObject {
  title: string;
  description: string;
}