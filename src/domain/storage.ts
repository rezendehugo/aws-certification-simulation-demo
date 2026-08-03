import type { AttemptState, Locale, Theme } from "../types";
const ATTEMPT="aif-demo-attempt-v1",LOCALE="aif-demo-locale",THEME="aif-demo-theme";
export function freshAttempt():AttemptState{return{version:1,status:"ready",startedAt:null,deadlineAt:null,submittedAt:null,position:0,answers:{}}}
export function loadAttempt():AttemptState{try{const value=JSON.parse(localStorage.getItem(ATTEMPT)??"");return value?.version===1?value:freshAttempt()}catch{return freshAttempt()}}
export function saveAttempt(value:AttemptState):void{localStorage.setItem(ATTEMPT,JSON.stringify(value))}
export function clearAttempt():void{localStorage.removeItem(ATTEMPT)}
export function loadLocale():Locale{const value=localStorage.getItem(LOCALE);return value==="en"||value==="pt-BR"?value:navigator.language.toLowerCase().startsWith("pt")?"pt-BR":"en"}
export function saveLocale(value:Locale):void{localStorage.setItem(LOCALE,value)}
export function loadTheme():Theme{const value=localStorage.getItem(THEME);return value==="light"||value==="dark"||value==="system"?value:"system"}
export function saveTheme(value:Theme):void{localStorage.setItem(THEME,value)}
