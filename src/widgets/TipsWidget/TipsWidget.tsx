import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

export const TipsWidget = () => {
  return (
    <Stack direction="column" gap="l" align="start">
      <Typography variant="text-xs" color="tertiary">
        Совет от AI
      </Typography>
      <Typography variant="text-xl_1">
        Будьте вежливы и внимательны
      </Typography>
      <Typography color="tertiary">
        Помните, что клиенты могут быть раздражены, если вы не отвечаете на их
        вопросы или не реагируете на их жалобы.
      </Typography>
    </Stack>
  );
};
