import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const convertDateFormat = (
  date: Date,
  format: string = 'YYYY-MM-DD'
): string => dayjs(date).format(format);
