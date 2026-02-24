import http from "http"

const notasAluno = [
  {
    "nomeAluno": "Pedro",
    "materiaAluno": "Back-end com node js",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const {method, url} = request

  if (url === "/notas" && method === "GET") {
    response.writeHead(200, {"content-type":"application/json"})
    response.end(JSON.stringify(notasAluno))
  } else {
    response.writeHead(404, {"content-type":"application/json"})
    response.end(JSON.stringify({Mensagem: "Rota nao encontrada"}))
  }
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`)
})