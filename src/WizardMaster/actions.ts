import { createEvent } from 'effector'

const pushError = createEvent<string>()
const clearErros = createEvent()

const setInitialValue = createEvent<object>()
const submitChange = createEvent<{ payload: object }>()
const pushWizardStepToBackend = createEvent()

export { setInitialValue, submitChange, pushWizardStepToBackend, clearErros, pushError }
