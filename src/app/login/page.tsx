"use client";
import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Link,
  Divider,
  Chip,
} from "@nextui-org/react";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";

// Tipo para usuário
type UserType = {
  name: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (user) {
    router.replace("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  // Função para simular um "banco" de usuários
  const getUsers = (): UserType[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("users") || "[]");
  };
  const setUsers = (users: UserType[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return false;
    }

    if (!isLogin && !formData.name) {
      setError("Nome é obrigatório para criar conta");
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um email válido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      try {
        const users = getUsers();

        if (isLogin) {
          // LOGIN
          const userExists = users.find(
            (u) =>
              u.email === formData.email && u.password === formData.password
          );
          if (!userExists) {
            setError("Email ou senha inválidos.");
            setIsLoading(false);
            return;
          }
          login(userExists.name, userExists.email);
          router.replace("/");
        } else {
          // REGISTRO
          const emailExists = users.some((u) => u.email === formData.email);
          if (emailExists) {
            setError("Este email já está cadastrado.");
            setIsLoading(false);
            return;
          }
          const newUser: UserType = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };
          setUsers([...users, newUser]);
          login(newUser.name, newUser.email);
          router.replace("/");
        }
      } catch {
        setError("Erro ao processar. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none bg-white/90 backdrop-blur-md">
        <CardHeader className="flex flex-col items-center pb-6 pt-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isLogin ? " Seja Bem-vindo !" : "Criar conta"}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {isLogin
              ? "Acesse sua conta"
              : "Crie sua nova conta "}
          </p>
        </CardHeader>

        <CardBody className="px-8 pb-8">
          {error && (
            <Chip
              startContent={<AlertCircle className="w-4 h-4" />}
              variant="flat"
              color="danger"
              className="w-full justify-start mb-4 p-3 h-auto"
            >
              <span className="text-sm">{error}</span>
            </Chip>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <Input
                name="name"
                type="text"
                label=""
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleInputChange}
                startContent={<User className="w-4 h-4 text-gray-400" />}
                variant="bordered"
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "border-gray-300 hover:border-blue-400 focus-within:!border-blue-500",
                }}
                isRequired={!isLogin}
              />
            )}

            <Input
              name="email"
              type="email"
              label=""
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleInputChange}
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              isRequired
            />

            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label=""
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleInputChange}
              startContent={<Lock className="w-4 h-4 text-gray-400" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              variant="bordered"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border-gray-300 hover:border-blue-400 focus-within:!border-blue-500",
              }}
              isRequired
            />

            {!isLogin && (
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label=""
                placeholder="Confirme a sua senha"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                variant="bordered"
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "border-gray-300 hover:border-blue-400 focus-within:!border-blue-500",
                }}
                isRequired={!isLogin}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium mt-2"
              size="lg"
              isLoading={isLoading}
              spinner={
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              }
            >
              {isLoading
                ? isLogin
                  ? "Entrando..."
                  : "Criando conta..."
                : isLogin
                ? "Entrar"
                : "Criar conta"}
            </Button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          )}

          <div className="flex items-center gap-4 my-6">
            <Divider className="flex-1" />
            <span className="text-sm text-gray-500">ou</span>
            <Divider className="flex-1" />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <Link
                as="button"
                onClick={toggleMode}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {isLogin ? "Criar conta" : "Fazer login"}
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
