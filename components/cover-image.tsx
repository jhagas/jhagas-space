type Props = {
  title: string;
  src: string;
};

const CoverImage = ({ title, src }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Article Cover Image`}
      className="!w-full rounded-lg max-w-3xl"
    />
  );
  return (
    <div className="sm:mx-0 h-full flex items-center justify-center">
      {image}
    </div>
  );
};

export default CoverImage;
