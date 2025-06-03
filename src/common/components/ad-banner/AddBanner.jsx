import Image from "next/image";
import Link from "next/link";

const AddBanner = ({ img, height, width, pClass, data }) => {
  return (
    <div className={`axil-banner ${pClass ? pClass : ""}`}>
      <div className="thumbnail">
        {/*  hi* */}
        <Link href={data?.link || "#"}>
          <a>
            <Image
              src={img}
              alt={data?.title_en}
              height={height ? height : 300}
              width={width ? width : 1530}
              placeholder="blur"
              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXw8AAgMBQLfkYc4AAAAASUVORK5CYII=`}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AddBanner;
