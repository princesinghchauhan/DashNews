import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2>This is your home page. Please click login link</h2>
      <Link href="./login">Login</Link>
    </>
  );
}
