import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAlunos = [
  {
    "idAluno" : randomUUID(),
    "nomeAluno" : "Renato Augusto",
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
      response.end(JSON.stringify(informacoesAlunos))
    }

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

    else if (url.startsWith("/alunos/") && method === "PUT") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)
      const alunoAtualizar = informacoesAlunos.find(alunos => alunos.idAluno === idBuscaAluno)
      
      if (alunoAtualizar) {
        alunoAtualizar.nomeAluno = nomeAluno
        alunoAtualizar.materiaAluno = materiaAluno
        alunoAtualizar.notaAluno = notaAluno

        response.writeHead(200, {"content-type" : "application/json"})
        response.end(JSON.stringify(alunoAtualizar))
      } else {
        response.writeHead(404, {"content-type" : "application/json"})
        response.end(JSON.stringify({Mensagem : "Aluno nao encontrado"}))
      }
    }

    else if (url.startsWith("/alunos") && method === "DELETE") {
      const index = informacoesAlunos.findIndex(alunos => alunos.idAluno === idBuscaAluno)

      if (index !== -1) {
        const nomeAlunoDeletado = informacoesAlunos[index].nomeAluno

        informacoesAlunos.splice(index, 1)
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

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em hppt://localhost:${porta}`)
})