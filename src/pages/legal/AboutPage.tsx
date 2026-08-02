import AppShell from "../../components/layout/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">About Campus</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p>
            Campus is a student‑only social network — part of the Warren ecosystem — designed to help freshers connect,
            share resources, and navigate campus life. Built with privacy and simplicity
            in mind, Campus brings together communities, study materials, campus maps,
            and real‑time chat.
          </p>
          <p>
            Our mission is to make every student feel at home from day one. Whether you’re
            looking for your school’s past papers, a study group, or just a friendly
            conversation, Campus has you covered.
          </p>
          <p>
            Campus is developed and maintained by a dedicated team of students and alumni.
            We believe that education should be collaborative, not competitive.
          </p>
        </div>
      </div>
    </AppShell>
  );
}