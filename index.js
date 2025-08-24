import http from "http"
import {v4} from "uuid"

const porta = 3000
const notas = []

// Criacao do servidor ==> OBS: (request e response) SAO OBRIGATORIOS
const servidor = http.createServer((request, response) => {
    const {method, url} = request
    let body = ""

    request.on("data", parte => { // Verifica se a requisicao possuiu algum dado ou nao
        body +=  parte.toString()
    })

    request.on("end", () => {
        if (url === "/notas" && method === "GET") {
            response.writeHead(200, {"Content-Type": "application/json"}) // Para um GET o statusCode padrao e o 200
            response.end(JSON.stringify(notas))
        } else if (url === "/notas" && method === "POST") {
            const {nomeEstudante, materia, nota} = JSON.parse(body)
            const novaNota = {id: v4(), nomeEstudante, materia, nota}
            notas.push(novaNota)
            response.writeHead(201, {"Content-Type": "application/json"})
            response.end(JSON.stringify(novaNota))
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
