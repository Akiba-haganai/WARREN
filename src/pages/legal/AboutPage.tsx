import AppShell from "../../components/layout/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">About Wave</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p>
            Wave is a student‑only social network designed to help freshers connect,
            share resources, and navigate campus life. Built with privacy and simplicity
            in mind, Wave brings together communities, study materials, campus maps,
            and real‑time chat.
          </p>
          <p>
            Our mission is to make every student feel at home from day one. Whether you’re
            looking for your school’s past papers, a study group, or just a friendly
            conversation, Wave has you covered.
          </p>
          <p>
            Wave is developed and maintained by an independent team of students and alumni.
            We believe that education should be collaborative, not competitive.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 border-t pt-3">
            <em>Disclaimer: Wave is an independent student platform and is not affiliated with, endorsed by, or officially associated with any university or academic institution.</em>
          </p>
        </div>
      </div>
    </AppShell>
  );
}