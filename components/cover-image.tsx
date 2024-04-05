import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  src: string;
  alt: string;
  priority: boolean;
};

const CoverImage = async ({ src, alt, priority }: Props) => {
  const buffer = await fetch(`https://www.jhagas.space${src}`).then(
    async (res) => Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="sm:mx-0 h-full flex items-center justify-center max-w-3xl">
      <Image
        src={src}
        alt={alt}
        className="rounded-lg"
        placeholder="blur"
        blurDataURL={base64}
        width={1200}
        height={630}
        priority={priority}
      />
    </div>
  );
};

export default CoverImage;
