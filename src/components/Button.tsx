
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>Click Me!</button>
  )
}

export default Button
