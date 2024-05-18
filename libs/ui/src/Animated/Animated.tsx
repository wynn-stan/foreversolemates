import { HTMLAttributes } from 'react';
import FadeIn from './FadeIn';
import FadeInFromAbove from './FadeInFromAbove';
import FadeInFromBelow from './FadeInFromBelow';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default Object.assign({}, { FadeIn, FadeInFromAbove, FadeInFromBelow });
