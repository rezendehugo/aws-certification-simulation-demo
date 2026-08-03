export type Locale = "en" | "pt-BR";
export type Theme = "system" | "light" | "dark";
export type Response = string[] | Record<string, string>;
export interface Option { id: string; text: string }
export interface Question { id:string; domainId:number; objective:string; type:"multiple_choice"|"multiple_response"|"ordering"|"matching"; stem:string; options:Option[]; matchChoices?:Option[]; correctAnswer:Response; explanation:string; scored:boolean; source:string }
export interface AnswerState { response:Response|null; flagged:boolean; confidence:"low"|"medium"|"high" }
export interface AttemptState { version:1; status:"ready"|"active"|"submitted"; startedAt:string|null; deadlineAt:string|null; submittedAt:string|null; position:number; answers:Record<string,AnswerState> }
export interface DomainScore { domainId:number; correct:number; total:number; percentage:number }
export interface Result { score:number; total:number; percentage:number; unanswered:number; elapsedSeconds:number; domainScores:DomainScore[] }
