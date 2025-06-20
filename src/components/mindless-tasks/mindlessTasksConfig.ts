
import { Task } from './mindlessTaskTypes';
import DotRearrangementTask from './DotRearrangementTask';
import SilenceListenerTask from './SilenceListenerTask';
import PixelClickerTask from './PixelClickerTask';

export const tasks: Task[] = [
  {
    name: "Dot Rearrangement",
    instruction: "Rearrange 100 dots by clicking each one",
    duration: 90,
    component: DotRearrangementTask
  },
  {
    name: "Silence Meditation",
    instruction: "Listen to 20 seconds of silence",
    duration: 20,
    component: SilenceListenerTask
  },
  {
    name: "Pixel Precision",
    instruction: "Click every third pixel in the grid",
    duration: 90,
    component: PixelClickerTask
  }
];
