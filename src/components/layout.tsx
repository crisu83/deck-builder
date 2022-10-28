import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export function Screen({ className, children }: Props) {
  return (
    <div className={classNames("px-8 bg-black text-white", className)}>
      <Head>
        <title>Deck builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}

export function Content({ className, children }: Props) {
  return (
    <main
      className={classNames(
        "min-h-screen py-16 flex flex-col items-center",
        className
      )}
    >
      {children}
    </main>
  );
}

export function Footer({ className }: Props) {
  return (
    <footer
      className={classNames(
        "flex flex-1 py-8 justify-center items-center border-t border-solid border-slate-800",
        className
      )}
    >
      <a
        className="flex grow justify-center items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className="h-4 ml-2">
          <Image
            className="invert"
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
          />
        </span>
      </a>
    </footer>
  );
}
