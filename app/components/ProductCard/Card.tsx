import AddToCart from "./AddToCart";

type Card = {
  id: string;
  title: string;
  handle: string;
  price: string;
  vendor: string;
  featuredImage?: {
    url: string;
  };
};
export default function Card({ props }: { props: Card }) {
  return (
    <div
      className="z-10 rounded-md min-h-100 p-5 bg-white text-black text-center w-sm basis-[10%] md:basis-[49%] lg:basis-[24.5%] flex flex-col items-center"
      data-handle={props.handle}
      data-card-id={props.id.split("/").pop()}
    >
      <a href="#">
        <h3 className="font-bold text-xl">{props.title}</h3>
        <span className="uppercase text-zinc-500 text-xs">{props.vendor}</span>
        <img
          className="w-52 mx-auto my-2 block"
          src={props.featuredImage?.url}
          alt={props.title}
        />
      </a>
      <span>{props.price}</span>
      <AddToCart product={props} />
    </div>
  );
}
