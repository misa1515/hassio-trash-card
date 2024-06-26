import { getRgbColor } from './getRgbColor';

import type { CalendarItem } from './calendarItem';
import type { TrashCardConfig } from '../cards/trash-card/trash-card-config';

const isColorModesArray = (modes: TrashCardConfig['color_mode'] | TrashCardConfig['color_mode'][]): modes is TrashCardConfig['color_mode'][] =>
  Boolean(modes && Array.isArray(modes));

const getColoredStyle = (modes: TrashCardConfig['color_mode'] | TrashCardConfig['color_mode'][], item: CalendarItem, darkMode = false, overrideIconColorContrast = true) => {
  const color = item.color ?? 'disabled';

  const colorModes: TrashCardConfig['color_mode'][] = isColorModesArray(modes) ? modes : [ modes ?? 'background' ];

  const style = {};
  const rgbColor = getRgbColor(color);

  const override = colorModes.includes('background') && ((!darkMode && color === 'black') || (darkMode && color === 'white'));

  const overrideColor = color === 'black' ?
    `rgba(255, 255, 255, .7)` :
    `rgba(0, 0, 0, .7)`;

  if (colorModes.includes('icon')) {
    style['--trash-card-icon-color'] = `rgba(${rgbColor})`;
  }

  if (colorModes.includes('background')) {
    style['--trash-card-background'] = `rgba(${rgbColor}, .7)`;
  }

  if (override) {
    style['--text-color'] = overrideColor;
    style['--card-primary-color'] = overrideColor;
    style['--card-secondary-color'] = overrideColor;
    style['--primary-text-color'] = overrideColor;
  }

  if (override && overrideIconColorContrast) {
    style['--trash-card-icon-color'] = overrideColor;
  }

  return style;
};

export {
  getColoredStyle
};
