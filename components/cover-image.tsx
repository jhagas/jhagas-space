import Image from "next/image";
type Props = {
  src: string;
  alt: string;
  priority: boolean;
};

const CoverImage = ({ src, alt, priority }: Props) => {
  return (
    <div className="sm:mx-0 h-full flex items-center justify-center max-w-3xl">
      <Image
        src={src}
        alt={alt}
        className="rounded-lg"
        placeholder="blur"
        blurDataURL={
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8cPP1fwAI6gOlkO2qmgAAAABJRU5ErkJggg=="
        }
        width={1200}
        height={630}
        priority={priority}
      />
    </div>
  );
};

export default CoverImage;
