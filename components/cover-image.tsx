import Image from "next/image";

type Props = {
  src: string;
};

const CoverImage = ({ src }: Props) => {
  return (
    <div className="sm:mx-0 h-full flex items-center justify-center max-w-3xl">
      <Image
        src={src}
        alt={`Article Cover Image`}
        className="rounded-lg"
        width={1200}
        height={630}
      />
    </div>
  );
};

export default CoverImage;
