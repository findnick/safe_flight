import { useEffect, useState } from "react";
import { APIS, useAPI } from "../../api/config";
import RichTextEditor from "../../Components/UnCommon/RichTextEditor";

const EditPrivacy = () => {
  return <Content type="privacy" />;
};

const EditCancellation = () => {
  return <Content type="cancellation" />;
};

const EditContact = () => {
  return <Content type="contactUs" />;
};

const EditAbout = () => {
  return <Content type="aboutUs" />;
};

const EditHome = () => {
  return <Content type="home" />;
};

const EditCampaign = () => {
  return <Content type="campaign" />;
};

const Content = ({ type = "" }) => {
  const [getContent, contentLoading] = useAPI(APIS.fetchContent);
  const [content, setContent] = useState("");

  useEffect(() => {
    getContent().then((res) => {
      console.log(res);
      const data = res.data[0];
      // console.log(data[type]);
      setContent(`${data[type]}`);
    });
  }, []);

  useEffect(() => console.log(content), [content]);

  return (
    !contentLoading && <RichTextEditor userContent={content} type={type} />
  );
};

export {
  EditPrivacy,
  EditCancellation,
  EditContact,
  EditAbout,
  EditHome,
  EditCampaign,
};
