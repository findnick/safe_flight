import { useEffect, useState } from "react";
import { APIS, useAPI, WORKING_LINK } from "../../api/config";
import { CircularProgress } from "@mui/material";

const Content = ({ type = "", setLoading }) => {
  const [getContent, contentLoading] = useAPI(APIS.fetchContent);
  const [content, setContent] = useState("");

  useEffect(() => {
    getContent().then((res) => {
      const data = res.data[0];
      setContent(`${data[type]}`);
    });
  }, []);

  useEffect(() => setLoading(contentLoading), [contentLoading]);

  return (
    !contentLoading && (
      <div
        className="tiptap border-none flex flex-col"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  );
};

export default function Campaign() {
  const [loading, setLoading] = useState();

  const imgUrl = `${WORKING_LINK}/bgImage/fetchImage`;
  return (
    <div
      className="bg-no-repeat my-5 min-h-72"
      style={{
        color: "var(--white)",
        background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      {/* {loading && <CircularProgress />} */}
      <div className="p-8 campaign-banner">
        <Content type="campaign" setLoading={setLoading} />
      </div>
    </div>
  );
}
