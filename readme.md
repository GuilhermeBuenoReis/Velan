# 🩺 Velan — Sistema de Agendamento de Consultas

O **Velan** é um sistema completo para **agendamento e gerenciamento de consultas médicas**, desenvolvido com foco na aplicação dos princípios da **Programação Orientada a Objetos (POO)** e **arquitetura limpa**.  
O projeto é dividido em duas partes complementares:

- **Backend (Laravel)** — desenvolvido para a disciplina **Paradigmas de Linguagem de Programação**, enfatizando encapsulamento, herança, abstração e reuso de código.
    
- **Frontend (React + TypeScript)** — construído para a disciplina **Programação Orientada a Objetos para Web**, aplicando conceitos de modularização, componentização e integração com o backend.
    

---

## 🎯 Objetivo do Projeto

O **Velan** tem como propósito permitir que usuários gerenciem consultas médicas (appointments) de forma prática e intuitiva.  
O sistema fornece autenticação, cadastro, listagem e atualização de dados, além de manter uma arquitetura modular e escalável, baseada em boas práticas de POO.

---

## ⚙️ Funcionalidades Gerais

- 👩‍⚕️ **Cadastro e autenticação de usuários**
    
- 📅 **Agendamento e gerenciamento de consultas**
    
- 🗓️ **Listagem e edição de appointments existentes**
    
- 🧑‍💻 **Edição e visualização do perfil do usuário**
    
- 🔄 **Integração total entre frontend e backend via API REST**
    
- 🎨 **Interface moderna, responsiva e componentizada**
    

---

## 🧩 Estrutura do Backend (Laravel)

### 📂 Estrutura de Pastas

```
app/
├── Http/
│   ├── Controllers/        # Controladores principais da aplicação
│   ├── Middleware/         # Filtros e autenticação
│   ├── Repositories/       # Camada de acesso a dados (DAO)
│   ├── Requests/           # Validação e padronização de requisições
│   ├── Resources/          # Formatação das respostas em JSON
│   ├── Services/           # Regras de negócio e lógica aplicada
│   ├── Interface/          # Definição de contratos e abstrações
│   └── Models/             # Entidades representando o banco de dados
├── Providers/
├── Swagger/
├── database/
├── routes/
└── tests/
```

### 🧱 Estrutura Orientada a Objetos

O backend foi projetado com base em **arquitetura limpa**:

```
Controller → Service → Repository → Model
```

Cada camada cumpre um papel específico:

- **Controller:** recebe e processa requisições HTTP.
    
- **Service:** contém as regras de negócio.
    
- **Repository:** gerencia o acesso e manipulação dos dados.
    
- **Model:** representa as entidades e relações no banco.
    

Esse padrão reforça **baixo acoplamento** e **alta coesão**, fundamentos essenciais da POO.

### 📌 Exemplo de Organização

- `AppointmentController.php` → gerencia agendamentos.
    
- `AppointmentService.php` → executa lógica de criação/atualização.
    
- `AppointmentRepository.php` → manipula dados de consultas no banco.
    
- `ProfileApiController.php` → controla exibição e atualização de perfis de usuário.
    

---

## 💻 Estrutura do Frontend (React + TypeScript)

### 📂 Estrutura de Pastas

```
resources/js/
├── actions/           # Funções assíncronas e side effects
├── assets/            # Ícones, imagens e estilos globais
├── components/        # Componentes reutilizáveis
├── hooks/             # Hooks personalizados para estado e contexto
├── layouts/           # Layouts principais (Auth, App)
├── lib/               # Configurações e inicializações
├── pages/             # Páginas principais do sistema
├── routes/            # Definição de rotas do app
├── types/             # Tipagens TypeScript
├── utils/             # Funções auxiliares e helpers
├── views/             # Componentes de visualização
└── wayfinder/         # Entradas principais (app.tsx, ssr.tsx)
```

### 🧠 Conceitos Aplicados

- **Componentização:** cada parte da interface é modular e reutilizável.
    
- **Encapsulamento:** hooks e contextos centralizam o estado e lógica.
    
- **Herança e abstração:** layouts base herdados e adaptados conforme página.
    
- **Polimorfismo:** componentes que se adaptam via props e contextos.
    
- **Tipagem forte (TypeScript):** garante segurança e previsibilidade.
    

---

## 🧠 Paradigmas de Programação Aplicados

### 🔸 Backend — Paradigmas de Linguagem de Programação

- **Orientação a Objetos (POO)**
    
- **Encapsulamento e abstração** com `Services` e `Repositories`
    
- **Inversão de dependência** via interfaces
    
- **Reuso e extensibilidade** com classes e herança
    
- **Responsabilidade única** (SRP) aplicada nas camadas
    

### 🔹 Frontend — POO para Web

- **Componentização** com React e TypeScript
    
- **Abstração e polimorfismo** em layouts e componentes dinâmicos
    
- **Organização modular** com separação por domínio e responsabilidade
    
- **Reutilização de lógica** via hooks personalizados
    

---

## 🧰 Tecnologias Utilizadas

### 🔧 Backend

- Laravel 10+
    
- PHP 8.3+
    
- Eloquent ORM
    
- Swagger (documentação)
    
- Docker e Docker Compose
    

### 💻 Frontend

- React 18
    
- TypeScript
    
- Vite
    
- Inertia.js
    
- Tailwind CSS
    
- Axios
    

---

## ▶️ Como Executar o Projeto

### Backend

```bash
git clone https://github.com/GuilhermeBuenoReis/Velan.git
cd Velan
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd resources/js
npm install
npm run dev
```

---

## 🧪 Estrutura e Padrões de Qualidade

O código segue os princípios:

- **SOLID**
    
- **Clean Code**
    
- **Domain Driven Design (DDD)**
    
- **Separação de camadas e responsabilidades**
    
- **Padrões RESTful**
    

---

## 👨‍💻 Autor

**Guilherme Bueno Reis**  
Desenvolvedor Fullstack & Mobile  
📧 [guilhermebuenoreis@gmail.com](mailto:guilhermebuenoreis.contact@gmail.com)  
🌐 [github.com/GuilhermeBuenoReis](https://github.com/GuilhermeBuenoReis)

---

## 🎓 Contexto Acadêmico

|Disciplina|Foco|Entregável|
|---|---|---|
|**Paradigmas de Linguagem de Programação**|Backend com Laravel e arquitetura orientada a objetos|Estrutura modular e desacoplada (Controller, Service, Repository, Model)|
|**Programação Orientada a Objetos para Web**|Frontend com React + TypeScript|Aplicação modular, componentizada e orientada a objetos|

---

## 🧩 Conclusão

O **Velan** une teoria e prática da **Programação Orientada a Objetos** em um sistema completo e funcional.  
Através da aplicação de **arquitetura limpa, modularidade, reuso e abstração**, o projeto demonstra domínio técnico tanto no **Laravel (backend)** quanto no **React (frontend)**.