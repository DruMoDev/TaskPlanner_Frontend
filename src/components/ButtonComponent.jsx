const ButtonComponent = ({ children, props = {} }) => {
  const { className, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`rounded-full  px-5  font-semibold   transition-all ease-in ${className}`}
    >
      {children}
    </button>
  );
};
export default ButtonComponent;
