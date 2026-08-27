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
  logo?: string;
}

export interface IEducation {
  title: string;
  items: IEducationItem[];
}

export interface IProjectStackGroup {
  label: string;
  items: string[];
}

export interface IProjectShot {
  src: string;
  srcDark?: string;
  alt: string;
  caption: string;
}

export interface IProjectNote {
  title: string;
  body: string;
}

export interface IProjectFlowRow {
  left: string;
  right: string;
  accent?: boolean;
}

export interface IProjectItem {
  id: number;
  year: string;
  role: string;
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  displayUrl: string;
  stack: IProjectStackGroup[];
  hero: IProjectShot;
  shots?: IProjectShot[];
  notes?: IProjectNote[];
  flow?: IProjectFlowRow[];
  flowFooter?: { label: string; note: string };
}

export interface IProjects {
  title: string;
  items: IProjectItem[];
}

export interface ITocItem {
  id: string;
  label: string;
  children?: ITocItem[];
}
