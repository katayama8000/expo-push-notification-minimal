import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import React from "react";
import { client } from "src/libs/client";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { Blog } from "src/pages";
import dayjs from "dayjs";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <div>
      <div className="py-5 px-5">{props.title}</div>
      <time dateTime="props.publishedAt">
        {dayjs(props.publishedAt).format("YYYY年MM月DD日")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: props.body }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  const ids = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: ctx.params.id,
  });

  console.log(data);
  return {
    props: data,
  };
};

export default BlogId;
