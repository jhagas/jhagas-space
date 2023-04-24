import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
};

const CoverImage = ({ title, src }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Article Cover Image`}
      className="w-full rounded-lg"
      width={400}
      height={200}
    />
  );
  return (
    <div className="sm:mx-0 h-full flex items-center justify-center">{image}</div>
  );
};

export default CoverImage;
