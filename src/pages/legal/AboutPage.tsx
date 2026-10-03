import AppShell from "../../components/layout/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">About 515</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p>
            515 is designed to help students: Find the paper. Understand it. Plan the cram.
            share resources, and navigate campus life. Built with privacy and simplicity
            in mind, 515 brings together past papers, revision notes, and cram planning,
            and real‑time chat.
          </p>
          <p>
            Our mission is to make every student feel at home from day one. Whether you’re
            looking for your school’s past papers, a study group, or just a friendly
            conversation, 515 has you covered.
          </p>
          <p>
            515 is developed and maintained by an independent team of students and alumni.
            We believe that education should be collaborative, not competitive.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 border-t pt-3">
            <em>Disclaimer: 515 is an independent student platform and is not affiliated with, endorsed by, or officially associated with any university or academic institution.</em>
          </p>
        </div>
      </div>
    </AppShell>
  );
}