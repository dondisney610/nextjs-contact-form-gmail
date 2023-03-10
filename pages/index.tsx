import Head from "next/head";
import { Inter } from "@next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };
    await fetch("api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("送信に成功しました。");
    });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mt-5">
        <h2 className="mb-3">Next.js Gmailアプリ</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              お名前
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              ref={nameRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              メールアドレス
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              メッセージ
            </label>
            <textarea
              name="message"
              id="message"
              className="form-control"
              ref={messageRef}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger">
            メール送信
          </button>
        </form>
      </div>
    </>
  );
}
