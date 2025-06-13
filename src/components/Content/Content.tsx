import { Paper } from '@ozen-ui/kit/Paper';

import { Header, Main } from './components';
import s from './Content.module.css';

export const Content = () => {

  return (
    <Paper className={s.content} radius="l">
      <Header />
      <Main />
    </Paper>
  );
};
