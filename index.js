import http from "http"

const informacoesAlunos = [
  {
    "nomeAluno": "Pedro Nascimento",
    "materiaAluno": "Back end em node",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === "GET" && url === "/alunos") {
    response.writeHead(200, { "content-type":"application/json" })
    response.end(JSON.stringify(informacoesAlunos))
  } else {
    response.writeHead(404, { "content-type":"application/json" })
    response.end(JSON.stringify({Mensagem: "Rotao nao encontrada"}))
  }
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})