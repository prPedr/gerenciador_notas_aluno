import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAluno = [
  {
    "idAluno" : randomUUID(),
    "nomeAluno" : "Pedro Nascimento",
    "materiaAluno" : "Back end com Node.js",
    "notaAluno" : "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request
  let body = ""

  request.on("data", partesRequisicao => {
    body += partesRequisicao
  })

  request.on("end", () => {
    const idBuscaAluno = url.split("/")[2]

    if (url === "/alunos" && method === "GET") {
      response.writeHead(200, {"content-type" : "application/json"})
      response.end(JSON.stringify(informacoesAluno))
    }

    else if (url === "/alunos" && method === "POST") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)

      const novasInformacoesAluno = {
        idAluno : randomUUID(),
        nomeAluno,
        materiaAluno,
        notaAluno
      }

      informacoesAluno.push(novasInformacoesAluno)
      response.writeHead(201, {"content-type" : "application/json"})
      response.end(JSON.stringify(novasInformacoesAluno))
    }

    else if (url.startsWith("/alunos/") && method === "PUT") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)
      const atualizarAluno = informacoesAluno.find(aluno => aluno.idAluno === idBuscaAluno)

      if (atualizarAluno) {
        atualizarAluno.nomeAluno = nomeAluno
        atualizarAluno.materiaAluno = materiaAluno
        atualizarAluno.notaAluno = notaAluno

        response.writeHead(200, {"content-type" : "application/json"})
        response.end(JSON.stringify(atualizarAluno))
      } else {
        response.writeHead(404, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : "Aluno nao encontrado"}))
      }
    }

    else if (url.startsWith("/alunos/") && method === "DELETE") {
      const deletarAluno = informacoesAluno.findIndex(aluno => aluno.idAluno === idBuscaAluno)

      if (deletarAluno !== -1) {
        const nomeAlunoDeletado = informacoesAluno[deletarAluno].nomeAluno

        informacoesAluno.splice(deletarAluno, 1)
        response.writeHead(200, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : `${nomeAlunoDeletado} deletado`}))
      } else {
        response.writeHead(404, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : "Aluno nao encontrado"}))
      }
    }

    else {
      response.writeHead(404, {"content-type" : "application/json"})
      response.end(JSON.stringify({Mensagem : "Rota nao encontrada"}))
    }
  })

  
})

const porta = 3111

server.listen(porta, () => {
  console.log(`Servido rodando em http://localhost:${porta}`)
})