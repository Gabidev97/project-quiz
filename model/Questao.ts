import { embaralhar } from '../functions/Arrays'
import RespostasModel from './Respostas'


export default class QuestaoModel {
    #id : number
    #enunciado : string
    #resposta: RespostasModel[]
    #acertou: boolean


    constructor(id: number, enunciado: string, resposta: RespostasModel[], acertou = false){
        this.#id = id
        this.#enunciado = enunciado
        this.#resposta = resposta
        this.#acertou = acertou
    }


    get id(){
        return (
            this.#id
        )
    }


    get enunciado(){
        return (
            this.#enunciado
        )
    }


    get resposta(){
        return (
            this.#resposta
        )
    }


    get acertou(){
        return (
            this.#acertou
        )
    }

    get naoRespondida() {
        return !this.respondida
    }


    get respondida(){

        for(let resposta of this.#resposta){
            if(resposta.revelada) return true
        }
           return false
    }


    responderCom(indice: number): QuestaoModel {
        const acertou = this.#resposta[indice]?.certa
        const respostas = this.#resposta.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta
        })
        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
    }



    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.#resposta)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {
        const respostas = obj.resposta.map(resp => RespostasModel.criarUsandoObjeto(resp))
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    paraObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respondida: this.respondida,
            acertou: this.#acertou,
            resposta: this.#resposta.map(resp => resp.paraObjeto()),
        }
    }
}

