import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center w-full text-red-50">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="underline" href="/">
        Return Home
      </Link>
    </div>
  );
}
