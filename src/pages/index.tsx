import { MicroCMSListResponse } from "microcms-js-sdk/dist/cjs/types";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};
const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  console.log(props.contents);

  return (
    <div className="text-blue-500">
      <p className="my-3 py-3 text-gray-500">{`記事の総数:${props.totalCount}件`}</p>
      <ul>
        {props.contents.map((content) => {
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
