import React from 'react';
import {Composition} from 'remotion';
import {Edit} from './Edit';
import {DURACAO, FPS} from './data';

export const Root: React.FC = () => (
  <>
    <Composition id="V2" component={Edit} durationInFrames={Math.floor(DURACAO * FPS)} fps={FPS} width={1080} height={1920} defaultProps={{versao: 2 as const}} />
    <Composition id="V3" component={Edit} durationInFrames={Math.floor(DURACAO * FPS)} fps={FPS} width={1080} height={1920} defaultProps={{versao: 3 as const}} />
  </>
);
