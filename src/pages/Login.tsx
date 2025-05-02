
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { LogIn, Eye, EyeOff, Key, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating login API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Aviso",
        description: "Funcionalidade em desenvolvimento",
      });
    }, 1000);
  };

  const handleCorporateLogin = () => {
    setIsLoading(true);
    
    // Simulate SSO authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      navigate('/dashboard');
      toast({
        title: "Login realizado",
        description: "Autenticação corporativa realizada com sucesso.",
      });
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-kpmg-blue">Acesso ao Sistema</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="external" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="external">Acesso Externo</TabsTrigger>
                  <TabsTrigger value="corporate">Acesso KPMG</TabsTrigger>
                </TabsList>
                
                <TabsContent value="external">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          placeholder="E-mail ou CPF"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-kpmg-blue hover:bg-kpmg-lightblue"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Entrando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn className="h-4 w-4" />
                          Entrar
                        </span>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm">
                      <Link to="/forgot-password" className="text-kpmg-blue hover:underline">
                        Esqueci minha senha
                      </Link>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="corporate">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 text-center mb-6">
                      Clique no botão abaixo para autenticar com sua conta corporativa KPMG
                    </p>
                    <Button
                      onClick={handleCorporateLogin}
                      className="w-full bg-kpmg-blue hover:bg-kpmg-lightblue"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Autenticando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn className="h-4 w-4 mr-2" />
                          Entrar com conta corporativa
                        </span>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Não tem uma conta?{" "}
                  <Link to="/register" className="text-kpmg-blue hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
