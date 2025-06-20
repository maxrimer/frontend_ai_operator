import { FC } from 'react';

import { Stack } from '@ozen-ui/kit/Stack';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@ozen-ui/kit/Table';
import { Typography } from '@ozen-ui/kit/Typography';

import { type Order } from '../../../../helpers';
import { dictionary, formatDate } from '../../utils';
import { OrderStatus } from '../OrderStatus';

export type OrdersPageTableProps = {
  handleClickOnRow: (id: string) => void;
  orders: Order[];
  orderId?: string;
};

export const OrdersPageTable: FC<OrdersPageTableProps> = ({
  handleClickOnRow,
  orders,
  orderId,
}) => {
  return (
    <TableContainer>
      <Table fullWidth stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="left">{dictionary['id']}</TableCell>
            <TableCell align="left">{dictionary['caller']}</TableCell>
            <TableCell align="left">{dictionary['duration']}</TableCell>
            <TableCell align="left">{dictionary['date']}</TableCell>
            <TableCell align="left">{dictionary['type']}</TableCell>
            <TableCell align="left">{dictionary['status']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(({ caller, date, duration, id, type, status }) => (
            <TableRow
              selected={id === orderId}
              key={id}
              onClick={() => handleClickOnRow?.(id)}
              hover
            >
              <TableCell verticalAlign="middle">
                <Typography variant="text-m_1" noWrap>
                  {id}
                </Typography>
              </TableCell>
              <TableCell verticalAlign="middle">{caller}</TableCell>
              <TableCell verticalAlign="middle">
                <Typography noWrap>{duration}</Typography>
              </TableCell>
              <TableCell verticalAlign="middle">
                <Typography noWrap>{formatDate(date)}</Typography>
              </TableCell>
              <TableCell verticalAlign="middle">{type}</TableCell>
              <TableCell verticalAlign="middle">
                <OrderStatus status={status} />
              </TableCell>
            </TableRow>
          ))}
          {!orders.length && (
            <TableRow>
              <TableCell colSpan={6}>
                <Stack align="center" justify="center" fullWidth>
                  <Typography variant="text-m_1" color="secondary">
                    Ничего не найдено
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
