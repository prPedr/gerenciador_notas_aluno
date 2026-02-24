import http from "http"

const notas_alunos = [
  {
    "nomeEstudante": "Pedro",
    "materia": "Back end com node js",
    "nota": "10"
  }
]

const server = http.createServer((request, response) => {
  const {method, url} = request

  if (url === "/notas" && method === "GET") {
    response.writeHead(200, {"content-type": "application/json"})
    response.end(JSON.stringify(notas_alunos))
  } else {
    response.writeHead(404, {"content-type": "application/json"})
    response.end(JSON.stringify({message: "Rota nao encontrada"}))
  }
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`)
})