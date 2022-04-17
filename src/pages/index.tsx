import { MicroCMSListResponse } from "microcms-js-sdk/dist/cjs/types";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};
const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  const [search, setSeaech] = useState<MicroCMSListResponse<Blog>>();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSeaech(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = async () => {
    setSeaech(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div className="text-blue-500">
      <form className="mt-2 flex gap-x-2" onSubmit={handleSubmit}>
        <input type="text" name="query" className="border border-black px-2" />
        <button className="border border-black px-2">検索</button>
        <button
          type="reset"
          className="border border-black px-2"
          onClick={handleClick}
        >
          リセット
        </button>
      </form>
      <p className="my-3 py-3 text-gray-500">{`${
        search ? "検索結果" : "記事の総数"
      }:${totalCount}件`}</p>
      <ul>
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a>{content.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList({ endpoint: "blog" });
  return { props: data };
};

export default Home;
