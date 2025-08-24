import http from "http"
import {v4} from "uuid"

const porta = 3000
const notas = [] // Armazenamento em memória (perde tudo ao reiniciar o servidor)

// Criacao do servidor ==> OBS: (request e response) SAO OBRIGATORIOS
const servidor = http.createServer((request, response) => {
    const {method, url} = request
    let body = ""

    request.on("data", parte => { // Verifica se a requisicao possuiu algum dado ou nao
        body +=  parte.toString()
    })

    request.on("end", () => {
        const id = url.split("/")[2]

        if (url === "/notas" && method === "GET") {
            response.writeHead(200, {"Content-Type": "application/json"}) // Para um GET o statusCode padrao e o 200
            response.end(JSON.stringify(notas))
        } else if (url === "/notas" && method === "POST") {
            const {nomeEstudante, materia, nota} = JSON.parse(body)
            const novaNota = {id: v4(), nomeEstudante, materia, nota}
            notas.push(novaNota)
            response.writeHead(201, {"Content-Type": "application/json"})
            response.end(JSON.stringify(novaNota))
        } else if (url.startsWith("/notas/") && method === "PUT") {
            const {nomeEstudante, materia, nota} = JSON.parse(body)
            const notaAtualizar = notas.find(notaFiltro => notaFiltro.id === id)
            if (notaAtualizar) {
                notaAtualizar.nomeEstudante = nomeEstudante
                notaAtualizar.materia = materia
                notaAtualizar.nota = nota
                response.writeHead(200, {"Content-Type": "application/json"})
                response.end(JSON.stringify(notaAtualizar))
            } else {
                response.writeHead(404, {"Content-Type": "application/json"})
                response.end(JSON.stringify({mensagem: "Nota não encontrada"}))
            }
        } else if (url.startsWith("/notas") && method === "DELETE") {
            const index = notas.findIndex(notaFiltro => notaFiltro.id === id)
            if (index !== -1) {
                notas.splice(index, 1)
                response.writeHead(204)
                response.end()
            } else {
                response.writeHead(404, {"Content-Type": "application/json"})
                response.end(JSON.stringify({mensagem: "Nota não encontrada"}))
            }
        } else {
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({mensagem: "Rota não encontrada"}))
        }
    })
})

// Ligando o servidor
servidor.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})
