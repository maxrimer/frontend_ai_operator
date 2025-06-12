import { useMemo } from 'react';

import { Route } from 'wouter';

import { useApp } from '../../../../AppContext.tsx';
import { navigation } from '../../../../helpers';
import { Page } from '../Page';

import s from './Main.module.css';

export const Main = () => {
  const { setScrollContainerEl } = useApp();

  const routes = useMemo(() => {
    return Object.entries(navigation.routes);
  }, []);

  return (
    <main ref={(el) => setScrollContainerEl?.(el)} className={s.main}>
      {routes.map(([key, props]) => {
        return props.path ? (
          <Route path={props.path} key={key}>
            <Page {...props} />
          </Route>
        ) : null;
      })}
    </main>
  );
};
