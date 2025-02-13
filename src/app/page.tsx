import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Check, FileText, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container flex items-center justify-between py-4">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              width={80}
              height={100}
              className="w-10 h-10"
              src={"/assets/exercicios.png"}
              alt="fsio - logo"
            />
            <span className="text-xl font-bold uppercase">Fsio</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:text-primary">
              Recursos
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-primary">
              Como Funciona
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Preços
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost">
              <Link href={"/login"}>Entrar</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Gerencie sua clínica de fisioterapia com eficiência
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Simplifique o gerenciamento de pacientes, exercícios e rotinas
                com nossa plataforma completa para fisioterapeutas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground"
                >
                  Experimente Grátis
                </Button>
                <Button size="lg" variant="outline">
                  Agende uma Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-primary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tudo que você precisa em um só lugar
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Gestão de Pacientes",
                  description:
                    "Mantenha todos os dados dos seus pacientes organizados e acessíveis",
                },
                {
                  icon: Calendar,
                  title: "Agendamento Online",
                  description:
                    "Sistema completo de agendamento com lembretes automáticos",
                },
                {
                  icon: FileText,
                  title: "Prescrição Digital",
                  description:
                    "Crie e compartilhe prescrições de exercícios digitalmente",
                },
                {
                  icon: BarChart,
                  title: "Relatórios Detalhados",
                  description:
                    "Acompanhe a evolução dos seus pacientes com relatórios completos",
                },
                {
                  icon: Star,
                  title: "Biblioteca de Exercícios",
                  description:
                    "Acesse uma biblioteca completa de exercícios e rotinas",
                },
                {
                  icon: Check,
                  title: "Prontuário Eletrônico",
                  description:
                    "Mantenha registros clínicos seguros e organizados",
                },
              ].map((feature) => (
                <Card key={feature.title} className="border-none">
                  <CardHeader>
                    <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Como Funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Cadastre-se",
                  description:
                    "Crie sua conta em menos de 2 minutos e comece a usar",
                },
                {
                  step: "2",
                  title: "Configure sua Clínica",
                  description: "Personalize sua agenda e adicione sua equipe",
                },
                {
                  step: "3",
                  title: "Comece a Atender",
                  description:
                    "Gerencie pacientes e prescreva exercícios facilmente",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-primary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Planos que cabem no seu bolso
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Básico",
                  price: "R$ 45",
                  description: "Para profissionais autônomos",
                  features: [
                    "Até 50 pacientes",
                    "Agenda online",
                    "Prescrição digital",
                    "Suporte por email",
                  ],
                },
                {
                  name: "Profissional",
                  price: "R$ 90",
                  description: "Para clínicas em crescimento",
                  features: [
                    "Até 200 pacientes",
                    "Agenda online",
                    "Prescrição digital",
                    "Relatórios avançados",
                    "Suporte prioritário",
                    "Múltiplos profissionais",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Consulte",
                  description: "Para grandes clínicas",
                  features: [
                    "Pacientes ilimitados",
                    "Recursos personalizados",
                    "API disponível",
                    "Gerenciador dedicado",
                    "Suporte 24/7",
                    "Treinamento da equipe",
                  ],
                },
              ].map((plan, index) => (
                <Card key={plan.name} className="relative">
                  {index === 1 && (
                    <div className="absolute -top-4 left-0 right-0 text-center">
                      <span className="bg-secondary px-3 py-1 rounded-full text-sm ">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold mb-2">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={`${feature}-feature`}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${
                        index === 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary"
                      }`}
                    >
                      <Link className="h-full w-full" href={"/cadastro"}>
                        Começar Agora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Pronto para transformar sua clínica?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Comece agora e aproveite 14 dias grátis de todas as
                funcionalidades
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground">
                Começar Gratuitamente
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Casos de Sucesso
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Ajuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 fsio. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
