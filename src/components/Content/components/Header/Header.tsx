import { Container } from '@ozen-ui/kit/Container';
import { Stack } from '@ozen-ui/kit/Stack';

import { BurgerMenu } from '../../../BurgerMenu';

import s from './Header.module.css';

export const Header = () => {

  return (
    <Container
      as="header"
      maxWidth="fullWidth"
      gutters={{ xs: 'm', m: '2xl' }}
      className={s.header}
    >
      <Stack
        align="center"
        justify="spaceBetween"
        className={s.headerContent}
        fullWidth
      >
        <Stack gap="s">
          <BurgerMenu />
        </Stack>
      </Stack>
    </Container>
  );
};
