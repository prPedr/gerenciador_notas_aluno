import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAlunos = [
  {
    "id": randomUUID(),
    "nomeAluno": "Receputi",
    "materiaAluno": "Introducao ao Node JS",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request
  let body = ""

  request.on("data", partesRequisicao => {
    body += partesRequisicao.toString()
  })

  request.on("end", () => {
    // ROTA DE LISTAGEM
    if (method === "GET" && url === "/alunos") {
      response.writeHead(200, {"content-type":"application/json"})
      response.end(JSON.stringify(informacoesAlunos))
    }

    // ROTA DE CRIACAO
    else if (method === "POST" && url === "/alunos") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)

      const novasInformacoesAlunos = {
        id: randomUUID(),
        nomeAluno,
        materiaAluno,
        notaAluno
      }

      informacoesAlunos.push(novasInformacoesAlunos)
      response.writeHead(201, {"content-type":"application/json"})
      response.end(JSON.stringify(novasInformacoesAlunos))
    }

    // ROTA URL NAO ENCONTRADA
    else {
      response.writeHead(404, {"content-type":"application/jsop"})
      response.end(JSON.stringify({Mensagem: "Rota nao encontrada"}))
    }
  })
  
  
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})