import { parseISO, format } from "date-fns";
import { id } from 'date-fns/locale';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "EEEE, d LLLL yyyy", { locale: id })}
    </time>
  );
};

export default DateFormatter;
