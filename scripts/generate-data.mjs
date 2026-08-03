import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const sourceRoot=resolve("../study-app/vendor/cloudcertprep/aif-c01");
const totalByDomain={1:13,2:15,3:17,4:10,5:10}; const scoredByDomain={1:10,2:12,3:14,4:7,5:7};
const out=[];
for(const domainId of [1,2,3,4,5]){
 const raw=JSON.parse(readFileSync(resolve(sourceRoot,`domain${domainId}.json`),"utf8")).sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
 const chosen=raw.slice(0,totalByDomain[domainId]);
 if(domainId===1){
  const ordering=raw.find(q=>q.type==="ordering"); const matching=raw.find(q=>q.type==="matching");
  if(ordering&&matching) chosen.splice(-2,2,ordering,matching);
 }
 for(const [index,q] of chosen.entries()){
  const type=q.type==="ordering"?"ordering":q.type==="matching"?"matching":q.isMultiAnswer?"multiple_response":"multiple_choice";
  out.push({id:q.id,domainId,objective:q.taskStatement??`${domainId}.all`,type,stem:q.question,options:Object.entries(q.options).map(([id,text])=>({id,text})),matchChoices:q.targets?Object.entries(q.targets).map(([id,text])=>({id,text})):undefined,correctAnswer:type==="ordering"?q.correctOrder:type==="matching"?q.correctMatches:Array.isArray(q.answer)?q.answer:[q.answer],explanation:q.explanation,scored:index<scoredByDomain[domainId],source:`https://github.com/nastaso/cloudcertprep/blob/3ec8a763268d244c99664fed4f23f2b759099408/src/data/aif-c01/domain${domainId}.json`});
 }
}
writeFileSync(resolve("src/data/questions.json"),JSON.stringify(out,null,2)+"\n");
