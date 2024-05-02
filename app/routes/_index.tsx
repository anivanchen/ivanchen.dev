import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "Ivan Chen" },
    { name: "description", content: "Hi! I'm Ivan Chen, an incoming freshman at the Rochester Institute of Technology majoring in Computer Engineering Technology." },
  ];
};

export default function Index() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>Ivan Chen</h1>
        </div>
    );
}
