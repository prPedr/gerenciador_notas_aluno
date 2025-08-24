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

http://localhost:3000


curl -X GET http://localhost:3000/notas


[
  {
    "id": "uuid",
    "nomeEstudante": "Pedro",
    "materia": "Back-end com node.js",
    "nota": 10
  }
]

curl -X POST http://localhost:3000/notas \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Pedro","materia":"Back-end com node.js","nota":10}'


{
  "id": "uuid",
  "nomeEstudante": "Pedro",
  "materia": "Back-end com node.js",
  "nota": 10
}


curl -X PUT http://localhost:3000/notas/uuid-do-aluno \
  -H "Content-Type: application/json" \
  -d '{"nomeEstudante":"Carlos","materia":"Front-end com React","nota":9}'

{
  "id": "uuid-do-aluno",
  "nomeEstudante": "Carlos",
  "materia": "Front-end com React",
  "nota": 9
}

{"mensagem": "Nota não encontrada"}

curl -X DELETE http://localhost:3000/notas/uuid-do-aluno

{"mensagem": "Nota não encontrada"}

{"mensagem": "Rota não encontrada"}

📦 gerenciador_notas_alunos
 ┣ 📜 index.js        # Código principal da API
 ┣ 📜 package.json    # Configuração do projeto
 ┗ 📜 README.md       # Documentação

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
