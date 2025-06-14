import { FC, useState } from 'react';

import { Button } from '@ozen-ui/kit/ButtonNext';
import { Dialog, DialogBody, DialogFooter, DialogHeader, DialogSubtitle, DialogTitle } from '@ozen-ui/kit/Dialog';
import { Input } from '@ozen-ui/kit/Input';
import { Stack } from '@ozen-ui/kit/Stack';

type CreateDialogModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (customerNumber: string) => void;
  loading?: boolean;
};

export const CreateDialogModal: FC<CreateDialogModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [customerNumber, setCustomerNumber] = useState('');

  const handleConfirm = () => {
    if (customerNumber.trim()) {
      onConfirm(customerNumber.trim());
      setCustomerNumber(''); // Reset after confirm
    }
  };

  const handleClose = () => {
    setCustomerNumber(''); // Reset on close
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Создать новую симуляцию</DialogTitle>
        <DialogSubtitle>Введите номер клиента или call_id для создания новой симуляции</DialogSubtitle>
      </DialogHeader>
      
      <DialogBody>
        <Stack gap="m" fullWidth>
          <Input
            label="Номер клиента или call_id"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            fullWidth
            required
          />
        </Stack>
      </DialogBody>
      
      <DialogFooter>
        <Stack direction="row" gap="s">
          <Button color="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirm}
            disabled={!customerNumber.trim() || loading}
            loading={loading}
          >
            Создать
          </Button>
        </Stack>
      </DialogFooter>
    </Dialog>
  );
}; 