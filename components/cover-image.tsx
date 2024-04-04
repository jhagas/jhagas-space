import Image from "next/image";

type Props = {
  src: string;
};

const CoverImage = ({ src }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Article Cover Image`}
      className="!w-full rounded-lg max-w-3xl"
      width={1200}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0 h-full flex items-center justify-center">
      {image}
    </div>
  );
};

export default CoverImage;
