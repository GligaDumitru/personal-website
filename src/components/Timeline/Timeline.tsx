import { ITimeline, ITimelineItem } from "../../types";
import TimelineItem from "./TimelineItem";

const Timeline = ({ timeline }: ITimeline) => {
  return (
    <div>
      {timeline.map((timelineItem: ITimelineItem) => (
        <TimelineItem key={timelineItem.id} {...timelineItem} />
      ))}
    </div>
  );
};
export default Timeline;
