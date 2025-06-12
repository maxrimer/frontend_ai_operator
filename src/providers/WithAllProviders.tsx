import { FC, PropsWithChildren } from "react";

import { WithQueryProvider } from "./WithQueryProvider";

export const WithAllProviders: FC<PropsWithChildren> = ({ children }) => {
  return <WithQueryProvider>{children}</WithQueryProvider>;
};  