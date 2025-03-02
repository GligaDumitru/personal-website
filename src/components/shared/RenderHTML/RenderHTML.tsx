const RenderHTML = ({ value }: { value: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
};

export default RenderHTML;
