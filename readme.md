# 📘 API de Notas

API simples em **Node.js** (sem frameworks) para gerenciar notas de estudantes.  
Permite **criar, listar, atualizar e excluir** registros.  

---

## 🚀 Tecnologias
- [Node.js](https://nodejs.org/) (módulo `http`)
- [uuid](https://www.npmjs.com/package/uuid) para geração de IDs únicos

---

## ⚡ Como executar
```bash
# Instalar dependências
npm install uuid

# Rodar o servidor
node index.js

# Servidor disponível em:
http://localhost:3000

# Listar todas as notas => GET /notas
curl -X GET http://localhost:3000/notas

# Resposta (200 OK):
[
  {
    "id": "uuid",
    "nomeEstudante": "Pedro",
    "materia": "Back-end com node.js",
    "nota": 10
  }
]

# Criar uma nova nota => POST /notas
curl -X POST http://localhost:3000/notas \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Pedro","materia":"Back-end com node.js","nota":10}'

# Resposta (201 Created):
{
  "id": "uuid",
  "nomeEstudante": "Pedro",
  "materia": "Back-end com node.js",
  "nota": 10
}

# Atualizar uma nota existente => PUT /notas/{id}
curl -X PUT http://localhost:3000/notas/uuid-do-aluno \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Carlos","materia":"Front-end com React","nota":9}'

# Resposta (200 OK):
{
  "id": "uuid-do-aluno",
  "nomeEstudante": "Carlos",
  "materia": "Front-end com React",
  "nota": 9
}

# Resposta (404 Not Found):
{"mensagem": "Nota não encontrada"}

# Excluir uma nota => DELETE /notas/{id}
curl -X DELETE http://localhost:3000/notas/uuid-do-aluno

# Resposta (204 No Content): sem corpo
# Resposta (404 Not Found):
{"mensagem": "Nota não encontrada"}

# Resposta (404 Not Found):
{"mensagem": "Rota não encontrada"}

# Estrutura do Projeto
📦 gerenciador_notas_alunos
 ┣ 📜 index.js        # Código principal da API
 ┣ 📜 package.json    # Configuração do projeto
 ┗ 📜 README.md       # Documentação

# Após rodar o servidor, você pode inserir dados iniciais rodando os comandos abaixo:
curl -X POST http://localhost:3000/notas \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Pedro","materia":"Back-end com node.js","nota":10}'

curl -X POST http://localhost:3000/notas \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Carlos","materia":"Banco de Dados","nota":8}'

curl -X POST http://localhost:3000/notas \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Gabriel","materia":"Front-end com React","nota":9}'

curl -X GET http://localhost:3000/notas
