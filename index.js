import http from "http"
import {v4} from "uuid"

const informacoesAlunos = [
  {
    "nomeAluno": "Pedro",
    "materiaAluno": "Back-end com node js",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const {method, url} = request

  let body = ""

  request.on("data", dadosAluno => {
    body += dadosAluno.toString()
  })

  request.on("end", () => {
    if (url === "/notas" && method === "GET") {
      response.writeHead(200, {"content-type":"application/json"})
      response.end(JSON.stringify(informacoesAlunos))
    } else if (url === "/notas" && method === "POST") {
      const {nomeAluno, materiaAluno, notaAluno} = JSON.parse(body)
      const novaInformacaoAluno = {id: v4(), nomeAluno, materiaAluno, notaAluno}
      informacoesAlunos.push(novaInformacaoAluno)
      response.writeHead(201, {"content-type":"application/json"})
      response.end(novaInformacaoAluno)
    } else {
      response.writeHead(404, {"content-type":"application/json"})
      response.end(JSON.stringify({Mensagem: "Rota nao encontrada"}))
    }
  })
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`)
})