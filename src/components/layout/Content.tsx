interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default Content;
