import '@/assets/style/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '@/components/Button';

const root: HTMLElement | null = document.getElementById('root');

const app = createRoot(root as HTMLElement);

app.render(
  <Button onClick={() => {}}> Test </Button>,
);
