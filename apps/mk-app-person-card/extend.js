import aarForm from 'mk-aar-form'

function actionCreator(option){
    return {
        formAction: new aarForm.action(option)
    }
}

export default {
    actionCreator
}