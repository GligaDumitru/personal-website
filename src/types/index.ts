export interface IJobResponsibility {
  id: number;
  responsibility: string;
}

export interface ITimelineItem {
  id: number;
  startDate: string;
  endDate: string;
  employer: string;
  city: string;
  jobTitle: string;
  jobDescription: string;
  jobResponsibilities: IJobResponsibility[];
}

export interface ITimeline {
  timeline: ITimelineItem[];
}

export interface IWorkExperience {
  timeline: ITimelineItem[];
}

export interface IData {
  timeline: ITimelineItem[];
}

export interface IEducationItem {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  institution: string;
}

export interface IEducation {
  title: string;
  items: IEducationItem[];
}
