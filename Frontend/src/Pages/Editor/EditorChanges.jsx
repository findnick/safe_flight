import RichTextEditor from "../../Components/UnCommon/RichTextEditor";

const EditPrivacy = () => {
  return (
    <>
      <RichTextEditor
        userContent={`<h2> This is Privacy Policy </h2>
        <p>Write something on the way... </p>`}
      />
    </>
  );
};

const EditCancellation = () => {
  return (
    <>
      <RichTextEditor
        userContent={`<h2> This is Cancellation Policy </h2>
        <p>Write something on the way... </p>`}
      />
    </>
  );
};

const EditContact = () => {
  return (
    <>
      <RichTextEditor
        userContent={`<h2> This is Contact Us </h2>
        <p>Write something on the way... </p>`}
      />
    </>
  );
};

const EditAbout = () => {
  return (
    <>
      <RichTextEditor
        userContent={`<h2> This is About Us </h2>
        <p>Write something on the way... </p>`}
      />
    </>
  );
};

export { EditPrivacy, EditCancellation, EditContact, EditAbout };
