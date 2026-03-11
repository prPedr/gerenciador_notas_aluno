import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAlunos = [
  {
    "idAluno" : randomUUID(),
    "nomeAluno" : "Matheus Miguel",
    "materiaAluno" : "Introducao ao React",
    "notaAluno" : "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request
  let body = ""

  request.on("data", partesRequesicao => {
    body += partesRequesicao
  })

  request.on("end", () => {
    if (url === "/alunos" && method === "GET") {
      response.writeHead(200, {"content-type" : "application/json"})
      response.end(JSON.stringify(informacoesAlunos))
    }

    else if (url === "/alunos" && method === "POST") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)

      const novasInformacoesAlunos = {
        id : randomUUID(),
        nomeAluno,
        materiaAluno,
        notaAluno
      }

      informacoesAlunos.push(novasInformacoesAlunos)
      response.writeHead(201, {"content-type" : "application/json"})
      response.end(JSON.stringify(novasInformacoesAlunos))
    }

    else {
      response.writeHead(404, {"content-type" : "application'json"})
      response.end(JSON.stringify({Mensagem : "Rota nao encontrada"}))
    }
  })
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})