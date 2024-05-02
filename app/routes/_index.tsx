import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ivan Chen" },
    { name: "description", content: "Hi! My name is Ivan Chen, an incoming freshman to RIT majoring in Computer Engineering Technology." },
  ];
};

export default function Index() {
  return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        
      <h1>Ivan Chen</h1>
      
    </div>
  );
}
