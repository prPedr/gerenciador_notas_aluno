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
    const idBuscaAluno = url.split("/")[2]

    // ROTA DE LISTAGEM
    if (url === "/alunos" && method === "GET") {
      response.writeHead(200, {"content-type" : "application/json"})
      response.end(JSON.stringify(informacoesAlunos))
    }

    // ROTA DE CRIACAO
    else if (url === "/alunos" && method === "POST") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)

      const novasInformacoesAlunos = {
        idAluno : randomUUID(),
        nomeAluno,
        materiaAluno,
        notaAluno
      }

      informacoesAlunos.push(novasInformacoesAlunos)
      response.writeHead(201, {"content-type" : "application/json"})
      response.end(JSON.stringify(novasInformacoesAlunos))
    }

    // ROTA DE ATUALIZACAO
    else if (url.startsWith("/alunos/") && method === "PUT") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)
      const atualizarAluno = informacoesAlunos.find(aluno => aluno.idAluno === idBuscaAluno)

      if (atualizarAluno) {
        atualizarAluno.nomeAluno = nomeAluno
        atualizarAluno.materiaAluno = materiaAluno
        atualizarAluno.notaAluno = notaAluno

        response.writeHead(200, {"content-type" : "äpplication/json"})
        response.end(JSON.stringify(atualizarAluno))
      } else {
        response.writeHead(404, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : "Aluno nao encontrado"}))
      }
    }

    // ROTA DE DELETAR
    else if (url.startsWith("/alunos/") && method === "DELETE") {
      const deletarAluno = informacoesAlunos.findIndex(aluno => aluno.idAluno === idBuscaAluno)

      if (deletarAluno !== -1) {
        const nomeAlunoDeletado = informacoesAlunos[deletarAluno].nomeAluno

        informacoesAlunos.splice(deletarAluno, 1)
        response.writeHead(200, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : `${nomeAlunoDeletado} deletado`}))
      } else {
        response.writeHead(404, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : "Aluno nao encontrado"}))
      }
    }

    // ROTA DE URL NAO ENCONTRADA
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