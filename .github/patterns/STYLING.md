🎨 Padrões para Estilização com Tailwind CSS – Santander finance 
🔧 Estrutura Base
tailwind.config.js → Configuração do Tailwind

postcss.config.js → Processamento CSS

src/index.css → Importação do Tailwind e estilos globais

🚩 Configuração do Tailwind
javascript
Copiar
Editar
/** @type {import('tailwindcss').Config} \*/
export default {
content: ['./index.html', './src/**/\*.{js,ts,jsx,tsx}'],
darkMode: 'class',
theme: {
extend: {
colors: {
primary: {
50: '#ffecec',
100: '#ffc8c8',
200: '#ff9999',
300: '#ff6666',
400: '#ff3333',
500: '#ec0000', // Base Santander
600: '#b00000',
700: '#870000',
800: '#600000',
900: '#3d0000',
},
neutral: {
50: '#fafafa',
100: '#f5f5f5',
200: '#e5e5e5',
300: '#d4d4d4',
400: '#a3a3a3',
500: '#737373',
600: '#525252',
700: '#404040',
800: '#262626',
900: '#171717',
},
success: '#00B25A',
warning: '#FFC700',
danger: '#EC0000',
info: '#009DE0',
},
fontFamily: {
sans: ['Inter', 'sans-serif'],
},
spacing: {
18: '4.5rem',
88: '22rem',
},
borderRadius: {
lg: '12px',
},
boxShadow: {
sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
md: '0 4px 6px rgba(0,0,0,0.1)',
lg: '0 10px 15px rgba(0,0,0,0.15)',
},
animation: {
'fade-in': 'fadeIn 0.5s ease-in-out',
'slide-up': 'slideUp 0.3s ease-out',
},
},
},
plugins: [],
};
✅ Regras de Estilo
Deve:
Usar 100% Tailwind CSS

Design mobile-first

Cores semânticas (primary, danger, success, neutral)

Escala consistente de espaçamentos

Suporte a Dark Mode

Componentes com variantes (hover, focus, disabled, etc.)

Layout modular, reaproveitável

Não deve:
CSS inline (style={{}})

CSS fora do Tailwind sem extrema necessidade

Valores mágicos

Classes monstruosas (quebrar em componentes)

Inconsistências visuais

🏗️ Padrões de Componentes
Layout
html
Copiar
Editar

<div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- conteúdo -->
  </div>
</div>
Grids e Flex
html
Copiar
Editar
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="flex items-center justify-between">

<div className="flex flex-col gap-4">
🧠 Componentização Tailwind + TypeScript
Button
typescript
Copiar
Editar
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  children,
  onClick
}: {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500",
    danger: "bg-danger text-white hover:bg-red-700 focus:ring-red-500"
  };

const sizes = {
sm: "px-3 py-2 text-sm",
md: "px-4 py-2 text-base",
lg: "px-6 py-3 text-lg"
};

const classes = [
base,
variants[variant],
sizes[size],
fullWidth ? "w-full" : "",
disabled ? "opacity-50 cursor-not-allowed" : ""
].join(' ');

return (
<button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
{children}
</button>
);
};
Card
typescript
Copiar
Editar
const Card = ({
children,
padding = 'md',
shadow = 'md',
hover = false
}: {
children: React.ReactNode;
padding?: 'sm' | 'md' | 'lg';
shadow?: 'sm' | 'md' | 'lg';
hover?: boolean;
}) => {
const base = "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700";

const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
const shadows = { sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' };

const hoverStyle = hover ? 'hover:shadow-lg transition-shadow' : '';

const classes = [base, paddings[padding], shadows[shadow], hoverStyle].join(' ');

return <div className={classes}>{children}</div>;
};
Input
typescript
Copiar
Editar
const Input = ({
label,
error,
type = 'text',
placeholder,
value,
onChange,
disabled = false,
required = false
}: {
label?: string;
error?: string;
type?: string;
placeholder?: string;
value: string;
onChange: (value: string) => void;
disabled?: boolean;
required?: boolean;
}) => {
const inputClasses = [
"block w-full px-3 py-2 rounded-md shadow-sm",
"placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2",
error
? "border-red-500 focus:ring-red-500"
: "border-neutral-300 focus:ring-primary-500",
disabled ? "bg-neutral-100 dark:bg-neutral-700 cursor-not-allowed" : "bg-white dark:bg-neutral-800"
].join(' ');

return (

<div className="space-y-1">
{label && (
<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
{label}{required && <span className="text-red-500 ml-1">\*</span>}
</label>
)}
<input
type={type}
placeholder={placeholder}
value={value}
onChange={(e) => onChange(e.target.value)}
disabled={disabled}
required={required}
className={inputClasses}
/>
{error && <p className="text-sm text-red-600">{error}</p>}
</div>
);
};
🔥 Estados e Animações
html
Copiar
Editar
// Loading spinner

<div className="flex items-center justify-center">
  <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
</div>

// Skeleton

<div className="animate-pulse space-y-2">
  <div className="h-4 bg-neutral-200 rounded"></div>
  <div className="h-4 bg-neutral-300 rounded w-5/6"></div>
</div>

// Hover, Focus, Disabled
<button className="hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
🌙 Dark Mode Support
javascript
Copiar
Editar
// tailwind.config.js
darkMode: 'class',
html
Copiar
Editar

<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
📦 Classes Utilitárias Customizadas
css
Copiar
Editar
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
.btn-primary {
@apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500;
}
.card {
@apply bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 p-6;
}
}

@layer utilities {
.scrollbar-hide {
-ms-overflow-style: none;
scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
display: none;
}
}
🚀 Performance
Tailwind purge embutido (v3+)

Fonts preload:

html
Copiar
Editar

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="sty
