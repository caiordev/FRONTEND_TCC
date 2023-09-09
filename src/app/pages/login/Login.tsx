import { useNavigate } from "react-router-dom";

export const Login = () => {
  const history = useNavigate();

  const handleClick = () => {
    history("/pagina-inicial");
  };

  return (
    <div>
      <p>Login</p>
      <button onClick={handleClick}>Voltar</button>
    </div>
  );
};
