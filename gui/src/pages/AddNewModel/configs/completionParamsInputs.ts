import { InputDescriptor } from "./providers";

export const completionParamsInputs: Record<string, InputDescriptor> = {
  contextLength: {
    inputType: "number",
    key: "contextLength",
    label: "Context Length",
    defaultValue: undefined,
    required: false,
  },
  temperature: {
    inputType: "number",
    key: "completionOptions.temperature",
    label: "Temperature",
    defaultValue: undefined,
    required: false,
    min: 0.0,
    max: 1.0,
    step: 0.01,
  },
  topP: {
    inputType: "number",
    key: "completionOptions.topP",
    label: "Top-P",
    defaultValue: undefined,
    required: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  topK: {
    inputType: "number",
    key: "completionOptions.topK",
    label: "Top-K",
    defaultValue: undefined,
    required: false,
    min: 0,
    step: 1,
  },
  presencePenalty: {
    inputType: "number",
    key: "completionOptions.presencePenalty",
    label: "Presence Penalty",
    defaultValue: undefined,
    required: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  frequencyPenalty: {
    inputType: "number",
    key: "completionOptions.frequencyPenalty",
    label: "Frequency Penalty",
    defaultValue: undefined,
    required: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
};
