import { embaralhar } from '../../../functions/Arrays'
import questoes from '../Questoes/bancoDeQuestoes'

export default function questionario(req, res) {
    const ids = questoes.map(questao => questao.id)
    res.status(200).json(embaralhar(ids))
}